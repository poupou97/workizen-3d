# Workizen 3D Demo Architecture

## Purpose

The Workizen 3D Citizen Plaza demo is the first runnable visual experience layer for Digital Citizens inside WorkforceOS / Workizen.vn.

The demo is intentionally scoped to a browser-based 3D MVP. It does not include blockchain, a real wallet, production authentication, persistence, or production backend integration.

## Application Location

```text
apps/workizen-3d-demo/
```

## Core Structure

```text
apps/workizen-3d-demo/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── features/
│       └── plaza/
│           ├── CitizenPlazaScene.tsx
│           ├── InfoPanel.tsx
│           ├── PlazaHud.tsx
│           ├── data.ts
│           ├── store.ts
│           ├── types.ts
│           └── meshes/
```

## Clean Boundaries

### UI Layer

`src/app` and plaza UI components handle layout, the landing overlay, the CTA, and the information panel.

### Scene Layer

`CitizenPlazaScene.tsx` owns the React Three Fiber canvas and camera controls. Mesh components in `features/plaza/meshes` own low-poly visual objects.

### State Layer

`store.ts` contains the Zustand store for selected scene objects.

Current state:

- `selected`
- `selectObject`
- `clearSelection`

### Data Layer

`data.ts` contains mock data for:

- Citizens
- Districts
- Opportunities
- Buildings

This is demo data only. Future production data should come through service adapters rather than direct imports from UI components.

## Future Ready Player Me Integration

Ready Player Me should be introduced through an avatar adapter that maps Citizen records to avatar assets and animation states.

Recommended future structure:

```text
features/plaza/avatar/
  AvatarProvider.tsx
  ReadyPlayerMeAvatar.tsx
  PlaceholderAvatar.tsx
```

The scene should continue consuming citizen data through stable types and should not depend directly on provider-specific profile data.

## Future Colyseus Integration

Colyseus should be introduced as a realtime infrastructure adapter.

Recommended future structure:

```text
features/plaza/realtime/
  plaza-room-client.ts
  presence-sync.ts
  selection-sync.ts
```

The current Zustand store can remain the local state entry point while realtime events update presence, avatar transforms, and collaborative interactions.

## Non-Goals

- No blockchain.
- No NFT assets.
- No real wallet.
- No production authentication.
- No production marketplace backend.
- No persistent database.
