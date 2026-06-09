# Codex MVP v01 Release Notes

Release: `codex-mvp-v01`
Date: 2026-06-07
Purpose: Frozen Workizen HQ Campus MVP checkpoint before Claude experimentation.

## Features Implemented

- Workizen HQ Campus Founder Demo MVP in `apps/workizen-3d`.
- Next.js app with React Three Fiber, Three.js, Drei, Zustand, and mock data.
- Full-screen 3D campus scene.
- Founder Demo Mode with guided vision, districts, citizens, opportunities, and team formation flow.
- Side information panel for selected districts, NPCs, citizens, and opportunities.
- Mock Opportunity Board with recommended team examples.
- Responsive desktop, tablet, and mobile smoke coverage.
- Synty-inspired visual upgrade using generated low-poly geometry.

## Districts Implemented

- Citizen Plaza: default spawn and orientation center.
- AI Agent Lab: main landmark and AI Citizen showcase.
- Founder Tower: founder review and governance landmark.
- Knowledge Library: knowledge, playbooks, and expertise district.
- Opportunity Center: marketplace district for open work.
- Compute Center: compute capacity and Compute Citizen district.
- Team Office: team formation and delivery planning district.

## Interactions Implemented

- Click district to open district panel.
- Click NPC to open NPC info panel.
- Click citizen to open citizen manifest/profile panel.
- Click opportunity marker or quick-open button to open opportunity panel.
- Opportunity panel shows recommended team.
- Top navigation selects major campus districts.
- Demo button starts the guided Founder Demo flow.

## Current Architecture

- Product app: `apps/workizen-3d`.
- Runtime framework: Next.js App Router.
- 3D rendering: React Three Fiber, Three.js, Drei.
- State: Zustand local client store.
- Data: mock TypeScript data in `src/features/campus/data.ts`.
- UI shell: React components and Tailwind CSS.
- Smoke validation: Playwright script at `apps/workizen-3d/scripts/smoke-campus.mjs`.
- No backend integration in this release.

## Current Limitations

- Real Synty FBX assets are not imported into runtime.
- Generated low-poly geometry approximates the Synty/Polygon Town style.
- No backend, database, auth, or Laravel integration.
- No multiplayer or realtime collaboration.
- No AI NPC chat integration.
- No Ready Player Me, Mixamo, Colyseus, Open WebUI, wallet, blockchain, NFT, or Digital Twin features.
