const { core } = require('./local')
const {
  validadeImageName,
  getRepositoryUri,
  defineRepositoryPolicy,
  dockerLoginOnECR,
  reportImageThreats,
  pushImage
} = require('./main');
const { sendMetrics } = require('./metrics');
const { cleanup } = require('./cleanup');

const IsPre = !!process.env['STATE_isPre'];
const IsPost = !!process.env['STATE_isPost'];
const isLocal = !!process.env['isLocal']

if (!IsPre) {
  core.saveState('isPre', 'true');
} else if (IsPre && !IsPost) {
  core.saveState('isPost', 'true');
}

const run = async () => {
  try {

    const REPO = core.getInput('ecr_repository');
    const tags = core.getInput('tags').split(',');
    const minimalSeverity = core.getInput('minimal_severity');
    const x9ContainersDistro = core.getInput('x9_container_distro');
    const x9ContainersBranch = core.getInput('x9_container_branch');
    const ignoreThreats = core.getInput('ignore_threats');
    const trivyIgnoreURL = core.getInput('trivy_ignore_url');

    const params = {
      repositoryNames: [REPO],
      tags,
      minimalSeverity,
      x9ContainersDistro,
      x9ContainersBranch,
      ignoreThreats,
      trivyIgnoreURL
    };

    console.log('Action params')
    console.log(params)

    if(!isLocal) {
      const metricsResult = await sendMetrics({ //NOSONAR
        "inputs.ignoreThreats": ignoreThreats === 'true'
      });
    }

    console.log(`Analyzing repository name (${REPO}) against "bu/squad/project"...`);
    const repositoryValidation = await validadeImageName(params);
    if(!await repositoryValidation(params)){
      throw `Repo NOT Validaded! Please fix acording with "bu/squad/project"`;
    }
    console.log(`Repository name validated!`);

    console.log(`Looking for repo ${REPO}...`);
    const repositoryUri = await getRepositoryUri(params);
    core.setOutput('repository_uri', repositoryUri);

    console.log(`Setting repo policy ${REPO}...`);
    const policy_output = await defineRepositoryPolicy(params);
    core.setOutput('repository_policy', policy_output.policyText);

    const ecrLoginResult = await dockerLoginOnECR(); //NOSONAR
    reportImageThreats(params);
    tags.forEach((tag) => {
      pushImage({ ...params, tag });
    });

  } catch (err) {
    if (isLocal) console.error(err)
    core.setFailed(err.message);
    console.log('Error During Execution');
    process.exit(1);
  }
}

if (IsPre && !IsPost) {
  run().then(() => {
    if(isLocal) {
      console.log('Outputs')
      console.log(core.getOutputs())
    }
  });
} else if (!IsPre || IsPost) {
  cleanup();
}
