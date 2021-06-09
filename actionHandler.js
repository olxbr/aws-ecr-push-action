const core = require('@actions/core')
const github = require('@actions/github')
const {
  getRepositoryUri
} = require('./main')


const run = async () => {
  try {
    const REPO = core.getInput('ecr_repository')
    console.log(`Looking for repo ${REPO}`)

    const params = {
      repositoryNames: [REPO]
    }

    const output = await getRepositoryUri(params)
    const repositoryUri = output.repositories[0].repositoryUri
    core.setOutput('repository_uri', repositoryUri);
    await buildImage(params)
    await pushImage(params)
  } catch(e) {
    console.error(e)
  }
}

run()
