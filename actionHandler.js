const core = require('@actions/core');
const {
  getRepositoryUri,
  dockerLoginOnECR,
  buildImage,
  reportImageThreats,
  tagImage,
  pushImage
} = require('./main');

const run = async () => {
  try {
    const REPO = core.getInput('ecr_repository');
    const tags = core.getInput('tags').split(',');
    const minimalSeverity = core.getInput('minimal_severity');
    const x9ContainerDistro = core.getInput('x9_container_distro');
    const ignoreThreats = core.getInput('ignore_threats');
    const params = {
      repositoryNames: [REPO],
      tags,
      minimalSeverity,
      x9ContainerDistro,
      ignoreThreats
    };
    console.log(`Looking for repo ${REPO}...`);
    const output = await getRepositoryUri(params);
    core.setOutput('repository_uri', output.repositoryUri);
    await dockerLoginOnECR();
    buildImage(params);
    reportImageThreats(params);
    tags.forEach((tag) => {
      tagImage({ ...params, tag });
      pushImage({ ...params, tag });
    });
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
