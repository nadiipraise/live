#!/bin/bash

# Create models directory if it doesn't exist
mkdir -p public/models

# Base URL for the model files
BASE_URL="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights"

# List of model files to download
FILES=(
  "tiny_face_detector_model-weights_manifest.json"
  "tiny_face_detector_model-shard1"
  "face_landmark_68_model-weights_manifest.json"
  "face_landmark_68_model-shard1"
  "face_expression_model-weights_manifest.json"
  "face_expression_model-shard1"
)

# Download each file
for file in "${FILES[@]}"
do
  echo "Downloading $file..."
  curl -L "$BASE_URL/$file" -o "public/models/$file"
done

echo "Model files downloaded successfully!"