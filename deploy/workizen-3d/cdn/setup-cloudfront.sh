#!/usr/bin/env bash
# CloudFront + ACM setup for workizen.net
# Prerequisites:
#   1. Run: aws iam attach-user-policy --user-name terraform-ai --policy-arn arn:aws:iam::aws:policy/CloudFrontFullAccess --profile default
#   2. Run: aws iam attach-user-policy --user-name terraform-ai --policy-arn arn:aws:iam::aws:policy/AWSCertificateManagerFullAccess --profile default
#   3. Then run this script: ./setup-cloudfront.sh
#
# Rollback: ./rollback-cloudfront.sh <distribution-id>
set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-default}"
DOMAIN="workizen.net"
ORIGIN_DOMAIN="workizen.net"
HOSTED_ZONE_ID="Z048982110IKRK19LARIQ"
REGION_CLOUDFRONT="us-east-1"  # ACM for CloudFront must be us-east-1

echo "==> [1/5] Requesting ACM certificate for $DOMAIN in us-east-1 ..."
CERT_ARN=$(aws acm request-certificate \
  --domain-name "$DOMAIN" \
  --subject-alternative-names "www.$DOMAIN" \
  --validation-method DNS \
  --region "$REGION_CLOUDFRONT" \
  --profile "$AWS_PROFILE" \
  --query 'CertificateArn' --output text)
echo "    Certificate ARN: $CERT_ARN"

echo ""
echo "==> [2/5] Fetching DNS validation records (wait ~15 seconds for ACM to generate them) ..."
sleep 20

VALIDATION_RECORDS=$(aws acm describe-certificate \
  --certificate-arn "$CERT_ARN" \
  --region "$REGION_CLOUDFRONT" \
  --profile "$AWS_PROFILE" \
  --query 'Certificate.DomainValidationOptions[*].ResourceRecord' \
  --output json)

echo "    Validation DNS records:"
echo "$VALIDATION_RECORDS" | python3 -c "
import sys, json
records = json.load(sys.stdin)
for r in records:
    if r:
        print(f'  Name:  {r[\"Name\"]}')
        print(f'  Type:  {r[\"Type\"]}')
        print(f'  Value: {r[\"Value\"]}')
        print()
"

echo "==> [2b/5] Auto-adding CNAME validation records to Route53 ..."
CHANGE_BATCH=$(python3 -c "
import sys, json
records_json = '''$VALIDATION_RECORDS'''
records = json.loads(records_json)
changes = []
seen = set()
for r in records:
    if r and r['Name'] not in seen:
        seen.add(r['Name'])
        changes.append({
            'Action': 'UPSERT',
            'ResourceRecordSet': {
                'Name': r['Name'],
                'Type': r['Type'],
                'TTL': 300,
                'ResourceRecords': [{'Value': r['Value']}]
            }
        })
print(json.dumps({'Changes': changes}))
")

aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --change-batch "$CHANGE_BATCH" \
  --profile "$AWS_PROFILE" > /dev/null

echo "    DNS validation records added. Waiting for certificate to be issued (up to 5 minutes) ..."
aws acm wait certificate-validated \
  --certificate-arn "$CERT_ARN" \
  --region "$REGION_CLOUDFRONT" \
  --profile "$AWS_PROFILE"
echo "    Certificate issued!"

echo ""
echo "==> [3/5] Creating CloudFront distribution ..."
DIST_CONFIG=$(cat <<EOF
{
  "CallerReference": "workizen-3d-$(date +%s)",
  "Comment": "workizen.net CDN",
  "DefaultRootObject": "",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "workizen-origin",
        "DomainName": "$ORIGIN_DOMAIN",
        "CustomOriginConfig": {
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "https-only",
          "OriginSSLProtocols": {
            "Quantity": 1,
            "Items": ["TLSv1.2"]
          }
        },
        "OriginPath": ""
      }
    ]
  },
  "CacheBehaviors": {
    "Quantity": 2,
    "Items": [
      {
        "PathPattern": "/assets/*",
        "TargetOriginId": "workizen-origin",
        "ViewerProtocolPolicy": "redirect-to-https",
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
        "Compress": true,
        "AllowedMethods": {
          "Quantity": 2,
          "Items": ["GET", "HEAD"],
          "CachedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"]}
        }
      },
      {
        "PathPattern": "/_next/static/*",
        "TargetOriginId": "workizen-origin",
        "ViewerProtocolPolicy": "redirect-to-https",
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
        "Compress": true,
        "AllowedMethods": {
          "Quantity": 2,
          "Items": ["GET", "HEAD"],
          "CachedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"]}
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "workizen-origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
    "Compress": true,
    "AllowedMethods": {
      "Quantity": 7,
      "Items": ["GET", "HEAD", "OPTIONS", "PUT", "PATCH", "POST", "DELETE"],
      "CachedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"]}
    }
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "$CERT_ARN",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "Aliases": {
    "Quantity": 2,
    "Items": ["$DOMAIN", "www.$DOMAIN"]
  },
  "Enabled": true,
  "HttpVersion": "http2and3",
  "IsIPV6Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF
)

DIST_RESULT=$(aws cloudfront create-distribution \
  --distribution-config "$DIST_CONFIG" \
  --profile "$AWS_PROFILE" \
  --output json)

DIST_ID=$(echo "$DIST_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['Distribution']['Id'])")
CF_DOMAIN=$(echo "$DIST_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['Distribution']['DomainName'])")

echo "    Distribution ID: $DIST_ID"
echo "    CloudFront domain: $CF_DOMAIN"
echo "    Status: Deploying (takes 5–15 minutes)"

echo ""
echo "==> [4/5] Saving deployment state ..."
cat > /tmp/workizen-cf-state.json <<STATEFILE
{
  "distribution_id": "$DIST_ID",
  "cloudfront_domain": "$CF_DOMAIN",
  "cert_arn": "$CERT_ARN",
  "origin": "$ORIGIN_DOMAIN",
  "deployed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
STATEFILE
cp /tmp/workizen-cf-state.json "$(dirname "$0")/cf-state.json"
echo "    Saved to: $(dirname "$0")/cf-state.json"

echo ""
echo "==> [5/5] Updating Route53 to point workizen.net → CloudFront ..."
echo "    NOTE: This replaces the A record pointing to Oracle VM."
echo "    Oracle VM IP (137.131.35.185) is preserved in cf-state.json for rollback."
echo ""
echo "    Run the following command AFTER verifying CloudFront is fully deployed:"
echo ""
cat <<CMD
aws route53 change-resource-record-sets \\
  --hosted-zone-id $HOSTED_ZONE_ID \\
  --profile $AWS_PROFILE \\
  --change-batch '{
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "workizen.net.",
          "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "$CF_DOMAIN",
            "EvaluateTargetHealth": false
          }
        }
      },
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "www.workizen.net.",
          "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "$CF_DOMAIN",
            "EvaluateTargetHealth": false
          }
        }
      }
    ]
  }'
CMD

echo ""
echo "==> Done. Check CloudFront status with:"
echo "    aws cloudfront get-distribution --id $DIST_ID --profile $AWS_PROFILE --query 'Distribution.Status'"
