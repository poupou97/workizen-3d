# Workizen Phase 3.0 — Ambient Citizen Movement v1 Report

Date: 2026-06-08
Project: Workizen 3D
Target app: `apps/workizen-3d`

## Scope

Phase 3.0 adds lightweight ambient behavior for Tripo citizen models without skeletons or walking animations.

No camera, building scale, citizen scale, island layout, or animation asset changes were made.

## 1. Waypoint System

Added `AmbientWaypoint`:

```ts
type AmbientWaypoint = {
  id: string
  position: [number, number, number]
  lookAt?: [number, number, number]
  waitSeconds?: number
  district?: string
}
```

Added district waypoint lists in `AMBIENT_WAYPOINTS_BY_DISTRICT` for:

- Citizen Plaza
- AI Agent Lab
- Founder Tower
- Knowledge Library
- Opportunity Center
- Compute Center
- Team Office

Waypoint intent:

- Citizen Plaza citizens move around fountain, Campus Map, Citizen Registry, Welcome Board, and south social bench.
- AI Agent Lab agents move near lab entrance, front path, and side gathering points.
- Founder Tower citizen moves between entry/path/bench review points.
- Knowledge citizens move between library entry and bookshelf-facing points.
- Opportunity citizens move between board, market, path, and side points.
- Compute human citizen moves around entry/screen/pond/side points.
- Team Office citizens move between entry/table/path points.

## 2. Route Selection

Each citizen gets a deterministic route using `hashCitizenId(citizen.citizen_id)`.

The route starts at the citizen's authored `data.ts` coordinate, then rotates the district waypoint list by the citizen hash. This avoids every citizen choosing the same first destination while keeping behavior stable across reloads.

Procedural compute devices do not move because Phase 3.0 targets Tripo citizen models.

## 3. Movement Behavior

Implemented in `CitizenMesh` with `useFrame`.

Rules:

- Citizens move slowly at about `0.26-0.36` scene units per second.
- Citizens pause at waypoints using `waitSeconds`.
- During movement, model yaw faces the movement direction.
- During waiting, model yaw faces the waypoint `lookAt` target when available.
- Labels remain parented to the mover group but do not rotate with the model shell.
- Existing `<Float>` remains active, preserving subtle idle bob.

## 4. Orientation Formula

Tripo citizen meshes are treated as facing local `+X` at zero rotation.

Yaw is computed from a current position to either movement direction or `lookAt` target:

```ts
yaw = Math.atan2(-dz, dx)
```

Rotation is smoothed with shortest-angle interpolation:

```ts
delta = Math.atan2(Math.sin(target - current), Math.cos(target - current))
rotation.y += delta * factor
```

## 5. Files Changed

- `apps/workizen-3d/src/features/campus/CampusScene.tsx`
- `reviews/phase-3-ambient-citizen-movement-v1-report.md`

## 6. Screenshot

- `output/screenshots/workizen-phase-3-ambient-citizen-movement-v1.png`

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

- Next.js still reports the existing multi-lockfile workspace root warning. It did not block build or smoke validation.

## 8. Remaining Risks

- This is motion-only ambient behavior; there is still no walking animation because TripoModel is a static mesh.
- Citizens can still visually cluster when multiple route hashes converge around Citizen Plaza. Future phases can add occupancy reservation or per-waypoint capacity.
- Collision/pathfinding is not implemented; routes are authored to avoid obvious buildings and props but are not navmesh-validated.
