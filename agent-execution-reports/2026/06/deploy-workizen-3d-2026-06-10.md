# Deploy Report: Workizen 3D → workizen.net
**Date:** 2026-06-10  
**VM:** 137.131.35.185 (Oracle Cloud, Ubuntu 24.04, ARM64/aarch64)  
**Domain:** workizen.net  
**Status:** SUCCESS

---

## Result

| URL | Status |
|-----|--------|
| http://workizen.net | ✅ 308 → https://workizen.net |
| https://workizen.net | ✅ 200 — Workizen HQ Campus loaded |
| http://www.workizen.net | ✅ 308 → https://www.workizen.net |
| https://www.workizen.net | ✅ 301 → https://workizen.net |

TLS: Let's Encrypt via Caddy ACME (auto-renewing).  
Protocol: HTTP/2 on HTTPS.

---

## Files Created

```
deploy/workizen-3d/
├── Dockerfile          — multi-stage Next.js standalone build (node:22-alpine)
├── docker-compose.yml  — app + caddy services
├── Caddyfile           — workizen.net (app), www.workizen.net (301 redirect)
├── .dockerignore       — excludes node_modules, .next, .git
└── deploy.sh           — rsync + docker compose up --build

apps/workizen-3d/next.config.ts  — added output: "standalone"
```

---

## Steps Executed

### 1. Project Inspection
- App: Next.js 16.2.7, Three.js 0.184, React Three Fiber
- Build: `next build` → standalone output
- Added `output: "standalone"` to `next.config.ts` for minimal Docker image

### 2. VM State Check
- OS: Ubuntu 24.04.4 LTS, aarch64
- Disk: 45GB total, 2.7GB used
- RAM: 24GB, ~634MB used
- No existing containers, nothing on ports 80/443
- Existing: `unified-monitoring-agent` in /opt (untouched)

### 3. Firewall — Open Ports 80/443
**Backup created:** `/etc/iptables/rules.v4.bak.20260610174149`

Commands run on VM:
```bash
sudo cp /etc/iptables/rules.v4 /etc/iptables/rules.v4.bak.20260610174149
sudo iptables -I INPUT 5 -p tcp --dport 80 -m state --state NEW -j ACCEPT
sudo iptables -I INPUT 5 -p tcp --dport 443 -m state --state NEW -j ACCEPT
sudo iptables -I INPUT 5 -p udp --dport 443 -j ACCEPT
sudo sh -c 'iptables-save > /etc/iptables/rules.v4'
```

### 4. Docker Install
```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker ubuntu
```
Version installed: Docker 29.5.3, Docker Compose v5.1.4

### 5. Code Transfer
```bash
rsync -avz --delete --exclude=node_modules --exclude=.next --exclude=.git \
  apps/workizen-3d/ ubuntu@137.131.35.185:/srv/workizen-3d/
rsync -avz Dockerfile docker-compose.yml Caddyfile .dockerignore \
  ubuntu@137.131.35.185:/srv/workizen-3d/
```
Transferred: ~50MB (source + 66MB GLB assets)

### 6. Docker Build + Deploy
```bash
cd /srv/workizen-3d && sudo docker compose up --build -d
```
Build stages:
- `deps`: npm ci (419 packages, ~34s)
- `builder`: next build (compiled in 6.5s, TypeScript in 5.8s)
- `runner`: standalone output + public assets copied

### 7. Route53 DNS
```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z048982110IKRK19LARIQ \
  --change-batch '{ "Changes": [
    { "Action": "UPSERT", "ResourceRecordSet": { "Name": "workizen.net", "Type": "A", "TTL": 60, "ResourceRecords": [{"Value": "137.131.35.185"}] }},
    { "Action": "UPSERT", "ResourceRecordSet": { "Name": "www.workizen.net", "Type": "A", "TTL": 60, "ResourceRecords": [{"Value": "137.131.35.185"}] }}
  ]}'
```
Change ID: `/change/C07950512JIDOMVFSO94V` — reached INSYNC.

### 8. TLS Certificates
Caddy obtained Let's Encrypt certs for both domains automatically after DNS propagated (~2 minutes). Used tls-alpn-01 challenge.

---

## Architecture on VM

```
/srv/workizen-3d/
├── (Next.js source: src/, public/, package.json, etc.)
├── Dockerfile
├── docker-compose.yml
└── Caddyfile

Docker containers (workizen-3d network):
├── workizen-3d-app-1    — Next.js standalone, port 3000 (internal only)
└── workizen-3d-caddy-1  — Caddy 2, ports 80+443 → proxies to app:3000

Volumes:
├── workizen-3d_caddy_data   — TLS certs (persistent)
└── workizen-3d_caddy_config — Caddy config state
```

---

## Rollback Steps

### Revert iptables (close ports 80/443)
```bash
ssh -i oracle-key/ssh-key-2026-06-10.key ubuntu@137.131.35.185
sudo cp /etc/iptables/rules.v4.bak.20260610174149 /etc/iptables/rules.v4
sudo iptables-restore < /etc/iptables/rules.v4
```

### Stop containers
```bash
ssh ubuntu@137.131.35.185
cd /srv/workizen-3d && sudo docker compose down
```

### Remove everything from VM
```bash
cd /srv/workizen-3d && sudo docker compose down -v
cd / && sudo rm -rf /srv/workizen-3d
```

### Revert Route53 DNS
```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z048982110IKRK19LARIQ \
  --change-batch '{ "Changes": [
    { "Action": "DELETE", "ResourceRecordSet": { "Name": "workizen.net", "Type": "A", "TTL": 60, "ResourceRecords": [{"Value": "137.131.35.185"}] }},
    { "Action": "DELETE", "ResourceRecordSet": { "Name": "www.workizen.net", "Type": "A", "TTL": 60, "ResourceRecords": [{"Value": "137.131.35.185"}] }}
  ]}'
```

### Revert next.config.ts
Remove `output: "standalone"` from `apps/workizen-3d/next.config.ts`.

---

## Redeploy (after code changes)

```bash
cd /path/to/workizen-3d
bash deploy/workizen-3d/deploy.sh
```

This rsyncs new source and rebuilds the Docker image on the VM.
