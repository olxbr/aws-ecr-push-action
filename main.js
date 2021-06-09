const { spawn } = require("child_process")
const {
  ECRClient,
  DescribeRepositoriesCommand,
  CreateRepositoryCommand,
  PutImageCommand,
  GetAuthorizationTokenCommand,
} = require("@aws-sdk/client-ecr");
const policy = require('./policy')


const ECR_ENDPOINT = `${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com`


const client = new ECRClient({ region: "us-east-1" });


const logData = (data) => { console.log(data); return data }
const logError = (error) => { console.error(error); throw error }
const logBuffer = (buffer) => logData(buffer.toString())


const describeRepo = (params) => client.send(new DescribeRepositoriesCommand(params))
const createRepo = (params) => client.send(new CreateRepositoryCommand(params))
const getAuthorizationToken = (params) => client.send(new GetAuthorizationTokenCommand(params))


const describeRepoErrorHandler = 
  (config) =>
    (error) => {
      if (error.name !== 'RepositoryNotFoundException') throw error

      console.log('Creating repository...')
      return createRepo({ repositoryName: config.repositoryNames[0] })
    }


const getRepositoryUri = (config) => describeRepo(config)
  .catch(describeRepoErrorHandler(config))
  .catch(logError)

const buildImage = (config) => new Promise((resolve, reject) => {
  console.log('Building image...')
  const cmd = spawn('docker', [`build`, `-t`, `${ECR_ENDPOINT}/${config.repositoryNames[0]}`,  '.'])
  cmd.stdout.on('data', logBuffer)
  cmd.stderr.on('data', logBuffer)
  cmd.on('error', reject)
  cmd.on('close', resolve)
})
   
const parseAuthToken = async (config) => {
  console.log('Getting ECR auth token...')
  const response = await getAuthorizationToken({ registryIds: [AWS_ACCOUNT_ID]  })
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
  const loginData = await parseAuthToken() 
  const cmd = spawn('docker', [`login`, `-u`, loginData.username,  '-p', loginData.password, loginData.proxyEndpoint])
  cmd.stdout.on('data', logBuffer)
  cmd.stderr.on('data', logBuffer)
  cmd.on('error', reject)
  cmd.on('close', resolve)
})

const pushImage = async (config) => {
  await dockerLoginOnECR()

  return new Promise((resolve, reject) => {
    const cmd = spawn('docker', ['push', `${ECR_ENDPOINT}/${config.repositoryNames[0]}:latest`])
    cmd.stdout.on('data', logBuffer)
    cmd.stderr.on('data', logBuffer)
    cmd.on('error', reject)
    cmd.on('close', resolve)
  })
}

exports.getRepositoryUri = getRepositoryUri
exports.buildImage = buildImage
exports.pushImage = pushImage
