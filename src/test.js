const {
  getRepositoryUri,
  defineRepositoryPolicy,
  dockerLoginOnECR,
  reportImageThreats,
  pushImage
} = require('./main');

const ECR_REPO = 'cross/dev-tools/momo';
const TAGS = '0.2.2,beta';
const MINIMAL_SEVERITY = 'UNKNOWN';
const X9CONTAINERS_DISTRO = 'distroless.clamav.trivy';
const IGNORE_THREATS = 'true';


const test = async () => {
  try {
    const tags = TAGS.split(',');
    const REPO = ECR_REPO;
    const minimalSeverity = MINIMAL_SEVERITY;
    const x9ContainersDistro = X9CONTAINERS_DISTRO;
    const ignoreThreats = IGNORE_THREATS;
    const params = {
      repositoryNames: [REPO],
      tags,
      minimalSeverity,
      x9ContainersDistro,
      ignoreThreats
    };

    console.log(`Looking for repo ${REPO}...`);
    const output = await getRepositoryUri(params);

    console.log(`Setting Permissions ${REPO}...`);
    const output_permissions = await defineRepositoryPolicy(params);

    await dockerLoginOnECR();
    reportImageThreats(params);
    tags.forEach((tag) => {
      pushImage({ ...params, tag });
    });
  } catch (e) {
    console.log(e)
  }
}

test();
