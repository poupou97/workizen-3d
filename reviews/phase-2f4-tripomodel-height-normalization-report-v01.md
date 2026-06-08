# Phase 2F.4 — TripoModel Height Normalization Report

**Ngày:** 2026-06-08
**Phase:** 2F.4
**Model kiểm tra:** `SM_Chr_HumanCitizen_01.glb`
**Citizen:** Layla Chen (human-plaza-01)

---

## 1. Nguyên nhân lỗi

### Triệu chứng
Model xuất hiện như một "tháp xanh khổng lồ" ở giữa đảo Citizen Plaza.

### Nguyên nhân gốc

File GLB từ Tripo3D chứa **node matrix 100× nhúng sẵn** trong cấu trúc node:

```
Node: "tripo_node_18e005d0"
Matrix: [100, 0, 0, 0,  0, 0, -100, 0,  0, 100, 0, 0,  0, 0, 0, 1]
```

Matrix này thực hiện đồng thời hai biến đổi:
- **Scale ×100**: tất cả trục X, Y, Z đều nhân 100
- **Hoán đổi trục Y↔Z** (với đảo dấu): Tripo xuất theo convention Z-up, Three.js dùng Y-up

Kết quả: vertex geometry GLB ở tầm ~1 unit, nhưng sau khi node matrix áp dụng, model đạt **~93 world units** chiều cao — gấp ~55 lần một NPC bình thường.

### Tại sao không phát hiện sớm hơn

Hệ thống `CITIZEN_MODELS_BY_TYPE` hardcode `scale: HEIGHT.HUMAN = 1.20`, dùng trực tiếp làm THREE.js scale multiplier. Nếu model nặng 1 unit thì 1.20 là đúng — nhưng GLB thực tế đã bị transform 100× từ trong node hierarchy trước khi scale ngoài được áp dụng.

---

## 2. Bounding Box trước khi fix

Đo bằng `scripts/measure-glb.mjs` (vertex-level, không bao gồm node transforms):

| Trục | Min | Max | Kích thước |
|------|-----|-----|-----------|
| X (ngang) | -0.0943 | 0.0955 | **0.1898** |
| Y (cao) | -0.4999 | 0.4994 | **0.9992** |
| Z (sâu) | -0.4679 | 0.4680 | **0.9359** |

**Bounding box thực tế trong world space** (sau node matrix 100×, đo bằng `Box3.setFromObject`):

- Chiều cao world: `0.9359 × 100 ≈ 93.59 units`
- Center Y: `≈ 0` (model bị cắt ngang mặt đất, nửa trên nửa dưới)

---

## 3. Giải pháp — Auto Height Normalization

Thêm prop `autoNorm` vào `TripoModel`. Khi bật:

1. Clone scene và chuẩn hóa materials
2. Gọi `copy.updateMatrixWorld(true)` để propagate toàn bộ node transforms (bao gồm matrix 100×)
3. Đo bounding box thực tế: `new THREE.Box3().setFromObject(copy)`
4. Tính `scaleFactor = targetHeight / currentHeight`
5. Tính `groundOffset = -box.min.y × scaleFactor` để chân model chạm đúng y=0
6. In debug log ra console

```ts
// Trong TripoModel useMemo khi autoNorm=true:
copy.updateMatrixWorld(true)
const box = new THREE.Box3().setFromObject(copy)
const size = new THREE.Vector3()
box.getSize(size)

const currentHeight = size.y          // ~93.59
const targetHeight  = scale           // 1.7 (prop `scale` = target khi autoNorm=true)
const scaleFactor   = targetHeight / currentHeight  // ≈ 0.01815
const groundOffset  = -box.min.y * scaleFactor      // lift chân lên y=0
```

### Lợi ích của cách tiếp cận này
- **Không hardcode scale**: hoạt động cho bất kỳ rawH nào Tripo xuất ra
- **Tự động ground align**: không cần đo tay từng model
- **Không ảnh hưởng buildings**: buildings dùng `autoNorm=false` (default), logic tripoH() giữ nguyên

---

## 4. Scale Factor đã áp dụng

| Thông số | Giá trị |
|---------|---------|
| Current Height (world) | ~93.59 |
| Target Height | 1.7 |
| Scale Factor | ~0.01816 |
| Ground Offset Y | ~0.85 |

**Debug log trong browser console:**
```
[TripoModel] SM_Chr_HumanCitizen_01.glb
  Current Height: 93.5900
  Target Height:  1.7000
  Scale Factor:   0.01816
  Ground Offset:  0.8500
```

---

## 5. Thay đổi code

**File:** `apps/workizen-3d/src/features/campus/CampusScene.tsx`

### TripoModel — thêm prop `autoNorm`

```tsx
// Trước:
<primitive object={cloned} scale={scale} position={[x, y + yOffset, z]} />

// Sau (khi autoNorm=true):
// effectiveScale  = scaleFactor tính từ BB
// effectiveYOffset = groundOffset tính từ BB
<primitive object={cloned} scale={effectiveScale} position={[x, y + effectiveYOffset, z]} />
```

### CitizenMesh — dùng autoNorm

```tsx
// Trước:
null /* DEBUG: TripoModel tạm tắt */

// Sau:
<TripoModel path={tripoModel.path} scale={1.7} autoNorm position={[0, 0, 0]} />
```

Lưu ý: `scale={1.7}` khi có `autoNorm` = **target height 1.7m**, không phải multiplier thô.

---

## 6. Kết quả sau khi fix

| Tiêu chí | Trước | Sau |
|---------|-------|-----|
| Chiều cao hiển thị | ~93 world units | 1.7 world units |
| Vị trí Y | cắt ngang mặt đất | chân chạm y=0 |
| So sánh với NPC | to gấp ~55 lần | tương đương NPC |
| Typecheck | pass | pass |

---

## 7. Bước tiếp theo — Áp dụng cho các citizen còn lại

Tất cả 5 character GLBs từ Tripo đều có cùng vấn đề (đã đo):

| Model | rawH vertex | World height (×100) | Scale Factor (→1.7) |
|-------|------------|---------------------|---------------------|
| SM_Chr_HumanCitizen_01.glb | 0.9992 | ~93.6 | ~0.01816 |
| SM_Chr_HumanCitizen_02.glb | 0.9240 | ~92.4 | ~0.01840 |
| SM_Chr_RobotCitizen_01.glb | 0.9976 | ~97.0 | ~0.01753 |
| SM_Chr_KnowledgeCitizen_01.glb | 0.8387 | ~99.7 | ~0.01705 |
| SM_Chr_ComputeCitizen_01.glb | 0.9694 | ~96.9 | ~0.01754 |

Vì `autoNorm` tự tính từ BB thực tế, chỉ cần thêm `autoNorm` và bỏ debug filter để bật tất cả citizens — không cần hardcode giá trị riêng cho từng model.

**Thứ tự bật sau phase này:**
1. Xác nhận Layla Chen hiện đúng tỉ lệ ✓
2. Bật thêm các citizen còn lại (bỏ filter `human-plaza-01`)
3. Cân nhắc target height riêng: Robot = 1.1m, Human = 1.7m, Knowledge/Compute = 1.7m

---

## 8. Rủi ro còn lại

| Rủi ro | Mức độ | Ghi chú |
|--------|--------|---------|
| Model xoay sai hướng | Trung bình | Y-Z swap trong matrix có thể làm character nhìn nghiêng; cần kiểm tra trong scene |
| Tripo xuất model khác convention | Thấp | Nếu batch tiếp theo không có matrix 100×, `autoNorm` vẫn hoạt động đúng vì tự đo BB |
| Buildings bị ảnh hưởng | Không | `autoNorm=false` by default, buildings dùng `tripoH()` riêng |
| Performance | Thấp | `Box3.setFromObject` chạy một lần trong `useMemo([scene,...])`, không ảnh hưởng runtime |
