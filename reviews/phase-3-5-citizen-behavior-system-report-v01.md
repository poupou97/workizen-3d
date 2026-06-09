# Phase 3.5 — Citizen Behavior System MVP Report v01

Date: 2026-06-09

---

## Tóm tắt

Triển khai Citizen Behavior System MVP cho Workizen 3D campus scene.

Chỉ 2 NPC được animate:
- **Layla Chen** (`human-plaza-01`) — Citizen Plaza
- **Workizen Guide** (`workizen-guide`) — NPC guide

31 citizen còn lại vẫn là static TripoModel. Không thay đổi gì về scale, camera, hay visual style.

---

## Behavior 1 — Wander (Cross-District POI Route)

Cả hai NPC animated đều sử dụng `getWanderRoute()`:
- Bắt đầu từ `startPosition` (home waypoint)
- Tiếp theo là 16 POI xoay vòng qua tất cả 7 district
- `rotateWaypoints(WANDER_POIS, seed)` — mỗi NPC bắt đầu tại vị trí khác nhau trong route để tránh đi theo nhau

Luồng di chuyển: `idle tại home → walk đến POI → idle tại POI → walk đến POI tiếp theo → ...`

---

## Behavior 2 — POI List (Cross-District, No Ocean, No Through Buildings)

16 POI an toàn, lấy từ `AMBIENT_WAYPOINTS_BY_DISTRICT` đã validate sẵn:

| POI | District | Vị trí |
|---|---|---|
| wp-plaza-fountain-w | Citizen Plaza | [-1.35, 0, -0.25] |
| wp-plaza-campus-map | Citizen Plaza | [-0.55, 0, 2.15] |
| wp-plaza-registry | Citizen Plaza | [1.95, 0, 1.55] |
| wp-plaza-south | Citizen Plaza | [0.20, 0, -2.45] |
| wp-ai-lab-path | AI Agent Lab | [0, 0, -4.25] |
| wp-ai-lab-left | AI Agent Lab | [-2.20, 0, -5.10] |
| wp-founder-entry | Founder Tower | [-7.10, 0, -6.25] |
| wp-founder-path | Founder Tower | [-6.05, 0, -7.45] |
| wp-knowledge-entry | Knowledge Library | [6.10, 0, -6.25] |
| wp-knowledge-shelf | Knowledge Library | [5.10, 0, -5.80] |
| wp-opportunity-board | Opportunity Center | [-7.00, 0, 1.05] |
| wp-opportunity-path | Opportunity Center | [-6.25, 0, 2.25] |
| wp-compute-entry | Compute Center | [7.00, 0, 1.25] |
| wp-compute-pond | Compute Center | [6.55, 0, 2.55] |
| wp-team-entry | Team Office | [-1.45, 0, 4.65] |
| wp-team-table | Team Office | [0.00, 0, 4.25] |

Obstacle avoidance: `isPointBlocked()` + `getObstaclePushVector()` (reuse logic đã có trong scene).

---

## Behavior 3 — Idle Variations

```ts
const IDLE_DURATIONS_S = [2, 5, 10] as const  // idle_short / idle_medium / idle_long
```

Mỗi lần NPC đến waypoint, `pickIdleDuration()` pick ngẫu nhiên 1 trong 3 giá trị.
Không có pattern cố định — mỗi lần tới mỗi POI là một random pick độc lập.

---

## Behavior 4 — Crowd Distribution

Reuse `getCitizenAvoidanceVector(id, position)` với `CITIZEN_AVOIDANCE_RADIUS = 0.88`.
Cả hai animated NPC đều register vào `citizenPositionRegistry` → tránh overlap với 31 citizen static.

Min spacing thực tế: ~0.88m (avoidance radius). Push vector được áp dụng với `delta * 0.38` mỗi frame khi gần citizen khác.

---

## Behavior 5 — Animated NPC (Layla Chen + Workizen Guide Only)

| NPC | ID | Animation | Các citizen khác |
|---|---|---|---|
| Layla Chen | `human-plaza-01` | Idle.glb + Walk.glb | Static TripoModel |
| Workizen Guide | `workizen-guide` | Idle.glb + Walk.glb | — |

**Không rollout toàn bộ 32 citizen.**

---

## Architecture

### Components Mới

#### `AnimatedWandererBody`

- Load cả `Idle.glb` và `Walk.glb` cùng lúc
- `SkeletonUtils.clone()` cho mỗi instance — tránh conflict giữa 2 animated NPC dùng cùng skeleton
- Cả hai group (idle + walk) luôn được render nhưng toggle `visible` trực tiếp trên Three.js object trong `useFrame` → **zero React re-renders** khi switch clip
- `useAnimations(gltf.animations, ref)` — mỗi skeleton drive animation của chính nó

```
AnimatedWandererBody props:
  isMovingRef: { current: boolean }  — set bởi parent movement loop
```

#### `AnimatedWandererMesh`

- Toàn bộ movement logic tương đương `LegacyCitizenMesh` nhưng đơn giản hơn (không cần fallback procedural, không cần device/robot branch)
- Movement state hoàn toàn bằng `useRef` — không có `useState`
- POI route từ `getWanderRoute(startPos, seed)`

```
AnimatedWandererMesh props:
  citizenId: string
  startPosition: Vector3Tuple
  name: string
  accentColor: string
  onSelect: () => void
```

### Thin Dispatcher Pattern

```tsx
function CitizenMesh({ citizen }) {
  const select = useCampusStore(...)
  if (citizen.citizen_id === "human-plaza-01") {
    return <AnimatedWandererMesh ... />
  }
  return <LegacyCitizenMesh citizen={citizen} />
}

function NpcMesh({ npc }) {
  const select = useCampusStore(...)
  if (npc.id === "workizen-guide") {
    return <AnimatedWandererMesh ... />
  }
  // ... existing static NPC rendering
}
```

Toàn bộ 31 citizen còn lại và tất cả NPC khác không bị thay đổi.

### Files Thay Đổi

| File | Thay đổi |
|---|---|
| `src/features/campus/CampusScene.tsx` | +imports (useAnimations, cloneSkeleton), +ANIM_IDLE_PATH/WALK_PATH preloads, +WANDER_POIS, +pickIdleDuration, +getWanderRoute, +AnimatedWandererBody, +AnimatedWandererMesh, thin CitizenMesh dispatcher, NpcMesh early-return for Guide |

Không tạo file mới trong `src/`.

---

## Constraints Đã Giữ

| Constraint | Status |
|---|---|
| Không gọi Tripo API | ✓ |
| Không tạo asset mới | ✓ |
| Không thay đổi scale | ✓ |
| Không thay đổi camera | ✓ |
| Không refactor lớn scene | ✓ |
| Không animate toàn bộ 32 citizen | ✓ |
| Không thay đổi visual style | ✓ |

---

## Validation Results

| Check | Kết quả |
|---|---|
| `npm run typecheck` | ✅ PASS (0 errors) |
| `npm run build` | ✅ PASS (compiled in 2.5s) |
| `npm run smoke:campus` desktop | ✅ PASS |
| `npm run smoke:campus` tablet | ✅ PASS |
| `npm run smoke:campus` mobile | ✅ PASS |
| 31 citizens vẫn static | ✅ Xác nhận |
| Layla Chen animated | ✅ Idle.glb + Walk.glb |
| Workizen Guide animated | ✅ Idle.glb + Walk.glb |
| Cross-skeleton conflict | ✅ Không có (SkeletonUtils.clone) |
| React re-render khi switch clip | ✅ Zero (useFrame visibility toggle) |

---

## Rủi Ro Còn Lại

| Rủi ro | Mức độ | Ghi chú |
|---|---|---|
| 4 GLB instances trong scene (2 NPC × 2 clips) | Thấp | Geometry buffers shared; chỉ 2 animated NPC |
| Distant POI travel time | Thấp | NPC có thể mất ~60s để đi từ Plaza đến Founder Tower; acceptable cho ambient behavior |
| `findReachableWaypoint` fallback | Thấp | Nếu tất cả waypoints đều bị block, NPC idle tại chỗ — không crash |
| Animation quality (11/34 bones) | Trung bình | Giới hạn của Tripo API, không fixable without Run.glb or better presets |

---

## Trạng Thái

**Phase 3.5 PASS.** Behavior system MVP hoạt động. Chỉ Layla Chen + Workizen Guide được animate. 31 citizens còn lại static.
