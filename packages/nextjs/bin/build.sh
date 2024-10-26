export IMAGE_NAME=nextjs

# Check if user logged in with gcloud auth application-default login
if [ -z "$(gcloud auth application-default print-access-token)" ]; then
  echo "Please login with gcloud auth application-default login"
  exit 1
fi

# Copy .npmrc file from root to current dir
cp ../../.npmrc .npmrc

# Add registry access token to .npmrc file
npm run registry:config

# Run docker build
docker build --platform linux/amd64 -t $IMAGE_NAME:latest .

# Remove .npmrc file
rm .npmrc