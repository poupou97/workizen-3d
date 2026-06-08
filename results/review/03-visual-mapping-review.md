# 03 - Visual Mapping Review

Status: Founder Review

Source reviewed:

- `docs/world-design/workizen-visual-mapping-v01.md`
- `docs/world-design/hq-campus-layout-v01.md`
- `docs/style-guide/workizen-style-guide-v01.md`
- `images/concepts/`
- `assets/synty/polygon-town/`

## 1. Approved Visual Direction

Current approved visual direction:

- 70% Animal Crossing
- 20% Zepeto
- 10% Modern Startup Ecosystem

This is directionally strong. It avoids the wrong categories:

- crypto
- NFT
- cyberpunk
- dark metaverse
- token-first visuals

The concept art successfully communicates a bright, optimistic, civic, friendly Digital Citizen City.

## 2. Concept Art Review

Concept images reviewed:

- AI Agent Lab
- Citizen Plaza
- Founder Tower
- Knowledge Library
- Opportunity Center
- Compute Center
- Team Office
- HQ Campus overview images

Overall concept quality:

- High visual impact.
- Strong brand identity.
- Strong Workizen logo/signage usage.
- Clear civic campus feeling.
- Clear district identity.
- More polished and custom than the raw Synty Town Pack.

## 3. Concept vs Synty Match

### Direct Matches

These concept elements can be supported directly or near-directly by Polygon Town assets:

- Trees
- Bushes
- Flowers
- Park benches
- Street lamps
- Paths
- Sidewalks
- Roads
- Fences
- Garden areas
- Plaza environment props
- Small town buildings
- Shop-like Opportunity Center base
- Desks/chairs/computer props
- Books/bookshelves for Knowledge Library
- Human citizen crowd placeholders

### Partial Matches

These can be achieved with kitbash and styling:

- Knowledge Library building
- Team Office building
- Opportunity Center building
- Compute Center building
- Citizen Plaza fountain/social area
- Founder Tower lower floors
- Campus navigation signage
- Workizen district signage
- Collaboration spaces
- Community boards

### Missing Assets

These are not directly solved by Polygon Town:

- AI Agent Lab circular landmark facade.
- Large robot-face AI Lab feature.
- Friendly AI robot citizens.
- Founder Tower as a clear tall landmark.
- Compute Center server/data-center exterior identity.
- Hologram opportunity markers.
- Workizen branded signs/logos.
- Agent list boards.
- Digital dashboards and status panels.
- Glass-heavy rounded modern startup architecture.

## 4. District Mapping Evaluation

| District | Concept Strength | Synty Match | Review |
| --- | --- | --- | --- |
| AI Agent Lab | Very high | Partial | Main landmark requires custom kitbash/signage. Cannot be raw Synty only. |
| Founder Tower | High | Partial | Needs custom vertical landmark treatment. |
| Citizen Plaza | Very high | Strong | Best Synty fit: paths, benches, fountain, trees, lamps, signs. |
| Knowledge Library | High | Good | Books/desk props help; facade needs custom identity. |
| Opportunity Center | Very high | Good | Shop assets fit marketplace; opportunity boards must be custom. |
| Compute Center | High | Partial | Computer/solar/antenna props help; server facility identity missing. |
| Team Office | High | Good | Desks/chairs/meeting props fit well; workflow boards custom. |

## 5. Layout Consistency Issue

There is one important inconsistency:

`docs/world-design/hq-campus-layout-v01.md` places:

- Founder Tower: far north
- AI Agent Lab: north center
- Knowledge Library: northwest
- Compute Center: northeast
- Opportunity Center: southwest
- Team Office: southeast

`docs/world-design/workizen-visual-mapping-v01.md` places:

- Founder Tower: northwest
- Opportunity Center: northeast
- Knowledge Library: east
- Citizen Plaza: center
- Compute Center: southwest
- Team Office: south
- AI Agent Lab: center north

This should be resolved before the next build phase. It is not a blocker for current review, but it is a blocker for asset placement work.

## 6. Visual Consistency Evaluation

Strengths:

- Clear brand world.
- Clear anti-crypto positioning.
- Strong district names.
- Strong use of color-coded identities.
- Concept art aligns with a founder-demo story.

Risks:

- Raw Synty assets are more residential/town than startup-campus/futuristic.
- Concept art is too polished to reproduce directly without custom overlays.
- The current runtime MVP uses primitives, so visual consistency is not yet proven with imported assets.
- Layout conflict can lead to mismatched screenshots, docs, and implementation.

## 7. Visual Mapping Score

Visual Consistency: 7/10

Reason:

- Direction is strong and concept art is compelling.
- Asset pack can support 60-70% of the world feel.
- Landmark identity still needs custom treatment.
- Layout mapping must be reconciled before implementation.

## 8. Recommended Visual Mapping Decision

Founder should approve one canonical layout before additional coding.

Recommended canonical layout:

- Keep AI Agent Lab at center north.
- Keep Citizen Plaza at center.
- Put Opportunity Center near the early user journey.
- Keep Team Office adjacent to Opportunity Center.
- Treat Founder Tower as a strategic anchor visible from the plaza.

Then create:

- `district -> base Synty asset -> custom props/signage -> color theme -> MVP priority`

This should happen before replacing runtime primitives with imported assets.
