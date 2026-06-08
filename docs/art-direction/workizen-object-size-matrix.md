# Workizen Object Size Matrix

**Version:** 1.0  
**Date:** 2026-06-08  
**Convention:** 1 Unity Unit = 1 Meter  
**Reference:** `docs/art-direction/workizen-scale-style-guide.md`

---

## How to Read This Matrix

| Column | Meaning |
|--------|---------|
| **Category** | Asset category as used in `WorkizenScaleValidator.cs` |
| **Object Type** | Canonical name matching the validator's `ObjectCategory` enum |
| **Target H/W/D** | Ideal height / width / depth in meters |
| **Min / Max** | Acceptable range — outside this = validator flags |
| **rawH** | GLB export Y size (for Tripo assets); blank = Synty or procedural |
| **Import Scale** | Unity import multiplier to reach target height |
| **Status** | Current validation status from last scan |

---

## Characters

| Object Type        | Target H | Min H | Max H | Target W | Target D | rawH  | Import Scale | Status |
|--------------------|----------|-------|-------|----------|----------|-------|-------------|--------|
| Human Citizen      | 1.20 m   | 1.10  | 1.30  | 0.4–0.6  | 0.4–0.6  | ≈1.00 | 1.20        | OK     |
| Knowledge Citizen  | 1.15 m   | 1.05  | 1.25  | 0.4–0.6  | 0.4–0.6  | ≈1.00 | 1.15        | NEEDS_REVIEW |
| AI Agent (Robot)   | 1.10 m   | 1.00  | 1.40  | 0.4–0.7  | 0.4–0.7  | ≈1.00 | 1.10        | OK     |
| Compute Citizen    | 0.85 m   | 0.70  | 1.00  | 0.6–0.9  | 0.4–0.6  | —     | procedural  | OK     |

**Note on Knowledge Citizen / Compute Citizen:** These avatar types do not have distinct scene instances yet — KnowledgeCitizen_01 and ComputeCitizen_01 GLBs are loaded but no `avatar_type` in `data.ts` maps to them. Status is NEEDS_REVIEW until wired.

---

## Vegetation

| Object Type        | Target H | Min H | Max H | Target W | Target D | rawH  | Import Scale | Status |
|--------------------|----------|-------|-------|----------|----------|-------|-------------|--------|
| Bamboo Cluster     | 2.50 m   | 2.00  | 3.00  | 0.5–1.5  | 0.5–1.5  | 1.000 | 2.50        | OK     |
| Cherry Blossom     | 3.50 m   | 3.00  | 4.50  | 2.5–5.0  | 2.5–5.0  | 0.974 | 3.59        | OK     |
| Palm Tree          | 4.50 m   | 4.00  | 5.50  | 2.0–5.0  | 2.0–5.0  | 0.997 | 4.51        | OK     |
| Deciduous Tree     | 4.69 m   | 4.00  | 5.50  | 3.0–6.0  | 3.0–6.0  | Synty | 0.010       | OK     |
| Pine Tree          | 5.48 m   | 5.00  | 6.50  | 2.0–4.0  | 2.0–4.0  | Synty | 0.010       | OK     |
| Large Tree         | 4.65 m   | 4.00  | 5.50  | 3.0–7.0  | 3.0–7.0  | Synty | 0.004       | OK     |

---

## Props & Furniture

| Object Type        | Target H | Min H | Max H | Target W    | Target D    | rawH  | Import Scale | Status |
|--------------------|----------|-------|-------|-------------|-------------|-------|-------------|--------|
| Park Bench         | 0.45 m   | 0.38  | 0.55  | 1.5–2.0 m   | 0.5–0.65 m  | Synty | 0.012       | OK     |
| Fountain           | 1.82 m   | 1.50  | 2.00  | 1.5–3.0 m   | 1.5–3.0 m   | Synty | 0.012       | OK     |
| Bookshelf          | 2.19 m   | 1.80  | 2.40  | 0.8–1.4 m   | 0.3–0.6 m   | Synty | 0.010       | OK     |
| Desk               | 1.05 m   | 0.80  | 1.20  | 1.2–2.0 m   | 0.6–1.0 m   | Synty | 0.012       | OK     |
| Pier / Dock        | 1.50 m   | 1.00  | 2.00  | 2.0–6.0 m   | 3.0–10.0 m  | 0.377 | 3.98        | OK     |
| Info Board         | 1.80 m   | 1.50  | 2.50  | 0.5–1.2 m   | 0.1–0.4 m   | ≈1.00 | 1.80        | NEEDS_REVIEW |
| Blimp / Airship    | 4.00 m   | 3.00  | 6.00  | 3.0–5.0 m   | 6.0–9.0 m   | 0.556 | 4.00 (size) | OK     |

---

## Roads & Ground Surfaces

| Object Type        | Height (Y) | Min Y | Max Y | Width       | Notes |
|--------------------|-----------|-------|-------|-------------|-------|
| Main Campus Road   | 0.00 m    | 0.00  | 0.02  | 3.0–4.0 m   | Flush with ground plane |
| Footpath           | 0.01 m    | 0.00  | 0.03  | 1.2–2.0 m   | Slight raise OK |
| Central Plaza      | 0.00 m    | 0.00  | 0.05  | 10–16 m     | 14 × 14 m target |
| District Entry Pad | 0.01 m    | 0.00  | 0.05  | 3.5–5.0 m   | Per district front |

---

## Doors & Entryways

| Object Type        | Target H | Min H | Max H | Target W    | Notes |
|--------------------|----------|-------|-------|-------------|-------|
| Standard Door      | 2.10 m   | 2.00  | 2.40  | 0.9–1.2 m   | Min 1.6× tallest citizen |
| Building Entrance  | 2.40 m   | 2.00  | 3.00  | 1.5–3.0 m   | Double door acceptable |
| Landmark Gate      | 3.00 m   | 2.50  | 4.00  | 2.0–5.0 m   | AI Agent Lab main gate |

---

## Buildings

| Object Type           | Target H | Min H | Max H | Max W  | Max D  | rawH  | Import Scale | Status |
|-----------------------|----------|-------|-------|--------|--------|-------|-------------|--------|
| Founder Tower         | 4.50 m   | 4.00  | 6.00  | 3.50 m | 3.20 m | 1.000 | 4.50        | OK     |
| Knowledge Library     | 3.50 m   | 3.00  | 5.00  | 4.20 m | 4.20 m | 1.000 | 3.50        | OK     |
| Compute Center        | 3.50 m   | 3.00  | 5.00  | 4.20 m | 4.20 m | 1.000 | 3.50        | OK     |
| Opportunity Center    | 3.50 m   | 3.00  | 5.00  | 4.40 m | 4.40 m | 1.005 | 3.48        | OK     |
| Team Office           | 3.50 m   | 3.00  | 5.00  | 4.50 m | 4.50 m | 0.766 | 4.57        | OK     |
| AI Agent Lab          | 5.00 m   | 4.50  | 8.00  | 5.20 m | 4.40 m | —     | procedural  | OK     |

---

## Scale Violation Log

Record any asset that has been flagged by the validator and its resolution.

| Date       | Asset                      | Violation        | Resolution |
|------------|----------------------------|------------------|------------|
| 2026-06-08 | SM_Bld_TeamOffice_01       | Ground float (rawH=0.766, yOffset wrong) | Fixed via tripoH(3.5, 0.766) |
| 2026-06-08 | SM_Prop_Pier_01            | Ground float (rawH=0.377, yOffset=1.5 caused +0.94m hover) | Fixed via tripoH(1.5, 0.377) |
| 2026-06-08 | SM_Bld_FounderTower_01     | Too large (scale=8 → 8m) | Fixed → scale=4.5 |
| 2026-06-08 | SM_Bld_KnowledgeLibrary_01 | Too large (scale=7 → 7m) | Fixed → scale=3.5 |
| 2026-06-08 | SM_Env_PalmTree_01         | Screen occlusion (Z=11.5, camera at Z=15) | Moved to Z=-2, -10, -12 |

---

## Next Review Checkpoint

| Item                            | Owner | Target Date |
|---------------------------------|-------|-------------|
| Wire KnowledgeCitizen / ComputeCitizen GLBs to avatar_type in data.ts | Dev | TBD |
| Add SM_Prop_InfoBoard_01 to scene and validate | Art | TBD |
| Validate door heights once building interior props are added | Art | TBD |
| Re-run WorkizenScaleValidator after next asset batch | Dev | TBD |
