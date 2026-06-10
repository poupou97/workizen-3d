#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SSH_KEY="$REPO_ROOT/oracle-key/ssh-key-2026-06-10.key"
VM_USER="ubuntu"
VM_HOST="137.131.35.185"
VM_DIR="/srv/workizen-3d"
APP_DIR="$REPO_ROOT/apps/workizen-3d"

SSH="ssh -i $SSH_KEY -o StrictHostKeyChecking=no"
RSYNC="rsync -avz --delete -e 'ssh -i $SSH_KEY -o StrictHostKeyChecking=no'"

echo "==> Syncing app source to $VM_HOST:$VM_DIR ..."
rsync -avz --delete \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
  "$APP_DIR/" \
  "$VM_USER@$VM_HOST:$VM_DIR/"

echo "==> Syncing deploy config files ..."
rsync -avz \
  "$SCRIPT_DIR/Dockerfile" \
  "$SCRIPT_DIR/docker-compose.yml" \
  "$SCRIPT_DIR/Caddyfile" \
  "$SCRIPT_DIR/.dockerignore" \
  -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
  "$VM_USER@$VM_HOST:$VM_DIR/"

echo "==> Building and starting containers on VM ..."
$SSH "$VM_USER@$VM_HOST" "
  cd $VM_DIR
  docker compose pull caddy
  docker compose up --build -d
  docker compose ps
"

echo "==> Deploy complete."
