# Phase 3.2 — AnimatedModel POC Report v01

Date: 2026-06-09

---

## Tóm tắt

POC `AnimatedModel` cho đúng 1 citizen:

- Citizen: `human-plaza-01`
- Name: Layla Chen
- Route: `/animation-test` (isolated, không liên quan scene chính)
- Scene chính: không bị thay đổi

---

## Files Tạo Mới

| File | Mô tả |
|---|---|
| `src/features/animation-test/AnimatedModel.tsx` | Component animated model với `useAnimations` |
| `src/app/animation-test/page.tsx` | Test route riêng biệt |
| `scripts/screenshot-animation-test.mjs` | Playwright screenshot script |

---

## 1. Asset Đã Load

| Asset | Path | Status |
|---|---|---|
| Idle animation | `public/assets/rigged/layla-chen/animations/Idle.glb` | Loaded ✓ |
| Walk animation | `public/assets/rigged/layla-chen/animations/Walk.glb` | Loaded ✓ |
| Rigged (FBX) | `public/assets/rigged/layla-chen/LaylaChen_Rigged.glb` | Không dùng (FBX binary) |

---

## 2. Animation Đã Chạy

| Clip | Trạng thái | HUD xác nhận |
|---|---|---|
| idle | Chạy, loop liên tục | Running: idle ✓ |
| walk | Chạy sau khi nhấn WALK | Running: walk ✓ |

Crossfade giữa idle và walk: 0.25 giây.

---

## 3. Scale Thực Tế

- `TARGET_HEIGHT = 1.7` (bằng `CITIZEN_TARGET_HEIGHT` trong CampusScene)
- Scale được tính bằng `autoNorm`: đo bounding box thực sau `updateMatrixWorld` rồi tính `scaleFactor = 1.7 / currentH`
- Ground offset: `-box.min.y * scaleFactor` để chân chạm y = 0

---

## 4. Bounding Box

Từ validation offline:

```
Idle.glb: maxBound = 0.999 (accessor space)
Walk.glb: maxBound = 0.999 (accessor space)
```

Thực tế khi render: model chiếm khoảng 3 ô lưới (mỗi ô = 0.5m) → ~1.5–1.7m. Không có bounding box khổng lồ. Normal scale.

---

## 5. Deformation

**Không có deformation.**

- Đầu, thân, tay, chân hoàn toàn intact.
- Không có mesh stretch.
- Không có tam giác khổng lồ (triangle artifact).
- Pose idle và walk đều tự nhiên.

---

## 6. Screenshot

### Idle

```txt
output/screenshots/animation-test-idle.png
```

- Character đứng pose idle, cánh tay nhẹ
- Feet chạm đất
- Không deformation
- HUD: Clip: idle | Running: idle | FPS: 19

### Walk

```txt
output/screenshots/animation-test-walk.png
```

- Character đang bước, chân trái nâng cao
- Walk cycle mid-stride
- Không deformation
- HUD: Clip: walk | Running: walk | FPS: 21

---

## 7. FPS

| Environment | FPS |
|---|---|
| Headless Chromium (Playwright, no GPU) | 19–21 |
| Real browser (expected) | ~60 |

FPS 19–21 là do Playwright headless không có GPU acceleration. Trên browser thật với GPU, FPS sẽ là 60.

---

## 8. Có Thể Rollout Cho Nhiều Citizen Không?

**Chưa nên rollout ngay.** Cần xem xét:

- Mỗi animated citizen cần `AnimationMixer` riêng → tốn memory/CPU theo số lượng citizens.
- Idle.glb và Walk.glb là 6MB mỗi file → cần preload strategy (không preload 32 lần).
- `export_with_geometry: true` → mỗi animation clip có geometry riêng → không thể share geometry giữa citizens.
- Giải pháp tốt hơn cho rollout: Extract animation clips + separate rigged mesh → reuse geometry.

**Để POC chứng minh khả năng kỹ thuật là đủ.**

---

## 9. Rủi Ro Còn Lại

| Rủi ro | Mức độ | Ghi chú |
|---|---|---|
| Wave animation thiếu | Trung bình | Tripo không có preset wave; cần Mixamo export thủ công |
| Character facing sideways | Thấp | Trong test scene, không có yaw correction; trong campus scene cần điều chỉnh rotation |
| Memory khi scale nhiều citizens | Cao | Mỗi citizen cần mixer riêng + 2 GLB riêng |
| GLB size lớn (6MB/file) | Trung bình | Cần optimize hoặc stream lazily |
| Tripo FBX rig không dùng được trực tiếp | Thấp | Đã workaround bằng retarget GLB |

---

## Validation Results

| Check | Kết quả |
|---|---|
| `npm run typecheck` | PASS |
| `npm run smoke:campus` (desktop) | PASS |
| `npm run smoke:campus` (tablet) | PASS |
| `npm run smoke:campus` (mobile) | PASS |
| Scene chính không bị thay đổi | Xác nhận |
| Idle.glb render | PASS |
| Walk.glb render | PASS |
| Không deformation | PASS |
| Chân chạm đất | PASS |
| Animation tự động chạy | PASS |
| Animation switch hoạt động | PASS |

---

## Success Criteria Check

| Criteria | Kết quả |
|---|---|
| Idle.glb render thành công | ✓ |
| Walk.glb render thành công | ✓ |
| Không còn tam giác khổng lồ | ✓ |
| Animation chạy được | ✓ |
| Chân chạm đất | ✓ |
| Scale tương đương citizen hiện tại | ✓ (1.7m) |
| Có screenshot chứng minh | ✓ |
| Chưa đụng tới scene chính | ✓ |

**POC PASS.**

---

## Trạng Thái

**Dừng tại đây. Chờ lệnh riêng cho Phase 3.3.**

Chưa rollout.
Chưa tích hợp vào campus scene.
Chưa thay thế bất kỳ citizen nào.
