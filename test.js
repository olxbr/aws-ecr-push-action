const {
  getRepositoryUri,
  buildImage,
  pushImage,
} = require('./main')

REPO = 'cross/devtools/momo'

const AWS = process.env.AWS

console.log(AWS)


const test = async () => {
  const params = {
    repositoryNames: [REPO]
  }

  const output = await getRepositoryUri(params)
  console.log(output.repositories[0].repositoryUri)
  await buildImage(params)
  await pushImage(params).catch(console.error)
}

test()
