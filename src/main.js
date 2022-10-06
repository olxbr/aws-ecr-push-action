const { buildPolicy } = require('./policy');
const {
  executeSyncCmd,
  sortByKey
} = require('./utils');
const process = require('process');
const {
  describeRepo,
  createRepo,
  getAuthorizationToken,
  setRepositoryPolicy,
  putImageScanningConfiguration,
  batchDeleteImage,
  describeImages
} = require('./AWSClient');
const { Console } = require('console');

// pseudo logger
function info(msg) {
  require('./logger').info(`main.js - ${msg}`)
}

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

  info(JSON.stringify(describeRepoReturn))

  return describeRepoReturn.repositoryUri ?
    describeRepoReturn.repositoryUri :
    describeRepoReturn.repositories[0].repositoryUri
}

const defineRepositoryPolicy = async (config) => {
  info('Setting ECR default permissions...');
  const repositoryName = config.repositoryNames[0];
  const policy = buildPolicy({ awsPrincipalRules: config.aws['AWS_PRINCIPAL_RULES'] });
  info(`Creating repository ${repositoryName}...`);
  info(`Policy: ${policy}`);

  const repositoryPolicy = await setRepositoryPolicy({
    repositoryName,
    policyText: policy
  });
  return repositoryPolicy
}

const parseAuthToken = async (config) => {
  info('Getting ECR auth token...');
  const response = await getAuthorizationToken({ registryIds: [config.aws['AWS_ACCOUNT_ID']] });
  const authData = response.authorizationData[0];

  const expires = authData.expiresAt;
  const proxyEndpoint = authData.proxyEndpoint;
  info(`Token will expire at ${expires}`);
  info(`Proxy endpoint: ${proxyEndpoint}`);

  const decodedTokenData = Buffer.from(authData.authorizationToken, 'base64').toString();
  const authArray = decodedTokenData.split(':');

  return {
    username: authArray[0],
    password: authArray[1],
    proxyEndpoint
  };
};

const dockerLoginOnECR = async (config) => {
  info('Login on ECR...');
  const loginData = await parseAuthToken(config);
  return executeSyncCmd('docker', [`login`, `-u`, loginData.username, '-p', loginData.password, loginData.proxyEndpoint]);
};

const pushImage = (config) => {
  info(`Pushing tag ${config.tag}...`);
  return executeSyncCmd('docker', ['push', `${config.aws['ECR_ENDPOINT']}/${config.repositoryNames[0]}:${config.tag}`]);
};

const deleteImages = async (config) => {
  const keepImages = config.keepImages;
  
  if (keepImages == -1) {
    info(`The keepImages is set to ${keepImages} so no image will be deleted`);
    return 0
  }

  const repositoryName = config.repositoryNames[0];
  const maxResults = 1000;
  const filter = {tagStatus: 'ANY'};
  info(`Searching images to delete from ${repositoryName}... Will be kept ${keepImages} images`);

  let imagesList = await describeImages({repositoryName, maxResults, filter}); // NOSONAR
  info(`Found total of ${imagesList['imageDetails'].length} images in the repo...`);
  info(`Listing all images: ${JSON.stringify(imagesList)}`)

  info(`Finding ALL UNTAGGED images first...`);
  if (imagesList && imagesList['imageDetails']) {
    let untaggedImgIds          = [];
    let untaggedImgInfos        = [];
    let untaggedCleanedSizeInMB = 0;

    imagesList['imageDetails'].forEach( imageInfo => {

      // Get only untagged
      if (imageInfo.imageTags == undefined) {
        untaggedCleanedSizeInMB += imageInfo.imageSizeInBytes/1024/1024;
        untaggedImgInfos.push(imageInfo);
        untaggedImgIds.push({
          imageDigest: imageInfo.imageDigest,
          imageTags: undefined
        });

      }
    });

    // Delete untagged if exists
    if (untaggedImgIds.length > 0) {
      info(`Deleting ${untaggedImgIds.length} UNTAGGED images and will be cleaned ${untaggedCleanedSizeInMB.toFixed(2)} Megabytes...`)
      let delUntaggedImages = await batchDeleteImage({repositoryName: repositoryName, imageIds: untaggedImgIds}); // NOSONAR

      if (delUntaggedImages['$metadata']['httpStatusCode'] == 200){
        info(`Successfuly deleted ${untaggedImgIds.length} untagged images`);
      } else {
        Error(`Failed to delete response: ${delUntaggedImagese}`);
      }

      // Removes deleted untagged images from the main list
      imagesList['imageDetails'] = imagesList['imageDetails'].filter(untagged => !untaggedImgInfos.includes(untagged))
      info(`Listing ONLY TAGGED images now ${imagesList['imageDetails'].length}: ${JSON.stringify(imagesList)}`)
    }
  }

  const sortedImageList = sortByKey(imagesList['imageDetails'], 'imagePushedAt');

  let imagesToDelete = [];
  let imagesSize = 0;
  let imageDigest;
  let imageTag;

  for (let i = 0; i < (sortedImageList.length - keepImages); i++){
    imageDigest = sortedImageList[i]['imageDigest'];
    imageTag = sortedImageList[i]['imageTags'];
    imagesSize += sortedImageList[i]['imageSizeInBytes'];
    if (imageDigest != null) {
      imagesToDelete.push({
        imageDigest: imageDigest,
        imageTags: imageTag
      });
    } else {
      Error('Image information Error');
    }
  }
  if (imagesToDelete.length > 0){
    info(`Will be deleted ${imagesToDelete.length} images and will be cleaned ${(imagesSize/1024/1024).toFixed(2)} Megabytes`);

    let deletedImagesResponse = await batchDeleteImage({repositoryName: repositoryName, imageIds: imagesToDelete}); // NOSONAR    
    if (deletedImagesResponse['$metadata']['httpStatusCode'] == 200){
      info(`Successfuly deleted ${deletedImagesResponse['imageIds'].length} images`);
      if (deletedImagesResponse['failures'].length != 0){
        info(`Failed to delete this images ${deletedImagesResponse['$metadata']['failures']}`);
      }
    } else {
      Error(`Failed to delete response: ${deletedImagesResponse}`);
    }
  
    return deletedImagesResponse
  } else {
    info(`Found no images to delete... Keeping ${keepImages}`);
    return 0
  }
};

exports.validateImageName = validateImageName;
exports.getRepositoryUri = getRepositoryUri;
exports.defineRepositoryPolicy = defineRepositoryPolicy;
exports.dockerLoginOnECR = dockerLoginOnECR;
exports.pushImage = pushImage;
exports.deleteImages = deleteImages;
