const fs = require("fs");
const {
  setCostTagForRepository,
  getCostsUuidFromBackstageFile,
  tagResource,
} = require("./costs");

const { expect, test } = require("@jest/globals");

// Mock AWS Client
const costs = require("./costs");
const AWSClient = require("./AWSClient");
jest.mock("./AWSClient", () => {
  return {
    describeRepo: jest.fn(async (params) => {
      console.log(`describeRepo: ${params.repositoryName}`); // NOSONAR
      if (params.repositoryNames[0] == "cross/devtools/devtools-scripts")
        return {
          repositoryUri: `http://xpto.registry/${params.repositoryNames[0]}`,
          repositoryArn: `arn:aws:ecr:us-west-2:123456789012:repository/${params.repositoryNames[0]}`,
        }; // NOSONAR
      let error = new Error("Repo not found");
      error.name = "RepositoryNotFoundException";
      throw error;
    }),
    updateRepositryTags: jest.fn(async (params) => {
      console.log(params?.resourceArn);
      if (params?.resourceArn == "example-resource-arn-to-fail") {
        throw new Error("Error");
      }
      return { ResponseMetadata: { RequestId: "example-request-id" } };
    }),
  };
});

test("a", () => {
  expect(1).toBe(1);
});

test("getCostsUuidFromBackstageFile should return the cloud cost center metadata from the file", () => {
  // Mock the file content
  let backstageFileContent = `
metadata:
  teams.olxbr.io/cloud-cost-center: 00000-0000-0000-0000-00000
`;

  // Mock the readFileSync function
  jest.spyOn(fs, "readFileSync").mockReturnValue(backstageFileContent);

  // Call the function
  const result = getCostsUuidFromBackstageFile();

  // Assert the result
  expect(result).toBe("00000-0000-0000-0000-00000");
});

test("getCostsUuidFromBackstageFile should return an empty string if the file is not found", () => {
  // Mock the readFileSync function to throw an error
  jest.spyOn(fs, "readFileSync").mockImplementation(() => {
    throw new Error("File Not found");
  });

  // Call the function
  const result = getCostsUuidFromBackstageFile();

  // Assert the result
  expect(result).toBe("");
});

test("getCostsUuidFromBackstageFile should return an empty string if there is an error parsing the file", () => {
  // Mock the file content
  const backstageFileContent = "invalid yaml content";
  // Mock the readFileSync function
  jest.spyOn(fs, "readFileSync").mockReturnValue(backstageFileContent);

  // Call the function
  const result = getCostsUuidFromBackstageFile();

  // Assert the result
  expect(result).toBe("");
});

test("tagResource should call updateRepositryTags with the correct parameters", async () => {
  const resourceArn = "example-resource-arn";
  const costCenter = "00000-0000-0000-0000-00000";

  const expectedParams = {
    resourceArn: resourceArn,
    tags: [
      {
        Key: "cloud-cost-center",
        Value: costCenter,
      },
    ],
  };

  await tagResource(resourceArn, costCenter);

  expect(AWSClient.updateRepositryTags).toHaveBeenCalled();
  expect(AWSClient.updateRepositryTags).toHaveBeenCalledWith(expectedParams);
});

test("setCostTagForRepository should set the cost tag for the repository", async () => {
  const params = {
    repositoryNames: ["cross/devtools/devtools-scripts"],
    costCenter: "00000-0000-0000-0000-00000",
  };

  await setCostTagForRepository(params);

  expect(AWSClient.describeRepo).toHaveBeenCalledWith({
    repositoryNames: ["cross/devtools/devtools-scripts"],
  });
  expect(AWSClient.updateRepositryTags).toHaveBeenCalledWith({
    resourceArn:
      "arn:aws:ecr:us-west-2:123456789012:repository/cross/devtools/devtools-scripts",
    tags: [{ Key: "cloud-cost-center", Value: "00000-0000-0000-0000-00000" }],
  });
});
