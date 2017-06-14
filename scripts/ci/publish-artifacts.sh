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
echo ""

# Build Md2 before publishing
$(npm bin)/gulp build:release

# Run publishing of artifacts in parallel.
# This is possible because the output has been built before.

# Deploy the dashboard functions for each push build.

wait
