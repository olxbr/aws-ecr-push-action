const { buildPolicy } = require('./policy');
const { executeSyncCmd } = require('./utils');
const process = require('process');
const {
  describeRepo,
  createRepo,
  getAuthorizationToken,
  setRepositoryPolicy,
  putImageScanningConfiguration
} = require('./AWSClient')


const validateImageName = (config) => async (err) => {
  let validatedBU = false
  let validatedLen = false
  const allowedPrefix = ['cross', 'olx', 'zap', 'vivareal', 'base_images']

  const repositoryName = config.repositoryNames[0];
  const repositoryNameSplited = repositoryName.split('/')

  if (repositoryNameSplited.length >= 3 || repositoryNameSplited.indexOf('base_images') == 0){
    validatedLen = true
  }

  for (const element of allowedPrefix) {
    if(repositoryNameSplited.indexOf(element) == 0){
      validatedBU = true
    }
  }

  const result = validatedBU && validatedLen
  return result
}


const describeRepoErrorHandler = (config) => async (err) => {
  // If the error is RepositoryNotFoundException, we proceed to the creation
  // of the repo instead of halting
  if (err.name !== 'RepositoryNotFoundException') {
    throw new Error(err.message);
  }

  const repositoryName = config.repositoryNames[0];
  const repoData = await createRepo({ repositoryName });

  const repoPolicyResult = await defineRepositoryPolicy(config); // NOSONAR

  const scanConfigResult = await putImageScanningConfiguration({ // NOSONAR
    repositoryName,
    imageScanningConfiguration: { scanOnPush: true }
  });

  return repoData.repository;
}

const getRepositoryUri = async (config) => {
  let describeRepoReturn
  try {
    describeRepoReturn = await describeRepo(config); // NOSONAR
  }
  catch (err) {
    describeRepoReturn = await describeRepoErrorHandler(config)(err);
  }

  console.log(describeRepoReturn)

  return describeRepoReturn.repositoryUri ?
    describeRepoReturn.repositoryUri :
    describeRepoReturn.repositories[0].repositoryUri
}

const defineRepositoryPolicy = async (config) => {
  console.log('Setting ECR default permissions...');
  const repositoryName = config.repositoryNames[0];
  const policy = buildPolicy({ awsPrincipalRules: config.aws['AWS_PRINCIPAL_RULES'] });
  console.log(`Creating repository ${repositoryName}...`);
  console.log(`Policy: ${policy}`);

  const repositoryPolicy = await setRepositoryPolicy({
    repositoryName,
    policyText: policy
  });
  return repositoryPolicy
}

const parseAuthToken = async (config) => {
  console.log('Getting ECR auth token...');
  const response = await getAuthorizationToken({ registryIds: [config.aws['AWS_ACCOUNT_ID']] });
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

const dockerLoginOnECR = async (config) => {
  console.log('Login on ECR...');
  const loginData = await parseAuthToken(config);
  return executeSyncCmd('docker', [`login`, `-u`, loginData.username, '-p', loginData.password, loginData.proxyEndpoint]);
};

const pushImage = (config) => {
  console.log(`Pushing tag ${config.tag}...`);
  return executeSyncCmd('docker', ['push', `${config.aws['ECR_ENDPOINT']}/${config.repositoryNames[0]}:${config.tag}`]);
};


exports.validateImageName = validateImageName;
exports.getRepositoryUri = getRepositoryUri;
exports.defineRepositoryPolicy = defineRepositoryPolicy;
exports.dockerLoginOnECR = dockerLoginOnECR;
exports.pushImage = pushImage;
