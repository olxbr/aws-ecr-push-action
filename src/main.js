const {
  ECRClient,
  DescribeRepositoriesCommand,
  CreateRepositoryCommand,
  GetAuthorizationTokenCommand,
  SetRepositoryPolicyCommand,
  PutImageScanningConfigurationCommand,
  ImageScanningConfiguration
} = require('@aws-sdk/client-ecr');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { buildPolicy } = require('./policy');
const { executeSyncCmd } = require('./utils');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const process = require('process');

const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const AWS_PRINCIPAL_RULES = process.env.AWS_PRINCIPAL_RULES;
const ECR_ENDPOINT = `${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com`;

const VIRUS_THRESHOLD = 0;
const CRITICAL_VULNS_THRESHOLD = 10;
const HIGH_VULNS_THRESHOLD = 50;
const MEDIUM_VULNS_THRESHOLD = 100;
const LOW_VULNS_THRESHOLD = 250;
const UNKNOWN_VULNS_THRESHOLD = 1000;
const X9CONTAINERS_UUID = uuidv4();
const enforced = require('./enforcedCVEs.js');

const credentialsProvider = defaultProvider({ timeout: 20000 });

const client = new ECRClient({
  region: 'us-east-1',
  credentialDefaultProvider: credentialsProvider
});

const describeRepo = (params) => client.send(new DescribeRepositoriesCommand(params));
const createRepo = (params) => client.send(new CreateRepositoryCommand(params));
const getAuthorizationToken = (params) => client.send(new GetAuthorizationTokenCommand(params));
const setRepositoryPolicy = (params) => client.send(new SetRepositoryPolicyCommand(params));
const putImageScanningConfiguration = (params) => client.send(new PutImageScanningConfigurationCommand(params));


const describeRepoErrorHandler = (config) => async (err) => {
  if (err.name !== 'RepositoryNotFoundException') {
    throw new Error(err.message);
  }

  const repositoryName = config.repositoryNames[0];
  const repoData = await createRepo({ repositoryName });

  await defineRepositoryPolicy(); // NOSONAR

  await putImageScanningConfiguration({
    repositoryName,
    imageScanningConfiguration: new ImageScanningConfiguration({ scanOnPush: true })
  });

  return repoData.repository;
}

const getRepositoryUri = async (config) => {
  let describeRepoReturn
  try {
    describeRepoReturn = await describeRepo(config); // NOSONAR
  }
  catch (err) {
    describeRepoReturn = describeRepoErrorHandler(config)(err);
  }
  return describeRepoReturn

}

const defineRepositoryPolicy = async (config) => {
  console.log('Setting ECR default permissions...');
  const repositoryName = config.repositoryNames[0];
  const policy = buildPolicy({ awsPrincipalRules: AWS_PRINCIPAL_RULES });
  console.log(`Creating repository ${repositoryName}...`);
  console.log(`Policy: ${policy}`);

  const repositoryPolicy = await setRepositoryPolicy({
    repositoryName,
    policyText: policy
  });
  return repositoryPolicy
}

const parseAuthToken = async () => {
  console.log('Getting ECR auth token...');
  const response = await getAuthorizationToken({ registryIds: [AWS_ACCOUNT_ID] });
  const authData = response.authorizationData[0];

  const expires = authData.expiresAt;
  const proxyEndpoint = authData.proxyEndpoint;
  console.log(`Token will expire at ${expires}`);
  console.log(`Proxy endpoint: ${proxyEndpoint}`);

  const decodedTokenData = Buffer.from(authData.authorizationToken, 'base64').toString();
  const authArray = decodedTokenData.split(':');

  return {
    username: authArray[0],
    password: authArray[1],
    proxyEndpoint
  };
};

const dockerLoginOnECR = async () => {
  console.log('Login on ECR...');
  const loginData = await parseAuthToken();
  return executeSyncCmd('docker', [`login`, `-u`, loginData.username, '-p', loginData.password, loginData.proxyEndpoint]);
};

const pushImage = (config) => {
  console.log(`Pushing tag ${config.tag}...`);
  return executeSyncCmd('docker', ['push', `${ECR_ENDPOINT}/${config.repositoryNames[0]}:${config.tag}`]);
};

const reportImageThreats = (config) => {
  console.log(`X9Containers will find something to blame now... on process ID: ${X9CONTAINERS_UUID}`);

  // Obtain a X9Containers Dockerfile
  var dockerfileName = `${X9CONTAINERS_UUID}.X9.Dockerfile`;
  var workspace = `${X9CONTAINERS_UUID}_X9Containers`;

  executeSyncCmd('mkdir', ['-p', `${workspace}`]);
  process.chdir(`${workspace}`);

  executeSyncCmd(
    'curl',
    [
      `https://raw.githubusercontent.com/olxbr/aws-ecr-push-action/${config.x9ContainersBranch}/X9Containers/${config.x9ContainersDistro}.X9.Dockerfile`,
      '--output',
      `${dockerfileName}`
    ],
    `report image threats curl ${config.x9ContainersDistro}.X9.Dockerfile failed`
  );
  console.log(`report image threats curl ${config.x9ContainersDistro}.X9.Dockerfile done`);

  // Run image scan
  console.log('report image threats analysis will start');
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
      `REGISTRY=${ECR_ENDPOINT}`,
      '--build-arg',
      'CLAMAV_IMAGE=cross/devsecops/clamav:latest',
      '--build-arg',
      'TRIVY_IMAGE=cross/devsecops/trivy:latest',
      '--build-arg',
      'BASE_IMAGE=base_images/alpine:3.14-base',
      '--build-arg',
      `TARGET_IMAGE=${config.repositoryNames[0]}:${config.tags[0]}`,
      '--build-arg',
      `TRIVY_SEVERITY=${minimalSeverity}`,
      '--build-arg',
      `TRIVY_IGNORE_URL=${config.trivyIgnoreURL}`,
      '--no-cache',
      '.'
    ]
  );
  console.log(`report image threats docker build done, removing ${dockerfileName}`);
  executeSyncCmd('rm', ['-rf', `${dockerfileName}`]);

  // Extract scan results from never started container
  console.log('report image threats fetching reports');
  var suspectContainerName = `${X9CONTAINERS_UUID}_suspectcontainer`
  const scansFolder = `./${X9CONTAINERS_UUID}_scans`;
  executeSyncCmd('docker', ['create', '--name', `${suspectContainerName}`, `${suspectImageName}`]);
  executeSyncCmd('docker', ['cp', `${suspectContainerName}:/scans`, `${scansFolder}`]);
  fs.readdirSync(scansFolder).forEach(report => {
    executeSyncCmd('cat', [`${scansFolder}/${report}`]);
  });

  console.log(`report image threats reports got. Removing ${suspectContainerName} and ${suspectImageName}`);
  executeSyncCmd('docker', ['rm', `${suspectContainerName}`]);
  executeSyncCmd('docker', ['rmi', `${suspectImageName}`]);

  // Assert the need of threat evaluation
  if (config.ignoreThreats === 'true') {
    console.log('ignore_threats is true, skipping workflow interruption');
    return 'ignore_threats is true, skipping workflow interruption';
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
    console.log('os not supported by Trivy, skipping workflow interruption');
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
        console.log(`the CVE ${cve} is listed as an enforced CVE`);
        return true;
      }
      return false;
    }
  )) {
    throw new Error(`enforced cve found. Please, fix it right now!`);
  }

  // End scan
  console.log(`report image threats successfully finished. Removing temporary folder ${workspace}`);
  process.chdir('..');
  executeSyncCmd('rm', ['-rf', `${workspace}`]);

  return 'report image threats successfully finished';
};

exports.getRepositoryUri = getRepositoryUri;
exports.defineRepositoryPolicy = defineRepositoryPolicy;
exports.dockerLoginOnECR = dockerLoginOnECR;
exports.reportImageThreats = reportImageThreats;
exports.pushImage = pushImage;
