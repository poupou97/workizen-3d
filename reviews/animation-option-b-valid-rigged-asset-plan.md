# Workizen Animation Option B - Valid Rigged Asset Plan

Date: 2026-06-09

## Decision

Do not code animation again until a valid rigged asset passes offline validation.

Option A failed with the generated rigged asset:

- `apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01_Rigged.glb`
- `apps/workizen-3d/public/assets/animations/Wave.glb`

Failure mode: the mesh deformed into a large stretched triangle and the Mixamo clip did not bind cleanly to the generated skeleton.

## Single Test Model

Use exactly one test model:

- Citizen: `human-plaza-01`
- Name: Layla Chen
- Source mesh: `apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01.glb`

Do not use `SM_Chr_HumanCitizen_01_Rigged.glb` from the previous attempt.

Workizen Guide remains a later candidate, but not this rigging pass. Layla is preferred because the failed POC already used her data path and gives the cleanest before/after comparison.

## Rigging Route

Primary route: Mixamo Auto Rig.

Use Mixamo because the existing animation set is Mixamo-style and the desired clips are standard human actions:

- Idle
- Walk
- Wave

Fallback route: Tripo Auto Rig only if the current Tripo API/account supports exporting a valid skeleton, skin weights, and animation-compatible bind pose.

## Required Export

Accepted output formats:

- FBX with Skin
- GLB with skeleton, skin weights, and valid bind pose

The exported character and all clips must come from the same rig/skeleton family. Do not combine a generated Workizen rig with unrelated animation clips unless the bind test passes without warnings.

## Proposed Output Locations

Keep the old failed `_Rigged.glb` file untouched for audit, but do not reference it from runtime code.

Recommended new files:

```txt
apps/workizen-3d/public/assets/rigged/layla-chen/LaylaChen_Rigged.glb
apps/workizen-3d/public/assets/rigged/layla-chen/animations/Idle.glb
apps/workizen-3d/public/assets/rigged/layla-chen/animations/Walk.glb
apps/workizen-3d/public/assets/rigged/layla-chen/animations/Wave.glb
```

If Mixamo exports FBX first, preserve source FBX files under:

```txt
apps/workizen-3d/public/assets/rigged/layla-chen/source-fbx/
```

Then convert only the validated runtime assets to GLB.

## Validation Checklist

Asset structure:

- Source is `SM_Chr_HumanCitizen_01.glb`, not the failed `_Rigged.glb`.
- Skeleton exists.
- Skin count is greater than `0`.
- Joint count is greater than `0`.
- Mesh has valid `JOINTS_0` and `WEIGHTS_0` attributes.
- Bind pose loads at normal citizen height.
- Character bottom aligns to ground after normalization.

Visual checks:

- Mesh does not stretch, explode, or form triangle artifacts.
- Head, torso, arms, and legs remain attached during Idle.
- Walk moves arms and legs without tearing the mesh.
- Wave moves the upper body/arm without deforming the full mesh.
- No giant bounding box compared with the static citizen.

Animation bind checks:

- Idle binds without `THREE.PropertyBinding` warnings.
- Walk binds without `THREE.PropertyBinding` warnings.
- Wave binds without `THREE.PropertyBinding` warnings.
- Animation clips target existing skeleton nodes.
- Clip names are documented after import.

Runtime safety:

- No change to `TripoModel` static rendering.
- No rollout to all citizens.
- No movement or collision changes.
- No scene integration until all offline checks pass.

## Next Test Step

After the validated rigged asset is available:

1. Add an offline inspection script or one-off validation command for the new asset folder.
2. Confirm skeleton/skin/joint counts and animation target matches.
3. Render the rigged model in an isolated test scene or hidden route.
4. Only then recreate `AnimatedModel` POC for one explicit ID: `human-plaza-01`.
5. Verify with Playwright screenshot and console capture before touching the main scene.

