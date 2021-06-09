import { ECRClient } from "./ECRClient";
import { BatchCheckLayerAvailabilityCommandInput, BatchCheckLayerAvailabilityCommandOutput } from "./commands/BatchCheckLayerAvailabilityCommand";
import { BatchDeleteImageCommandInput, BatchDeleteImageCommandOutput } from "./commands/BatchDeleteImageCommand";
import { BatchGetImageCommandInput, BatchGetImageCommandOutput } from "./commands/BatchGetImageCommand";
import { CompleteLayerUploadCommandInput, CompleteLayerUploadCommandOutput } from "./commands/CompleteLayerUploadCommand";
import { CreateRepositoryCommandInput, CreateRepositoryCommandOutput } from "./commands/CreateRepositoryCommand";
import { DeleteLifecyclePolicyCommandInput, DeleteLifecyclePolicyCommandOutput } from "./commands/DeleteLifecyclePolicyCommand";
import { DeleteRegistryPolicyCommandInput, DeleteRegistryPolicyCommandOutput } from "./commands/DeleteRegistryPolicyCommand";
import { DeleteRepositoryCommandInput, DeleteRepositoryCommandOutput } from "./commands/DeleteRepositoryCommand";
import { DeleteRepositoryPolicyCommandInput, DeleteRepositoryPolicyCommandOutput } from "./commands/DeleteRepositoryPolicyCommand";
import { DescribeImageScanFindingsCommandInput, DescribeImageScanFindingsCommandOutput } from "./commands/DescribeImageScanFindingsCommand";
import { DescribeImagesCommandInput, DescribeImagesCommandOutput } from "./commands/DescribeImagesCommand";
import { DescribeRegistryCommandInput, DescribeRegistryCommandOutput } from "./commands/DescribeRegistryCommand";
import { DescribeRepositoriesCommandInput, DescribeRepositoriesCommandOutput } from "./commands/DescribeRepositoriesCommand";
import { GetAuthorizationTokenCommandInput, GetAuthorizationTokenCommandOutput } from "./commands/GetAuthorizationTokenCommand";
import { GetDownloadUrlForLayerCommandInput, GetDownloadUrlForLayerCommandOutput } from "./commands/GetDownloadUrlForLayerCommand";
import { GetLifecyclePolicyCommandInput, GetLifecyclePolicyCommandOutput } from "./commands/GetLifecyclePolicyCommand";
import { GetLifecyclePolicyPreviewCommandInput, GetLifecyclePolicyPreviewCommandOutput } from "./commands/GetLifecyclePolicyPreviewCommand";
import { GetRegistryPolicyCommandInput, GetRegistryPolicyCommandOutput } from "./commands/GetRegistryPolicyCommand";
import { GetRepositoryPolicyCommandInput, GetRepositoryPolicyCommandOutput } from "./commands/GetRepositoryPolicyCommand";
import { InitiateLayerUploadCommandInput, InitiateLayerUploadCommandOutput } from "./commands/InitiateLayerUploadCommand";
import { ListImagesCommandInput, ListImagesCommandOutput } from "./commands/ListImagesCommand";
import { ListTagsForResourceCommandInput, ListTagsForResourceCommandOutput } from "./commands/ListTagsForResourceCommand";
import { PutImageCommandInput, PutImageCommandOutput } from "./commands/PutImageCommand";
import { PutImageScanningConfigurationCommandInput, PutImageScanningConfigurationCommandOutput } from "./commands/PutImageScanningConfigurationCommand";
import { PutImageTagMutabilityCommandInput, PutImageTagMutabilityCommandOutput } from "./commands/PutImageTagMutabilityCommand";
import { PutLifecyclePolicyCommandInput, PutLifecyclePolicyCommandOutput } from "./commands/PutLifecyclePolicyCommand";
import { PutRegistryPolicyCommandInput, PutRegistryPolicyCommandOutput } from "./commands/PutRegistryPolicyCommand";
import { PutReplicationConfigurationCommandInput, PutReplicationConfigurationCommandOutput } from "./commands/PutReplicationConfigurationCommand";
import { SetRepositoryPolicyCommandInput, SetRepositoryPolicyCommandOutput } from "./commands/SetRepositoryPolicyCommand";
import { StartImageScanCommandInput, StartImageScanCommandOutput } from "./commands/StartImageScanCommand";
import { StartLifecyclePolicyPreviewCommandInput, StartLifecyclePolicyPreviewCommandOutput } from "./commands/StartLifecyclePolicyPreviewCommand";
import { TagResourceCommandInput, TagResourceCommandOutput } from "./commands/TagResourceCommand";
import { UntagResourceCommandInput, UntagResourceCommandOutput } from "./commands/UntagResourceCommand";
import { UploadLayerPartCommandInput, UploadLayerPartCommandOutput } from "./commands/UploadLayerPartCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
/**
 * <fullname>Amazon Elastic Container Registry</fullname>
 *         <p>Amazon Elastic Container Registry (Amazon ECR) is a managed container image registry service. Customers can use the
 *             familiar Docker CLI, or their preferred client, to push, pull, and manage images. Amazon ECR
 *             provides a secure, scalable, and reliable registry for your Docker or Open Container
 *             Initiative (OCI) images. Amazon ECR supports private repositories with resource-based
 *             permissions using IAM so that specific users or Amazon EC2 instances can access
 *             repositories and images.</p>
 */
export declare class ECR extends ECRClient {
    /**
     * <p>Checks the availability of one or more image layers in a repository.</p>
     *         <p>When an image is pushed to a repository, each image layer is checked to verify if it
     *             has been uploaded before. If it has been uploaded, then the image layer is
     *             skipped.</p>
     *          <note>
     *             <p>This operation is used by the Amazon ECR proxy and is not generally used by
     *         customers for pulling and pushing images. In most cases, you should use the <code>docker</code> CLI to pull, tag, and push images.</p>
     *          </note>
     */
    batchCheckLayerAvailability(args: BatchCheckLayerAvailabilityCommandInput, options?: __HttpHandlerOptions): Promise<BatchCheckLayerAvailabilityCommandOutput>;
    batchCheckLayerAvailability(args: BatchCheckLayerAvailabilityCommandInput, cb: (err: any, data?: BatchCheckLayerAvailabilityCommandOutput) => void): void;
    batchCheckLayerAvailability(args: BatchCheckLayerAvailabilityCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BatchCheckLayerAvailabilityCommandOutput) => void): void;
    /**
     * <p>Deletes a list of specified images within a repository. Images are specified with
     *             either an <code>imageTag</code> or <code>imageDigest</code>.</p>
     *         <p>You can remove a tag from an image by specifying the image's tag in your request. When
     *             you remove the last tag from an image, the image is deleted from your repository.</p>
     *         <p>You can completely delete an image (and all of its tags) by specifying the image's
     *             digest in your request.</p>
     */
    batchDeleteImage(args: BatchDeleteImageCommandInput, options?: __HttpHandlerOptions): Promise<BatchDeleteImageCommandOutput>;
    batchDeleteImage(args: BatchDeleteImageCommandInput, cb: (err: any, data?: BatchDeleteImageCommandOutput) => void): void;
    batchDeleteImage(args: BatchDeleteImageCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BatchDeleteImageCommandOutput) => void): void;
    /**
     * <p>Gets detailed information for an image. Images are specified with either an
     *                 <code>imageTag</code> or <code>imageDigest</code>.</p>
     *         <p>When an image is pulled, the BatchGetImage API is called once to retrieve the image
     *             manifest.</p>
     */
    batchGetImage(args: BatchGetImageCommandInput, options?: __HttpHandlerOptions): Promise<BatchGetImageCommandOutput>;
    batchGetImage(args: BatchGetImageCommandInput, cb: (err: any, data?: BatchGetImageCommandOutput) => void): void;
    batchGetImage(args: BatchGetImageCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BatchGetImageCommandOutput) => void): void;
    /**
     * <p>Informs Amazon ECR that the image layer upload has completed for a specified registry,
     *             repository name, and upload ID. You can optionally provide a <code>sha256</code> digest
     *             of the image layer for data validation purposes.</p>
     *         <p>When an image is pushed, the CompleteLayerUpload API is called once per each new image
     *             layer to verify that the upload has completed.</p>
     *          <note>
     *             <p>This operation is used by the Amazon ECR proxy and is not generally used by
     *         customers for pulling and pushing images. In most cases, you should use the <code>docker</code> CLI to pull, tag, and push images.</p>
     *          </note>
     */
    completeLayerUpload(args: CompleteLayerUploadCommandInput, options?: __HttpHandlerOptions): Promise<CompleteLayerUploadCommandOutput>;
    completeLayerUpload(args: CompleteLayerUploadCommandInput, cb: (err: any, data?: CompleteLayerUploadCommandOutput) => void): void;
    completeLayerUpload(args: CompleteLayerUploadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CompleteLayerUploadCommandOutput) => void): void;
    /**
     * <p>Creates a repository. For more information, see <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html">Amazon ECR Repositories</a> in the
     *                 <i>Amazon Elastic Container Registry User Guide</i>.</p>
     */
    createRepository(args: CreateRepositoryCommandInput, options?: __HttpHandlerOptions): Promise<CreateRepositoryCommandOutput>;
    createRepository(args: CreateRepositoryCommandInput, cb: (err: any, data?: CreateRepositoryCommandOutput) => void): void;
    createRepository(args: CreateRepositoryCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateRepositoryCommandOutput) => void): void;
    /**
     * <p>Deletes the lifecycle policy associated with the specified repository.</p>
     */
    deleteLifecyclePolicy(args: DeleteLifecyclePolicyCommandInput, options?: __HttpHandlerOptions): Promise<DeleteLifecyclePolicyCommandOutput>;
    deleteLifecyclePolicy(args: DeleteLifecyclePolicyCommandInput, cb: (err: any, data?: DeleteLifecyclePolicyCommandOutput) => void): void;
    deleteLifecyclePolicy(args: DeleteLifecyclePolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteLifecyclePolicyCommandOutput) => void): void;
    /**
     * <p>Deletes the registry permissions policy.</p>
     */
    deleteRegistryPolicy(args: DeleteRegistryPolicyCommandInput, options?: __HttpHandlerOptions): Promise<DeleteRegistryPolicyCommandOutput>;
    deleteRegistryPolicy(args: DeleteRegistryPolicyCommandInput, cb: (err: any, data?: DeleteRegistryPolicyCommandOutput) => void): void;
    deleteRegistryPolicy(args: DeleteRegistryPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteRegistryPolicyCommandOutput) => void): void;
    /**
     * <p>Deletes a repository. If the repository contains images, you must either delete all
     *             images in the repository or use the <code>force</code> option to delete the
     *             repository.</p>
     */
    deleteRepository(args: DeleteRepositoryCommandInput, options?: __HttpHandlerOptions): Promise<DeleteRepositoryCommandOutput>;
    deleteRepository(args: DeleteRepositoryCommandInput, cb: (err: any, data?: DeleteRepositoryCommandOutput) => void): void;
    deleteRepository(args: DeleteRepositoryCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteRepositoryCommandOutput) => void): void;
    /**
     * <p>Deletes the repository policy associated with the specified repository.</p>
     */
    deleteRepositoryPolicy(args: DeleteRepositoryPolicyCommandInput, options?: __HttpHandlerOptions): Promise<DeleteRepositoryPolicyCommandOutput>;
    deleteRepositoryPolicy(args: DeleteRepositoryPolicyCommandInput, cb: (err: any, data?: DeleteRepositoryPolicyCommandOutput) => void): void;
    deleteRepositoryPolicy(args: DeleteRepositoryPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteRepositoryPolicyCommandOutput) => void): void;
    /**
     * <p>Returns metadata about the images in a repository.</p>
     *         <note>
     *             <p>Beginning with Docker version 1.9, the Docker client compresses image layers
     *                 before pushing them to a V2 Docker registry. The output of the <code>docker
     *                     images</code> command shows the uncompressed image size, so it may return a
     *                 larger image size than the image sizes returned by <a>DescribeImages</a>.</p>
     *         </note>
     */
    describeImages(args: DescribeImagesCommandInput, options?: __HttpHandlerOptions): Promise<DescribeImagesCommandOutput>;
    describeImages(args: DescribeImagesCommandInput, cb: (err: any, data?: DescribeImagesCommandOutput) => void): void;
    describeImages(args: DescribeImagesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeImagesCommandOutput) => void): void;
    /**
     * <p>Returns the scan findings for the specified image.</p>
     */
    describeImageScanFindings(args: DescribeImageScanFindingsCommandInput, options?: __HttpHandlerOptions): Promise<DescribeImageScanFindingsCommandOutput>;
    describeImageScanFindings(args: DescribeImageScanFindingsCommandInput, cb: (err: any, data?: DescribeImageScanFindingsCommandOutput) => void): void;
    describeImageScanFindings(args: DescribeImageScanFindingsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeImageScanFindingsCommandOutput) => void): void;
    /**
     * <p>Describes the settings for a registry. The replication configuration for a repository
     *             can be created or updated with the <a>PutReplicationConfiguration</a> API
     *             action.</p>
     */
    describeRegistry(args: DescribeRegistryCommandInput, options?: __HttpHandlerOptions): Promise<DescribeRegistryCommandOutput>;
    describeRegistry(args: DescribeRegistryCommandInput, cb: (err: any, data?: DescribeRegistryCommandOutput) => void): void;
    describeRegistry(args: DescribeRegistryCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeRegistryCommandOutput) => void): void;
    /**
     * <p>Describes image repositories in a registry.</p>
     */
    describeRepositories(args: DescribeRepositoriesCommandInput, options?: __HttpHandlerOptions): Promise<DescribeRepositoriesCommandOutput>;
    describeRepositories(args: DescribeRepositoriesCommandInput, cb: (err: any, data?: DescribeRepositoriesCommandOutput) => void): void;
    describeRepositories(args: DescribeRepositoriesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeRepositoriesCommandOutput) => void): void;
    /**
     * <p>Retrieves an authorization token. An authorization token represents your IAM
     *             authentication credentials and can be used to access any Amazon ECR registry that your IAM
     *             principal has access to. The authorization token is valid for 12 hours.</p>
     *         <p>The <code>authorizationToken</code> returned is a base64 encoded string that can be
     *             decoded and used in a <code>docker login</code> command to authenticate to a registry.
     *             The AWS CLI offers an <code>get-login-password</code> command that simplifies the login
     *             process. For more information, see <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html#registry_auth">Registry
     *                 Authentication</a> in the <i>Amazon Elastic Container Registry User Guide</i>.</p>
     */
    getAuthorizationToken(args: GetAuthorizationTokenCommandInput, options?: __HttpHandlerOptions): Promise<GetAuthorizationTokenCommandOutput>;
    getAuthorizationToken(args: GetAuthorizationTokenCommandInput, cb: (err: any, data?: GetAuthorizationTokenCommandOutput) => void): void;
    getAuthorizationToken(args: GetAuthorizationTokenCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetAuthorizationTokenCommandOutput) => void): void;
    /**
     * <p>Retrieves the pre-signed Amazon S3 download URL corresponding to an image layer. You
     *             can only get URLs for image layers that are referenced in an image.</p>
     *         <p>When an image is pulled, the GetDownloadUrlForLayer API is called once per image layer
     *             that is not already cached.</p>
     *          <note>
     *             <p>This operation is used by the Amazon ECR proxy and is not generally used by
     *         customers for pulling and pushing images. In most cases, you should use the <code>docker</code> CLI to pull, tag, and push images.</p>
     *          </note>
     */
    getDownloadUrlForLayer(args: GetDownloadUrlForLayerCommandInput, options?: __HttpHandlerOptions): Promise<GetDownloadUrlForLayerCommandOutput>;
    getDownloadUrlForLayer(args: GetDownloadUrlForLayerCommandInput, cb: (err: any, data?: GetDownloadUrlForLayerCommandOutput) => void): void;
    getDownloadUrlForLayer(args: GetDownloadUrlForLayerCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetDownloadUrlForLayerCommandOutput) => void): void;
    /**
     * <p>Retrieves the lifecycle policy for the specified repository.</p>
     */
    getLifecyclePolicy(args: GetLifecyclePolicyCommandInput, options?: __HttpHandlerOptions): Promise<GetLifecyclePolicyCommandOutput>;
    getLifecyclePolicy(args: GetLifecyclePolicyCommandInput, cb: (err: any, data?: GetLifecyclePolicyCommandOutput) => void): void;
    getLifecyclePolicy(args: GetLifecyclePolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetLifecyclePolicyCommandOutput) => void): void;
    /**
     * <p>Retrieves the results of the lifecycle policy preview request for the specified
     *             repository.</p>
     */
    getLifecyclePolicyPreview(args: GetLifecyclePolicyPreviewCommandInput, options?: __HttpHandlerOptions): Promise<GetLifecyclePolicyPreviewCommandOutput>;
    getLifecyclePolicyPreview(args: GetLifecyclePolicyPreviewCommandInput, cb: (err: any, data?: GetLifecyclePolicyPreviewCommandOutput) => void): void;
    getLifecyclePolicyPreview(args: GetLifecyclePolicyPreviewCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetLifecyclePolicyPreviewCommandOutput) => void): void;
    /**
     * <p>Retrieves the permissions policy for a registry.</p>
     */
    getRegistryPolicy(args: GetRegistryPolicyCommandInput, options?: __HttpHandlerOptions): Promise<GetRegistryPolicyCommandOutput>;
    getRegistryPolicy(args: GetRegistryPolicyCommandInput, cb: (err: any, data?: GetRegistryPolicyCommandOutput) => void): void;
    getRegistryPolicy(args: GetRegistryPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetRegistryPolicyCommandOutput) => void): void;
    /**
     * <p>Retrieves the repository policy for the specified repository.</p>
     */
    getRepositoryPolicy(args: GetRepositoryPolicyCommandInput, options?: __HttpHandlerOptions): Promise<GetRepositoryPolicyCommandOutput>;
    getRepositoryPolicy(args: GetRepositoryPolicyCommandInput, cb: (err: any, data?: GetRepositoryPolicyCommandOutput) => void): void;
    getRepositoryPolicy(args: GetRepositoryPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetRepositoryPolicyCommandOutput) => void): void;
    /**
     * <p>Notifies Amazon ECR that you intend to upload an image layer.</p>
     *         <p>When an image is pushed, the InitiateLayerUpload API is called once per image layer
     *             that has not already been uploaded. Whether or not an image layer has been uploaded is
     *             determined by the BatchCheckLayerAvailability API action.</p>
     *          <note>
     *             <p>This operation is used by the Amazon ECR proxy and is not generally used by
     *         customers for pulling and pushing images. In most cases, you should use the <code>docker</code> CLI to pull, tag, and push images.</p>
     *          </note>
     */
    initiateLayerUpload(args: InitiateLayerUploadCommandInput, options?: __HttpHandlerOptions): Promise<InitiateLayerUploadCommandOutput>;
    initiateLayerUpload(args: InitiateLayerUploadCommandInput, cb: (err: any, data?: InitiateLayerUploadCommandOutput) => void): void;
    initiateLayerUpload(args: InitiateLayerUploadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: InitiateLayerUploadCommandOutput) => void): void;
    /**
     * <p>Lists all the image IDs for the specified repository.</p>
     *         <p>You can filter images based on whether or not they are tagged by using the
     *                 <code>tagStatus</code> filter and specifying either <code>TAGGED</code>,
     *                 <code>UNTAGGED</code> or <code>ANY</code>. For example, you can filter your results
     *             to return only <code>UNTAGGED</code> images and then pipe that result to a <a>BatchDeleteImage</a> operation to delete them. Or, you can filter your
     *             results to return only <code>TAGGED</code> images to list all of the tags in your
     *             repository.</p>
     */
    listImages(args: ListImagesCommandInput, options?: __HttpHandlerOptions): Promise<ListImagesCommandOutput>;
    listImages(args: ListImagesCommandInput, cb: (err: any, data?: ListImagesCommandOutput) => void): void;
    listImages(args: ListImagesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListImagesCommandOutput) => void): void;
    /**
     * <p>List the tags for an Amazon ECR resource.</p>
     */
    listTagsForResource(args: ListTagsForResourceCommandInput, options?: __HttpHandlerOptions): Promise<ListTagsForResourceCommandOutput>;
    listTagsForResource(args: ListTagsForResourceCommandInput, cb: (err: any, data?: ListTagsForResourceCommandOutput) => void): void;
    listTagsForResource(args: ListTagsForResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTagsForResourceCommandOutput) => void): void;
    /**
     * <p>Creates or updates the image manifest and tags associated with an image.</p>
     *         <p>When an image is pushed and all new image layers have been uploaded, the PutImage API
     *             is called once to create or update the image manifest and the tags associated with the
     *             image.</p>
     *
     *         <note>
     *             <p>This operation is used by the Amazon ECR proxy and is not generally used by
     *         customers for pulling and pushing images. In most cases, you should use the <code>docker</code> CLI to pull, tag, and push images.</p>
     *          </note>
     */
    putImage(args: PutImageCommandInput, options?: __HttpHandlerOptions): Promise<PutImageCommandOutput>;
    putImage(args: PutImageCommandInput, cb: (err: any, data?: PutImageCommandOutput) => void): void;
    putImage(args: PutImageCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutImageCommandOutput) => void): void;
    /**
     * <p>Updates the image scanning configuration for the specified repository.</p>
     */
    putImageScanningConfiguration(args: PutImageScanningConfigurationCommandInput, options?: __HttpHandlerOptions): Promise<PutImageScanningConfigurationCommandOutput>;
    putImageScanningConfiguration(args: PutImageScanningConfigurationCommandInput, cb: (err: any, data?: PutImageScanningConfigurationCommandOutput) => void): void;
    putImageScanningConfiguration(args: PutImageScanningConfigurationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutImageScanningConfigurationCommandOutput) => void): void;
    /**
     * <p>Updates the image tag mutability settings for the specified repository. For more
     *             information, see <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html">Image Tag
     *                 Mutability</a> in the <i>Amazon Elastic Container Registry User Guide</i>.</p>
     */
    putImageTagMutability(args: PutImageTagMutabilityCommandInput, options?: __HttpHandlerOptions): Promise<PutImageTagMutabilityCommandOutput>;
    putImageTagMutability(args: PutImageTagMutabilityCommandInput, cb: (err: any, data?: PutImageTagMutabilityCommandOutput) => void): void;
    putImageTagMutability(args: PutImageTagMutabilityCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutImageTagMutabilityCommandOutput) => void): void;
    /**
     * <p>Creates or updates the lifecycle policy for the specified repository. For more
     *             information, see <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html">Lifecycle Policy
     *                 Template</a>.</p>
     */
    putLifecyclePolicy(args: PutLifecyclePolicyCommandInput, options?: __HttpHandlerOptions): Promise<PutLifecyclePolicyCommandOutput>;
    putLifecyclePolicy(args: PutLifecyclePolicyCommandInput, cb: (err: any, data?: PutLifecyclePolicyCommandOutput) => void): void;
    putLifecyclePolicy(args: PutLifecyclePolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutLifecyclePolicyCommandOutput) => void): void;
    /**
     * <p>Creates or updates the permissions policy for your registry.</p>
     *         <p>A registry policy is used to specify permissions for another AWS account and is used
     *             when configuring cross-account replication. For more information, see <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/registry-permissions.html">Registry permissions</a> in the <i>Amazon Elastic Container Registry User Guide</i>.</p>
     */
    putRegistryPolicy(args: PutRegistryPolicyCommandInput, options?: __HttpHandlerOptions): Promise<PutRegistryPolicyCommandOutput>;
    putRegistryPolicy(args: PutRegistryPolicyCommandInput, cb: (err: any, data?: PutRegistryPolicyCommandOutput) => void): void;
    putRegistryPolicy(args: PutRegistryPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutRegistryPolicyCommandOutput) => void): void;
    /**
     * <p>Creates or updates the replication configuration for a registry. The existing
     *             replication configuration for a repository can be retrieved with the <a>DescribeRegistry</a> API action. The first time the
     *             PutReplicationConfiguration API is called, a service-linked IAM role is created in
     *             your account for the replication process. For more information, see <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/using-service-linked-roles.html">Using
     *                 Service-Linked Roles for Amazon ECR</a> in the
     *             <i>Amazon Elastic Container Registry User Guide</i>.</p>
     *         <note>
     *             <p>When configuring cross-account replication, the destination account must grant the
     *                 source account permission to replicate. This permission is controlled using a
     *                 registry permissions policy. For more information, see <a>PutRegistryPolicy</a>.</p>
     *         </note>
     */
    putReplicationConfiguration(args: PutReplicationConfigurationCommandInput, options?: __HttpHandlerOptions): Promise<PutReplicationConfigurationCommandOutput>;
    putReplicationConfiguration(args: PutReplicationConfigurationCommandInput, cb: (err: any, data?: PutReplicationConfigurationCommandOutput) => void): void;
    putReplicationConfiguration(args: PutReplicationConfigurationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutReplicationConfigurationCommandOutput) => void): void;
    /**
     * <p>Applies a repository policy to the specified repository to control access permissions.
     *             For more information, see <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policies.html">Amazon ECR Repository
     *                 Policies</a> in the <i>Amazon Elastic Container Registry User Guide</i>.</p>
     */
    setRepositoryPolicy(args: SetRepositoryPolicyCommandInput, options?: __HttpHandlerOptions): Promise<SetRepositoryPolicyCommandOutput>;
    setRepositoryPolicy(args: SetRepositoryPolicyCommandInput, cb: (err: any, data?: SetRepositoryPolicyCommandOutput) => void): void;
    setRepositoryPolicy(args: SetRepositoryPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SetRepositoryPolicyCommandOutput) => void): void;
    /**
     * <p>Starts an image vulnerability scan. An image scan can only be started once per day on
     *             an individual image. This limit includes if an image was scanned on initial push. For
     *             more information, see <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html">Image Scanning</a> in the
     *                 <i>Amazon Elastic Container Registry User Guide</i>.</p>
     */
    startImageScan(args: StartImageScanCommandInput, options?: __HttpHandlerOptions): Promise<StartImageScanCommandOutput>;
    startImageScan(args: StartImageScanCommandInput, cb: (err: any, data?: StartImageScanCommandOutput) => void): void;
    startImageScan(args: StartImageScanCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartImageScanCommandOutput) => void): void;
    /**
     * <p>Starts a preview of a lifecycle policy for the specified repository. This allows you
     *             to see the results before associating the lifecycle policy with the repository.</p>
     */
    startLifecyclePolicyPreview(args: StartLifecyclePolicyPreviewCommandInput, options?: __HttpHandlerOptions): Promise<StartLifecyclePolicyPreviewCommandOutput>;
    startLifecyclePolicyPreview(args: StartLifecyclePolicyPreviewCommandInput, cb: (err: any, data?: StartLifecyclePolicyPreviewCommandOutput) => void): void;
    startLifecyclePolicyPreview(args: StartLifecyclePolicyPreviewCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartLifecyclePolicyPreviewCommandOutput) => void): void;
    /**
     * <p>Adds specified tags to a resource with the specified ARN. Existing tags on a resource
     *             are not changed if they are not specified in the request parameters.</p>
     */
    tagResource(args: TagResourceCommandInput, options?: __HttpHandlerOptions): Promise<TagResourceCommandOutput>;
    tagResource(args: TagResourceCommandInput, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
    tagResource(args: TagResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
    /**
     * <p>Deletes specified tags from a resource.</p>
     */
    untagResource(args: UntagResourceCommandInput, options?: __HttpHandlerOptions): Promise<UntagResourceCommandOutput>;
    untagResource(args: UntagResourceCommandInput, cb: (err: any, data?: UntagResourceCommandOutput) => void): void;
    untagResource(args: UntagResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UntagResourceCommandOutput) => void): void;
    /**
     * <p>Uploads an image layer part to Amazon ECR.</p>
     *         <p>When an image is pushed, each new image layer is uploaded in parts. The maximum size
     *             of each image layer part can be 20971520 bytes (or about 20MB). The UploadLayerPart API
     *             is called once per each new image layer part.</p>
     *          <note>
     *             <p>This operation is used by the Amazon ECR proxy and is not generally used by
     *         customers for pulling and pushing images. In most cases, you should use the <code>docker</code> CLI to pull, tag, and push images.</p>
     *          </note>
     */
    uploadLayerPart(args: UploadLayerPartCommandInput, options?: __HttpHandlerOptions): Promise<UploadLayerPartCommandOutput>;
    uploadLayerPart(args: UploadLayerPartCommandInput, cb: (err: any, data?: UploadLayerPartCommandOutput) => void): void;
    uploadLayerPart(args: UploadLayerPartCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UploadLayerPartCommandOutput) => void): void;
}
