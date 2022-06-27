const AWS_REGION = 'us-east-1';

// Expects a rule in the format [XXXXXXXXXX, ... , ZZZZZZZZZZ]
const buildPrincipalRulesPolicy = (awsPrincipalRules) => awsPrincipalRules
  .map(id => `o-${id}`);

const buildPolicy = ({ awsPrincipalRules }) => {
  const strAWSPrincipalRules = JSON.parse(awsPrincipalRules)
  const principalRules = buildPrincipalRulesPolicy(strAWSPrincipalRules);

  return JSON.stringify({
    "Version": "2008-10-17",
    "Statement": [
      {
        "Sid": "AllowPull",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:DescribeImages",
          "ecr:DescribeRepositories",
          "ecr:GetDownloadUrlForLayer"
        ],
        "Condition": {
          "StringLike": {
            "aws:ResourceOrgID": principalRules
          }
        }
      },
      {
        "Sid": "AllowSecImageScanning",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
            "ecr:BatchGetRepositoryScanningConfiguration",
            "ecr:DescribeImageScanFindings",
            "ecr:DescribeRepositories",
            "ecr:GetRegistryScanningConfiguration",
            "ecr:PutImageScanningConfiguration",
            "ecr:PutRegistryScanningConfiguration",
            "ecr:StartImageScan"
        ],
        "Condition": {
            "StringLike": {
              "aws:ResourceOrgID": principalRules
            }
          }
    }
    ]
  })
}

exports.buildPolicy = buildPolicy
