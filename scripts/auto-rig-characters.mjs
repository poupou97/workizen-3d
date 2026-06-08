/**
 * auto-rig-characters.mjs
 *
 * Thêm Mixamo-compatible skeleton vào Tripo character GLBs (static mesh, no bones).
 * Output: public/assets/models/SM_Chr_*_Rigged.glb — có thể retarget Mixamo animations.
 *
 * Cách hoạt động:
 *   1. Đọc GLB, đo bounding box của mesh (minY → maxY).
 *   2. Đặt 16 bone theo tỉ lệ human chuẩn (Y từ thấp lên cao).
 *   3. Tính skinning weights tự động theo nearest-bone (proximity-based).
 *   4. Ghi thêm skin + joints vào GLB output.
 *
 * Giới hạn:
 *   - Skinning weights là proximity-based (không phải vẽ tay), phù hợp low-poly chibi.
 *   - Bone names dùng đúng quy ước `mixamorig:*` để Mixamo animation clips hoạt động.
 *
 * Usage:
 *   node scripts/auto-rig-characters.mjs [--char HumanCitizen_01]
 *   node scripts/auto-rig-characters.mjs          # xử lý tất cả 5 characters
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODELS_DIR = path.join(__dirname, '../apps/workizen-3d/public/assets/models');
const OUTPUT_DIR = path.join(__dirname, '../apps/workizen-3d/public/assets/models');

const CHARACTERS = [
  'SM_Chr_HumanCitizen_01',
  'SM_Chr_HumanCitizen_02',
  'SM_Chr_RobotCitizen_01',
  'SM_Chr_KnowledgeCitizen_01',
  'SM_Chr_ComputeCitizen_01',
];

// ── Mixamo bone hierarchy (16 bones) ──────────────────────────────────────────
// Mỗi bone: [name, parentIndex, relativeY_fraction_of_height]
// relativeY là vị trí trong [0, 1] của chiều cao nhân vật (0 = chân, 1 = đỉnh đầu)
// parentIndex = -1 nghĩa là root bone

const BONE_DEFS = [
  // [name, parentIdx, yFrac, xOffset, zOffset]
  ['mixamorig:Hips',             -1, 0.53,  0.00,  0.00],  // 0  — hông (trung tâm cơ thể)
  ['mixamorig:Spine',             0, 0.60,  0.00,  0.00],  // 1
  ['mixamorig:Spine1',            1, 0.68,  0.00,  0.00],  // 2
  ['mixamorig:Spine2',            2, 0.74,  0.00,  0.00],  // 3
  ['mixamorig:Neck',              3, 0.82,  0.00,  0.00],  // 4
  ['mixamorig:Head',              4, 0.88,  0.00,  0.00],  // 5  — đầu
  ['mixamorig:LeftShoulder',      3, 0.76, -0.12,  0.00],  // 6
  ['mixamorig:LeftArm',           6, 0.74, -0.20,  0.00],  // 7
  ['mixamorig:LeftForeArm',       7, 0.62, -0.22,  0.00],  // 8
  ['mixamorig:LeftHand',          8, 0.50, -0.22,  0.00],  // 9
  ['mixamorig:RightShoulder',     3, 0.76,  0.12,  0.00],  // 10
  ['mixamorig:RightArm',         10, 0.74,  0.20,  0.00],  // 11
  ['mixamorig:RightForeArm',     11, 0.62,  0.22,  0.00],  // 12
  ['mixamorig:RightHand',        12, 0.50,  0.22,  0.00],  // 13
  ['mixamorig:LeftUpLeg',         0, 0.44, -0.10,  0.00],  // 14
  ['mixamorig:LeftLeg',          14, 0.28, -0.10,  0.00],  // 15  ← thêm để đủ cơ bản
];

// ── Bone assignment regions (dùng để tính skinning weights) ───────────────────
// Mỗi vertex được gán vào bone dựa trên Y-fraction và X offset
// Format: [boneIndex, yFracMin, yFracMax, xMin, xMax]
const BONE_REGIONS = [
  [5,  0.82, 1.00, -0.5, 0.5],   // Head
  [4,  0.78, 0.88, -0.3, 0.3],   // Neck
  [3,  0.68, 0.80, -0.4, 0.4],   // Spine2 (chest)
  [9,  0.42, 0.78, -0.5, -0.15], // LeftHand / arm region (left side)
  [13, 0.42, 0.78,  0.15, 0.5],  // RightHand / arm region (right side)
  [2,  0.60, 0.70, -0.3, 0.3],   // Spine1
  [1,  0.52, 0.62, -0.3, 0.3],   // Spine
  [0,  0.44, 0.56, -0.4, 0.4],   // Hips
  [14, 0.00, 0.50, -0.4, -0.02], // LeftUpLeg + LeftLeg (left)
  [15, 0.00, 0.30, -0.4, -0.02], // LeftLeg lower
];

// ── Helper: read GLB JSON chunk ────────────────────────────────────────────────

function readGLB(filepath) {
  const buf = fs.readFileSync(filepath);
  if (buf.readUInt32LE(0) !== 0x46546C67) throw new Error('Not a GLB file: ' + filepath);
  const jsonLen = buf.readUInt32LE(12);
  const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));
  const binOffset = 20 + jsonLen + 8;
  const binBuf = buf.length > binOffset ? buf.slice(binOffset) : Buffer.alloc(0);
  return { json, binBuf, rawBuf: buf };
}

// ── Helper: get POSITION accessor min/max ─────────────────────────────────────

function getBoundingBox(json) {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;
  for (const mesh of (json.meshes ?? [])) {
    for (const prim of mesh.primitives) {
      const acc = json.accessors?.[prim.attributes?.POSITION];
      if (acc?.min && acc?.max) {
        minX = Math.min(minX, acc.min[0]); maxX = Math.max(maxX, acc.max[0]);
        minY = Math.min(minY, acc.min[1]); maxY = Math.max(maxY, acc.max[1]);
        minZ = Math.min(minZ, acc.min[2]); maxZ = Math.max(maxZ, acc.max[2]);
      }
    }
  }
  return { minX, maxX, minY, maxY, minZ, maxZ,
           width: maxX - minX, height: maxY - minY, depth: maxZ - minZ };
}

// ── Helper: get vertex positions from buffer ───────────────────────────────────

function getPositions(json, binBuf) {
  const mesh = json.meshes?.[0];
  if (!mesh) return [];
  const prim = mesh.primitives[0];
  const accIdx = prim.attributes.POSITION;
  const acc = json.accessors[accIdx];
  const bv = json.bufferViews[acc.bufferView];
  const byteOffset = (bv.byteOffset ?? 0) + (acc.byteOffset ?? 0);
  const positions = [];
  for (let i = 0; i < acc.count; i++) {
    const off = byteOffset + i * (bv.byteStride ?? 12);
    positions.push([
      binBuf.readFloatLE(off),
      binBuf.readFloatLE(off + 4),
      binBuf.readFloatLE(off + 8),
    ]);
  }
  return positions;
}

// ── Core: compute bone weights per vertex ─────────────────────────────────────

function computeWeights(positions, bb) {
  const h = bb.height;
  const yMin = bb.minY;
  const w = bb.width;
  const xMid = (bb.minX + bb.maxX) / 2;

  const joints0 = [];  // JOINTS_0: 4 bone indices per vertex (Uint8)
  const weights0 = []; // WEIGHTS_0: 4 weights per vertex (Float32)

  for (const [vx, vy, ] of positions) {
    const yFrac = (vy - yMin) / h;           // 0 (feet) → 1 (head)
    const xFrac = (vx - xMid) / (w * 0.5);  // -1 (left) → 1 (right)

    // Find the best matching region
    let bestBone = 0;
    let bestScore = -Infinity;

    for (const [boneIdx, yMin2, yMax2, xMin2, xMax2] of BONE_REGIONS) {
      const yInside = yFrac >= yMin2 && yFrac <= yMax2 ? 1 : 0;
      const xInside = xFrac >= xMin2 && xFrac <= xMax2 ? 1 : 0;
      if (yInside && xInside) {
        // Score: closer to center of region = better
        const yCenter = (yMin2 + yMax2) / 2;
        const xCenter = (xMin2 + xMax2) / 2;
        const score = 1 - Math.abs(yFrac - yCenter) - 0.5 * Math.abs(xFrac - xCenter);
        if (score > bestScore) { bestScore = score; bestBone = boneIdx; }
      }
    }

    // Fallback: nearest bone by Y distance
    if (bestScore === -Infinity) {
      const boneDef = BONE_DEFS;
      let minDist = Infinity;
      for (let i = 0; i < boneDef.length; i++) {
        const dist = Math.abs(yFrac - boneDef[i][2]);
        if (dist < minDist) { minDist = dist; bestBone = i; }
      }
    }

    joints0.push(bestBone, 0, 0, 0);
    weights0.push(1.0, 0.0, 0.0, 0.0);
  }

  return { joints0, weights0 };
}

// ── Core: build inverse bind matrices (identity per bone) ──────────────────────

function buildInverseBindMatrices(bb) {
  const h = bb.height;
  const yMin = bb.minY;
  const xMid = (bb.minX + bb.maxX) / 2;
  const zMid = (bb.minZ + bb.maxZ) / 2;

  const matrices = [];
  for (const [,, yFrac, xOff] of BONE_DEFS) {
    const worldY = yMin + yFrac * h;
    const worldX = xMid + xOff * h;
    const worldZ = zMid;
    // Column-major 4×4 identity matrix with translation inverse
    matrices.push(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -worldX, -worldY, -worldZ, 1
    );
  }
  return matrices;
}

// ── Core: build node transforms for bones ─────────────────────────────────────

function buildBoneNodes(bb) {
  const h = bb.height;
  const yMin = bb.minY;
  const xMid = (bb.minX + bb.maxX) / 2;
  const zMid = (bb.minZ + bb.maxZ) / 2;

  const nodes = [];
  for (let i = 0; i < BONE_DEFS.length; i++) {
    const [name, parentIdx, yFrac, xOff] = BONE_DEFS[i];
    const worldX = xMid + xOff * h;
    const worldY = yMin + yFrac * h;
    const worldZ = zMid;

    let localX = worldX, localY = worldY, localZ = worldZ;
    if (parentIdx >= 0) {
      const [,, pYFrac, pXOff] = BONE_DEFS[parentIdx];
      localX = xOff * h - pXOff * h;
      localY = (yFrac - pYFrac) * h;
      localZ = 0;
    }

    nodes.push({ name, translation: [localX, localY, localZ] });
  }
  return nodes;
}

// ── Main: rig a single GLB ─────────────────────────────────────────────────────

function rigCharacter(name) {
  const inputPath = path.join(MODELS_DIR, `${name}.glb`);
  const outputPath = path.join(OUTPUT_DIR, `${name}_Rigged.glb`);

  console.log(`\n[${name}]`);
  const { json, binBuf } = readGLB(inputPath);

  // Validate: must have exactly 1 mesh, no existing skin
  if (!json.meshes || json.meshes.length === 0) throw new Error('No meshes found');
  if (json.skins?.length > 0) {
    console.log(`  ⚠️  Already has skeleton — skipping`);
    return;
  }

  const bb = getBoundingBox(json);
  console.log(`  Bounding box: W=${bb.width.toFixed(3)} H=${bb.height.toFixed(3)} D=${bb.depth.toFixed(3)}`);

  const positions = getPositions(json, binBuf);
  console.log(`  Vertices: ${positions.length}`);

  const { joints0, weights0 } = computeWeights(positions, bb);
  const invBindMatrices = buildInverseBindMatrices(bb);
  const boneNodes = buildBoneNodes(bb);

  // ── Serialize new buffer data ──────────────────────────────────────────────

  // JOINTS_0: Uint8, 4 per vertex
  const jointsData = Buffer.allocUnsafe(joints0.length);
  joints0.forEach((v, i) => jointsData.writeUInt8(v, i));

  // WEIGHTS_0: Float32, 4 per vertex
  const weightsData = Buffer.allocUnsafe(weights0.length * 4);
  weights0.forEach((v, i) => weightsData.writeFloatLE(v, i * 4));

  // Inverse bind matrices: Float32, 16 floats × N bones
  const invBindData = Buffer.allocUnsafe(invBindMatrices.length * 4);
  invBindMatrices.forEach((v, i) => invBindData.writeFloatLE(v, i * 4));

  // ── Patch JSON ───────────────────────────────────────────────────────────────

  const newJson = JSON.parse(JSON.stringify(json));

  // Existing buffer length
  const existingBinLen = json.buffers?.[0]?.byteLength ?? binBuf.length;

  // New bufferViews
  const bvBase = (newJson.bufferViews ?? []).length;
  const jointsOffset = existingBinLen;
  const weightsOffset = jointsOffset + jointsData.length;
  const invBindOffset = weightsOffset + weightsData.length;

  newJson.bufferViews = newJson.bufferViews ?? [];
  newJson.bufferViews.push(
    { buffer: 0, byteOffset: jointsOffset,   byteLength: jointsData.length,   name: 'joints0_bv' },
    { buffer: 0, byteOffset: weightsOffset,  byteLength: weightsData.length,  name: 'weights0_bv' },
    { buffer: 0, byteOffset: invBindOffset,  byteLength: invBindData.length,  name: 'invBind_bv' },
  );

  // New accessors
  const accBase = (newJson.accessors ?? []).length;
  const vertexCount = positions.length;
  newJson.accessors = newJson.accessors ?? [];
  newJson.accessors.push(
    { bufferView: bvBase + 0, byteOffset: 0, componentType: 5121 /* UNSIGNED_BYTE */, count: vertexCount, type: 'VEC4', name: 'JOINTS_0_acc' },
    { bufferView: bvBase + 1, byteOffset: 0, componentType: 5126 /* FLOAT */, count: vertexCount, type: 'VEC4', name: 'WEIGHTS_0_acc' },
    { bufferView: bvBase + 2, byteOffset: 0, componentType: 5126 /* FLOAT */, count: BONE_DEFS.length, type: 'MAT4', name: 'invBind_acc' },
  );

  // Wire JOINTS_0 + WEIGHTS_0 into primitive
  newJson.meshes[0].primitives[0].attributes.JOINTS_0 = accBase + 0;
  newJson.meshes[0].primitives[0].attributes.WEIGHTS_0 = accBase + 1;

  // Change primitive to use SkinnedMesh (mode stays 4 = TRIANGLES)
  // gltF spec: if JOINTS_0 present, mesh renderer must use skinning

  // Add bone nodes
  const nodeBase = (newJson.nodes ?? []).length;
  newJson.nodes = newJson.nodes ?? [];
  boneNodes.forEach(b => newJson.nodes.push({ name: b.name, translation: b.translation }));

  // Build children arrays from hierarchy
  for (let i = 0; i < BONE_DEFS.length; i++) {
    const parentIdx = BONE_DEFS[i][1];
    if (parentIdx >= 0) {
      const parentNode = newJson.nodes[nodeBase + parentIdx];
      parentNode.children = parentNode.children ?? [];
      parentNode.children.push(nodeBase + i);
    }
  }

  // Skin
  newJson.skins = [{
    name: 'MixamoRig',
    inverseBindMatrices: accBase + 2,
    joints: BONE_DEFS.map((_, i) => nodeBase + i),
    skeleton: nodeBase, // root = Hips (index 0)
  }];

  // Wire skin to mesh node (node 0 — the main mesh node)
  // Find node that references mesh 0
  for (const node of newJson.nodes) {
    if (node.mesh === 0) {
      node.skin = 0;
      break;
    }
  }
  // If no node has mesh=0, set first node
  if (!newJson.nodes.some(n => n.skin === 0)) {
    newJson.nodes[0].skin = 0;
  }

  // Add Hips root to scene
  const rootScene = newJson.scenes?.[newJson.scene ?? 0];
  if (rootScene) {
    rootScene.nodes = rootScene.nodes ?? [];
    if (!rootScene.nodes.includes(nodeBase)) {
      rootScene.nodes.push(nodeBase); // Hips as scene root
    }
  }

  // Update buffer total length
  const newBinLen = existingBinLen + jointsData.length + weightsData.length + invBindData.length;
  newJson.buffers[0].byteLength = newBinLen;

  // ── Write GLB ────────────────────────────────────────────────────────────────

  const jsonStr = JSON.stringify(newJson);
  const jsonPadded = jsonStr.padEnd(Math.ceil(jsonStr.length / 4) * 4, ' ');
  const jsonBytes = Buffer.from(jsonPadded, 'utf8');

  const newBinPadded = Buffer.concat([
    binBuf,
    jointsData,
    weightsData,
    invBindData,
    Buffer.alloc((4 - (newBinLen % 4)) % 4, 0),
  ]);

  const totalLen = 12 + 8 + jsonBytes.length + 8 + newBinPadded.length;
  const out = Buffer.allocUnsafe(totalLen);
  let off = 0;

  // GLB header
  out.writeUInt32LE(0x46546C67, off); off += 4; // magic 'glTF'
  out.writeUInt32LE(2, off);          off += 4; // version
  out.writeUInt32LE(totalLen, off);   off += 4; // total length

  // JSON chunk
  out.writeUInt32LE(jsonBytes.length, off); off += 4;
  out.writeUInt32LE(0x4E4F534A, off);       off += 4; // 'JSON'
  jsonBytes.copy(out, off); off += jsonBytes.length;

  // BIN chunk
  out.writeUInt32LE(newBinPadded.length, off); off += 4;
  out.writeUInt32LE(0x004E4942, off);           off += 4; // 'BIN\0'
  newBinPadded.copy(out, off);

  fs.writeFileSync(outputPath, out);
  console.log(`  ✅ Rigged GLB: ${path.basename(outputPath)} (${(out.length / 1024).toFixed(0)}KB)`);
  console.log(`     Bones: ${BONE_DEFS.length} | Vertices skinned: ${vertexCount}`);
}

// ── Entry point ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const targetIdx = args.indexOf('--char');
const targets = targetIdx >= 0
  ? [`SM_Chr_${args[targetIdx + 1]}`]
  : CHARACTERS;

console.log('=== Workizen Auto-Rig Script ===');
console.log(`Rig target(s): ${targets.join(', ')}`);
console.log(`Output dir: ${OUTPUT_DIR}`);

let ok = 0, fail = 0;
for (const name of targets) {
  try {
    rigCharacter(name);
    ok++;
  } catch (e) {
    console.error(`  ❌ ${name}: ${e.message}`);
    fail++;
  }
}

console.log(`\n=== Done: ${ok} rigged, ${fail} failed ===`);
if (ok > 0) {
  console.log('\nNext steps:');
  console.log('  1. Kiểm tra output GLB trong https://gltf-viewer.donmccurdy.com/');
  console.log('  2. Nếu skeleton đúng → cập nhật CampusScene.tsx dùng _Rigged.glb');
  console.log('  3. Wire AnimatedModel với animation path /assets/animations/Idle.glb');
}
