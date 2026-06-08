#!/usr/bin/env node
/**
 * Đọc raw JSON chunk của GLB để kiểm tra node transforms
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const targets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["../apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01.glb"];

for (const rel of targets) {
  const absPath = path.resolve(__dirname, rel);
  const buf = fs.readFileSync(absPath);

  // GLB header: magic(4) + version(4) + length(4) = 12 bytes
  // Chunk 0: chunkLength(4) + chunkType(4) + chunkData
  const chunkLength = buf.readUInt32LE(12);
  const chunkType = buf.readUInt32LE(16); // 0x4E4F534A = JSON
  const json = JSON.parse(buf.slice(20, 20 + chunkLength).toString("utf8"));

  console.log(`\n══ ${path.basename(absPath)} ══`);

  // Nodes
  const nodes = json.nodes ?? [];
  console.log(`\nNodes (${nodes.length}):`);
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const hasTransform = n.scale || n.translation || n.rotation || n.matrix;
    if (hasTransform || i < 5) {
      console.log(`  [${i}] "${n.name ?? ""}"`);
      if (n.scale)       console.log(`      scale:       [${n.scale.map(v => v.toFixed(4)).join(", ")}]`);
      if (n.translation) console.log(`      translation: [${n.translation.map(v => v.toFixed(4)).join(", ")}]`);
      if (n.rotation)    console.log(`      rotation:    [${n.rotation.map(v => v.toFixed(4)).join(", ")}]`);
      if (n.matrix)      console.log(`      matrix:      [${n.matrix.map(v => v.toFixed(3)).join(", ")}]`);
      if (n.mesh !== undefined) console.log(`      mesh:        ${n.mesh}`);
    }
  }

  // Scene root
  const scenes = json.scenes ?? [];
  if (scenes[0]) {
    console.log(`\nScene root nodes: [${scenes[0].nodes?.join(", ") ?? ""}]`);
  }

  // Accessors min/max (bounding box từ POSITION accessor)
  console.log(`\nAccessors with min/max (position bounds):`);
  for (const acc of (json.accessors ?? [])) {
    if (acc.min && acc.max && acc.min.length === 3) {
      const w = acc.max[0] - acc.min[0];
      const h = acc.max[1] - acc.min[1];
      const d = acc.max[2] - acc.min[2];
      console.log(`  count=${acc.count} | X:${w.toFixed(4)} Y:${h.toFixed(4)} Z:${d.toFixed(4)} | min=[${acc.min.map(v=>v.toFixed(3)).join(",")}] max=[${acc.max.map(v=>v.toFixed(3)).join(",")}]`);
    }
  }
}
