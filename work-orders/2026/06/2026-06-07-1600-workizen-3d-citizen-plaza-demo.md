# Work Order: Workizen 3D Citizen Plaza Demo

## Context

Workizen 3D is part of WorkforceOS / Workizen.vn.

The goal is to create a cute/chibi, modern, browser-based 3D Digital Citizen World. This is not a crypto or NFT metaverse. It is a visual experience layer for Digital Citizens.

## Task

Create a runnable MVP demo called Workizen 3D Citizen Plaza.

Original Founder command:

```text
Build the first runnable Workizen 3D demo.

Project:
workizen-3d

Context:
Workizen 3D is part of WorkforceOS / Workizen.vn.
The goal is to create a cute/chibi, modern, browser-based 3D Digital Citizen World.
This is NOT a crypto/NFT metaverse.
This is a visual experience layer for Digital Citizens.

Design direction:
- Cute
- Chibi-friendly
- Modern
- Low-poly / stylized
- Professional but playful
- Inspired by Animal Crossing, Zepeto, Ready Player Me, Linear, Stripe, Notion

Tech stack:
- Next.js
- TypeScript
- React Three Fiber
- Three.js
- Drei
- Zustand
- Tailwind CSS

Important rules:
- Do not delete existing files.
- Do not overwrite user-created content.
- Create a matching execution report for this task.
- Keep architecture clean for future Ready Player Me and Colyseus integration.
- Do not implement blockchain.
- Do not implement real wallet.
- Do not implement production auth.

Task:
Create a runnable MVP demo called Workizen 3D Citizen Plaza.
```

## Requirements

- Create or update a Next.js app inside `apps/workizen-3d-demo/`.
- Build a landing/demo page with:
  - Title: Workizen 3D World
  - Subtitle: The cute digital city for Digital Citizens
  - CTA: Enter Citizen Plaza
- Build a 3D Citizen Plaza scene with:
  - Ground plane
  - Cute low-poly city blocks
  - Citizen Plaza center
  - AI Agent Lab building
  - Knowledge Library building
  - Compute Center building
  - Opportunity Board area
  - Team Office building
- Add avatar placeholders:
  - Human Citizen
  - AI Citizen
  - Knowledge Citizen
  - Compute Citizen
- Add interaction:
  - Clicking a building or citizen opens a right-side info panel.
  - Info panel shows name, type, description, and future capability.
- Add camera controls:
  - OrbitControls
  - Smooth default camera position
- Add Zustand state management for selected object/citizen/building.
- Add mock data for citizens, districts, and opportunities.
- Add documentation:
  - `apps/workizen-3d-demo/README.md`
  - `architecture/workizen-3d-demo-architecture.md`
- Add matching governance files.
- Do not implement blockchain, real wallet, production auth, or production backend.

## Deliverables

- Runnable Next.js app in `apps/workizen-3d-demo/`.
- 3D Citizen Plaza scene.
- Clickable citizens, buildings, and opportunities.
- Right-side information panel.
- Zustand selection store.
- Mock plaza data model.
- Demo README.
- Demo architecture document.
- Matching execution report:
  - `execution-reports/2026/06/2026-06-07-1600-workizen-3d-citizen-plaza-demo.md`

## Acceptance Criteria

- `npm install` works.
- `npm run dev` works.
- Demo opens in browser.
- User can see the 3D Citizen Plaza.
- User can click citizens/buildings and see the info panel.
- Code is clean and understandable.
- No blockchain or production backend is added.
