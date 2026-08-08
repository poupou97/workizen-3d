# Workizen Phase 3.1 — Citizen Collision & Safe Movement Report

Date: 2026-06-08
Project: Workizen 3D
Target app: `apps/workizen-3d`

## Scope

Phase 3.1 adds MVP safe movement on top of Phase 3.0 ambient citizen movement.

This is not full pathfinding or navmesh. The implementation focuses on:

- Obstacle zones
- Safe waypoint selection
- Segment blocking checks
- Simple obstacle push-out
- Simple citizen separation

No camera, building scale, citizen scale, island layout, skeleton, or walking animation changes were made.

## 1. Obstacle Zones

Added `ObstacleZone`:

```ts
type ObstacleZone = {
  id: string
  type: "circle" | "rect"
  position: [number, number, number]
  radius?: number
  size?: [number, number]
}
```

Obstacle zones were added for:

- Founder Tower building footprint
- AI Agent Lab building footprint
- Knowledge Library building footprint
- Opportunity Center building footprint
- Compute Center building footprint
- Team Office building footprint
- Citizen Plaza fountain
- Citizen Plaza major sign boards
- Citizen Plaza south bench
- District boards / large props
- Knowledge bookshelves
- Team Office desks
- Plaza trees
- Plaza garden footprints replacing old hedge lines
- District-adjacent large tree clusters

Constants:

```ts
const CITIZEN_COLLISION_RADIUS = 0.42
const CITIZEN_AVOIDANCE_RADIUS = 0.88
const OBSTACLE_PADDING = 0.34
```

## 2. Safe Waypoint Movement

Added checks before choosing a waypoint:

- `isPointBlocked(point)` rejects waypoints inside obstacle zones.
- `segmentIntersectsObstacle(from, to)` samples the straight-line route to reject waypoint paths that cross an obstacle.
- `findReachableWaypoint(route, startIndex, from)` skips blocked waypoints and chooses the next reachable waypoint.

This keeps the MVP deterministic without adding graph search.

## 3. Obstacle Avoidance

During `useFrame`, each moving citizen:

1. Checks whether its current position is too close to or inside an obstacle.
2. Applies `getObstaclePushVector(position)` to push out of the obstacle footprint.
3. Checks the proposed next position before committing movement.
4. Skips to another waypoint if the proposed position remains blocked.

Supported obstacle shapes:

- Circle: radial push away from center.
- Rect: shortest-axis push out of the expanded footprint.

## 4. Citizen-to-Citizen Avoidance

Added a module-level `citizenPositionRegistry`.

Each ambient citizen writes its current position every frame. Other citizens read that registry and apply `getCitizenAvoidanceVector(id, position)`:

- No push if outside `CITIZEN_AVOIDANCE_RADIUS`.
- Stronger push if inside `CITIZEN_COLLISION_RADIUS`.
- Push is horizontal only, preserving ground alignment.

This prevents most direct overlap without enforcing strict queueing or per-waypoint reservation.

## 5. Waypoint Adjustments

Adjusted a few Phase 3.0 waypoints that were too close to props or new obstacle zones:

- Citizen Plaza route now moves around the fountain in a safer perimeter order.
- `plaza-south-social` moved from `[0.15, 0, -1.85]` to `[0.2, 0, -2.45]` to avoid the south bench.
- AI Lab side waypoints moved away from tree clusters.
- Compute screen waypoint moved away from the screen/building obstacle footprint.

## 6. Screenshot

- `output/screenshots/workizen-phase-3-1-citizen-collision-safe-movement.png`

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

- This is avoidance, not full pathfinding. Citizens may skip a waypoint if the straight-line segment is blocked instead of routing around it.
- There is no waypoint occupancy reservation yet, so label clusters can still happen around popular plaza points.
- Obstacle zones are hand-authored approximations. Future phases should expose debug overlays or generate zones from asset metadata.
- Rectangle zones are axis-aligned; rotated benches/signs are approximated with conservative bounds.
