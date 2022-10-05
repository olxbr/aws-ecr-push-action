const {
  validateImageName,
  getRepositoryUri,
  defineRepositoryPolicy,
  dockerLoginOnECR,
  reportImageThreats,
  pushImage,
  deleteImages
} = require('./main');


const policyFixture = require('./policy.fixture.json')

const awsConfig = {
  AWS_ACCOUNT_ID: 'f4k34cc0un7',
  AWS_PRINCIPAL_RULES: '["XXXXXXXXXX"]',
  ECR_ENDPOINT: 'xpto.registry.aws.com',
}

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

    batchDeleteImage: jest.fn(async params => {
      if (params.imageIds.length > 100) {
        return {
          '$metadata': {
            httpStatusCode: 400,
            requestId: "1f886f37-8b99-4715-941f-0c633875cce1",
            attempts: 1,
            totalRetryDelay: 0
          },
          failures: [],
          imageIds: params.imageIds // NOSONAR
        }
      }
      return {
        '$metadata': {
            httpStatusCode: 200,
          },
        failures: [],
        imageIds: params.imageIds // NOSONAR
      }
    }),

    describeImages: jest.fn(async params => {
      return { 
        $metadata:{
          httpStatusCode: 200,
          requestId: "aedcf97a-2d5f-408f-9dd8-ff1a93adca95",
          attempts:1,
          totalRetryDelay:0
        },
        imageDetails: [
          {
            imageDigest: 'sha256:OLDEST_IMAGEff96ae8aee5bf5a77276ac3b6afafd6657e0eec049551d276794', // NOSONAR
            imagePushedAt: new Date('2022-01-30T05:30:53.000Z'),
            imageSizeInBytes: 264556141,
            imageTags: undefined,
            repositoryName: 'cross/action-tester/slow-test',
            registryId: '073521391622'
          },
          {
            imageDigest: 'sha256:YOUNGEST_IMAGE34c26298efe1f1dfdeba497ff54f17242c8637fa40c3238440', // NOSONAR
            imagePushedAt: new Date('2022-07-26T15:45:32.000Z'),
            imageSizeInBytes: 263301607,
            imageTags: ['latest'],
            repositoryName: 'cross/action-tester/slow-test',
            registryId: '073521391622'
          },
          {
            imageDigest: 'sha256:MID_AGE_IMAGE69c1354667d9e9fdc149be320a9608c05cc0899d94fa69f1927', // NOSONAR
            imagePushedAt: new Date('2022-07-26T05:45:32.000Z'),
            imageSizeInBytes: 265419182,
            imageTags: ['v0.0.1'],
            repositoryName: 'cross/action-tester/slow-test',
            registryId: '073521391622'
          },
          {
            imageDigest: 'sha256:MID_AGE_IMAGE69c1354667d9e9fdc149be320a9608c05cc0899d94fa69f1927', // NOSONAR
            imagePushedAt: new Date('2022-07-26T05:44:32.000Z'),
            imageSizeInBytes: 265411979,
            imageTags: undefined,
            repositoryName: 'cross/action-tester/slow-test',
            registryId: '073521391622'
          }
      ]
      }
    }),

  }
})

const AWSClient = require('./AWSClient')

test('Test invalid image name', async () => {

    const params = {
      repositoryNames: ['my_invaid_bu/my_invalid_name']
    }
    const repositoryValidation = await validateImageName(params);
    let result = await repositoryValidation()
    expect(result).toBe(false);
});

test('Test valid image name', async () => {

    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts']
    }
    const repositoryValidation = await validateImageName(params);
    let result = await repositoryValidation()
    expect(result).toBe(true);
});

test('Test invalid image name incorrect length', async () => {

    const params = {
      repositoryNames: ['cross/devtools']
    }
    const repositoryValidation = await validateImageName(params);
    let result = await repositoryValidation()
    expect(result).toBe(false);
});

test('Test valid image name base_images length ignore', async () => {

    const params = {
      repositoryNames: ['base_images/alpine']
    }
    const repositoryValidation = await validateImageName(params);
    let result = await repositoryValidation()
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
      repositoryNames: ['cross/devtools/devtools-scripts-fake'],
      aws: awsConfig,
    }
    const repositoryURI = await getRepositoryUri(params)
    expect(AWSClient.setRepositoryPolicy).toHaveBeenCalled()
    expect(AWSClient.putImageScanningConfiguration).toHaveBeenCalled()
    expect(repositoryURI).toBe('http://xpto.registry/cross/devtools/devtools-scripts-fake') // NOSONAR
})

test('Defines repository policy for new repos', async() => {
    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts-fake'],
      aws: awsConfig,
    }
    const repositoryPolicy = await defineRepositoryPolicy(params)
    expect(repositoryPolicy).toBe(JSON.stringify(policyFixture))
})

test('Test -1 flag to skip deletion process', async() => {
    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts-fake'],
      keepImages: -1,
    }
    const deletedImages = await deleteImages(params)
    expect(deletedImages).toBe(0)
})

test('Test delete not a necessary quantity of images', async() => {
    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts-fake'],
      keepImages: 20,
    }
    await deleteImages(params)
    expect(AWSClient.describeImages).toHaveBeenCalled()
})

test('Test delete all images', async() => {
    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts-fake'],
      keepImages: 0,
    }
    const deleteResponse = await deleteImages(params)
    expect(AWSClient.describeImages).toHaveBeenCalled()
    expect(deleteResponse[0]['imageIds'].length).toBe(2)
    expect(deleteResponse[0]['$metadata']).toStrictEqual({"httpStatusCode": 200})
})

test('Test delete three images and keep de youngest', async() => {
    const params = {
      repositoryNames: ['cross/devtools/devtools-scripts-fake'],
      keepImages: 1,
    }
    const deleteResponse = await deleteImages(params)
    expect(AWSClient.describeImages).toHaveBeenCalled()
    expect(deleteResponse.length).toBe(1)
    expect(deleteResponse[0]['$metadata']).toStrictEqual({"httpStatusCode": 200})
    expect(deleteResponse[0]['imageIds'].length).toBe(1)
    expect(deleteResponse[0]['imageIds']).toContainEqual({"imageDigest": "sha256:MID_AGE_IMAGE69c1354667d9e9fdc149be320a9608c05cc0899d94fa69f1927", "imageTag": undefined}) // NOSONAR
})
