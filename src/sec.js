const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { executeSyncCmd } = require("./utils");

const VIRUS_THRESHOLD = 0;
const CRITICAL_VULNS_THRESHOLD = 3;
const HIGH_VULNS_THRESHOLD = 20;
const MEDIUM_VULNS_THRESHOLD = 40;
const LOW_VULNS_THRESHOLD = 75;
const UNKNOWN_VULNS_THRESHOLD = 150;
const X9CONTAINERS_UUID = uuidv4();
const enforced = require("./enforcedCVEs.js");

// pseudo logger
function info(msg) {
  require("./logger").info(`sec.js - ${msg}`);
}
function warn(msg) {
  require("./logger").warn(`sec.js - ${msg}`);
}

const normalizeX9Distros = (distro) => {
  if (distro === undefined || distro === "") {
    // return default distro
    return "distroless.trivy";
  }
  parts = distro.split(".");
  if (parts.length == 1) {
    // return default distro
    return "distroless.trivy";
  }

  var distroName = "distroless";
  switch (parts[0].toLowerCase()) {
    case "alpine":
      distroName = "alpine";
      break;
    case "debian":
      distroName = "debian";
      break;
    case "distroless":
      break;
    default:
      break;
  }

  return distroName + ".trivy";
};

const checkTrivyResults = (scansFolder, minimalSeverity) => {
  // Evaluate findings from Trivy
  const trivyScanFileName = "image-vulnerabilities-trivy.txt";
  const trivyScanFile = `${scansFolder}/${trivyScanFileName}`;
  if (
    !fs.existsSync(trivyScanFile) ||
    fs.readFileSync(trivyScanFile).length < 4
  ) {
    msg = `report image threats file ${trivyScanFileName} reading failed. Check will NOT be executed!`;
    warn(msg);
    return msg;
  }

  const reportContent = fs.readFileSync(trivyScanFile);

  if (reportContent.includes("Detected OS: unknown")) {
    info("os not supported by Trivy, skipping workflow interruption");
    return "os not supported by Trivy, skipping workflow interruption";
  }

  const totalLine = reportContent.toString().match(/^(Total:.*)/gm);
  if (totalLine === null || totalLine.length === 0 ) {
    throw new Error(`Unable to find total line in ${trivyScanFileName}`);
  }
  // Useful when there is more than 1 'totals'
  if (totalLine.length > 1) {
    info(`result has more than 1 summary. Sort the array from Bigger to Lower. Total line has ${totalLine}`)
    totalLine = totalLine.sort().reverse()
  }
  const totalsTrivy = totalLine[0].match(/\d+/);
  if (totalsTrivy.some(isNaN)) {
    throw new Error(
      `report image threats file ${trivyScanFileName} missing totals`
    );
  }
  if (
    (`${minimalSeverity}` === "CRITICAL" &&
      totalsTrivy[0] > CRITICAL_VULNS_THRESHOLD) ||
    (`${minimalSeverity}` === "HIGH" &&
      (totalsTrivy[0] > HIGH_VULNS_THRESHOLD ||
        totalsTrivy[1] > CRITICAL_VULNS_THRESHOLD)) ||
    (`${minimalSeverity}` === "MEDIUM" &&
      (totalsTrivy[0] > MEDIUM_VULNS_THRESHOLD ||
        totalsTrivy[1] > HIGH_VULNS_THRESHOLD ||
        totalsTrivy[2] > CRITICAL_VULNS_THRESHOLD)) ||
    (`${minimalSeverity}` === "LOW" &&
      (totalsTrivy[0] > LOW_VULNS_THRESHOLD ||
        totalsTrivy[1] > MEDIUM_VULNS_THRESHOLD ||
        totalsTrivy[2] > HIGH_VULNS_THRESHOLD ||
        totalsTrivy[3] > CRITICAL_VULNS_THRESHOLD)) ||
    (`${minimalSeverity}` === "UNKNOWN" &&
      (totalsTrivy[0] > UNKNOWN_VULNS_THRESHOLD ||
        totalsTrivy[1] > LOW_VULNS_THRESHOLD ||
        totalsTrivy[2] > MEDIUM_VULNS_THRESHOLD ||
        totalsTrivy[3] > HIGH_VULNS_THRESHOLD ||
        totalsTrivy[4] > CRITICAL_VULNS_THRESHOLD))
  ) {
    throw new Error(
      `report image threats file ${trivyScanFileName} threat threshold exceeded`
    );
  }

  const critical_cves = enforced.CVES;
  if (
    critical_cves.some(function (cve) {
      if (reportContent.includes(cve)) {
        info(`the CVE ${cve} is listed as an enforced CVE`);
        return true;
      }
      return false;
    })
  ) {
    throw new Error(`enforced cve found. Please, fix it right now!`);
  }
};

const reportImageThreats = (config) => {
  info(
    `X9Containers will find something to blame now... on process ID: ${X9CONTAINERS_UUID}`
  );

  // Obtain a X9Containers Dockerfile
  var dockerfileName = `${X9CONTAINERS_UUID}.X9.Dockerfile`;
  var workspace = `${X9CONTAINERS_UUID}_X9Containers`;
  var rootDir = __dirname.replace(/\/(src|dist).*/, "").replace(/&/g, ""); // File can be on src or dist

  executeSyncCmd("mkdir", ["-p", `${workspace}`]);
  process.chdir(`${workspace}`);
  info(`PWD is ${rootDir}/${workspace}`);

  const normalizedDistro = normalizeX9Distros(config.x9ContainersDistro);

  // Get Dockerfile and Trivy directly from current action
  executeSyncCmd(
    "cp",
    [
      `${rootDir}/X9Containers/${normalizedDistro}.X9.Dockerfile`,
      `${dockerfileName}`,
    ],
    `report image threats cp ${normalizedDistro}.X9.Dockerfile failed`
  );
  info(`report image threats cp ${normalizedDistro}.X9.Dockerfile done`);

  executeSyncCmd(
    "cp",
    [
      `${rootDir}/X9Containers/${config.trivyIgnoreFile}`,
      `${config.trivyIgnoreFile}`,
    ],
    `report image threats cp ${config.trivyIgnoreFile}.X9.Dockerfile failed`
  );
  info(`report image threats cp ${config.trivyIgnoreFile} done`);

  // Run image scan
  info("report image threats analysis will start");
  var minimalSeverity = "";
  switch (`${config.minimalSeverity}`) {
    case "CRITICAL":
      minimalSeverity = "CRITICAL";
      break;
    case "HIGH":
      minimalSeverity = "HIGH,CRITICAL";
      break;
    case "MEDIUM":
      minimalSeverity = "MEDIUM,HIGH,CRITICAL";
      break;
    case "LOW":
      minimalSeverity = "LOW,MEDIUM,HIGH,CRITICAL";
      break;
    default:
      config.minimalSeverity = "UNKNOWN";
      minimalSeverity = "UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL";
      break;
  }

  var suspectImageName = `${X9CONTAINERS_UUID}_suspectimage`;
  executeSyncCmd(
    "docker",
    [
      "build",
      "-f",
      `${dockerfileName}`,
      "-t",
      `${suspectImageName}`,
      "--build-arg",
      `REGISTRY=${config.aws["ECR_ENDPOINT"]}`,
      "--build-arg",
      "TRIVY_IMAGE=public.ecr.aws/aquasecurity/trivy:latest",
      "--build-arg",
      "BASE_IMAGE=public.ecr.aws/docker/library/alpine:3.18",
      "--build-arg",
      `TARGET_IMAGE=${config.repositoryNames[0]}:${config.tags[0]}`,
      "--build-arg",
      `TRIVY_SEVERITY=${minimalSeverity}`,
      "--build-arg",
      `TRIVY_IGNORE_FILE=${config.trivyIgnoreFile}`,
      "--no-cache",
      ".",
    ],
    "",
    { DOCKER_BUILDKIT: config.dockerBuildkit }
  );

  info(`report image threats docker build done, removing ${dockerfileName}`);
  executeSyncCmd("rm", ["-rf", `${dockerfileName}`]);

  // Extract scan results from never started container
  info("copying scan results from suspect container");
  var suspectContainerName = `${X9CONTAINERS_UUID}_suspectcontainer`;
  const scansFolder = `./${X9CONTAINERS_UUID}_scans`;
  executeSyncCmd("docker", [
    "create",
    "--name",
    `${suspectContainerName}`,
    `${suspectImageName}`,
  ]);
  executeSyncCmd("docker", [
    "cp",
    `${suspectContainerName}:/scans`,
    `${scansFolder}`,
  ]);
  fs.readdirSync(scansFolder).forEach((report) => {
    executeSyncCmd("cat", [`${scansFolder}/${report}`]);
  });

  info(
    `reports copied, removing containers ${suspectContainerName} and ${suspectImageName}`
  );
  executeSyncCmd("docker", ["rm", `${suspectContainerName}`]);
  executeSyncCmd("docker", ["rmi", `${suspectImageName}`]);

  // Assert the need of threat evaluation
  if (config.ignoreThreats === "true") {
    info(
      "::warning title=DeprecationWarning::Ignoring 'ignore_threats' configuration, please consider removing this option from action parameters"
    );
    info("ignore_threats was set to true, but the threats won't be ignored");
  }

  try {
    checkTrivyResults(scansFolder, config.minimalSeverity);
  } finally {
    // Ensure cleanup
    info(
      `report image threats successfully finished. Removing temporary folder ${workspace}`
    );
    process.chdir("..");
    executeSyncCmd("rm", ["-rf", `${workspace}`]);
  }

  return "report image threats successfully finished";
};

exports.reportImageThreats = reportImageThreats;
exports.normalizeX9Distros = normalizeX9Distros;
exports.checkTrivyResults = checkTrivyResults;
