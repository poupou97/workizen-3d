#!/usr/bin/env bash
# Rollback CloudFront: restore Route53 A record to Oracle VM
# Usage: ./rollback-cloudfront.sh [distribution-id]
set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-default}"
HOSTED_ZONE_ID="Z048982110IKRK19LARIQ"
ORACLE_VM_IP="137.131.35.185"

echo "==> Restoring workizen.net → Oracle VM ($ORACLE_VM_IP) ..."
aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --profile "$AWS_PROFILE" \
  --change-batch '{
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "workizen.net.",
          "Type": "A",
          "TTL": 60,
          "ResourceRecords": [{"Value": "'"$ORACLE_VM_IP"'"}]
        }
      },
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "www.workizen.net.",
          "Type": "A",
          "TTL": 60,
          "ResourceRecords": [{"Value": "'"$ORACLE_VM_IP"'"}]
        }
      }
    ]
  }'

echo "    Route53 restored. DNS propagation ~60 seconds (TTL=60)."

DIST_TO_DISABLE="${1:-E218G9RNHGYBND}"
echo ""
echo "==> Disabling CloudFront distribution $DIST_TO_DISABLE ..."
ETAG=$(aws cloudfront get-distribution --id "$DIST_TO_DISABLE" --profile "$AWS_PROFILE" --query 'ETag' --output text)
CURRENT_CONFIG=$(aws cloudfront get-distribution-config --id "$DIST_TO_DISABLE" --profile "$AWS_PROFILE" --query 'DistributionConfig' --output json)
DISABLED_CONFIG=$(echo "$CURRENT_CONFIG" | python3 -c "import sys,json; d=json.load(sys.stdin); d['Enabled']=False; print(json.dumps(d))")
aws cloudfront update-distribution --id "$DIST_TO_DISABLE" --if-match "$ETAG" --distribution-config "$DISABLED_CONFIG" --profile "$AWS_PROFILE" > /dev/null
echo "    Distribution disabled (delete after ~15 min once fully disabled)."

echo ""
echo "==> Rollback complete."
