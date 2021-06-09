import { GetLifecyclePolicyPreviewCommandInput, GetLifecyclePolicyPreviewCommandOutput } from "../commands/GetLifecyclePolicyPreviewCommand";
import { ECRPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetLifecyclePolicyPreview(config: ECRPaginationConfiguration, input: GetLifecyclePolicyPreviewCommandInput, ...additionalArguments: any): Paginator<GetLifecyclePolicyPreviewCommandOutput>;
