# Codex MVP v01 Architecture Summary

Release: `codex-mvp-v01`
Date: 2026-06-07

## Vision

Workizen 3D presents Workizen as a Digital Citizen City plus Opportunity Marketplace. The Founder should understand within the first minute that citizens can arrive, discover opportunities, form teams, and connect human, AI, knowledge, and compute capacity.

Workizen is not a crypto/NFT metaverse. The MVP avoids blockchain, wallets, tokens, multiplayer, and Digital Twin scope.

## World Design

Default world: Workizen HQ Campus.

Canonical layout:

- Center: Citizen Plaza
- North: AI Agent Lab
- North West: Founder Tower
- North East: Knowledge Library
- West: Opportunity Center
- East: Compute Center
- South: Team Office

Primary flows:

- Visual flow: Citizen Plaza -> AI Agent Lab
- Product flow: Citizen Plaza -> Opportunity Center -> Team Office

## MVP Scope

In scope:

- One default HQ Campus scene.
- Seven visible districts.
- Visible mock NPCs and citizens.
- Mock opportunity board.
- Recommended team display.
- Founder Demo Mode.
- Responsive usability for desktop, tablet, and mobile.

Out of scope:

- Backend.
- Laravel integration.
- Blockchain, NFT, wallet, or crypto.
- Multiplayer.
- Ready Player Me.
- Mixamo.
- Colyseus.
- Open WebUI.
- Digital Twin.

## Current Runtime

- App: `apps/workizen-3d`
- Framework: Next.js
- Rendering: React Three Fiber, Three.js, Drei
- State: Zustand
- Styling: Tailwind CSS and app CSS
- Data source: local mock TypeScript objects
- Screenshot/QA: Playwright smoke script

The runtime is suitable for Founder review and visual experimentation. It is not production architecture.
