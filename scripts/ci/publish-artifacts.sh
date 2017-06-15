#!/bin/bash

# Script that runs after the testing stage of Travis passed.
# Build artifacts and docs content will be published to different repositories.

# Go to the project root directory
cd $(dirname $0)/../..

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  echo "Build artifacts and docs content will only be deployed in Travis push builds."
  exit 0;
fi

echo "Starting to publish the build artifacts and docs content..."

# Build Md2 before publishing
$(npm bin)/gulp build:release

# Run publishing.
./scripts/deploy/publish-build-artifacts.sh --no-build &

# Deploy the demo.
./scripts/deploy/deploy-demo.sh &

wait
