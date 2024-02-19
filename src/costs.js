const yaml = require("js-yaml");
const fs = require("fs");

const { describeRepo, updateRepositryTags } = require("./AWSClient");

function warn(msg) {
  require("./logger").warn(`costs.js - ${msg}`);
}
function info(msg) {
  require("./logger").info(`costs.js - ${msg}`);
}

const getCostsUuidFromBackstageFile = () => {
  info("Getting cost center from backstage file");
  // Try to Read the file catalog-info.yaml and get the metadata from metadata.[teams.olxbr.io/cloud-cost-center]
  const backstageFile = "catalog-info.yaml";
  // Read file
  let backstageFileContent;
  try {
    info(`Reading file ${backstageFile}`);
    backstageFileContent = fs.readFileSync(backstageFile);
    info(`File content: ${backstageFileContent}`);
  } catch (err) {
    warn(`File Not found ${backstageFile}: ${err}`);
    return "";
  }
  // Parse file with yaml parser
  try {
    info("Parsing file");
    const backstageFileJson = yaml.load(backstageFileContent);
    // Return the file metadata
    info(`Backstage Metadata: ${JSON.stringify(backstageFileJson.metadata)}`);
    info(
      `Backstage Cost center: ${backstageFileJson.metadata.annotations["teams.olxbr.io/cloud-cost-center"]}`
    );
    return backstageFileJson.metadata.annotations[
      "teams.olxbr.io/cloud-cost-center"
    ];
  } catch (err) {
    warn(`Error parsing file ${backstageFile}: ${err}`);
    return "";
  }
};

const tagResource = async (resourceArn, costCenter) => {
  info(`Tagging resource ${resourceArn} with cost center ${costCenter}`);
  const params = {
    resourceArn: resourceArn,
    tags: [
      {
        Key: "cloud-cost-center",
        Value: costCenter,
      },
    ],
  };
  try {
    await updateRepositryTags(params);
    info(`Resource ${resourceArn} tagged with cost center ${costCenter}`);
  } catch (err) {
    warn(`Error tagging resource ${resourceArn}: ${err}`);
  }
};

const setCostTagForRepository = async (params) => {
  const repositoryName = params.repositoryNames[0];
  let costCenter = params.costCenter;
  if (!costCenter) {
    // Check if the cost center is in the backstage file
    costCenter = getCostsUuidFromBackstageFile();
  }
  if (!costCenter) {
    warn(
      "No cost center found to tag the repository! If you whant to tag the repository, please set the cost center in the action input or in the backstage config file."
    );
    return;
  }
  const repoData = await describeRepo({
    repositoryNames: params.repositoryNames,
  });
  const resourceArn = repoData.repositoryArn
    ? repoData.repositoryArn
    : repoData.repositories[0].repositoryArn;
  await tagResource(resourceArn, costCenter);
};

exports.tagResource = tagResource;
exports.getCostsUuidFromBackstageFile = getCostsUuidFromBackstageFile;
exports.setCostTagForRepository = setCostTagForRepository;
