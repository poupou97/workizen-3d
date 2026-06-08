# Workizen Architecture

## Goals

Workizen should evolve as a modular product where web, 3D, and shared domain code can grow independently.

The initial architecture is organized around clean boundaries:

- Domain logic is kept independent from UI frameworks, rendering engines, databases, and third-party services.
- Application services orchestrate workflows across domain modules.
- Infrastructure adapters handle persistence, APIs, payments, analytics, authentication, and 3D runtime integrations.
- UI applications consume shared contracts and application services through stable interfaces.

Blockchain is intentionally out of scope for this scaffold.

## Top-Level Structure

```text
apps/
  workizen-web/
    src/
      app/
      features/
      ui/
      infrastructure/
    docs/
    assets/

  workizen-3d/
    src/
      app/
      scenes/
      systems/
      ui/
      infrastructure/
    docs/
    assets/

shared/
  domain/
    citizen-registry/
    opportunity-marketplace/
    reputation-system/
    wallet-system/
    digital-twin/
  application/
  contracts/
  infrastructure/
  testing/
  utils/
```

## Application Boundaries

### `apps/workizen-web`

The web application is the primary operational interface. It should handle:

- Citizen registration and profile management.
- Opportunity browsing, filtering, application, and administration.
- Reputation summaries and contribution history.
- Wallet dashboards and transaction history.
- Administrative workflows and moderation screens.

The web app should avoid owning core domain rules. Business rules should live in `shared/domain` or `shared/application`.

### `apps/workizen-3d`

The 3D application is the spatial digital twin experience. It should handle:

- 3D city, workplace, or community scenes.
- Spatial visualization of opportunities and citizen activity.
- Digital twin overlays, markers, and interaction panels.
- Rendering-specific systems, asset loading, and scene state.

The 3D app should consume shared contracts and domain services instead of duplicating marketplace or registry logic.

### `shared`

Shared code should be framework-agnostic where possible. It should provide:

- Domain entities, value objects, and policies.
- Use cases and application services.
- Shared API contracts and DTOs.
- Infrastructure interfaces.
- Test fixtures and domain-focused testing helpers.

## Domain Modules

### Citizen Registry

Purpose: maintain citizen records and eligibility context.

Planned responsibilities:

- Citizen profile model.
- Verification and eligibility status.
- Skills, interests, location preferences, and availability.
- Registry audit events.

Suggested folders:

```text
shared/domain/citizen-registry/
  entities/
  value-objects/
  policies/
  events/
```

### Opportunity Marketplace

Purpose: connect citizens with available opportunities.

Planned responsibilities:

- Opportunity listings.
- Matching and search criteria.
- Applications and assignments.
- Completion and feedback workflow.

Suggested folders:

```text
shared/domain/opportunity-marketplace/
  entities/
  value-objects/
  policies/
  events/
```

### Reputation System

Purpose: represent trust, contribution quality, and platform history.

Planned responsibilities:

- Reputation profiles.
- Contribution records.
- Score policies.
- Endorsements, reviews, and dispute effects.

Suggested folders:

```text
shared/domain/reputation-system/
  entities/
  value-objects/
  policies/
  events/
```

### Wallet System

Purpose: manage balances, credits, payouts, and account activity.

Planned responsibilities:

- Wallet account model.
- Ledger entries and transaction history.
- Credit grants and deductions.
- Payment provider integration contracts.

This is not a blockchain module. It should start as a conventional ledger-backed application system.

Suggested folders:

```text
shared/domain/wallet-system/
  entities/
  value-objects/
  policies/
  events/
```

### Digital Twin

Purpose: model spatial entities and 3D-visible platform state.

Planned responsibilities:

- Places, zones, anchors, and spatial metadata.
- 3D asset references.
- Opportunity and citizen overlays.
- Simulation state and environmental context.

Suggested folders:

```text
shared/domain/digital-twin/
  entities/
  value-objects/
  policies/
  events/
```

## Clean Architecture Layers

### Domain

Contains business concepts and rules. It should not import application UI, database clients, rendering engines, HTTP clients, or framework-specific modules.

### Application

Coordinates use cases such as registering a citizen, publishing an opportunity, assigning work, calculating reputation changes, recording wallet entries, and updating digital twin overlays.

### Contracts

Defines shared request, response, event, and DTO shapes used by apps and services.

### Infrastructure

Contains adapters for persistence, authentication, payment providers, APIs, analytics, and 3D runtime integrations.

### UI

Lives inside each app. UI code should be responsible for presentation, user interaction, routing, and local view state.

## Folder Structure

```text
.
├── README.md
├── Architecture.md
├── apps
│   ├── workizen-web
│   │   ├── assets
│   │   ├── docs
│   │   └── src
│   │       ├── app
│   │       ├── features
│   │       ├── infrastructure
│   │       └── ui
│   └── workizen-3d
│       ├── assets
│       ├── docs
│       └── src
│           ├── app
│           ├── infrastructure
│           ├── scenes
│           ├── systems
│           └── ui
└── shared
    ├── application
    ├── contracts
    ├── domain
    │   ├── citizen-registry
    │   ├── digital-twin
    │   ├── opportunity-marketplace
    │   ├── reputation-system
    │   └── wallet-system
    ├── infrastructure
    ├── testing
    └── utils
```

## Development Roadmap

### Phase 1: Foundation

- Choose frontend stack for `workizen-web`.
- Choose 3D runtime stack for `workizen-3d`.
- Define TypeScript conventions, package management, linting, and testing.
- Establish shared domain contracts.
- Add local development scripts.

### Phase 2: Core Domain

- Model Citizen Registry entities and use cases.
- Model Opportunity Marketplace entities and workflows.
- Add repository interfaces and in-memory test adapters.
- Add domain tests for registration, matching, assignment, and completion.

### Phase 3: Reputation And Wallet

- Add contribution history and reputation policies.
- Add conventional wallet ledger models.
- Add transaction history, credit grants, and payout contracts.
- Define audit events across reputation and wallet workflows.

### Phase 4: Product Applications

- Build web screens for registry, marketplace, reputation, and wallet workflows.
- Build 3D scenes for digital twin exploration.
- Connect 3D overlays to shared opportunity and place contracts.
- Add API adapters and persistence.

### Phase 5: Operations

- Add authentication and authorization.
- Add observability, analytics, and moderation tooling.
- Add deployment configuration.
- Add data migration strategy.
- Add security and privacy reviews.

## Non-Goals For This Scaffold

- No blockchain implementation.
- No production payment integration.
- No persistence implementation.
- No authentication implementation.
- No runnable UI implementation.
