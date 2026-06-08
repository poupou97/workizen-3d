# Workizen Phase 2A Landmark Integration Report v01

Date: 2026-06-08

## Scope

Phase 2A focused only on district visual identity. NPC behavior, animation, pathfinding, multiplayer, backend, economy, and marketplace logic were not changed.

Reviewed:

- `reviews/asset-validation/asset-validation-report-v01.md`
- `reviews/codex-independent-founder-review-v01.md` was requested but is not present in this workspace.

## Files Modified

- `apps/workizen-3d/src/features/campus/CampusScene.tsx`
- `apps/workizen-3d/src/features/campus/data.ts`

## Procedural District Buildings Replaced

Before this sprint, the remaining rendered procedural district building was:

- AI Agent Lab: custom `boxGeometry`, `sphereGeometry`, antenna, panel, and dome primitives.

The other district landmarks had already started using Tripo building assets, but the renderer names and dead procedural implementations still made the source ambiguous. Phase 2A consolidated all six named landmarks into one Tripo-driven district building path and removed the unused procedural district building implementations.

## Assets Integrated

All six accepted district landmark assets are now routed through `TripoModel`, preserving native Tripo PBR materials with no Synty material override:

- `SM_Bld_AIAgentLab_01.glb`
- `SM_Bld_FounderTower_01.glb`
- `SM_Bld_KnowledgeLibrary_01.glb`
- `SM_Bld_ComputeCenter_01.glb`
- `SM_Bld_OpportunityCenter_01.glb`
- `SM_Bld_TeamOffice_01.glb`

## Composition Changes

- Expanded the district ring spacing in `data.ts` so the campus reads less like a tight prototype cluster.
- Added per-landmark scale, rotation, label height, and sign offset configuration in `LANDMARK_BUILDINGS`.
- Reframed the default camera to a higher, centered view so the district ring is visible as a city composition.
- Removed the foreground Tripo blimp and decorative Tripo environment/pier render block from the default scene because those non-district assets were occluding the landmark view.
- Disabled Tripo citizen rendering and preloading because the citizen meshes measure roughly 94-100 raw units tall. Citizen/NPC work remains postponed, so existing procedural citizen fallbacks are retained.

## Before / After Summary

Before:

- AI Agent Lab was still a procedural building made from primitive meshes.
- Old procedural district building functions remained in the source.
- Oversized Tripo character meshes could fill the camera and hide the campus.
- Decorative Tripo assets could block visual verification of the district landmarks.

After:

- All six named district landmarks use Tripo building GLBs via `TripoModel`.
- No rendered district building body uses placeholder `boxGeometry`.
- Tripo building materials are preserved.
- The scene frames the six landmarks as a readable campus ring.

## Verification

Passed:

- `npm run typecheck`
- `npm run build`
- `npm run smoke:campus` passed once after the initial landmark integration and generated desktop, tablet, and mobile screenshots.

Additional validation:

- Measured Tripo building GLB bounds with Three `GLTFLoader`; building dimensions are normalized enough for the existing `tripoH` scale convention.
- Measured Tripo citizen GLB bounds and confirmed they are not normalized; they remain out of scope for Phase 2A.

## Screenshots

Generated screenshots:

- `output/screenshots/workizen-hq-campus-phase-2a-desktop.png`
- `output/screenshots/workizen-hq-campus-phase-2a-canvas-wide.png`
- `output/screenshots/workizen-hq-campus-desktop.png`
- `output/screenshots/workizen-hq-campus-tablet.png`
- `output/screenshots/workizen-hq-campus-mobile.png`

Note: A final browser screenshot after the last minor camera recenter was not captured because the Playwright approval request was rejected. Typecheck and production build were rerun successfully after that final camera edit.

## Remaining Blockers

- Tripo citizen meshes are not scene-scale normalized and should not be used until a character scale/conversion pass is scheduled.
- This sprint did not add or change NPC behavior, animation, pathfinding, multiplayer, backend, economy, or marketplace logic by design.
