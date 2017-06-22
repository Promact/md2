#!/bin/bash

# Script that runs after the testing stage of Travis passed.
# Build artifacts and demo content will be published to different repositories.

# Go to the project root directory
cd $(dirname $0)/../..

COMMIT_MESSAGE=$(git log --oneline --format=%B --no-merges -n 1)

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]] || [[ "$TRAVIS_BRANCH" != "master" ]] || [[ $COMMIT_MESSAGE != "publish-"* ]]; then
  echo "Build artifacts and demo content will only be deployed in Travis push builds and branch is master."
  exit 0;
fi

echo "Starting to deploy the build and demo content..."
# Run publishing.
bash ./scripts/deploy/deploy-build.sh

# Deploy the demo.
bash ./scripts/deploy/deploy-demo.sh

wait
