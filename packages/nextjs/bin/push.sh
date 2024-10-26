export PROJECT_ID=engagement-management-dev
export REPO_NAME=us.gcr.io
export IMAGE_NAME=nextjs

docker tag $IMAGE_NAME:latest us-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:latest

docker push us-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:latest
