# Workizen Scale Style Guide

**Version:** 1.0  
**Date:** 2026-06-08  
**Status:** APPROVED  
**Scope:** Workizen HQ Campus — all 3D assets, characters, environment props

---

## 1. Core Convention

> **1 Unity Unit = 1 Meter**

All objects in the Workizen HQ Campus must be sized in meters. Scale values in Unity must be (1, 1, 1) at runtime — size is baked into the asset or applied as a uniform import scale, not compensated with per-object transform scale in the scene hierarchy.

### Why strict 1:1 scale matters

- Physics, navmesh, and raycast distances all assume meters.
- Cross-team asset hand-offs have no ambiguity.
- The Unity Editor `WorkizenScaleValidator` can run automated checks without needing to know each asset's import scale.
- Art direction conversations use real-world intuition ("that door is 2.1 m tall") instead of arbitrary units.

---

## 2. Scale Hierarchy Overview

The campus is designed around a **chibi-friendly low-poly aesthetic**. Characters are slightly exaggerated (heads a bit larger, bodies compact), which means buildings and props scale to feel good relative to the character — not necessarily to architectural reality.

```
GROUND  ───────────────────────────────────────────────── 0.0 m
        Bench top surface                                  0.45 m
        Compute terminal (kiosk body top)                  0.75–1.0 m
        Road surface                                       0.0 m  (flush with ground)
        ─────────────────────────────────────────────────
HUMAN   Compute Citizen eye-level                          0.85–1.0 m
        Knowledge Citizen eye-level                        0.9–1.05 m
        AI Agent Robot top of head                         1.0–1.4 m
        Human Citizen top of head                          1.1–1.3 m
        ─────────────────────────────────────────────────
PROPS   Small shrub / hedge top                            0.5–1.0 m
        Fountain top                                       1.5–2.0 m
        Bookshelf top                                      1.8–2.4 m
        ─────────────────────────────────────────────────
TREES   Bamboo cluster top                                 2.0–3.0 m
        Cherry blossom canopy top                          3.0–4.5 m
        Palm tree top                                      4.0–5.5 m
        Synty deciduous tree top                           4.0–5.5 m
        Synty pine tree top                                5.0–6.5 m
        ─────────────────────────────────────────────────
BLDGS   Small district building                            3.0–5.0 m
        Standard district building                         4.0–6.0 m
        Landmark building (AI Agent Lab / Founder Tower)   5.0–8.0 m
        ─────────────────────────────────────────────────
SKY     Floating blimp / airship                           12.0–16.0 m altitude
        Cloud layer                                        13.0–18.0 m altitude
```

---

## 3. Character Scale Rules

Characters use **chibi proportions**: head-to-body ratio ≈ 1:2 to 1:2.5. The total standing height (floor to top of head or antenna) defines the character's target height.

| Character Type       | Target Height | Min  | Max  | Notes |
|----------------------|---------------|------|------|-------|
| Human Citizen        | 1.20 m        | 1.10 | 1.30 | Male / Female variants same height |
| Knowledge Citizen    | 1.15 m        | 1.05 | 1.25 | Scholar — slight build, same range |
| AI Agent (Robot)     | 1.10 m        | 1.00 | 1.40 | Antenna tip counts toward height |
| Compute Citizen      | 0.85 m        | 0.70 | 1.00 | Kiosk / terminal form, not humanoid |

**Chibi head rule:** Head height must be ≥ 30% of total body height for human-type characters. Robots may have larger heads (up to 50%).

**Foot plane:** All characters must have their base (lowest vertex in bind pose) at Y = 0.0. No floating characters.

---

## 4. Environment & Prop Scale Rules

### Trees

| Tree Type            | Target Height | Min  | Max  |
|----------------------|---------------|------|------|
| Bamboo cluster       | 2.50 m        | 2.00 | 3.00 |
| Cherry blossom       | 3.50 m        | 3.00 | 4.50 |
| Palm tree            | 4.50 m        | 4.00 | 5.50 |
| Deciduous (Synty)    | 4.70 m        | 4.00 | 5.50 |
| Pine (Synty)         | 5.48 m        | 5.00 | 6.50 |

Trees must be taller than all character types at their maximum height. Palm canopy must not overlap building rooflines within the same district zone.

### Benches & Seating

| Object               | Target Height | Min  | Max  | Target Depth | Target Width |
|----------------------|---------------|------|------|--------------|--------------|
| Park bench (seat)    | 0.45 m        | 0.40 | 0.55 | 0.50–0.65 m  | 1.5–2.0 m   |
| Decorative bench     | 0.45 m        | 0.38 | 0.55 | 0.45–0.60 m  | 1.0–1.8 m   |

### Roads & Ground Infrastructure

| Surface              | Height (Y)   | Width               | Notes |
|----------------------|--------------|---------------------|-------|
| Main campus road     | 0.00–0.02 m  | 3.0–4.0 m           | Flush or slightly raised |
| Footpath / walkway   | 0.01–0.03 m  | 1.2–2.0 m           | Slight curb acceptable |
| Plaza surface        | 0.00–0.05 m  | 8.0–20.0 m per axis | Central plaza: ~14×14 m |
| Road lane divider    | 0.02–0.05 m  | 0.1–0.2 m           | Optional |

### Doors & Entryways

| Door Type            | Target Height | Min  | Max  | Target Width |
|----------------------|---------------|------|------|--------------|
| Standard door        | 2.10 m        | 2.00 | 2.40 | 0.9–1.2 m   |
| Building entrance    | 2.40 m        | 2.00 | 3.00 | 1.5–3.0 m   |
| Landmark gate        | 3.00 m        | 2.50 | 4.00 | 2.0–5.0 m   |

Doors must be clearly passable by the tallest citizen type (AI Agent max 1.40 m). Minimum door height = 1.6× tallest character max.

---

## 5. Building Scale Rules

District zones constrain building footprints. Buildings must fit within their allocated zone with a 0.25 m inset minimum on each horizontal side.

| Building Type        | Target Height | Min  | Max  | Max Footprint (W × D) |
|----------------------|---------------|------|------|-----------------------|
| Small district bldg  | 3.50 m        | 3.00 | 5.00 | Zone width × Zone depth |
| Standard district    | 4.00 m        | 3.50 | 5.50 | Zone width × Zone depth |
| Founder Tower        | 4.50 m        | 4.00 | 6.00 | 3.5 × 3.2 m zone      |
| Knowledge Library    | 3.50 m        | 3.00 | 5.00 | 4.2 × 4.2 m zone      |
| Compute Center       | 3.50 m        | 3.00 | 5.00 | 4.2 × 4.2 m zone      |
| Opportunity Center   | 3.50 m        | 3.00 | 5.00 | 4.4 × 4.4 m zone      |
| Team Office          | 3.50 m        | 3.00 | 5.00 | 4.5 × 4.5 m zone      |
| AI Agent Lab         | 5.00 m        | 4.50 | 8.00 | 5.2 × 4.4 m zone      |

**Height hierarchy rule:** Landmark buildings must be visually taller than any surrounding tree. AI Agent Lab and Founder Tower must stand above the Synty pine line (~5.5 m).

---

## 6. Plaza Scale Rules

| Zone                 | Target Size (W × D) | Notes |
|----------------------|---------------------|-------|
| Central Citizen Plaza | 14 × 14 m          | Main gathering hub |
| District entrance pad | 4 × 4 m            | Per district |
| Fountain plaza        | 6 × 6 m            | With clearance |
| Market stall area     | 3 × 3 m per stall  | Opportunity district |

---

## 7. Scale Validation Status Definitions

Used by `WorkizenScaleValidator.cs` and reported in the size matrix:

| Status        | Meaning |
|---------------|---------|
| `OK`          | All dimensions (H, W, D) are within the defined range for this object type. |
| `TOO_LARGE`   | One or more dimensions exceed the maximum for this object type. |
| `TOO_SMALL`   | One or more dimensions are below the minimum for this object type. |
| `NEEDS_REVIEW` | Dimensions are within range but aspect ratio, footprint, or visual relationship with adjacent objects needs designer sign-off. |

---

## 8. Import Scale Rules

For Tripo3D GLB assets (normalized 1×1×1 at export):

```
scene_scale = targetHeight / rawH
yOffset     = targetHeight / 2
```

Where `rawH` is the asset's Y bounding-box size as exported (measure via GLB inspector). Most Tripo models have rawH ≈ 1.0. Known exceptions:

| Asset             | rawH  | Formula |
|-------------------|-------|---------|
| TeamOffice        | 0.766 | tripoH(3.50, 0.766) |
| Pier              | 0.377 | tripoH(1.50, 0.377) |
| Blimp             | 0.556 | scale = target_length / 1.002 (horizontal craft) |

For Synty GLB assets (exported in source centimeters):

```
scene_scale = targetHeight / rawSourceHeight_in_cm × 100
```

Calibrated Synty scales (do not modify):

| Asset                    | Import Scale | Final Height |
|--------------------------|-------------|--------------|
| SM_Env_Tree_01           | 0.010       | 4.69 m       |
| SM_Env_Tree_Pine_01      | 0.010       | 5.48 m       |
| SM_Env_Tree_Large_01     | 0.004       | 4.65 m       |
| SM_Prop_Fountain_01      | 0.012       | 1.82 m       |
| SM_Prop_Bookshelf_01     | 0.010       | 2.19 m       |
| SM_Prop_Desk_01          | 0.012       | 1.05 m       |

---

## 9. Review Sign-off

Changes to any target height, min, or max in this document must be reviewed by the Art Director and documented in `results/review/workizen-scale-validation-report.md` before merging.
