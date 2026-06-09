# Phase 3.8–3.10 — Scene Polish & 2.5D Camera Report
**Date:** 2026-06-09
**Branch:** feat/phase-2f9 → main
**Commits:** fdb3349 → ee9913b (5 commits)

---

## Tóm tắt

3 phases polish hoàn thiện visual layout của campus scene:

| Phase | Nội dung | Commit |
|-------|---------|--------|
| 3.8 | Bench + lamp redesign | fdb3349 |
| 3.9 | Board/sign system + NPC staging | 6c3adc0 |
| 3.10 | Camera 2.5D lock + UI alignment | ee9913b |

---

## Phase 3.8 — Bench & Lamp Layout

### Benches
- Giảm từ 19 → 6 benches (1 per district)
- Vị trí finalized: cách building ~4–10m, hướng về center hoặc building
- Compute/Opportunity: 10m từ building, quay về building
- Founder/Knowledge: 4m từ south wall, quay về center
- Team Office: 2 benches flanking entrance, 6.6m apart

### Lamps
- 3 rings từ fountain:
  - **Ring 1** (inner): 2 lamps flanking info boards tại plaza
  - **Ring 2** (middle): sát mặt trước các toà nhà, 15° CW offset tránh cửa ra vào
  - **Ring 3** (outer): behind buildings, `rotationOffset={Math.PI}` face outward
- Xoá Team Office ring 2 lamp (che cửa)
- Founder Tower ring 2 + 3 pushed thêm 1.5m ra ngoài

---

## Phase 3.9 — Board & Sign System

### LandmarkBuildingConfig Extensions
```tsx
type LandmarkBuildingConfig = {
  // ... existing fields
  signPosition?: [number, number, number]  // override local position
  signRotation?: number                    // override Y rotation
  hidden?: boolean                         // hide building model
}
```

### Dynamic Sign Rotation
```tsx
const signRotation = cfg.signRotation ?? Math.atan2(-signWorldX, -signWorldZ)
```
Tất cả landmark signs tự face về island center, với override per-building khi cần song song với mặt toà nhà.

### Board Positions Finalized

| Board | World XZ | Height | Notes |
|-------|---------|--------|-------|
| AI Agent Lab | [0, -7.55] | y=3.72 | On center→building line |
| Founder Tower | [-6.63, -6.36] | y=2.22 | Parallel to building face |
| Knowledge Library | [6.47, -7.13] | y=3.22 | On line, parallel face |
| Compute Center | [6.0, -8.71] | y=3.22 | On line, parallel face (-π/2) |
| Opportunity Center | [-6.7, 0.27] | y=4.22 | On line, parallel face (π/2) |
| Citizen Plaza | [0, 4.5] | y=2.74 | Toward Team Office, facing center |
| Citizen Registry | [-5.14, -4.75] | y=0 | 7m from center, 133° from +Z |
| Campus Map | [3.9, -8.7] | y=0 | Between AI Lab + Knowledge Library |
| Welcome Board | [-3.5, 14.0] | y=0 | Pier left, facing sea |

### DistrictSignBoard + InfoBoard
- Thêm `rotation` prop (Y-axis) cho cả 2 components
- Opportunity Board: thêm dynamic rotation formula

### 6 NPC Placeholders Staged
Gom về pier row z=11 để assign Tripo models sau:

| x | NPC |
|---|-----|
| -5 | AI Architect |
| -3 | Opportunity Manager |
| -1 | Knowledge Manager |
| +1 | Compute Manager |
| +3 | Project Manager |
| +5 | Founder |

### Knowledge Library Bookshelves
- Tạm ẩn (`{/* bookshelves hidden */}`)
- Campus Map board đặt vào vị trí này

---

## Phase 3.10 — Camera & UI

### Camera 2.5D Lock
```tsx
<PerspectiveCamera makeDefault position={[12.5, 19.6, 17.8]} fov={48} />
<OrbitControls
  target={[1.5, 0.2, -1.2]}
  enableRotate={false}
  enableZoom={false}
  enablePan={false}
  // ...
/>
```
- Góc nhìn: 30° CW từ default, zoom 25% so với original
- Fully locked — không rotate, zoom, pan

### UI Panel Alignment
- **TopHud:** bỏ `mx-auto max-w-7xl justify-between` wrapper → glass panel flush left với `px-4 md:px-6` của header
- **SelectionPanel:** `left-4 md:left-6` → left edge khớp với TopHud trên mọi viewport

---

## Files Modified

| File | Changes |
|------|---------|
| `src/features/campus/CampusScene.tsx` | Board system, bench/lamp, camera lock |
| `src/features/campus/data.ts` | 6 NPC positions → pier z=11 |
| `src/features/campus/TopHud.tsx` | Remove centering wrapper |
| `src/features/campus/SelectionPanel.tsx` | left-4 md:left-6 |

---

## Trạng thái

**Phase 3.8–3.10 PASS.** Scene polish hoàn chỉnh. Camera locked 2.5D. UI aligned.

### Pending (Next Sprint)
- Assign Tripo GLB models cho 6 NPC placeholders
- Wire KnowledgeCitizen + ComputeCitizen avatar types
- Campus Map board content update (hiện vẫn dùng placeholder text)
