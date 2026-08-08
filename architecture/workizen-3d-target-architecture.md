# Workizen 3D Target Architecture

## Core Architecture Statement

Workizen is an Opportunity Marketplace visualized as a cute 3D Digital Citizen City.

It is not just a metaverse and it is not a crypto/NFT product. The 3D world is a visual experience layer for the Digital Citizen Economy.

Frontend can move first using mock JSON data. Backend Laravel services will be integrated later through REST API contracts.

No blockchain, NFT, real wallet, or production payment logic is part of this target architecture.

## Target Structure

```text
apps/
  workizen-web/
  workizen-3d/
  workizen-3d-demo/

assets/
  synty/
  avatars/
  animations/

backend/
  workizen-api/

shared/
  domain/
  contracts/
  application/
  infrastructure/
  testing/
  utils/
```

## Frontend Architecture

Frontend applications:

- `apps/workizen-web`
- `apps/workizen-3d`
- `apps/workizen-3d-demo`

Frontend stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Three Fiber
- Three.js
- Drei
- Zustand

3D and asset stack:

- Synty Polygon Town Pack for stylized town environments.
- Ready Player Me for avatar identity and appearance.
- Mixamo for walk, idle, wave, and sit animations.
- Colyseus later for multiplayer presence and room state.

Frontend responsibilities:

- Landing Page
- Citizen Marketplace UI
- Opportunity Marketplace UI
- Workizen 3D City
- Citizen Plaza
- Opportunity Board
- Clickable districts/buildings
- Citizen profile panel
- Recommended team panel
- Mock data integration first
- Camera controls
- Avatar placeholders and future avatar adapter
- UI panels, filters, controls, and scene interactions

Frontend data flow:

```text
Mock JSON
→ Frontend feature models
→ Zustand local UI state
→ React UI and React Three Fiber scene
```

Later:

```text
Laravel REST API
→ API client adapter
→ Shared contract shape
→ Frontend feature models
→ Zustand local UI state
→ React UI and React Three Fiber scene
```

Frontend must avoid:

- Production auth implementation.
- Production database logic.
- Real wallet logic.
- Blockchain assumptions.
- NFT assumptions.
- Backend-only business rules.

## Backend Architecture

Backend will be implemented later.

Backend application:

- `backend/workizen-api`

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
- Authentication and authorization
- Database migrations
- API validation
- Server-side workflow state
- Audit logs

Backend data flow:

```text
Laravel Controller
→ Request validation
→ Application service
→ Domain model / policy
→ Repository
→ PostgreSQL or MySQL
→ API resource response
```

Redis should be reserved for:

- Cache
- Queues
- Rate limiting
- Future realtime support

## REST API First

The backend should expose stable REST endpoints before any WebSocket or multiplayer implementation.

Initial REST resources:

- `/api/users`
- `/api/citizens`
- `/api/citizen-registry`
- `/api/profiles`
- `/api/opportunities`
- `/api/teams`
- `/api/assets`
- `/api/reputation`
- `/api/marketplace`
- `/api/wallet-ledger-placeholder`

The wallet/ledger endpoint is a placeholder only. It must not implement real money movement, blockchain, payment custody, or production revenue sharing.

## WebSocket And Colyseus Later

Realtime should be added only after REST contracts and the single-player visual demo are stable.

Possible realtime scope:

- Multiplayer presence
- Plaza room state
- Team collaboration
- Opportunity Board updates
- Agent/citizen activity streams
- Avatar transform synchronization

Colyseus should be treated as a realtime adapter, not the core domain source of truth.

## Opportunity Marketplace Purpose Layer

The purpose layer is what makes Workizen City more than a visual world.

Purpose layer concepts:

- Opportunities
- Citizen profiles
- Reputation
- Availability
- Skills
- Team formation
- Recommended AI/Human/Knowledge/Compute Citizens

Scene interactions should make the purpose layer visible:

- Click Opportunity Board to see available work.
- Click an opportunity to see recommended team composition.
- Click a citizen to see role, skills, reputation, and availability.
- Click a district to understand what work happens there.

## World District Model

Target districts:

- Citizen Plaza
- Opportunity Board
- AI Agent Lab
- Knowledge Library
- Compute Center
- Team Office
- Marketplace Street
- Citizen Homes

Recommended district fields:

- `id`
- `name`
- `type`
- `description`
- `purpose`
- `futureCapability`
- `assetIds`
- `position`
- `recommendedCitizens`

## Mock Data Contracts

Frontend should use mock JSON first.

Required mock data:

- Citizens
- Districts
- Opportunities
- Recommended teams
- Reputation
- Skills
- Availability

Recommended shape:

```text
citizen
  id
  name
  type
  role
  skills
  reputation
  availability
  avatar

opportunity
  id
  title
  type
  description
  requiredSkills
  recommendedTeam
  districtId
  status

recommendedTeam
  id
  opportunityId
  members
  rationale
```

Mock JSON should eventually map directly to Laravel REST API responses.

## Asset Architecture

The final visual demo should use Synty Polygon Town Pack or comparable stylized assets rather than procedural boxes.

Asset folders:

```text
assets/synty/
assets/avatars/
assets/animations/
```

Asset catalog:

```text
assets/catalog/
  synty-assets.json
  avatar-assets.json
  animation-assets.json
```

The asset catalog should map source assets to Workizen districts and scene usage.

## Avatar Architecture

Start with placeholder avatars.

Later integrate Ready Player Me through an adapter:

```text
features/citizens/avatar/
  PlaceholderAvatar.tsx
  ReadyPlayerMeAvatar.tsx
  avatar-types.ts
  avatar-adapter.ts
```

Scene code should depend on Workizen citizen/avatar contracts, not directly on Ready Player Me provider details.

## Animation Architecture

Use Mixamo for early movement.

Start with:

- Idle
- Walk

Later add:

- Wave
- Sit
- Interact

Animation state should be controlled by citizen state:

```text
Citizen state
→ Avatar adapter
→ Animation state
→ R3F animated avatar
```

## Purchased Laravel Workspace/Admin Rule

If a Laravel workspace/admin source is purchased, use it only as an accelerator.

Allowed:

- Admin UI boilerplate
- Laravel auth/admin scaffolding
- Team/workspace management
- RBAC
- Dashboard features
- CRUD acceleration

Not allowed:

- Defining Workizen core product architecture
- Replacing Workizen domain model
- Forcing frontend architecture around template constraints
- Introducing blockchain assumptions
- Introducing production wallet assumptions

## Missing Layers

Implement later:

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

Do not implement these until the visual demo, purpose layer, and mock data contracts are clear.

## Integration Boundary

Frontend and backend should meet through API contracts.

```text
Frontend mock data
→ Shared contract shape
→ Laravel REST API
→ Future WebSocket / Colyseus adapter
```

This keeps the frontend productive now and keeps the backend clean for later implementation.
