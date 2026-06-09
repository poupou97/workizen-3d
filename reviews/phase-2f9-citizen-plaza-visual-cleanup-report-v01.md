# Workizen Phase 2F.9 — Citizen Plaza Visual Cleanup Report v01

Date: 2026-06-08
Project: Workizen 3D
Target app: `apps/workizen-3d`
Branch observed: `feat/phase-2f9`

## Scope

Phase 2F.9 cleans up Citizen Plaza readability while preserving the approved Animal Crossing / Disney / Township cozy direction.

No camera, building scale, citizen scale, island layout, animation, or new external asset changes were made.

## 1. Hedges Removed

Removed all 6 central Citizen Plaza hedge placements from `CampusDecor`:

| Asset | Position | Rotation |
|---|---:|---:|
| `SM_Env_Hedge_01.glb` | `[-3.6, 0, -1.2]` | none |
| `SM_Env_Hedge_01.glb` | `[3.6, 0, -1.2]` | none |
| `SM_Env_Hedge_02.glb` | `[-3.6, 0, 1.2]` | none |
| `SM_Env_Hedge_02.glb` | `[3.6, 0, 1.2]` | none |
| `SM_Env_Hedge_03.glb` | `[-1.2, 0, -3.6]` | `[0, Math.PI / 2, 0]` |
| `SM_Env_Hedge_03.glb` | `[1.2, 0, -3.6]` | `[0, Math.PI / 2, 0]` |

Result: the center sightline around Citizen Registry, Campus Map, benches, and nearby citizens is less blocked.

## 2. Bench Reduction

Citizen Plaza benches in `PlazaDetails` were reduced from 4 to 2.

Removed 2 benches:

| Position | Rotation | Reason |
|---|---:|---|
| `[-2.2, 0, 1.35]` | `Math.PI / 2` | Too close to board/registry area and old hedge line |
| `[2.2, 0, 1.35]` | `-Math.PI / 2` | Too close to board/registry area and old hedge line |

Kept 2 benches:

| Position | Rotation | Reason |
|---|---:|---|
| `[-2.2, 0, -1.4]` | `Math.PI / 2` | Near fountain and readable from overview camera |
| `[2.2, 0, -1.4]` | `-Math.PI / 2` | Near fountain and readable from overview camera |

Reduction: 2 of 4 benches removed = 50%.

## 3. Flowers And Shrubs Added

Added 18 new flower patch placements around the old hedge footprint, using the existing `SM_Env_FlowerPatch_01.glb` / `SM_Env_FlowerPatch_02.glb` assets.

Added 6 small shrub placements using existing `SM_Env_Bush_01.glb` / `SM_Env_Bush_02.glb` assets at reduced scale `0.006`.

Color direction:

- Yellow: `#FDE68A`, `#FEF3C7`
- White: `#F8FAFC`, `#FFFFFF`
- Light blue: `#BAE6FD`, `#CFFAFE`

`FlowerPatch` now renders the existing flower patch asset plus small low-height accent blossoms so the requested yellow / white / light-blue garden direction is visible without adding external assets.

## 4. Citizen Orientation

Added `getCitizenPlazaLookRotation(citizen)` for citizens whose `location.district === "Citizen Plaza"`.

The target point is the fountain / plaza center:

```ts
targetX = 0
targetZ = 0
dx = targetX - x
dz = targetZ - z
```

Tripo citizen meshes are treated as facing local `+X` at zero rotation, so yaw is computed as:

```ts
yaw = Math.atan2(-dz, dx)
rotation = [0, yaw, 0]
```

The rotation is passed only to `TripoModel`, not the parent `group`, so citizen labels remain aligned above the citizen instead of rotating with the character.

## 5. Screenshots

Before:

- `output/screenshots/workizen-phase-2f9-citizen-plaza-before.png`

After:

- `output/screenshots/workizen-phase-2f9-citizen-plaza-after.png`

## 6. Files Changed

- `apps/workizen-3d/src/features/campus/CampusScene.tsx`
- `reviews/phase-2f9-citizen-plaza-visual-cleanup-report-v01.md`

Build tooling also touched:

- `apps/workizen-3d/next-env.d.ts`
- `apps/workizen-3d/tsconfig.tsbuildinfo`

## 7. Validation

Passed:

- `npm run typecheck`
- `npm run build`
- `npm run smoke:campus`

Smoke result:

- Desktop passed
- Tablet passed
- Mobile passed

Build warning observed:

- Next.js inferred workspace root from the root-level `package-lock.json` and reported the app-level lockfile as an additional lockfile. This is existing workspace structure noise and did not block the build.

## 8. Assessment

Citizen Plaza now reads more open and citizen-focused:

- Central hedge barriers are removed.
- Board/citizen/bench sightlines are cleaner.
- Bench density is reduced by 50%.
- Old hedge zones are replaced with lower flower/shrub garden clusters.
- Citizen Plaza characters now orient toward the fountain / center instead of retaining arbitrary default Tripo facing.

## 9. Follow-up Bench / Lamp Reduction

After additional visual review, Citizen Plaza furniture and lighting were reduced again:

| Type | Before follow-up | After follow-up | Reduction |
|---|---:|---:|---:|
| Plaza benches | 2 | 1 | 50% |
| Plaza lamps | 4 | 2 | 50% |

New placement:

- Bench moved to `[0, 0, -1.95]`, centered near the fountain so it reads as one intentional social object instead of duplicated clutter.
- Lamps moved to `[-2.55, 0, -2.25]` and `[2.55, 0, -2.25]`, framing the fountain path symmetrically while keeping the board / registry area open.
