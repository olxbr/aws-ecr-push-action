import { DescribeImageScanFindingsCommandInput, DescribeImageScanFindingsCommandOutput } from "../commands/DescribeImageScanFindingsCommand";
import { ECRPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeImageScanFindings(config: ECRPaginationConfiguration, input: DescribeImageScanFindingsCommandInput, ...additionalArguments: any): Paginator<DescribeImageScanFindingsCommandOutput>;
