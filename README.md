# AWS ECR Push Action
Action to push images to Amazon's Elastic Container Registry.

### Usage

You have to set up the target `AWS_ACCOUNT_ID` as an environment variable!


```yaml
on: [push]

jobs:
  ecr:
    runs-on: ubuntu-latest
    name: My app 
    steps:
      - name: Docker build and push to ECR
        uses: olxbr/aws-ecr-push-action@v0.3
        id: ecr
        with:
          # The complete repository name from ECR {BU}/{TEAM}/{PROJECT} (ex. cross/devtools/devtools-scripts).
          ecr_repository: 'cross/devtools/momo'
          # Comma-separated string of ECR image tags (ex. latest, 1.0.0)
          tags: 'latest,0.2.2,beta'
```

k
