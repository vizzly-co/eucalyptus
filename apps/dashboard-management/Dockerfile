FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the project files into the Docker image
COPY . .

RUN yarn build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html


# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]