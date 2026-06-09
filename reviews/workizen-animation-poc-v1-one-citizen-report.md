# Workizen Animation POC v1 - One Citizen Only

Date: 2026-06-09

## Scope

POC target was exactly one citizen:

- Candidate: `human-plaza-01` / Layla Chen
- No rollout to all citizens

## Result

Option A was tested with the available rigged asset:

- Model: `apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01_Rigged.glb`
- Animation: `apps/workizen-3d/public/assets/animations/Wave.glb`

The result is rejected for visual quality.

The rendered character mesh deformed into a large stretched triangle covering the scene. This indicates the current auto-rigged GLB skinning/bind pose is not compatible enough with the Mixamo clip for a production-facing POC.

The app scene has been restored to static `TripoModel` rendering for Layla Chen. No static Tripo citizen is currently animated.

## Decision

Proceed with Option B.

Do not animate the current Tripo static mesh or the current generated `_Rigged.glb` files in the live scene.

Required pipeline:

```txt
Tripo GLB
-> Mixamo Auto Rig or Tripo Auto Rig
-> FBX/GLB with a valid skeleton, bind pose, skin weights, and compatible animation clips
-> Workizen AnimatedModel
```

## Acceptance Criteria For Next Rigged Asset

- Character renders at normal citizen height.
- No stretched or exploding mesh.
- Skeleton contains animation-compatible body and leg bones.
- Walking/idle/wave clips bind without `THREE.PropertyBinding` warnings.
- The POC is still gated to one explicit citizen ID before any rollout.

