const AWS_REGION = 'us-east-1';

const buildLambdaPolicy = (awsPrincipalRules) => awsPrincipalRules
  .map(rule => rule.split(':')[4])
  .map(id => `arn:aws:lambda:${AWS_REGION}:${id}:function:*`);

const buildPolicy = ({ awsPrincipalRules }) => {
  const principalRules = JSON.parse(awsPrincipalRules);
  const lambdaPrincipalRules = buildLambdaPolicy(principalRules);

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
        }
    ]
  })
}

exports.buildPolicy = buildPolicy

