const buildPolicy = ({ awsPrincipalRules }) => JSON.stringify({
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPushPull",
            "Effect": "Allow",
            "Principal": {
                "AWS": JSON.parse(awsPrincipalRules)
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
            "Sid": "AllowSecImageScanning",
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::025517087168:root"
                ]
            },
            "Action": [
                "ecr:PutImageScanningConfiguration",
                "ecr:DescribeRepositories"
            ]
        }
    ]
})

exports.buildPolicy = buildPolicy
