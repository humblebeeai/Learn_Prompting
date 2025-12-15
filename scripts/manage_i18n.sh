#!/bin/bash

# Configuration
UPSTREAM_REMOTE="upstream"
UPSTREAM_BRANCH="main"
DOCS_DIR="docs"
EN_DIR="i18n/en/docusaurus-plugin-content-docs/current"

function sync_skeleton() {
    echo "Syncing UZ skeleton to EN..."
    # rsync to copy directories/files that don't exist in destination
    # -a: archive mode
    # -v: verbose
    # --ignore-existing: skip updating files that exist on receiver
    rsync -av --ignore-existing "$DOCS_DIR/" "$EN_DIR/"
    echo "Skeleton sync complete."
}

function verify_upstream_diff() {
    echo "Checking diff against upstream..."
    git fetch "$UPSTREAM_REMOTE"
    # List files in docs that changed between upstream and local
    git diff --name-status "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH" -- "$DOCS_DIR"
}

case "$1" in
    sync)
        sync_skeleton
        ;;
    diff)
        verify_upstream_diff
        ;;
    *)
        echo "Usage: $0 {sync|diff}"
        exit 1
        ;;
esac
