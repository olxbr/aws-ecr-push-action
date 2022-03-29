

const describeRepo = params => params.repositoryName == 'cross/devtools/devtools-scripts' ?
  { repositoryUri: 'http://xpto.registry/cross/devtools/devtools-scripts' } : null

const mock = {
  describeRepo
}

jest.mock('../AWSClient', () => mock)

module.exports = mock
