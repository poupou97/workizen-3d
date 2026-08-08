# Tripo Native Animation Strategy v01

Date: 2026-06-09

---

## Phương pháp

Không đoán. Không dùng docs (docs Tripo là SPA, WebFetch không đọc được).

Thực hiện probe thực tế:
- Submit từng preset candidate vào API
- Poll kết quả
- Inspect GLB output để đo bone names và animation targets
- Test `spec: "mixamo"` cho `animate_rig`

Credits tiêu trong quá trình audit: **~65 credits** (balance hiện tại: 950/1015).
Các task fail với `error_code: 1004` → `consumed_credit: 0` (không tốn credit).

---

## 1. Preset Nào Tồn Tại

### Đã test

| Preset | Kết quả | Error code |
|---|---|---|
| `preset:idle` | ✅ SUCCESS | — |
| `preset:walk` | ✅ SUCCESS | — |
| `preset:run` | ✅ SUCCESS | — |
| `preset:jump` | ✅ SUCCESS | — |
| `preset:wave` | ❌ FAILED | 1004 (invalid preset) |
| `preset:wave_hello` | ❌ FAILED | 1004 |
| `preset:sit` | ❌ FAILED | 1004 |
| `preset:talk` | ❌ FAILED | 1004 |
| `preset:look_around` | ❌ FAILED | 1004 |
| `preset:gesture` | ❌ FAILED | 1004 |
| `preset:dance` | ❌ FAILED | 1004 |
| `preset:jump_in_place` | ❌ FAILED | 1004 |
| `preset:clap` | ❌ FAILED | 1004 |
| `preset:typing` | ❌ FAILED | 1004 |
| `preset:shake_head` | ❌ FAILED | 1004 |
| `preset:cheer` | ❌ FAILED | 1004 |
| `preset:bow` | ❌ FAILED | 1004 |
| `preset:point` | ❌ FAILED | 1004 |
| `preset:think` | ❌ FAILED | 1004 |
| `preset:laugh` | ❌ FAILED | 1004 |
| `preset:run_in_place` | ⚠️ Rate limited | 2000 |
| `preset:nod` | ⚠️ Rate limited | 2000 |

**Kết luận: Chỉ có 4 preset hoạt động được. Thư viện Tripo animation rất hạn chế.**

`preset:run_in_place` và `preset:nod` bị rate-limited khi submit (quá nhiều task đồng thời), chưa xác định được là valid hay không.

---

## 2. Cấu trúc Animation Output (Bằng chứng thực tế)

Inspect GLB output của `preset:run` và `preset:jump`:

```
preset:run  | clips: 1 | animation targets: 11 / joints: 34 | nodes: 36
preset:jump | clips: 1 | animation targets: 11 / joints: 34 | nodes: 36
```

**Cả 4 preset đều chỉ animate 11 trong tổng 34 joint.**

Tên bone được animate (Tripo's proprietary naming):

```
tripo::Root
tripo::Head_0
tripo::Head_1
tripo::0_Left_Limb_0   (cánh tay trái — upper arm)
tripo::0_Left_Limb_1   (cẳng tay trái — forearm)
tripo::0_Right_Limb_0  (cánh tay phải)
tripo::0_Right_Limb_1  (cẳng tay phải)
tripo::0_Right_Limb_2  (bàn tay phải)
tripo::1_Left_Limb_0   (đùi trái)
tripo::1_Left_Limb_1   (ống chân trái)
tripo::1_Left_Limb_2   (bàn chân trái)
```

**Không animate:** ngón tay, spine detail, cổ, vai riêng, hông riêng, bàn chân phải, ...

**Bone naming convention: `tripo::*`** — không phải Mixamo-compatible (`mixamorig:*`).

---

## 3. Test spec: "mixamo" cho animate_rig

Kết quả:

| Tham số | Kết quả |
|---|---|
| `spec: "tripo"` | ✅ Rig success, animate_retarget hoạt động |
| `spec: "mixamo"` | ✅ Rig success (cost 25 credits), animate_retarget **FAIL error_code 1004** |

**Phân tích:**
- `spec: "mixamo"` cho `animate_rig` tạo ra skeleton với cấu trúc Mixamo
- Nhưng Tripo's `animate_retarget` chỉ hoạt động với `spec: "tripo"` rig
- `spec: "mixamo"` rig **không thể dùng được với bất kỳ Tripo preset nào**
- Output của `spec: "mixamo"` cũng là FBX binary (như `spec: "tripo"`)

**Kết luận về spec:mixamo:** Đây là tính năng để export rig sang Mixamo ecosystem (upload FBX lên Mixamo.com thủ công). Không có ích cho pipeline tự động.

---

## 4. Vấn đề Animation Chất Lượng

### Tại sao walk "bị tật" trong POC v1?

Bug đã được fix: tôi đã cross-apply Walk clip từ Walk.glb vào skeleton của Idle.glb. Bone targets (`tripo::*`) không bind đúng khi áp vào sai skeleton instance → chỉ một số bone animate được.

**Fix đã apply:** Mỗi GLB dùng skeleton của chính nó.

### Animation vẫn chưa tự nhiên do:

1. **Chỉ 11/34 bone animated** — không có finger detail, không có spine cascade
2. **Tripo preset quality** — walk/run/jump là preset đơn giản, không phải motion capture
3. **Không có arm swing tự nhiên trong walk** — tay move nhưng không swing như người đi thật
4. **Thiếu secondary motion** — không có hair, cloth physics, weight shifting

---

## 5. Khả năng Làm Animation Tự Nhiên Hơn

Với Tripo-native, các cải tiến khả thi trong Three.js:

### A. Procedural Head Bobbing (dễ)
```ts
// Add subtle up-down to group position synced to walk cycle
group.position.y = baseY + Math.sin(time * walkFreq) * 0.02
```

### B. Procedural Look-At (dễ)
```ts
// Rotate head bone toward camera or a target point
// AnimationMixer và manual rotation có thể combine
```

### C. Idle Breathing Overlay (trung bình)
```ts
// Add subtle chest scale oscillation
chestBone.scale.setScalar(1 + Math.sin(time * 0.8) * 0.012)
```

### D. Animation Speed Scaling (đơn giản)
```ts
// Match walk animation speed to movement speed
action.timeScale = moveSpeed / baseSpeed
```

### E. Transition Blending (đã có)
```ts
// Already using fadeIn/fadeOut — increase blend time for smoother transitions
action.reset().fadeIn(0.4).play()
```

---

## 6. Tripo-native Có Đủ Dùng Cho Workizen MVP Không?

### Đủ dùng nếu:
- Citizens chỉ cần locomotion: idle, walk, run
- Không cần gesture hay social interaction animation
- Chấp nhận animation quality thấp, phù hợp Synty low-poly aesthetic

### Không đủ nếu:
- Cần wave, talk, sit, gesture, typing
- Cần full-body rich animation
- Cần animation đủ chất lượng cho demo pitch

### Verdict: **Đủ dùng cho MVP locomotion**. Không đủ cho social interactions.

---

## 7. Danh Sách Animation Nên Dùng

| Animation | Preset | Dùng cho | Ưu tiên |
|---|---|---|---|
| Idle | `preset:idle` | Citizen đứng chờ, NPC tại chỗ | MVP bắt buộc |
| Walk | `preset:walk` | Citizen di chuyển ambient | MVP bắt buộc |
| Run | `preset:run` | Citizen vội vàng, event trigger | MVP nice-to-have |
| Jump | `preset:jump` | Celebration, event trigger | Post-MVP |

---

## 8. Animation Không Nên Dùng (Với Tripo-native)

| Animation | Lý do |
|---|---|
| `preset:wave` | Không tồn tại trong Tripo API |
| `preset:sit` | Không tồn tại |
| `preset:talk` | Không tồn tại |
| `preset:dance` | Không tồn tại |
| Bất kỳ Mixamo FBX nào | Bone naming `mixamorig:*` không tương thích với `tripo::*` skeleton |

---

## 9. Bước Tiếp Theo Để Animate 1 NPC Bằng Tripo-native

Dùng citizen test đã có: `human-plaza-01` / Layla Chen.

**Đã có:**
- `Idle.glb` — GLB với skeleton + idle animation (PASS validation)
- `Walk.glb` — GLB với skeleton + walk animation (PASS validation)
- `AnimatedModel.tsx` — component load + play animations
- `/animation-test` route — isolated test scene

**Bước tiếp theo:**
1. Tải thêm `Run.glb` từ `preset:run` (task `26515616-bba4-4b64-85e9-097a9f0e04c3`)
2. Thêm nút Run vào `/animation-test` để test visual
3. Khi visual pass → tích hợp vào `CitizenMesh` cho đúng 1 NPC (`human-plaza-01`)
4. Thêm animation state: khi citizen đang `wait` → idle, khi đang `move` → walk
5. Giữ toàn bộ citizen còn lại là static `TripoModel`
6. Verify không degrade performance (FPS so với trước)

**Rủi ro chính cần giữ:**
- Không rollout tất cả citizens cùng lúc — 1 animated NPC trước
- `Idle.glb` và `Walk.glb` mỗi file 6MB — cần preload strategy khi scale
- Mỗi animated citizen cần AnimationMixer riêng — memory linear với số citizens

---

## Tóm Tắt Cuối

| Câu hỏi | Câu trả lời |
|---|---|
| Tripo-native đủ dùng cho MVP không? | **Có, nếu MVP chỉ cần idle + walk** |
| Có bao nhiêu preset thực sự hoạt động? | **4: idle, walk, run, jump** |
| Có thể dùng Mixamo animation trực tiếp không? | **Không — bone naming không tương thích** |
| spec:mixamo có ích không? | **Không cho pipeline tự động** |
| Animation quality có thể improve không? | **Có, bằng procedural overlay trong Three.js** |
| Bước tiếp theo? | **Download Run.glb → test visual → integrate 1 NPC** |
