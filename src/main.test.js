const {
  validadeImageName,
  getRepositoryUri,
  defineRepositoryPolicy,
  dockerLoginOnECR,
  reportImageThreats,
  pushImage
} = require('./main');


const policyFixture = require('./policy.fixture.json')

jest.mock('./AWSClient', () => {
  return {
    describeRepo: jest.fn(async params => {
      if(params.repositoryNames[0] == 'cross/devtools/devtools-scripts')
        return { repositoryUri: `http://xpto.registry/${params.repositoryNames[0]}` } // NOSONAR
      var error =  new Error('Repo not found')
      error.name = 'RepositoryNotFoundException'
      throw error
    }),

    createRepo: jest.fn(async params => ({ repository: { repositoryUri: `http://xpto.registry/${params.repositoryName}` }})), // NOSONAR

    setRepositoryPolicy: jest.fn(async params => params.policyText),

    putImageScanningConfiguration: jest.fn(async noop => noop),
  }
})

const AWSClient = require('./AWSClient')

test('Test invalid image name', async () => {

    const params = {
      repositoryNames: ['my_invaid_bu/my_invalid_name']
    }
    const repositoryValidation = await validadeImageName(params);
    let result = await repositoryValidation()
    expect(result).toBe(false);
});

test('Test valid image name', async () => {

    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts']
    }
    const repositoryValidation = await validadeImageName(params);
    let result = await repositoryValidation()
    console.log(result)
    expect(result).toBe(true);
});

test('Test invalid image name incorrect length', async () => {

    const params = {
      repositoryNames: ['cross/devtools']
    }
    const repositoryValidation = await validadeImageName(params);
    let result = await repositoryValidation()
    console.log(result)
    expect(result).toBe(false);
});

test('Test valid image name base_images length ignore', async () => {

    const params = {
      repositoryNames: ['base_images/alpine']
    }
    const repositoryValidation = await validadeImageName(params);
    let result = await repositoryValidation()
    console.log(result)
    expect(result).toBe(true);
});

test('Get URI of existing repository', async () => {
    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts']
    }
    const repositoryURI = await getRepositoryUri(params)
    expect(repositoryURI).toBe('http://xpto.registry/cross/devtools/devtools-scripts') // NOSONAR
});

test('Create repo when it doesnt exist', async () => {
    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts-fake']
    }
    const repositoryURI = await getRepositoryUri(params)
    expect(AWSClient.setRepositoryPolicy).toHaveBeenCalled()
    expect(AWSClient.putImageScanningConfiguration).toHaveBeenCalled()
    expect(repositoryURI).toBe('http://xpto.registry/cross/devtools/devtools-scripts-fake') // NOSONAR
})

test('Defines repository policy for new repos', async() => {
    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts-fake']
    }
    const repositoryPolicy = await defineRepositoryPolicy(params)
    expect(repositoryPolicy).toBe(JSON.stringify(policyFixture))
})
