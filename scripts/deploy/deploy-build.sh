#!/bin/bash

# Script to publish the build artifacts to a GitHub repository.
# Builds will be automatically published once new changes are made to the repository.

set -e -o pipefail

# Go to the project root directory
cd $(dirname ${0})/../..

echo "Start build deploy."

buildDir="dist/md2"
buildVersion=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)
commitSha=$(git rev-parse --short HEAD)
commitAuthorName=$(git --no-pager show -s --format='%an' HEAD)
commitAuthorEmail=$(git --no-pager show -s --format='%ae' HEAD)
commitMessage=$(git log --oneline -n 1)

repoName="build"
repoUrl="https://Promact:$GH_TOKEN@github.com/Promact/md2.git"
repoDir="tmp/${repoName}"

# Create a release of the current repository.
$(npm bin)/gulp build:release

# Prepare cloning the builds repository
rm -rf ${repoDir}
mkdir -p ${repoDir}

# Clone the repository
git clone ${repoUrl} ${repoDir} --depth 1 --branch=build

# Copy the build files to the repository
rm -rf ${repoDir}/*
cp -r ${buildDir}/* ${repoDir}

# Create the build commit and push the changes to the repository.
cd ${repoDir}

# Prepare Git for pushing the artifacts to the repository.
git config user.name "${commitAuthorName}"
git config user.email "${commitAuthorEmail}"

git add -A
git commit -m "${commitMessage}"
git tag "${buildVersion}-${commitSha}"
git push origin master --tags

echo "Published build on Md2 build."
