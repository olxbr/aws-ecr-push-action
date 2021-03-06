const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const {
  ECRClient,
  DescribeRepositoriesCommand,
  CreateRepositoryCommand,
  GetAuthorizationTokenCommand,
  SetRepositoryPolicyCommand,
  PutImageScanningConfigurationCommand
} = require('@aws-sdk/client-ecr');


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

exports.client = client
exports.describeRepo = describeRepo
exports.createRepo = createRepo
exports.getAuthorizationToken = getAuthorizationToken
exports.setRepositoryPolicy = setRepositoryPolicy
exports.putImageScanningConfiguration = putImageScanningConfiguration

