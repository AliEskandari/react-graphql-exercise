# swayrepo

sway using for projects

### Login to GCP

```sh
gcloud auth login
```

Login with application default

```sh
gcloud auth application-default login
```

### Run Apollo Server

```sh
cd ./packages/apollo
npm run dev
```

### Run Codegen

(Note: Only needed if making writeing grqphql docs in frontend or backend)

```sh
npm run generate:watch
```

### Run Nextjs

```sh
cd ./packages/nextjs
npm run dev
```

## Deploying

### 1. Building the images locally

Run build script:

```sh
./build.sh
```

### 2. Push image to the registry

Connect Docker to Google Artifact Registry

```sh
gcloud auth configure-docker \
    us-docker.pkg.dev
```

Push the image to the google artifact registry

```sh
./bin/push.sh
```

### 3. Apply Deployment to cluster (or restart deployment)

Apply new deployment:

```sh
kubectl apply -f ./charts/apollo/templates/deployment.yaml
```

Or restart deployment:

```sh
kubectl rollout restart deployment/apollo
```
