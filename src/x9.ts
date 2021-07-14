
import { spawn, spawnSync } from 'child_process';
import { createWriteStream, readdirSync, readFileSync } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { file } from 'tmp';

const VIRUS_THRESHOLD = 0;
const CRITICAL_VULNS_THRESHOLD = 10;
const HIGH_VULNS_THRESHOLD = 50;
const MEDIUM_VULNS_THRESHOLD = 100;
const LOW_VULNS_THRESHOLD = 250;
const UNKNOWN_VULNS_THRESHOLD = 1000;

const TRIVY_SCAN_FILENAME = 'image-vulnerabilities-trivy.txt';
const CLAM_SCAN_FILENAME = 'recursive-root-dir-clamscan.txt';

export interface X9Config {
    image: string,
    minimalSeverity: string,
    x9ContainerDistro: string,
    ignoreThreats: boolean,
}

export interface ScanResult {
    file: string;
    content: string;
}
export interface ScanResults {
    clamReport: ScanResult | null,
    trivyReport: ScanResult | null,
};

async function fetchX9Dockerfile(distro: string): Promise<void> {
    const streamPipeline = promisify(pipeline);

    const response = await fetch(`https://raw.githubusercontent.com/olxbr/X9Containers/main/${distro}.X9.Dockerfile`);

    if (!response.ok) {
        throw new Error(`unexpected response ${response.statusText}`);
    }

    await streamPipeline(response.body, createWriteStream('./X9.Dockerfile'));
}

function minimalSeverity(config: string): string {
    switch (config) {
        case 'CRITICAL':
            return 'CRITICAL';
        case 'HIGH':
            return 'HIGH,CRITICAL';
        case 'MEDIUM':
            return 'MEDIUM,HIGH,CRITICAL';
        case 'LOW':
            return 'LOW,MEDIUM,HIGH,CRITICAL';
        default:
            return 'UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL';
    }
}

async function scanImage(image: string, severity: string): Promise<ScanResults> {
    const args = [
        'build',
        '-f',
        'X9.Dockerfile',
        '-t',
        'suspectimage',
        '--build-arg',
        `IMAGE=${image}`,
        '--build-arg',
        `TRIVY_SEVERITY=${severity}`,
        '--quiet',
        '.'
    ]
    await exec
        .getExecOutput('docker', args, { ignoreReturnCode: true })
        .then(res => {
            if (res.stderr.length > 0 && res.exitCode != 0) {
                throw new Error(`buildx failed with: ${res.stderr.match(/(.*)\s*$/)![0].trim()}`);
            }
        })

    const scansFolder = './scans';
    await exec
        .getExecOutput('docker', ['create', '--name', 'suspectcontainer', 'suspectimage'], {
            ignoreReturnCode: true,
            silent: true
        });
    await exec
        .getExecOutput('docker', ['cp', 'suspectcontainer:/scans', `${scansFolder}`], {
            ignoreReturnCode: true,
            silent: true
        });
    await exec
        .getExecOutput('docker', ['stop', 'suspectcontainer'], {
            ignoreReturnCode: true,
            silent: true
        })

    var results: ScanResults = {
        clamReport: null,
        trivyReport: null,
    };
    readdirSync(scansFolder).forEach(report => {
        const file = `${scansFolder}/${report}`;
        const content = readFileSync(file, "utf8");
        const result: ScanResult = { file, content }

        if (report === TRIVY_SCAN_FILENAME) {
            results.trivyReport = result
        } else if (report === CLAM_SCAN_FILENAME) {
            results.clamReport = result
        }
    })
    return results
}

function processClamReport(result: ScanResult | null) {
    if (result === null) {
        throw new Error(`failed to read file: ${CLAM_SCAN_FILENAME}`)
    }
    const summary = result.content.match(/^Infected files:.*/)
    if (summary === null || summary.length === 0) {
        throw new Error(`missing totals: ${CLAM_SCAN_FILENAME}`);
    }

    const totals = summary[0].match(/\d+/)
    if (totals === null || totals.some((value) => (isNaN(+value)))) {
        throw new Error(`missing totals: ${CLAM_SCAN_FILENAME}`);
    }

    core.info(`ClamAV	${totals[0]}`)
    if (+totals[0] > VIRUS_THRESHOLD) {
        throw new Error(`ClamAV threat threshold exceeded: ${totals[0]}`);
    }
}

function processTrivyReport(severity: string, result: ScanResult | null) {
    if (result === null) {
        throw new Error(`failed to read file: ${TRIVY_SCAN_FILENAME}`)
    }

    const summary = result.content.match(/^Total:.*/)
    if (summary === null || summary.length === 0) {
        throw new Error(`missing totals: ${TRIVY_SCAN_FILENAME}`);
    }

    const totals = summary[0].match(/\d+/)
    if (totals === null || totals.some((value) => (isNaN(+value)))) {
        throw new Error(`missing totals: ${TRIVY_SCAN_FILENAME}`);
    }

    core.info(`Trivy	${summary}`)
    if (
        ((severity === 'CRITICAL') &&
            (
                +totals[0] > CRITICAL_VULNS_THRESHOLD)
        ) ||

        ((severity === 'HIGH') &&
            (
                +totals[0] > HIGH_VULNS_THRESHOLD ||
                +totals[1] > CRITICAL_VULNS_THRESHOLD)
        ) ||

        ((severity === 'MEDIUM') &&
            (
                +totals[0] > MEDIUM_VULNS_THRESHOLD ||
                +totals[1] > HIGH_VULNS_THRESHOLD ||
                +totals[2] > CRITICAL_VULNS_THRESHOLD)
        ) ||

        ((severity === 'LOW') &&
            (
                +totals[0] > LOW_VULNS_THRESHOLD ||
                +totals[1] > MEDIUM_VULNS_THRESHOLD ||
                +totals[2] > HIGH_VULNS_THRESHOLD ||
                +totals[3] > CRITICAL_VULNS_THRESHOLD)
        ) ||

        ((severity === 'UNKNOWN') &&
            (
                +totals[0] > UNKNOWN_VULNS_THRESHOLD ||
                +totals[1] > LOW_VULNS_THRESHOLD ||
                +totals[2] > MEDIUM_VULNS_THRESHOLD ||
                +totals[3] > HIGH_VULNS_THRESHOLD ||
                +totals[4] > CRITICAL_VULNS_THRESHOLD)
        )
    ) {
        throw new Error(`report image threats file ${TRIVY_SCAN_FILENAME} threat threshold exceeded`);
    }

}

export async function checkImageThreats(config: X9Config): Promise<void> {
    core.startGroup('X9 will find something to blame now...');
    await fetchX9Dockerfile(config.x9ContainerDistro)

    const severity = minimalSeverity(config.minimalSeverity);
    const results = await scanImage(config.image, severity)

    if (config.ignoreThreats) {
        core.info('ignore_threats is true, skipping workflow interruption')
        return
    }

    processClamReport(results.clamReport)
    processTrivyReport(config.minimalSeverity, results.trivyReport)
    core.info('report image threats successfully finished');
    core.endGroup();
};