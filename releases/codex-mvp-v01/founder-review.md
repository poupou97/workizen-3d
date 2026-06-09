# Codex MVP v01 Founder Review

Release: `codex-mvp-v01`
Date: 2026-06-07

## What Works

- The app opens into Workizen HQ Campus.
- The Founder can see Workizen as a Digital Citizen City plus Opportunity Marketplace.
- Citizen Plaza works as the central spawn/orientation point.
- AI Agent Lab is visible as the main northern landmark.
- All seven MVP districts are present.
- Districts are clickable and open useful side panels.
- NPCs and citizens are visible and clickable.
- Opportunities are visible and open opportunity panels.
- Recommended teams are shown for opportunities.
- Founder Demo Mode presents the product vision in a guided flow.
- Desktop, tablet, and mobile smoke checks passed.

## What Does Not Work

- Real Synty assets are not yet imported into the runtime.
- The visual style is still generated low-poly, not final asset-authored art.
- No backend exists.
- No real users, accounts, persistence, or live opportunity data exist.
- No AI chat or agent behavior exists.
- No multiplayer exists.
- No production avatar pipeline exists.

## What Should Be Improved Next

1. Prove the Synty asset pipeline by converting one FBX building to GLB and loading it with Drei `useGLTF`.
2. Replace one generated district building with a real Synty asset while preserving click behavior.
3. Improve first-load composition so Citizen Plaza, AI Agent Lab, and Opportunity Center read instantly.
4. Tune labels and panel spacing for mobile.
5. Add a stronger visual hierarchy for the Opportunity Center and Team Office product flow.
6. Create a small mock data layer file per domain if the mock data grows further.
7. Keep backend, multiplayer, wallet, blockchain, NFT, and Digital Twin work out of the next visual sprint.

## Founder Decision Prompt

This release is good enough as a frozen checkpoint before Claude experimentation. The next experiment should focus on visual quality and real asset integration, not backend architecture.
