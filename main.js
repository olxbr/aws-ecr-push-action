const { spawn } = require("child_process")
const {
  ECRClient,
  DescribeRepositoriesCommand,
  CreateRepositoryCommand,
  PutImageCommand,
  GetAuthorizationTokenCommand,
  SetRepositoryPolicyCommand,
} = require("@aws-sdk/client-ecr");
const { defaultProvider } = require('@aws-sdk/credential-provider-node')
const { buildPolicy }= require('./policy')

const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID
const ECR_ENDPOINT = `${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com`

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
    async(error) => {
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
  const cmd = spawn('docker', [`build`, `-t`, imageName,  '.'])
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
exports.tagImage = tagImage
