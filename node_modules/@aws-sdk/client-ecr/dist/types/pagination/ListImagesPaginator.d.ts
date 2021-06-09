import { ListImagesCommandInput, ListImagesCommandOutput } from "../commands/ListImagesCommand";
import { ECRPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListImages(config: ECRPaginationConfiguration, input: ListImagesCommandInput, ...additionalArguments: any): Paginator<ListImagesCommandOutput>;
