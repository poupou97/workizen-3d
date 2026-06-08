# 05 - Gap Analysis

Status: Founder Review

## 1. Strategic Gaps

### Gap 1: Layout Conflict

Two documents define different district positions:

- `hq-campus-layout-v01.md`
- `workizen-visual-mapping-v01.md`

Impact:

- Asset placement can be implemented incorrectly.
- Founder screenshots may not match documentation.
- Future navigation work may be reworked.

Recommendation:

- Approve one canonical Variation D layout and update all docs to match it.

### Gap 2: Founder NPC Not Canonical

The runtime MVP includes Founder as a visible NPC/persona, but the original NPC registry does not include Founder.

Impact:

- Demo and documentation diverge.

Recommendation:

- Decide whether Founder is an NPC, a special review persona, or only a demo entity.

## 2. Asset Gaps

### Gap 3: No Asset Selection Sheet

The project has a high-level asset catalog, but it does not yet assign specific Synty filenames to each district.

Impact:

- Implementation team must guess which assets to use.

Recommendation:

- Create a per-district asset selection table.

### Gap 4: No FBX -> Web Runtime Pipeline

Synty source assets are FBX/OBJ/textures. The web app needs a reliable runtime format, normally GLB/GLTF.

Impact:

- Direct implementation may stall on asset conversion, scale, pivot, material, or texture issues.

Recommendation:

- Convert and test one building, one prop, one character, and one environment tile before mass integration.

### Gap 5: Concept Art Requires Custom Landmark Work

AI Agent Lab and Founder Tower are not direct matches for raw Polygon Town assets.

Impact:

- Visual expectations may exceed what the asset pack can deliver.

Recommendation:

- Plan kitbash/custom signage for AI Agent Lab and Founder Tower.

## 3. Product Gaps

### Gap 6: Opportunity Marketplace Needs Stronger Visual Priority

The product identity is "Digital Citizen City + Opportunity Marketplace." The world design is strong, but marketplace interactions must stay central.

Impact:

- Founder/user may perceive Workizen as only a 3D campus.

Recommendation:

- Make Opportunity Center, opportunity board, and team recommendation path visually explicit.

### Gap 7: Reputation Is Placeholder Only

Reputation is represented in mock data but no rules exist.

Impact:

- Risk of implying production scoring too early.

Recommendation:

- Keep reputation clearly labeled as placeholder until WorkforceOS rules are designed.

## 4. Architecture Gaps

### Gap 8: Backend Folder Missing

`backend/` does not exist.

Impact:

- Not an MVP blocker, but future Laravel integration is not scaffolded.

Recommendation:

- Defer backend. Create API contract docs before creating Laravel code.

### Gap 9: Shared Contract Boundary Still Early

Citizen manifest is useful for mock data, but future API contracts are not defined.

Impact:

- Frontend data model may drift before Laravel integration.

Recommendation:

- Define REST DTOs after MVP interaction model stabilizes.

## 5. Runtime Gaps

### Gap 10: Current MVP Uses Primitives

The app works as a founder demo, but it does not yet use Synty assets.

Impact:

- Visual quality is below concept art.

Recommendation:

- Next visual phase should replace primitives with selected Synty assets gradually.

### Gap 11: Dev Preview Instability

Local `next dev` had environment-specific preview instability; production preview through `npm run demo` is currently the safer Founder demo path.

Impact:

- Founder demo should avoid dev-server confusion.

Recommendation:

- Use `npm run demo` for Founder review.

## 6. Documentation Gaps

Missing or incomplete:

- Canonical layout update.
- Specific asset selection sheet.
- Asset conversion workflow.
- Asset license/export register.
- Visual QA checklist for Synty integration.
- API contract docs for Laravel phase.
- NPC registry update if Founder remains in demo.

## 7. Gap Severity

| Gap | Severity | Blocks Coding? |
| --- | --- | --- |
| Layout conflict | High | Blocks asset placement coding |
| Asset selection missing | High | Blocks efficient visual upgrade |
| FBX/GLB workflow missing | High | Blocks reliable Synty integration |
| Custom landmark mismatch | Medium | Does not block, but affects quality |
| Opportunity visual priority | Medium | Does not block, but affects product clarity |
| Backend missing | Low | Not MVP blocker |
| Reputation placeholder | Low | Not MVP blocker if labeled |

## 8. Gap Analysis Conclusion

The core product is coherent. The main gaps are not strategic; they are execution alignment gaps.

The next phase should resolve layout and visual mapping before writing more runtime code.
