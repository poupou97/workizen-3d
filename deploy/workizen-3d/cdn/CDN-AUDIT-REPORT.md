# Báo cáo Kiểm tra và Đề xuất CDN — Workizen 3D
**Ngày:** 2026-06-11  
**Thực hiện bởi:** Claude Code  
**Status:** Chờ review — chưa chạy bất kỳ lệnh nào thay đổi infrastructure

---

## 1. Hiện trạng hệ thống

### Stack & Build
| Hạng mục | Giá trị |
|---|---|
| Framework | Next.js 16.2.7 (không phải Vite) |
| Build command | `cd apps/workizen-3d && npm run build` |
| Output dir | `.next/standalone/` (Next.js standalone mode) |
| Runtime | Node.js server (`server.js`) trong Docker container |
| 3D engine | React Three Fiber + Three.js 0.184.0 |

### Deploy architecture
```
Internet
   │
   ▼
workizen.net (AWS Route53 A → 137.131.35.185)
   │
   ▼
Oracle VM: 137.131.35.185
  └─ Docker Compose
       ├── caddy:2-alpine  (port 80/443)  ← reverse proxy + TLS
       └── app:3000        (internal)     ← Next.js standalone server
```

### DNS hiện tại (Route53 hosted zone: Z048982110IKRK19LARIQ)
| Record | IP | Ghi chú |
|---|---|---|
| `workizen.net` | 137.131.35.185 | Oracle VM — frontend |
| `www.workizen.net` | 137.131.35.185 | Oracle VM — frontend |
| `db.workizen.net` | 129.153.114.109 | VM khác — services |
| `neo4j.db.workizen.net` | 129.153.114.109 | Neo4j |
| `supabase.db.workizen.net` | 129.153.114.109 | Supabase |
| `qdrant.db.workizen.net` | 129.153.114.109 | Qdrant |
| `knowledge.workizen.net` | 129.153.114.109 | Knowledge base |
| `portainer.db.workizen.net` | 129.153.114.109 | Portainer (DB VM) |
| `portainer3.workizen.net` | 137.131.35.185 | Portainer (Frontend VM) |

### AWS Account
| Hạng mục | Giá trị |
|---|---|
| Account ID | 863764623569 |
| IAM user | terraform-ai |
| IAM policies hiện có | EC2Full, IAMFull, EKS, CloudWatch, KMS |
| CloudFront permission | **Chưa có** |
| ACM permission | **Chưa có** |
| ACM certificates | **Không có** |
| CloudFront distributions | **Không có** |

---

## 2. Phân tích Static Assets

### Tổng quan
| Thư mục | Kích thước |
|---|---|
| `public/assets/models/` | 50 MB (85 file GLB) |
| `public/assets/rigged/` | 14 MB |
| `public/assets/textures/` | 344 KB |
| **Tổng `public/`** | **66 MB** |

### Top 10 file nặng nhất
| File | Kích thước |
|---|---|
| `rigged/layla-chen/animations/Idle.glb` | 6.0 MB |
| `rigged/layla-chen/animations/Walk.glb` | 5.9 MB |
| `models/SM_Bld_FounderTower_01.glb` | 3.2 MB |
| `rigged/layla-chen/LaylaChen_Rigged.glb` | 2.5 MB |
| `models/SM_Bld_AIAgentLab_01.glb` | 2.3 MB |
| `models/SM_Bld_TeamOffice_01.glb` | 2.1 MB |
| `models/SM_Chr_ComputeCitizen_01_Rigged.glb` | 2.1 MB |
| `models/SM_Chr_HumanCitizen_01_Rigged.glb` | 2.1 MB |
| `models/SM_Prop_Blimp_01.glb` | 1.9 MB |
| `models/SM_Chr_RobotCitizen_01_Rigged.glb` | 1.9 MB |

---

## 3. Kiểm tra Response Headers (curl -I)

### 3.1 index.html
```
HTTP/2 200
cache-control: s-maxage=31536000        ← chỉ CDN cache, browser không cache
x-nextjs-cache: HIT
x-powered-by: Next.js                   ← lộ stack
via: 1.1 Caddy                          ← lộ reverse proxy
```

### 3.2 GLB file (ví dụ: SM_Bld_FounderTower_01.glb — 3.2MB)
```
HTTP/2 200
cache-control: public, max-age=0        ← ❌ KHÔNG CACHE — BUG NGHIÊM TRỌNG
content-type: model/gltf-binary
content-length: 3391804
```
> **Hậu quả:** 85 file × ~1-6MB = ~50MB tải lại từ Oracle VM mỗi khi user refresh trang.

### 3.3 Next.js hashed JS chunks (ví dụ: `_next/static/chunks/1jq4o6yq14o4c.js`)
```
HTTP/2 200
cache-control: public, max-age=31536000, immutable  ← ✅ Đã đúng
```
> Next.js đã tự xử lý tốt cho hashed chunks.

---

## 4. Các thay đổi đề xuất

### 4.1 Fix ngay (không cần CDN) — ĐÃ CHUẨN BỊ, CHƯA DEPLOY

**File:** [apps/workizen-3d/next.config.ts](../../../apps/workizen-3d/next.config.ts)

```ts
// Thêm headers() để cache GLB/texture files 30 ngày
async headers() {
  return [
    {
      source: "/assets/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=2592000, immutable" }],
    },
  ];
},
```

**File:** [Caddyfile](../Caddyfile)

```
workizen.net {
    encode zstd gzip        ← thêm compression
    header -Server          ← ẩn stack info
    header -X-Powered-By    ← ẩn stack info
    reverse_proxy app:3000
}
```

> **Impact:** Sau khi deploy, user chỉ cần download 66MB lần đầu. Các lần sau browser cache local → tải tức thì.

---

## 5. Đề xuất CDN

### Phương án A — Cloudflare (Free)

**Ưu điểm:**
- Free tier: 100GB bandwidth + 10M request/tháng
- Setup ~30 phút
- Bao gồm DDoS protection, WAF cơ bản
- Không cần AWS permissions mới

**Nhược điểm:**
- **Phải chuyển toàn bộ nameserver** từ Route53 sang Cloudflare
- Tất cả DNS records (kể cả `db.*`, `supabase.*`, `qdrant.*`) phải migrate sang Cloudflare
- Rollback mất 24–48h (NS propagation)
- Mất tính đồng bộ với Route53

**Checklist (không tự thực hiện khi chưa xác nhận):**
- [ ] Tạo account Cloudflare, add site `workizen.net`
- [ ] Xác nhận Cloudflare scan đúng tất cả 11 DNS records hiện tại
- [ ] Đổi NS tại AWS Route53 sang NS của Cloudflare
- [ ] Enable Proxy (cam) cho `workizen.net` và `www.workizen.net`
- [ ] Disable proxy cho `db.*`, `portainer.*`, `supabase.*` (orange cloud → grey cloud)
- [ ] Cài Cache Rule: `/assets/*` → Cache Everything, Edge TTL 30 ngày
- [ ] Enable Brotli + HTTP/3

---

### Phương án B — AWS CloudFront ★ (Khuyến nghị)

**Ưu điểm:**
- Giữ nguyên Route53, không đổi NS
- Cùng AWS account, credential sẵn có
- Rollback cực nhanh: restore 1 A record, DNS propagation ~60 giây (TTL=60)
- ACM cert miễn phí khi dùng với CloudFront
- Chi phí: $0–2/tháng cho lưu lượng MVP

**Nhược điểm:**
- IAM user `terraform-ai` hiện thiếu CloudFront và ACM permissions
- Cần request và validate ACM cert trước (~5 phút)
- CloudFront distribution deploy mất ~10–15 phút

**Chi phí ước tính:**
| Thành phần | Giá | MVP estimate |
|---|---|---|
| CloudFront data transfer | $0.0085/GB (APAC) | ~$0.17/tháng (20GB) |
| CloudFront requests | $0.012/10k requests | ~$0.12/tháng (100k req) |
| ACM certificate | Miễn phí | $0 |
| Route53 queries | $0.40/1M queries | <$0.01 |
| **Tổng** | | **~$0.30–2/tháng** |

**Cache behavior đã cấu hình trong script:**
| Path pattern | Cache policy | TTL hiệu quả |
|---|---|---|
| `/assets/*` | CachingOptimized | Theo header (30 ngày) |
| `/_next/static/*` | CachingOptimized | Theo header (1 năm) |
| `/*` (default) | CachingDisabled | Không cache — Next.js xử lý |

---

## 6. Thứ tự thực hiện đề xuất

```
Bước 1 — Deploy fix cache headers (ngay, không cần CDN):
  ./deploy/workizen-3d/deploy.sh
  ↳ Fix GLB max-age=0 → 30 ngày ngay lập tức

Bước 2 — Grant IAM permissions (1 lần, ~1 phút):
  ./deploy/workizen-3d/cdn/grant-iam-permissions.sh

Bước 3 — Setup CloudFront (~15 phút):
  ./deploy/workizen-3d/cdn/setup-cloudfront.sh
  ↳ Tạo ACM cert + validate qua Route53
  ↳ Tạo CloudFront distribution
  ↳ In ra lệnh Route53 cuối cùng (cần xác nhận tay)

Bước 4 — Switch DNS (sau khi xác nhận CloudFront hoạt động):
  Chạy lệnh Route53 được in ra ở bước 3
  ↳ DNS propagate trong ~60 giây

--- Nếu có vấn đề ---

Rollback (bất kỳ lúc nào):
  ./deploy/workizen-3d/cdn/rollback-cloudfront.sh <distribution-id>
  ↳ Khôi phục về Oracle VM trong ~60 giây
```

---

## 7. Files đã chuẩn bị (chưa deploy)

| File | Trạng thái | Mô tả |
|---|---|---|
| `apps/workizen-3d/next.config.ts` | Đã sửa, chưa deploy | Thêm cache headers cho GLB |
| `deploy/workizen-3d/Caddyfile` | Đã sửa, chưa deploy | Thêm gzip, ẩn server headers |
| `deploy/workizen-3d/cdn/grant-iam-permissions.sh` | Tạo mới | Grant CloudFront+ACM+Route53 cho terraform-ai |
| `deploy/workizen-3d/cdn/setup-cloudfront.sh` | Tạo mới | Tạo ACM cert + CloudFront tự động |
| `deploy/workizen-3d/cdn/rollback-cloudfront.sh` | Tạo mới | Rollback về Oracle VM |

---

## 8. Rủi ro

| Rủi ro | Mức độ | Biện pháp |
|---|---|---|
| GLB paths đổi tên → cache stale | Thấp | Đổi tên file = URL mới = cache tự bị miss |
| CloudFront cache HTML khi deploy | Thấp | Default behavior đã disable cache cho `/*` |
| ACM cert validation fail | Rất thấp | Script tự thêm CNAME validation vào Route53 |
| Oracle VM IP bị lộ qua `portainer3.*` | Đã tồn tại | Ngoài scope CDN — xử lý riêng |
| terraform-ai thiếu permissions | Chắc chắn | Cần chạy `grant-iam-permissions.sh` trước |

---

*Tất cả thay đổi infrastructure đều chờ xác nhận. Không có lệnh nào tác động production được chạy tự động.*
