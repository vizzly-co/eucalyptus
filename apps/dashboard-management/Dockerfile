FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/dist/dashboard-management/browser /usr/share/nginx/html

EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]
