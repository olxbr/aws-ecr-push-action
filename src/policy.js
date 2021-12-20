const AWS_REGION = 'us-east-1';

// Expects a rule in the format arn:aws:iam::aws_account_id:root
const buildLambdaPolicy = (awsPrincipalRules) => awsPrincipalRules
  .map(id => `arn:aws:lambda:${AWS_REGION}:${id}:function:*`);

// Expects a rule in the format [12345678, ... , 87654321] 
const buildPrinciapalRulesPolicy = (awsPrincipalRules) => awsPrincipalRules
  .map(id => `arn:aws:iam::${id}:root`);

const buildPolicy = ({ awsPrincipalRules }) => {
  const strAWSPrincipalRules = JSON.parse(awsPrincipalRules)
  const principalRules = buildPrinciapalRulesPolicy(strAWSPrincipalRules);
  const lambdaPrincipalRules = buildLambdaPolicy(strAWSPrincipalRules);
  const principalSecRules = buildPrinciapalSecRulesPolicy(strAWSPrincipalRules);

  return JSON.stringify({
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPushPull",
            "Effect": "Allow",
            "Principal": {
                "AWS": principalRules 
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
        },
        {
            "Sid": "CrossAccountPermission",
            "Effect": "Allow",
            "Action": [
                "ecr:BatchGetImage",
                "ecr:GetDownloadUrlForLayer"
            ],
            "Principal": {
                "AWS": principalRules 
            } 
        },
        {
            "Sid": "LambdaECRImageCrossAccountRetrievalPolicy",
            "Effect": "Allow",
            "Action": [
                "ecr:BatchGetImage",
                "ecr:GetDownloadUrlForLayer"
            ],
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Condition": {
                "StringLike": {
                    "aws:sourceARN": lambdaPrincipalRules 
                } 
            }
        },
        {
            "Sid": "AllowSecImageScanning",
            "Effect": "Allow",
            "Principal": {
                "AWS": principalSecRules 
            },
            "Action": [
                "ecr:DescribeRepositories",
                "ecr:PutImageScanningConfiguration",
                "ecr:BatchGetRepositoryScanningConfiguration",
                "ecr:StartImageScan",
                "ecr:DescribeImageScanFindings",
                "ecr:PutRegistryScanningConfiguration",
                "ecr:GetRegistryScanningConfiguration"
            ]
        }
    ]
  })
}

exports.buildPolicy = buildPolicy

