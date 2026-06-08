# 01 - Workizen Project Summary

Status: Founder Review

Date: 2026-06-07

Scope reviewed:

- `docs/`
- `images/concepts/`
- `assets/synty/polygon-town/`
- `apps/`
- `backend/` status check

## 1. Workizen Vision

Workizen is the visual operating environment of WorkforceOS.

The north-star vision is to create the world's first Digital Citizen City, where Human Citizens, AI Citizens, Knowledge Citizens, Compute Citizens, and future Robot/Drone Citizens can collaborate, form teams, build reputation, and participate in a Digital Citizen Economy.

Core principles recovered from the repository:

- Opportunity First
- Citizen First
- Team Formation First
- Community First
- Future Compatible

Workizen is explicitly not:

- NFT World
- Crypto Metaverse
- Virtual Land Speculation
- Token-first Product

## 2. Digital Citizen Concept

The project defines four initial citizen types:

- Human Citizen: real people such as founders, developers, consultants, architects, and customers.
- AI Citizen: AI agents such as EA Agent, SA Agent, PM Agent, DEV Agent, and TEST Agent.
- Knowledge Citizen: expertise contributors such as AWS, TOGAF, banking, and AI experts.
- Compute Citizen: compute contributors such as MacBook M1, GPU server, or EC2 node.

The citizen manifest defines a practical MVP data model:

- identity
- type
- role
- skills
- reputation placeholder
- availability
- location
- current status
- avatar type
- interaction type
- allowed actions

This is strong enough for a mock-data MVP but not yet a production domain contract.

## 3. HQ Campus Design

The approved first world is Workizen HQ Campus.

Confirmed decisions:

- Selected Master Plan: Variation D
- Default Map: Workizen HQ Campus
- Default Spawn: Citizen Plaza
- Main Landmark: AI Agent Lab
- Product App: `apps/workizen-3d`
- POC App: `apps/workizen-3d-demo`

Approved districts:

- AI Agent Lab
- Founder Tower
- Citizen Plaza
- Knowledge Library
- Opportunity Center
- Compute Center
- Team Office

HQ Campus is the correct first world because it is small enough to build and review, but complete enough to express the Workizen model: citizens, AI, knowledge, compute, opportunities, and team formation.

## 4. NPC Registry

Initial MVP NPCs:

- Workizen Guide: welcomes new citizens in Citizen Plaza.
- AI Architect: introduces AI Citizens in AI Agent Lab.
- Opportunity Manager: helps users discover opportunities.
- Knowledge Manager: guides knowledge discovery.
- Compute Manager: guides compute resource allocation.
- Project Manager: helps form and manage teams.

The running MVP also includes Founder as a visible review persona, which fits the Founder Demo build but should be documented in the NPC registry if it remains part of the canonical world.

## 5. Opportunity Marketplace

Opportunity Marketplace is the purpose layer of Workizen 3D.

The MVP scope is designed to prove:

```text
1 Opportunity
-> 1 Recommended Team
-> 1 Delivery Concept
-> 1 Reputation Placeholder
```

The current app already demonstrates mock opportunities and recommended teams. The next maturity step is to make the Opportunity Center visually and experientially stronger, so users understand within seconds that Workizen is not just a campus but a work marketplace.

## 6. WorkforceOS Relationship

Workizen 3D is not a standalone game world. It is the visual operating environment for WorkforceOS.

Relationship:

- WorkforceOS is the broader work/citizen operating system.
- Workizen 3D is the spatial, visual, demo-friendly interface.
- Laravel backend is deferred.
- Frontend uses mock data first.
- Production integration should happen later through REST contracts.

## 7. Current MVP Scope

In scope:

- Workizen HQ Campus
- Citizen Plaza spawn
- AI Agent Lab landmark
- Seven clickable districts
- Mock citizens
- NPC panels
- Opportunity board
- Recommended team panel
- Founder Demo Mode
- Responsive desktop/tablet/mobile baseline

Out of scope:

- Backend
- Blockchain
- NFT
- Production wallet
- Production authentication
- Multiplayer
- Laravel integration
- Open WebUI
- Ready Player Me
- Mixamo
- Colyseus
- Digital Twin expansion beyond HQ Campus

## 8. Future Roadmap

Recovered roadmap sequence:

1. HQ Campus MVP
2. Living Digital Citizen World
3. Multiplayer Digital Citizen City
4. WorkforceOS Integration
5. Digital Citizen Economy
6. Digital Twin Earth

Detailed 3D roadmap:

- Vision
- World Design Package
- MVP Scope Definition
- Codex MVP Build
- AI Citizens
- Avatar & Animation
- Multiplayer
- WorkforceOS Integration
- Digital Citizen Economy
- Digital Twin

Golden Rule:

```text
Never expand the world before proving:
1 Opportunity -> 1 Team -> 1 Delivery -> 1 Reputation Update
```

## 9. Current Status

Current status is mixed but healthy:

- Vision is clear.
- Product direction is differentiated.
- HQ Campus and district model are approved.
- MVP mock app exists in `apps/workizen-3d`.
- Synty Polygon Town assets are present locally.
- Concept art exists for all seven districts.
- Asset-to-world mapping is still draft-level.
- Layout documents conflict on relative district placement.
- Backend folder does not exist.
- Synty assets are not yet integrated into the runtime app.

## 10. Key Review Conclusion

Workizen is strategically coherent and ready for founder review.

The immediate next risk is not architecture. The immediate risk is visual execution: the concept art is significantly richer and more custom than the raw Synty Town Pack. Before additional coding, the team should lock an asset mapping pass and district layout decision so the next build does not waste effort implementing the wrong visual plan.
