const core = require('@actions/core')
const github = require('@actions/github')
const {
  getRepositoryUri,
  tagImage,
} = require('./main')


const run = async () => {
  try {
    const REPO = core.getInput('ecr_repository')
    console.log(`Looking for repo ${REPO}`)

    const tags = core.getInput('tags').split(',')

    const params = {
      repositoryNames: [REPO],
      tags,
    }

    const output = await getRepositoryUri(params)
    const repositoryUri = output.repositories[0].repositoryUri
    core.setOutput('repository_uri', repositoryUri);
    await buildImage(params)
    tags.forEach(async (tag) => {
      await tagImage({ ...params, tag })
    })
    await pushImage(params)
  } catch(e) {
    console.error(e)
  }
}

run()
