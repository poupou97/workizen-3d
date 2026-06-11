# Workizen 3D — Sprint Plan (tháng 6/2026)

**Cập nhật lần cuối:** 2026-06-11  
**Branch hiện tại:** `feat/responsive-ui`  
**Production:** https://workizen.net (CloudFront E218G9RNHGYBND → Oracle VM 137.131.35.185)

---

## Trạng thái hiện tại

### ✅ Đã hoàn thành

| Tính năng | Chi tiết | Branch |
|---|---|---|
| Workizen HQ Campus MVP | Scene 3D, districts, selection panel, demo guide, mock data | `main` |
| Synty + Tripo3D assets | 85 GLB files, 66MB, citizen animations | `main` |
| 2.5D camera lock | Phase 3.10 — camera cố định, không rotate/zoom/pan | `main` |
| Deploy infrastructure | Oracle VM + Docker + Caddy 2 reverse proxy | `main` |
| AWS CloudFront CDN | Distribution E218G9RNHGYBND, Route53 alias, ACM cert | `main` |
| GLB cache fix | `/assets/*` → 30 ngày immutable (từ max-age=0) | `main` |
| CDN scripts | `invalidate.sh`, `rollback-cloudfront.sh`, backup/restore | `main` |
| Loading Screen | Progress bar shimmer + Workizen Guide float animation | `main` |
| Responsive UI | Mobile bottom sheet, scrollable nav, viewport meta | `feat/responsive-ui` |
| Ẩn Citizen Plaza | Removed khỏi nav + VisionPanel | `feat/responsive-ui` |
| AgentChat Overlay | Workizen Guide SVG, MockProvider, Flowise-ready | `feat/responsive-ui` |

---

## Sprint tiếp theo — Ưu tiên theo thứ tự

### 🔴 P0 — Phải làm trước

#### [P0-1] Merge `feat/responsive-ui` → `main`

```bash
git checkout main
git merge feat/responsive-ui
git push
bash deploy/workizen-3d/deploy.sh && bash deploy/workizen-3d/cdn/invalidate.sh
```

**Lý do:** Branch đang chạy trên production nhưng chưa merge. Main đang lag phía sau.

---

#### [P0-2] Auto-invalidate CDN sau mỗi deploy

Hiện tại cần chạy tay `./cdn/invalidate.sh` sau `./deploy.sh`. Tích hợp vào `deploy.sh`:

```bash
# Cuối deploy.sh, thêm:
echo "==> Invalidating CloudFront cache..."
bash "$SCRIPT_DIR/cdn/invalidate.sh"
```

**File:** `deploy/workizen-3d/deploy.sh`

---

### 🟠 P1 — Sprint tiếp theo

#### [P1-1] Flowise Integration (AgentChat Phase 2)

Hiện tại đang dùng `MockProvider`. Switch sang Flowise thật:

1. Deploy Flowise instance (Docker, hoặc Flowise Cloud)
2. Tạo Chatflow với LLM + context Workizen
3. Thêm vào `.env.local` trên Oracle VM:
   ```
   NEXT_PUBLIC_FLOWISE_API_URL=https://flowise.workizen.net
   NEXT_PUBLIC_FLOWISE_CHATFLOW_ID=<uuid>
   ```
4. `FlowiseProvider.ts` đã sẵn sàng — không cần sửa frontend code

**File liên quan:**
- `src/services/chat/FlowiseProvider.ts` — đã implement, chờ env vars
- `src/services/chat/ChatProvider.ts` — factory tự switch khi có env vars

**Lưu ý:** Flowise nên chạy trên VM riêng hoặc dùng managed service. Không chạy chung Oracle VM frontend.

---

#### [P1-2] Workizen Guide — Real Art Asset

Hiện tại Guide là SVG tay viết. Nên có PNG/WebP artwork từ artist:

```
public/assets/guide/
  idle.webp
  happy.webp
  thinking.webp
  helping.webp
  surprised.webp
  waving.webp
```

Khi có art, cập nhật `WorkizenGuideAvatar.tsx` để dùng `<img>` thay SVG inline.

**Design brief:** Cute, gender-neutral, blue/white, Animal Crossing × SaaS vibes, "W" logo trên mũ/headset.

---

#### [P1-3] www.workizen.net redirect fix

Hiện tại `www.workizen.net` serve nội dung thay vì redirect → `workizen.net`.

**Root cause:** CloudFront ghi đè `Host` header khi gọi origin, matcher `@www_host` trong Caddy không bao giờ fire.

**Fix:** Tạo CloudFront Function:

```javascript
// cloudfront-functions/redirect-www.js
function handler(event) {
  var request = event.request;
  var host = request.headers.host.value;
  if (host === 'www.workizen.net') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://workizen.net' + request.uri }
      }
    };
  }
  return request;
}
```

Deploy: attach function vào CloudFront distribution `E218G9RNHGYBND` ở Viewer Request event.

---

### 🟡 P2 — Backlog

#### [P2-1] NPC Interaction → AgentChat

Khi user click vào NPC 3D trên scene:
- AgentChat tự mở
- Pre-fill context: tên NPC, district, role
- Workizen Guide nói chuyện từ góc độ NPC đó

**Flow:**
```
User click NPC (CampusScene.tsx onPointerDown)
  → select({ kind: "npc", id })
  → AgentChatOverlay lắng nghe store change
  → Auto-open với greeting có context NPC
```

---

#### [P2-2] AgentChat — Minimize vs Close

Hiện tại cả "Minimize" và "Close" button đều gọi `onClose()` (ẩn panel, hiện button lại). Phân biệt:

- **Minimize** (–): thu nhỏ panel → hiện header stub nhỏ gọn ở bottom-right, messages vẫn giữ
- **Close** (×): đóng hoàn toàn, reset messages về initial greeting

---

#### [P2-3] AgentChat — Typing indicator expression

Khi `isTyping === true`, Guide SVG dùng expression `"thinking"` (hiện đang làm). Có thể mở rộng:
- Khi gửi: `"helping"`
- Khi nhận response vui: `"happy"` hoặc `"excited"`
- Khi error: `"surprised"`

---

#### [P2-4] SelectionPanel — Panel Actions

Bổ sung action buttons thực tế trong các panel:
- DistrictPanel: "Enter District" button
- OpportunityPanel: "Apply Now" button (hiện có "View Recommended Team")
- CitizenPanel: "Connect" / "Invite to Team" button

---

#### [P2-5] Mobile — Landscape mode handling

Trên mobile landscape, `max-h-[72vh]` cho SelectionPanel sheet có thể quá chật. Cần kiểm tra và điều chỉnh breakpoint theo orientation.

---

### 🔵 P3 — Tầm nhìn dài hạn

| ID | Tính năng | Phụ thuộc |
|---|---|---|
| P3-1 | Workizen Guide xuất hiện trên 3D island (2D billboard) | Asset art |
| P3-2 | Multiplayer presence với Colyseus | Backend |
| P3-3 | Real citizen profiles từ WorkforceOS API | Laravel backend |
| P3-4 | Reputation system UI | Backend |
| P3-5 | Digital Twin — mở rộng từ HQ → Hanoi → Vietnam | Long-term |
| P3-6 | Voice/Audio cho Guide | TTS/STT provider |

---

## Infrastructure hiện tại (để tham khảo)

```
Oracle VM (frontend)  137.131.35.185
Oracle VM (DB/svc)    129.153.114.109
CloudFront            E218G9RNHGYBND → d27crw9brq7vyw.cloudfront.net
Route53 zone          Z048982110IKRK19LARIQ (workizen.net)
ACM cert              arn:aws:acm:us-east-1:863764623569:certificate/eb0cd851-...
AWS IAM user          terraform-ai
```

## Deploy workflow

```bash
# 1. Code + commit + push
git add ... && git commit -m "..." && git push

# 2. Deploy to VM + build Docker
bash deploy/workizen-3d/deploy.sh

# 3. Invalidate CloudFront (sẽ tự động sau P0-2)
bash deploy/workizen-3d/cdn/invalidate.sh

# 4. Rollback nếu cần
bash deploy/workizen-3d/cdn/rollback-cloudfront.sh
```

---

## Golden Rule (từ roadmap v1)

> Never expand the world before proving:  
> **1 Opportunity → 1 Team → 1 Delivery → 1 Reputation Update**

AgentChat là bước chuẩn bị cho interaction layer. Flowise integration là bước tiếp theo hiện thực hoá điều này.
