#!/usr/bin/env node
/**
 * Workizen HQ Campus — Tripo3D API Asset Generator
 * Tự động sinh toàn bộ 3D assets và download GLB về project
 *
 * Cách dùng:
 *   TRIPO_API_KEY=tsk_xxx node scripts/generate-campus-assets.mjs
 *
 * Hoặc set key trong file .env.local:
 *   TRIPO_API_KEY=tsk_xxx
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────

const API_KEY =
  process.env.TRIPO_API_KEY ||
  "tsk_ahB2v2En1_lzJOCHUXc6Mbov9jGXUQqL6N6Jr9Oqqv7";
const API_BASE = "https://api.tripo3d.ai/v2/openapi";
const OUTPUT_DIR = path.join(
  __dirname,
  "../apps/workizen-3d/public/assets/models"
);
const REPORT_PATH = path.join(__dirname, "../output/tripo-generation-report.json");

const POLL_INTERVAL_MS = 8000;  // poll mỗi 8 giây
const MAX_WAIT_MS = 10 * 60 * 1000; // timeout 10 phút mỗi asset

// ── Asset List ────────────────────────────────────────────────────────────────
// Tất cả assets cần generate cho Workizen HQ Campus (Variation D)
// Đã bỏ những gì Synty pack đã có (cây, bụi, hoa, đèn, ghế, đài phun nước, đá)

const ASSETS = [
  // ── BUILDINGS ──────────────────────────────────────────────────────────────
  {
    filename: "SM_Bld_AIAgentLab_01",
    category: "building",
    priority: 1,
    face_limit: 6000,
    prompt:
      "low poly stylized circular futuristic landmark building, large friendly cute robot face embedded in the facade, blue cyan neon glowing ring around the dome, sci-fi meets city hall, game asset, Synty POLYGON style, clean flat-shaded geometry, no text",
  },
  {
    filename: "SM_Bld_FounderTower_01",
    category: "building",
    priority: 1,
    face_limit: 5000,
    prompt:
      "low poly tall modern office tower, glass curtain wall, rectangular blocky shapes, urban city building, game asset, Synty POLYGON style, blue glass and white concrete, no text",
  },
  {
    filename: "SM_Bld_KnowledgeLibrary_01",
    category: "building",
    priority: 1,
    face_limit: 5000,
    prompt:
      "low poly classic library building, arched windows, stone facade, warm beige color, book motif on entrance, cartoon game asset, Synty POLYGON style, clean geometry",
  },
  {
    filename: "SM_Bld_ComputeCenter_01",
    category: "building",
    priority: 1,
    face_limit: 5000,
    prompt:
      "low poly modern tech data center building, industrial design, ventilation grilles, grey and dark blue colors, server farm aesthetic, cartoon game asset, Synty POLYGON style",
  },
  {
    filename: "SM_Bld_OpportunityCenter_01",
    category: "building",
    priority: 1,
    face_limit: 5000,
    prompt:
      "low poly round dome marketplace building, colorful striped awning, warm orange and cream colors, shop front with large windows, cartoon game asset, Synty POLYGON style",
  },
  {
    filename: "SM_Bld_TeamOffice_01",
    category: "building",
    priority: 1,
    face_limit: 5000,
    prompt:
      "low poly modern co-working office building, open floor plan, large glass windows, contemporary architecture, green plants visible inside, cartoon game asset, Synty POLYGON style",
  },

  // ── PROPS ──────────────────────────────────────────────────────────────────
  {
    filename: "SM_Prop_Blimp_01",
    category: "prop",
    priority: 2,
    face_limit: 2000,
    prompt:
      "low poly airship blimp floating in air, oval balloon body, small gondola underneath, blue and white colors, cartoon game asset, Synty POLYGON style",
  },
  {
    filename: "SM_Prop_Pier_01",
    category: "prop",
    priority: 2,
    face_limit: 2000,
    prompt:
      "low poly wooden seaside pier dock, wooden planks, rope fence railings, warm brown colors, cartoon game asset, Synty POLYGON style, viewed from angle",
  },
  {
    filename: "SM_Prop_InfoBoard_01",
    category: "prop",
    priority: 3,
    face_limit: 1000,
    prompt:
      "low poly information board sign post with display screen, modern design, blue glowing screen, cartoon game asset, Synty POLYGON style",
  },

  // ── ENVIRONMENT ────────────────────────────────────────────────────────────
  {
    filename: "SM_Env_CherryBlossom_01",
    category: "environment",
    priority: 2,
    face_limit: 1500,
    prompt:
      "low poly cherry blossom sakura tree, pink flower clusters, round canopy, slim trunk, Japanese garden style, cartoon game asset, Synty POLYGON style, flat shaded",
  },
  {
    filename: "SM_Env_CherryBlossom_02",
    category: "environment",
    priority: 3,
    face_limit: 1500,
    prompt:
      "low poly cherry blossom sakura tree, pink flower clusters, wider spreading branches, cartoon game asset, Synty POLYGON style, flat shaded, different shape from first variant",
  },
  {
    filename: "SM_Env_PalmTree_01",
    category: "environment",
    priority: 2,
    face_limit: 1500,
    prompt:
      "low poly tropical coconut palm tree, curved trunk, green palm leaves, cartoon game asset, Synty POLYGON style, flat shaded clean geometry",
  },
  {
    filename: "SM_Env_Bamboo_01",
    category: "environment",
    priority: 3,
    face_limit: 1000,
    prompt:
      "low poly bamboo cluster, green segmented stalks, small leaves, Japanese garden style, cartoon game asset, Synty POLYGON style, flat shaded",
  },

  // ── CHARACTERS (need T-pose for rigging) ───────────────────────────────────
  {
    filename: "SM_Chr_RobotCitizen_01",
    category: "character",
    priority: 1,
    face_limit: 4000,
    quad: true,
    prompt:
      "low poly cute friendly small robot character, round head with big glowing eyes, compact humanoid body, T-pose, cartoon game character, Synty POLYGON style, blue and white colors, simple clean geometry, no weapons, no props",
  },
  {
    filename: "SM_Chr_HumanCitizen_01",
    category: "character",
    priority: 1,
    face_limit: 4000,
    quad: true,
    prompt:
      "low poly cartoon male human character, casual office clothes, friendly face, T-pose, game character, Synty POLYGON style, simple blocky proportions, no weapons, no props",
  },
  {
    filename: "SM_Chr_HumanCitizen_02",
    category: "character",
    priority: 2,
    face_limit: 4000,
    quad: true,
    prompt:
      "low poly cartoon female human character, casual work clothes, friendly face, T-pose, game character, Synty POLYGON style, simple blocky proportions, no weapons, no props",
  },
  {
    filename: "SM_Chr_KnowledgeCitizen_01",
    category: "character",
    priority: 2,
    face_limit: 4000,
    quad: true,
    prompt:
      "low poly cartoon scholar student character, wearing glasses, smart outfit, T-pose, game character, Synty POLYGON style, simple blocky proportions, no props",
  },
  {
    filename: "SM_Chr_ComputeCitizen_01",
    category: "character",
    priority: 2,
    face_limit: 4000,
    quad: true,
    prompt:
      "low poly cartoon tech engineer character, wearing casual hoodie, T-pose, game character, Synty POLYGON style, simple blocky proportions, no weapons",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

async function checkBalance() {
  const res = await fetch(`${API_BASE}/user/balance`, { headers });
  const data = await res.json();
  return data.data?.balance ?? 0;
}

async function createTask(asset) {
  const body = {
    type: "text_to_model",
    prompt: asset.prompt,
    face_limit: asset.face_limit ?? 3000,
    texture: true,
    texture_quality: "detailed",
    ...(asset.quad && { quad: true }),
  };

  const res = await fetch(`${API_BASE}/task`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (data.code !== 0) {
    throw new Error(`Create task failed: ${data.message} (code ${data.code})`);
  }
  return data.data.task_id;
}

async function pollTask(taskId) {
  const start = Date.now();
  while (Date.now() - start < MAX_WAIT_MS) {
    await sleep(POLL_INTERVAL_MS);
    const res = await fetch(`${API_BASE}/task/${taskId}`, { headers });
    const data = await res.json();
    const task = data.data;

    if (!task) throw new Error("Empty task response");

    const status = task.status;
    const progress = task.progress ?? "?";
    process.stdout.write(`  status: ${status} (${progress}%)  \r`);

    if (status === "success") return task.output;
    if (status === "failed" || status === "cancelled")
      throw new Error(`Task ${status}: ${task.message ?? ""}`);
  }
  throw new Error("Timeout waiting for task");
}

async function downloadGLB(url, outputPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function log(msg) {
  console.log(`\n${msg}`);
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Workizen Campus — Tripo3D Asset Generator ===\n");

  // Check balance
  const balance = await checkBalance();
  console.log(`Credits hiện tại: ${balance}`);
  if (balance === 0) {
    console.error(
      "\n❌ Hết credits! Vui lòng nạp tại: https://platform.tripo3d.ai\n" +
      "   Tối thiểu 100 credits = $1. Campus cần ~1,250 credits = $12.50\n"
    );
    process.exit(1);
  }

  // Sort by priority
  const queue = [...ASSETS].sort((a, b) => a.priority - b.priority);

  // Filter already-done assets
  const todo = queue.filter((asset) => {
    const outPath = path.join(OUTPUT_DIR, `${asset.filename}.glb`);
    const exists = fs.existsSync(outPath);
    if (exists) console.log(`  ✓ Skip (đã có): ${asset.filename}.glb`);
    return !exists;
  });

  if (todo.length === 0) {
    console.log("\n✅ Tất cả assets đã được generate!");
    return;
  }

  console.log(`\nCần generate: ${todo.length} assets\n`);
  console.log(`Credits ước tính cần: ~${todo.length * 20} credits\n`);

  const report = { generated: [], failed: [], skipped: [] };
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (let i = 0; i < todo.length; i++) {
    const asset = todo[i];
    log(`[${i + 1}/${todo.length}] ${asset.filename} (${asset.category})`);
    console.log(`  prompt: "${asset.prompt.slice(0, 80)}..."`);

    try {
      // Create task
      const taskId = await createTask(asset);
      console.log(`  task_id: ${taskId}`);

      // Poll until done
      const output = await pollTask(taskId);
      console.log(); // newline after \r progress

      // Get download URL (prefer pbr_model if available)
      const glbUrl = output?.pbr_model ?? output?.model;
      if (!glbUrl) throw new Error("No download URL in response");

      // Download GLB
      const outputPath = path.join(OUTPUT_DIR, `${asset.filename}.glb`);
      await downloadGLB(glbUrl, outputPath);

      const sizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
      console.log(`  ✅ Saved: ${asset.filename}.glb (${sizeMB}MB)`);

      report.generated.push({
        filename: asset.filename,
        category: asset.category,
        taskId,
        sizeMB,
        prompt: asset.prompt,
      });

      // Check remaining balance
      const remaining = await checkBalance();
      console.log(`  Credits còn lại: ${remaining}`);

    } catch (err) {
      console.error(`  ❌ Lỗi: ${err.message}`);
      report.failed.push({ filename: asset.filename, error: err.message });
    }

    // Small delay between tasks to avoid rate limiting
    if (i < todo.length - 1) await sleep(2000);
  }

  // Save report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  console.log("\n=== KẾT QUẢ ===");
  console.log(`✅ Generated: ${report.generated.length}`);
  console.log(`❌ Failed:    ${report.failed.length}`);
  if (report.failed.length > 0) {
    console.log("   Failed assets:");
    report.failed.forEach((f) => console.log(`   - ${f.filename}: ${f.error}`));
  }
  console.log(`\nReport: ${REPORT_PATH}`);
  console.log(`Models: ${OUTPUT_DIR}`);

  if (report.generated.length > 0) {
    console.log(
      "\n📝 Tiếp theo: Thêm các model mới vào CampusScene.tsx và cập nhật manifest.json"
    );
  }
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
