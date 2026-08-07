# Triển khai workizen-3d — ĐỌC TRƯỚC KHI CHẠY `deploy.sh`

## ⚠️ Caddy này phục vụ 6 tên miền, không chỉ trang 3d

Một container Caddy duy nhất (`workizen-3d-caddy-1`) đứng trước **toàn bộ** hệ
thống trên VM `137.131.35.185`:

| tên miền | upstream | mạng Docker |
|---|---|---|
| `workizen.net` · `origin` · `www` | `app:3000` | `workizen-3d_default` |
| `identity.workizen.net` | `observer-keycloak:8080` | `observer-proxy` |
| `portal.workizen.net` | `portal-web:80` | `observer-proxy` |
| `grafana.workizen.net` | `observer-grafana:3000` | `observer-proxy` |
| `langfuse.workizen.net` | `observer-langfuse-web:3000` | `observer-proxy` |

**`Caddyfile` trong thư mục này là cấu hình của CẢ SÁU.** `deploy.sh` rsync nó
đè lên máy chủ — nên **xoá một site block ở đây là làm sập site đó trên
production.**

## Sự cố 2026-08-07 — vì sao file này tồn tại

Trước hôm đó, `Caddyfile` trong repo **chỉ có 2 site** (`www` + `workizen.net`).
Mỗi lần `deploy.sh` chạy là **xoá identity, grafana, langfuse, portal** khỏi
Caddy, và `docker compose up --build -d` dựng lại container làm mất kết nối
mạng `observer-proxy`.

Hậu quả: `identity.workizen.net` trả **502** ⇒ **không ai đăng nhập được**, im
lặng **nhiều ngày** cho tới khi Founder tình cờ mở Portal.

Không có cảnh báo tự động (quyết định có ý thức của Founder — cắt chi phí vận
hành). Nên **trách nhiệm nằm ở người deploy**.

## Kiểm sau mỗi lần deploy — 10 giây

```bash
for h in workizen.net identity.workizen.net portal.workizen.net \
         grafana.workizen.net langfuse.workizen.net; do
  echo -n "$h → "; curl -s -o /dev/null -w "%{http_code}\n" -m 10 "https://$h"
done
```

Kỳ vọng: `200` · `302` · `302` · `401` · `401`.
Thấy `000` (TLS chết) hoặc `502` là **đã làm sập một dịch vụ** — quay lại ngay.

## 🪤 Bẫy INODE — `caddy reload` báo THÀNH CÔNG mà không đổi gì

Docker gắn **file đơn lẻ theo INODE**. Sửa `Caddyfile` trên máy chủ kiểu **thay
file mới** (editor, `mv`, vài dạng `sed -i`) ⇒ inode mới ⇒ **container ôm mãi
bản cũ**. `caddy reload` khi đó vẫn trả `RC=0` và log *"using config from
file"* — trong khi cấu hình chạy **không đổi một chữ**.

Phát hiện bằng cách so inode:

```bash
stat -c "%i %s" /srv/workizen-3d/Caddyfile
docker exec workizen-3d-caddy-1 stat -c "%i %s" /etc/caddy/Caddyfile
```

Khác nhau ⇒ `docker restart workizen-3d-caddy-1` (kết nối mạng vẫn giữ).

Kiểm cấu hình **đang chạy** thay vì tin file:

```bash
docker exec workizen-3d-caddy-1 curl -s http://127.0.0.1:2019/config/ | grep -c portal
```

⚠️ Dùng `127.0.0.1`, **không** dùng `localhost` — trong container nó ra IPv6 và
bị từ chối, cho cảm giác admin API đã chết.

## Nguyên tắc

Sửa cấu hình **trong repo này rồi deploy**, đừng sửa tay trên máy chủ. Sửa tay
sẽ bị lần deploy sau ghi đè — đó chính là cách sự cố trên xảy ra.
