#!/usr/bin/env bash
# Chạy sau mỗi lần deploy build mới để xóa CloudFront cache cho HTML
# Usage: ./invalidate.sh [paths...]
# Mặc định: invalidate "/" và "/_next/data/*"
# Không cần invalidate /assets/* và /_next/static/* nếu dùng filename hashing
set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-default}"
DIST_ID="E218G9RNHGYBND"

PATHS=("${@:-/ /_next/data/*}")
if [ "$#" -eq 0 ]; then
  PATHS=("/" "/_next/data/*")
fi

QUANTITY=${#PATHS[@]}
ITEMS=$(printf '"%s",' "${PATHS[@]}" | sed 's/,$//')

echo "==> Invalidating CloudFront $DIST_ID ..."
echo "    Paths: ${PATHS[*]}"

RESULT=$(aws cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --invalidation-batch "{\"Paths\":{\"Quantity\":$QUANTITY,\"Items\":[$ITEMS]},\"CallerReference\":\"deploy-$(date +%s)\"}" \
  --profile "$AWS_PROFILE" \
  --output json)

INV_ID=$(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['Invalidation']['Id'])")
echo "    Invalidation ID: $INV_ID"
echo "    Status: $(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['Invalidation']['Status'])")"
echo ""
echo "==> Done. Propagation ~30–60 seconds."
