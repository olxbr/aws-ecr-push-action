const { sleep } = require('./utils');
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
    const skipX9Verification = core.getInput('skip_x9_verification');
    const params = {
      repositoryNames: [REPO],
      tags,
      minimalSeverity,
      x9ContainerDistro,
      ignoreThreats,
      skipX9Verification
    };

    console.log('Setting up...');
    console.log('[WARN] v0 of this action is deprecated! We highly encourage you to upgrade it to the v1');

		await sleep(1000 * 60 * 1);


    console.log(`Looking for repo ${REPO}...`);
    const output = await getRepositoryUri(params);
    core.setOutput('repository_uri', output.repositoryUri);

    await dockerLoginOnECR();
    buildImage(params);
    if (skipX9Verification === 'false') {
      reportImageThreats(params);
    } else {
      console.log('Skipping X9 Verification');
    }
    tags.forEach((tag) => {
      tagImage({ ...params, tag });
      pushImage({ ...params, tag });
    });

  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
