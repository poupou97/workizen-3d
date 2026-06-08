# AI Asset Generation Standard v01

Status: Active  
Project: Workizen 3D  
Purpose: Define how Workizen uses AI 3D generation tools for missing assets while keeping every generated asset auditable, reviewable, and compatible with the project art direction.

## Purpose

Use AI 3D generation tools only for assets missing from Synty Polygon Town.

Purchased and existing assets remain preferred when they already satisfy the visual requirement. AI generation is for gaps: district landmarks, distinctive props, missing environment pieces, and future characters that cannot be met by the Synty source library.

## Current Allowed Tools

Allowed now:

- Tripo AI

Allowed later, after explicit review:

- Meshy AI later
- Ready Player Me later
- Mixamo for animation only

Mixamo must be used only for animation clips or animation preparation. It is not an asset generation source for Workizen visual identity.

## Preferred Output

Preferred output formats:

- GLB
- GLTF

Generated assets should be browser-ready for Three.js / React Three Fiber with minimal conversion.

## Avoid Output

Avoid:

- FBX unless conversion is planned

FBX output may be accepted only when a documented conversion path exists and the converted asset will be reviewed before runtime integration.

## Required Metadata

Every generated asset must have metadata before it can be reviewed or integrated:

- `asset_id`
- `source_tool`
- `generation_date`
- `prompt`
- `negative_prompt`
- `input_image`
- `output_format`
- `file_path`
- `license_notes`
- `approved_by`
- `approval_status`
- `intended_district`
- `style_score`
- `polygon_compatibility_score`
- `notes`

Metadata may live in the generated asset registry, a dedicated asset metadata file, or both. The asset must be traceable from source prompt to runtime file path.

## Asset Status

Allowed statuses:

- `DRAFT`
- `REVIEWED`
- `APPROVED`
- `REJECTED`
- `INTEGRATED`

Status meaning:

- `DRAFT`: Generated or proposed, not yet reviewed.
- `REVIEWED`: Checked against art direction and technical requirements.
- `APPROVED`: Accepted for use, but not necessarily in runtime.
- `REJECTED`: Not accepted for Workizen usage.
- `INTEGRATED`: Present in runtime or a production asset bundle.

## Runtime Gate

No generated asset may enter runtime without metadata and review.

Before runtime integration, reviewers must confirm:

- Required metadata exists.
- The asset appears in `docs/assets/generated-asset-registry-v01.md`.
- The asset follows `docs/art-direction/workizen-art-direction-standard-v01.md`.
- The output format is usable by the Workizen 3D frontend.
- Scale, ground alignment, material style, and district fit are acceptable.

