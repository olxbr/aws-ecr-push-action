const describeRepo = (params) =>
  params.repositoryName == "cross/devtools/devtools-scripts"
    ? {
        repositoryUri: "http://xpto.registry/cross/devtools/devtools-scripts",
        repositoryArn:
          "arn:aws:ecr:us-east-1:012345678910:repository/cross/devtools/devtools-scripts",
      }
    : null; // NOSONAR

const mock = {
  describeRepo,
};

jest.mock("../AWSClient", () => mock);

module.exports = mock;
