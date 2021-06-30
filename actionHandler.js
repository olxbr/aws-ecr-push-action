const core = require('@actions/core')
const {
  getRepositoryUri,
  buildImage,
  pushImage,
  tagImage,
  reportImageThreats,
} = require('./main')

const run = async () => {
  try {
    const REPO = core.getInput('ecr_repository')
    const tags = core.getInput('tags').split(',')
    const minimalSeverity = core.getInput('minimal_severity')
    const x9ContainerDistro = core.getInput('x9_container_distro')
    const ignoreThreats = core.getInput('ignore_threats')
    const params = {
      repositoryNames: [REPO],
      tags,
      minimalSeverity,
      x9ContainerDistro,
      ignoreThreats
    }
    console.log(`Looking for repo ${REPO}...`)
    const output = await getRepositoryUri(params)
    const repositoryUri = output.repositoryUri
    core.setOutput('repository_uri', repositoryUri);
    await buildImage(params)
    await reportImageThreats(params).then((result) => {
      tags.forEach(async (tag) => {
        await tagImage({ ...params, tag })
        await pushImage({ ...params, tag })
      })
    }, reason => {
      core.setFailed(reason);
    });
  } catch (err) {
    core.setFailed(err.message)
  }
}

run()
