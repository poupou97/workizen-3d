# Work Order: Workizen HQ Campus MVP Build

Date: 2026-06-07

Project: workizen-3d

App: `apps/workizen-3d`

## Founder Command

Build Workizen HQ Campus MVP v1 in one implementation cycle as a Founder Demo Build.

Optimize for:

- Visual impact
- Founder review
- Product vision

Do not optimize for:

- Production backend
- Enterprise architecture
- Microservices
- Scalability
- Multiplayer

Use:

- Next.js
- React Three Fiber
- Three.js
- Drei
- Zustand

Use mock data only.

Do not include:

- Backend
- Blockchain
- NFT
- Wallet
- Multiplayer
- Laravel integration
- Open WebUI integration
- Ready Player Me
- Mixamo
- Colyseus
- Digital Twin

## Goal

When the Founder opens the application, within 60 seconds he must understand:

```text
Workizen = Digital Citizen City + Opportunity Marketplace
```

## Required World Decisions

- Default Map: Workizen HQ Campus
- Default Spawn: Citizen Plaza
- Main Landmark: AI Agent Lab

Districts:

- AI Agent Lab
- Founder Tower
- Citizen Plaza
- Knowledge Library
- Opportunity Center
- Compute Center
- Team Office

## Required Features

- Full campus scene.
- Third-person style camera.
- Clickable districts with side panel.
- Visible NPCs.
- Clickable NPC panels.
- Mock citizens using citizen manifest structure.
- Opportunity board with at least three opportunities.
- Recommended team for each opportunity.
- Simple navigation.
- Responsive desktop/tablet/mobile layout.
- Founder Demo Mode at `/demo` or through a Demo button.

## Required Deliverables

- Running application.
- Updated README.
- Screenshots under `output/screenshots/`.
- Architecture diagram under `output/diagrams/`.
- Demo notes under `output/demos/workizen-hq-campus-demo-v01.md`.
- Execution report under `execution-reports/2026/06/2026-06-07-workizen-hq-campus-mvp-build.md`.

## Acceptance Criteria

- Founder can open the app and understand the product vision quickly.
- MVP is implemented in `apps/workizen-3d`.
- `apps/workizen-3d-demo` remains a POC/reference only.
- Validation passes for lint, typecheck, build, and smoke screenshots.
