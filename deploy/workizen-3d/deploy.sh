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

# ── Chốt: rsync dưới đây chạy --delete từ CÂY LÀM VIỆC, không từ nhánh git ──
#
# Ngày 8/8/2026 chốt này chưa có, và cái giá là app bị Google Play TỪ CHỐI:
# trang /privacy chỉ tồn tại trên một nhánh feature, chưa bao giờ lên `main`.
# Ai deploy lúc đang checkout nhánh đó thì trang có mặt; hôm ấy deploy từ
# `main` ⇒ `--delete` xoá sạch nó khỏi máy chủ, không một dòng cảnh báo.
#
# Nói cách khác: cái gì chưa lên `main` thì lần deploy kế tiếp sẽ XOÁ nó.
BRANCH="$(git -C "$REPO_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"
DIRTY="$(git -C "$REPO_ROOT" status --porcelain 2>/dev/null | head -1)"
if [[ "$BRANCH" != "main" || -n "$DIRTY" ]]; then
  echo "✗ TỪ CHỐI deploy — cây làm việc không phải 'main' sạch."
  echo "  nhánh: $BRANCH${DIRTY:+  (có thay đổi chưa commit)}"
  echo
  echo "  rsync --delete sẽ đẩy ĐÚNG cây này lên máy chủ. Deploy từ nhánh khác"
  echo "  nghĩa là mọi thứ chỉ có trên 'main' sẽ bị xoá, và ngược lại — thứ chỉ"
  echo "  có ở nhánh này sẽ biến mất ở lần deploy sau."
  echo
  echo "  Đưa thay đổi lên 'main' rồi deploy lại. Nếu thật sự cần ép:"
  echo "  WZ_DEPLOY_ANY_BRANCH=1 $0"
  [[ "${WZ_DEPLOY_ANY_BRANCH:-}" == "1" ]] || exit 1
  echo "  → WZ_DEPLOY_ANY_BRANCH=1: vẫn tiếp tục."
fi

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
