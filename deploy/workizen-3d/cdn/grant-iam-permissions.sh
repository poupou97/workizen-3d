#!/usr/bin/env bash
# Grant CloudFront and ACM permissions to terraform-ai IAM user
# Run this ONCE before running setup-cloudfront.sh
set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-default}"
IAM_USER="terraform-ai"

echo "==> Attaching CloudFront and ACM policies to $IAM_USER ..."

aws iam attach-user-policy \
  --user-name "$IAM_USER" \
  --policy-arn "arn:aws:iam::aws:policy/CloudFrontFullAccess" \
  --profile "$AWS_PROFILE"
echo "    CloudFrontFullAccess attached."

aws iam attach-user-policy \
  --user-name "$IAM_USER" \
  --policy-arn "arn:aws:iam::aws:policy/AWSCertificateManagerFullAccess" \
  --profile "$AWS_PROFILE"
echo "    AWSCertificateManagerFullAccess attached."

aws iam attach-user-policy \
  --user-name "$IAM_USER" \
  --policy-arn "arn:aws:iam::aws:policy/AmazonRoute53FullAccess" \
  --profile "$AWS_PROFILE"
echo "    AmazonRoute53FullAccess attached."

echo ""
echo "==> Done. You can now run: ./setup-cloudfront.sh"
