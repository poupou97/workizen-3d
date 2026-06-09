# Workizen Visual Upgrade v01 Execution Report

Date: 2026-06-07
Project: Workizen 3D
App: `apps/workizen-3d`

## Task Summary

Prepared the minimum pre-code corrections and implemented the Workizen HQ Campus Visual Upgrade v1 for the Founder Demo.

## Files Created

- `docs/world-design/hq-campus-layout-v02.md`
- `assets/workizen-district-asset-selection-v01.md`
- `docs/technical/synty-import-pipeline-v01.md`
- `docs/reviews/workizen-visual-qa-checklist-v01.md`
- `output/reviews/workizen-visual-upgrade-v01.md`
- `execution-reports/2026/06/2026-06-07-workizen-visual-upgrade-v01.md`

## Files Updated

- `apps/workizen-3d/src/features/campus/data.ts`
- `apps/workizen-3d/src/features/campus/CampusScene.tsx`
- `apps/workizen-3d/scripts/smoke-campus.mjs`

## Decisions Added

- Canonical layout source is `hq-campus-layout-v02.md`.
- Default Map is Workizen HQ Campus.
- Default Spawn is Citizen Plaza.
- Main Landmark is AI Agent Lab.
- Product flow is Citizen Plaza -> Opportunity Center -> Team Office.
- Visual flow is Citizen Plaza -> AI Agent Lab.
- FBX is the preferred source asset format.
- GLB/GLTF is the preferred runtime format after conversion.
- Generated low-poly Synty-inspired approximation is acceptable when direct FBX import would block the build.

## FBX Import Result

Direct FBX import was not completed in this pass. The purchased Synty assets were reviewed and used as visual direction, but runtime geometry was generated in React Three Fiber.

## Runtime Result

Implemented:

- Center Citizen Plaza with fountain, benches, lamps, and label.
- North AI Agent Lab with stronger scale, antenna, solar panel, AI sign, and glowing lab element.
- North west Founder Tower with stacked floors and HQ sign.
- North east Knowledge Library with book props and signage.
- West Opportunity Center with market board and stall props.
- East Compute Center with server, antenna, solar panel, and compute sign.
- South Team Office with meeting table and team sign.
- Campus paths, trees, flowers, lamps, benches, and directional signs.

## Validation

Completed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `PORT=3001 npm run serve`
- `WORKIZEN_CAMPUS_URL=http://127.0.0.1:3001 npm run smoke:campus`

Result: passed for desktop, tablet, and mobile.

## Screenshots

Expected generated screenshot:

- `output/screenshots/workizen-hq-campus-visual-upgrade-v01.png`

## Known Limitations

- Real Synty FBX meshes are not yet imported into the runtime scene.
- Generated geometry is still a visual approximation.
- Mobile usability should be reviewed manually after screenshot generation.
- Labels are 3D text and may need tuning once real assets are imported.

## Recommended Next Fix

Convert and import one Synty building into `apps/workizen-3d`, then replace one generated district building with a real GLB-backed asset while preserving click behavior.
