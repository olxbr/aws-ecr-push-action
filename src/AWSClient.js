const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const {
  ECRClient,
  DescribeRepositoriesCommand,
  CreateRepositoryCommand,
  GetAuthorizationTokenCommand,
  SetRepositoryPolicyCommand,
  PutImageScanningConfigurationCommand,
  BatchDeleteImageCommand,
  DescribeImagesCommand
} = require('@aws-sdk/client-ecr');

// pseudo logger
function warn(msg) {
  require("./logger").warn(`AWSClient.js - ${msg}`);
}

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
const describeImages = (params) => client.send(new DescribeImagesCommand(params));

const batchDeleteImage = (params) => {
  const totalImagesToBeDeleted = params.imageIds.length
  if (totalImagesToBeDeleted > 100) {
    warn(`Only 100 images will be deleted. Total images to be deleted: ${totalImagesToBeDeleted}`)
    params.imageIds = params.imageIds.slice(0, 100);
    warn(`batchDeleteImage params: ${JSON.stringify(params)}`);
  }
  return client.send(new BatchDeleteImageCommand(params))};


exports.client = client
exports.describeRepo = describeRepo
exports.createRepo = createRepo
exports.getAuthorizationToken = getAuthorizationToken
exports.setRepositoryPolicy = setRepositoryPolicy
exports.putImageScanningConfiguration = putImageScanningConfiguration
exports.batchDeleteImage = batchDeleteImage
exports.describeImages = describeImages
