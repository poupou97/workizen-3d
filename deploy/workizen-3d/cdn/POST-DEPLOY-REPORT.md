# Báo cáo Sau Triển Khai CloudFront — Workizen 3D
**Ngày:** 2026-06-11  
**Trạng thái:** DEPLOYED ✅  
**Thực hiện bởi:** Claude Code

---

## Tóm tắt nhanh

| Hạng mục | Kết quả |
|---|---|
| CloudFront distribution | E218G9RNHGYBND |
| CloudFront domain | d27crw9brq7vyw.cloudfront.net |
| ACM Certificate ARN | arn:aws:acm:us-east-1:863764623569:certificate/eb0cd851-0f39-46f7-967f-006422f5311c |
| Origin | origin.workizen.net → 137.131.35.185 (Oracle VM) |
| DNS switch | workizen.net + www.workizen.net → CloudFront Alias |
| Thời gian deploy tổng | ~40 phút |

---

## Infrastructure hiện tại (sau deploy)

```
User browser
     │
     ▼
workizen.net (Route53 Alias → CloudFront E218G9RNHGYBND)
     │
     ▼
CloudFront d27crw9brq7vyw.cloudfront.net
  ├── Cache: /_next/static/* → CachingOptimized (1 năm)
  ├── Cache: /assets/*       → CachingOptimized (30 ngày)
  ├── No cache: /api/*       → CachingDisabled (pass-through, sẵn cho chatbot)
  └── No cache: /*           → CachingDisabled (HTML, dynamic)
     │
     ▼ HTTPS only, TLSv1.2+
origin.workizen.net → 137.131.35.185 (Oracle VM)
  └── Docker: Caddy → app:3000 (Next.js standalone)
```

---

## Thay đổi DNS trong Route53

| Record | Trước | Sau |
|---|---|---|
| `workizen.net` A | `137.131.35.185` (TTL 60) | Alias → `d27crw9brq7vyw.cloudfront.net` |
| `www.workizen.net` A | `137.131.35.185` (TTL 60) | Alias → `d27crw9brq7vyw.cloudfront.net` |
| `origin.workizen.net` A | *(không tồn tại)* | `137.131.35.185` (TTL 300) — **mới thêm** |
| Các record khác | *(giữ nguyên)* | *(giữ nguyên)* |

---

## Files đã thay đổi

| File | Thay đổi |
|---|---|
| `apps/workizen-3d/next.config.ts` | Thêm `headers()` cho `/assets/*` → 30 ngày; `/api/*` → no-store; `poweredByHeader: false` |
| `deploy/workizen-3d/Caddyfile` | Thêm `encode zstd gzip`; ẩn Server/X-Powered-By; thêm `origin.workizen.net` site block |
| `deploy/workizen-3d/cdn/cf-state.json` | Lưu distribution ID, domain, cert ARN |
| `deploy/workizen-3d/cdn/invalidate.sh` | Script invalidate cache sau mỗi deploy |
| `deploy/workizen-3d/cdn/rollback-cloudfront.sh` | Script rollback về Oracle VM |
| `deploy/workizen-3d/cdn/backups/2026-06-11/` | Backup toàn bộ trạng thái trước khi thay đổi |

---

## Kết quả curl -I trước/sau

### GLB 3D Models (`/assets/*`)
```
# TRƯỚC:
cache-control: public, max-age=0              ← không cache, ~50MB tải lại mỗi lần

# SAU:
cache-control: public, max-age=2592000, immutable
x-cache: Hit from cloudfront                  ← CDN cache, tải tức thì lần 2+
```

### Next.js JS Chunks (`/_next/static/*`)
```
# TRƯỚC (đã đúng, giữ nguyên):
cache-control: public, max-age=31536000, immutable
x-cache: Hit from cloudfront                  ← CDN cache 1 năm
```

### index.html (`/*`)
```
cache-control: s-maxage=31536000              ← Next.js ISR, không cache ở browser
x-cache: Miss from cloudfront                 ← không cache tại CDN (CachingDisabled)
via: 1.1 Caddy, 1.1 xxx.cloudfront.net        ← đi qua CloudFront
```

### Security headers
```
x-powered-by: (none)                          ← đã ẩn
server: (none)                                ← đã ẩn
```

---

## IAM permissions đã thêm

| Policy | Loại |
|---|---|
| `CloudFrontFullAccess` | Managed — attached |
| `AWSCertificateManagerFullAccess` | Managed — attached |
| `Route53WorkizenCDN` | Inline — chỉ cho hosted zone workizen.net |

---

## Cache Behaviors

| Path | Cache Policy | TTL hiệu quả | Ghi chú |
|---|---|---|---|
| `/_next/static/*` | CachingOptimized | 1 năm (theo header) | Hashed filenames → bất biến |
| `/assets/*` | CachingOptimized | 30 ngày (theo header) | GLB/texture, 66MB tổng |
| `/api/*` | CachingDisabled | 0 | Dành cho chatbot/NPC sau này |
| `/*` (default) | CachingDisabled | 0 | HTML, pages, dynamic content |

---

## Cách deploy build mới (invalidation)

```bash
# Sau mỗi lần chạy deploy.sh, chạy thêm:
./deploy/workizen-3d/cdn/invalidate.sh

# Mặc định invalidate: "/" và "/_next/data/*"
# Không cần invalidate /assets/* và /_next/static/* nếu dùng filename mới
# Nếu update GLB giữ nguyên tên file:
./deploy/workizen-3d/cdn/invalidate.sh "/assets/*"
```

---

## Rollback (nếu cần)

```bash
# Khôi phục về Oracle VM trong ~60 giây:
./deploy/workizen-3d/cdn/rollback-cloudfront.sh

# Script sẽ tự động:
# 1. Restore workizen.net + www.workizen.net → A record 137.131.35.185
# 2. Disable CloudFront distribution E218G9RNHGYBND
```

---

## Rủi ro còn lại

| Rủi ro | Mức độ | Biện pháp |
|---|---|---|
| www.workizen.net không redirect (serve content) | Thấp | Xử lý canonical URL trong Next.js; hoặc CloudFront Function |
| GLB đổi nội dung nhưng giữ tên file → stale cache | Trung bình | Chạy `./invalidate.sh "/assets/*"` sau khi update GLB |
| origin.workizen.net bị public biết → expose VM | Rất thấp | Record không được quảng cáo, chỉ dùng cho CloudFront |
| Oracle VM down → CloudFront trả 502 | Đã tồn tại | Không thay đổi so với trước; cần health check dài hạn |

---

## TODO sau này

- [ ] Thêm CloudFront Function để redirect `www.workizen.net` → `workizen.net` tại edge
- [ ] Tích hợp `./cdn/invalidate.sh` vào `deploy.sh` (chạy tự động sau mỗi build)
- [ ] Monitor CloudFront cache hit ratio trong AWS Console
- [ ] Xem xét `PriceClass_All` khi có user Châu Á đông hơn (hiện tại PriceClass_100: US/EU/APAC)
