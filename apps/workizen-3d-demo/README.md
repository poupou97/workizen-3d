# Workizen 3D Citizen Plaza Demo

Runnable MVP demo for Workizen 3D World, a cute browser-based Digital Citizen plaza for WorkforceOS / Workizen.vn.

This is not a crypto, NFT, blockchain, wallet, or production authentication implementation. It is a visual experience layer for Digital Citizens.

## Tech Stack

- Next.js
- TypeScript
- React Three Fiber
- Three.js
- Drei
- Zustand
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will offer another port.

## Validate

```bash
npm run lint
npm run typecheck
npm run build
npm run smoke:canvas
```

`npm run smoke:canvas` uses Playwright to verify:

- Desktop and mobile canvas rendering.
- Non-empty rendered canvas pixels.
- CTA flow.
- Click-to-info-panel interaction for a citizen and a building.

Screenshots are written to `../../output/screenshots/`.

## Demo Features

- Landing/demo overlay with title, subtitle, and CTA.
- 3D Citizen Plaza scene with orbit camera controls.
- Cute low-poly city blocks and plaza center.
- Clickable buildings:
  - AI Agent Lab
  - Knowledge Library
  - Compute Center
  - Opportunity Board
  - Team Office
- Clickable avatar placeholders:
  - Human Citizen
  - AI Citizen
  - Knowledge Citizen
  - Compute Citizen
- Right-side info panel for selected citizens, buildings, districts, and opportunities.
- Zustand store for selected object state.
- Mock data for citizens, districts, and opportunities.

## Future Integration Boundaries

- Ready Player Me avatars should replace placeholder citizen meshes behind a citizen/avatar adapter.
- Colyseus multiplayer should synchronize presence and selection state through a dedicated realtime adapter.
- Marketplace, registry, reputation, and wallet features should remain shared application/domain concerns, not scene-specific logic.
