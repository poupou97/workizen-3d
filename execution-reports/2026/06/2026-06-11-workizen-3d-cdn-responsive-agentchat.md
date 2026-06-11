# Execution Report: CDN · Responsive UI · AgentChat Overlay

**Ngày:** 2026-06-11  
**Project:** workizen-3d  
**App:** `apps/workizen-3d`  
**Branch:** `feat/responsive-ui`  
**Thực hiện bởi:** Claude Code (claude-sonnet-4-6)

---

## Tóm tắt

Session này hoàn thành 5 nhóm việc liên tiếp trên production:

| # | Nhóm | Kết quả |
|---|---|---|
| 1 | CDN CloudFront | ✅ LIVE — workizen.net qua CloudFront |
| 2 | Loading Screen | ✅ LIVE — progress bar trước khi scene 3D load xong |
| 3 | Responsive UI | ✅ LIVE — mobile/tablet/desktop |
| 4 | Ẩn Citizen Plaza | ✅ LIVE — removed khỏi UI |
| 5 | AgentChat Overlay | ✅ LIVE — Workizen Guide + mock chat |

---

## 1. CDN — AWS CloudFront

### Vấn đề ban đầu
- GLB 3D assets (66 MB) được serve với `cache-control: public, max-age=0` → tải lại toàn bộ mỗi lần reload.
- Không có CDN, mọi request đi thẳng Oracle VM tại Singapore.

### Giải pháp
- Fix `next.config.ts`: thêm `headers()` cho `/assets/*` → 30 ngày immutable cache.
- Tạo `origin.workizen.net` record trỏ VM để tránh DNS loop.
- Tạo CloudFront distribution `E218G9RNHGYBND` + ACM cert us-east-1.
- Switch Route53 A records `workizen.net` + `www.workizen.net` → CloudFront Alias.
- Cập nhật Caddyfile: `encode zstd gzip`, ẩn `Server`/`X-Powered-By`.

### Infrastructure sau deploy
```
User browser
    │
    ▼
workizen.net (Route53 Alias → CloudFront E218G9RNHGYBND)
    │
    ▼
CloudFront d27crw9brq7vyw.cloudfront.net
  ├── /_next/static/*  → CachingOptimized (1 năm, hash filename)
  ├── /assets/*        → CachingOptimized (30 ngày, immutable)
  ├── /api/*           → CachingDisabled  (pass-through, dành cho chatbot)
  └── /*               → CachingDisabled  (HTML dynamic)
    │
    ▼ HTTPS + TLSv1.2+
origin.workizen.net → 137.131.35.185 (Oracle VM)
  └── Docker: Caddy → app:3000 (Next.js standalone)
```

### Files tạo/sửa
- `apps/workizen-3d/next.config.ts` — cache headers
- `deploy/workizen-3d/Caddyfile` — compression + security headers + origin subdomain
- `deploy/workizen-3d/cdn/cf-state.json` — distribution state
- `deploy/workizen-3d/cdn/invalidate.sh` — cache invalidation script
- `deploy/workizen-3d/cdn/rollback-cloudfront.sh` — rollback script
- `deploy/workizen-3d/cdn/backups/2026-06-11/` — pre-change snapshots

### Vấn đề gặp & fix
| Vấn đề | Fix |
|---|---|
| IAM LimitExceeded (10-policy limit) | Dùng inline policy `Route53WorkizenCDN` thay managed policy |
| `OriginSSLProtocols` typo trong AWS CLI | Sửa → `OriginSslProtocols` |
| CloudFront 502 sau deploy | `docker compose restart caddy` để reload Caddyfile với `origin.workizen.net` |
| `X-Powered-By` không bị ẩn bởi Caddy | Fix tại Next.js: `poweredByHeader: false` |
| `www.workizen.net` không redirect | Known limitation: CloudFront ghi đè Host header → cần CloudFront Function |

---

## 2. Loading Screen

### Vấn đề
Người dùng thấy màn hình trắng vài giây trong khi GLB models load.

### Giải pháp
Dùng `useProgress` từ `@react-three/drei` (hooks vào `THREE.DefaultLoadingManager`).

### Files tạo/sửa
- `apps/workizen-3d/src/ui/LoadingScreen.tsx` — overlay với progress bar shimmer + island icon float animation
- `apps/workizen-3d/src/app/globals.css` — `.loading-screen`, `.loading-bar-fill` shimmer, keyframes
- `apps/workizen-3d/src/features/campus/CampusExperience.tsx` — mount `<LoadingScreen />`

### UX chi tiết
- Hiển thị: logo WORKIZEN + tagline + progress bar shimmer gradient
- Text: "Building your world…" → "Almost ready…" khi progress ≥ 100%
- Fade out: 350ms delay → 650ms opacity transition → `display: none`

---

## 3. Responsive UI

**Branch:** `feat/responsive-ui`

### Vấn đề
- Không có viewport meta → mobile browser render ở desktop width
- Bottom nav wrap lộn xộn trên mobile
- SelectionPanel che khuất 3D scene trên mobile
- DemoGuide và bottom nav overlap ở cùng `bottom-4`

### Giải pháp

#### layout.tsx
Thêm `export const viewport: Viewport = { width: "device-width", initialScale: 1 }`.

#### TopHud.tsx
- Info card: compact hơn trên mobile (ẩn description text trên `< sm`)
- Bottom nav: `overflow-x-auto scrollbar-none` + `shrink-0 whitespace-nowrap` trên mỗi button → cuộn ngang thay wrap

#### SelectionPanel.tsx
- Mobile (`< md`): bottom sheet `fixed bottom-0 inset-x-0`, slide in/out với `translate-y` 300ms, `max-h-[72vh]`, drag handle + close button + backdrop
- Desktop (`md+`): giữ nguyên left panel
- `useEffect` tự mở khi selection thay đổi, tự đóng khi deselect
- FAB "Explore" khi sheet đóng

#### DemoGuide.tsx
- Mobile: `bottom-20 inset-x-4` (phía trên nav bar)
- Desktop: giữ nguyên `bottom-4 left-4`

#### globals.css
- Thêm `.scrollbar-none` utility

### Files tạo/sửa
- `apps/workizen-3d/src/app/layout.tsx`
- `apps/workizen-3d/src/app/globals.css`
- `apps/workizen-3d/src/features/campus/TopHud.tsx`
- `apps/workizen-3d/src/features/campus/SelectionPanel.tsx`
- `apps/workizen-3d/src/features/campus/DemoGuide.tsx`

---

## 4. Ẩn Citizen Plaza khỏi UI

### Yêu cầu
Ẩn toàn bộ nội dung Citizen Plaza trên giao diện mà không xoá data gốc.

### Thay đổi
- `TopHud.tsx`: thêm `.filter(d => d.id !== "citizen-plaza")` trước `.map()` trên district nav
- `SelectionPanel.tsx`: xoá `<Badge label="Spawn" value="Citizen Plaza" />` trong VisionPanel

---

## 5. AgentChat Overlay — Workizen Guide

### Kiến trúc
```
App
├── ThreeCanvas (CampusScene)
├── TopHud
├── SelectionPanel
├── DemoGuide
├── AgentChatOverlay   ← mới, z-index: 9999, hoàn toàn HTML/React
└── LoadingScreen
```

**Nguyên tắc:** AgentChat là lớp HTML overlay thuần tuý. Không liên quan Three.js/canvas.

### Service Layer (`src/services/chat/`)

| File | Mục đích |
|---|---|
| `types.ts` | Interface `ChatMessage` + `ChatProvider` |
| `MockProvider.ts` | Phase 1: 8 canned responses, delay 1–1.8s |
| `FlowiseProvider.ts` | Phase 2 stub: gọi `/api/v1/prediction/{chatflowId}` |
| `ChatProvider.ts` | Factory: tự chọn provider dựa trên env vars |

**Switch sang Flowise:** chỉ cần thêm vào `.env.local`:
```
NEXT_PUBLIC_FLOWISE_API_URL=https://...
NEXT_PUBLIC_FLOWISE_CHATFLOW_ID=...
```

### Components (`src/components/chat/`)

| File | Mô tả |
|---|---|
| `WorkizenGuideAvatar.tsx` | SVG avatar tay viết: blue helmet, headset, logo W, rosy cheeks; 3 expressions: happy/thinking/surprised |
| `TypingIndicator.tsx` | 3 dots bounce stagger animation |
| `ChatMessage.tsx` | Bot message trái (với avatar nhỏ) + user message phải (blue bubble + ✓✓ + timestamp) |
| `AgentChatButton.tsx` | Floating button: avatar tròn 72px + speech bubble + green online dot |
| `AgentChatPanel.tsx` | Header (avatar + title + online status + minimize/close) + messages scroll + input + send |
| `AgentChatOverlay.tsx` | Orchestrator: `isOpen` state, panel slide-in 300ms, button fade-out |

### UX chi tiết
- **Closed:** Avatar button `fixed bottom-24 right-6` + bubble "Hi! Need any help?"
- **Open:** Panel `fixed bottom-[180px]` slides in từ dưới lên, button fade out
- **Desktop:** Panel width 380px
- **Mobile:** Panel `inset-x-4` (full width trừ 16px margin hai bên)
- **Enter to send**, auto-scroll khi tin nhắn mới, typing indicator khi đang chờ response

---

## Deployment

Tất cả các thay đổi đã được deploy lên production qua:
```bash
bash deploy/workizen-3d/deploy.sh
bash deploy/workizen-3d/cdn/invalidate.sh
```

CloudFront invalidation IDs trong session này:
- `ICXB3RH7G43GP5K3BIAQD6KUT9` — Responsive UI deploy
- `IAV3ZROMKHSBNAICWGCEPE58AT` — Hide Citizen Plaza
- `I9Z365N6QLC6OSEEWUYICEA6PQ` — AgentChat Overlay

---

## Rủi ro còn lại

| Rủi ro | Mức | Xử lý |
|---|---|---|
| `www.workizen.net` không redirect | Thấp | Cần CloudFront Function (see TODO) |
| GLB giữ tên file khi update | Trung bình | Chạy `./invalidate.sh "/assets/*"` thủ công |
| AgentChat chưa có Flowise backend | Chấp nhận được | MockProvider đang dùng, UX hoàn chỉnh |
| `feat/responsive-ui` chưa merge main | Thấp | Cần merge khi founder approve |

---

## Commit history (session này)

```
661ba28  feat: add AgentChat overlay with Workizen Guide SVG avatar
02bfaf0  feat: hide Citizen Plaza from UI
f10cad1  feat: responsive UI for mobile, tablet, and desktop
```
