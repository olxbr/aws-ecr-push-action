import { DescribeRepositoriesCommandInput, DescribeRepositoriesCommandOutput } from "../commands/DescribeRepositoriesCommand";
import { ECRPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeRepositories(config: ECRPaginationConfiguration, input: DescribeRepositoriesCommandInput, ...additionalArguments: any): Paginator<DescribeRepositoriesCommandOutput>;
