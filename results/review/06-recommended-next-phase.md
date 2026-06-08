# 06 - Recommended Next Phase

Status: Founder Review

## Final Recommendation

Recommendation: A. Continue World Design

## Why Not Begin MVP Build?

A Founder Demo MVP already exists in `apps/workizen-3d`.

It proves:

- HQ Campus
- Citizen Plaza spawn
- AI Agent Lab landmark
- District selection
- NPC/citizen/opportunity panels
- Recommended team concept
- Founder Demo Mode

Starting another build immediately would create risk because asset mapping and layout alignment are not yet locked.

## Why Not Refactor Architecture First?

Architecture is good enough for the current phase.

The project has:

- Product app vs POC app separation.
- Frontend-first mock data boundary.
- Backend-later decision.
- No crypto/NFT/wallet/multiplayer boundary.

Refactoring architecture now would not solve the highest risk, which is visual/world execution alignment.

## Why Not Acquire More Assets First?

Polygon Town assets are already strong enough for the next controlled visual pass.

More assets may be useful later, but current gaps are not caused by lack of purchased assets alone. They are caused by:

- asset selection not being locked
- layout inconsistency
- missing conversion workflow
- custom landmark requirements

## Recommended Next Phase: World Design Lock v2

Goal:

Prepare the project for a high-confidence Synty asset integration phase.

Duration:

- Short design/technical planning phase before additional runtime coding.

## Phase Deliverables

### 1. Canonical Layout Decision

Create/update:

```text
docs/world-design/hq-campus-layout-v02.md
```

Must resolve:

- Founder Tower position
- Opportunity Center position
- Knowledge Library position
- Compute Center position
- Team Office position
- AI Agent Lab landmark placement
- Citizen Plaza spawn and camera sightline

### 2. District Asset Selection Sheet

Create:

```text
assets/workizen-district-asset-selection-v01.md
```

For each district:

- Primary building asset
- Secondary building/kitbash assets
- Props
- Environment pieces
- Required custom signs/logos
- Visual priority
- Implementation risk

### 3. Synty Import Spike

Create a technical proof plan, not full feature work:

- Convert one FBX building to GLB.
- Load it in a small test scene or isolated branch/route.
- Verify scale, material, lighting, shadows, and performance.
- Document conversion steps.

Recommended doc:

```text
docs/technical/synty-import-pipeline-v01.md
```

### 4. Visual QA Checklist

Create:

```text
docs/reviews/workizen-visual-qa-checklist-v01.md
```

Checklist should validate:

- district recognizability
- visual consistency
- camera readability
- text/signage readability
- mobile/tablet usability
- no crypto/NFT/dark-metaverse drift

### 5. Founder Approval Package

Create:

```text
results/review/founder-world-design-lock-v02.md
```

Founder should approve:

- canonical layout
- asset selection
- landmark treatment
- what remains placeholder
- next implementation scope

## Suggested Next Implementation Phase After Approval

After World Design Lock v2, begin:

```text
Synty Visual Upgrade Sprint 1
```

Scope:

- Replace Citizen Plaza paths/trees/benches/fountain first.
- Replace Opportunity Center with shop/commercial Synty assets.
- Replace Team Office with office/collaboration kitbash.
- Keep AI Agent Lab and Founder Tower as hybrid Synty + custom signage until custom landmark plan is approved.

## Decision Gate

Do not start high-fidelity asset implementation until:

- one canonical layout exists
- one asset selection sheet exists
- one import pipeline has been validated
- Founder approves visual direction v2

## Expected Benefit

This avoids:

- redoing district placement
- importing wrong assets
- overshooting concept art expectations
- confusing MVP with Digital Twin expansion
- weakening the Opportunity Marketplace story

## Recommended Command For Founder

```text
Approve A: Continue World Design. Create HQ Campus Layout v2, District Asset Selection v1, and Synty Import Pipeline v1 before the next runtime coding sprint.
```
