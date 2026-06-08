# Tripo API Call Log Standard v01

Status: Active  
Project: Workizen 3D  
Purpose: Make every Tripo API call traceable, auditable, and safe.

## Required Logging

Every Tripo API call must be logged.

This applies to:

- Successful generation calls
- Failed generation calls
- Preview or draft calls
- Retry calls
- Calls made by Claude, Codex, scripts, local tools, or any other agent

No unlogged Tripo API calls are allowed.

## Log Folder

Tripo API logs must be stored under:

```text
logs/tripo/
```

## Log File Format

Use one Markdown log file per calendar day:

```text
logs/tripo/YYYY-MM-DD-tripo-calls.md
```

Example:

```text
logs/tripo/2026-06-08-tripo-calls.md
```

## Required Call Entry Fields

Each call entry must include:

- `timestamp`
- `caller_agent`
- `purpose`
- `endpoint`
- `request_id`
- `prompt`
- `negative_prompt`
- `input_image_path`
- `parameters`
- `output_asset_path`
- `output_format`
- `credit_cost_if_available`
- `success_failure_status`
- `error_message_if_any`
- `review_status`

## API Key Rule

No API key should ever be committed.

The Tripo API key must come from environment variable only:

```text
TRIPO_API_KEY
```

Do not place API keys in:

- Source files
- Markdown docs
- Prompt files
- Logs
- Shell history snippets
- Screenshots
- Generated metadata

## Failure and Retry Rule

Any failed call must be logged too.

Any retry must reference the original `request_id`.

Retries must include:

- Original request ID
- Retry reason
- Changed parameters, if any
- New request ID, if a new request is created
- Final success or failure status

