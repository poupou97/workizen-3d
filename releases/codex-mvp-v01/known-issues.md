# Codex MVP v01 Known Issues

Release: `codex-mvp-v01`
Date: 2026-06-07

## Visual Limitations

- Campus visual quality is improved but still approximate.
- Some 3D labels may overlap or become less readable depending on camera angle.
- Camera first-load framing is usable but not final art direction.
- Building proportions are generated manually, not final asset-authored models.
- Mobile layout is usable but not polished for final Founder presentation.

## Placeholder Assets

- Buildings are generated low-poly approximations.
- Citizens and NPCs use simple placeholder avatars.
- Compute Citizen device is a simple generated object.
- Opportunity markers are symbolic objects.
- District props are simplified geometry, not final Synty meshes.

## Missing Synty Integration

- Purchased Synty Polygon Town FBX assets are present under `assets/synty/polygon-town/Source_Files/FBX`.
- Runtime does not yet load converted GLB/GLTF assets.
- FBX-to-GLB conversion pipeline is documented but not implemented.
- No real Synty materials, textures, prefab scales, or optimized runtime bundles are wired into the app.

## Missing Backend

- All data is mock data.
- No Laravel backend integration.
- No API layer.
- No persistence.
- No authentication or user accounts.
- No real opportunity marketplace data.

## Missing Multiplayer

- No Colyseus integration.
- No realtime presence.
- No avatar movement synchronization.
- No shared world state.
- No multi-user collaboration features.

## Other Missing Future Features

- No Open WebUI AI NPC chat.
- No Ready Player Me avatars.
- No Mixamo animation pipeline.
- No Digital Twin system.
- No blockchain, NFT, wallet, token, or crypto feature.
