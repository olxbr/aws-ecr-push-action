const fs = require("fs");
const os = require("os");
const path = require("path");
const { executeSyncCmd } = require("./utils");

const {
  normalizeX9Distros,
  checkTrivyResults,
  reportImageThreats,
} = require("./sec");

const log4jScan = `localhost (alpine 3.18.4)
==========
Total: 2 (CRITICAL: 2)

+-------------------------------------+------------------+----------+-------------------+---------------+---------------------------------------+
|               LIBRARY               | VULNERABILITY ID | SEVERITY | INSTALLED VERSION | FIXED VERSION |                 TITLE                 |
+-------------------------------------+------------------+----------+-------------------+---------------+---------------------------------------+
| org.apache.logging.log4j:log4j-api  | CVE-2021-44228   | CRITICAL | 2.11.1            | 2.15.0        | log4j-core: Remote code execution     |
|                                     |                  |          |                   |               | in Log4j 2.x when logs contain        |
|                                     |                  |          |                   |               | an attacker-controlled...             |
|                                     |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2021-44228 |
+-------------------------------------+                  +          +                   +               +                                       +
| org.apache.logging.log4j:log4j-core |                  |          |                   |               |                                       |
|                                     |                  |          |                   |               |                                       |
|                                     |                  |          |                   |               |                                       |
|                                     |                  |          |                   |               |                                       |
+-------------------------------------+------------------+----------+-------------------+---------------+---------------------------------------+
`;

const noVulnerabilitiesScan = `localhost (alpine 3.18.4)
=========================
Total: 0 (CRITICAL: 0)
`;

const vulnerabilitiesScan = `localhost (alpine 3.18.4)
=========================
Total: 10 (CRITICAL: 10)
`;

const failedScan = `123`;

const unknownOsScan = `Detected OS: unknown`;

test("Test old X9 Distros", async () => {
  let normalized = normalizeX9Distros("alpine.clamav.trivy");
  expect(normalized).toBe("alpine.trivy");
  normalized = normalizeX9Distros("debian.clamav.trivy");
  expect(normalized).toBe("debian.trivy");
  normalized = normalizeX9Distros("distroless.clamav.trivy");
  expect(normalized).toBe("distroless.trivy");
  normalized = normalizeX9Distros("something.clamav.trivy");
  expect(normalized).toBe("distroless.trivy");

  normalized = normalizeX9Distros("something");
  expect(normalized).toBe("distroless.trivy");

  normalized = normalizeX9Distros("debian.trivy");
  expect(normalized).toBe("debian.trivy");

  normalized = normalizeX9Distros("debian.clamav.trivy");
  expect(normalized).toBe("debian.trivy");

  normalized = normalizeX9Distros("debian.trivy.other.something");
  expect(normalized).toBe("debian.trivy");
});

describe("Check trivy results", () => {
  const testForTrivy = (contentToWrite, testFunction) => {
    let tmpDir;
    const appPrefix = "scans";
    try {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix));
      tmpFile = `${tmpDir}/image-vulnerabilities-trivy.txt`;
      fs.writeFileSync(tmpFile, contentToWrite);
      testFunction(tmpDir);
    } finally {
      if (tmpDir) {
        fs.rmSync(tmpDir, { recursive: true });
      }
    }
  };

  test("Check trivy enforced CVEs", async () => {
    testForTrivy(log4jScan, (tmpDir) => {
      expect(() => checkTrivyResults(tmpDir, "CRITICAL")).toThrow(
        new Error(`enforced cve found. Please, fix it right now!`)
      );
    });
  });

  test("Check trivy critical threshold exceeded", async () => {
    testForTrivy(vulnerabilitiesScan, (tmpDir) => {
      expect(() => checkTrivyResults(tmpDir, "CRITICAL")).toThrow(
        new Error(
          `report image threats file image-vulnerabilities-trivy.txt threat threshold exceeded`
        )
      );
    });
  });

  test("Check trivy failed scan", async () => {
    testForTrivy(failedScan, (tmpDir) => {
      failed = checkTrivyResults(tmpDir, "CRITICAL");
      expect(failed).toBe(
        "report image threats file image-vulnerabilities-trivy.txt reading failed. Check will NOT be executed!"
      );
    });
  });

  test("Check trivy unknown OS", async () => {
    testForTrivy(unknownOsScan, (tmpDir) => {
      failed = checkTrivyResults(tmpDir, "CRITICAL");
      expect(failed).toBe(
        "os not supported by Trivy, skipping workflow interruption"
      );
    });
  });

  test("Check trivy passes", async () => {
    testForTrivy(noVulnerabilitiesScan, (tmpDir) => {
      expect(() => checkTrivyResults(tmpDir, "CRITICAL")).not.toThrow();
    });
  });
});

jest.mock("./utils");
describe("Wrap spawnSync", () => {
  const readdirSync = jest.spyOn(fs, "readdirSync");
  const originalChdir = process.chdir;
  const mockChdir = jest.fn();

  beforeEach(() => {
    mockChdir.mockClear();
    process.chdir = mockChdir;
    executeSyncCmd.mockClear();
    readdirSync.mockClear();
  });

  afterEach(() => {
    process.chdir = originalChdir;
  });

  it("reportImageThreats success", async () => {
    executeSyncCmd.mockImplementation(() => true);

    readdirSync.mockReturnValue(["image-vulnerabilities-trivy.txt"]);

    const config = {
      scansFolder: "scans",
      x9ContainersDistro: "alpine.trivy",
      minimalSeverity: "CRITICAL",
      tags: ["latest"],
      repositoryNames: ["test"],
      aws: {
        ECR_ENDPOINT: "123456789012.dkr.ecr.us-east-1.amazonaws.com",
      },
    };

    const result = reportImageThreats(config);
    expect(result).toBe("report image threats successfully finished");

    expect(mockChdir).toHaveBeenCalledTimes(2);
    expect(executeSyncCmd).toHaveBeenCalledTimes(11);
    expect(readdirSync).toHaveBeenCalledTimes(1);
  });
});
