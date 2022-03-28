const {
  validadeImageName,
  getRepositoryUri,
  defineRepositoryPolicy,
  dockerLoginOnECR,
  reportImageThreats,
  pushImage
} = require('./main');

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
