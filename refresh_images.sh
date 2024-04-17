#!/bin/bash

# Remove old images
docker system prune --force &

# Define the prefix of images to update and new tag (generally the commit sha of this repo)
PREFIX="ghcr.io/vizzly-co"
NEW_TAG="$1"

# Check if prefix and new tag are provided
if [ -z "$PREFIX" ] || [ -z "$NEW_TAG" ]; then
  echo "Usage: $0 <prefix> <new_tag>"
  exit 1
fi

# List Docker images and filter by prefix
IMAGES=$(docker images --format '{{.Repository}}' | grep "^$PREFIX")

# Loop through each image and update its tag
for IMAGE in $IMAGES; do
  docker pull "$IMAGE:$NEW_TAG" &
done