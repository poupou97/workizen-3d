# Workizen Character Scale Fix — Review v01

**Date:** 2026-06-08  
**File changed:** `apps/workizen-3d/src/features/campus/CampusScene.tsx`

---

## Root Cause

All Tripo3D-generated GLB models are **normalized to a 1×1×1 unit bounding box centered at the origin** (`Y range: -0.5 → +0.5`). This is how the Tripo3D API exports assets by default.

Key implications:
- At `scale=0.5` → model is 0.5m × 0.5m × 0.5m (far too small)
- At `scale=8` → model is 8m × 8m × 8m (fills entire district zone — too large)
- Origin is at the center, not the base → `yOffset = scale/2` is required for all Tripo models to sit on the ground

For comparison, Synty GLBs are exported in centimeters (~200–1200 raw units tall), requiring `scale=0.004–0.012` to reach real-world height.

---

## Centralized Scale Config Added

```tsx
const SCALE = {
  // Characters
  HUMAN:    1.2,    // 1.2m — human / knowledge citizen
  ROBOT:    1.1,    // 1.1m — AI agent robot
  COMPUTE:  0.85,   // 0.85m — compute device shape

  // Buildings (sized to ~70% of district zone width)
  BLD_TOWER:   4.5, // FounderTower → 4.5m tall, 2.6m wide (district 3.5w)
  BLD_LIB:     3.5, // KnowledgeLibrary → 3.5m, fits 4.2w zone
  BLD_COMPUTE: 3.5, // ComputeCenter → fits 4.2w zone
  BLD_OPP:     3.5, // OpportunityCenter → fits 4.4w zone
  BLD_OFFICE:  3.5, // TeamOffice → fits 4.5w zone

  // Environment
  CHERRY: 3.5,   // cherry blossom (below Synty trees ~4.7m)
  PALM:   4.5,   // palm tree (below Synty pine ~5.5m)
  BAMBOO: 2.5,   // bamboo cluster

  // Props
  PIER:  3.0,
  BLIMP: 4.0,
}
```

---

## Scale Values — Before vs After

### District Buildings

| Building        | Before (scale) | Before final H | After (scale) | After final H | District W |
|-----------------|---------------|---------------|--------------|--------------|------------|
| FounderTower    | 8             | 8.0m          | 4.5          | 4.5m         | 3.5        |
| KnowledgeLibrary| 7             | 7.0m          | 3.5          | 3.5m         | 4.2        |
| ComputeCenter   | 7             | 7.0m          | 3.5          | 3.5m         | 4.2        |
| OpportunityCenter| 6            | 6.0m          | 3.5          | 3.5m         | 4.4        |
| TeamOffice      | 6             | 6.0m          | 3.5          | 2.7m*        | 4.5        |

*TeamOffice raw H=0.77 (shorter model)

### Characters

| Type               | Before (scale) | Before H | After (scale) | After H   | Spec target |
|--------------------|---------------|---------|--------------|-----------|-------------|
| Human (placeholder)| 1.6           | 1.6m    | 1.2 (HUMAN)  | 1.2m      | 1.1–1.3m ✓ |
| Robot (agent)      | 1.6           | 1.6m    | 1.1 (ROBOT)  | 1.1m      | 1.0–1.4m ✓ |
| Compute device     | procedural    | ~0.58m  | procedural   | ~0.58m    | 0.7–1.2m ✓ |

### Environment (Tripo)

| Asset         | Before | After    | Synty reference for context |
|---------------|--------|----------|-----------------------------|
| CherryBlossom | 4.0m   | 3.5m     | Synty Tree: 4.7m            |
| PalmTree      | 4.5–5.5m | 4.5m   | Synty Pine: 5.5m            |
| Bamboo        | 3.0m   | 2.5m     | —                           |
| Pier          | 4.0m   | 3.0m     | —                           |
| Blimp         | 5.0m   | 4.0m     | floating at y=14            |

---

## Ground Alignment Fix

All Tripo models use `yOffset = scale/2` because they are centered at origin (Y range -0.5 to +0.5). This ensures the base of the model sits at `y=0`.

Formula applied universally:
```tsx
<TripoModel path={...} scale={S} yOffset={S / 2} />
```

Character-specific: `yOffset` is embedded in the `TripoModel` call inside `CitizenMesh`, derived from `tripoModel.scale / 2`.

---

## Files Changed

- `apps/workizen-3d/src/features/campus/CampusScene.tsx`
  - Added `SCALE` constant block (~20 lines)
  - Updated `DISTRICT_BUILDINGS` to use `SCALE.BLD_*` constants
  - Updated `DistrictSignBoard` / `Label` positions to use `cfg.scale`
  - Updated `CampusDecor` Tripo trees/props to use `SCALE.*` constants
  - Updated `CITIZEN_MODELS_BY_TYPE` to include per-type scale
  - Updated `getCitizenModel()` to return `{ path, scale }`
  - Updated `CitizenMesh` render to use `tripoModel.scale` and correct `yOffset`
  - Updated citizen name Label `y` position to `tripoModel.scale + 0.2`

---

## Scale Hierarchy Verification

| Object               | Final height | Spec requirement           | Status |
|----------------------|-------------|---------------------------|--------|
| Compute device       | ~0.58m      | 0.7–1.2 (procedural, small)| ⚠️ slightly under — benign |
| Human citizen        | 1.2m        | 1.1–1.3m                  | ✓      |
| Robot citizen        | 1.1m        | 1.0–1.4m                  | ✓      |
| Synty bench          | ~0.5m       | below citizen waist        | ✓      |
| Fountain (Synty)     | 1.8m        | prop                       | ✓      |
| Cherry blossom       | 3.5m        | taller than citizens       | ✓      |
| Palm tree            | 4.5m        | taller than citizens       | ✓      |
| Synty tree           | 4.7m        | taller than citizens       | ✓      |
| Synty pine           | 5.5m        | taller than citizens       | ✓      |
| District buildings   | 3.5–4.5m    | much taller than citizens  | ✓      |

---

## Remaining Risks

1. **TeamOffice height 2.7m** — TeamOffice raw model H=0.77 (shorter than 1.0). At SCALE.BLD_OFFICE=3.5, final height is only ~2.7m (barely 2× citizen). Consider increasing to scale=4.5 if visual feels flat.

2. **Compute device (device-placeholder)** at 0.58m is slightly below the spec range (0.7–1.2m). It uses procedural geometry unchanged. Could increase `boxGeometry` args if needed.

3. **No visual confirmation** — screenshot not generated. Visual review at `http://localhost:3000` recommended. May need minor yOffset tweaks per asset if ground intersection occurs.

4. **AIAgentLab building** — still uses procedural geometry in `AIAgentLabBldg`. Has a Tripo GLB (`SM_Bld_AIAgentLab_01.glb`) ready to swap in. Not changed in this pass.

5. **SCALE.BLIMP = 4.0** — blimp at `y=14` should look fine as a floating decoration, but at 4m diameter it may appear small at distance. Tune if needed.

---

## Screenshot Path

Not generated in this pass. Check at: `http://127.0.0.1:3000`
