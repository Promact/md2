#!/bin/bash

# Script that runs after the testing stage of Travis passed.
# Build artifacts and demo content will be published to different repositories.

# Go to the project root directory
cd $(dirname $0)/../..

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]] || [[ "$TRAVIS_BRANCH" != "master" ]]; then
  echo "Build artifacts and demo content will only be deployed in Travis push builds and branch is master."
  exit 0;
fi

echo "Starting to publish the build artifacts and demo content..."
# Run publishing.
bash ./scripts/deploy/publish-build-artifacts.sh

# Deploy the demo.
bash ./scripts/deploy/deploy-demo.sh

wait
