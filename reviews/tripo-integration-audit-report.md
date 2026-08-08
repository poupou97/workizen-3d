# Tripo Integration Audit Report

Date: 2026-06-09

## Scope

Audit project documentation, scripts, generated asset reports, and current runtime integration related to Tripo.

API key handling is intentionally excluded from this report per project owner direction.

## Current Tripo Usage Level

The project currently uses Tripo at these levels:

- Text to 3D
- Asset download
- Task polling
- Balance check
- Runtime loading of generated GLB assets through `TripoModel`

The project does not currently use Tripo at these levels:

- Image to 3D
- Tripo Auto Rig API
- Tripo Retarget / Animation API
- Tripo Character Animation API in runtime
- Import model API
- Conversion API

## Evidence In Repo

### Text to 3D

Implemented in:

```txt
scripts/generate-campus-assets.mjs
```

The script creates Tripo tasks with:

```txt
type: text_to_model
POST https://api.tripo3d.ai/v2/openapi/task
```

The asset list includes buildings, props, environment assets, and character prompts.

### Asset Download

Implemented in:

```txt
scripts/generate-campus-assets.mjs
```

The script polls task output and downloads:

```txt
output.pbr_model ?? output.model
```

Generated runtime GLBs are stored in:

```txt
apps/workizen-3d/public/assets/models/
```

Generation metadata exists in:

```txt
output/tripo-generation-report.json
```

### Image to 3D

No active repo code was found for:

```txt
type: image_to_model
```

No upload/file-token flow for image input was found.

### Runtime Integration

Runtime usage is in:

```txt
apps/workizen-3d/src/features/campus/CampusScene.tsx
```

The app loads generated Tripo GLBs via `TripoModel`.

Current Tripo model categories used in scene:

- District buildings
- Environment assets
- Props
- Static citizen meshes

Citizen models remain static meshes. They are normalized by `TripoModel` / `autoNorm`, not animated.

## Existing Rig / Animation Work

### Local Auto-Rig Script

File:

```txt
scripts/auto-rig-characters.mjs
```

This is not a Tripo API integration. It is a local GLB patching script that:

- Reads static Tripo GLB files
- Adds a 16-bone Mixamo-style skeleton
- Adds generated `JOINTS_0`
- Adds generated `WEIGHTS_0`
- Writes `*_Rigged.glb`

This approach failed visual validation in the Animation POC.

Failed asset:

```txt
apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01_Rigged.glb
```

Observed failure:

- Mesh deformation
- Large stretched triangle artifact
- Mixamo animation did not bind cleanly

Related report:

```txt
reviews/workizen-animation-poc-v1-one-citizen-report.md
```

### Existing Animation Assets

Animation GLBs exist in:

```txt
apps/workizen-3d/public/assets/animations/
```

Files include:

```txt
Idle.glb
Walking.glb
Wave.glb
Typing.glb
Talking.glb
Pointing.glb
Running.glb
```

They are not currently wired into the main scene after the failed POC was reverted.

## Tripo API Capability Check

Based on current Tripo OpenAPI documentation, Tripo does support animation-related tasks:

- `animate_prerigcheck`
- `animate_rig`
- `animate_retarget`
- `convert_model` with animation-related export options

Relevant documented capabilities:

### Pre Rig Check

Task type:

```txt
animate_prerigcheck
```

Purpose:

- Check whether a model is riggable.
- Return `riggable`.
- Return `rig_type`.

Documented rig types include:

```txt
biped
quadruped
hexapod
octopod
avian
serpentine
aquatic
```

### Rig

Task type:

```txt
animate_rig
```

Supported model version:

```txt
v2.5-20260210
```

Relevant parameters:

```txt
original_model_task_id
out_format: glb | fbx
model_version: v2.5-20260210
rig_type: biped
spec: tripo | mixamo
```

Notes:

- `spec` defaults to `tripo`.
- Docs state only `tripo` is supported for retarget.

### Retarget

Task type:

```txt
animate_retarget
```

Relevant parameters:

```txt
original_model_task_id
out_format: glb | fbx
bake_animation
export_with_geometry
animation
animations
animate_in_place
```

Documented preset animations include:

```txt
preset:idle
preset:walk
preset:run
preset:dive
preset:climb
preset:jump
preset:slash
preset:shoot
preset:hurt
preset:fall
preset:turn
```

The docs do not show `preset:wave` in the visible preset list.

### Conversion

Task type:

```txt
convert_model
```

Relevant animation/export parameters:

```txt
format: GLTF | FBX | OBJ | STL | USDZ | 3MF
with_animation: true
animate_in_place
export_orientation
fbx_preset: blender | 3dsmax | mixamo
```

## Account/API Support Status

Tripo API documentation supports rigging and animation tasks.

This repo does not currently contain code that verifies whether the active account/API key can call those endpoints successfully.

Therefore:

- API capability: supported by Tripo docs.
- Project integration: not implemented.
- Account entitlement: not verified in repo.

## Endpoints Already Coded

Coded in `scripts/generate-campus-assets.mjs`:

```txt
GET  /user/balance
POST /task              with type text_to_model
GET  /task/{task_id}
download output model URL
```

No Tripo endpoint appears to be coded-but-unused. The existing Tripo script uses the endpoints it defines.

## Endpoints Not Yet Coded

Not present in project scripts:

```txt
image_to_model
import_model
animate_prerigcheck
animate_rig
animate_retarget
convert_model
quick upload
STS upload
```

## If Using Tripo Rigging

Recommended pipeline for Layla Chen:

1. Use the existing source generation task for:

```txt
SM_Chr_HumanCitizen_01
```

Known task id is recorded in:

```txt
output/tripo-generation-report.json
```

2. Run pre-rig check:

```txt
POST /task
type: animate_prerigcheck
original_model_task_id: <SM_Chr_HumanCitizen_01 task id>
```

3. If `riggable: true`, run rig:

```txt
POST /task
type: animate_rig
original_model_task_id: <SM_Chr_HumanCitizen_01 task id>
model_version: v2.5-20260210
rig_type: biped
spec: tripo
out_format: glb
```

4. Retarget animation clips:

```txt
POST /task
type: animate_retarget
original_model_task_id: <rigged model task id>
animations:
  - preset:idle
  - preset:walk
animate_in_place: true
out_format: glb
```

5. If FBX/GLTF export is needed, run conversion:

```txt
POST /task
type: convert_model
original_model_task_id: <rigged or animated task id>
format: FBX or GLTF
with_animation: true
fbx_preset: mixamo
```

6. Save validated outputs under:

```txt
apps/workizen-3d/public/assets/rigged/layla-chen/
```

Suggested output layout:

```txt
apps/workizen-3d/public/assets/rigged/layla-chen/LaylaChen_Rigged.glb
apps/workizen-3d/public/assets/rigged/layla-chen/animations/Idle.glb
apps/workizen-3d/public/assets/rigged/layla-chen/animations/Walk.glb
apps/workizen-3d/public/assets/rigged/layla-chen/source/
```

## If Tripo Rigging Is Not Available On Account

If `animate_prerigcheck`, `animate_rig`, or `animate_retarget` fail due to plan/account support, then the project should use Mixamo.

Mixamo path:

```txt
SM_Chr_HumanCitizen_01.glb
-> Convert/upload-compatible character file if needed
-> Mixamo Auto Rig
-> Download FBX with Skin
-> Download Idle / Walk / Wave from same Mixamo skeleton
-> Convert validated runtime assets to GLB
-> Test in isolated scene
-> Only then create one-citizen AnimatedModel POC
```

## Validation Checklist Before Workizen Integration

Required checks:

- Mesh does not deform.
- Mesh does not explode into triangle artifacts.
- Skeleton exists.
- Skin count is greater than `0`.
- Joint count is greater than `0`.
- `JOINTS_0` exists.
- `WEIGHTS_0` exists.
- Idle binds without `THREE.PropertyBinding` warnings.
- Walk binds without `THREE.PropertyBinding` warnings.
- Wave, if sourced from Mixamo, binds without `THREE.PropertyBinding` warnings.
- Character height remains consistent with static `TripoModel` target.
- Test is isolated from the main scene first.

Runtime constraints:

- Do not animate all citizens.
- Do not reuse failed `*_Rigged.glb` assets.
- Do not modify static `TripoModel` rendering.
- Do not modify movement/collision.
- Do not rollout animation until one-citizen POC passes screenshot and console validation.

## Final Recommendation

Tripo should be tested first because current docs support rigging and retargeting.

However, the project should treat Mixamo as the fallback path if the active Tripo account cannot access animation endpoints or if Tripo output fails visual validation.

