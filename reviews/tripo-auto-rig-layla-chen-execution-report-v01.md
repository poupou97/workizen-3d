# Tripo Auto Rig Layla Chen Execution Report v01

Date: 2026-06-09

## Tóm tắt

Mục tiêu là gọi Tripo API để tạo rigged character mới cho đúng một citizen test:

- Citizen: `human-plaza-01`
- Name: Layla Chen
- Không dùng lại file lỗi: `apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01_Rigged.glb`
- Không thay đổi scene chính.

## API Key

TRIPO_API_KEY found: yes

Nguồn key: `scripts/generate-campus-assets.mjs`

Không có API key nào được ghi vào report.

## Endpoint Đã Dùng

- GET /user/balance
- POST /task type=animate_prerigcheck
- POST /task type=animate_rig
- POST /task type=animate_retarget (Idle/Walk)
- GET /task/{task_id}
- download output model URL

## Input

```txt
apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01.glb
```

## Output

Rigged model (FBX — không dùng được trong Three.js trực tiếp):

```txt
apps/workizen-3d/public/assets/rigged/layla-chen/LaylaChen_Rigged.glb
```

Animations (GLB hợp lệ — đã pass validation):

```txt
Idle: apps/workizen-3d/public/assets/rigged/layla-chen/animations/Idle.glb
Walk: apps/workizen-3d/public/assets/rigged/layla-chen/animations/Walk.glb
Wave: Không tạo bằng Tripo (không có preset:wave trong API)
```

## Task ID Tripo

Source task id:

```txt
18e005d0-4e3b-4b52-a429-0bb2bf4ecb1f
```

Tasks:

- animate_prerigcheck: `373ef416-4809-4c10-ba0c-5b4310005530`
- animate_rig: `3ae7b4ff-3c3d-4134-9a71-5c87e0599cb4`
- animate_retarget_idle: `daf99617-91ab-4116-af81-35aa03eb70e5`
- animate_retarget_walk: `b8ddc9aa-67c5-4408-b895-1ed71da0f55d`

## Kết Quả Rigged Model

Rigged model tải về: yes

Lưu ý quan trọng: `LaylaChen_Rigged.glb` thực chất là **FBX binary** (magic bytes "Kaydara"). Tripo bỏ qua tham số `out_format: "glb"` cho task `animate_rig`. File này không load được trực tiếp trong Three.js bằng `GLTFLoader`.

## Xác Thực API

- auth check attempted: yes
- auth check success: yes
- auth message: ok
- balance trước: 1015
- balance sau: 970
- credits tiêu: 45

## Kết Quả Animation

- Idle: success — GLB hợp lệ, pass validation
- Walk: success — GLB hợp lệ, pass validation
- Wave: not created (Tripo không có preset:wave)

Ghi chú: `animate_retarget` với `export_with_geometry: true` và `bake_animation: true` tạo ra GLB có đầy đủ geometry + skeleton + animation baked-in. Đây là format dùng được trực tiếp trong Three.js.

## Validation — Idle.glb

- skeleton exists: yes
- skin count > 0: yes (1)
- joint count > 0: yes (34)
- có `JOINTS_0`: yes
- có `WEIGHTS_0`: yes
- bounding box không khổng lồ: yes (max bound: 0.999)
- animation clip count: 1
- animation target count: 11
- validation pass: **yes**

## Validation — Walk.glb

- skeleton exists: yes
- skin count > 0: yes (1)
- joint count > 0: yes (34)
- có `JOINTS_0`: yes
- có `WEIGHTS_0`: yes
- bounding box không khổng lồ: yes (max bound: 0.999)
- animation clip count: 1
- animation target count: 11
- validation pass: **yes**

## Validation — LaylaChen_Rigged.glb

- file format: **FBX binary** (không phải GLB)
- magic bytes: `0x6479614b` ("Kaydara") — không phải `0x46546c67` ("glTF")
- validation pass: **no** (sai format)

Validation này là kiểm tra cấu trúc GLB sơ bộ. Chưa đưa asset vào scene chính.

## Log Sự Kiện

- Xác thực Tripo API thành công qua GET /user/balance.
- Dùng original_model_task_id có sẵn từ output/tripo-generation-report.json.
- Pre-rig check hoàn tất: riggable/unknown.
- animate_rig task success — file tải về nhưng là FBX binary, không phải GLB.
- animate_retarget Idle thành công — GLB hợp lệ với geometry + skeleton + animation.
- animate_retarget Walk thành công — GLB hợp lệ với geometry + skeleton + animation.

## Warning / Error

- Không tạo được STS upload session từ endpoint đã thử; fallback sang task id generation có sẵn.
- Tripo không liệt kê preset:wave; không gọi Wave bằng Tripo retarget.
- `LaylaChen_Rigged.glb` là FBX binary, không dùng trực tiếp trong Three.js. Dùng Idle.glb hoặc Walk.glb làm source geometry thay thế (cả hai đều có `export_with_geometry: true`).

## Có Thể Tiếp Tục AnimatedModel POC Chưa?

**Có thể tiếp tục**, với điều kiện sau:

- Dùng `Idle.glb` làm character base (có geometry + skeleton + idle animation).
- Dùng `Walk.glb` để extract walk animation clip.
- Không dùng `LaylaChen_Rigged.glb` vì đây là FBX.
- Wave animation: cần giải pháp khác (Mixamo export hoặc tạo thủ công).

Bước tiếp theo theo plan `animation-option-b-valid-rigged-asset-plan.md`:

1. Chạy offline inspection script trên thư mục rigged mới.
2. Render rigged model trong isolated test scene hoặc hidden route.
3. Sau khi visual pass → mới tạo AnimatedModel POC cho `human-plaza-01`.
4. Verify bằng Playwright screenshot và console capture.

## Ràng Buộc Đã Giữ

- Không dùng lại `SM_Chr_HumanCitizen_01_Rigged.glb` cũ.
- Không animate toàn bộ citizens.
- Không sửa static `TripoModel`.
- Không đổi camera.
- Không đổi layout.
- Không refactor scene.
- Không xóa asset cũ.
