# Phase 2F.7 — Cozy Scale Audit Report

**Ngày:** 2026-06-08  
**Phase:** 2F.7  
**Visual Direction:** Animal Crossing / Disney / Township cozy style  
**Branch:** feat/phase-2e  
**Trạng thái:** Audit only — không thay đổi code

---

## 1. Mục tiêu

Đo chiều cao thực tế của tất cả objects trong scene, so sánh với mục tiêu cozy scale, và đề xuất thay đổi cho Phase 2F.8.

**Rule của phase này:**
- Không sửa code
- Không di chuyển citizen / building / district
- Chỉ đo, so sánh, và đề xuất

---

## 2. Bảng Scale Mục Tiêu (Cozy Style)

| Loại Object | Target Height | Ghi chú |
|------------|--------------|---------|
| Human citizen | 1.7m | Giữ nguyên |
| Robot / AI citizen | 1.2m | Nhỏ hơn human rõ ràng |
| Compute device (procedural) | 0.8m | Thấp hơn nhẹ |
| Small tree (plaza) | 2.0–2.8m | Cây nhỏ quanh quảng trường |
| Normal tree (mid-island) | 2.8–3.5m | Cây giữa khu, bóng mát |
| Large tree (coastline) | 3.5–4.0m | Cây viền bờ biển |
| Bush / shrub | 0.4–0.6m | Dưới đầu gối |
| Flower patch | 0.2–0.4m | Sát đất |
| Hedge | 0.8–1.2m | Hàng rào thực vật |
| Bench | 0.5–0.8m | Không cao hơn citizen |
| Street lamp | 2.0–2.5m | Cột đèn vừa tầm |
| Fountain | 2.0–2.5m | Điểm nhấn trung tâm |
| District buildings (BLD_M/S) | 4.0–6.0m | Tòa nhà vừa tầm |
| AI Agent Lab (BLD_L) | 4.0–6.0m | Tòa nhà landmark phía Bắc |
| Founder Tower | 7.0–8.0m | Cao nhất đảo — landmark |
| Tripo vegetation (bamboo/cherry/palm) | 2.5–4.0m | |

---

## 3. Bảng Scale Hiện Tại vs Mục Tiêu

### 3a. Citizens

| Object | Model | Current Height | Target | Status |
|--------|-------|---------------|--------|--------|
| Human citizens (×17) | HumanCitizen_01/02.glb | **1.70m** | 1.7m | ✅ |
| Robot / AI citizens (×8) | RobotCitizen_01.glb | **1.70m** | 1.2m | ❌ Cao hơn 0.5m |
| Knowledge citizens (×3) | KnowledgeCitizen_01.glb | **1.70m** | 1.7m | ✅ |
| Compute citizen | ComputeCitizen_01.glb | **1.70m** | 1.7m | ✅ |
| Compute device (×3, procedural) | Box mesh | **0.85m** | 0.8m | ⚠️ +0.05m |

> Tất cả TripoModel citizens dùng chung `CITIZEN_TARGET_HEIGHT = 1.7`. Robot citizen cần constant riêng.

---

### 3b. Buildings (Tripo)

Chiều cao tính từ `HEIGHT` constant và `tripoH()`.

| Object | HEIGHT constant | Current Height | Target | Status |
|--------|----------------|---------------|--------|--------|
| Founder Tower | `HEIGHT.TOWER = 4.50` | **4.50m** | 7.0–8.0m | ❌ Thấp hơn 2.5–3.5m |
| AI Agent Lab | `HEIGHT.BLD_L = 4.20` | **4.20m** | 4.0–6.0m | ⚠️ Dưới mid-range |
| Knowledge Library | `HEIGHT.BLD_M = 3.50` | **3.50m** | 4.0–6.0m | ❌ Thấp hơn 0.5m |
| Opportunity Center | `HEIGHT.BLD_M = 3.50` | **3.50m** | 4.0–6.0m | ❌ Thấp hơn 0.5m |
| Compute Center | `HEIGHT.BLD_M = 3.50` | **3.50m** | 4.0–6.0m | ❌ Thấp hơn 0.5m |
| Team Office | `HEIGHT.BLD_S = 3.50` | **3.50m** | 4.0–6.0m | ❌ Thấp hơn 0.5m |

---

### 3c. Tripo Vegetation

| Object | HEIGHT constant | Current Height | Target | Status |
|--------|----------------|---------------|--------|--------|
| Bamboo cluster | `HEIGHT.BAMBOO = 2.50` | **2.50m** | 2.5–3.5m | ✅ |
| Cherry blossom | `HEIGHT.CHERRY = 3.50` | **3.50m** | 2.8–3.5m | ✅ |
| Palm tree | `HEIGHT.PALM = 4.50` | **4.50m** | 3.5–4.0m | ❌ Cao hơn 0.5m |

---

### 3d. Synty Trees

Chiều cao tính tỉ lệ từ dữ liệu đo đạc: `SM_Env_Tree_01 @ scale=0.010 → 4.69m`.  
SM_Generic_Tree_01–04 có tỉ lệ tương đương (cùng asset pack Synty, cùng export convention).

| Group | Scale | Calc Height | Target | Status |
|-------|-------|------------|--------|--------|
| PLAZA_SMALL_TREES (×2) | 0.006 | **2.81m** | 2.0–2.8m | ⚠️ +0.01m (acceptable) |
| PLAZA_SMALL_TREES (×2) | 0.0058 | **2.72m** | 2.0–2.8m | ✅ |
| PLAZA_SMALL_TREES (×1) | 0.0055 | **2.58m** | 2.0–2.8m | ✅ |
| BETWEEN_BUILDING_TREES (×7) | 0.008 | **3.75m** | 2.8–3.5m | ❌ +0.25m |
| BETWEEN_BUILDING_TREES (×2) | 0.0085 | **3.99m** | 2.8–3.5m | ❌ +0.49m |
| BENCH_SHADE_TREES (×4) | 0.0085 | **3.99m** | 2.8–3.5m | ❌ +0.49m |
| BENCH_SHADE_TREES (×1) | 0.008 | **3.75m** | 2.8–3.5m | ❌ +0.25m |
| COASTLINE_TREES (×13) | 0.009 | **4.22m** | 3.5–4.0m | ❌ +0.22m |
| COASTLINE_TREES (×2) | 0.0088 | **4.13m** | 3.5–4.0m | ❌ +0.13m |
| Coastal Pine (×1) | 0.008 | **4.38m** | 3.5–4.0m | ❌ +0.38m (Pine_01 @ 5.48m ref) |

---

### 3e. Synty Props

Chiều cao Bench và Lamp là ước lượng dựa trên Synty typical dimensions (`*`).

| Object | Asset | Scale | Est. Height | Target | Status |
|--------|-------|-------|------------|--------|--------|
| Park bench | SM_Prop_ParkBench_01 | 0.010 (default) | **~0.88m*** | 0.5–0.8m | ⚠️ Slightly over |
| Street lamp | SM_Prop_Streetlamp_01 | 0.007 | **~2.2–2.4m*** | 2.0–2.5m | ✅ (estimated) |
| Fountain | SM_Prop_Fountain_01 | 0.012 | **1.82m** | 2.0–2.5m | ⚠️ -0.18m |
| Bush | SM_Env_Bush_01/02 | 0.010 (default) | **~0.6–0.8m*** | 0.4–0.6m | ⚠️ Slightly over |
| Flower patch | SM_Env_FlowerPatch_01/02 | 0.010 (default) | **~0.3–0.5m*** | 0.2–0.4m | ✅ |
| Hedge | SM_Env_Hedge_01/02/03 | 0.007 | **~0.8–1.0m*** | 0.8–1.2m | ✅ |

> `*` Ước lượng từ Synty typical geometry — chưa đo trực tiếp bằng script. Cần đo chính xác trong Phase 2F.8.

---

### 3f. Tripo Props

| Object | HEIGHT constant | Current Height | Ghi chú |
|--------|----------------|---------------|---------|
| Pier / Dock | `HEIGHT.PIER = 1.50` | **1.50m** | Không ảnh hưởng cozy scale |
| Blimp / Airship | `HEIGHT.BLIMP = 4.00` | **4.00m** (floating) | Prop trang trí, scale ok |

---

## 4. Danh sách Object Quá Lớn

| Object | Current | Target Max | Vượt |
|--------|---------|-----------|------|
| Founder Tower | 4.50m | 8.0m (min 7.0m) | — (quá **thấp**, không phải quá lớn) |
| Palm tree (Tripo) | 4.50m | 4.0m | +0.50m |
| COASTLINE_TREES (Synty) | 4.13–4.22m | 4.0m | +0.13–0.22m |
| Coastal Pine | 4.38m | 4.0m | +0.38m |
| BETWEEN_BUILDING_TREES | 3.75–3.99m | 3.5m | +0.25–0.49m |
| BENCH_SHADE_TREES | 3.75–3.99m | 3.5m | +0.25–0.49m |
| Robot citizens | 1.70m | 1.2m | +0.50m |

---

## 5. Danh sách Object Quá Nhỏ

| Object | Current | Target Min | Thiếu |
|--------|---------|-----------|-------|
| Founder Tower | 4.50m | 7.0m | **-2.50m** — cần tăng gấp đôi |
| AI Agent Lab | 4.20m | 4.0m | ✅ borderline (chưa đến mid-range 5.0m) |
| Knowledge Library | 3.50m | 4.0m | -0.50m |
| Opportunity Center | 3.50m | 4.0m | -0.50m |
| Compute Center | 3.50m | 4.0m | -0.50m |
| Team Office | 3.50m | 4.0m | -0.50m |
| Fountain | 1.82m | 2.0m | -0.18m |

---

## 6. Scale Factor Đề Xuất — Phase 2F.8

### 6a. Citizens (code change: thêm constant riêng cho robot)

| Object | Thay đổi cần thiết | Scale Factor | Chi tiết |
|--------|-------------------|-------------|---------|
| Human citizens | Không thay đổi | — | CITIZEN_TARGET_HEIGHT = 1.7 ✓ |
| Robot citizens | Thêm `ROBOT_TARGET_HEIGHT = 1.2` | **0.706** | 1.2 / 1.7 |
| Compute device | Giảm HEIGHT.DEVICE từ 0.85 → 0.80 | 0.941 | Minor, optional |

### 6b. Buildings (thay đổi HEIGHT constants)

| Object | Current | New HEIGHT | Scale Factor | Lý do |
|--------|---------|-----------|-------------|-------|
| Founder Tower | `HEIGHT.TOWER = 4.50` | **7.50** | **1.667×** | Landmark cao nhất đảo, cần iconic |
| AI Agent Lab | `HEIGHT.BLD_L = 4.20` | **5.00** | **1.190×** | Tăng presence mid-range |
| Knowledge Library | `HEIGHT.BLD_M = 3.50` | **4.50** | **1.286×** | Toàn bộ BLD_M +1.0m |
| Opportunity Center | (BLD_M) | 4.50 | 1.286× | Cùng constant |
| Compute Center | (BLD_M) | 4.50 | 1.286× | Cùng constant |
| Team Office | `HEIGHT.BLD_S = 3.50` | **4.00** | **1.143×** | Nhỏ hơn BLD_M một chút |

### 6c. Tripo Vegetation

| Object | Current | New HEIGHT | Scale Factor |
|--------|---------|-----------|-------------|
| Palm tree | `HEIGHT.PALM = 4.50` | **3.80** | **0.844×** |
| Bamboo | `HEIGHT.BAMBOO = 2.50` | 2.50 | — (✓) |
| Cherry blossom | `HEIGHT.CHERRY = 3.50` | 3.50 | — (✓) |

### 6d. Synty Trees (thay đổi scale trong TreePlacement arrays)

| Group | Current Scale | Proposed Scale | Current Height | Target Height |
|-------|-------------|---------------|---------------|--------------|
| PLAZA_SMALL_TREES (×2, 0.006) | 0.006 | **0.0058** | 2.81m | 2.72m |
| PLAZA_SMALL_TREES (others) | 0.0055–0.0058 | unchanged | 2.58–2.72m | ✅ |
| BETWEEN_BUILDING_TREES | 0.008–0.0085 | **0.0072** | 3.75–3.99m | ~3.38m |
| BENCH_SHADE_TREES | 0.0085 | **0.0075** | 3.99m | ~3.52m |
| BENCH_SHADE_TREES (0.008) | 0.008 | **0.0072** | 3.75m | ~3.38m |
| COASTLINE_TREES | 0.0088–0.009 | **0.0082** | 4.13–4.22m | ~3.85m |
| Coastal Pine | 0.008 (Pine_01) | **0.0067** | 4.38m | ~3.67m |

### 6e. Synty Props (cần đo chính xác trước)

| Object | Current Scale | Action |
|--------|-------------|--------|
| Park bench | 0.010 (default) | **Đo trước** — nếu ~0.88m thì giảm về 0.008 |
| Street lamp | 0.007 | Giữ nguyên — estimated ✅ |
| Fountain | 0.012 | Tăng lên **0.013** → ~1.97m ≈ 2.0m |
| Bush | 0.010 (default) | Đo trước — có thể giảm về 0.008 |
| Hedge | 0.007 | Giữ nguyên ✅ |

---

## 7. Tóm Tắt Phân Loại

### ✅ Không cần thay đổi (17 items)
- Human citizens (1.70m)
- Knowledge citizens (1.70m)
- Compute human citizen (1.70m)
- Bamboo (2.50m)
- Cherry blossom (3.50m)
- Plaza small trees (0.0055–0.0058 scale)
- Hedge (0.007 scale)
- Street lamp (0.007 scale — estimated ok)
- Flower patch (default scale)
- Pier / Blimp (props)

### ❌ Cần tăng scale (5 objects)
| Object | Thay đổi |
|--------|---------|
| Founder Tower | 4.50m → **7.50m** (+67%) |
| AI Agent Lab | 4.20m → **5.00m** (+19%) |
| Knowledge Library | 3.50m → **4.50m** (+29%) |
| Opportunity / Compute Centers | 3.50m → **4.50m** (+29%) |
| Team Office | 3.50m → **4.00m** (+14%) |
| Fountain | 1.82m → **~2.0m** (+10%) |

### ❌ Cần giảm scale (6 objects)
| Object | Thay đổi |
|--------|---------|
| Robot citizens | 1.70m → **1.20m** (-29%) |
| Palm tree | 4.50m → **3.80m** (-16%) |
| Between-building trees | 3.75–3.99m → **~3.38m** (-10–15%) |
| Bench shade trees | 3.75–3.99m → **~3.38–3.52m** (-10%) |
| Coastline trees | 4.13–4.38m → **~3.67–3.85m** (-8–16%) |
| Park bench | ~0.88m → **~0.72m** (TBD sau khi đo) |

---

## 8. Kế Hoạch Phase 2F.8

### Priority 1 — High Impact Visual Changes

**8a. Founder Tower: scale 4.50m → 7.50m**
```tsx
// CampusScene.tsx
const HEIGHT = {
  ...
  TOWER: 7.50,  // founder tower — was 4.50
  ...
}
```
- Thay đổi 1 dòng, ảnh hưởng ngay lập tức
- Cần verify không bị clip camera

**8b. Robot citizens: thêm ROBOT_TARGET_HEIGHT = 1.2**
```tsx
const CITIZEN_TARGET_HEIGHT = 1.7
const ROBOT_TARGET_HEIGHT = 1.2   // ← mới

// Trong CitizenMesh:
const targetH = tripoModel.isRobot ? ROBOT_TARGET_HEIGHT : CITIZEN_TARGET_HEIGHT
<TripoModel path={tripoModel.path} scale={targetH} autoNorm position={[0, 0, 0]} />
```
- Cần thêm flag `isRobot` hoặc check `avatar_type`

**8c. District buildings BLD_M: 3.50m → 4.50m**
```tsx
BLD_M: 4.50,  // was 3.50
```
- 4 districts thay đổi đồng loạt — cần verify không overlap

### Priority 2 — Medium Impact

**8d. AI Agent Lab BLD_L: 4.20m → 5.00m**
```tsx
BLD_L: 5.00,  // was 4.20
```

**8e. Team Office BLD_S: 3.50m → 4.00m**
```tsx
BLD_S: 4.00,  // was 3.50
```

**8f. Palm tree: 4.50m → 3.80m**
```tsx
PALM: 3.80,  // was 4.50
```

### Priority 3 — Fine Tuning

**8g. Tree scales (áp dụng theo bảng 6d)**
- Modify scale values in BETWEEN_BUILDING_TREES, BENCH_SHADE_TREES, COASTLINE_TREES arrays

**8h. Fountain: scale 0.012 → 0.013**
```tsx
<SyntyModel path="/assets/models/SM_Prop_Fountain_01.glb" position={[0, 0, 0]} scale={0.013} />
<SyntyModel path="/assets/models/SM_Prop_Fountain_Base_01.glb" position={[0, 0, 0]} scale={0.013} />
```

**8i. Bench và Bush: đo chính xác bằng script, rồi điều chỉnh**

---

## 9. Rủi Ro

| Rủi ro | Mức độ | Mitigations |
|--------|--------|------------|
| Founder Tower tăng 67% có thể che khuất districts khác | Trung bình | Verify camera angle sau thay đổi |
| Building height tăng có thể cần điều chỉnh district label position | Thấp | labelBaseY tính theo district.size, verify lại |
| Tree scale giảm nhỏ làm mất cảm giác bóng mát | Thấp | Giảm nhẹ 10-15%, không quá nhiều |
| Bench/Bush heights là ước lượng | Trung bình | Đo bằng script trước khi thay đổi scale |

---

## 10. Validation

| Bước | Trạng thái |
|------|-----------|
| Đọc HEIGHT constants từ code | ✅ |
| Tính tree heights từ calibration data | ✅ |
| So sánh với cozy scale targets | ✅ |
| Đề xuất scale factors | ✅ |
| Thay đổi code thực tế | ❌ Chưa — Phase 2F.8 |

---

*Báo cáo này chỉ là audit — không có code nào bị sửa. Tất cả thay đổi sẽ được áp dụng trong Phase 2F.8.*
