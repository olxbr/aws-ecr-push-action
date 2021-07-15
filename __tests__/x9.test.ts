import * as exec from '@actions/exec';
import * as x9 from '../src/x9';

describe('minimalSeverity', () => {
  test.each([
    ['', 'UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL'],
    ['LOW', 'LOW,MEDIUM,HIGH,CRITICAL'],
    ['MEDIUM', 'MEDIUM,HIGH,CRITICAL'],
    ['HIGH', 'HIGH,CRITICAL'],
    ['CRITICAL', 'CRITICAL']
  ])('given a severity %p returns all > than current', (config: string, expected: string) => {
    const trivySeverity = x9.minimalSeverity(config);
    expect(trivySeverity).toEqual(expected);
  });
});

describe('scanImage', () => {
  it('can scan', async () => {
    const execSpy: jest.SpyInstance = jest.spyOn(exec, 'getExecOutput').mockImplementation(async (): Promise<exec.ExecOutput> => {
      return {
        exitCode: 0,
        stdout: '',
        stderr: ''
      };
    });

    const results = await x9.scanImage('image', 'UNKNOWN');

    expect(results.clamReport).toStrictEqual({
      file: './scans/recursive-root-dir-clamscan.txt',
      content: `/base-root/eicar.com: Win.Test.EICAR_HDB-1 FOUND

----------- SCAN SUMMARY -----------
Known viruses: 8545589
Engine version: 0.103.2
Scanned directories: 102
Scanned files: 227
Infected files: 1
Data scanned: 28.09 MB
Data read: 8.87 MB (ratio 3.17:1)
Time: 37.937 sec (0 m 37 s)
Start Date: 2021:07:14 19:47:26
End Date:   2021:07:14 19:48:04
`
    });

    expect(results.trivyReport).toStrictEqual({
      file: './scans/image-vulnerabilities-trivy.txt',
      content: `2021-07-14T19:40:58.407Z	[34mINFO[0m	Need to update DB
2021-07-14T19:40:58.407Z	[34mINFO[0m	Downloading DB...
2021-07-14T19:41:22.366Z	[34mINFO[0m	Detected OS: alpine
2021-07-14T19:41:22.366Z	[34mINFO[0m	Detecting Alpine vulnerabilities...
2021-07-14T19:41:22.370Z	[34mINFO[0m	Number of language-specific files: 0

localhost (alpine 3.14.0)
=========================
Total: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)

`
    });

    expect(execSpy).toBeCalledTimes(5);
    expect(execSpy).toHaveBeenCalledWith('docker', ['build', '-f', 'X9.Dockerfile', '-t', 'suspectimage', '--build-arg', 'IMAGE=image', '--build-arg', 'TRIVY_SEVERITY=UNKNOWN', '.'], {
      ignoreReturnCode: true,
      silent: true
    });
    expect(execSpy).toHaveBeenCalledWith('docker', ['create', '--name', 'suspectcontainer', 'suspectimage'], {
      ignoreReturnCode: true,
      silent: true
    });
    expect(execSpy).toHaveBeenCalledWith('docker', ['cp', 'suspectcontainer:/scans', `./scans`], {
      ignoreReturnCode: true,
      silent: true
    });
    expect(execSpy).toHaveBeenCalledWith('docker', ['stop', 'suspectcontainer'], {
      ignoreReturnCode: true,
      silent: true
    });
    expect(execSpy).toHaveBeenCalledWith('docker', ['rm', 'suspectcontainer'], {
      ignoreReturnCode: true,
      silent: true
    });
  });
});

describe('clamReport', () => {
  it('virus', () => {
    expect(() => {
      x9.processClamReport({
        file: 'scans/scans/recursive-root-dir-clamscan.txt',
        content: `/base-root/eicar.com: Win.Test.EICAR_HDB-1 FOUND

----------- SCAN SUMMARY -----------
Known viruses: 8545589
Engine version: 0.103.2
Scanned directories: 102
Scanned files: 227
Infected files: 1
Data scanned: 28.09 MB
Data read: 8.87 MB (ratio 3.17:1)
Time: 37.937 sec (0 m 37 s)
Start Date: 2021:07:14 19:47:26
End Date:   2021:07:14 19:48:04`
      });
    }).toThrowError(`ClamAV threat threshold exceeded: 1`);
  });

  it('passes', () => {
    expect(() => {
      x9.processClamReport({
        file: 'scans/scans/recursive-root-dir-clamscan.txt',
        content: `
----------- SCAN SUMMARY -----------
Known viruses: 8545589
Engine version: 0.103.2
Scanned directories: 102
Scanned files: 227
Infected files: 0
Data scanned: 28.09 MB
Data read: 8.87 MB (ratio 3.17:1)
Time: 37.937 sec (0 m 37 s)
Start Date: 2021:07:14 19:47:26
End Date:   2021:07:14 19:48:04`
      });
    }).not.toThrowError(`ClamAV threat threshold exceeded: 1`);
  });
});

describe('trivyReport', () => {
  it('unknown', () => {
    expect(() => {
      x9.processTrivyReport('UNKNOWN', {
        file: 'scans/scans/recursive-root-dir-clamscan.txt',
        content: `2021-07-14T19:40:58.407Z	INFO	Need to update DB
2021-07-14T19:40:58.407Z	INFO	Downloading DB...
2021-07-14T19:41:22.366Z	INFO	Detected OS: alpine
2021-07-14T19:41:22.366Z	INFO	Detecting Alpine vulnerabilities...
2021-07-14T19:41:22.370Z	INFO	Number of language-specific files: 0

localhost (alpine 3.14.0)
=========================
Total: 5021 (UNKNOWN: 5000, LOW: 0, MEDIUM: 0, HIGH: 1, CRITICAL: 20)
`
      });
    }).toThrowError(`Trivy threat threshold exceeded, total vulnerabilities found: 5021`);
  });
  it('LOW', () => {
    expect(() => {
      x9.processTrivyReport('LOW', {
        file: 'scans/scans/recursive-root-dir-clamscan.txt',
        content: `2021-07-14T19:40:58.407Z	INFO	Need to update DB
2021-07-14T19:40:58.407Z	INFO	Downloading DB...
2021-07-14T19:41:22.366Z	INFO	Detected OS: alpine
2021-07-14T19:41:22.366Z	INFO	Detecting Alpine vulnerabilities...
2021-07-14T19:41:22.370Z	INFO	Number of language-specific files: 0

localhost (alpine 3.14.0)
=========================
Total: 21 (LOW: 0, MEDIUM: 0, HIGH: 1, CRITICAL: 20)
`
      });
    }).toThrowError(`Trivy threat threshold exceeded, total vulnerabilities found: 21`);
  });
  it('MEDIUM', () => {
    expect(() => {
      x9.processTrivyReport('MEDIUM', {
        file: 'scans/scans/recursive-root-dir-clamscan.txt',
        content: `2021-07-14T19:40:58.407Z	INFO	Need to update DB
2021-07-14T19:40:58.407Z	INFO	Downloading DB...
2021-07-14T19:41:22.366Z	INFO	Detected OS: alpine
2021-07-14T19:41:22.366Z	INFO	Detecting Alpine vulnerabilities...
2021-07-14T19:41:22.370Z	INFO	Number of language-specific files: 0

localhost (alpine 3.14.0)
=========================
Total: 21 (MEDIUM: 0, HIGH: 1, CRITICAL: 20)
`
      });
    }).toThrowError(`Trivy threat threshold exceeded, total vulnerabilities found: 21`);
  });
  it('HIGH', () => {
    expect(() => {
      x9.processTrivyReport('HIGH', {
        file: 'scans/scans/recursive-root-dir-clamscan.txt',
        content: `2021-07-14T19:40:58.407Z	INFO	Need to update DB
2021-07-14T19:40:58.407Z	INFO	Downloading DB...
2021-07-14T19:41:22.366Z	INFO	Detected OS: alpine
2021-07-14T19:41:22.366Z	INFO	Detecting Alpine vulnerabilities...
2021-07-14T19:41:22.370Z	INFO	Number of language-specific files: 0

localhost (alpine 3.14.0)
=========================
Total: 21 (HIGH: 1, CRITICAL: 20)
`
      });
    }).toThrowError(`Trivy threat threshold exceeded, total vulnerabilities found: 21`);
  });
  it('CRITICAL', () => {
    expect(() => {
      x9.processTrivyReport('CRITICAL', {
        file: 'scans/scans/recursive-root-dir-clamscan.txt',
        content: `2021-07-14T19:40:58.407Z	INFO	Need to update DB
2021-07-14T19:40:58.407Z	INFO	Downloading DB...
2021-07-14T19:41:22.366Z	INFO	Detected OS: alpine
2021-07-14T19:41:22.366Z	INFO	Detecting Alpine vulnerabilities...
2021-07-14T19:41:22.370Z	INFO	Number of language-specific files: 0

localhost (alpine 3.14.0)
=========================
Total: 20 (CRITICAL: 20)
`
      });
    }).toThrowError(`Trivy threat threshold exceeded, total vulnerabilities found: 20`);
  });
});
