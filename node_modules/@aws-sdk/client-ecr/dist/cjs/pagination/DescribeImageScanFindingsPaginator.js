"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateDescribeImageScanFindings = void 0;
const ECR_1 = require("../ECR");
const ECRClient_1 = require("../ECRClient");
const DescribeImageScanFindingsCommand_1 = require("../commands/DescribeImageScanFindingsCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new DescribeImageScanFindingsCommand_1.DescribeImageScanFindingsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.describeImageScanFindings(input, ...args);
};
async function* paginateDescribeImageScanFindings(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.nextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.nextToken = token;
        input["maxResults"] = config.pageSize;
        if (config.client instanceof ECR_1.ECR) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof ECRClient_1.ECRClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected ECR | ECRClient");
        }
        yield page;
        token = page.nextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateDescribeImageScanFindings = paginateDescribeImageScanFindings;
//# sourceMappingURL=DescribeImageScanFindingsPaginator.js.map