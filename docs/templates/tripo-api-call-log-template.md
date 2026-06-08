# Tripo API Call Log Entry Template

Use this template inside:

```text
logs/tripo/YYYY-MM-DD-tripo-calls.md
```

## Call Entry

```yaml
timestamp: YYYY-MM-DDTHH:mm:ssZ
caller_agent: Codex | Claude | human | script-name
purpose: Short reason for the generation call
endpoint: Tripo endpoint or operation name
request_id: Provider request ID or local generated ID
prompt: |
  Full prompt used for the call.
negative_prompt: |
  Full negative prompt used for the call.
input_image_path: Repository path or "none"
parameters:
  output_format: GLB
  style: Workizen 70% Animal Crossing / 20% Zepeto / 10% Modern Startup Ecosystem
  target_district: District name
  other: Add tool-specific parameters here
output_asset_path: Repository path or "none"
output_format: GLB | GLTF | FBX | other
credit_cost_if_available: Unknown | numeric value
success_failure_status: SUCCESS | FAILURE
error_message_if_any: None or exact error summary
review_status: DRAFT | REVIEWED | APPROVED | REJECTED | INTEGRATED
retry_of_request_id: Original request ID or "none"
```

## Notes

- Do not include `TRIPO_API_KEY` or any secret value.
- Failed calls must be logged.
- Retries must reference the original `request_id`.
- The resulting asset must be registered in `docs/assets/generated-asset-registry-v01.md` before runtime integration.

