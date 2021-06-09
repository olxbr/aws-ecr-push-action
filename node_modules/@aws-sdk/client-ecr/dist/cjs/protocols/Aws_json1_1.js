"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_json1_1GetLifecyclePolicyCommand = exports.deserializeAws_json1_1GetDownloadUrlForLayerCommand = exports.deserializeAws_json1_1GetAuthorizationTokenCommand = exports.deserializeAws_json1_1DescribeRepositoriesCommand = exports.deserializeAws_json1_1DescribeRegistryCommand = exports.deserializeAws_json1_1DescribeImageScanFindingsCommand = exports.deserializeAws_json1_1DescribeImagesCommand = exports.deserializeAws_json1_1DeleteRepositoryPolicyCommand = exports.deserializeAws_json1_1DeleteRepositoryCommand = exports.deserializeAws_json1_1DeleteRegistryPolicyCommand = exports.deserializeAws_json1_1DeleteLifecyclePolicyCommand = exports.deserializeAws_json1_1CreateRepositoryCommand = exports.deserializeAws_json1_1CompleteLayerUploadCommand = exports.deserializeAws_json1_1BatchGetImageCommand = exports.deserializeAws_json1_1BatchDeleteImageCommand = exports.deserializeAws_json1_1BatchCheckLayerAvailabilityCommand = exports.serializeAws_json1_1UploadLayerPartCommand = exports.serializeAws_json1_1UntagResourceCommand = exports.serializeAws_json1_1TagResourceCommand = exports.serializeAws_json1_1StartLifecyclePolicyPreviewCommand = exports.serializeAws_json1_1StartImageScanCommand = exports.serializeAws_json1_1SetRepositoryPolicyCommand = exports.serializeAws_json1_1PutReplicationConfigurationCommand = exports.serializeAws_json1_1PutRegistryPolicyCommand = exports.serializeAws_json1_1PutLifecyclePolicyCommand = exports.serializeAws_json1_1PutImageTagMutabilityCommand = exports.serializeAws_json1_1PutImageScanningConfigurationCommand = exports.serializeAws_json1_1PutImageCommand = exports.serializeAws_json1_1ListTagsForResourceCommand = exports.serializeAws_json1_1ListImagesCommand = exports.serializeAws_json1_1InitiateLayerUploadCommand = exports.serializeAws_json1_1GetRepositoryPolicyCommand = exports.serializeAws_json1_1GetRegistryPolicyCommand = exports.serializeAws_json1_1GetLifecyclePolicyPreviewCommand = exports.serializeAws_json1_1GetLifecyclePolicyCommand = exports.serializeAws_json1_1GetDownloadUrlForLayerCommand = exports.serializeAws_json1_1GetAuthorizationTokenCommand = exports.serializeAws_json1_1DescribeRepositoriesCommand = exports.serializeAws_json1_1DescribeRegistryCommand = exports.serializeAws_json1_1DescribeImageScanFindingsCommand = exports.serializeAws_json1_1DescribeImagesCommand = exports.serializeAws_json1_1DeleteRepositoryPolicyCommand = exports.serializeAws_json1_1DeleteRepositoryCommand = exports.serializeAws_json1_1DeleteRegistryPolicyCommand = exports.serializeAws_json1_1DeleteLifecyclePolicyCommand = exports.serializeAws_json1_1CreateRepositoryCommand = exports.serializeAws_json1_1CompleteLayerUploadCommand = exports.serializeAws_json1_1BatchGetImageCommand = exports.serializeAws_json1_1BatchDeleteImageCommand = exports.serializeAws_json1_1BatchCheckLayerAvailabilityCommand = void 0;
exports.deserializeAws_json1_1UploadLayerPartCommand = exports.deserializeAws_json1_1UntagResourceCommand = exports.deserializeAws_json1_1TagResourceCommand = exports.deserializeAws_json1_1StartLifecyclePolicyPreviewCommand = exports.deserializeAws_json1_1StartImageScanCommand = exports.deserializeAws_json1_1SetRepositoryPolicyCommand = exports.deserializeAws_json1_1PutReplicationConfigurationCommand = exports.deserializeAws_json1_1PutRegistryPolicyCommand = exports.deserializeAws_json1_1PutLifecyclePolicyCommand = exports.deserializeAws_json1_1PutImageTagMutabilityCommand = exports.deserializeAws_json1_1PutImageScanningConfigurationCommand = exports.deserializeAws_json1_1PutImageCommand = exports.deserializeAws_json1_1ListTagsForResourceCommand = exports.deserializeAws_json1_1ListImagesCommand = exports.deserializeAws_json1_1InitiateLayerUploadCommand = exports.deserializeAws_json1_1GetRepositoryPolicyCommand = exports.deserializeAws_json1_1GetRegistryPolicyCommand = exports.deserializeAws_json1_1GetLifecyclePolicyPreviewCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const serializeAws_json1_1BatchCheckLayerAvailabilityCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.BatchCheckLayerAvailability",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1BatchCheckLayerAvailabilityRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1BatchCheckLayerAvailabilityCommand = serializeAws_json1_1BatchCheckLayerAvailabilityCommand;
const serializeAws_json1_1BatchDeleteImageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.BatchDeleteImage",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1BatchDeleteImageRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1BatchDeleteImageCommand = serializeAws_json1_1BatchDeleteImageCommand;
const serializeAws_json1_1BatchGetImageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.BatchGetImage",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1BatchGetImageRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1BatchGetImageCommand = serializeAws_json1_1BatchGetImageCommand;
const serializeAws_json1_1CompleteLayerUploadCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.CompleteLayerUpload",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CompleteLayerUploadRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CompleteLayerUploadCommand = serializeAws_json1_1CompleteLayerUploadCommand;
const serializeAws_json1_1CreateRepositoryCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.CreateRepository",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateRepositoryRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateRepositoryCommand = serializeAws_json1_1CreateRepositoryCommand;
const serializeAws_json1_1DeleteLifecyclePolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DeleteLifecyclePolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteLifecyclePolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteLifecyclePolicyCommand = serializeAws_json1_1DeleteLifecyclePolicyCommand;
const serializeAws_json1_1DeleteRegistryPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DeleteRegistryPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteRegistryPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteRegistryPolicyCommand = serializeAws_json1_1DeleteRegistryPolicyCommand;
const serializeAws_json1_1DeleteRepositoryCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DeleteRepository",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteRepositoryRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteRepositoryCommand = serializeAws_json1_1DeleteRepositoryCommand;
const serializeAws_json1_1DeleteRepositoryPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DeleteRepositoryPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteRepositoryPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteRepositoryPolicyCommand = serializeAws_json1_1DeleteRepositoryPolicyCommand;
const serializeAws_json1_1DescribeImagesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DescribeImages",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeImagesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeImagesCommand = serializeAws_json1_1DescribeImagesCommand;
const serializeAws_json1_1DescribeImageScanFindingsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DescribeImageScanFindings",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeImageScanFindingsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeImageScanFindingsCommand = serializeAws_json1_1DescribeImageScanFindingsCommand;
const serializeAws_json1_1DescribeRegistryCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DescribeRegistry",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeRegistryRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeRegistryCommand = serializeAws_json1_1DescribeRegistryCommand;
const serializeAws_json1_1DescribeRepositoriesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DescribeRepositories",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeRepositoriesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeRepositoriesCommand = serializeAws_json1_1DescribeRepositoriesCommand;
const serializeAws_json1_1GetAuthorizationTokenCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetAuthorizationToken",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetAuthorizationTokenRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetAuthorizationTokenCommand = serializeAws_json1_1GetAuthorizationTokenCommand;
const serializeAws_json1_1GetDownloadUrlForLayerCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetDownloadUrlForLayer",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetDownloadUrlForLayerRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetDownloadUrlForLayerCommand = serializeAws_json1_1GetDownloadUrlForLayerCommand;
const serializeAws_json1_1GetLifecyclePolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetLifecyclePolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetLifecyclePolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetLifecyclePolicyCommand = serializeAws_json1_1GetLifecyclePolicyCommand;
const serializeAws_json1_1GetLifecyclePolicyPreviewCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetLifecyclePolicyPreview",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetLifecyclePolicyPreviewRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetLifecyclePolicyPreviewCommand = serializeAws_json1_1GetLifecyclePolicyPreviewCommand;
const serializeAws_json1_1GetRegistryPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetRegistryPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetRegistryPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetRegistryPolicyCommand = serializeAws_json1_1GetRegistryPolicyCommand;
const serializeAws_json1_1GetRepositoryPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetRepositoryPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetRepositoryPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetRepositoryPolicyCommand = serializeAws_json1_1GetRepositoryPolicyCommand;
const serializeAws_json1_1InitiateLayerUploadCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.InitiateLayerUpload",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1InitiateLayerUploadRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1InitiateLayerUploadCommand = serializeAws_json1_1InitiateLayerUploadCommand;
const serializeAws_json1_1ListImagesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.ListImages",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListImagesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListImagesCommand = serializeAws_json1_1ListImagesCommand;
const serializeAws_json1_1ListTagsForResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.ListTagsForResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListTagsForResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListTagsForResourceCommand = serializeAws_json1_1ListTagsForResourceCommand;
const serializeAws_json1_1PutImageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutImage",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutImageRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutImageCommand = serializeAws_json1_1PutImageCommand;
const serializeAws_json1_1PutImageScanningConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutImageScanningConfiguration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutImageScanningConfigurationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutImageScanningConfigurationCommand = serializeAws_json1_1PutImageScanningConfigurationCommand;
const serializeAws_json1_1PutImageTagMutabilityCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutImageTagMutability",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutImageTagMutabilityRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutImageTagMutabilityCommand = serializeAws_json1_1PutImageTagMutabilityCommand;
const serializeAws_json1_1PutLifecyclePolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutLifecyclePolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutLifecyclePolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutLifecyclePolicyCommand = serializeAws_json1_1PutLifecyclePolicyCommand;
const serializeAws_json1_1PutRegistryPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutRegistryPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutRegistryPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutRegistryPolicyCommand = serializeAws_json1_1PutRegistryPolicyCommand;
const serializeAws_json1_1PutReplicationConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutReplicationConfiguration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutReplicationConfigurationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutReplicationConfigurationCommand = serializeAws_json1_1PutReplicationConfigurationCommand;
const serializeAws_json1_1SetRepositoryPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.SetRepositoryPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1SetRepositoryPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1SetRepositoryPolicyCommand = serializeAws_json1_1SetRepositoryPolicyCommand;
const serializeAws_json1_1StartImageScanCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.StartImageScan",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartImageScanRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartImageScanCommand = serializeAws_json1_1StartImageScanCommand;
const serializeAws_json1_1StartLifecyclePolicyPreviewCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.StartLifecyclePolicyPreview",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartLifecyclePolicyPreviewRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartLifecyclePolicyPreviewCommand = serializeAws_json1_1StartLifecyclePolicyPreviewCommand;
const serializeAws_json1_1TagResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.TagResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1TagResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1TagResourceCommand = serializeAws_json1_1TagResourceCommand;
const serializeAws_json1_1UntagResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.UntagResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UntagResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UntagResourceCommand = serializeAws_json1_1UntagResourceCommand;
const serializeAws_json1_1UploadLayerPartCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.UploadLayerPart",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UploadLayerPartRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UploadLayerPartCommand = serializeAws_json1_1UploadLayerPartCommand;
const deserializeAws_json1_1BatchCheckLayerAvailabilityCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1BatchCheckLayerAvailabilityCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1BatchCheckLayerAvailabilityResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1BatchCheckLayerAvailabilityCommand = deserializeAws_json1_1BatchCheckLayerAvailabilityCommand;
const deserializeAws_json1_1BatchCheckLayerAvailabilityCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1BatchDeleteImageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1BatchDeleteImageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1BatchDeleteImageResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1BatchDeleteImageCommand = deserializeAws_json1_1BatchDeleteImageCommand;
const deserializeAws_json1_1BatchDeleteImageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1BatchGetImageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1BatchGetImageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1BatchGetImageResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1BatchGetImageCommand = deserializeAws_json1_1BatchGetImageCommand;
const deserializeAws_json1_1BatchGetImageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1CompleteLayerUploadCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CompleteLayerUploadCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CompleteLayerUploadResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CompleteLayerUploadCommand = deserializeAws_json1_1CompleteLayerUploadCommand;
const deserializeAws_json1_1CompleteLayerUploadCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "EmptyUploadException":
        case "com.amazonaws.ecr#EmptyUploadException":
            response = {
                ...(await deserializeAws_json1_1EmptyUploadExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidLayerException":
        case "com.amazonaws.ecr#InvalidLayerException":
            response = {
                ...(await deserializeAws_json1_1InvalidLayerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsException":
        case "com.amazonaws.ecr#KmsException":
            response = {
                ...(await deserializeAws_json1_1KmsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LayerAlreadyExistsException":
        case "com.amazonaws.ecr#LayerAlreadyExistsException":
            response = {
                ...(await deserializeAws_json1_1LayerAlreadyExistsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LayerPartTooSmallException":
        case "com.amazonaws.ecr#LayerPartTooSmallException":
            response = {
                ...(await deserializeAws_json1_1LayerPartTooSmallExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UploadNotFoundException":
        case "com.amazonaws.ecr#UploadNotFoundException":
            response = {
                ...(await deserializeAws_json1_1UploadNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1CreateRepositoryCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateRepositoryCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateRepositoryResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateRepositoryCommand = deserializeAws_json1_1CreateRepositoryCommand;
const deserializeAws_json1_1CreateRepositoryCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidTagParameterException":
        case "com.amazonaws.ecr#InvalidTagParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidTagParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsException":
        case "com.amazonaws.ecr#KmsException":
            response = {
                ...(await deserializeAws_json1_1KmsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.ecr#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryAlreadyExistsException":
        case "com.amazonaws.ecr#RepositoryAlreadyExistsException":
            response = {
                ...(await deserializeAws_json1_1RepositoryAlreadyExistsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyTagsException":
        case "com.amazonaws.ecr#TooManyTagsException":
            response = {
                ...(await deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteLifecyclePolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteLifecyclePolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteLifecyclePolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteLifecyclePolicyCommand = deserializeAws_json1_1DeleteLifecyclePolicyCommand;
const deserializeAws_json1_1DeleteLifecyclePolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LifecyclePolicyNotFoundException":
        case "com.amazonaws.ecr#LifecyclePolicyNotFoundException":
            response = {
                ...(await deserializeAws_json1_1LifecyclePolicyNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteRegistryPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteRegistryPolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteRegistryPolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteRegistryPolicyCommand = deserializeAws_json1_1DeleteRegistryPolicyCommand;
const deserializeAws_json1_1DeleteRegistryPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RegistryPolicyNotFoundException":
        case "com.amazonaws.ecr#RegistryPolicyNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RegistryPolicyNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteRepositoryCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteRepositoryCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteRepositoryResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteRepositoryCommand = deserializeAws_json1_1DeleteRepositoryCommand;
const deserializeAws_json1_1DeleteRepositoryCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsException":
        case "com.amazonaws.ecr#KmsException":
            response = {
                ...(await deserializeAws_json1_1KmsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotEmptyException":
        case "com.amazonaws.ecr#RepositoryNotEmptyException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotEmptyExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteRepositoryPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteRepositoryPolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteRepositoryPolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteRepositoryPolicyCommand = deserializeAws_json1_1DeleteRepositoryPolicyCommand;
const deserializeAws_json1_1DeleteRepositoryPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryPolicyNotFoundException":
        case "com.amazonaws.ecr#RepositoryPolicyNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryPolicyNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeImagesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeImagesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeImagesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeImagesCommand = deserializeAws_json1_1DescribeImagesCommand;
const deserializeAws_json1_1DescribeImagesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ImageNotFoundException":
        case "com.amazonaws.ecr#ImageNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ImageNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeImageScanFindingsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeImageScanFindingsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeImageScanFindingsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeImageScanFindingsCommand = deserializeAws_json1_1DescribeImageScanFindingsCommand;
const deserializeAws_json1_1DescribeImageScanFindingsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ImageNotFoundException":
        case "com.amazonaws.ecr#ImageNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ImageNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ScanNotFoundException":
        case "com.amazonaws.ecr#ScanNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ScanNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeRegistryCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeRegistryCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeRegistryResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeRegistryCommand = deserializeAws_json1_1DescribeRegistryCommand;
const deserializeAws_json1_1DescribeRegistryCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ecr#ValidationException":
            response = {
                ...(await deserializeAws_json1_1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeRepositoriesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeRepositoriesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeRepositoriesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeRepositoriesCommand = deserializeAws_json1_1DescribeRepositoriesCommand;
const deserializeAws_json1_1DescribeRepositoriesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetAuthorizationTokenCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetAuthorizationTokenCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetAuthorizationTokenResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetAuthorizationTokenCommand = deserializeAws_json1_1GetAuthorizationTokenCommand;
const deserializeAws_json1_1GetAuthorizationTokenCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetDownloadUrlForLayerCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetDownloadUrlForLayerCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetDownloadUrlForLayerResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetDownloadUrlForLayerCommand = deserializeAws_json1_1GetDownloadUrlForLayerCommand;
const deserializeAws_json1_1GetDownloadUrlForLayerCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LayerInaccessibleException":
        case "com.amazonaws.ecr#LayerInaccessibleException":
            response = {
                ...(await deserializeAws_json1_1LayerInaccessibleExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LayersNotFoundException":
        case "com.amazonaws.ecr#LayersNotFoundException":
            response = {
                ...(await deserializeAws_json1_1LayersNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetLifecyclePolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetLifecyclePolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetLifecyclePolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetLifecyclePolicyCommand = deserializeAws_json1_1GetLifecyclePolicyCommand;
const deserializeAws_json1_1GetLifecyclePolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LifecyclePolicyNotFoundException":
        case "com.amazonaws.ecr#LifecyclePolicyNotFoundException":
            response = {
                ...(await deserializeAws_json1_1LifecyclePolicyNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetLifecyclePolicyPreviewCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetLifecyclePolicyPreviewCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetLifecyclePolicyPreviewResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetLifecyclePolicyPreviewCommand = deserializeAws_json1_1GetLifecyclePolicyPreviewCommand;
const deserializeAws_json1_1GetLifecyclePolicyPreviewCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LifecyclePolicyPreviewNotFoundException":
        case "com.amazonaws.ecr#LifecyclePolicyPreviewNotFoundException":
            response = {
                ...(await deserializeAws_json1_1LifecyclePolicyPreviewNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetRegistryPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetRegistryPolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetRegistryPolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetRegistryPolicyCommand = deserializeAws_json1_1GetRegistryPolicyCommand;
const deserializeAws_json1_1GetRegistryPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RegistryPolicyNotFoundException":
        case "com.amazonaws.ecr#RegistryPolicyNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RegistryPolicyNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetRepositoryPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetRepositoryPolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetRepositoryPolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetRepositoryPolicyCommand = deserializeAws_json1_1GetRepositoryPolicyCommand;
const deserializeAws_json1_1GetRepositoryPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryPolicyNotFoundException":
        case "com.amazonaws.ecr#RepositoryPolicyNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryPolicyNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1InitiateLayerUploadCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1InitiateLayerUploadCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1InitiateLayerUploadResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1InitiateLayerUploadCommand = deserializeAws_json1_1InitiateLayerUploadCommand;
const deserializeAws_json1_1InitiateLayerUploadCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsException":
        case "com.amazonaws.ecr#KmsException":
            response = {
                ...(await deserializeAws_json1_1KmsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1ListImagesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListImagesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListImagesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListImagesCommand = deserializeAws_json1_1ListImagesCommand;
const deserializeAws_json1_1ListImagesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1ListTagsForResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListTagsForResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListTagsForResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListTagsForResourceCommand = deserializeAws_json1_1ListTagsForResourceCommand;
const deserializeAws_json1_1ListTagsForResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutImageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutImageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutImageResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutImageCommand = deserializeAws_json1_1PutImageCommand;
const deserializeAws_json1_1PutImageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ImageAlreadyExistsException":
        case "com.amazonaws.ecr#ImageAlreadyExistsException":
            response = {
                ...(await deserializeAws_json1_1ImageAlreadyExistsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageDigestDoesNotMatchException":
        case "com.amazonaws.ecr#ImageDigestDoesNotMatchException":
            response = {
                ...(await deserializeAws_json1_1ImageDigestDoesNotMatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTagAlreadyExistsException":
        case "com.amazonaws.ecr#ImageTagAlreadyExistsException":
            response = {
                ...(await deserializeAws_json1_1ImageTagAlreadyExistsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsException":
        case "com.amazonaws.ecr#KmsException":
            response = {
                ...(await deserializeAws_json1_1KmsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LayersNotFoundException":
        case "com.amazonaws.ecr#LayersNotFoundException":
            response = {
                ...(await deserializeAws_json1_1LayersNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.ecr#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ReferencedImagesNotFoundException":
        case "com.amazonaws.ecr#ReferencedImagesNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ReferencedImagesNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutImageScanningConfigurationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutImageScanningConfigurationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutImageScanningConfigurationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutImageScanningConfigurationCommand = deserializeAws_json1_1PutImageScanningConfigurationCommand;
const deserializeAws_json1_1PutImageScanningConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutImageTagMutabilityCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutImageTagMutabilityCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutImageTagMutabilityResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutImageTagMutabilityCommand = deserializeAws_json1_1PutImageTagMutabilityCommand;
const deserializeAws_json1_1PutImageTagMutabilityCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutLifecyclePolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutLifecyclePolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutLifecyclePolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutLifecyclePolicyCommand = deserializeAws_json1_1PutLifecyclePolicyCommand;
const deserializeAws_json1_1PutLifecyclePolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutRegistryPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutRegistryPolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutRegistryPolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutRegistryPolicyCommand = deserializeAws_json1_1PutRegistryPolicyCommand;
const deserializeAws_json1_1PutRegistryPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutReplicationConfigurationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutReplicationConfigurationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutReplicationConfigurationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutReplicationConfigurationCommand = deserializeAws_json1_1PutReplicationConfigurationCommand;
const deserializeAws_json1_1PutReplicationConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ecr#ValidationException":
            response = {
                ...(await deserializeAws_json1_1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1SetRepositoryPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1SetRepositoryPolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1SetRepositoryPolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1SetRepositoryPolicyCommand = deserializeAws_json1_1SetRepositoryPolicyCommand;
const deserializeAws_json1_1SetRepositoryPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1StartImageScanCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartImageScanCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartImageScanResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartImageScanCommand = deserializeAws_json1_1StartImageScanCommand;
const deserializeAws_json1_1StartImageScanCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ImageNotFoundException":
        case "com.amazonaws.ecr#ImageNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ImageNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.ecr#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedImageTypeException":
        case "com.amazonaws.ecr#UnsupportedImageTypeException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedImageTypeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1StartLifecyclePolicyPreviewCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartLifecyclePolicyPreviewCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartLifecyclePolicyPreviewResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartLifecyclePolicyPreviewCommand = deserializeAws_json1_1StartLifecyclePolicyPreviewCommand;
const deserializeAws_json1_1StartLifecyclePolicyPreviewCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LifecyclePolicyNotFoundException":
        case "com.amazonaws.ecr#LifecyclePolicyNotFoundException":
            response = {
                ...(await deserializeAws_json1_1LifecyclePolicyNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LifecyclePolicyPreviewInProgressException":
        case "com.amazonaws.ecr#LifecyclePolicyPreviewInProgressException":
            response = {
                ...(await deserializeAws_json1_1LifecyclePolicyPreviewInProgressExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1TagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1TagResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1TagResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1TagResourceCommand = deserializeAws_json1_1TagResourceCommand;
const deserializeAws_json1_1TagResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidTagParameterException":
        case "com.amazonaws.ecr#InvalidTagParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidTagParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyTagsException":
        case "com.amazonaws.ecr#TooManyTagsException":
            response = {
                ...(await deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1UntagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UntagResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1UntagResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UntagResourceCommand = deserializeAws_json1_1UntagResourceCommand;
const deserializeAws_json1_1UntagResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidTagParameterException":
        case "com.amazonaws.ecr#InvalidTagParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidTagParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyTagsException":
        case "com.amazonaws.ecr#TooManyTagsException":
            response = {
                ...(await deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1UploadLayerPartCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UploadLayerPartCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1UploadLayerPartResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UploadLayerPartCommand = deserializeAws_json1_1UploadLayerPartCommand;
const deserializeAws_json1_1UploadLayerPartCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidLayerPartException":
        case "com.amazonaws.ecr#InvalidLayerPartException":
            response = {
                ...(await deserializeAws_json1_1InvalidLayerPartExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.ecr#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsException":
        case "com.amazonaws.ecr#KmsException":
            response = {
                ...(await deserializeAws_json1_1KmsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.ecr#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "RepositoryNotFoundException":
        case "com.amazonaws.ecr#RepositoryNotFoundException":
            response = {
                ...(await deserializeAws_json1_1RepositoryNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServerException":
        case "com.amazonaws.ecr#ServerException":
            response = {
                ...(await deserializeAws_json1_1ServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UploadNotFoundException":
        case "com.amazonaws.ecr#UploadNotFoundException":
            response = {
                ...(await deserializeAws_json1_1UploadNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1EmptyUploadExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1EmptyUploadException(body, context);
    const contents = {
        name: "EmptyUploadException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ImageAlreadyExistsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ImageAlreadyExistsException(body, context);
    const contents = {
        name: "ImageAlreadyExistsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ImageDigestDoesNotMatchExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ImageDigestDoesNotMatchException(body, context);
    const contents = {
        name: "ImageDigestDoesNotMatchException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ImageNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ImageNotFoundException(body, context);
    const contents = {
        name: "ImageNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ImageTagAlreadyExistsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ImageTagAlreadyExistsException(body, context);
    const contents = {
        name: "ImageTagAlreadyExistsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidLayerExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidLayerException(body, context);
    const contents = {
        name: "InvalidLayerException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidLayerPartExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidLayerPartException(body, context);
    const contents = {
        name: "InvalidLayerPartException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidParameterExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidParameterException(body, context);
    const contents = {
        name: "InvalidParameterException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidTagParameterExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidTagParameterException(body, context);
    const contents = {
        name: "InvalidTagParameterException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1KmsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1KmsException(body, context);
    const contents = {
        name: "KmsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LayerAlreadyExistsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LayerAlreadyExistsException(body, context);
    const contents = {
        name: "LayerAlreadyExistsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LayerInaccessibleExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LayerInaccessibleException(body, context);
    const contents = {
        name: "LayerInaccessibleException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LayerPartTooSmallExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LayerPartTooSmallException(body, context);
    const contents = {
        name: "LayerPartTooSmallException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LayersNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LayersNotFoundException(body, context);
    const contents = {
        name: "LayersNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LifecyclePolicyNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LifecyclePolicyNotFoundException(body, context);
    const contents = {
        name: "LifecyclePolicyNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LifecyclePolicyPreviewInProgressExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LifecyclePolicyPreviewInProgressException(body, context);
    const contents = {
        name: "LifecyclePolicyPreviewInProgressException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LifecyclePolicyPreviewNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LifecyclePolicyPreviewNotFoundException(body, context);
    const contents = {
        name: "LifecyclePolicyPreviewNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LimitExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LimitExceededException(body, context);
    const contents = {
        name: "LimitExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ReferencedImagesNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ReferencedImagesNotFoundException(body, context);
    const contents = {
        name: "ReferencedImagesNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1RegistryPolicyNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1RegistryPolicyNotFoundException(body, context);
    const contents = {
        name: "RegistryPolicyNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1RepositoryAlreadyExistsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1RepositoryAlreadyExistsException(body, context);
    const contents = {
        name: "RepositoryAlreadyExistsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1RepositoryNotEmptyExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1RepositoryNotEmptyException(body, context);
    const contents = {
        name: "RepositoryNotEmptyException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1RepositoryNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1RepositoryNotFoundException(body, context);
    const contents = {
        name: "RepositoryNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1RepositoryPolicyNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1RepositoryPolicyNotFoundException(body, context);
    const contents = {
        name: "RepositoryPolicyNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ScanNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ScanNotFoundException(body, context);
    const contents = {
        name: "ScanNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ServerExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ServerException(body, context);
    const contents = {
        name: "ServerException",
        $fault: "server",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1TooManyTagsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1TooManyTagsException(body, context);
    const contents = {
        name: "TooManyTagsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1UnsupportedImageTypeExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1UnsupportedImageTypeException(body, context);
    const contents = {
        name: "UnsupportedImageTypeException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1UploadNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1UploadNotFoundException(body, context);
    const contents = {
        name: "UploadNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ValidationExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ValidationException(body, context);
    const contents = {
        name: "ValidationException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const serializeAws_json1_1BatchCheckLayerAvailabilityRequest = (input, context) => {
    return {
        ...(input.layerDigests !== undefined &&
            input.layerDigests !== null && {
            layerDigests: serializeAws_json1_1BatchedOperationLayerDigestList(input.layerDigests, context),
        }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1BatchDeleteImageRequest = (input, context) => {
    return {
        ...(input.imageIds !== undefined &&
            input.imageIds !== null && { imageIds: serializeAws_json1_1ImageIdentifierList(input.imageIds, context) }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1BatchedOperationLayerDigestList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1BatchGetImageRequest = (input, context) => {
    return {
        ...(input.acceptedMediaTypes !== undefined &&
            input.acceptedMediaTypes !== null && {
            acceptedMediaTypes: serializeAws_json1_1MediaTypeList(input.acceptedMediaTypes, context),
        }),
        ...(input.imageIds !== undefined &&
            input.imageIds !== null && { imageIds: serializeAws_json1_1ImageIdentifierList(input.imageIds, context) }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1CompleteLayerUploadRequest = (input, context) => {
    return {
        ...(input.layerDigests !== undefined &&
            input.layerDigests !== null && {
            layerDigests: serializeAws_json1_1LayerDigestList(input.layerDigests, context),
        }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
        ...(input.uploadId !== undefined && input.uploadId !== null && { uploadId: input.uploadId }),
    };
};
const serializeAws_json1_1CreateRepositoryRequest = (input, context) => {
    return {
        ...(input.encryptionConfiguration !== undefined &&
            input.encryptionConfiguration !== null && {
            encryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.encryptionConfiguration, context),
        }),
        ...(input.imageScanningConfiguration !== undefined &&
            input.imageScanningConfiguration !== null && {
            imageScanningConfiguration: serializeAws_json1_1ImageScanningConfiguration(input.imageScanningConfiguration, context),
        }),
        ...(input.imageTagMutability !== undefined &&
            input.imageTagMutability !== null && { imageTagMutability: input.imageTagMutability }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_json1_1TagList(input.tags, context) }),
    };
};
const serializeAws_json1_1DeleteLifecyclePolicyRequest = (input, context) => {
    return {
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1DeleteRegistryPolicyRequest = (input, context) => {
    return {};
};
const serializeAws_json1_1DeleteRepositoryPolicyRequest = (input, context) => {
    return {
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1DeleteRepositoryRequest = (input, context) => {
    return {
        ...(input.force !== undefined && input.force !== null && { force: input.force }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1DescribeImageScanFindingsRequest = (input, context) => {
    return {
        ...(input.imageId !== undefined &&
            input.imageId !== null && { imageId: serializeAws_json1_1ImageIdentifier(input.imageId, context) }),
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1DescribeImagesFilter = (input, context) => {
    return {
        ...(input.tagStatus !== undefined && input.tagStatus !== null && { tagStatus: input.tagStatus }),
    };
};
const serializeAws_json1_1DescribeImagesRequest = (input, context) => {
    return {
        ...(input.filter !== undefined &&
            input.filter !== null && { filter: serializeAws_json1_1DescribeImagesFilter(input.filter, context) }),
        ...(input.imageIds !== undefined &&
            input.imageIds !== null && { imageIds: serializeAws_json1_1ImageIdentifierList(input.imageIds, context) }),
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1DescribeRegistryRequest = (input, context) => {
    return {};
};
const serializeAws_json1_1DescribeRepositoriesRequest = (input, context) => {
    return {
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryNames !== undefined &&
            input.repositoryNames !== null && {
            repositoryNames: serializeAws_json1_1RepositoryNameList(input.repositoryNames, context),
        }),
    };
};
const serializeAws_json1_1EncryptionConfiguration = (input, context) => {
    return {
        ...(input.encryptionType !== undefined &&
            input.encryptionType !== null && { encryptionType: input.encryptionType }),
        ...(input.kmsKey !== undefined && input.kmsKey !== null && { kmsKey: input.kmsKey }),
    };
};
const serializeAws_json1_1GetAuthorizationTokenRegistryIdList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1GetAuthorizationTokenRequest = (input, context) => {
    return {
        ...(input.registryIds !== undefined &&
            input.registryIds !== null && {
            registryIds: serializeAws_json1_1GetAuthorizationTokenRegistryIdList(input.registryIds, context),
        }),
    };
};
const serializeAws_json1_1GetDownloadUrlForLayerRequest = (input, context) => {
    return {
        ...(input.layerDigest !== undefined && input.layerDigest !== null && { layerDigest: input.layerDigest }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1GetLifecyclePolicyPreviewRequest = (input, context) => {
    return {
        ...(input.filter !== undefined &&
            input.filter !== null && { filter: serializeAws_json1_1LifecyclePolicyPreviewFilter(input.filter, context) }),
        ...(input.imageIds !== undefined &&
            input.imageIds !== null && { imageIds: serializeAws_json1_1ImageIdentifierList(input.imageIds, context) }),
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1GetLifecyclePolicyRequest = (input, context) => {
    return {
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1GetRegistryPolicyRequest = (input, context) => {
    return {};
};
const serializeAws_json1_1GetRepositoryPolicyRequest = (input, context) => {
    return {
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1ImageIdentifier = (input, context) => {
    return {
        ...(input.imageDigest !== undefined && input.imageDigest !== null && { imageDigest: input.imageDigest }),
        ...(input.imageTag !== undefined && input.imageTag !== null && { imageTag: input.imageTag }),
    };
};
const serializeAws_json1_1ImageIdentifierList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1ImageIdentifier(entry, context);
    });
};
const serializeAws_json1_1ImageScanningConfiguration = (input, context) => {
    return {
        ...(input.scanOnPush !== undefined && input.scanOnPush !== null && { scanOnPush: input.scanOnPush }),
    };
};
const serializeAws_json1_1InitiateLayerUploadRequest = (input, context) => {
    return {
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1LayerDigestList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1LifecyclePolicyPreviewFilter = (input, context) => {
    return {
        ...(input.tagStatus !== undefined && input.tagStatus !== null && { tagStatus: input.tagStatus }),
    };
};
const serializeAws_json1_1ListImagesFilter = (input, context) => {
    return {
        ...(input.tagStatus !== undefined && input.tagStatus !== null && { tagStatus: input.tagStatus }),
    };
};
const serializeAws_json1_1ListImagesRequest = (input, context) => {
    return {
        ...(input.filter !== undefined &&
            input.filter !== null && { filter: serializeAws_json1_1ListImagesFilter(input.filter, context) }),
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1ListTagsForResourceRequest = (input, context) => {
    return {
        ...(input.resourceArn !== undefined && input.resourceArn !== null && { resourceArn: input.resourceArn }),
    };
};
const serializeAws_json1_1MediaTypeList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1PutImageRequest = (input, context) => {
    return {
        ...(input.imageDigest !== undefined && input.imageDigest !== null && { imageDigest: input.imageDigest }),
        ...(input.imageManifest !== undefined && input.imageManifest !== null && { imageManifest: input.imageManifest }),
        ...(input.imageManifestMediaType !== undefined &&
            input.imageManifestMediaType !== null && { imageManifestMediaType: input.imageManifestMediaType }),
        ...(input.imageTag !== undefined && input.imageTag !== null && { imageTag: input.imageTag }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1PutImageScanningConfigurationRequest = (input, context) => {
    return {
        ...(input.imageScanningConfiguration !== undefined &&
            input.imageScanningConfiguration !== null && {
            imageScanningConfiguration: serializeAws_json1_1ImageScanningConfiguration(input.imageScanningConfiguration, context),
        }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1PutImageTagMutabilityRequest = (input, context) => {
    return {
        ...(input.imageTagMutability !== undefined &&
            input.imageTagMutability !== null && { imageTagMutability: input.imageTagMutability }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1PutLifecyclePolicyRequest = (input, context) => {
    return {
        ...(input.lifecyclePolicyText !== undefined &&
            input.lifecyclePolicyText !== null && { lifecyclePolicyText: input.lifecyclePolicyText }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1PutRegistryPolicyRequest = (input, context) => {
    return {
        ...(input.policyText !== undefined && input.policyText !== null && { policyText: input.policyText }),
    };
};
const serializeAws_json1_1PutReplicationConfigurationRequest = (input, context) => {
    return {
        ...(input.replicationConfiguration !== undefined &&
            input.replicationConfiguration !== null && {
            replicationConfiguration: serializeAws_json1_1ReplicationConfiguration(input.replicationConfiguration, context),
        }),
    };
};
const serializeAws_json1_1ReplicationConfiguration = (input, context) => {
    return {
        ...(input.rules !== undefined &&
            input.rules !== null && { rules: serializeAws_json1_1ReplicationRuleList(input.rules, context) }),
    };
};
const serializeAws_json1_1ReplicationDestination = (input, context) => {
    return {
        ...(input.region !== undefined && input.region !== null && { region: input.region }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
    };
};
const serializeAws_json1_1ReplicationDestinationList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1ReplicationDestination(entry, context);
    });
};
const serializeAws_json1_1ReplicationRule = (input, context) => {
    return {
        ...(input.destinations !== undefined &&
            input.destinations !== null && {
            destinations: serializeAws_json1_1ReplicationDestinationList(input.destinations, context),
        }),
    };
};
const serializeAws_json1_1ReplicationRuleList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1ReplicationRule(entry, context);
    });
};
const serializeAws_json1_1RepositoryNameList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1SetRepositoryPolicyRequest = (input, context) => {
    return {
        ...(input.force !== undefined && input.force !== null && { force: input.force }),
        ...(input.policyText !== undefined && input.policyText !== null && { policyText: input.policyText }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1StartImageScanRequest = (input, context) => {
    return {
        ...(input.imageId !== undefined &&
            input.imageId !== null && { imageId: serializeAws_json1_1ImageIdentifier(input.imageId, context) }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1StartLifecyclePolicyPreviewRequest = (input, context) => {
    return {
        ...(input.lifecyclePolicyText !== undefined &&
            input.lifecyclePolicyText !== null && { lifecyclePolicyText: input.lifecyclePolicyText }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
    };
};
const serializeAws_json1_1Tag = (input, context) => {
    return {
        ...(input.Key !== undefined && input.Key !== null && { Key: input.Key }),
        ...(input.Value !== undefined && input.Value !== null && { Value: input.Value }),
    };
};
const serializeAws_json1_1TagKeyList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1TagList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Tag(entry, context);
    });
};
const serializeAws_json1_1TagResourceRequest = (input, context) => {
    return {
        ...(input.resourceArn !== undefined && input.resourceArn !== null && { resourceArn: input.resourceArn }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_json1_1TagList(input.tags, context) }),
    };
};
const serializeAws_json1_1UntagResourceRequest = (input, context) => {
    return {
        ...(input.resourceArn !== undefined && input.resourceArn !== null && { resourceArn: input.resourceArn }),
        ...(input.tagKeys !== undefined &&
            input.tagKeys !== null && { tagKeys: serializeAws_json1_1TagKeyList(input.tagKeys, context) }),
    };
};
const serializeAws_json1_1UploadLayerPartRequest = (input, context) => {
    return {
        ...(input.layerPartBlob !== undefined &&
            input.layerPartBlob !== null && { layerPartBlob: context.base64Encoder(input.layerPartBlob) }),
        ...(input.partFirstByte !== undefined && input.partFirstByte !== null && { partFirstByte: input.partFirstByte }),
        ...(input.partLastByte !== undefined && input.partLastByte !== null && { partLastByte: input.partLastByte }),
        ...(input.registryId !== undefined && input.registryId !== null && { registryId: input.registryId }),
        ...(input.repositoryName !== undefined &&
            input.repositoryName !== null && { repositoryName: input.repositoryName }),
        ...(input.uploadId !== undefined && input.uploadId !== null && { uploadId: input.uploadId }),
    };
};
const deserializeAws_json1_1Attribute = (output, context) => {
    return {
        key: output.key !== undefined && output.key !== null ? output.key : undefined,
        value: output.value !== undefined && output.value !== null ? output.value : undefined,
    };
};
const deserializeAws_json1_1AttributeList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Attribute(entry, context);
    });
};
const deserializeAws_json1_1AuthorizationData = (output, context) => {
    return {
        authorizationToken: output.authorizationToken !== undefined && output.authorizationToken !== null
            ? output.authorizationToken
            : undefined,
        expiresAt: output.expiresAt !== undefined && output.expiresAt !== null
            ? new Date(Math.round(output.expiresAt * 1000))
            : undefined,
        proxyEndpoint: output.proxyEndpoint !== undefined && output.proxyEndpoint !== null ? output.proxyEndpoint : undefined,
    };
};
const deserializeAws_json1_1AuthorizationDataList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1AuthorizationData(entry, context);
    });
};
const deserializeAws_json1_1BatchCheckLayerAvailabilityResponse = (output, context) => {
    return {
        failures: output.failures !== undefined && output.failures !== null
            ? deserializeAws_json1_1LayerFailureList(output.failures, context)
            : undefined,
        layers: output.layers !== undefined && output.layers !== null
            ? deserializeAws_json1_1LayerList(output.layers, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDeleteImageResponse = (output, context) => {
    return {
        failures: output.failures !== undefined && output.failures !== null
            ? deserializeAws_json1_1ImageFailureList(output.failures, context)
            : undefined,
        imageIds: output.imageIds !== undefined && output.imageIds !== null
            ? deserializeAws_json1_1ImageIdentifierList(output.imageIds, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchGetImageResponse = (output, context) => {
    return {
        failures: output.failures !== undefined && output.failures !== null
            ? deserializeAws_json1_1ImageFailureList(output.failures, context)
            : undefined,
        images: output.images !== undefined && output.images !== null
            ? deserializeAws_json1_1ImageList(output.images, context)
            : undefined,
    };
};
const deserializeAws_json1_1CompleteLayerUploadResponse = (output, context) => {
    return {
        layerDigest: output.layerDigest !== undefined && output.layerDigest !== null ? output.layerDigest : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
        uploadId: output.uploadId !== undefined && output.uploadId !== null ? output.uploadId : undefined,
    };
};
const deserializeAws_json1_1CreateRepositoryResponse = (output, context) => {
    return {
        repository: output.repository !== undefined && output.repository !== null
            ? deserializeAws_json1_1Repository(output.repository, context)
            : undefined,
    };
};
const deserializeAws_json1_1DeleteLifecyclePolicyResponse = (output, context) => {
    return {
        lastEvaluatedAt: output.lastEvaluatedAt !== undefined && output.lastEvaluatedAt !== null
            ? new Date(Math.round(output.lastEvaluatedAt * 1000))
            : undefined,
        lifecyclePolicyText: output.lifecyclePolicyText !== undefined && output.lifecyclePolicyText !== null
            ? output.lifecyclePolicyText
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1DeleteRegistryPolicyResponse = (output, context) => {
    return {
        policyText: output.policyText !== undefined && output.policyText !== null ? output.policyText : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
    };
};
const deserializeAws_json1_1DeleteRepositoryPolicyResponse = (output, context) => {
    return {
        policyText: output.policyText !== undefined && output.policyText !== null ? output.policyText : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1DeleteRepositoryResponse = (output, context) => {
    return {
        repository: output.repository !== undefined && output.repository !== null
            ? deserializeAws_json1_1Repository(output.repository, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeImageScanFindingsResponse = (output, context) => {
    return {
        imageId: output.imageId !== undefined && output.imageId !== null
            ? deserializeAws_json1_1ImageIdentifier(output.imageId, context)
            : undefined,
        imageScanFindings: output.imageScanFindings !== undefined && output.imageScanFindings !== null
            ? deserializeAws_json1_1ImageScanFindings(output.imageScanFindings, context)
            : undefined,
        imageScanStatus: output.imageScanStatus !== undefined && output.imageScanStatus !== null
            ? deserializeAws_json1_1ImageScanStatus(output.imageScanStatus, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1DescribeImagesResponse = (output, context) => {
    return {
        imageDetails: output.imageDetails !== undefined && output.imageDetails !== null
            ? deserializeAws_json1_1ImageDetailList(output.imageDetails, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
    };
};
const deserializeAws_json1_1DescribeRegistryResponse = (output, context) => {
    return {
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        replicationConfiguration: output.replicationConfiguration !== undefined && output.replicationConfiguration !== null
            ? deserializeAws_json1_1ReplicationConfiguration(output.replicationConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeRepositoriesResponse = (output, context) => {
    return {
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
        repositories: output.repositories !== undefined && output.repositories !== null
            ? deserializeAws_json1_1RepositoryList(output.repositories, context)
            : undefined,
    };
};
const deserializeAws_json1_1EmptyUploadException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1EncryptionConfiguration = (output, context) => {
    return {
        encryptionType: output.encryptionType !== undefined && output.encryptionType !== null ? output.encryptionType : undefined,
        kmsKey: output.kmsKey !== undefined && output.kmsKey !== null ? output.kmsKey : undefined,
    };
};
const deserializeAws_json1_1FindingSeverityCounts = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: value,
        };
    }, {});
};
const deserializeAws_json1_1GetAuthorizationTokenResponse = (output, context) => {
    return {
        authorizationData: output.authorizationData !== undefined && output.authorizationData !== null
            ? deserializeAws_json1_1AuthorizationDataList(output.authorizationData, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetDownloadUrlForLayerResponse = (output, context) => {
    return {
        downloadUrl: output.downloadUrl !== undefined && output.downloadUrl !== null ? output.downloadUrl : undefined,
        layerDigest: output.layerDigest !== undefined && output.layerDigest !== null ? output.layerDigest : undefined,
    };
};
const deserializeAws_json1_1GetLifecyclePolicyPreviewResponse = (output, context) => {
    return {
        lifecyclePolicyText: output.lifecyclePolicyText !== undefined && output.lifecyclePolicyText !== null
            ? output.lifecyclePolicyText
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
        previewResults: output.previewResults !== undefined && output.previewResults !== null
            ? deserializeAws_json1_1LifecyclePolicyPreviewResultList(output.previewResults, context)
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
        status: output.status !== undefined && output.status !== null ? output.status : undefined,
        summary: output.summary !== undefined && output.summary !== null
            ? deserializeAws_json1_1LifecyclePolicyPreviewSummary(output.summary, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetLifecyclePolicyResponse = (output, context) => {
    return {
        lastEvaluatedAt: output.lastEvaluatedAt !== undefined && output.lastEvaluatedAt !== null
            ? new Date(Math.round(output.lastEvaluatedAt * 1000))
            : undefined,
        lifecyclePolicyText: output.lifecyclePolicyText !== undefined && output.lifecyclePolicyText !== null
            ? output.lifecyclePolicyText
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1GetRegistryPolicyResponse = (output, context) => {
    return {
        policyText: output.policyText !== undefined && output.policyText !== null ? output.policyText : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
    };
};
const deserializeAws_json1_1GetRepositoryPolicyResponse = (output, context) => {
    return {
        policyText: output.policyText !== undefined && output.policyText !== null ? output.policyText : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1Image = (output, context) => {
    return {
        imageId: output.imageId !== undefined && output.imageId !== null
            ? deserializeAws_json1_1ImageIdentifier(output.imageId, context)
            : undefined,
        imageManifest: output.imageManifest !== undefined && output.imageManifest !== null ? output.imageManifest : undefined,
        imageManifestMediaType: output.imageManifestMediaType !== undefined && output.imageManifestMediaType !== null
            ? output.imageManifestMediaType
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1ImageAlreadyExistsException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ImageDetail = (output, context) => {
    return {
        artifactMediaType: output.artifactMediaType !== undefined && output.artifactMediaType !== null
            ? output.artifactMediaType
            : undefined,
        imageDigest: output.imageDigest !== undefined && output.imageDigest !== null ? output.imageDigest : undefined,
        imageManifestMediaType: output.imageManifestMediaType !== undefined && output.imageManifestMediaType !== null
            ? output.imageManifestMediaType
            : undefined,
        imagePushedAt: output.imagePushedAt !== undefined && output.imagePushedAt !== null
            ? new Date(Math.round(output.imagePushedAt * 1000))
            : undefined,
        imageScanFindingsSummary: output.imageScanFindingsSummary !== undefined && output.imageScanFindingsSummary !== null
            ? deserializeAws_json1_1ImageScanFindingsSummary(output.imageScanFindingsSummary, context)
            : undefined,
        imageScanStatus: output.imageScanStatus !== undefined && output.imageScanStatus !== null
            ? deserializeAws_json1_1ImageScanStatus(output.imageScanStatus, context)
            : undefined,
        imageSizeInBytes: output.imageSizeInBytes !== undefined && output.imageSizeInBytes !== null ? output.imageSizeInBytes : undefined,
        imageTags: output.imageTags !== undefined && output.imageTags !== null
            ? deserializeAws_json1_1ImageTagList(output.imageTags, context)
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1ImageDetailList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ImageDetail(entry, context);
    });
};
const deserializeAws_json1_1ImageDigestDoesNotMatchException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ImageFailure = (output, context) => {
    return {
        failureCode: output.failureCode !== undefined && output.failureCode !== null ? output.failureCode : undefined,
        failureReason: output.failureReason !== undefined && output.failureReason !== null ? output.failureReason : undefined,
        imageId: output.imageId !== undefined && output.imageId !== null
            ? deserializeAws_json1_1ImageIdentifier(output.imageId, context)
            : undefined,
    };
};
const deserializeAws_json1_1ImageFailureList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ImageFailure(entry, context);
    });
};
const deserializeAws_json1_1ImageIdentifier = (output, context) => {
    return {
        imageDigest: output.imageDigest !== undefined && output.imageDigest !== null ? output.imageDigest : undefined,
        imageTag: output.imageTag !== undefined && output.imageTag !== null ? output.imageTag : undefined,
    };
};
const deserializeAws_json1_1ImageIdentifierList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ImageIdentifier(entry, context);
    });
};
const deserializeAws_json1_1ImageList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Image(entry, context);
    });
};
const deserializeAws_json1_1ImageNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ImageScanFinding = (output, context) => {
    return {
        attributes: output.attributes !== undefined && output.attributes !== null
            ? deserializeAws_json1_1AttributeList(output.attributes, context)
            : undefined,
        description: output.description !== undefined && output.description !== null ? output.description : undefined,
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        severity: output.severity !== undefined && output.severity !== null ? output.severity : undefined,
        uri: output.uri !== undefined && output.uri !== null ? output.uri : undefined,
    };
};
const deserializeAws_json1_1ImageScanFindingList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ImageScanFinding(entry, context);
    });
};
const deserializeAws_json1_1ImageScanFindings = (output, context) => {
    return {
        findingSeverityCounts: output.findingSeverityCounts !== undefined && output.findingSeverityCounts !== null
            ? deserializeAws_json1_1FindingSeverityCounts(output.findingSeverityCounts, context)
            : undefined,
        findings: output.findings !== undefined && output.findings !== null
            ? deserializeAws_json1_1ImageScanFindingList(output.findings, context)
            : undefined,
        imageScanCompletedAt: output.imageScanCompletedAt !== undefined && output.imageScanCompletedAt !== null
            ? new Date(Math.round(output.imageScanCompletedAt * 1000))
            : undefined,
        vulnerabilitySourceUpdatedAt: output.vulnerabilitySourceUpdatedAt !== undefined && output.vulnerabilitySourceUpdatedAt !== null
            ? new Date(Math.round(output.vulnerabilitySourceUpdatedAt * 1000))
            : undefined,
    };
};
const deserializeAws_json1_1ImageScanFindingsSummary = (output, context) => {
    return {
        findingSeverityCounts: output.findingSeverityCounts !== undefined && output.findingSeverityCounts !== null
            ? deserializeAws_json1_1FindingSeverityCounts(output.findingSeverityCounts, context)
            : undefined,
        imageScanCompletedAt: output.imageScanCompletedAt !== undefined && output.imageScanCompletedAt !== null
            ? new Date(Math.round(output.imageScanCompletedAt * 1000))
            : undefined,
        vulnerabilitySourceUpdatedAt: output.vulnerabilitySourceUpdatedAt !== undefined && output.vulnerabilitySourceUpdatedAt !== null
            ? new Date(Math.round(output.vulnerabilitySourceUpdatedAt * 1000))
            : undefined,
    };
};
const deserializeAws_json1_1ImageScanningConfiguration = (output, context) => {
    return {
        scanOnPush: output.scanOnPush !== undefined && output.scanOnPush !== null ? output.scanOnPush : undefined,
    };
};
const deserializeAws_json1_1ImageScanStatus = (output, context) => {
    return {
        description: output.description !== undefined && output.description !== null ? output.description : undefined,
        status: output.status !== undefined && output.status !== null ? output.status : undefined,
    };
};
const deserializeAws_json1_1ImageTagAlreadyExistsException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ImageTagList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1InitiateLayerUploadResponse = (output, context) => {
    return {
        partSize: output.partSize !== undefined && output.partSize !== null ? output.partSize : undefined,
        uploadId: output.uploadId !== undefined && output.uploadId !== null ? output.uploadId : undefined,
    };
};
const deserializeAws_json1_1InvalidLayerException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1InvalidLayerPartException = (output, context) => {
    return {
        lastValidByteReceived: output.lastValidByteReceived !== undefined && output.lastValidByteReceived !== null
            ? output.lastValidByteReceived
            : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
        uploadId: output.uploadId !== undefined && output.uploadId !== null ? output.uploadId : undefined,
    };
};
const deserializeAws_json1_1InvalidParameterException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1InvalidTagParameterException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1KmsException = (output, context) => {
    return {
        kmsError: output.kmsError !== undefined && output.kmsError !== null ? output.kmsError : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1Layer = (output, context) => {
    return {
        layerAvailability: output.layerAvailability !== undefined && output.layerAvailability !== null
            ? output.layerAvailability
            : undefined,
        layerDigest: output.layerDigest !== undefined && output.layerDigest !== null ? output.layerDigest : undefined,
        layerSize: output.layerSize !== undefined && output.layerSize !== null ? output.layerSize : undefined,
        mediaType: output.mediaType !== undefined && output.mediaType !== null ? output.mediaType : undefined,
    };
};
const deserializeAws_json1_1LayerAlreadyExistsException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LayerFailure = (output, context) => {
    return {
        failureCode: output.failureCode !== undefined && output.failureCode !== null ? output.failureCode : undefined,
        failureReason: output.failureReason !== undefined && output.failureReason !== null ? output.failureReason : undefined,
        layerDigest: output.layerDigest !== undefined && output.layerDigest !== null ? output.layerDigest : undefined,
    };
};
const deserializeAws_json1_1LayerFailureList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1LayerFailure(entry, context);
    });
};
const deserializeAws_json1_1LayerInaccessibleException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LayerList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Layer(entry, context);
    });
};
const deserializeAws_json1_1LayerPartTooSmallException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LayersNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LifecyclePolicyNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LifecyclePolicyPreviewInProgressException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LifecyclePolicyPreviewNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LifecyclePolicyPreviewResult = (output, context) => {
    return {
        action: output.action !== undefined && output.action !== null
            ? deserializeAws_json1_1LifecyclePolicyRuleAction(output.action, context)
            : undefined,
        appliedRulePriority: output.appliedRulePriority !== undefined && output.appliedRulePriority !== null
            ? output.appliedRulePriority
            : undefined,
        imageDigest: output.imageDigest !== undefined && output.imageDigest !== null ? output.imageDigest : undefined,
        imagePushedAt: output.imagePushedAt !== undefined && output.imagePushedAt !== null
            ? new Date(Math.round(output.imagePushedAt * 1000))
            : undefined,
        imageTags: output.imageTags !== undefined && output.imageTags !== null
            ? deserializeAws_json1_1ImageTagList(output.imageTags, context)
            : undefined,
    };
};
const deserializeAws_json1_1LifecyclePolicyPreviewResultList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1LifecyclePolicyPreviewResult(entry, context);
    });
};
const deserializeAws_json1_1LifecyclePolicyPreviewSummary = (output, context) => {
    return {
        expiringImageTotalCount: output.expiringImageTotalCount !== undefined && output.expiringImageTotalCount !== null
            ? output.expiringImageTotalCount
            : undefined,
    };
};
const deserializeAws_json1_1LifecyclePolicyRuleAction = (output, context) => {
    return {
        type: output.type !== undefined && output.type !== null ? output.type : undefined,
    };
};
const deserializeAws_json1_1LimitExceededException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ListImagesResponse = (output, context) => {
    return {
        imageIds: output.imageIds !== undefined && output.imageIds !== null
            ? deserializeAws_json1_1ImageIdentifierList(output.imageIds, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
    };
};
const deserializeAws_json1_1ListTagsForResourceResponse = (output, context) => {
    return {
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_json1_1TagList(output.tags, context)
            : undefined,
    };
};
const deserializeAws_json1_1PutImageResponse = (output, context) => {
    return {
        image: output.image !== undefined && output.image !== null
            ? deserializeAws_json1_1Image(output.image, context)
            : undefined,
    };
};
const deserializeAws_json1_1PutImageScanningConfigurationResponse = (output, context) => {
    return {
        imageScanningConfiguration: output.imageScanningConfiguration !== undefined && output.imageScanningConfiguration !== null
            ? deserializeAws_json1_1ImageScanningConfiguration(output.imageScanningConfiguration, context)
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1PutImageTagMutabilityResponse = (output, context) => {
    return {
        imageTagMutability: output.imageTagMutability !== undefined && output.imageTagMutability !== null
            ? output.imageTagMutability
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1PutLifecyclePolicyResponse = (output, context) => {
    return {
        lifecyclePolicyText: output.lifecyclePolicyText !== undefined && output.lifecyclePolicyText !== null
            ? output.lifecyclePolicyText
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1PutRegistryPolicyResponse = (output, context) => {
    return {
        policyText: output.policyText !== undefined && output.policyText !== null ? output.policyText : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
    };
};
const deserializeAws_json1_1PutReplicationConfigurationResponse = (output, context) => {
    return {
        replicationConfiguration: output.replicationConfiguration !== undefined && output.replicationConfiguration !== null
            ? deserializeAws_json1_1ReplicationConfiguration(output.replicationConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_1ReferencedImagesNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1RegistryPolicyNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ReplicationConfiguration = (output, context) => {
    return {
        rules: output.rules !== undefined && output.rules !== null
            ? deserializeAws_json1_1ReplicationRuleList(output.rules, context)
            : undefined,
    };
};
const deserializeAws_json1_1ReplicationDestination = (output, context) => {
    return {
        region: output.region !== undefined && output.region !== null ? output.region : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
    };
};
const deserializeAws_json1_1ReplicationDestinationList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ReplicationDestination(entry, context);
    });
};
const deserializeAws_json1_1ReplicationRule = (output, context) => {
    return {
        destinations: output.destinations !== undefined && output.destinations !== null
            ? deserializeAws_json1_1ReplicationDestinationList(output.destinations, context)
            : undefined,
    };
};
const deserializeAws_json1_1ReplicationRuleList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ReplicationRule(entry, context);
    });
};
const deserializeAws_json1_1Repository = (output, context) => {
    return {
        createdAt: output.createdAt !== undefined && output.createdAt !== null
            ? new Date(Math.round(output.createdAt * 1000))
            : undefined,
        encryptionConfiguration: output.encryptionConfiguration !== undefined && output.encryptionConfiguration !== null
            ? deserializeAws_json1_1EncryptionConfiguration(output.encryptionConfiguration, context)
            : undefined,
        imageScanningConfiguration: output.imageScanningConfiguration !== undefined && output.imageScanningConfiguration !== null
            ? deserializeAws_json1_1ImageScanningConfiguration(output.imageScanningConfiguration, context)
            : undefined,
        imageTagMutability: output.imageTagMutability !== undefined && output.imageTagMutability !== null
            ? output.imageTagMutability
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryArn: output.repositoryArn !== undefined && output.repositoryArn !== null ? output.repositoryArn : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
        repositoryUri: output.repositoryUri !== undefined && output.repositoryUri !== null ? output.repositoryUri : undefined,
    };
};
const deserializeAws_json1_1RepositoryAlreadyExistsException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1RepositoryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Repository(entry, context);
    });
};
const deserializeAws_json1_1RepositoryNotEmptyException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1RepositoryNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1RepositoryPolicyNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ScanNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ServerException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1SetRepositoryPolicyResponse = (output, context) => {
    return {
        policyText: output.policyText !== undefined && output.policyText !== null ? output.policyText : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1StartImageScanResponse = (output, context) => {
    return {
        imageId: output.imageId !== undefined && output.imageId !== null
            ? deserializeAws_json1_1ImageIdentifier(output.imageId, context)
            : undefined,
        imageScanStatus: output.imageScanStatus !== undefined && output.imageScanStatus !== null
            ? deserializeAws_json1_1ImageScanStatus(output.imageScanStatus, context)
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
    };
};
const deserializeAws_json1_1StartLifecyclePolicyPreviewResponse = (output, context) => {
    return {
        lifecyclePolicyText: output.lifecyclePolicyText !== undefined && output.lifecyclePolicyText !== null
            ? output.lifecyclePolicyText
            : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
        status: output.status !== undefined && output.status !== null ? output.status : undefined,
    };
};
const deserializeAws_json1_1Tag = (output, context) => {
    return {
        Key: output.Key !== undefined && output.Key !== null ? output.Key : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1TagList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Tag(entry, context);
    });
};
const deserializeAws_json1_1TagResourceResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1TooManyTagsException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1UnsupportedImageTypeException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1UntagResourceResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1UploadLayerPartResponse = (output, context) => {
    return {
        lastByteReceived: output.lastByteReceived !== undefined && output.lastByteReceived !== null ? output.lastByteReceived : undefined,
        registryId: output.registryId !== undefined && output.registryId !== null ? output.registryId : undefined,
        repositoryName: output.repositoryName !== undefined && output.repositoryName !== null ? output.repositoryName : undefined,
        uploadId: output.uploadId !== undefined && output.uploadId !== null ? output.uploadId : undefined,
    };
};
const deserializeAws_json1_1UploadNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ValidationException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
// Collect low-level response body stream to Uint8Array.
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
// Encode Uint8Array data into string with utf-8.
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new protocol_http_1.HttpRequest(contents);
};
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
        return JSON.parse(encoded);
    }
    return {};
});
/**
 * Load an error code for the aws.rest-json-1.1 protocol.
 */
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data.code !== undefined) {
        return sanitizeErrorCode(data.code);
    }
    if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
    }
    return "";
};
//# sourceMappingURL=Aws_json1_1.js.map