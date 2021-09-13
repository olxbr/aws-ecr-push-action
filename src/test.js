const {
  getRepositoryUri,
  dockerLoginOnECR,
  reportImageThreats,
  pushImage
} = require('./main');

const ECR_REPO = 'cross/devtools/momo'
const TAGS = '0.2.2,beta'
const MINIMAL_SEVERITY = 'UNKNOWN'
const X9_CONTAINER_DISTRO = 'distroless.clamav.trivy'
const IGNORE_THREATS = 'true'
const SKIP_X9_VERIFICATION = 'true'


const test = async () => {
  try {
    const tags = TAGS.split(',');
    const REPO = ECR_REPO;
    const minimalSeverity = MINIMAL_SEVERITY;
    const x9ContainerDistro = X9_CONTAINER_DISTRO;
    const ignoreThreats = IGNORE_THREATS;
    const skipX9Verification = SKIP_X9_VERIFICATION;

    const params = {
      repositoryNames: [REPO],
      tags,
      minimalSeverity,
      x9ContainerDistro,
      ignoreThreats
    };

    console.log(`Looking for repo ${REPO}...`);
    const output = await getRepositoryUri(params);

    await dockerLoginOnECR();
    if (SKIP_X9_VERIFICATION === 'false') {
      reportImageThreats(params);
    } else {
      console.log('Skipping X9 Verification');
    }
    tags.forEach((tag) => {
      pushImage({ ...params, tag });
    });
  } catch(e) {
    console.log(e)
  }
}

test()
