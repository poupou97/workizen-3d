# Work Order: Workizen Frontend Backend Split

## Context

Workizen 3D is part of WorkforceOS / Workizen.vn.

The project needs a continuation plan that clearly separates frontend and backend responsibilities while allowing frontend work to continue before backend implementation.

## Task

Update the Workizen 3D continuation plan with a clear frontend/backend split.

Original Founder command:

```text
Update Workizen 3D continuation plan.

Add a clear separation between Frontend and Backend responsibilities.

Frontend:
- apps/workizen-web
- apps/workizen-3d
- Next.js, Tailwind, shadcn/ui
- React Three Fiber, Three.js, Drei, Zustand
- Synty Polygon Town Pack
- Ready Player Me
- Mixamo
- Use mock JSON data first
- Focus on visual demo and UX

Backend:
- backend/workizen-api
- Laravel
- PostgreSQL or MySQL
- Redis
- Laravel Sanctum or Passport
- REST API first
- WebSocket later
- Manage users, citizens, profiles, opportunities, teams, assets, reputation, marketplace, wallet placeholder

Important:
Frontend can proceed before backend.
Backend Laravel will be integrated later.
If a Laravel workspace/admin source is purchased, use it only as a backend/admin accelerator, not as the core product architecture.

Update:
- docs/workizen-3d-implementation-plan.md
- architecture/workizen-3d-target-architecture.md
- README.md

Create matching work order and execution report:
- work-orders/2026/06/2026-06-07-1730-workizen-frontend-backend-split.md
- execution-reports/2026/06/2026-06-07-1730-workizen-frontend-backend-split.md
```

## Requirements

- Do not delete existing files.
- Do not overwrite user-created content.
- Create matching work order and execution report files.
- Update `docs/workizen-3d-implementation-plan.md`.
- Update `architecture/workizen-3d-target-architecture.md`.
- Update `README.md`.
- Document frontend responsibilities.
- Document backend responsibilities.
- Document that frontend can proceed before backend.
- Document that Laravel is integrated later.
- Document that purchased Laravel workspace/admin source can only accelerate backend/admin work.
- Do not implement blockchain.
- Do not implement real wallet.
- Do not implement production auth.

## Deliverables

- `docs/workizen-3d-implementation-plan.md`
- `architecture/workizen-3d-target-architecture.md`
- Updated `README.md`
- `work-orders/2026/06/2026-06-07-1730-workizen-frontend-backend-split.md`
- `execution-reports/2026/06/2026-06-07-1730-workizen-frontend-backend-split.md`

## Acceptance Criteria

- Frontend and backend responsibilities are clearly separated.
- Frontend-first mock JSON workflow is documented.
- Laravel backend target is documented.
- REST API first and WebSocket later strategy is documented.
- Purchased Laravel workspace/admin accelerator rule is documented.
- Governance files exist and filenames match exactly.
- Execution report records commands run, completed work, unfinished work, risks, and next actions.
