# Workizen 3D Project Review v1

Status: REVIEW

Date: 2026-06-07

Project: workizen-3d

Context: Workizen 3D is part of WorkforceOS / Workizen.vn. The target product is Workizen HQ Campus, the default spawn world for Digital Citizens.

## 1. Current Project Structure

```text
.
├── Architecture.md
├── README.md
├── apps/
│   ├── workizen-3d/
│   │   ├── README.md
│   │   ├── assets/
│   │   ├── docs/
│   │   └── src/
│   │       ├── app/
│   │       ├── infrastructure/
│   │       ├── scenes/
│   │       ├── systems/
│   │       └── ui/
│   ├── workizen-3d-demo/
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── scripts/
│   │   └── src/
│   │       ├── app/
│   │       └── features/plaza/
│   └── workizen-web/
│       ├── README.md
│       ├── assets/
│       ├── docs/
│       └── src/
├── architecture/
├── assets/
├── docs/
│   ├── concepts/
│   ├── reviews/
│   ├── roadmaps/
│   ├── style-guide/
│   └── world-design/
├── execution-reports/
├── images/
│   ├── concepts/
│   └── style-guide/
├── output/
│   ├── demos/
│   ├── diagrams/
│   ├── screenshots/
│   └── videos/
├── shared/
│   ├── application/
│   ├── contracts/
│   ├── domain/
│   ├── infrastructure/
│   ├── testing/
│   └── utils/
└── work-orders/
```

Notes:

- `apps/workizen-3d-demo` is the only runnable application found.
- `apps/workizen-3d` and `apps/workizen-web` are scaffold folders with placeholder `.gitkeep` files and README files.
- `shared` is scaffolded for clean architecture modules but does not yet contain production domain code.
- The workspace is not currently an initialized Git repository from this shell context.

## 2. Existing Assets and Concepts Found

Concept images found:

- `images/concepts/ai-agent-lab/ai-agent-lab-v01.png`
- `images/concepts/citizen-plaza/citizen-plaza-v01.png`
- `images/concepts/compute-center/compute-center-v01.png`
- `images/concepts/founder-tower/founder-tower-v01.png`
- `images/concepts/knowledge-library/knowledge-library-v01.png`
- `images/concepts/opportunity-center/opportunity-center-v01.png`
- `images/concepts/team-office/team-office-v01.png`
- `images/concepts/hq-campus/ChatGPT Image Jun 7, 2026, 07_22_31 PM.png`
- `images/concepts/hq-campus/ChatGPT Image Jun 7, 2026, 07_25_59 PM (1).png`

Generated demo screenshots found:

- `output/screenshots/workizen-3d-citizen-plaza-desktop.png`
- `output/screenshots/workizen-3d-citizen-plaza-mobile.png`

Asset planning found:

- `docs/workizen-3d-asset-shortlist.md` recommends Synty Polygon Town Pack, Synty Polygon City Pack, Ready Player Me, Mixamo, Kenney, Quaternius, shadcn/ui, Framer Motion, and Colyseus.

## 3. Existing Documentation Found

Core documentation:

- `README.md`
- `Architecture.md`
- `architecture/workizen-3d-target-architecture.md`
- `architecture/workizen-3d-demo-architecture.md`
- `docs/workizen-3d-implementation-plan.md`
- `docs/workizen-3d-asset-shortlist.md`
- `docs/roadmaps/workizen-3d-roadmap-v01.md`

World design documentation:

- `docs/world-design/master-plan-v01.md`
- `docs/world-design/citizen-types-v01.md`
- `docs/world-design/npc-registry-v01.md`
- `docs/world-design/world-navigation-v01.md`

Governance documentation:

- `work-orders/README.md`
- `execution-reports/README.md`
- Existing work orders under `work-orders/2026/06/`
- Existing execution reports under `execution-reports/2026/06/`

Application documentation:

- `apps/workizen-3d-demo/README.md`
- `apps/workizen-3d/README.md`
- `apps/workizen-web/README.md`
- `shared/README.md`

## 4. Confirmed Decisions

Confirmed in current documentation:

- Workizen is a Digital Citizen City and Opportunity Marketplace visual layer, not a crypto/NFT metaverse.
- Workizen HQ Campus is the intended default world direction.
- Selected Master Plan is Variation D.
- AI Agent Lab is the main landmark.
- Core districts include:
  - AI Agent Lab
  - Founder Tower
  - Citizen Plaza
  - Knowledge Library
  - Opportunity Center
  - Compute Center
  - Team Office
- Citizen types are:
  - Human Citizen
  - AI Citizen
  - Knowledge Citizen
  - Compute Citizen
- Initial NPCs are:
  - Workizen Guide
  - AI Architect
  - Opportunity Manager
  - Knowledge Manager
  - Compute Manager
  - Project Manager
- Frontend should proceed first with mock JSON data.
- Backend should come later as Laravel.
- REST API comes before WebSocket or multiplayer.
- Future stack includes React Three Fiber, Three.js, Drei, Zustand, Ready Player Me, Mixamo, Colyseus later, and Open WebUI for AI NPC chat later.
- Blockchain, NFT logic, real wallet movement, production auth, and production backend logic are out of scope for the current frontend demo/MVP phase.

Important alignment note:

- `docs/world-design/world-navigation-v01.md` currently says `Default Spawn: Citizen Plaza`.
- The Founder request says Workizen HQ Campus is the default map.
- These can coexist if HQ Campus is the map and Citizen Plaza is the spawn point inside that map. This should be made explicit before coding.

## 5. Missing Documentation

Missing or incomplete documentation:

- `docs/style-guide/workizen-style-guide-v01.md` is referenced in the roadmap but does not exist.
- `docs/mvp/workizen-mvp-scope-v01.md` is referenced in the roadmap but does not exist.
- A formal HQ Campus map specification for Variation D does not exist yet.
- A district coordinate/layout spec does not exist yet.
- An NPC dialogue/content spec does not exist yet.
- A mock data contract document for citizens, districts, NPCs, opportunities, teams, and profiles does not exist yet.
- A source/license register for generated images and future third-party assets does not exist yet.
- A Laravel REST API contract document does not exist yet.
- A visual QA checklist for the HQ Campus MVP does not exist yet.

## 6. Missing Folders

Missing required or target folders:

- `backend/workizen-api/`
- `docs/mvp/`
- `assets/synty/`
- `assets/avatars/`
- `assets/animations/`

Newly created by this review task:

- `docs/reviews/`

Existing but currently empty or placeholder-only:

- `docs/concepts/`
- `docs/style-guide/`
- `images/style-guide/`
- `assets/`
- `output/demos/`
- `output/diagrams/`
- `output/videos/`
- `apps/workizen-3d/`
- `apps/workizen-web/`
- `shared/`

## 7. Recommended Cleanup

Recommended cleanup before MVP coding:

- Clarify terminology: HQ Campus should be the default map; Citizen Plaza should be the default spawn point.
- Rename or catalog HQ Campus concept image filenames so they are stable and easier to reference.
- Add asset metadata for all concept images, including source, date, intended district, usage status, and license notes.
- Decide whether `apps/workizen-3d-demo` remains the MVP base or is migrated into `apps/workizen-3d`.
- Keep `apps/workizen-3d-demo/.next`, `node_modules`, and `tsconfig.tsbuildinfo` out of reports and future source-focused reviews.
- Resolve the architecture district list mismatch: some docs mention Marketplace Street, Citizen Homes, and Opportunity Board, while the approved HQ Campus district list uses Opportunity Center and Founder Tower.
- Create a standard work-order and execution-report template to reduce governance drift.

No files should be deleted until the Founder reviews the cleanup list.

## 8. Recommended Next Steps

Recommended sequence:

1. Founder reviews this project review report.
2. Create `docs/mvp/workizen-mvp-scope-v01.md`.
3. Create `docs/style-guide/workizen-style-guide-v01.md`.
4. Create `docs/world-design/hq-campus-layout-v01.md` for Variation D.
5. Create `docs/data-contracts/workizen-3d-mock-data-v01.md`.
6. Decide whether MVP implementation starts in `apps/workizen-3d-demo` or `apps/workizen-3d`.
7. Build frontend HQ Campus MVP using mock data only.
8. Add NPC panels and opportunity board interactions.
9. Add visual QA screenshots and smoke tests.
10. Defer Laravel, Open WebUI, Ready Player Me, Mixamo, and Colyseus until the single-player HQ Campus loop is approved.

## 9. Proposed MVP Scope

Proposed MVP in scope:

- Workizen HQ Campus as the default map.
- Citizen Plaza as the initial spawn point.
- Variation D layout.
- AI Agent Lab as the main landmark.
- Clickable districts:
  - AI Agent Lab
  - Founder Tower
  - Citizen Plaza
  - Knowledge Library
  - Opportunity Center
  - Compute Center
  - Team Office
- Mock citizens:
  - Human Citizen
  - AI Citizen
  - Knowledge Citizen
  - Compute Citizen
- NPC panels:
  - Workizen Guide
  - AI Architect
  - Opportunity Manager
  - Knowledge Manager
  - Compute Manager
  - Project Manager
- Opportunity board with mock opportunities.
- Citizen profile panel with mock skills, role, availability, reputation placeholder, and current status.
- Basic camera navigation and district selection.
- Desktop and mobile visual QA screenshots.

Proposed MVP out of scope:

- Blockchain.
- NFT assets.
- Real wallet, payment custody, or revenue sharing.
- Production authentication.
- Laravel backend implementation.
- Database persistence.
- Multiplayer.
- Open WebUI NPC chat integration.
- Ready Player Me production avatar loading.
- Mixamo animation pipeline.
- Digital twin expansion beyond HQ Campus.

## 10. Risks Before Coding

Key risks:

- Default map and spawn terminology need confirmation to avoid building the wrong starting experience.
- Current runnable demo is Citizen Plaza only, while the requested MVP direction is HQ Campus.
- The approved Variation D layout lacks coordinates, scale, camera path, and district placement rules.
- The visual style guide is missing, which can cause inconsistent district design.
- MVP scope documentation is missing, which can cause premature expansion.
- Asset licensing and source tracking are not documented.
- There are two district vocabularies in the docs: approved HQ Campus districts and broader future city districts.
- Backend API contracts are not defined, so frontend mock data should be isolated behind replaceable adapters.
- `apps/workizen-3d-demo` uses live dependencies and a generated `.next` folder; future review should distinguish source from build artifacts.

## 11. Suggested First Coding Task

Suggested first coding task after Founder approval:

Create the Workizen HQ Campus MVP scene using mock data only, based on Variation D, with Citizen Plaza as the spawn point and AI Agent Lab as the main landmark.

Suggested deliverables:

- Decide implementation base: `apps/workizen-3d-demo` or `apps/workizen-3d`.
- Add a typed mock data model for districts, NPCs, citizens, opportunities, and profile panels.
- Replace the plaza-only mental model with an HQ Campus scene model.
- Render all seven approved districts as clickable landmarks.
- Add NPC info panels and opportunity/citizen panels.
- Add smoke validation for canvas rendering and district/NPC selection.

Suggested next command:

```text
Create docs/mvp/workizen-mvp-scope-v01.md and docs/world-design/hq-campus-layout-v01.md before coding the HQ Campus MVP.
```
