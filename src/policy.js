const AWS_REGION = "us-east-1";

// Expects a rule in the format [XXXXXXXXXX, ... , ZZZZZZZZZZ]
const buildPrincipalRulesPolicy = (awsPrincipalRules) =>
  awsPrincipalRules.map((id) => `o-${id}`);

const buildPolicy = ({ awsPrincipalRules }) => {
  const strAWSPrincipalRules = JSON.parse(awsPrincipalRules);
  const principalRules = buildPrincipalRulesPolicy(strAWSPrincipalRules);

  return JSON.stringify({
    Version: "2008-10-17",
    Statement: [
      {
        Sid: "AllowPull",
        Effect: "Allow",
        Principal: "*",
        Action: [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:DescribeImages",
          "ecr:DescribeRepositories",
          "ecr:GetDownloadUrlForLayer",
        ],
        Condition: {
          StringLike: {
            "aws:PrincipalOrgID": principalRules,
          },
        },
      },
      {
        Sid: "AllowSecImageScanning",
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::025517087168:role/github-enable-ecr-scan-on-push-security-role",
        },
        Action: [
          "ecr:BatchGetRepositoryScanningConfiguration",
          "ecr:DescribeImageScanFindings",
          "ecr:DescribeRepositories",
          "ecr:GetRegistryScanningConfiguration",
          "ecr:PutImageScanningConfiguration",
          "ecr:PutRegistryScanningConfiguration",
          "ecr:StartImageScan",
        ],
      },
      {
        Sid: "LambdaCrossAccount",
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
        Action: ["ecr:BatchGetImage", "ecr:GetDownloadUrlForLayer"],
        Condition: {
          StringLike: {
            "aws:sourceARN": [
              "arn:aws:lambda:us-east-1:025517087168:function:*",
              "arn:aws:lambda:us-east-1:073521391622:function:*",
              "arn:aws:lambda:us-east-1:183337677225:function:*",
              "arn:aws:lambda:us-east-1:375164415270:function:*",
              "arn:aws:lambda:us-east-1:444914307613:function:*",
              "arn:aws:lambda:us-east-1:312705011799:function:*",
            ],
          },
        },
      },
    ],
  });
};

exports.buildPolicy = buildPolicy;
