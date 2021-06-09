import { DescribeImagesCommandInput, DescribeImagesCommandOutput } from "../commands/DescribeImagesCommand";
import { ECRPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeImages(config: ECRPaginationConfiguration, input: DescribeImagesCommandInput, ...additionalArguments: any): Paginator<DescribeImagesCommandOutput>;
