# Workizen Phase 2E.1 Visual Cleanup & Tree Placement Report v01

Date: 2026-06-08  
Project: Workizen 3D  
Target app: `apps/workizen-3d`

## Scope

Phase 2E.1 cleaned up the Phase 2E island composition so Workizen HQ Island feels more like a curated campus and less like a crowded forest/debug scene.

No NPC walking, animation work, pathfinding, multiplayer, backend, economy, marketplace logic, or new gameplay systems were added.

## Tree Count Before

Phase 2E report count:

- Trees / tree-like objects: 48 total

The previous placement had several large trees near the center and front sightlines, which made the island read too dense from the default camera.

## Tree Count After

Phase 2E.1 target: 28-35 trees.

Implemented count:

- Total trees: 35
- Plaza small trees: 5
- Between-building trees: 9
- Bench shade trees: 5
- Coastline / edge trees: 16

This meets the requested maximum while preserving the island campus feeling.

## Tree Placement Rules Applied

Applied placement categories in `CampusScene.tsx`:

- `PLAZA_SMALL_TREES`
- `BETWEEN_BUILDING_TREES`
- `BENCH_SHADE_TREES`
- `COASTLINE_TREES`

Rules applied:

- Center / Citizen Plaza now uses only small trees, flowers, hedges, and low plants.
- Large and medium trees were moved to between-building gaps, behind benches, and the island edge.
- Tall trees were concentrated on coastline/background positions.
- Trees in front of key facades were removed or repositioned.
- Existing flowers, bushes, hedges, rocks, lamps, benches, ocean, beach, island terrain, and path network were preserved.

## Boards / Signs Removed Or Preserved

Preserved required boards:

- Welcome Board
- Campus Map Board
- Opportunity Board
- Citizen Registry Board

Preserved required district signs:

- One district sign per district remains through `DistrictSignBoard`.

Removed / hidden clutter:

- Extra path marker labels on the ground.
- Extra signpost district labels.
- Floating district name labels above landmark buildings.
- Duplicate Citizen Plaza floating label.
- Waterfront Pier floating label.
- Knowledge Library extra `OUR EXPERTISE` board.
- Compute Center extra `SYSTEM STATUS` board.
- Team Office extra `TEAM WORKFLOW` board.

Result: signage now feels more intentional and less like debug annotation.

## Landmark Sightlines Improved

Improved sightlines:

- AI Agent Lab front view is clearer and remains the primary landmark.
- Founder Tower remains readable as the second strongest landmark.
- Citizen Plaza center is more open and social.
- Opportunity Center entrance is less blocked.
- Team Office entrance is less visually crowded.
- Compute Center entrance and waterfront/pond area remain visible.
- Knowledge Library entrance has fewer competing labels and trees.

No camera changes were used.

## Files Changed

- `apps/workizen-3d/src/features/campus/CampusScene.tsx`
- `reviews/phase-2e1-visual-cleanup-tree-placement-report-v01.md`

## Screenshots Generated

- `output/screenshots/workizen-phase-2e1-overview.png`
- `output/screenshots/workizen-phase-2e1-citizen-plaza.png`
- `output/screenshots/workizen-phase-2e1-ai-agent-lab.png`
- `output/screenshots/workizen-phase-2e1-waterfront.png`

## Validation Results

Passed:

- `npm run typecheck`
- `npm run build`
- `npm run smoke:campus`

Smoke result:

- Desktop passed.
- Tablet passed.
- Mobile passed.

Runtime warnings observed during screenshot generation:

- `THREE.Clock` deprecation warning.
- `THREE.WebGLShadowMap: PCFSoftShadowMap` deprecation warning.

These are existing Three.js runtime warnings and did not block rendering or validation.

## Remaining Risks

- The default Founder Demo info card still appears on first load; future UI work can hide it until selection or onboarding completion.
- Some small text labels on in-world signs remain hard to read from the default camera, but the scene is less cluttered overall.
- Tree sizes use asset scaling rules and visual placement, not a formal automated occlusion test.
- The bottom dock is still a preparation step, not the final UI taxonomy from the UI standard.

## Assessment

Phase 2E.1 keeps the approved island direction while reducing the dense forest feeling.

The campus now reads more like a curated Workizen HQ Island:

- Ocean and beach remain strong.
- Buildings are easier to see.
- Plaza is more open.
- Large trees mostly frame the island edge and between-district gaps.
- Signs and boards feel more deliberate.
