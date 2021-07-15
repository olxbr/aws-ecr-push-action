import {
    ECRClient,
    DescribeRepositoriesCommand,
    CreateRepositoryCommand,
    GetAuthorizationTokenCommand,
    SetRepositoryPolicyCommand,
    Repository,
} from '@aws-sdk/client-ecr';

import { defaultProvider } from '@aws-sdk/credential-provider-node';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

const AWS_ACCOUNT_ID : string = process.env.AWS_ACCOUNT_ID || ""
const ECR_ENDPOINT = `${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com`

const credentialsProvider = (input: any) => defaultProvider({ ...input, timeout: 20000 })

const client = new ECRClient({
    region: "us-east-1",
    credentialDefaultProvider: credentialsProvider,
})

export function buildPolicy(accountId: string): string {
    if (accountId === "") {
        throw new Error('missing AWS_ACCOUNT_ID env var')
    }
    return JSON.stringify({
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPushPull",
            "Effect": "Allow",
            "Principal": {
                "AWS": `arn:aws:iam::${accountId}:root`
            },
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload"
            ]
        }
    ]});
}

const getAuthorizationToken = (params) => client.send(new GetAuthorizationTokenCommand(params))
const setRepositoryPolicy = (params) => client.send(new SetRepositoryPolicyCommand(params))
const describeRepo = (params) => client.send(new DescribeRepositoriesCommand(params))
const createRepo = (params) => client.send(new CreateRepositoryCommand(params))

interface AuthInfo {
    username: string
    password: string
    proxyEndpoint: string
}

async function parseAuthToken() : Promise<AuthInfo> {
    core.info('Getting ECR auth token...')
    const response = await getAuthorizationToken({ registryIds: [AWS_ACCOUNT_ID] })
    if (!response.authorizationData) {
        throw new Error(`unable to get authorization`)
    }
    const authData = response.authorizationData[0]
    if (authData.proxyEndpoint === undefined) {
        throw new Error(`missing ecr endpoint`)
    }
    if (authData.authorizationToken === undefined) {
        throw new Error(`missing ecr endpoint`)
    }

    const proxyEndpoint = authData.proxyEndpoint
    const decodedTokenData = Buffer.from(authData.authorizationToken, 'base64').toString()
    const authArray = decodedTokenData.split(':')
    return {
        username: authArray[0],
        password: authArray[1],
        proxyEndpoint: proxyEndpoint,
    }
}

export async function dockerLoginOnECR() {
    core.startGroup('Login on ECR...');
    const loginData = await parseAuthToken()
    const loginArgs = [
        'login',
        '--password-stdin',
        '--username',
        loginData.username,
        loginData.proxyEndpoint,
    ]
    await exec
        .getExecOutput('docker', loginArgs, {
            ignoreReturnCode: true,
            silent: true,
            input: Buffer.from(loginData.password)
        }).then(res => {
            if (res.stderr.length > 0 && res.exitCode != 0) {
                throw new Error(`failed to login: ${res.stderr.match(/(.*)\s*$/)![0].trim()}`);
            }
        });
    core.info('Login succeeded');
    core.endGroup();
}

export async function getRepositoryUri(repositoryName: string) : Promise<Repository> {
    try {
        const repo = await describeRepo({repositoryNames: [repositoryName]})
        if (repo.repositories === undefined) {
            throw new Error(`repositories is undefined`)
        }
        return repo.repositories[0]
    } catch(error) {
        if (error.name !== 'RepositoryNotFoundException') throw error
        const policy = buildPolicy(AWS_ACCOUNT_ID);

        core.info(`Creating repository ${repositoryName}...`)
        core.info(`Policy: ${policy}`)
        const repoData = await createRepo({ repositoryName })
        if (repoData.repository === undefined) {
            throw new Error(`unable to create repository: ${repositoryName}`)
        }

        await setRepositoryPolicy({
            repositoryName,
            policyText: policy,
        })

        return repoData.repository
    }
}