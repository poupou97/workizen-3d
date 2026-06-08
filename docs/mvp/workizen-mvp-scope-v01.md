# Workizen MVP Scope v1

Status: REVIEW

Date: 2026-06-07

Project: Workizen 3D

## Final Product Decisions

- Default World = Workizen HQ Campus.
- Default Spawn = Citizen Plaza.
- Main Landmark = AI Agent Lab.
- Product App = `apps/workizen-3d`.
- POC App = `apps/workizen-3d-demo`.
- Frontend first with mock data.
- Backend later with Laravel.
- No blockchain in MVP.
- No NFT in MVP.
- No production wallet in MVP.
- No multiplayer in MVP.

## MVP Goal

Build the first playable Workizen HQ Campus experience as a frontend-only 3D product MVP.

The MVP should let a user spawn at Citizen Plaza, understand the campus, select each approved district, inspect NPC/citizen panels, and see how opportunities connect to team formation.

The MVP proves this loop:

```text
1 Opportunity
→ 1 Recommended Team
→ 1 Delivery Concept
→ 1 Reputation Placeholder
```

## In Scope

World:

- Workizen HQ Campus.
- Variation D layout.
- Citizen Plaza spawn point.
- AI Agent Lab as main landmark.
- Seven approved districts:
  - AI Agent Lab
  - Founder Tower
  - Citizen Plaza
  - Knowledge Library
  - Opportunity Center
  - Compute Center
  - Team Office

Interaction:

- Starting campus view.
- District selection.
- NPC selection.
- Citizen selection.
- Opportunity selection.
- Info panels for selected objects.
- Mock opportunity board.
- Mock recommended team panel.
- Camera navigation suitable for desktop and mobile.

Data:

- Mock districts.
- Mock citizens.
- Mock NPCs.
- Mock opportunities.
- Mock recommended team.
- Mock reputation placeholders.
- Mock availability/status fields.

Frontend:

- Implement in `apps/workizen-3d`.
- Use `apps/workizen-3d-demo` as POC/reference only.
- Use React Three Fiber, Three.js, Drei, Zustand, TypeScript, Tailwind CSS.
- Keep mock data local and replaceable.

Validation:

- Canvas renders on desktop and mobile.
- User can enter or view HQ Campus.
- User can select all seven districts.
- User can select initial NPCs.
- User can inspect one opportunity.
- User can inspect one recommended team.

## Out Of Scope

Out of scope for MVP:

- Blockchain.
- NFT assets.
- Crypto wallet UX.
- Production wallet.
- Payment custody.
- Revenue sharing.
- Production authentication.
- Laravel backend.
- Database persistence.
- REST API integration.
- WebSocket integration.
- Multiplayer.
- Colyseus.
- Open WebUI AI chat.
- Ready Player Me production avatar loading.
- Mixamo animation pipeline.
- Purchased Synty asset dependency.
- Digital twin expansion beyond HQ Campus.
- Hanoi, Vietnam, or Earth-scale digital twin.

## User Journey

Primary MVP journey:

1. User opens Workizen HQ Campus.
2. User starts at Citizen Plaza.
3. User sees AI Agent Lab as the main landmark.
4. User selects Workizen Guide.
5. User selects AI Agent Lab and meets AI Architect.
6. User visits Knowledge Library and meets Knowledge Manager.
7. User visits Opportunity Center and meets Opportunity Manager.
8. User opens one mock opportunity.
9. User views a recommended team in Team Office.
10. User visits Compute Center and sees Compute Manager or a compute citizen.
11. User understands that Workizen connects citizens, AI, knowledge, compute, teams, and opportunities.

Secondary journey:

1. User selects Founder Tower.
2. User sees the strategy/governance purpose of the campus.
3. User returns to Citizen Plaza.

## MVP Screens And Interactions

Required screen areas:

- Full-screen 3D canvas.
- Minimal top or corner HUD.
- Selection info panel.
- District/NPC/citizen/opportunity panel states.

Required 3D interactions:

- Click district.
- Click NPC.
- Click citizen.
- Click opportunity marker or board.
- Clear selection.
- Navigate camera.

Required panel states:

- Welcome state.
- District detail.
- NPC detail.
- Citizen manifest detail.
- Opportunity detail.
- Recommended team detail.

Required content:

- District purpose.
- Future capability note.
- NPC role and allowed actions.
- Citizen type, skills, reputation placeholder, availability, location, status.
- Opportunity description and recommended team concept.

## Acceptance Criteria

Functional acceptance:

- MVP runs from `apps/workizen-3d`.
- `apps/workizen-3d-demo` remains unchanged as POC/reference unless separately approved.
- HQ Campus loads as the default world.
- Citizen Plaza is the default spawn point.
- AI Agent Lab is visually identifiable as the main landmark.
- All seven approved districts are visible or reachable.
- Each district can be selected.
- Initial NPCs can be selected or represented by panels.
- At least one opportunity can be inspected.
- At least one recommended team can be inspected.
- Mock data is separated enough to be replaced by Laravel REST API later.

Visual acceptance:

- Style follows Workizen Style Guide v1.
- Scene avoids crypto, NFT, cyberpunk, and dark metaverse aesthetics.
- Desktop and mobile layouts are readable.
- Text does not overlap panels or controls.
- Camera starts with Citizen Plaza and AI Agent Lab visible.

Governance acceptance:

- Work order and execution report are created for the coding task.
- Implementation does not include blockchain, NFT, production wallet, production auth, or multiplayer.

## Risks

- HQ Campus layout may need Founder visual approval before coordinates are final.
- Current POC is plaza-centered, so product MVP must avoid inheriting a plaza-only architecture.
- Missing asset metadata may slow later replacement with Synty or other assets.
- Ready Player Me, Mixamo, Colyseus, Open WebUI, and Laravel could distract from the MVP if introduced too early.
- District naming must stay aligned: approved MVP uses Opportunity Center, not only Opportunity Board.
- Mock reputation must remain clearly placeholder and not imply production scoring.

## Recommended First Coding Command

```text
Build the Workizen HQ Campus MVP in apps/workizen-3d using mock data only. Use apps/workizen-3d-demo as reference, but do not modify it unless necessary. Implement Variation D with Citizen Plaza as spawn, AI Agent Lab as main landmark, seven clickable districts, initial NPC panels, citizen manifests, one mock opportunity, and one recommended team panel. Do not implement backend, blockchain, NFT, production wallet, multiplayer, Ready Player Me, Mixamo, Colyseus, or Open WebUI.
```
