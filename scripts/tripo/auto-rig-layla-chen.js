#!/usr/bin/env node

/**
 * Auto-rig exactly one Workizen citizen with Tripo API.
 *
 * Target:
 *   human-plaza-01 / Layla Chen
 *
 * This script intentionally does not print API keys.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "../..");
const API_BASE = "https://api.tripo3d.ai/v2/openapi";
const INPUT_MODEL = path.join(ROOT, "apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01.glb");
const OLD_FAILED_RIG = path.join(ROOT, "apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01_Rigged.glb");
const OUTPUT_DIR = path.join(ROOT, "apps/workizen-3d/public/assets/rigged/layla-chen");
const ANIMATION_DIR = path.join(OUTPUT_DIR, "animations");
const SOURCE_FBX_DIR = path.join(OUTPUT_DIR, "source-fbx");
const REPORT_PATH = path.join(ROOT, "reviews/tripo-auto-rig-layla-chen-execution-report-v01.md");
const GENERATION_REPORT = path.join(ROOT, "output/tripo-generation-report.json");

const TARGET_ASSET = "SM_Chr_HumanCitizen_01";
const RIGGED_OUTPUT = path.join(OUTPUT_DIR, "LaylaChen_Rigged.glb");
const POLL_INTERVAL_MS = Number(process.env.TRIPO_POLL_INTERVAL_MS ?? 8000);
const MAX_WAIT_MS = Number(process.env.TRIPO_MAX_WAIT_MS ?? 15 * 60 * 1000);

function redact(value) {
  return value ? "[redacted]" : "";
}

function readApiKey() {
  const envKey = process.env.TRIPO_API_KEY || process.env.TRIPO_API_TOKEN || process.env.TRIPO_KEY;
  if (envKey) return { key: envKey, source: "env" };

  const candidates = [
    path.join(ROOT, "scripts/generate-campus-assets.mjs"),
  ];

  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, "utf8");
    // Use matchAll + filter to skip short placeholder values like "tsk_xxx" in comments.
    const allMatches = [...content.matchAll(/tsk_[A-Za-z0-9_-]+/g)].map((m) => m[0]);
    const realKey = allMatches.find((k) => k.length >= 20);
    if (realKey) return { key: realKey, source: path.relative(ROOT, file) };
  }

  return { key: "", source: "" };
}

function ensureDirs() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(ANIMATION_DIR, { recursive: true });
  fs.mkdirSync(SOURCE_FBX_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
}

function getHeaders(apiKey) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

async function requestJson(apiKey, endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...getHeaders(apiKey),
      ...(options.headers ?? {}),
    },
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { code: -1, message: text };
  }
  return {
    ok: res.ok,
    status: res.status,
    traceId: res.headers.get("X-Tripo-Trace-ID") ?? "",
    data,
  };
}

async function postTask(apiKey, body) {
  const result = await requestJson(apiKey, "/task", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!result.ok || result.data.code !== 0) {
    const message = result.data?.message || `HTTP ${result.status}`;
    throw new Error(`${body.type} failed: ${message}`);
  }
  return { taskId: result.data.data.task_id, traceId: result.traceId };
}

async function pollTask(apiKey, taskId) {
  const start = Date.now();
  while (Date.now() - start < MAX_WAIT_MS) {
    await sleep(POLL_INTERVAL_MS);
    const result = await requestJson(apiKey, `/task/${taskId}`, { method: "GET" });
    if (!result.ok || result.data.code !== 0) {
      const message = result.data?.message || `HTTP ${result.status}`;
      throw new Error(`poll failed for ${taskId}: ${message}`);
    }

    const task = result.data.data;
    const status = task.status;
    const progress = task.progress ?? "?";
    console.log(`task ${taskId}: ${status} (${progress}%)`);

    if (status === "success") return task;
    if (["failed", "cancelled", "banned", "expired", "unknown"].includes(status)) {
      throw new Error(`task ${taskId} finalized as ${status}: ${task.message ?? ""}`);
    }
  }
  throw new Error(`timeout waiting for task ${taskId}`);
}

async function downloadFile(url, outputPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  return buffer.length;
}

function findExistingSourceTaskId() {
  if (!fs.existsSync(GENERATION_REPORT)) return "";
  const report = JSON.parse(fs.readFileSync(GENERATION_REPORT, "utf8"));
  const match = report.generated?.find((entry) => entry.filename === TARGET_ASSET);
  return match?.taskId ?? "";
}

async function tryCreateUploadSession(apiKey) {
  const attempts = [
    { endpoint: "/upload/sts", body: { format: "glb" } },
    { endpoint: "/upload/sts", body: { type: "glb", format: "glb" } },
    { endpoint: "/upload", body: { format: "glb" } },
  ];

  for (const attempt of attempts) {
    try {
      const result = await requestJson(apiKey, attempt.endpoint, {
        method: "POST",
        body: JSON.stringify(attempt.body),
      });
      if (result.ok && result.data.code === 0 && result.data.data?.resource_uri) {
        return { endpoint: attempt.endpoint, data: result.data.data, traceId: result.traceId };
      }
    } catch {
      // Continue to fallback attempts.
    }
  }

  return undefined;
}

function awsEncode(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}

function hmac(key, value, encoding) {
  return crypto.createHmac("sha256", key).update(value, "utf8").digest(encoding);
}

function sha256(value, encoding = "hex") {
  return crypto.createHash("sha256").update(value).digest(encoding);
}

function getAwsSignatureKey(secretKey, dateStamp, region, service) {
  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, "aws4_request");
}

async function putToS3WithSts(uploadSession, filePath) {
  const data = uploadSession.data;
  const region = "us-west-2";
  const service = "s3";
  const method = "PUT";
  const bucket = data.resource_bucket || "tripo-data";
  const host = data.s3_host || "s3.us-west-2.amazonaws.com";
  const key = data.resource_uri;
  const body = fs.readFileSync(filePath);
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const canonicalUri = `/${bucket}/${key.split("/").map(awsEncode).join("/")}`;
  const canonicalQueryString = "";
  const payloadHash = sha256(body);
  const canonicalHeaders =
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-security-token:${data.session_token}\n`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date;x-amz-security-token";
  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join("\n");
  const signingKey = getAwsSignatureKey(data.sts_sk, dateStamp, region, service);
  const signature = hmac(signingKey, stringToSign, "hex");
  const authorization =
    `AWS4-HMAC-SHA256 Credential=${data.sts_ak}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(`https://${host}${canonicalUri}`, {
    method,
    headers: {
      Authorization: authorization,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
      "x-amz-security-token": data.session_token,
      "Content-Type": "model/gltf-binary",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`S3 upload failed: HTTP ${res.status} ${text.slice(0, 160)}`);
  }

  return {
    bucket,
    key,
    object: { bucket, key },
  };
}

async function tryImportUploadedModel(apiKey, s3Object) {
  const { taskId, traceId } = await postTask(apiKey, {
    type: "import_model",
    file: {
      object: s3Object.object,
    },
  });
  const task = await pollTask(apiKey, taskId);
  return { taskId, traceId, task };
}

function getOutputUrl(task) {
  return task.output?.pbr_model || task.output?.model || task.output?.base_model;
}

async function validateGlb(filePath) {
  if (!fs.existsSync(filePath)) {
    return { pass: false, error: "file_not_found" };
  }

  const buffer = fs.readFileSync(filePath);
  if (buffer.readUInt32LE(0) !== 0x46546c67) {
    return { pass: false, error: "not_glb" };
  }

  const jsonLength = buffer.readUInt32LE(12);
  const json = JSON.parse(buffer.slice(20, 20 + jsonLength).toString("utf8"));
  const skins = json.skins ?? [];
  const jointsCount = skins.reduce((sum, skin) => sum + (skin.joints?.length ?? 0), 0);
  const skeletonExists = (json.nodes ?? []).some((node) => /hip|root|spine|mixamo|rig/i.test(node.name ?? ""));
  const attributes = [];
  for (const mesh of json.meshes ?? []) {
    for (const primitive of mesh.primitives ?? []) {
      attributes.push(Object.keys(primitive.attributes ?? {}));
    }
  }
  const hasJoints0 = attributes.some((keys) => keys.includes("JOINTS_0"));
  const hasWeights0 = attributes.some((keys) => keys.includes("WEIGHTS_0"));
  const animations = json.animations ?? [];
  const positionBounds = [];
  for (const mesh of json.meshes ?? []) {
    for (const primitive of mesh.primitives ?? []) {
      const accessorIndex = primitive.attributes?.POSITION;
      const accessor = json.accessors?.[accessorIndex];
      if (accessor?.min && accessor?.max) {
        positionBounds.push({
          min: accessor.min,
          max: accessor.max,
          size: accessor.max.map((value, index) => value - accessor.min[index]),
        });
      }
    }
  }
  const maxBound = positionBounds.reduce((max, bound) => Math.max(max, ...bound.size.map(Math.abs)), 0);
  const boundingBoxNotHuge = maxBound > 0 && maxBound < 200;
  const animationTargets = new Set();
  for (const animation of animations) {
    for (const channel of animation.channels ?? []) {
      const node = json.nodes?.[channel.target?.node];
      if (node?.name) animationTargets.add(node.name);
    }
  }

  return {
    pass: skins.length > 0 && jointsCount > 0 && hasJoints0 && hasWeights0 && boundingBoxNotHuge,
    skeletonExists,
    skinCount: skins.length,
    jointsCount,
    hasJoints0,
    hasWeights0,
    boundingBoxNotHuge,
    maxBound,
    animationClipCount: animations.length,
    animationTargetCount: animationTargets.size,
    fileSizeBytes: buffer.length,
  };
}

async function run() {
  ensureDirs();

  const api = readApiKey();
  const apiKeyFound = Boolean(api.key);
  const events = [];
  const taskIds = {};
  const warnings = [];
  const outputs = {
    riggedModel: "",
    idle: "",
    walk: "",
    wave: "",
  };
  let sourceTaskId = "";
  let importTaskId = "";
  let uploadEndpoint = "";
  let rigSuccess = false;
  let animationsSuccess = {
    Idle: false,
    Walk: false,
    Wave: false,
  };
  let rigValidation = {};
  let canContinuePoc = false;
  let authCheck = { attempted: false, success: false, message: "" };

  console.log(`TRIPO_API_KEY found: ${apiKeyFound ? "yes" : "no"}`);
  console.log(`Input: ${path.relative(ROOT, INPUT_MODEL)}`);
  console.log(`Old failed rig ignored: ${path.relative(ROOT, OLD_FAILED_RIG)}`);

  try {
    if (!apiKeyFound) throw new Error("TRIPO_API_KEY not found");
    if (!fs.existsSync(INPUT_MODEL)) throw new Error("input model not found");

    authCheck.attempted = true;
    const balanceCheck = await requestJson(api.key, "/user/balance", { method: "GET" });
    if (!balanceCheck.ok || balanceCheck.data.code !== 0) {
      authCheck.message = balanceCheck.data?.message || `HTTP ${balanceCheck.status}`;
      throw new Error(`Tripo authentication check failed: ${authCheck.message}`);
    }
    authCheck.success = true;
    authCheck.message = "ok";
    events.push("Xác thực Tripo API thành công qua GET /user/balance.");

    const uploadSession = await tryCreateUploadSession(api.key);
    if (uploadSession) {
      uploadEndpoint = uploadSession.endpoint;
      events.push(`Tạo STS upload session qua ${uploadEndpoint}.`);
      const s3Object = await putToS3WithSts(uploadSession, INPUT_MODEL);
      events.push("Upload GLB source lên Tripo S3 thành công.");
      const imported = await tryImportUploadedModel(api.key, s3Object);
      importTaskId = imported.taskId;
      sourceTaskId = importTaskId;
      taskIds.import_model = importTaskId;
      events.push("Import model task thành công.");
    } else {
      warnings.push("Không tạo được STS upload session từ endpoint đã thử; fallback sang task id generation có sẵn.");
      sourceTaskId = findExistingSourceTaskId();
      if (!sourceTaskId) {
        throw new Error("Không có upload session và không tìm thấy task id gốc trong output/tripo-generation-report.json");
      }
      events.push("Dùng original_model_task_id có sẵn từ output/tripo-generation-report.json.");
    }

    const preRig = await postTask(api.key, {
      type: "animate_prerigcheck",
      original_model_task_id: sourceTaskId,
    });
    taskIds.animate_prerigcheck = preRig.taskId;
    const preRigTask = await pollTask(api.key, preRig.taskId);
    events.push(`Pre-rig check hoàn tất: ${preRigTask.output?.riggable === false ? "not riggable" : "riggable/unknown"}.`);

    const rig = await postTask(api.key, {
      type: "animate_rig",
      original_model_task_id: sourceTaskId,
      model_version: "v2.5-20260210",
      rig_type: "biped",
      spec: "tripo",
      out_format: "glb",
    });
    taskIds.animate_rig = rig.taskId;
    const rigTask = await pollTask(api.key, rig.taskId);
    const rigUrl = getOutputUrl(rigTask);
    if (!rigUrl) throw new Error("animate_rig success nhưng không có model URL trong output");

    await downloadFile(rigUrl, RIGGED_OUTPUT);
    outputs.riggedModel = path.relative(ROOT, RIGGED_OUTPUT);
    rigSuccess = true;
    rigValidation = await validateGlb(RIGGED_OUTPUT);
    events.push("Đã tải rigged GLB mới cho Layla Chen.");

    const retargetTasks = [
      { label: "Idle", preset: "preset:idle", output: path.join(ANIMATION_DIR, "Idle.glb") },
      { label: "Walk", preset: "preset:walk", output: path.join(ANIMATION_DIR, "Walk.glb") },
    ];

    for (const item of retargetTasks) {
      try {
        const retarget = await postTask(api.key, {
          type: "animate_retarget",
          original_model_task_id: rig.taskId,
          out_format: "glb",
          bake_animation: true,
          export_with_geometry: true,
          animation: item.preset,
          animate_in_place: true,
        });
        taskIds[`animate_retarget_${item.label.toLowerCase()}`] = retarget.taskId;
        const retargetTask = await pollTask(api.key, retarget.taskId);
        const url = getOutputUrl(retargetTask);
        if (!url) throw new Error(`${item.label} retarget success nhưng không có model URL`);
        await downloadFile(url, item.output);
        outputs[item.label.toLowerCase()] = path.relative(ROOT, item.output);
        animationsSuccess[item.label] = true;
        events.push(`Đã tạo animation ${item.label}.`);
      } catch (error) {
        warnings.push(`Không tạo được animation ${item.label}: ${error.message}`);
      }
    }

    warnings.push("Tripo docs hiện không liệt kê preset:wave; không gọi Wave bằng Tripo retarget để tránh task sai tham số.");
    canContinuePoc = Boolean(rigValidation.pass && rigSuccess);
  } catch (error) {
    warnings.push(error.message);
  }

  const report = renderReport({
    apiKeyFound,
    apiSource: api.source,
    inputFile: path.relative(ROOT, INPUT_MODEL),
    ignoredOldRig: path.relative(ROOT, OLD_FAILED_RIG),
    endpointsUsed: [
      "GET /user/balance",
      uploadEndpoint ? `${uploadEndpoint} (STS upload session)` : "",
      importTaskId ? "POST /task type=import_model" : "",
      "POST /task type=animate_prerigcheck",
      "POST /task type=animate_rig",
      "POST /task type=animate_retarget (Idle/Walk nếu rig thành công)",
      "GET /task/{task_id}",
      "download output model URL",
    ].filter(Boolean),
    sourceTaskId,
    taskIds,
    outputs,
    rigSuccess,
    animationsSuccess,
    rigValidation,
    authCheck,
    warnings,
    events,
    canContinuePoc,
  });

  fs.writeFileSync(REPORT_PATH, report);
  console.log(`Report: ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`Rigged model success: ${rigSuccess ? "yes" : "no"}`);
  console.log(`Can continue AnimatedModel POC: ${canContinuePoc ? "yes" : "no"}`);
}

function renderReport(data) {
  const taskLines = Object.entries(data.taskIds).map(([key, value]) => `- ${key}: \`${value}\``);
  const warningLines = data.warnings.length ? data.warnings.map((warning) => `- ${warning}`) : ["- Không có."];
  const eventLines = data.events.length ? data.events.map((event) => `- ${event}`) : ["- Không có."];
  const validation = data.rigValidation || {};

  return `# Tripo Auto Rig Layla Chen Execution Report v01

Date: 2026-06-09

## Tóm tắt

Mục tiêu là gọi Tripo API để tạo rigged character mới cho đúng một citizen test:

- Citizen: \`human-plaza-01\`
- Name: Layla Chen
- Không dùng lại file lỗi: \`${data.ignoredOldRig}\`
- Không thay đổi scene chính.

## API Key

TRIPO_API_KEY found: ${data.apiKeyFound ? "yes" : "no"}

Nguồn key: ${data.apiSource ? "`" + data.apiSource + "`" : "không có"}

Không có API key nào được ghi vào report.

## Endpoint Đã Dùng

${data.endpointsUsed.map((endpoint) => `- ${endpoint}`).join("\n")}

## Input

\`\`\`txt
${data.inputFile}
\`\`\`

## Output

Rigged model:

\`\`\`txt
${data.outputs.riggedModel || "Chưa tạo được"}
\`\`\`

Animations:

\`\`\`txt
Idle: ${data.outputs.idle || "Chưa tạo được"}
Walk: ${data.outputs.walk || "Chưa tạo được"}
Wave: ${data.outputs.wave || "Không tạo bằng Tripo trong lần này"}
\`\`\`

## Task ID Tripo

Source task id:

\`\`\`txt
${data.sourceTaskId || "Không có"}
\`\`\`

Tasks:

${taskLines.length ? taskLines.join("\n") : "- Không có task nào hoàn tất."}

## Kết Quả Rigged Model

Rigged model tạo thành công: ${data.rigSuccess ? "yes" : "no"}

## Xác Thực API

- auth check attempted: ${data.authCheck?.attempted ? "yes" : "no"}
- auth check success: ${data.authCheck?.success ? "yes" : "no"}
- auth message: ${data.authCheck?.message || "n/a"}

## Kết Quả Animation

- Idle: ${data.animationsSuccess.Idle ? "success" : "not created"}
- Walk: ${data.animationsSuccess.Walk ? "success" : "not created"}
- Wave: ${data.animationsSuccess.Wave ? "success" : "not created"}

Ghi chú: Tripo docs hiện thấy preset \`idle\` và \`walk\`, nhưng không thấy preset \`wave\` trong danh sách retarget preset.

## Validation

- skeleton exists: ${boolText(validation.skeletonExists)}
- skin count > 0: ${boolText((validation.skinCount ?? 0) > 0)} (${validation.skinCount ?? "n/a"})
- joint count > 0: ${boolText((validation.jointsCount ?? 0) > 0)} (${validation.jointsCount ?? "n/a"})
- có \`JOINTS_0\`: ${boolText(validation.hasJoints0)}
- có \`WEIGHTS_0\`: ${boolText(validation.hasWeights0)}
- bounding box không khổng lồ: ${boolText(validation.boundingBoxNotHuge)} (max bound: ${validation.maxBound ?? "n/a"})
- animation clip count: ${validation.animationClipCount ?? "n/a"}
- animation target count: ${validation.animationTargetCount ?? "n/a"}
- validation pass: ${boolText(validation.pass)}

Validation này là kiểm tra cấu trúc GLB sơ bộ. Chưa đưa asset vào scene chính.

## Log Sự Kiện

${eventLines.join("\n")}

## Warning / Error

${warningLines.join("\n")}

## Có Thể Tiếp Tục AnimatedModel POC Chưa?

${data.canContinuePoc ? "Có, nhưng chỉ nên làm POC cô lập cho đúng một citizen sau khi kiểm tra visual bằng screenshot." : "Chưa. Cần xử lý warning/error hoặc asset chưa pass validation."}

## Ràng Buộc Đã Giữ

- Không dùng lại \`SM_Chr_HumanCitizen_01_Rigged.glb\` cũ.
- Không animate toàn bộ citizens.
- Không sửa static \`TripoModel\`.
- Không đổi camera.
- Không đổi layout.
- Không refactor scene.
- Không xóa asset cũ.
`;
}

function boolText(value) {
  if (value === true) return "yes";
  if (value === false) return "no";
  return "n/a";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
