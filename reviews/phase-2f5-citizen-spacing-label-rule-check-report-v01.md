# Phase 2F.5 — Citizen Spacing & Label Rule Check Report

**Ngày:** 2026-06-08
**Phase:** 2F.5
**Citizen kiểm tra:** Layla Chen (`human-plaza-01`)
**Model:** `SM_Chr_HumanCitizen_01.glb`
**Chiều cao sau autoNorm:** 1.7m

---

## 1. Rule tìm thấy trong codebase

### HEIGHT Constants (`CampusScene.tsx` dòng 64–83)

| Tên | Giá trị | Dùng cho |
|-----|---------|---------|
| `HEIGHT.HUMAN` | 1.20m | Cũ — từng dùng trực tiếp làm scale, nay chỉ còn trong `CITIZEN_MODELS_BY_TYPE` |
| `HEIGHT.ROBOT` | 1.10m | AI agent robot |
| `HEIGHT.DEVICE` | 0.85m | Compute terminal (procedural) |
| `CITIZEN_TARGET_HEIGHT` | **1.7m** | Target height mới cho tất cả autoNorm citizens |

### Label Offset Rule (`CitizenMesh`)

```tsx
labelBaseY = CITIZEN_TARGET_HEIGHT + 0.2  // = 1.9m
```

Label và badge nằm lần lượt tại `y = 1.9` và `y = 1.62` (= 1.9 - 0.28).

### Float Rule

Tất cả citizen dùng `<Float speed={0.85} rotationIntensity={0.04} floatIntensity={0.07}>` — dao động nhẹ, không ảnh hưởng spacing thực tế vì biên độ < 0.1m.

---

## 2. Kiểm tra Layla Chen — vị trí `[-0.4, 0, 1.8]`

### 2a. Chân chạm đất

| Kiểm tra | Kết quả |
|---------|---------|
| Ground offset tính từ `autoNorm` | `groundOffset = -box.min.y × scaleFactor ≈ 0.85m` |
| Vị trí Y của `<group>` | `y = 0` |
| Vị trí Y của `<primitive>` | `y = 0 + groundOffset = 0.85` |
| Kết quả | ✅ Chân model nằm đúng tại y=0 (mặt đất) |

### 2b. Label trên đầu

| Trạng thái | Giá trị |
|-----------|---------|
| **Trước fix** | `labelBaseY = tripoModel.scale + 0.2 = 1.20 + 0.2 = 1.40m` — label nằm ở **vai** |
| **Sau fix** | `labelBaseY = CITIZEN_TARGET_HEIGHT + 0.2 = 1.7 + 0.2 = 1.90m` — label nằm **trên đầu** |
| Name label Y | 1.90m ✅ |
| Type badge Y | 1.62m (= 1.90 - 0.28) ✅ |

### 2c. Khoảng cách với các objects trong Citizen Plaza

Fountain base radius ≈ 0.9m (Synty scale=0.012, ~1.82m diameter).
Bench footprint ≈ 0.5m × 1.5m. Lamp post radius ≈ 0.05m.
Tree crown radius ≈ 0.3–0.5m (scale=0.005–0.006).

| Object | Vị trí | Khoảng cách đến Layla | Clearance | Đánh giá |
|--------|--------|----------------------|-----------|----------|
| Fountain center | `[0, 0, 0]` | **1.84m** | 0.94m từ fountain edge | ✅ OK |
| InfoBoard "CAMPUS MAP" | `[0, 0, 3.05]` | **1.31m** | Layla đứng PHÍA TRƯỚC board, không xuyên | ✅ OK |
| InfoBoard "WELCOME BOARD" | `[-2.75, 0, 2.6]` | **2.48m** | Thoải mái | ✅ OK |
| InfoBoard "CITIZEN REGISTRY" | `[2.75, 0, 2.6]` | **3.25m** | Thoải mái | ✅ OK |
| SignBoard "CITIZEN PLAZA" | `[0, 1.24, 3.35]` | **1.60m** | Layla đứng phía trước, không xuyên | ✅ OK |
| Bench NW | `[-2.2, 0, 1.35]` | **1.86m** | 1.4m từ bench edge | ✅ OK |
| Bench NE | `[2.2, 0, 1.35]` | **2.64m** | Thoải mái | ✅ OK |
| Bench SW | `[-2.2, 0, -1.4]` | **3.67m** | Thoải mái | ✅ OK |
| Bench SE | `[2.2, 0, -1.4]` | **4.12m** | Thoải mái | ✅ OK |
| Lamp NW | `[-2.85, 0, 2.4]` | **2.52m** | Thoải mái | ✅ OK |
| Lamp NE | `[2.85, 0, 2.4]` | **3.30m** | Thoải mái | ✅ OK |
| Lamp SW | `[-2.85, 0, -2.4]` | **4.89m** | Thoải mái | ✅ OK |
| Lamp SE | `[2.85, 0, -2.4]` | **5.21m** | Thoải mái | ✅ OK |
| Small tree NW | `[-2.8, 0, 2.25]` | **2.44m** | Thoải mái | ✅ OK |
| Small tree NE | `[2.8, 0, 2.25]` | **3.23m** | Thoải mái | ✅ OK |
| Small tree N | `[0, 0, 3.65]` | **1.89m** | 1.4m từ canopy edge | ✅ OK |

**Kết luận:** Không có vi phạm spacing nào. Vị trí `[-0.4, 0, 1.8]` hợp lệ.

---

## 3. Vị trí trước/sau

| Thuộc tính | Trước | Sau |
|-----------|-------|-----|
| Coordinates | `[-0.4, 0, 1.8]` | `[-0.4, 0, 1.8]` (**không đổi**) |
| Label Y | 1.40m (ở vai) | **1.90m (trên đầu)** |
| Type badge Y | 1.12m | **1.62m** |
| Model height | 1.7m (autoNorm) | 1.7m (không đổi) |

Không cần dời vị trí vì không có vi phạm khoảng cách.

---

## 4. Thay đổi code thực hiện

### `CampusScene.tsx`

**Thêm constant** (dòng ~1291):
```tsx
const CITIZEN_TARGET_HEIGHT = 1.7
```

**Fix labelBaseY** (CitizenMesh):
```tsx
// Trước:
const labelBaseY = isComputeDevice ? HEIGHT.DEVICE : (tripoModel ? tripoModel.scale + 0.2 : 1.35)
// = 1.20 + 0.2 = 1.40 → label ở vai ❌

// Sau:
const labelBaseY = isComputeDevice ? HEIGHT.DEVICE : (tripoModel ? CITIZEN_TARGET_HEIGHT + 0.2 : 1.35)
// = 1.7 + 0.2 = 1.90 → label trên đầu ✅
```

**Thống nhất TripoModel scale**:
```tsx
// Trước:
<TripoModel path={tripoModel.path} scale={1.7} autoNorm position={[0, 0, 0]} />

// Sau:
<TripoModel path={tripoModel.path} scale={CITIZEN_TARGET_HEIGHT} autoNorm position={[0, 0, 0]} />
```

---

## 5. Kết quả cuối cùng

| Tiêu chí | Kết quả |
|---------|---------|
| Chân chạm đất | ✅ y=0, không chìm, không lơ lửng |
| Label trên đầu | ✅ y=1.90m |
| Label xuyên model | ✅ Không — label y=1.90 > chiều cao model 1.70 |
| Khoảng cách fountain | ✅ 1.84m (clearance 0.94m) |
| Khoảng cách bench gần nhất | ✅ 1.86m |
| Khoảng cách lamp gần nhất | ✅ 2.52m |
| Khoảng cách tree gần nhất | ✅ 1.89m |
| Typecheck | ✅ Pass — 0 errors |

---

## 6. Bước tiếp theo

Khi bật các citizen còn lại (bỏ filter `human-plaza-01`), các model dùng `autoNorm` sẽ tự normalize về `CITIZEN_TARGET_HEIGHT = 1.7`. Nếu muốn Robot nhỏ hơn (1.1m), cần tách constant riêng cho `agent-placeholder`:

```tsx
// Sau này:
const ROBOT_TARGET_HEIGHT = 1.1
// "agent-placeholder": scale = ROBOT_TARGET_HEIGHT
```
