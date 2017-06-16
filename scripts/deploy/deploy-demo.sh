#!/bin/bash

# Script to publish the demo artifacts to a GitHub repository.

set -e -o pipefail

# Go to the project root directory
cd $(dirname ${0})/../..

buildDir="deploy"
buildVersion=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)
commitSha=$(git rev-parse --short HEAD)
commitAuthorName=$(git --no-pager show -s --format='%an' HEAD)
commitAuthorEmail=$(git --no-pager show -s --format='%ae' HEAD)
commitMessage=$(git log --oneline -n 1)

repoName="md2"
repoUrl="https://Promact:$GH_TOKEN@github.com/Promact/md2.git"
repoDir="tmp/${repoName}/${buildDir}"

# Create a release of the current repository.
$(npm bin)/gulp rollup:prepare
$(npm bin)/rollup -c ./dist/rollup-config.js
$(npm bin)/gulp deploy

# Prepare cloning the builds repository
rm -rf ${repoDir}
mkdir -p ${repoDir}

# Clone the repository
git clone ${repoUrl} ${repoDir} --depth 1 --branch=gh-pages

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
git push origin master --tags

echo "Published demo on Md2 gh-pages."
