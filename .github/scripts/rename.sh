#!/usr/bin/env bash

set -euo pipefail

# Define the input vars
GITHUB_REPOSITORY=${1?Error: Please pass username/repo, e.g. hywax/phaser-game-template}
GITHUB_REPOSITORY_OWNER=${2?Error: Please pass username, e.g. hywax}
GITHUB_REPOSITORY_DESCRIPTION=${3:-""} # If null then replace with empty string

echo "GITHUB_REPOSITORY: $GITHUB_REPOSITORY"
echo "GITHUB_REPOSITORY_OWNER: $GITHUB_REPOSITORY_OWNER"
echo "GITHUB_REPOSITORY_DESCRIPTION: $GITHUB_REPOSITORY_DESCRIPTION"

# jq is like sed for JSON data
JQ_OUTPUT=`jq \
  --arg NAME "@$GITHUB_REPOSITORY" \
  --arg AUTHOR_NAME "$GITHUB_REPOSITORY_OWNER" \
  --arg URL "https://github.com/$GITHUB_REPOSITORY_OWNER" \
  --arg DESCRIPTION "$GITHUB_REPOSITORY_DESCRIPTION" \
  '.name = $NAME | .description = $DESCRIPTION | .author |= ( .name = $AUTHOR_NAME | .url = $URL )' \
  package.json
`

# Overwrite package.json
echo "$JQ_OUTPUT" > package.json

sedi () {
  sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

# Rename instances of "hywax/phaser-game-template" to the new repo name in README.md for badges only
sedi "/gitpod/ s|hywax/phaser-game-template|"${GITHUB_REPOSITORY}"|;" "README.md"
sedi "/gitpod-badge/ s|hywax/phaser-game-template|"${GITHUB_REPOSITORY}"|;" "README.md"
sedi "/gha/ s|hywax/phaser-game-template|"${GITHUB_REPOSITORY}"|;" "README.md"
sedi "/gha-badge/ s|hywax/phaser-game-template|"${GITHUB_REPOSITORY}"|;" "README.md"
