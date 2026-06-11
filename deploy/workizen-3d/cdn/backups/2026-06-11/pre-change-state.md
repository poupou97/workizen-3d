# Pre-Change State Snapshot
**Date:** 2026-06-11
**Time:** ~09:48 UTC+7

## Oracle VM
- Public IP: 137.131.35.185
- Role: Frontend (workizen.net, www.workizen.net, portainer3.workizen.net)

## DB VM
- Public IP: 129.153.114.109
- Role: db.workizen.net, neo4j, supabase, qdrant, knowledge, portainer

## Route53
- Hosted Zone ID: Z048982110IKRK19LARIQ
- Full snapshot: route53-workizen.net.json

## Deploy Stack
- Docker + Caddy 2 (alpine)
- Next.js 16.2.7 standalone mode

## Current Headers (pre-fix)
- GLB assets:     cache-control: public, max-age=0  ← BUG
- _next/static:   cache-control: public, max-age=31536000, immutable  ✅
- index.html:     cache-control: s-maxage=31536000 (no browser cache)

## Rollback Command (nếu cần)
```bash
./rollback-cloudfront.sh <distribution-id>
# Hoặc thủ công:
aws route53 change-resource-record-sets \
  --hosted-zone-id Z048982110IKRK19LARIQ \
  --profile default \
  --change-batch '{
    "Changes": [
      {"Action":"UPSERT","ResourceRecordSet":{"Name":"workizen.net.","Type":"A","TTL":60,"ResourceRecords":[{"Value":"137.131.35.185"}]}},
      {"Action":"UPSERT","ResourceRecordSet":{"Name":"www.workizen.net.","Type":"A","TTL":60,"ResourceRecords":[{"Value":"137.131.35.185"}]}}
    ]
  }'
```
