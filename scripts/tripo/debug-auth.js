#!/usr/bin/env node
/**
 * Debug Tripo API authentication only.
 * Calls GET /user/balance — no tasks, no uploads, no credits consumed.
 * Does NOT print the API key.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const API_BASE = "https://api.tripo3d.ai/v2/openapi";

// ── Key detection ────────────────────────────────────────────────────────────

function readApiKey() {
  // 1. Check environment variables first
  const envKey =
    process.env.TRIPO_API_KEY ||
    process.env.TRIPO_API_TOKEN ||
    process.env.TRIPO_KEY;
  if (envKey) {
    return { key: envKey, source: "env" };
  }

  // 2. Scan generate-campus-assets.mjs
  //    BUG in old script: it uses .match() which returns the FIRST match.
  //    The file has placeholder "tsk_xxx" in comments BEFORE the real key.
  //    Fix: collect ALL matches, filter out short placeholders (length < 20).
  const candidateFile = path.join(ROOT, "scripts/generate-campus-assets.mjs");
  if (fs.existsSync(candidateFile)) {
    const content = fs.readFileSync(candidateFile, "utf8");
    const allMatches = [...content.matchAll(/tsk_[A-Za-z0-9_-]+/g)].map(
      (m) => m[0]
    );
    // Real Tripo API keys are long (40+ chars). Placeholders like "tsk_xxx" are short.
    const realKey = allMatches.find((k) => k.length >= 20);
    if (realKey) {
      return { key: realKey, source: path.relative(ROOT, candidateFile) };
    }
    if (allMatches.length > 0) {
      return {
        key: allMatches[0],
        source: `${path.relative(ROOT, candidateFile)} (WARNING: only short/placeholder keys found)`,
      };
    }
  }

  return { key: "", source: "" };
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  const api = readApiKey();

  const found = Boolean(api.key);
  console.log(`\nTripo API Key Debug`);
  console.log(`===================`);
  console.log(`TRIPO_API_KEY found: ${found ? "yes" : "no"}`);
  if (found) {
    console.log(`Length: ${api.key.length}`);
    console.log(`Prefix: ${api.key.slice(0, 10)}...`);
    console.log(`Source: ${api.source}`);
  } else {
    console.log(`ERROR: No API key found. Set TRIPO_API_KEY env var.`);
    process.exit(1);
  }

  console.log(`\nEndpoint: GET ${API_BASE}/user/balance`);
  console.log(`Header: Authorization: Bearer [REDACTED]`);
  console.log(`---`);

  let res;
  let bodyText = "";
  try {
    res = await fetch(`${API_BASE}/user/balance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${api.key}`,
        "Content-Type": "application/json",
      },
    });
    bodyText = await res.text();
  } catch (err) {
    console.log(`\nNetwork error: ${err.message}`);
    process.exit(1);
  }

  console.log(`\nHTTP Status: ${res.status} ${res.statusText}`);

  // Print relevant headers (no auth headers)
  const importantHeaders = [
    "content-type",
    "x-tripo-trace-id",
    "x-request-id",
    "www-authenticate",
    "server",
    "date",
  ];
  console.log(`\nResponse Headers (selected):`);
  for (const h of importantHeaders) {
    const val = res.headers.get(h);
    if (val) console.log(`  ${h}: ${val}`);
  }

  // Parse and print body
  let body;
  try {
    body = JSON.parse(bodyText);
  } catch {
    body = bodyText;
  }

  console.log(`\nResponse Body:`);
  console.log(JSON.stringify(body, null, 2));

  // ── Diagnosis ──────────────────────────────────────────────────────────────
  console.log(`\n--- ROOT CAUSE ANALYSIS ---`);

  if (res.status === 200 && (typeof body === "object" && body.code === 0)) {
    console.log(`RESULT: Authentication SUCCESS`);
    console.log(`Balance data: ${JSON.stringify(body.data ?? {})}`);
    console.log(`\nConclusion: API key is valid. Can proceed with Auto Rig.`);
    return;
  }

  if (res.status === 401 || res.status === 403) {
    const msg = (typeof body === "object" ? body.message : String(body)) ?? "";
    console.log(`RESULT: Authentication FAILED (HTTP ${res.status})`);
    console.log(`Server message: "${msg}"`);

    if (api.key.length < 20) {
      console.log(`\nROOT CAUSE: B + A — Key tooShort (length ${api.key.length})`);
      console.log(`Diagnosis: Script đang dùng PLACEHOLDER "tsk_xxx" từ comment trong file.`);
      console.log(`           Regex .match() lấy match ĐẦU TIÊN trong file.`);
      console.log(`           Placeholder xuất hiện TRƯỚC key thật trong comment dòng 7-10.`);
      console.log(`Fix: Set env var TRIPO_API_KEY=<real_key> trước khi chạy script.`);
    } else {
      console.log(`\nROOT CAUSE: A — Key invalid hoặc expired`);
      console.log(`Diagnosis: Key length ${api.key.length} (ok), nhưng server từ chối.`);
      console.log(`           Có thể key đã hết hạn, bị revoke, hoặc sai.`);
      console.log(`Fix: Lấy API key mới từ https://platform.tripo3d.ai/`);
    }
    return;
  }

  if (res.status === 404) {
    console.log(`RESULT: Endpoint not found (HTTP 404)`);
    console.log(`ROOT CAUSE: C hoặc D — Base URL hoặc API version sai`);
    console.log(`Đang dùng: ${API_BASE}/user/balance`);
    console.log(`Fix: Kiểm tra tài liệu chính thức xem endpoint balance còn tồn tại không.`);
    return;
  }

  console.log(`RESULT: Unexpected HTTP ${res.status}`);
  console.log(`ROOT CAUSE: F — Nguyên nhân khác (xem response body ở trên)`);
}

run().catch((err) => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
