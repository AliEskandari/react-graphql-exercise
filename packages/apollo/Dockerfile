# Stage 1: Build Stage
FROM node:20 AS build

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
COPY .npmrc ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile TypeScript
RUN npm run build

# Stage 2: Production Stage
FROM node:20-slim

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./
COPY .npmrc ./

# Install only production dependencies
RUN npm install --only=production

EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]