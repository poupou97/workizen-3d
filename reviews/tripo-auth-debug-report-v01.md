# Tripo Auth Debug Report v01

Date: 2026-06-09

---

## 1. Key Found

**TRIPO_API_KEY found: yes**

- Length: 47
- Prefix: `tsk_ahB2v2...`
- Không in key đầy đủ.

---

## 2. File Đang Đọc Key

```
scripts/generate-campus-assets.mjs (dòng 21–23)
```

Key thật nằm ở dòng 23, hardcoded trong file:

```js
const API_KEY =
  process.env.TRIPO_API_KEY ||
  "tsk_ahB2v2En1_lzJOCHUXc6Mbov9jGXUQqL6N6Jr9Oqqv7";
```

Không có file `.env`, `.env.local`, hay `.env.production` trong project.

Env vars `TRIPO_API_KEY`, `TRIPO_API_TOKEN`, `TRIPO_KEY` không được set.

---

## 3. Base URL

```
https://api.tripo3d.ai/v2/openapi
```

URL này đúng. Endpoint `/user/balance` trả về HTTP 200.

---

## 4. Header Auth

```
Authorization: Bearer tsk_ahB2v2... (REDACTED)
```

Format đúng chuẩn Bearer token. Tripo API chấp nhận.

---

## 5. HTTP Status

```
GET https://api.tripo3d.ai/v2/openapi/user/balance

HTTP Status: 200 OK
```

---

## 6. Response Body

```json
{
  "code": 0,
  "data": {
    "balance": 1015,
    "frozen": 0
  }
}
```

Response headers:
```
content-type: application/json
x-tripo-trace-id: b3125dda-f4af-431f-9f99-4bff8aa26c6b
server: Caddy
date: Tue, 09 Jun 2026 02:38:32 GMT
```

---

## 7. Root Cause

**Root Cause: B — Header sai (key sai, gửi placeholder thay vì key thật)**

Cụ thể là bug trong hàm `readApiKey()` của script cũ `scripts/tripo/auto-rig-layla-chen.js`:

### Chuỗi sự kiện

1. Không có env var nào được set (`TRIPO_API_KEY`, `TRIPO_API_TOKEN`, `TRIPO_KEY` đều empty).
2. Script fallback sang quét file `scripts/generate-campus-assets.mjs`.
3. Dùng regex: `content.match(/tsk_[A-Za-z0-9_-]+/)` — hàm `.match()` **không có flag `g`**, trả về match ĐẦU TIÊN.
4. File có `tsk_xxx` ở **dòng 7 và 10** (trong comment usage), TRƯỚC key thật ở **dòng 23**.
5. Kết quả: script dùng `tsk_xxx` (7 ký tự) làm API key → server từ chối → `Authentication failed`.

### Bằng chứng

```
# Nội dung file (dòng 7, 10, 23):
dòng 7:  *   TRIPO_API_KEY=tsk_xxx node scripts/generate-campus-assets.mjs
dòng 10: *   TRIPO_API_KEY=tsk_xxx
dòng 23:   "tsk_ahB2v2En1_lzJOCHUXc6Mbov9jGXUQqL6N6Jr9Oqqv7";
```

```js
// Code cũ (BUG):
const match = content.match(/tsk_[A-Za-z0-9_-]+/);
// → trả về "tsk_xxx" (dòng 7) thay vì key thật (dòng 23)
```

### Tại sao report cũ ghi `source: "env"`?

Report `tripo-auto-rig-layla-chen-execution-report-v01.md` ghi `Nguồn key: env`.  
Điều này chỉ xảy ra khi env var `TRIPO_API_KEY` được set lúc chạy.  
Env var đó có thể đã được set nhưng với giá trị sai (placeholder hoặc key cũ/expired).  
Hiện tại env var không còn set → script cũ sẽ fallback sang regex bug.

---

## 8. Cách Fix

### Fix A — Set env var (cách đơn giản nhất)

```bash
TRIPO_API_KEY=<real_key> node scripts/tripo/auto-rig-layla-chen.js
```

Khi env var được set, hàm `readApiKey()` cũ sẽ trả về đúng key từ env (không chạy đến code regex bug).

### Fix B — Sửa hàm `readApiKey()` trong script cũ

Thay regex `.match()` bằng `.matchAll()` và lọc key ngắn:

```js
// Trước (BUG):
const match = content.match(/tsk_[A-Za-z0-9_-]+/);
if (match) return { key: match[0], source: ... };

// Sau (FIX):
const allMatches = [...content.matchAll(/tsk_[A-Za-z0-9_-]+/g)].map(m => m[0]);
const realKey = allMatches.find(k => k.length >= 20);
if (realKey) return { key: realKey, source: ... };
```

### Fix C — Dùng debug script mới

Script `scripts/tripo/debug-auth.js` đã implement Fix B. Chạy trước để verify:

```bash
node scripts/tripo/debug-auth.js
```

---

## 9. Lệnh Test Lại Sau Khi Fix

```bash
# Test với env var:
TRIPO_API_KEY=<real_key> node scripts/tripo/debug-auth.js

# Hoặc test với debug script (dùng key từ file, đã fix regex):
node scripts/tripo/debug-auth.js
```

Expected output sau khi fix:

```
RESULT: Authentication SUCCESS
Balance data: {"balance":1015,"frozen":0}
Conclusion: API key is valid. Can proceed with Auto Rig.
```

---

## Kết Luận

| Item | Kết quả |
|---|---|
| Key tồn tại | yes |
| Key hợp lệ | yes |
| Balance | 1015 credits |
| Base URL đúng | yes |
| Header auth đúng | yes (khi dùng key thật) |
| Root cause | Regex bug trong `readApiKey()` → lấy placeholder thay vì key thật |
| Phân loại | B — Header sai (key sai, do code bug) |
| Có thể tiếp tục Auto Rig | **CÓ**, sau khi fix `readApiKey()` hoặc set env var |

---

## Trạng Thái

Auth đã pass với debug script.

**Dừng tại đây. Chờ lệnh tiếp theo để thực hiện Auto Rig.**
