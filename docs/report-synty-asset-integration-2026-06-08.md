# Báo Cáo: Tích Hợp Synty Polygon Town Assets
**Ngày:** 2026-06-08  
**Thực hiện:** Claude Code  
**Trạng thái:** Hoàn thành — đang hoạt động

---

## 1. Mục Tiêu

Tích hợp assets từ pack **Synty Studios - POLYGON Town Pack** (đã mua) vào scene 3D Workizen HQ Campus, thay thế các geometry procedural (box, sphere, cone) bằng model thật từ pack.

---

## 2. Bối Cảnh Kỹ Thuật

| Thành phần | Công nghệ |
|---|---|
| Rendering engine | Three.js v0.184 |
| React wrapper | React Three Fiber (R3F) v9 |
| Helpers | @react-three/drei v10.7 |
| Format assets gốc | FBX / OBJ (Unity/Unreal) |
| Format sau convert | **GLB** (native Three.js) |
| Texture | Synty palette atlas PNG |

**Vấn đề trước khi làm:** 100% scene dùng procedural geometry, không có model thật nào được load.

---

## 3. Công Việc Đã Thực Hiện

### 3.1 Chuyển đổi OBJ → GLB (17 files)

Dùng công cụ `obj2gltf v3.2.0` để convert từ định dạng Unity/Unreal sang GLB web-ready.

**Scale:** `0.01` (Synty export ở đơn vị cm, scene dùng đơn vị m)

| File gốc (OBJ) | File output (GLB) | Kích thước | Danh mục |
|---|---|---|---|
| SM_Generic_Tree_01.obj | SM_Generic_Tree_01.glb | 60K | Cây xanh |
| SM_Generic_Tree_02.obj | SM_Generic_Tree_02.glb | 30K | Cây xanh |
| SM_Generic_Tree_03.obj | SM_Generic_Tree_03.glb | 28K | Cây xanh |
| SM_Generic_Tree_04.obj | SM_Generic_Tree_04.glb | 33K | Cây xanh |
| SM_Env_Bush_01.obj | SM_Env_Bush_01.glb | 31K | Bụi cây |
| SM_Env_Bush_02.obj | SM_Env_Bush_02.glb | 22K | Bụi cây |
| SM_Env_FlowerPatch_01.obj | SM_Env_FlowerPatch_01.glb | 24K | Hoa |
| SM_Env_FlowerPatch_02.obj | SM_Env_FlowerPatch_02.glb | 17K | Hoa |
| SM_Prop_ParkBench_01.obj | SM_Prop_ParkBench_01.glb | 39K | Ghế công viên |
| SM_Prop_Streetlamp_01.obj | SM_Prop_Streetlamp_01.glb | 17K | Cột đèn |
| SM_Prop_Streetlamp_02.obj | SM_Prop_Streetlamp_02.glb | 12K | Cột đèn |
| SM_Bld_House_Preset_01.obj | SM_Bld_House_Preset_01.glb | 309K | Tòa nhà (sẵn sàng) |
| SM_Bld_House_Preset_02.obj | SM_Bld_House_Preset_02.glb | 78K | Tòa nhà (sẵn sàng) |
| SM_Bld_House_Preset_03.obj | SM_Bld_House_Preset_03.glb | 494K | Tòa nhà (sẵn sàng) |
| SM_Bld_Shop_01.obj | SM_Bld_Shop_01.glb | 95K | Cửa hàng (sẵn sàng) |
| SM_Bld_Shop_02.obj | SM_Bld_Shop_02.glb | 84K | Cửa hàng (sẵn sàng) |
| SM_Bld_Shop_03.obj | SM_Bld_Shop_03.glb | 84K | Cửa hàng (sẵn sàng) |

### 3.2 Files đã tạo / thay đổi

```
apps/workizen-3d/public/
├── assets/
│   ├── manifest.json                        ← MỚI: bảng mục lục assets
│   ├── models/
│   │   └── *.glb (17 files)                 ← MỚI: model thật từ Synty
│   └── textures/
│       └── PolygonTown_Texture_01_A.png     ← MỚI: Synty palette texture

src/features/campus/
└── CampusScene.tsx                          ← SỬA: thêm SyntyModel component
```

### 3.3 Thay đổi trong CampusScene.tsx

**Thêm imports:**
```tsx
import { useGLTF, useTexture } from "@react-three/drei"
import { useMemo } from "react"
import * as THREE from "three"
```

**Thêm `SyntyModel` component** — load GLB + apply palette texture:
```tsx
function SyntyModel({ path, scale, position, rotation, yOffset }) {
  const { scene } = useGLTF(path)           // load GLB (cached)
  const palette = useTexture(SYNTY_PALETTE) // load texture (cached)
  const cloned = useMemo(() => {
    // clone scene, apply palette texture lên tất cả meshes
    ...
  }, [scene, palette])
  return <primitive object={cloned} ... />
}
```

**5 components được thay thế** (procedural → Synty model thật):

| Component | Trước | Sau |
|---|---|---|
| `Tree` | 3 variants box/cone/sphere | 4 Synty GLB variants |
| `BushCluster` | 3 sphere clusters | 2 Synty bush GLBs |
| `FlowerPatch` | circle + sphere flowers | 2 Synty flower GLBs |
| `Bench` | box geometry | Synty ParkBench GLB |
| `Lamp` | cylinder + sphere | Synty Streetlamp GLB |

**Preload tất cả models** để tránh loading jank khi render.

---

## 4. Cách Kiểm Tra

### Bước 1: Chạy app
```bash
cd /Users/alexnguyen/projects/workizen-3d/apps/workizen-3d
npm run dev
```
Mở trình duyệt: `http://localhost:3333`

### Bước 2: Kiểm tra visual

Nhìn vào scene 3D và so sánh:

| Thành phần | Kết quả mong đợi |
|---|---|
| **Cây xanh** | Low-poly Synty style, nhiều loại khác nhau, có UV texture |
| **Cột đèn** | Synty streetlamp cao, có chi tiết (không phải cylinder đơn giản) |
| **Ghế công viên** | Synty park bench có tay vịn và lưng tựa |
| **Bụi cây** | Synty bush 3D thay vì sphere procedural |
| **Hoa** | Synty flower patch |

### Bước 3: Kiểm tra Console (F12 → Console)

Không nên có lỗi liên quan đến:
- `Failed to load resource` (file GLB không tìm thấy)
- `THREE.WebGLRenderer: Texture is not power of two` (warning nhỏ, không ảnh hưởng)

### Bước 4: Kiểm tra Network tab (F12 → Network)

Filter bằng `.glb` → nên thấy 11 file GLB được tải thành công (status 200).

---

## 5. Giới Hạn Hiện Tại

| Vấn đề | Lý do | Giải pháp tương lai |
|---|---|---|
| Tòa nhà vẫn procedural | Polygon Town là pack nhà phố, không có tòa nhà futuristic | Mua thêm Synty Sci-Fi pack |
| Robot characters chưa có | Pack không có robot model | Mua POLYGON Robots pack |
| Màu texture có thể lệch | OBJ không có MTL file, UV map từ Maya | Export lại với MTL hoặc dùng Blender |
| Tòa nhà preset chưa dùng | Đã convert sẵn (6 files) nhưng chưa replace trong scene | Bước tiếp theo |

---

## 6. Bước Tiếp Theo

- [ ] Replace tòa nhà procedural bằng `SM_Bld_House_Preset_*` và `SM_Bld_Shop_*`
- [ ] Convert thêm props: ghế ngoài trời, bảng hiệu, hàng rào
- [ ] Mua Synty Sci-Fi pack cho AI Agent Lab building
- [ ] Mua robot character pack cho AI Citizens
- [ ] Tạo manifest tự động từ toàn bộ 692 OBJ files
