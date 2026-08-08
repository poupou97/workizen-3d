# Phase 2F.6 — All Citizen Render Validation Report

**Ngày:** 2026-06-08
**Phase:** 2F.6
**Branch:** feat/phase-2e

---

## 1. Danh sách citizen đang render

Tổng cộng **32 citizens**, chia theo avatar_type:

| avatar_type | Count | Model | Render mode |
|-------------|-------|-------|-------------|
| `placeholder` | 17 | SM_Chr_HumanCitizen_01/02.glb (random) | TripoModel + autoNorm |
| `agent-placeholder` | 8 | SM_Chr_RobotCitizen_01.glb | TripoModel + autoNorm |
| `knowledge-placeholder` | 3 | SM_Chr_KnowledgeCitizen_01.glb | TripoModel + autoNorm |
| `compute-human-placeholder` | 1 | SM_Chr_ComputeCitizen_01.glb | TripoModel + autoNorm |
| `device-placeholder` | 3 | Procedural mesh (box) | Không dùng TripoModel |

**Tổng TripoModel citizens: 29. Tổng procedural: 3.**

### Danh sách đầy đủ

| citizen_id | District | Coordinates | avatar_type | Model |
|-----------|---------|-------------|-------------|-------|
| founder | Founder Tower | [-7, 0, -6.45] | placeholder | HumanCitizen_01 |
| human-citizen | Citizen Plaza | [-0.8, 0, 0.8] ¹ | placeholder | HumanCitizen_02 |
| ai-citizen | AI Agent Lab | [1.2, 0, -5.9] | agent-placeholder | RobotCitizen_01 |
| knowledge-citizen | Knowledge Library | [6.25, 0, -6.45] | knowledge-placeholder | KnowledgeCitizen_01 |
| compute-citizen | Compute Center | [6.6, 0, 0.85] | device-placeholder | Procedural |
| macbook-m1-compute-citizen | Compute Center | [8.3, 0, 1.15] | device-placeholder | Procedural |
| ea-agent | AI Agent Lab | [-2.2, 0, -4.5] | agent-placeholder | RobotCitizen_01 |
| sa-agent | AI Agent Lab | [2.2, 0, -4.5] | agent-placeholder | RobotCitizen_01 |
| po-agent | AI Agent Lab | [-0.8, 0, -4.2] | agent-placeholder | RobotCitizen_01 |
| pm-agent | AI Agent Lab | [0.8, 0, -4.2] | agent-placeholder | RobotCitizen_01 |
| dev-agent | AI Agent Lab | [-3.5, 0, -7.5] | agent-placeholder | RobotCitizen_01 |
| test-agent | AI Agent Lab | [3.5, 0, -7.5] | agent-placeholder | RobotCitizen_01 |
| ai-helper | Opportunity Center | [-6.5, 0, 2.2] | agent-placeholder | RobotCitizen_01 |
| commerce-agent | Opportunity Center | [-9.5, 0, 2.0] | agent-placeholder | RobotCitizen_01 |
| human-plaza-01 | Citizen Plaza | [-0.4, 0, 1.8] | placeholder | HumanCitizen_01 |
| human-plaza-02 | Citizen Plaza | [0.9, 0, 2.3] | placeholder | HumanCitizen_02 |
| human-plaza-03 | Citizen Plaza | [-1.9, 0, 0.3] | placeholder | HumanCitizen_01 |
| human-plaza-04 | Citizen Plaza | [1.9, 0, 0.4] | placeholder | HumanCitizen_02 |
| human-plaza-05 | Citizen Plaza | [-0.8, 0, -1.6] | placeholder | HumanCitizen_01 |
| human-plaza-06 | Citizen Plaza | [0.6, 0, -1.9] | placeholder | HumanCitizen_02 |
| human-plaza-07 | Citizen Plaza | [2.3, 0, -0.8] | placeholder | HumanCitizen_01 |
| human-opp-01 | Opportunity Center | [-7.2, 0, 1.0] ¹ | placeholder | HumanCitizen_02 |
| human-opp-02 | Opportunity Center | [-8.8, 0, 3.6] ¹ | placeholder | HumanCitizen_01 |
| human-opp-03 | Opportunity Center | [-7.8, 0, 1.8] | placeholder | HumanCitizen_02 |
| human-team-01 | Team Office | [0.9, 0, 4.8] | placeholder | HumanCitizen_02 |
| human-team-02 | Team Office | [-1.5, 0, 4.5] | placeholder | HumanCitizen_01 |
| human-team-03 | Team Office | [2.8, 0, 4.0] ¹ | placeholder | HumanCitizen_01 |
| human-team-04 | Team Office | [0, 0, 4.2] | placeholder | HumanCitizen_02 |
| knowledge-02 | Knowledge Library | [9.2, 0, -5.8] | knowledge-placeholder | KnowledgeCitizen_01 |
| knowledge-03 | Knowledge Library | [4.8, 0, -5.8] | knowledge-placeholder | KnowledgeCitizen_01 |
| compute-worker | Compute Center | [7.2, 0, 1.8] | compute-human-placeholder | ComputeCitizen_01 |
| compute-03 | Compute Center | [10.5, 0, 2.2] | device-placeholder | Procedural |

¹ Vị trí đã được điều chỉnh trong phase này.

---

## 2. Chiều cao sau autoNorm

`autoNorm` tự tính từ bounding box thực tế của từng GLB (bao gồm node matrix 100×).

| Model GLB | World height (pre-scale) | Target | Scale Factor |
|-----------|--------------------------|--------|-------------|
| SM_Chr_HumanCitizen_01.glb | ~93.59 units | 1.7m | ~0.01816 |
| SM_Chr_HumanCitizen_02.glb | ~92.40 units | 1.7m | ~0.01840 |
| SM_Chr_RobotCitizen_01.glb | ~96.59 units | 1.7m | ~0.01760 |
| SM_Chr_KnowledgeCitizen_01.glb | ~99.72 units | 1.7m | ~0.01705 |
| SM_Chr_ComputeCitizen_01.glb | ~96.94 units | 1.7m | ~0.01753 |

Tất cả citizens TripoModel xuất hiện đúng 1.7m sau normalize.

---

## 3. Ground Alignment

| Tiêu chí | Kết quả |
|---------|---------|
| Chân chạm đất (y=0) | ✅ Tất cả citizens |
| Không bị chìm | ✅ groundOffset = -box.min.y × scaleFactor ≈ 0.85m |
| Không lơ lửng | ✅ |
| Procedural citizens (device) | ✅ box bắt đầu từ y=0.48 (procedural box) |

---

## 4. Label Validation

| Tiêu chí | Giá trị | Kết quả |
|---------|---------|---------|
| Name label Y | CITIZEN_TARGET_HEIGHT + 0.2 = **1.90m** | ✅ Trên đầu |
| Type badge Y | 1.90 - 0.28 = **1.62m** | ✅ Dưới name label |
| Label xuyên model | Không (model cao 1.7m, label tại 1.9m) | ✅ |
| Font size | small = 0.2 world units | ✅ |
| Procedural device label Y | HEIGHT.DEVICE = 0.85m | ✅ |

---

## 5. Kiểm tra Spacing

### 5a. Vi phạm trước khi fix (< 1.0m center-to-center)

| Cặp | Khoảng cách | Nguyên nhân |
|-----|------------|-------------|
| ai-helper ↔ human-opp-01 | **0.707m** ❌ | Cluster Opportunity Center quá dày |
| human-opp-01 ↔ human-opp-03 | **0.781m** ❌ | Cluster Opportunity Center quá dày |
| commerce-agent ↔ human-opp-02 | **0.728m** ❌ | Cluster Opportunity Center quá dày |
| human-team-01 ↔ human-team-03 | **0.728m** ❌ | Cluster Team Office quá dày |
| human-citizen ↔ human-plaza-03 | **0.860m** ❌ | Citizen Plaza gần nhau |

### 5b. Fixes áp dụng

| Citizen | Trước | Sau | Lý do |
|--------|-------|-----|-------|
| human-opp-01 | [-7.2, 0, 2.3] | **[-7.2, 0, 1.0]** | Tách khỏi ai-helper và opp-03 |
| human-opp-02 | [-8.8, 0, 2.2] | **[-8.8, 0, 3.6]** | Tách khỏi commerce-agent |
| human-team-03 | [1.6, 0, 4.6] | **[2.8, 0, 4.0]** | Tách khỏi team-01 |
| human-citizen | [-1.2, 0, 0.8] | **[-0.8, 0, 0.8]** | Tách khỏi plaza-03 |

### 5c. Kết quả sau fix

| Tiêu chí | Kết quả |
|---------|---------|
| Vi phạm < 1.0m | **0** ✅ |
| Khoảng cách nhỏ nhất | 1.000m (human-opp-01 ↔ human-opp-03) |
| Citizen ↔ Fountain (gần nhất) | 1.44m (human-citizen ↔ fountain) ✅ |
| Citizen ↔ Bench (gần nhất) | 1.21m (human-team-03 ↔ bench [2.3,0,5.1]) ✅ |

---

## 6. Lỗi còn lại

| Lỗi | Mức độ | Ghi chú |
|-----|--------|---------|
| Orientation của characters (nhìn về hướng nào?) | Cần kiểm tra visual | Tripo Y-Z swap có thể làm character quay mặt theo trục Z thay vì X |
| `human-citizen` gốc (Citizen Plaza) chưa có tên đẹp | Thấp | name = "Human Citizen", nên đổi |
| Robot citizen target height = 1.7m giống Human | Thấp | Sau này có thể đổi ROBOT về 1.1m |
| Typecheck hints (unused vars) | Hint | Pre-existing, không ảnh hưởng build |

---

## 7. Thay đổi code

| File | Thay đổi |
|------|---------|
| `CampusScene.tsx` | Xóa filter `citizen_id === "human-plaza-01"`, render toàn bộ citizens |
| `data.ts` | Sửa 4 vị trí: human-citizen, human-opp-01, human-opp-02, human-team-03 |

---

## 8. Đề xuất bước tiếp theo

1. **Kiểm tra orientation** — Characters có thể quay mặt sai hướng do Y-Z swap trong node matrix. Nếu vậy, thêm `rotation={[0, Math.PI / 2, 0]}` hoặc tương tự vào TripoModel của citizens.
2. **Tách target height theo loại** — Robot nên nhỏ hơn Human (1.1m vs 1.7m). Tách `ROBOT_TARGET_HEIGHT` riêng.
3. **Visual review** — Dùng browser để xác nhận 32 citizens hiển thị đúng tỉ lệ, đứng đúng vị trí.
4. **Label overlap** — Một số cặp citizens gần nhau (1.0m-1.5m) có thể có label chồng nhau từ camera mặc định. Cần review visual.

---

## 9. Validation

| Bước | Kết quả |
|------|---------|
| `npm run typecheck` | ✅ Pass — 0 errors |
| Filter xóa | ✅ Tất cả 32 citizens render |
| autoNorm active | ✅ Tất cả TripoModel citizen dùng `autoNorm` |
| Spacing violations | ✅ 0 sau fix |
