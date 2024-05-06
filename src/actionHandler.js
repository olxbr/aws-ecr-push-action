const { core } = require("./local");
const {
  validateImageName,
  getRepositoryUri,
  defineRepositoryPolicy,
  dockerLoginOnECR,
  pushImage,
  deleteImages,
} = require("./main");
const { sendMetrics } = require("./metrics");
const { reportImageThreats } = require("./sec");
const { setCostTagForRepository } = require("./costs");

const isLocal = !!process.env["isLocal"];
const dryRun = !!process.env["dryRun"];

const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const AWS_PRINCIPAL_RULES =
  process.env.AWS_PRINCIPAL_RULES || `["${AWS_ACCOUNT_ID}"]`;
const ECR_ENDPOINT = `${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com`;

// pseudo logger
function info(msg) {
  require("./logger").info(`actionHandler.js - ${msg}`);
}

const run = async () => {
  try {
    const REPO = core.getInput("ecr_repository");
    const tags = core.getInput("tags").split(",");
    const minimalSeverity = core.getInput("minimal_severity");
    const x9ContainersDistro = core.getInput("x9_container_distro");
    const x9ContainersBranch = core.getInput("x9_container_branch");
    const ignoreThreats = core.getInput("ignore_threats");
    const trivyIgnoreFile = core.getInput("trivy_ignore_file");
    const keepImages = core.getInput("keep_images");
    const dockerBuildkit = core.getInput("docker_buildkit");
    const costCenter = core.getInput("cost_center");

    const awsConfig = {
      AWS_ACCOUNT_ID,
      AWS_PRINCIPAL_RULES,
      ECR_ENDPOINT,
    };

    const params = {
      repositoryNames: [REPO],
      tags,
      minimalSeverity,
      x9ContainersDistro,
      x9ContainersBranch,
      ignoreThreats,
      trivyIgnoreFile,
      aws: awsConfig,
      keepImages,
      dockerBuildkit,
      costCenter,
    };

    if (process.env.AWS_SESSION_TOKEN) {
      info("AWS_SESSION_TOKEN is set, unsetting it...")

      isLocal ?
        info("LOCAL run detected. AWS_SESSION_TOKEN will be used!") :
        process.env.AWS_SESSION_TOKEN = "" // Ensure that AWS_SESSION_TOKEN is not set
    }

    // Check environment variables for AWS credentials is set
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      require("./logger").error(`actionHandler.js - AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY not set. Maybe you are running in public repo or public fork?`);
      process.exit(1);
    }

    info(`Action params: ${JSON.stringify(params)}`);

    if (!isLocal) {
      await sendMetrics({
        "inputs.ignoreThreats": ignoreThreats === "true",
      });
    }

    if (isLocal) {
      info(`LOCAL run detected. Generate a docker image to test - ${ECR_ENDPOINT}/${REPO}:${tags}`)
      require('./utils').executeSyncCmd("docker", [
        `pull`,
        `alpine:latest`
      ]);
      require('./utils').executeSyncCmd("docker", [
        `tag`,
        `alpine:latest`,
        `${ECR_ENDPOINT}/${REPO}:${tags}`
      ]);
    }

    info(`Analyzing repository name (${REPO}) against "bu/squad/project"...`);
    const repositoryValidation = await validateImageName(params);
    if (!(await repositoryValidation(params))) {
      info(
        "::error title=ImageValidationError:: Image name does not comply with 'bu/squad/project'. Valid BUs are 'cross', 'olx', 'zap', 'vivareal', 'base_images' "
      );
      throw `Repo NOT Validaded! Please fix acording with "bu/squad/project"`;
    }
    info(`Repository name validated!`);

    info(`Looking for repo ${REPO}...`);
    const repositoryUri = await getRepositoryUri(params);

    if (!dryRun) {
      info(`Setting repo policy ${REPO}...`);
      const policy_output = await defineRepositoryPolicy(params);
      const ecrLoginResult = await dockerLoginOnECR(params); //NOSONAR
    }

    reportImageThreats(params);
    await setCostTagForRepository(params);

    if (!dryRun) {
      tags.forEach((tag) => {
        pushImage({ ...params, tag });
      });
      await deleteImages(params);
    }
  } catch (err) {
    if (isLocal) console.error(err);
    core.setFailed(err.message);
    info("Error During Execution");
    process.exit(1);
  }
};

run().then(() => {
  if (isLocal) {
    info("Outputs");
    info(JSON.stringify(core.getOutputs()));
  }
});
