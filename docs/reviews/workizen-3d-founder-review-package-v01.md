# Workizen 3D Founder Review Package v1

Status: FOUNDER REVIEW

Date: 2026-06-07

Project: Workizen 3D

Source documents:

- `docs/mvp/workizen-mvp-scope-v01.md`
- `docs/style-guide/workizen-style-guide-v01.md`
- `docs/world-design/citizen-manifest-v01.md`
- `docs/world-design/hq-campus-layout-v01.md`

## 1. Executive Summary

Workizen 3D is the first spatial experience layer for WorkforceOS / Workizen.vn. It presents Workizen as a friendly Digital Citizen City where humans, AI agents, knowledge contributors, and compute resources can be understood as citizens who participate in work.

The first world is Workizen HQ Campus. The default spawn point is Citizen Plaza, and the main landmark is AI Agent Lab. This gives users an immediate mental model: Workizen is an AI-native work campus where citizens discover opportunities, form teams, learn from knowledge assets, and connect to compute resources.

The MVP should stay narrow. It should prove one simple product loop:

```text
1 Opportunity
→ 1 Recommended Team
→ 1 Delivery Concept
→ 1 Reputation Placeholder
```

The MVP is frontend-first and uses mock data. It should be implemented in `apps/workizen-3d`. The existing `apps/workizen-3d-demo` remains a proof of concept/reference only.

The MVP must not include blockchain, NFT features, production wallet logic, multiplayer, production backend integration, or a broader digital twin. Laravel backend, Ready Player Me, Mixamo, Colyseus, and Open WebUI can come later after the core HQ Campus experience is approved.

## 2. Vision Summary

### What is Workizen?

Workizen is a Digital Citizen City and Opportunity Marketplace visual layer for WorkforceOS / Workizen.vn.

It turns abstract work concepts into a visible campus:

- Citizens become visible participants.
- AI agents become AI Citizens.
- Knowledge contributors become Knowledge Citizens.
- Compute resources become Compute Citizens.
- Opportunities become discoverable work missions.
- Teams become recommended combinations of people, AI, knowledge, and compute.

### What is not Workizen?

Workizen is not:

- A crypto metaverse.
- An NFT world.
- A wallet-first product.
- A speculative land ownership experience.
- A dark cyberpunk virtual city.
- A game about combat, collectibles, or token speculation.

### Why HQ Campus?

HQ Campus is the right first world because it is focused, understandable, and product-aligned.

It gives the user one clear place to start, while still showing the major Workizen concepts:

- AI-native work.
- Founder direction.
- Citizen onboarding.
- Knowledge discovery.
- Opportunity discovery.
- Compute capacity.
- Team formation.

HQ Campus is small enough to build as an MVP and rich enough to communicate the business vision.

## 3. Approved World Design

### HQ Campus

Workizen HQ Campus is the default map for the MVP. It is the first official Workizen 3D world and should feel like a friendly civic work campus.

### AI Agent Lab

AI Agent Lab is the main landmark. It represents Workizen as an AI-native Digital Citizen City and should be visually prominent from the starting view.

### Founder Tower

Founder Tower anchors strategy, governance, and Founder review. It should feel important but should not visually overpower AI Agent Lab.

### Citizen Plaza

Citizen Plaza is the default spawn point and orientation area. It is where new users meet Workizen Guide and understand the campus.

### Knowledge Library

Knowledge Library represents playbooks, reusable expertise, learning paths, and knowledge assets.

### Opportunity Center

Opportunity Center represents the marketplace layer. It is where users discover available work and understand the route from opportunity to team.

### Compute Center

Compute Center represents compute citizens, workload capacity, AI execution, and future resource allocation.

### Team Office

Team Office represents team formation, coordination, project delivery, and recommended team composition.

## 4. Style Guide Summary

### Art Direction

The style should be cute, low-poly, chibi-friendly, bright, professional, civic, and approachable.

The world should feel modern and work-focused, with enough playfulness to make Digital Citizens understandable and memorable.

### Color Palette

Primary district colors:

- Workizen Blue for primary accents and Founder Tower.
- AI Green for AI Agent Lab and AI Citizens.
- Knowledge Gold for Knowledge Library.
- Opportunity Coral for Opportunity Center.
- Compute Cyan for Compute Center.
- Team Violet for Team Office.
- Plaza Warm Stone for Citizen Plaza.

Neutral colors:

- Campus Grass for ground.
- Path Stone for walkways.
- Building Wall for main building surfaces.
- Soft Shadow for secondary UI and low-contrast depth.
- Deep Text and White Panel for readable UI.

### Building Rules

Buildings should use simplified low-poly massing, clear entrances, readable silhouettes, and district-specific props or signage.

AI Agent Lab should be the strongest landmark. Founder Tower can be tall but should remain secondary in visual priority.

### Citizen Rules

Citizens should use chibi proportions, friendly silhouettes, and clear role cues.

Citizen types should be visually distinct:

- Human Citizen: warm human identity.
- AI Citizen: green/teal helper identity.
- Knowledge Citizen: gold learning identity.
- Compute Citizen: cyan device/infrastructure identity.

### Camera Rules

The starting camera should show Citizen Plaza first while keeping AI Agent Lab visible as the main landmark.

The camera should feel calm, stable, readable, and easy to navigate. The MVP should avoid disorienting first-person movement and dark cinematic shots.

## 5. HQ Campus Layout Summary

Default Map: Workizen HQ Campus

Default Spawn Point: Citizen Plaza

Main Landmark: AI Agent Lab

District Layout:

```text
                 North

          [Founder Tower]
                |
      [Knowledge Library] --- [AI Agent Lab] --- [Compute Center]
                \              |              /
                 \             |             /
                  \      [Citizen Plaza]    /
                   \          /   \         /
                    [Opportunity Center]  [Team Office]

                 South
```

Layout meaning:

- Citizen Plaza is the center and starting point.
- AI Agent Lab sits north of Citizen Plaza and acts as the main landmark.
- Founder Tower sits farther north as strategy/governance anchor.
- Knowledge Library and Compute Center flank the AI Agent Lab.
- Opportunity Center and Team Office sit south of the plaza to support the early work journey.

## 6. Citizen Model Summary

### Human Citizen

Real people participating in Workizen: founders, developers, consultants, architects, customers, managers, and operators.

### AI Citizen

AI agents capable of helping with work, guidance, automation, project tasks, and future deliverables.

### Knowledge Citizen

Experts or knowledge assets that contribute reusable expertise, playbooks, mentoring, and learning paths.

### Compute Citizen

Compute resources that may later contribute capacity for AI workloads, automation, and system tasks.

### Common Citizen Manifest Structure

```json
{
  "citizen_id": "string",
  "citizen_type": "Human Citizen | AI Citizen | Knowledge Citizen | Compute Citizen",
  "name": "string",
  "role": "string",
  "description": "string",
  "skills": ["string"],
  "reputation": {
    "score": 0,
    "level": "string",
    "summary": "string"
  },
  "availability": "available | busy | offline | scheduled",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "string",
    "coordinates": [0, 0, 0]
  },
  "current_status": "string",
  "avatar_type": "placeholder | ready-player-me-later | device-placeholder | agent-placeholder",
  "interaction_type": "info_panel | npc_panel | opportunity_panel | compute_panel",
  "allowed_actions": ["string"]
}
```

The manifest is for MVP mock data only. Reputation, availability, identity, and compute capacity are placeholders until backend product rules are designed.

## 7. NPC Summary

MVP NPCs:

- Workizen Guide: welcomes new users in Citizen Plaza and explains the campus.
- AI Architect: introduces AI Citizens and AI Agent Lab.
- Opportunity Manager: helps users discover opportunities and understand marketplace flow.
- Knowledge Manager: guides users through playbooks, learning paths, and knowledge assets.
- Compute Manager: explains compute citizens, mock capacity, and future workloads.
- Project Manager: explains team formation, delivery, and recommended team composition.

NPCs should act as helpful campus hosts. In the MVP, they should open panels and provide short guidance. They should not use live AI chat yet.

## 8. MVP Scope Summary

### IN SCOPE

- Workizen HQ Campus as default world.
- Citizen Plaza as default spawn point.
- AI Agent Lab as main landmark.
- Variation D layout.
- Seven approved districts.
- District selection.
- NPC selection.
- Citizen selection.
- Opportunity selection.
- Mock opportunity board.
- Mock recommended team panel.
- Mock citizen manifests.
- Mock reputation placeholders.
- Desktop and mobile readable camera.
- Frontend-first implementation in `apps/workizen-3d`.
- `apps/workizen-3d-demo` as POC/reference only.

### OUT OF SCOPE

- No Blockchain.
- No NFT.
- No Wallet.
- No Multiplayer.
- No Digital Twin beyond HQ Campus.
- No production authentication.
- No Laravel backend in MVP.
- No database persistence.
- No REST API integration in MVP.
- No WebSocket integration.
- No Colyseus.
- No Open WebUI AI chat.
- No Ready Player Me production avatar loading.
- No Mixamo animation pipeline.
- No payment custody.
- No revenue sharing.

## 9. Risks

Top 10 risks before coding:

1. The Founder must confirm that HQ Campus is the default map and Citizen Plaza is the spawn point inside it.
2. The proposed district layout may need visual approval before coordinates become fixed.
3. The existing POC is Citizen Plaza-centered, while the MVP must be campus-centered.
4. Scope could expand too early into avatars, AI chat, backend, multiplayer, or assets.
5. The Opportunity Center must remain central enough to show Workizen is an Opportunity Marketplace, not only a 3D campus.
6. Reputation is currently a placeholder and must not imply production scoring.
7. Compute Citizen examples are conceptual and must not imply real compute scheduling yet.
8. Asset source and license metadata are still missing.
9. MVP data is mock-only, so future Laravel API contracts must be designed later without breaking the frontend model.
10. Visual style could drift into generic metaverse, cyberpunk, or crypto aesthetics without strict review.

## 10. Ready To Code Assessment

Scores:

| Area | Score | Assessment |
| --- | ---: | --- |
| Vision | 9/10 | Clear and differentiated: Digital Citizen City plus Opportunity Marketplace, not crypto/NFT. |
| World Design | 8/10 | Strong district model and campus layout; needs Founder visual approval of layout. |
| Architecture | 8/10 | Product app vs POC app decision is clear; backend-later boundary is clear. |
| Data Model | 7/10 | Citizen Manifest is enough for MVP mock data; production contracts remain future work. |
| MVP Scope | 9/10 | Scope is focused and excludes high-risk distractions. |

Overall Score: 8.2/10

Final Decision: READY TO CODE

Reason:

The project is ready for Sprint 1 because the core vision, world, style, citizen model, MVP boundaries, and product app decision are now documented. The remaining gaps are manageable within Sprint 1 if implementation stays mock-data-first and avoids backend, blockchain, NFT, wallet, multiplayer, and live AI chat.

Founder approval is still recommended before coding, especially for the district layout and the interpretation that Citizen Plaza is the spawn point inside HQ Campus.

## 11. Recommended First Coding Sprint

Sprint 1 should build the first playable Workizen HQ Campus MVP in `apps/workizen-3d`.

Build exactly:

- A full-screen Workizen HQ Campus scene.
- Citizen Plaza as the starting point.
- AI Agent Lab as the most visible landmark.
- Seven clickable districts:
  - AI Agent Lab
  - Founder Tower
  - Citizen Plaza
  - Knowledge Library
  - Opportunity Center
  - Compute Center
  - Team Office
- MVP NPC panels:
  - Workizen Guide
  - AI Architect
  - Opportunity Manager
  - Knowledge Manager
  - Compute Manager
  - Project Manager
- Mock citizen panels for the four citizen types.
- One mock opportunity in Opportunity Center.
- One recommended team concept in Team Office.
- A calm starting camera that shows Citizen Plaza and AI Agent Lab.
- Basic desktop and mobile visual validation.

Do not build in Sprint 1:

- Backend.
- Blockchain.
- NFT.
- Wallet.
- Multiplayer.
- Live AI chat.
- Ready Player Me.
- Mixamo.
- Colyseus.
- Digital twin expansion beyond HQ Campus.

Recommended Sprint 1 success definition:

The Founder can open Workizen HQ Campus, understand the product vision in under one minute, select each district/NPC/citizen, inspect one opportunity, and see how Workizen forms a team around that opportunity.
