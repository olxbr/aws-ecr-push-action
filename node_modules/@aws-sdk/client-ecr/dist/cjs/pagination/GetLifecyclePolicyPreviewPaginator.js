"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateGetLifecyclePolicyPreview = void 0;
const ECR_1 = require("../ECR");
const ECRClient_1 = require("../ECRClient");
const GetLifecyclePolicyPreviewCommand_1 = require("../commands/GetLifecyclePolicyPreviewCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new GetLifecyclePolicyPreviewCommand_1.GetLifecyclePolicyPreviewCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.getLifecyclePolicyPreview(input, ...args);
};
async function* paginateGetLifecyclePolicyPreview(config, input, ...additionalArguments) {
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
exports.paginateGetLifecyclePolicyPreview = paginateGetLifecyclePolicyPreview;
//# sourceMappingURL=GetLifecyclePolicyPreviewPaginator.js.map