#!/usr/bin/env bash
# ATHAR — publish this build to GitHub.
#
# Run from inside this folder:  bash deploy.sh
#
# This force-pushes and rewrites the remote main branch. It refuses to do so
# until the current remote state is safely backed up to a `legacy-build`
# branch, so nothing that is live today can be lost.

set -euo pipefail

REMOTE_URL="https://github.com/AhmedYYYA/Athar.git"
BACKUP_BRANCH="legacy-build"

say() { printf '\n\033[1m%s\033[0m\n' "$*"; }

if [ ! -d .git ]; then
  echo "Run this from inside the athar folder (no .git here)." >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes. Commit or stash them first." >&2
  git status --short
  exit 1
fi

say "1/4  Pointing at $REMOTE_URL"
if git remote | grep -qx origin; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

say "2/4  Backing up what is currently live"
git fetch origin main

if git show-ref --quiet "refs/remotes/origin/$BACKUP_BRANCH"; then
  echo "A '$BACKUP_BRANCH' branch already exists on the remote — leaving it alone."
else
  git branch -f "$BACKUP_BRANCH" origin/main
  git push origin "$BACKUP_BRANCH"
  echo "Current main saved to origin/$BACKUP_BRANCH"
fi

say "3/4  Confirm"
echo "About to REPLACE origin/main with this build."
echo "The old work will remain available on origin/$BACKUP_BRANCH."
printf 'Type exactly: replace main\n> '
read -r answer
if [ "$answer" != "replace main" ]; then
  echo "Cancelled. Nothing was pushed."
  exit 0
fi

say "4/4  Pushing"
git push --force-with-lease origin main

say "Done."
cat <<'NOTES'
Next steps in the browser:

  Settings -> Pages -> Build and deployment -> Source: GitHub Actions

The included workflow runs the 122 tests and only publishes if they pass.

Your previous build is on the `legacy-build` branch if you need anything
back from it.
NOTES
