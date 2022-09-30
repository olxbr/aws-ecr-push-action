const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const { executeSyncCmd } = require('./utils');

const VIRUS_THRESHOLD = 0;
const CRITICAL_VULNS_THRESHOLD = 5;
const HIGH_VULNS_THRESHOLD = 25;
const MEDIUM_VULNS_THRESHOLD = 50;
const LOW_VULNS_THRESHOLD = 125;
const UNKNOWN_VULNS_THRESHOLD = 500;
const X9CONTAINERS_UUID = uuidv4();
const enforced = require('./enforcedCVEs.js');

// pseudo logger
function info(msg) {
  require('./logger').info(`sec.js - ${msg}`)
}

const reportImageThreats = (config) => {
  info(`X9Containers will find something to blame now... on process ID: ${X9CONTAINERS_UUID}`);

  // Obtain a X9Containers Dockerfile
  var dockerfileName = `${X9CONTAINERS_UUID}.X9.Dockerfile`;
  var workspace = `${X9CONTAINERS_UUID}_X9Containers`;
  var rootDir = __dirname.replace(/\/(src|dist).*/,'')

  executeSyncCmd('mkdir', ['-p', `${workspace}`]);
  process.chdir(`${workspace}`);
  info(`PWD is ${rootDir}/${workspace}`);

  // Get Dockerfile and Trivy directly from current action
  executeSyncCmd(
    'cp',
    [
      `${rootDir}/X9Containers/${config.x9ContainersDistro}.X9.Dockerfile`,
      `${dockerfileName}`
    ],
    `report image threats cp ${config.x9ContainersDistro}.X9.Dockerfile failed`
  )
  info(`report image threats cp ${config.x9ContainersDistro}.X9.Dockerfile done`);

  executeSyncCmd(
    'cp',
    [
      `${rootDir}/X9Containers/${config.trivyIgnoreFile}`,
      `${config.trivyIgnoreFile}`
    ],
    `report image threats cp ${config.trivyIgnoreFile}.X9.Dockerfile failed`
  )
  info(`report image threats cp ${config.trivyIgnoreFile} done`);

  // Run image scan
  info('report image threats analysis will start');
  var minimalSeverity = '';
  switch (`${config.minimalSeverity}`) {
    case 'CRITICAL':
      minimalSeverity = 'CRITICAL';
      break;
    case 'HIGH':
      minimalSeverity = 'HIGH,CRITICAL';
      break;
    case 'MEDIUM':
      minimalSeverity = 'MEDIUM,HIGH,CRITICAL';
      break;
    case 'LOW':
      minimalSeverity = 'LOW,MEDIUM,HIGH,CRITICAL';
      break;
    default:
      config.minimalSeverity = 'UNKNOWN';
      minimalSeverity = 'UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL';
      break;
  }

  var suspectImageName = `${X9CONTAINERS_UUID}_suspectimage`
  executeSyncCmd(
    'docker',
    [
      'build',
      '-f',
      `${dockerfileName}`,
      '-t',
      `${suspectImageName}`,
      '--build-arg',
      `REGISTRY=${config.aws['ECR_ENDPOINT']}`,
      '--build-arg',
      'CLAMAV_IMAGE=cross/devsecops/clamav:latest',
      '--build-arg',
      'TRIVY_IMAGE=cross/devsecops/trivy:latest',
      '--build-arg',
      'BASE_IMAGE=public.ecr.aws/docker/library/alpine:3.14',
      '--build-arg',
      `TARGET_IMAGE=${config.repositoryNames[0]}:${config.tags[0]}`,
      '--build-arg',
      `TRIVY_SEVERITY=${minimalSeverity}`,
      '--build-arg',
      `TRIVY_IGNORE_FILE=${config.trivyIgnoreFile}`,
      '--no-cache',
      '.'
    ]
  );

  info(`report image threats docker build done, removing ${dockerfileName}`);
  executeSyncCmd('rm', ['-rf', `${dockerfileName}`]);

  // Extract scan results from never started container
  info('report image threats fetching reports');
  var suspectContainerName = `${X9CONTAINERS_UUID}_suspectcontainer`
  const scansFolder = `./${X9CONTAINERS_UUID}_scans`;
  executeSyncCmd('docker', ['create', '--name', `${suspectContainerName}`, `${suspectImageName}`]);
  executeSyncCmd('docker', ['cp', `${suspectContainerName}:/scans`, `${scansFolder}`]);
  fs.readdirSync(scansFolder).forEach(report => {
    executeSyncCmd('cat', [`${scansFolder}/${report}`]);
  });

  info(`report image threats reports got. Removing ${suspectContainerName} and ${suspectImageName}`);
  executeSyncCmd('docker', ['rm', `${suspectContainerName}`]);
  executeSyncCmd('docker', ['rmi', `${suspectImageName}`]);

  // Assert the need of threat evaluation
  if (config.ignoreThreats === 'true') {
    info("::warning title=DeprecationWarning::Ignoring 'ignore_threats' configuration, please consider removing this option from action parameters");
    info("ignore_threats was set to true, but the threats won't be ignored");
  }

  // Evaluate findings from ClamAV
  const clamScanFileName = 'recursive-root-dir-clamscan.txt';
  const clamScanFile = `${scansFolder}/${clamScanFileName}`;
  if (fs.existsSync(clamScanFile)) {
    process.stdout.write('ClamAV	');
    const grepClam = executeSyncCmd(
      'grep',
      ['^Infected files: ', `${clamScanFile}`],
      `report image threats file ${clamScanFileName} grep failed`
    );
    const totalsClam = grepClam.match(/\d+/);
    if (totalsClam.some(isNaN)) {
      throw new Error(`report image threats file ${clamScanFileName} missing totals`);
    }
    if (totalsClam[0] > VIRUS_THRESHOLD) {
      throw new Error(`report image threats file ${clamScanFileName} threat threshold exceeded`);
    }
  }

  // Evaluate findings from Trivy
  const trivyScanFileName = 'image-vulnerabilities-trivy.txt';
  const trivyScanFile = `${scansFolder}/${trivyScanFileName}`;
  if (!fs.existsSync(trivyScanFile)) {
    throw new Error(`report image threats file ${trivyScanFileName} reading failed`);
  }

  const reportContent = fs.readFileSync(trivyScanFile);

  if (reportContent.includes('Detected OS: unknown')) {
    info('os not supported by Trivy, skipping workflow interruption');
    return 'os not supported by Trivy, skipping workflow interruption';
  }

  process.stdout.write('Trivy	');
  const grepTrivy = executeSyncCmd(
    'grep',
    ['^Total: ', `${trivyScanFile}`],
    `report image threats file ${trivyScanFileName} grep failed`
  );
  const totalsTrivy = grepTrivy.match(/\d+/);
  if (totalsTrivy.some(isNaN)) {
    throw new Error(`report image threats file ${trivyScanFileName} missing totals`);
  }
  if (
    ((`${config.minimalSeverity}` === 'CRITICAL') &&
      (
        totalsTrivy[0] > CRITICAL_VULNS_THRESHOLD)
    ) ||

    ((`${config.minimalSeverity}` === 'HIGH') &&
      (
        totalsTrivy[0] > HIGH_VULNS_THRESHOLD ||
        totalsTrivy[1] > CRITICAL_VULNS_THRESHOLD)
    ) ||

    ((`${config.minimalSeverity}` === 'MEDIUM') &&
      (
        totalsTrivy[0] > MEDIUM_VULNS_THRESHOLD ||
        totalsTrivy[1] > HIGH_VULNS_THRESHOLD ||
        totalsTrivy[2] > CRITICAL_VULNS_THRESHOLD)
    ) ||

    ((`${config.minimalSeverity}` === 'LOW') &&
      (
        totalsTrivy[0] > LOW_VULNS_THRESHOLD ||
        totalsTrivy[1] > MEDIUM_VULNS_THRESHOLD ||
        totalsTrivy[2] > HIGH_VULNS_THRESHOLD ||
        totalsTrivy[3] > CRITICAL_VULNS_THRESHOLD)
    ) ||

    ((`${config.minimalSeverity}` === 'UNKNOWN') &&
      (
        totalsTrivy[0] > UNKNOWN_VULNS_THRESHOLD ||
        totalsTrivy[1] > LOW_VULNS_THRESHOLD ||
        totalsTrivy[2] > MEDIUM_VULNS_THRESHOLD ||
        totalsTrivy[3] > HIGH_VULNS_THRESHOLD ||
        totalsTrivy[4] > CRITICAL_VULNS_THRESHOLD)
    )
  ) {
    throw new Error(`report image threats file ${trivyScanFileName} threat threshold exceeded`);
  }

  const critical_cves = enforced.CVES;
  if (critical_cves.some(
    function (cve) {
      if (reportContent.includes(cve)) {
        info(`the CVE ${cve} is listed as an enforced CVE`);
        return true;
      }
      return false;
    }
  )) {
    throw new Error(`enforced cve found. Please, fix it right now!`);
  }

  // End scan
  info(`report image threats successfully finished. Removing temporary folder ${workspace}`);
  process.chdir('..');
  executeSyncCmd('rm', ['-rf', `${workspace}`]);

  return 'report image threats successfully finished';
};


exports.reportImageThreats = reportImageThreats;
