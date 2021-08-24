const {
  ECRClient,
  DescribeRepositoriesCommand,
  CreateRepositoryCommand,
  GetAuthorizationTokenCommand,
  SetRepositoryPolicyCommand
} = require("@aws-sdk/client-ecr");
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { buildPolicy } = require('./policy');
const { executeSyncCmd } = require('./utils');
const fs = require('fs');

const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const AWS_PRINCIPAL_RULES = process.env.AWS_PRINCIPAL_RULES;
const ECR_ENDPOINT = `${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com`;

const VIRUS_THRESHOLD = 0;
const CRITICAL_VULNS_THRESHOLD = 10;
const HIGH_VULNS_THRESHOLD = 50;
const MEDIUM_VULNS_THRESHOLD = 100;
const LOW_VULNS_THRESHOLD = 250;
const UNKNOWN_VULNS_THRESHOLD = 1000;

const credentialsProvider = defaultProvider({ timeout: 20000 });

const client = new ECRClient({
  region: "us-east-1",
  credentialDefaultProvider: credentialsProvider
});

const describeRepo = (params) => client.send(new DescribeRepositoriesCommand(params));
const createRepo = (params) => client.send(new CreateRepositoryCommand(params));
const getAuthorizationToken = (params) => client.send(new GetAuthorizationTokenCommand(params));
const setRepositoryPolicy = (params) => client.send(new SetRepositoryPolicyCommand(params));


const describeRepoErrorHandler = (config) => async (err) => {
  if (err.name !== 'RepositoryNotFoundException') {
    throw new Error(err.message);
  }

  const repositoryName = config.repositoryNames[0];
  const policy = buildPolicy({ awsPrincipalRules: AWS_PRINCIPAL_RULES });
  console.log(`Creating repository ${repositoryName}...`);
  console.log(`Policy: ${policy}`);

  const repoData = await createRepo({ repositoryName });

  await setRepositoryPolicy({
    repositoryName,
    policyText: policy
  });

  return repoData.repository;
}

const getRepositoryUri = async (config) =>
  await describeRepo(config)
    .then(data => data.repositories[0])
    .catch(describeRepoErrorHandler(config));

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
  }
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
  console.log('X9 will find something to blame now...');

  // Obtain a X9Container Dockerfile
  executeSyncCmd(
    'curl',
    [
      `https://raw.githubusercontent.com/olxbr/X9Containers/main/${config.x9ContainerDistro}.X9.Dockerfile`,
      '--output',
      'X9.Dockerfile'
    ],
    'report image threats curl failed'
  );

  // Run image scan
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
  executeSyncCmd(
    'docker',
    [
      'build',
      '-f',
      'X9.Dockerfile',
      '-t',
      'suspectimage',
      '--build-arg',
      `IMAGE=${ECR_ENDPOINT}/${config.repositoryNames[0]}:${config.tags[0]}`,
      '--build-arg',
      `TRIVY_SEVERITY=${minimalSeverity}`,
      '.'
    ],
    'report image threats docker build failed'
  );

  // Extract scan results from container
  const scansFolder = './scans';
  executeSyncCmd('docker', ['create', '--name', 'suspectcontainer', 'suspectimage']);
  executeSyncCmd('docker', ['cp', 'suspectcontainer:/scans', `${scansFolder}`]);
  fs.readdirSync(scansFolder).forEach(report => {
    executeSyncCmd('cat', [`${scansFolder}/${report}`]);
  });

  // Assert the need of threat evaluation
  if (config.ignoreThreats === 'true') {
    console.log('ignore_threats is true, skipping workflow interruption');
    return 'ignore_threats is true, skipping workflow interruption';
  }

  // Evaluate findings from ClamAV
  const clamScanFileName = 'recursive-root-dir-clamscan.txt';
  const clamScanFile = `${scansFolder}/${clamScanFileName}`;
  if (!fs.existsSync(clamScanFile)) {
    throw new Error(`report image threats file ${clamScanFileName} reading failed`);
  }
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

  // Evaluate findings from Trivy
  const trivyScanFileName = 'image-vulnerabilities-trivy.txt';
  const trivyScanFile = `${scansFolder}/${trivyScanFileName}`;
  if (!fs.existsSync(trivyScanFile)) {
    throw new Error(`report image threats file ${trivyScanFileName} reading failed`);
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

  // End scan
  console.log('report image threats successfully finished');

  // Cleanup suspectcontainer
  executeSyncCmd('docker', ['rm', 'suspectcontainer']);

  return 'report image threats successfully finished';
};

exports.getRepositoryUri = getRepositoryUri;
exports.dockerLoginOnECR = dockerLoginOnECR;
exports.reportImageThreats = reportImageThreats;
exports.pushImage = pushImage;
