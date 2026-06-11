# Workizen 3D Self-Continuation Plan

## Context

Workizen 3D is part of WorkforceOS / Workizen.vn.

Workizen is not just a metaverse. Workizen is an Opportunity Marketplace visualized as a cute 3D Digital Citizen City.

The frontend can be built first using mock JSON data. The backend will be integrated later through REST APIs.

This plan is written so Codex, Claude, or another agent can continue the project without losing context.

## Product Vision

Workizen City is a cute/chibi low-poly Digital Citizen World.

The city should feel modern, professional, playful, and opportunity-first. Its purpose is not to imitate a crypto/NFT metaverse. It is a 3D visual experience layer for the Digital Citizen Economy.

Core vision:

- Workizen City is the main 3D place.
- Digital Citizens live, learn, collaborate, and discover opportunities.
- Opportunity Marketplace is the purpose layer.
- Citizens, AI agents, knowledge workers, compute citizens, and teams are represented visually.
- Buildings and districts should communicate what citizens can do.
- The visual demo should be beautiful and understandable before backend integration.

## Governance Continuation Rule

Every future task must follow the project governance workflow:

```text
Founder Work Order → Codex/Agent Execution → Execution Report → Founder Review → Approve/Rework/Reject
```

Each task must keep:

- A matching work order file in `work-orders/YYYY/MM/`.
- A matching execution report file in `execution-reports/YYYY/MM/`.
- Exact matching filenames between work order and execution report.
- Commands run.
- Work completed.
- Work still unfinished.
- Risks and blockers.
- Recommended next actions.

## Frontend Scope

Frontend can start immediately without backend.

Frontend apps:

- `apps/workizen-web`
- `apps/workizen-3d`
- `apps/workizen-3d-demo`

Frontend responsibilities:

- Landing Page
- Citizen Marketplace UI
- Opportunity Marketplace UI
- Workizen 3D City
- Citizen Plaza
- Opportunity Board
- Clickable districts and buildings
- Citizen profile panel
- Recommended team panel
- Mock data integration first
- Visual demo and UX

Frontend stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion for web UI
- React Three Fiber
- Three.js
- Drei
- Zustand

Frontend should not implement:

- Production auth
- Production backend logic
- Production wallet
- Blockchain
- NFT logic
- Payment custody

## Backend Scope

Backend will be implemented later.

Backend folder:

```text
backend/workizen-api
```

Backend stack:

- Laravel
- PostgreSQL or MySQL
- Redis
- Laravel Sanctum or Passport
- REST API first
- WebSocket later

Backend responsibilities:

- Users
- Citizens
- Citizen Registry
- Profiles
- Opportunities
- Teams
- Assets
- Reputation
- Marketplace
- Wallet/Ledger placeholder

Important backend rule:

If a Laravel workspace/admin template or source is purchased, use it only as an accelerator for admin, auth, team/workspace, RBAC, and dashboard features.

Do not let a purchased source define the core Workizen product architecture.

## Technology Stack

3D/frontend:

- React Three Fiber
- Three.js
- Drei
- Zustand
- Synty Polygon Town Pack
- Ready Player Me
- Mixamo
- Colyseus later

Web/frontend:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

Backend:

- Laravel backend later
- PostgreSQL or MySQL
- Redis
- Sanctum or Passport
- REST API first
- WebSocket later

Research only:

- Supabase/PostgreSQL can be researched as an option, but it is not the final backend decision.

## Asset Workflow

The final visual demo should not rely on procedural boxes.

Synty workflow:

1. Buy/download Synty Polygon Town Pack.
2. Inspect asset license and usage constraints.
3. Export usable GLB/GLTF assets if needed.
4. Store imported assets under:

```text
assets/synty/
```

5. Create an asset catalog.
6. Map assets to Workizen districts.
7. Replace primitive placeholder buildings with stylized town assets.

Recommended asset catalog fields:

- `id`
- `name`
- `type`
- `source`
- `path`
- `district`
- `scale`
- `position`
- `rotation`
- `notes`

## Avatar Workflow

Start with placeholder avatars, then integrate Ready Player Me.

Recommended sequence:

1. Keep chibi placeholder avatars for MVP continuity.
2. Create a Ready Player Me avatar manually.
3. Load avatar GLB in React Three Fiber.
4. Create an avatar adapter so scene code does not depend directly on Ready Player Me.
5. Later integrate real Ready Player Me avatar URLs.

Recommended structure:

```text
features/citizens/avatar/
  PlaceholderAvatar.tsx
  ReadyPlayerMeAvatar.tsx
  avatar-types.ts
  avatar-adapter.ts
```

## Animation Workflow

Use Mixamo for early avatar movement.

Target animations:

- Idle
- Walk
- Wave
- Sit

Start with idle and walk only.

Recommended sequence:

1. Import one placeholder avatar.
2. Add idle animation.
3. Add walk animation.
4. Connect animations to avatar state.
5. Add simple movement paths for citizens.
6. Add wave and sit later.

Animation state examples:

- `idle`
- `walking`
- `waving`
- `sitting`
- `interacting`

## World Design

Create these Workizen City districts:

- Citizen Plaza
- Opportunity Board
- AI Agent Lab
- Knowledge Library
- Compute Center
- Team Office
- Marketplace Street
- Citizen Homes

District intent:

- Citizen Plaza: welcome area and central gathering point.
- Opportunity Board: marketplace entry point for available opportunities.
- AI Agent Lab: AI citizen and agent workflow space.
- Knowledge Library: learning, playbooks, and skill development.
- Compute Center: compute citizens, task processing, and automation.
- Team Office: team formation and collaboration.
- Marketplace Street: opportunity browsing and service exchange.
- Citizen Homes: citizen identity, profiles, and personalization.

## Purpose Layer

The world must feel alive through:

- Opportunities
- Citizen profiles
- Reputation
- Availability
- Team formation
- Recommended AI/Human/Knowledge/Compute Citizens

Purpose layer UI should answer:

- What opportunities exist?
- Which citizens are recommended?
- What skills and reputation does a citizen have?
- Who is available?
- What team should be formed?
- What role does each citizen play?

## MVP Flow

User enters Workizen City:

1. See Citizen Plaza.
2. See moving citizens.
3. Click Opportunity Board.
4. View opportunity.
5. See recommended team.
6. Click citizen.
7. Open profile panel.
8. View reputation and role.

## Data Strategy

Use mock JSON data first.

Create mock data for:

- Citizens
- Districts
- Opportunities
- Recommended teams
- Reputation
- Skills
- Availability

Later replace mock data with Laravel REST APIs.

Mock data should live close to frontend features first. Once contracts stabilize, move shared types/contracts into `shared/contracts`.

Recommended mock data structure:

```text
apps/workizen-3d-demo/src/features/plaza/data/
  citizens.json
  districts.json
  opportunities.json
  recommended-teams.json
  reputation.json
  skills.json
  availability.json
```

## Missing Layers To Implement Later

- Laravel REST API
- Auth
- Citizen Registry
- Multiplayer presence
- Chat bubble
- Voice
- Room system
- Wallet
- Revenue sharing
- Digital Twin
- Robot/Drone citizens

These layers should not be implemented until the visual MVP and frontend data contracts are clear.

## Implementation Roadmap

### Sprint 1: Better Visual Scene With Mock Data

- Improve visual scene using placeholder assets.
- Add district layout.
- Add clickable buildings.
- Add Citizen profile panel.
- Add Opportunity profile panel.
- Add Recommended team panel.
- Add mock JSON data.
- Keep frontend independent from backend.

### Sprint 2: Synty Asset Baseline

- Import Synty assets.
- Replace primitive boxes.
- Create Workizen City visual baseline.
- Add asset catalog.
- Map Synty buildings to Workizen districts.

### Sprint 3: Ready Player Me Avatar Loader

- Add Ready Player Me avatar loader.
- Keep placeholder citizen avatars as fallback.
- Add avatar adapter.
- Load at least one real avatar GLB.

### Sprint 4: Mixamo Idle/Walk Animations

- Add Mixamo idle animation.
- Add Mixamo walk animation.
- Connect animation state to citizen movement.
- Add basic citizen movement paths.

### Sprint 5: Opportunity Board And Team Recommendations

- Build Opportunity Board UI.
- Add opportunity detail panel.
- Add recommended team panel.
- Add AI/Human/Knowledge/Compute citizen recommendations.
- Add reputation and availability display.

### Sprint 6: Laravel API Contract Preparation

- Prepare Laravel API contract.
- Define REST endpoints.
- Do not implement backend yet.
- Define request/response examples.
- Define shared DTOs.

### Sprint 7: Colyseus Multiplayer Architecture

- Prepare Colyseus multiplayer architecture.
- Define room state.
- Define presence model.
- Define avatar transform synchronization.
- Do not integrate until single-player visual demo is stable.

## Acceptance Criteria For This Plan

- Future Codex/Claude can read this document and continue implementation.
- Frontend can run independently with mock data.
- Backend decision is documented as Laravel.
- Purchased Laravel workspace/admin source is treated only as an accelerator.
- No blockchain implementation.
- No production wallet.
- No over-engineering.
- Focus remains on beautiful demo and clear architecture.

## Current State

_Cập nhật lần cuối: 2026-06-11_

### Completed

- Governance structure exists.
- `apps/workizen-3d` — production app running at workizen.net.
- Next.js 16.2.7 standalone + Docker + Caddy 2 on Oracle VM (137.131.35.185).
- AWS CloudFront CDN — distribution E218G9RNHGYBND, Route53 alias, ACM cert.
- GLB cache fix — `/assets/*` 30-day immutable (was max-age=0).
- CDN scripts: `deploy/workizen-3d/cdn/` — invalidate.sh, rollback-cloudfront.sh.
- Loading screen with progress bar using `useProgress` from @react-three/drei.
- Responsive UI — viewport meta, mobile bottom sheet (SelectionPanel), scrollable nav.
- Citizen Plaza hidden from UI (button + badge removed, data intact).
- AgentChat Overlay — Workizen Guide SVG avatar, MockProvider, Flowise-ready abstraction.
- Service layer: `src/services/chat/` — types, MockProvider, FlowiseProvider stub, factory.
- 85 GLB files (66MB), Synty Polygon Town assets, citizen animations (Idle/Walk/Run).
- 2.5D camera lock, 8 districts, selection panel, demo guide, mock data.

### In Progress

- `feat/responsive-ui` branch not yet merged to `main`.
- CDN invalidation not yet integrated into deploy.sh (still manual step).

### Not Started

- Flowise integration (`NEXT_PUBLIC_FLOWISE_API_URL` + `NEXT_PUBLIC_FLOWISE_CHATFLOW_ID`).
- Workizen Guide real PNG/WebP art asset (currently SVG placeholder).
- www.workizen.net redirect (needs CloudFront Function).
- NPC click → AgentChat context.
- `apps/workizen-web` landing page.
- `backend/workizen-api` Laravel backend.
- Real citizen profiles from API.
- Reputation system.
- Multiplayer (Colyseus).
- Production auth.

## Recommended Next Steps

### Ngắn hạn (ngay bây giờ)

1. Merge `feat/responsive-ui` → `main` và deploy.
2. Tích hợp `./cdn/invalidate.sh` vào cuối `deploy.sh`.
3. Tạo CloudFront Function redirect `www.workizen.net` → `workizen.net`.

### Trung hạn (sprint tiếp theo)

4. Deploy Flowise instance + tạo Workizen Guide chatflow + kết nối qua env vars.
5. Commissioning Workizen Guide art asset (PNG/WebP, 6 expressions).
6. NPC interaction → mở AgentChat với context NPC.

### Tham khảo chi tiết

Xem `docs/roadmaps/workizen-3d-sprint-plan-2026-06.md` — toàn bộ P0/P1/P2/P3 backlog.  
Xem `execution-reports/2026/06/2026-06-11-workizen-3d-cdn-responsive-agentchat.md` — session report hôm nay.
