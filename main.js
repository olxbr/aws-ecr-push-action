const { spawn, spawnSync } = require("child_process")
const {
  ECRClient,
  DescribeRepositoriesCommand,
  CreateRepositoryCommand,
  GetAuthorizationTokenCommand,
  SetRepositoryPolicyCommand,
} = require("@aws-sdk/client-ecr");
const { defaultProvider } = require('@aws-sdk/credential-provider-node')
const { buildPolicy } = require('./policy')
const fs = require('fs')

const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID
const ECR_ENDPOINT = `${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com`

const CRITICAL_THRESHOLD = 10;
const HIGH_THRESHOLD = 250;
const MEDIUM_THRESHOLD = 500;
const LOW_THRESHOLD = 1000;
const UNKNOWN_THRESHOLD = 200;
const VIRUS_THRESHOLD = 0;

const credentialsProvider = defaultProvider({ timeout: 20000 })

const client = new ECRClient({
  region: "us-east-1",
  credentialDefaultProvider: credentialsProvider,
})

const logData = (data) => { console.log(data); return data }
const logError = (error) => { console.error(error); throw error }
const logBuffer = (buffer) => logData(buffer.toString())

const describeRepo = (params) => client.send(new DescribeRepositoriesCommand(params))
const createRepo = (params) => client.send(new CreateRepositoryCommand(params))
const getAuthorizationToken = (params) => client.send(new GetAuthorizationTokenCommand(params))
const setRepositoryPolicy = (params) => client.send(new SetRepositoryPolicyCommand(params))

const describeRepoErrorHandler =
  (config) =>
    async (error) => {
      if (error.name !== 'RepositoryNotFoundException') throw error
      const repositoryName = config.repositoryNames[0]

      const policy = buildPolicy({ accountId: AWS_ACCOUNT_ID })

      console.log(`Creating repository ${repositoryName}...`)
      console.log(`Policy: ${policy}`)
      const repoData = await createRepo({ repositoryName })
      await setRepositoryPolicy({
        repositoryName,
        policyText: policy,
      })

      return repoData.repository
    }

const getRepositoryUri = (config) => describeRepo(config)
  .then(data => data.repositories[0])
  .catch(describeRepoErrorHandler(config))
  .catch(logError)

const buildImage = (config) => new Promise((resolve, reject) => {
  console.log('Building image...')
  const imageName = `${ECR_ENDPOINT}/${config.repositoryNames[0]}`
  const cmd = spawn('docker', [`build`, `-t`, imageName, '.'])
  cmd.stdout.on('data', logBuffer)
  cmd.stderr.on('data', logBuffer)
  cmd.on('error', reject)
  cmd.on('close', resolve)
})

const tagImage = (config) => new Promise((resolve, reject) => {
  console.log(`Tagging image with ${config.tag}...`)
  const imageName = `${ECR_ENDPOINT}/${config.repositoryNames[0]}`
  const cmd = spawn('docker', [`tag`, imageName, `${imageName}:${config.tag}`])
  cmd.stdout.on('data', logBuffer)
  cmd.stderr.on('data', logBuffer)
  cmd.on('error', reject)
  cmd.on('close', resolve)
})

const parseAuthToken = async (config) => {
  console.log('Getting ECR auth token...')
  const response = await getAuthorizationToken({ registryIds: [AWS_ACCOUNT_ID] })
  const authData = response.authorizationData[0]
  const expires = authData.expiresAt
  const proxyEndpoint = authData.proxyEndpoint
  console.log(`Token will expire at ${expires}`)
  console.log(`Proxy endpoint: ${proxyEndpoint}`)
  const decodedTokenData = Buffer.from(authData.authorizationToken, 'base64').toString()
  const authArray = decodedTokenData.split(':')
  return {
    username: authArray[0],
    password: authArray[1],
    proxyEndpoint,
  }
}

const dockerLoginOnECR = (config) => new Promise(async (resolve, reject) => {
  console.log('Login on ECR...')
  const loginData = await parseAuthToken()
  const cmd = spawn('docker', [`login`, `-u`, loginData.username, '-p', loginData.password, loginData.proxyEndpoint])
  cmd.stdout.on('data', logBuffer)
  cmd.stderr.on('data', logBuffer)
  cmd.on('error', reject)
  cmd.on('close', resolve)
})

const pushImage = async (config) => {
  await dockerLoginOnECR()
  console.log(`Pushing tag ${config.tag}...`)
  return new Promise((resolve, reject) => {
    const cmd = spawn('docker', ['push', `${ECR_ENDPOINT}/${config.repositoryNames[0]}:${config.tag}`])
    cmd.stdout.on('data', logBuffer)
    cmd.stderr.on('data', logBuffer)
    cmd.on('error', reject)
    cmd.on('close', resolve)
  })
}

const reportImageThreats = (config) => new Promise((resolve, reject) => {
  console.log('X9 will find something to blame now...');

  const curl = spawnSync('curl', [`https://raw.githubusercontent.com/olxbr/X9Containers/main/${config.x9ContainerDistro}.X9.Dockerfile`, '--output', 'X9.Dockerfile']);
  if (curl.status !== 0) {
    console.error(curl.stderr.toString());
    return reject('reportImageThreats curl failed');
  }

  var minimalSeverity = '';
  if (`${config.minimalSeverity}` === 'CRITICAL')
    minimalSeverity = 'CRITICAL';
  else if (`${config.minimalSeverity}` === 'HIGH')
    minimalSeverity = 'HIGH,CRITICAL';
  else if (`${config.minimalSeverity}` === 'MEDIUM')
    minimalSeverity = 'MEDIUM,HIGH,CRITICAL';
  else if (`${config.minimalSeverity}` === 'LOW')
    minimalSeverity = 'LOW,MEDIUM,HIGH,CRITICAL';
  else
    minimalSeverity = 'UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL';
  const dockerBuild = spawnSync('docker', ['build', '-f', 'X9.Dockerfile', '-t', 'suspectimage', '--build-arg', `IMAGE=${ECR_ENDPOINT}/${config.repositoryNames[0]}:latest`, '--build-arg', `TRIVY_SEVERITY=${minimalSeverity}`, '--quiet', '.']);
  if (dockerBuild.status !== 0) {
    console.error(dockerBuild.stderr.toString());
    return reject('reportImageThreats docker build failed');
  }

  const scansFolder = './scans';
  spawnSync('docker', ['create', '--name', 'suspectcontainer', 'suspectimage']);
  spawnSync('docker', ['cp', 'suspectcontainer:/scans', `${scansFolder}`]);
  fs.readdirSync(scansFolder).forEach(report => {
    const cat = spawnSync('cat', [`${scansFolder}/${report}`]);
    if (cat.status !== 0) {
      console.error(cat.stderr.toString());
      return reject('reportImageThreats cat failed');
    }
    console.log(cat.stdout.toString());
  });

  if (config.ignoreThreats === 'true') {
    return resolve('ignore_threats is true, skipping workflow interruption');
  }

  const clamScanFile = `${scansFolder}/recursive-root-dir-clamscan.txt`;
  if (!fs.existsSync(clamScanFile)) {
    return reject('reportImageThreats recursive-root-dir-clamscan.txt reading failed');
  }
  const grepClam = spawnSync('grep', ['^Infected files: ', `${clamScanFile}`]);
  if (grepClam.status !== 0) {
    console.error(grepClam.stderr.toString());
    return reject('reportImageThreats recursive-root-dir-clamscan.txt grep failed');
  }
  const summaryClam = grepClam.stdout.toString();
  const totalsClam = summaryClam.match(/\d+/);
  process.stdout.write('ClamAV	');
  console.log(summaryClam);
  if (totalsClam[0] > VIRUS_THRESHOLD) {
    return reject('reportImageThreats recursive-root-dir-clamscan.txt threat threshold exceeded');
  }

  const trivyScanFile = `${scansFolder}/image-vulnerabilities-trivy.txt`;
  if (!fs.existsSync(trivyScanFile)) {
    return reject('reportImageThreats image-vulnerabilities-trivy.txt reading failed');
  }
  const grepTrivy = spawnSync('grep', ['^Total: ', `${trivyScanFile}`]);
  if (grepTrivy.status !== 0) {
    console.error(grepTrivy.stderr.toString());
    return reject('reportImageThreats image-vulnerabilities-trivy.txt grep failed');
  }
  const summaryTrivy = grepTrivy.stdout.toString();
  const totalsTrivy = summaryTrivy.match(/\d+/);
  process.stdout.write('Trivy	');
  console.log(summaryTrivy);
  if (
    ((`${config.minimalSeverity}` === 'CRITICAL') && (totalsTrivy[0] > CRITICAL_THRESHOLD)) ||
    ((`${config.minimalSeverity}` === 'HIGH') && (totalsTrivy[0] > HIGH_THRESHOLD || totalsTrivy[1] > CRITICAL_THRESHOLD)) ||
    ((`${config.minimalSeverity}` === 'MEDIUM') && (totalsTrivy[0] > MEDIUM_THRESHOLD || totalsTrivy[1] > HIGH_THRESHOLD || totalsTrivy[2] > CRITICAL_THRESHOLD)) ||
    ((`${config.minimalSeverity}` === 'LOW') && (totalsTrivy[0] > LOW_THRESHOLD || totalsTrivy[1] > MEDIUM_THRESHOLD || totalsTrivy[2] > HIGH_THRESHOLD || totalsTrivy[3] > CRITICAL_THRESHOLD)) ||
    ((`${config.minimalSeverity}` === 'UNKNOWN') && (totalsTrivy[0] > UNKNOWN_THRESHOLD || totalsTrivy[1] > LOW_THRESHOLD || totalsTrivy[2] > MEDIUM_THRESHOLD || totalsTrivy[3] > HIGH_THRESHOLD || totalsTrivy[4] > CRITICAL_THRESHOLD))
  ) {
    return reject('reportImageThreats image-vulnerabilities-trivy.txt threat threshold exceeded');
  }
  resolve('reportImageThreats successfully finished');
});

exports.getRepositoryUri = getRepositoryUri
exports.buildImage = buildImage
exports.pushImage = pushImage
exports.tagImage = tagImage
exports.reportImageThreats = reportImageThreats;
