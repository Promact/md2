#!/bin/bash

set -e

echo ""
echo "Test Build and Deploy starts"
echo ""

# Go to project dir
cd $(dirname $0)/../..

# Get commit diff
if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  fileDiff=$(git diff --name-only $TRAVIS_COMMIT_RANGE)
else
  fileDiff=$(git diff --name-only $TRAVIS_BRANCH...HEAD)
fi

# Check if tests can be skipped
if [[ ${fileDiff} =~ ^(.*\.md\s*)*$ ]] && (is_e2e || is_unit); then
  echo "Skipping tests since only markdown files changed"
  exit 0
fi


echo "start lint"
$(npm bin)/gulp ci:lint
echo "start AOT"
$(npm bin)/gulp ci:aot
echo "start payload"
$(npm bin)/gulp ci:payload

bash ./scripts/ci/deploy.sh
