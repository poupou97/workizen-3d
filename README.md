# Workizen

Workizen is planned as a civic work platform with a web application, a 3D digital twin experience, and shared domain modules.

This repository is intentionally scaffolded for future development. It defines the application boundaries, shared architecture, and roadmap without implementing blockchain or production business logic.

## Repository Layout

```text
apps/
  workizen-web/      Web application for citizens, opportunities, reputation, and wallet views
  workizen-3d/       3D digital twin application and spatial interaction layer
shared/             Shared domain contracts, services, types, and utilities
```

## Planned Product Areas

- Citizen Registry: citizen profiles, identity records, eligibility status, and registry workflows.
- Opportunity Marketplace: opportunity discovery, matching, applications, assignments, and completion tracking.
- Reputation System: contribution history, scores, endorsements, trust signals, and dispute outcomes.
- Wallet System: account balances, credits, payouts, transaction history, and non-blockchain wallet abstractions.
- Digital Twin: 3D places, assets, overlays, simulations, and citizen interaction points.

## Architecture

See [Architecture.md](./Architecture.md) for application boundaries, module layout, clean architecture principles, and roadmap.

See [architecture/workizen-3d-target-architecture.md](./architecture/workizen-3d-target-architecture.md) for the target frontend/backend split.

## Continuation Plan

See [docs/workizen-3d-implementation-plan.md](./docs/workizen-3d-implementation-plan.md) for the active continuation plan.

Frontend can proceed before backend by using mock JSON data first.

## Workizen 3D Continuation Plan

Workizen 3D is an Opportunity Marketplace visualized as a cute 3D Digital Citizen City.

The next implementation direction is:

- Build frontend first using mock JSON data.
- Improve the visual Workizen City demo and UX before backend integration.
- Use Synty Polygon Town Pack for final stylized city assets.
- Use Ready Player Me for future avatar loading.
- Use Mixamo for future idle/walk/wave/sit animation states.
- Prepare Colyseus later for multiplayer presence.
- Integrate Laravel backend later through REST APIs.

## AI Asset Generation Governance

Future Tripo / AI-generated 3D assets must follow the Workizen governance standards before they enter runtime.

Required references:

- [Workizen Art Direction Standard](./docs/art-direction/workizen-art-direction-standard-v01.md)
- [AI Asset Generation Standard](./docs/assets/ai-asset-generation-standard-v01.md)
- [Tripo API Call Log Standard](./docs/assets/tripo-api-call-log-standard-v01.md)
- [Generated Asset Registry](./docs/assets/generated-asset-registry-v01.md)

No unlogged Tripo API calls are allowed. No generated asset may enter runtime without registry metadata, review status, and traceable generation history. API keys must never be committed and must come from environment variables only, including `TRIPO_API_KEY`.

## Workizen HQ Island Direction

Workizen HQ Campus is now standardized as a starter island surrounded by ocean.

Future Workizen 3D implementation should follow the island world standard:

- World first, UI second.
- Bottom navigation is planned for primary menu access.
- Compact left info cards are planned for selected districts, citizens, and opportunities.
- Infinite grass plane is deprecated.

Reference standards:

- [Workizen HQ Island World Standard](./docs/world-design/workizen-hq-island-world-standard-v01.md)
- [HQ Campus Layout v03](./docs/world-design/hq-campus-layout-v03.md)
- [Workizen UI Layout Standard](./docs/ui/workizen-ui-layout-standard-v01.md)

Recommended next task: build Sprint 1 from [docs/workizen-3d-implementation-plan.md](./docs/workizen-3d-implementation-plan.md), using `apps/workizen-3d-demo` as the base.

Frontend responsibilities:

- `apps/workizen-web`
- `apps/workizen-3d`
- `apps/workizen-3d-demo`
- Next.js, Tailwind CSS, shadcn/ui
- React Three Fiber, Three.js, Drei, Zustand
- Synty Polygon Town Pack
- Ready Player Me
- Mixamo
- Visual demo and UX

Backend target:

- `backend/workizen-api`
- Laravel
- PostgreSQL or MySQL
- Redis
- Laravel Sanctum or Passport
- REST API first
- WebSocket later
- Users, citizens, profiles, opportunities, teams, assets, reputation, marketplace, and wallet placeholder

If a Laravel workspace/admin source is purchased later, it should be used only as a backend/admin accelerator, not as the core product architecture.

## Task Governance

Workizen is part of WorkforceOS / Workizen.vn and follows strict task governance.

Every task must have:

- A work order file containing the Founder command or instruction.
- A matching execution report file containing the task result.

Workflow:

```text
Founder Work Order → Codex/Agent Execution → Execution Report → Founder Review → Approve/Rework/Reject
```

Files must use the `YYYY/MM` folder structure, and matching work order and execution report filenames must be identical:

```text
work-orders/YYYY/MM/YYYY-MM-DD-HHMM-task-name.md
execution-reports/YYYY/MM/YYYY-MM-DD-HHMM-task-name.md
```

## Development Status

Current status: repository scaffold plus runnable Workizen 3D Citizen Plaza demo.

No blockchain implementation is included. The wallet system should be modeled as a conventional application domain first, with storage and payment integrations introduced later behind explicit interfaces.

## Getting Started

The first runnable demo is available under:

- `apps/workizen-3d-demo`

Run it with:

```bash
cd apps/workizen-3d-demo
npm install
npm run dev
```

Future product app setup should be added under:

- `apps/workizen-web`
- `apps/workizen-3d`

Shared code should live under `shared` and remain framework-agnostic unless a specific adapter requires otherwise.
