[![Push-to-ECR Test](https://github.com/olxbr/action-tester/actions/workflows/push-to-ecr-test.yml/badge.svg)](https://github.com/olxbr/action-tester/actions/workflows/push-to-ecr-test.yml)

# AWS ECR Push Action

Action to push images to Amazon's Elastic Container Registry.

### Usage

Make sure to checkout the repo so the workflow can see your Dockerfile.

```yaml
on: [push]

jobs:
  ecr:
    runs-on: ubuntu-latest
    name: Docker build and push to ECR
    steps:

      - name: Checkout
        uses: actions/checkout@v2

      # Exemple of build using docker
      - name: Docker Build
        env:
            ## Repository must be in the format '<BU>/<SQUAD>/<PROJECT NAME | MY NAME>'
            ECR_REPOSITORY: 'cross/devtools/momo'
        run: |
            docker build --pull -t ${{ secrets.CONTAINER_REGISTRY_HOST }}/$ECR_REPOSITORY:latest .
            docker tag ${{ secrets.CONTAINER_REGISTRY_HOST }}/$ECR_REPOSITORY:latest ${{ secrets.CONTAINER_REGISTRY_HOST }}/$ECR_REPOSITORY:0.2.2
            docker tag ${{ secrets.CONTAINER_REGISTRY_HOST }}/$ECR_REPOSITORY:latest ${{ secrets.CONTAINER_REGISTRY_HOST }}/$ECR_REPOSITORY:beta

      - name: Push to ECR
        uses: olxbr/aws-ecr-push-action@v1
        id: ecr
        with:
          # The complete repository name from ECR {BU}/{TEAM}/{PROJECT} (ex. cross/devtools/devtools-scripts).
          ecr_repository: 'cross/devtools/momo'
          # Comma-separated string of ECR image tags (ex. latest, 1.0.0)
          tags: 'latest,0.2.2,beta'
        # Warning! Don't change this env values!
        # Just copy and paste this whole block as is in your repo
        env:
          AWS_ACCOUNT_ID: ${{ secrets.AWS_CROSS_ACCOUNT_ID }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_CROSS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_CROSS_SECRET_ACCESS_KEY }}
          AWS_PRINCIPAL_RULES: ${{ secrets.AWS_PRINCIPAL_RULES }}

```

> The image need to be at te format `CONTAINER_REGISTRY_HOST/ECR_REPOSITORY:TAG`
> For this, you can use the secret `CONTAINER_REGISTRY_HOST` to add this prefix.

## Running local

You can run the action on your local machine with `npm run start:local` after exporting the correct AWS credentials.

Alternatively, you can use `npm run stat:dry` to start a dry run that will not push anything to AWS.

## The security analysis image

We have a custom Trivy image to run the security analysis, that is built at [devsecops-tools](https://github.com/olxbr/devsecops-tools/blob/15a2be9f8e6c874c724cf0f510b31a327dfecaf9/.github/workflows/push-latest-clamav-trivy-images.yml)
