import * as exec from '@actions/exec';
import * as ecr from '../src/ecr';

describe('buildPolicy', () => {
    it('can build a new policy', () => {
        const policy = ecr.buildPolicy('1234')
        expect(policy).toEqual('{\"Version\":\"2008-10-17\",\"Statement\":[{\"Sid\":\"AllowPushPull\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"arn:aws:iam::1234:root\"},\"Action\":[\"ecr:GetDownloadUrlForLayer\",\"ecr:BatchGetImage\",\"ecr:BatchCheckLayerAvailability\",\"ecr:PutImage\",\"ecr:InitiateLayerUpload\",\"ecr:UploadLayerPart\",\"ecr:CompleteLayerUpload\"]}]}')
    })
    it('can throw when missing accountId', () => {
        expect(() => {ecr.buildPolicy('')}).toThrowError(`missing AWS_ACCOUNT_ID env var`)
    })
})