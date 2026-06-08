#!/usr/bin/env node
/**
 * Đo bounding box của GLB files dùng gltf-transform
 * Usage: node scripts/measure-glb.mjs <path-to-glb>...
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const targets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "../apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01.glb",
      "../apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_02.glb",
      "../apps/workizen-3d/public/assets/models/SM_Chr_RobotCitizen_01.glb",
      "../apps/workizen-3d/public/assets/models/SM_Chr_KnowledgeCitizen_01.glb",
      "../apps/workizen-3d/public/assets/models/SM_Chr_ComputeCitizen_01.glb",
    ];

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);

for (const rel of targets) {
  const absPath = path.resolve(__dirname, rel);
  try {
    const doc = await io.read(absPath);
    const root = doc.getRoot();

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    let totalVertices = 0;

    for (const mesh of root.listMeshes()) {
      for (const prim of mesh.listPrimitives()) {
        const pos = prim.getAttribute("POSITION");
        if (!pos) continue;
        const count = pos.getCount();
        totalVertices += count;
        for (let i = 0; i < count; i++) {
          const [x, y, z] = pos.getElement(i, []);
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          if (z < minZ) minZ = z;
          if (z > maxZ) maxZ = z;
        }
      }
    }

    const w = maxX - minX;
    const h = maxY - minY;
    const d = maxZ - minZ;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const cz = (minZ + maxZ) / 2;

    console.log(`\n── ${path.basename(absPath)} ──`);
    console.log(`  Vertices : ${totalVertices}`);
    console.log(`  Width  X : ${w.toFixed(4)} (${minX.toFixed(4)} → ${maxX.toFixed(4)})`);
    console.log(`  Height Y : ${h.toFixed(4)} (${minY.toFixed(4)} → ${maxY.toFixed(4)})`);
    console.log(`  Depth  Z : ${d.toFixed(4)} (${minZ.toFixed(4)} → ${maxZ.toFixed(4)})`);
    console.log(`  Center   : (${cx.toFixed(4)}, ${cy.toFixed(4)}, ${cz.toFixed(4)})`);
    console.log(`  rawH (Y) : ${h.toFixed(4)}  ← dùng giá trị này cho tripoH()`);

    // Gợi ý scale để đạt HEIGHT.HUMAN = 1.20
    const targetH = 1.20;
    const suggestedScale = (targetH / h).toFixed(4);
    const suggestedYOffset = (targetH / 2).toFixed(4);
    console.log(`  → tripoH(1.20, ${h.toFixed(4)}) = scale=${suggestedScale}, yOffset=${suggestedYOffset}`);

  } catch (err) {
    console.error(`  ✗ ${path.basename(absPath)}: ${err.message}`);
  }
}
