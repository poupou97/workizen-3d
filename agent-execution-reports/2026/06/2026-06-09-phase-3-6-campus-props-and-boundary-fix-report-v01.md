# Phase 3.6 — Campus Props & Citizen Movement Boundary Fix
**Date:** 2026-06-09

---

## Summary

4 changes applied to `CampusScene.tsx`:

1. **Bench cleanup** — giảm từ 19 → 8 benches
2. **Lamp redistribution** — radial rings từ fountain, 12 lamps tổng
3. **Lamp rotation** — tất cả đèn tự quay về trung tâm đảo
4. **Island boundary** — animated citizens không thể ra ngoài đảo

---

## Files Modified

| File | Thay đổi |
|---|---|
| `apps/workizen-3d/src/features/campus/CampusScene.tsx` | Bench/lamp layout, `Lamp` rotation, `isPointInsideIsland()`, boundary guards |

---

## 1. Bench Cleanup

**Before: 19 benches** (18 trong `CampusDecor` + 1 trong `CitizenPlaza`)
**After: 8 benches** (7 trong `CampusDecor` + 1 trong `CitizenPlaza`)

| District | Before | After | Vị trí giữ lại |
|---|---|---|---|
| AI Agent Lab | 3 | 1 | `[-1.9, 0, -5.5]` — bên trái đường vào |
| Founder Tower | 3 | 1 | `[-8.6, 0, -6.9]` — bên tháp |
| Knowledge Library | 3 | 1 | `[8.6, 0, -6.9]` — đối xứng Founder |
| Opportunity Center | 3 | 1 | `[-9.6, 0, 2.9]` — bên center |
| Compute Center | 3 | 1 | `[9.6, 0, 2.9]` — đối xứng Opportunity |
| Team Office | 3 | 2 | `[±2.3, 0, 5.1]` — 2 bên lối vào |
| Citizen Plaza | 1 | 1 | `[0, 0, -1.95]` — giữ nguyên |

Benches bị loại: những bench quá xa building (z=-10.6), cụm 3 bench/district tạo cảm giác chật, bench sau lưng Team Office (z=9.6).

---

## 2. Lamp Redistribution

**Before: 11 lamps** — phân bố không đều, thiếu outer ring
**After: 12 lamps** — 3 rings từ fountain ra ngoài

| Ring | Count | Vị trí | Mô tả |
|---|---|---|---|
| Inner (r≈3.5) | 2 | `[-2.55, 0, -2.25]`, `[2.55, 0, -2.25]` | CitizenPlaza — giữ nguyên |
| Inner+ (r≈4) | 2 | `[-2.1, 0, 3.3]`, `[2.1, 0, 3.3]` | Flanking info boards |
| Middle (r≈5.5-6) | 6 | N/NW/NE/W/E/S path | Trên 6 trục đường chính |
| Outer (r≈7-9) | 2 | `[-7.0, 0, -6.2]`, `[7.0, 0, -6.2]` | Founder + Library approach |

**Lamp rotation (mới):** Mỗi đèn tự tính `yaw = Math.atan2(-px, -pz)` và truyền vào `rotation={[0, yaw, 0]}`. Tất cả 12 đèn đều hướng đầu về trung tâm đảo `[0, 0, 0]`.

---

## 3. Island Boundary for Citizen Movement

**Vấn đề:** Animated wanderers (Layla Chen + Workizen Guide) có thể bị đẩy ra ngoài đảo bởi obstacle recovery vector.

**Fix:**

```ts
// Ellipse approximation of inner grass (radiusX=13.4, radiusZ=11.5 với wobble)
function isPointInsideIsland(x: number, z: number): boolean {
  const rx = 11.5
  const rz = 10.0
  return (x * x) / (rx * rx) + (z * z) / (rz * rz) < 1.0
}
```

Guards áp dụng tại 2 điểm trong `AnimatedWandererMesh.useFrame`:

**Guard 1 — Obstacle recovery:**
```ts
const recovered = state.position.clone().addScaledVector(obstacleRecovery.normalize(), delta * 0.55)
if (isPointInsideIsland(recovered.x, recovered.z)) {
  state.position.copy(recovered)
} else {
  // Recovery đẩy ra ngoài đảo → nudge về origin
  const toCenter = new THREE.Vector3(-state.position.x, 0, -state.position.z).normalize()
  state.position.addScaledVector(toCenter, delta * 0.55)
}
```

**Guard 2 — Movement step:**
```ts
if (isPointBlocked(proposed) || !isPointInsideIsland(proposed.x, proposed.z)) {
  state.waypointIndex = (state.waypointIndex + 1) % wanderRoute.length
  state.waitSeconds = 0.35
  isMovingRef.current = false
  return
}
```

**WANDER_POIS filter:** `getWanderRoute()` lọc POI qua `isPointInsideIsland` trước khi dùng — belt-and-suspenders.

**Verification tất cả 16 WANDER_POIS:**

| POI (furthest) | x²/rx² + z²/rz² | Status |
|---|---|---|
| wp-founder-path `[-6.05, -7.45]` | 0.277 + 0.555 = 0.832 | ✓ inside |
| wp-knowledge-entry `[6.10, -6.25]` | 0.282 + 0.391 = 0.673 | ✓ inside |
| wp-opportunity-board `[-7.00, 1.05]` | 0.370 + 0.011 = 0.381 | ✓ inside |
| wp-compute-entry `[7.00, 1.25]` | 0.370 + 0.016 = 0.386 | ✓ inside |

Tất cả 16 POI đều trong ellipse. Không có POI nào bị filter bỏ.

---

## Validation Results

| Check | Kết quả |
|---|---|
| `npm run typecheck` | ✅ PASS (0 errors) |
| `npm run build` | ✅ PASS |
| `npm run smoke:campus` desktop | ✅ PASS |
| `npm run smoke:campus` tablet | ✅ PASS |
| `npm run smoke:campus` mobile | ✅ PASS |

---

## Remaining Risks

| Rủi ro | Mức độ | Ghi chú |
|---|---|---|
| Lamp model có thể face +X thay vì +Z | Thấp | Nếu sai 90°, điều chỉnh `yaw += Math.PI/2` trong `Lamp` |
| Island ellipse không khớp hoàn toàn wobble shape | Rất thấp | Margin đủ lớn: ellipse rx=11.5 so với grass rx_min≈12.5 |
| Static citizens vẫn có thể dùng district waypoints sát boundary | Rất thấp | District waypoints đã được validate từ phase trước |
