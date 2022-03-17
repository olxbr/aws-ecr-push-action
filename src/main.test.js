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
      repositoryNames: 'my_invaid_bu/my_invalid_name'
    }
    const repositoryValidation = await validadeImageName(params);
    expect(await repositoryValidation()).toBe(false);
});

test('Test valid image name', async () => {

    const params = {
      repositoryNames: 'cross/devtools/devtools-scripts'
    }
    const repositoryValidation = await validadeImageName(params);
    expect(await repositoryValidation()).toBe(false);
});
