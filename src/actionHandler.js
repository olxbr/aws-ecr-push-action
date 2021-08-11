const core = require('@actions/core');
const {
  getRepositoryUri,
  dockerLoginOnECR,
  reportImageThreats,
  pushImage
} = require('./main');
const { sendMetrics } = require('./metrics');
const { cleanup } = require('./cleanup');

const IsPre = !!process.env['STATE_isPre'];
const IsPost = !!process.env['STATE_isPost'];

if (!IsPre) {
  core.saveState('isPre', 'true')
} else if (IsPre && !IsPost) {
  core.saveState('isPost', 'true')
}

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

    await sendMetrics({
      "inputs.ignoreThreats": ignoreThreats
    })

    console.log(`Looking for repo ${REPO}...`);
    const output = await getRepositoryUri(params);
    core.setOutput('repository_uri', output.repositoryUri);

    await dockerLoginOnECR();
    reportImageThreats(params);
    tags.forEach((tag) => {
      pushImage({ ...params, tag });
    });

  } catch (err) {
    core.setFailed(err.message);
  }
}

if (IsPre && !IsPost) {
  run();
} else if (!IsPre || IsPost){
  cleanup();
}
