# Synty Import Pipeline v01

Status: Pre-code technical note
Date: 2026-06-07

## Goal

Use purchased Synty Polygon Town assets in the React Three Fiber app without blocking the Founder Demo visual upgrade.

## Preferred Source

- Source assets: `assets/synty/polygon-town/Source_Files/FBX`
- Source format: FBX
- Runtime app: `apps/workizen-3d`

## Preferred Runtime Format

React Three Fiber and Drei can load multiple formats, but the preferred runtime target is:

- GLB/GLTF for web delivery
- Optimized mesh/material bundles
- Predictable texture/material behavior

## Recommended Pipeline

1. Select one simple building candidate from `Source_Files/FBX`.
2. Convert FBX to GLB/GLTF using Blender or a trusted conversion tool.
3. Place the converted file under a future public asset path, for example `apps/workizen-3d/public/assets/synty/`.
4. Load it with Drei `useGLTF`.
5. Validate scale, materials, shadows, click targets, and mobile performance.
6. Only then convert the remaining district candidates.

## Fallback For Immediate Build

If direct FBX import/conversion is not feasible today:

- Use simplified generated low-poly approximations.
- Preserve Synty-inspired style with bright colors, readable roofs, simple windows, chunky signs, roads, plaza props, trees, flowers, benches, and lamps.
- Avoid plain cubes by adding district-specific silhouettes and props.
- Keep click panels and demo flow stable.

## Non-Blocking Rule

Do not block the whole Founder Demo build on full asset import. The first coding pass should improve visual quality immediately, then the next sprint can replace approximations with converted GLB assets one district at a time.
