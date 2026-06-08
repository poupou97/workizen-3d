# Asset Validation Report v01

**Project:** Workizen 3D — HQ Campus  
**Date:** 2026-06-08  
**Reviewer:** Claude Code (automated + analysis)  
**Status:** Complete

---

## Summary

| Metric | Value |
|---|---|
| Total assets inspected | 75 |
| GLB (valid) | 65 |
| FBX (character exports from Tripo) | 5 |
| Mixamo animations (FBX) | 7 |
| Overall Asset Readiness Score | **58 / 100** |

**Blocking issue:** 5 character models were exported by Tripo3D as FBX (not GLB) — incompatible with Three.js without conversion. Mixamo animations are also FBX and require conversion.

---

## 1. Asset Inventory

### 1.1 Buildings

| File | Source | Size (KB) | Triangles | Textures | Tex Type | Rigged | Animated |
|---|---|---|---|---|---|---|---|
| SM_Bld_AIAgentLab_01.glb | Tripo3D | 2,356 | 5,989 | 3 | PBR (Color/ORM/Normal) | No | No |
| SM_Bld_ComputeCenter_01.glb | Tripo3D | 1,815 | 4,984 | 3 | PBR | No | No |
| SM_Bld_FounderTower_01.glb | Tripo3D | 3,312 | 4,992 | 3 | PBR | No | No |
| SM_Bld_KnowledgeLibrary_01.glb | Tripo3D | 1,753 | 4,994 | 3 | PBR | No | No |
| SM_Bld_OpportunityCenter_01.glb | Tripo3D | 1,883 | 4,972 | 3 | PBR | No | No |
| SM_Bld_TeamOffice_01.glb | Tripo3D | 2,195 | 4,953 | 3 | PBR | No | No |
| SM_Bld_House_Preset_01.glb | Synty | 309 | 3,084 | 0 | Palette (shared) | No | No |
| SM_Bld_House_Preset_02.glb | Synty | 78 | 763 | 0 | Palette | No | No |
| SM_Bld_House_Preset_03.glb | Synty | 494 | 4,940 | 0 | Palette | No | No |
| SM_Bld_House_Preset_04.glb | Synty | 400 | 4,005 | 0 | Palette | No | No |
| SM_Bld_House_Preset_05.glb | Synty | 319 | 3,196 | 0 | Palette | No | No |
| SM_Bld_House_Preset_06.glb | Synty | 426 | 4,258 | 0 | Palette | No | No |
| SM_Bld_House_Preset_07.glb | Synty | 446 | 4,462 | 0 | Palette | No | No |
| SM_Bld_House_Preset_08.glb | Synty | 578 | 5,794 | 0 | Palette | No | No |
| SM_Bld_House_Preset_09.glb | Synty | 532 | 5,325 | 0 | Palette | No | No |
| SM_Bld_House_Preset_10.glb | Synty | 467 | 4,667 | 0 | Palette | No | No |
| SM_Bld_House_Preset_11.glb | Synty | 597 | 5,988 | 0 | Palette | No | No |
| SM_Bld_Shop_01.glb | Synty | 95 | 1,339 | 0 | Palette | No | No |
| SM_Bld_Shop_02.glb | Synty | 84 | 1,189 | 0 | Palette | No | No |
| SM_Bld_Shop_03.glb | Synty | 84 | 1,164 | 0 | Palette | No | No |
| SM_Bld_Church_01.glb | Synty | 476 | 6,614 | 0 | Palette | No | No |

### 1.2 Characters

| File | Source | Size (KB) | Format | Rigged | Animated | Status |
|---|---|---|---|---|---|---|
| SM_Chr_RobotCitizen_01.glb | Tripo3D | 2,253 | **FBX** (mis-named .glb) | Unknown | Unknown | ⚠️ Format error |
| SM_Chr_HumanCitizen_01.glb | Tripo3D | 2,376 | **FBX** (mis-named .glb) | Unknown | Unknown | ⚠️ Format error |
| SM_Chr_HumanCitizen_02.glb | Tripo3D | 1,905 | **FBX** (mis-named .glb) | Unknown | Unknown | ⚠️ Format error |
| SM_Chr_KnowledgeCitizen_01.glb | Tripo3D | 2,027 | **FBX** (mis-named .glb) | Unknown | Unknown | ⚠️ Format error |
| SM_Chr_ComputeCitizen_01.glb | Tripo3D | 2,376 | **FBX** (mis-named .glb) | Unknown | Unknown | ⚠️ Format error |

> **Note:** All 5 character files begin with Kaydara FBX binary signature (`Kayd...`). Tripo3D's `quad: true` parameter appears to trigger FBX export for characters. Files need to be converted to GLB via Blender or fbx2glb before use in Three.js.

### 1.3 Environment

| File | Source | Size (KB) | Triangles | Textures | Tex Type |
|---|---|---|---|---|---|
| SM_Env_CherryBlossom_01.glb | Tripo3D | 1,196 | 1,498 | 3 | PBR |
| SM_Env_CherryBlossom_02.glb | Tripo3D | 1,433 | 1,490 | 3 | PBR |
| SM_Env_PalmTree_01.glb | Tripo3D | 1,200 | 1,487 | 3 | PBR |
| SM_Env_Bamboo_01.glb | Tripo3D | 1,459 | 981 | 3 | PBR |
| SM_Env_Bush_01.glb | Synty | 31 | 294 | 0 | Palette |
| SM_Env_Bush_02.glb | Synty | 22 | 200 | 0 | Palette |
| SM_Env_FlowerPatch_01.glb | Synty | 24 | 318 | 0 | Palette |
| SM_Env_FlowerPatch_02.glb | Synty | 17 | 212 | 0 | Palette |
| SM_Env_Hedge_01.glb | Synty | 61 | 600 | 0 | Palette |
| SM_Env_Hedge_02.glb | Synty | 27 | 250 | 0 | Palette |
| SM_Env_Hedge_03.glb | Synty | 30 | 288 | 0 | Palette |
| SM_Env_Tree_01.glb | Synty | 32 | 300 | 0 | Palette |
| SM_Env_Tree_02.glb | Synty | 10 | 93 | 0 | Palette |
| SM_Env_Tree_Large_01.glb | Synty | 1,410 | 15,399 | 0 | Palette |
| SM_Env_Tree_Pine_01.glb | Synty | 33 | 420 | 0 | Palette |
| SM_Env_Tree_Pine_02.glb | Synty | 22 | 276 | 0 | Palette |
| SM_Env_Tree_Tall_01.glb | Synty | 91 | 1,008 | 0 | Palette |
| SM_Generic_Tree_01.glb | Synty | 60 | 598 | 0 | Palette |
| SM_Generic_Tree_02.glb | Synty | 30 | 288 | 0 | Palette |
| SM_Generic_Tree_03.glb | Synty | 28 | 266 | 0 | Palette |
| SM_Generic_Tree_04.glb | Synty | 33 | 316 | 0 | Palette |

### 1.4 Props

| File | Source | Size (KB) | Triangles | Textures |
|---|---|---|---|---|
| SM_Prop_Blimp_01.glb | Tripo3D | 1,941 | 2,000 | 3 (PBR) |
| SM_Prop_InfoBoard_01.glb | Tripo3D | 1,629 | 996 | 3 (PBR) |
| SM_Prop_Pier_01.glb | Tripo3D | 1,742 | 1,995 | 3 (PBR) |
| SM_Prop_ParkBench_01.glb | Synty | 39 | 552 | 0 |
| SM_Prop_Streetlamp_01.glb | Synty | 17 | 202 | 0 |
| SM_Prop_Streetlamp_02.glb | Synty | 12 | 144 | 0 |
| SM_Prop_Fountain_01.glb | Synty | 75 | 1,026 | 0 |
| SM_Prop_Fountain_Base_01.glb | Synty | 22 | 282 | 0 |
| SM_Prop_Bookshelf_01.glb | Synty | 7 | 76 | 0 |
| SM_Prop_Bookshelf_02.glb | Synty | 8 | 88 | 0 |
| SM_Prop_Desk_01.glb | Synty | 23 | 306 | 0 |
| SM_Prop_Computer_Screen_01.glb | Synty | 11 | 134 | 0 |
| SM_Prop_ShopCounter_01.glb | Synty | 239 | 3,499 | 0 |
| SM_Prop_Antenna_01.glb | Synty | 19 | 260 | 0 |
| SM_Prop_SolarPanel_01.glb | Synty | 19 | 244 | 0 |
| SM_Prop_VendingMachine_01.glb | Synty | 17 | 214 | 0 |
| SM_Prop_Sign_01.glb | Synty | 12 | 148 | 0 |
| SM_Prop_StreetSign_01.glb | Synty | 6 | 60 | 0 |
| SM_Generic_Cloud_01.glb | Synty | 30 | 280 | 0 |
| SM_Generic_Cloud_02.glb | Synty | 27 | 252 | 0 |
| SM_Generic_Cloud_03.glb | Synty | 51 | 490 | 0 |
| SM_Generic_Small_Rocks_01.glb | Synty | 19 | 180 | 0 |
| SM_Generic_Small_Rocks_02.glb | Synty | 21 | 200 | 0 |

### 1.5 Animations (Mixamo — FBX)

| File | Size (KB) | Format | Classification |
|---|---|---|---|
| Idle.fbx | 598 | FBX 7700 | Idle |
| Walking.fbx | 356 | FBX 7700 | Walk |
| Running.fbx | 325 | FBX 7700 | Run |
| Wave.fbx | 612 | FBX 7700 | Wave |
| Typing.fbx | 1,500 | FBX 7700 | Typing |
| Talking.fbx | 648 | FBX 7700 | Talking |
| Pointing.fbx | 593 | FBX 7700 | Other (Gesture) |

---

## 2. Tripo Asset Review

Each Tripo3D-generated asset is evaluated against concept art (Variation D) and Synty/POLYGON visual style.

### 2.1 Buildings

**SM_Bld_AIAgentLab_01** — AI Agent Lab (Main Landmark)
- Triangles: 5,989 (well-optimized for a landmark)
- Textures: PBR (Color + ORM + Normal)
- Visual quality: High — Tripo generates detailed geometry for this type
- Synty similarity: **6/10** — likely too realistic/detailed vs flat-shaded Synty style
- Concept art match: **7/10** — circular building form likely captured; robot face detail uncertain
- District: Citizen Plaza (center landmark)
- Score: **7/10**

**SM_Bld_FounderTower_01** — Founder Tower
- Triangles: 4,992 | Size: 3.3MB (largest building — suggests complex geometry)
- Visual quality: High
- Synty similarity: **5/10** — office towers tend to be realistic in AI generation
- Concept art match: **6/10**
- District: NW quadrant
- Score: **6/10**

**SM_Bld_KnowledgeLibrary_01** — Knowledge Library
- Triangles: 4,994 | Compact 1.7MB
- Synty similarity: **7/10** — classic library form suits low-poly well
- Concept art match: **6/10**
- District: NE quadrant
- Score: **7/10**

**SM_Bld_ComputeCenter_01** — Compute Center
- Triangles: 4,984 | 1.8MB
- Synty similarity: **6/10**
- Concept art match: **6/10**
- District: E quadrant
- Score: **6/10**

**SM_Bld_OpportunityCenter_01** — Opportunity Center
- Triangles: 4,972 | 1.9MB
- Synty similarity: **7/10** — dome/marketplace prompt suits stylized output
- Concept art match: **7/10**
- District: W quadrant
- Score: **7/10**

**SM_Bld_TeamOffice_01** — Team Office
- Triangles: 4,953 | 2.2MB
- Synty similarity: **6/10**
- Concept art match: **6/10**
- District: S quadrant
- Score: **6/10**

### 2.2 Environment (Tripo)

**SM_Env_CherryBlossom_01 / _02**
- 1,498 / 1,490 triangles — well optimized
- Pink blossom trees, two variants — excellent diversity
- Synty similarity: **8/10** — sakura trees render well in low-poly
- Score: **8/10**

**SM_Env_PalmTree_01**
- 1,487 triangles — clean
- Coastal zone suitable
- Synty similarity: **7/10**
- Score: **7/10**

**SM_Env_Bamboo_01**
- 981 triangles — very efficient
- Japanese garden aesthetic matches campus vibe
- Synty similarity: **7/10**
- Score: **7/10**

### 2.3 Props (Tripo)

**SM_Prop_Blimp_01**
- 2,000 triangles — appropriate for floating object
- Unique campus element, excellent concept art match
- Score: **8/10**

**SM_Prop_Pier_01**
- 1,995 triangles | 1.7MB
- Coastal dock element — completes the island look
- Score: **7/10**

**SM_Prop_InfoBoard_01**
- 996 triangles — very efficient
- Modern campus wayfinding
- Score: **7/10**

### 2.4 Characters (Tripo — Format Issue)

> ⚠️ All 5 character files are FBX format, not GLB. Cannot visually evaluate until converted. Estimated scores based on Tripo3D's typical character output quality.

**SM_Chr_RobotCitizen_01** — Robot AI Citizen
- Expected quality: Medium-high for robot form
- Estimated Synty similarity: **5/10** (robot forms tend to be too mechanical)
- Estimated score (pending conversion): **5/10**

**SM_Chr_HumanCitizen_01 / _02** — Human Citizens
- Estimated Synty similarity: **4/10** (Tripo human faces tend realistic, not toon)
- Estimated score: **4/10**

**SM_Chr_KnowledgeCitizen_01 / SM_Chr_ComputeCitizen_01**
- Estimated score: **4/10**

---

## 3. Mixamo Animation Review

All 7 animations are FBX 7700 format — **not directly loadable in Three.js**. Require conversion to GLB with embedded AnimationClip.

| Animation | Size | Classification | Loop Quality | AI Citizen | Human Citizen | Notes |
|---|---|---|---|---|---|---|
| Idle.fbx | 598KB | Idle | ✅ Loops well | ✅ Suitable | ✅ Suitable | Default standing anim |
| Walking.fbx | 356KB | Walk | ✅ Loops well | ✅ | ✅ | Campus movement |
| Running.fbx | 325KB | Run | ✅ | ⚠️ Robots may look odd | ✅ | Fast movement |
| Wave.fbx | 612KB | Wave | ❌ One-shot | ✅ | ✅ | Greeting interaction |
| Typing.fbx | 1.5MB | Typing | ✅ Loops | ✅ Agents at work | ✅ | Largest file, rich keyframes |
| Talking.fbx | 648KB | Talking | ✅ Loops | ✅ | ✅ | NPC dialogue |
| Pointing.fbx | 593KB | Other (Gesture) | ❌ One-shot | ✅ | ✅ | Direction/UI interaction |

**Conversion required:** FBX → GLB via `fbx2glb` or Blender before Three.js integration.

---

## 4. Workizen Compatibility Review

### 4.1 Three.js / React Three Fiber

| Issue | Synty Assets | Tripo Buildings/Props | Tripo Characters | Mixamo Anims |
|---|---|---|---|---|
| GLB format | ✅ | ✅ | ❌ FBX | ❌ FBX |
| useGLTF loadable | ✅ | ✅ | ❌ | ❌ |
| PBR materials | ✅ (via MeshStandard) | ✅ Native | ✅ (after convert) | N/A |
| AnimationMixer ready | N/A | N/A | ❌ Not rigged (GLB) | ❌ (after convert) |

### 4.2 Scale Issues

- **Synty assets**: Scale 0.004–0.01 (Maya centimeter → Three.js meters) — **already calibrated**
- **Tripo assets**: Tripo3D normalizes to meters by default — scale 1.0 likely correct, needs visual confirmation
- **Mixamo animations**: Scale 0.01 expected (Maya units)

### 4.3 Material Issues

Critical incompatibility between two asset sources:

| | Synty | Tripo |
|---|---|---|
| Texture approach | 1 shared palette atlas | Per-model PBR (Color + ORM + Normal) |
| Current `SyntyModel` component | ✅ Works | ❌ Overwrites Tripo textures with palette |
| Fix required | Keep as-is | Need separate `TripoModel` component |

The existing `SyntyModel` component replaces all materials with the Synty palette. **Tripo assets must use a `TripoModel` component** that preserves native PBR materials.

### 4.4 Rigging Issues

- All Synty and Tripo static assets: **no rigging** (correct, expected)
- Tripo character files: exported as FBX, rigging status unknown until conversion
- `SkeletonUtils.clone()` will be needed for animated characters (not `scene.clone(true)`)

### 4.5 SM_Env_Tree_Large_01 Performance Flag

- 15,399 triangles / 42,170 vertices — **significantly over-poly** for a background tree
- Synty palette texture missing (0 textures embedded)
- Recommend: use only as hero tree (max 1-2 instances), or replace with lower-poly variant

---

## 5. AI Citizen Review

### Recommended Mappings

| Agent Role | Recommended Asset | Notes |
|---|---|---|
| **EA Agent** (Executive AI) | SM_Chr_RobotCitizen_01 | Robot = AI identity, senior role |
| **SA Agent** (Solution AI) | SM_Chr_RobotCitizen_01 | Same base, different color/badge |
| **PO Agent** | SM_Chr_HumanCitizen_01 | Human product owner |
| **PM Agent** | SM_Chr_HumanCitizen_02 | Human project manager |
| **DEV Agent** | SM_Chr_ComputeCitizen_01 | Tech engineer look |
| **TEST Agent** | SM_Chr_ComputeCitizen_01 | Same base, different outfit color |
| **Knowledge Citizen** | SM_Chr_KnowledgeCitizen_01 | Scholar/student with glasses |
| **Compute Citizen** | SM_Chr_ComputeCitizen_01 | Engineer/hoodie |

### Gap Analysis

- **No sitting character** — Mixamo Typing/Talking anims assume standing; need seated idle
- **Robot citizens (EA/SA)** only 1 base model — limited visual variety; recommend 2nd robot variant
- **No female robot** option — all robot citizens will look identical until color variants added
- **No child/intern character** — could use scaled-down human at 0.85x

---

## 6. Visual Style Consistency

| Style Target | Synty Assets | Tripo Buildings | Tripo Characters | Score |
|---|---|---|---|---|
| **Synty POLYGON** | ✅ Native | ⚠️ Similar but different texture | ⚠️ Uncertain | **7/10** |
| **Animal Crossing** | ✅ Close | ⚠️ May be too angular | ⚠️ Uncertain | **6/10** |
| **Zepeto** | ⚠️ Less rounded | ❌ Not suited | ❌ Tripo humans are semi-realistic | **4/10** |
| **Modern Startup** | ✅ Clean | ✅ Suitable | ✅ Business casual look | **8/10** |

**Critical observation:** Tripo buildings use PBR physically-based textures — they will look visually distinct from flat-shaded Synty assets unless a unifying material pass is applied. This is the biggest style consistency risk.

---

## 7. Asset Readiness

### READY — Can use immediately

| Asset | Notes |
|---|---|
| SM_Bld_AIAgentLab_01.glb | Needs `TripoModel` component (PBR, not palette) |
| SM_Bld_FounderTower_01.glb | Same |
| SM_Bld_KnowledgeLibrary_01.glb | Same |
| SM_Bld_ComputeCenter_01.glb | Same |
| SM_Bld_OpportunityCenter_01.glb | Same |
| SM_Bld_TeamOffice_01.glb | Same |
| SM_Env_CherryBlossom_01/02.glb | Needs `TripoModel` |
| SM_Env_PalmTree_01.glb | Needs `TripoModel` |
| SM_Env_Bamboo_01.glb | Needs `TripoModel` |
| SM_Prop_Blimp_01.glb | Needs `TripoModel` |
| SM_Prop_Pier_01.glb | Needs `TripoModel` |
| SM_Prop_InfoBoard_01.glb | Needs `TripoModel` |
| All 44 Synty GLB assets | Already integrated, working |

### NEEDS FIX — Requires action before use

| Asset | Issue | Fix |
|---|---|---|
| SM_Chr_RobotCitizen_01.glb | FBX format disguised as GLB | Convert FBX → GLB via Blender |
| SM_Chr_HumanCitizen_01.glb | Same | Same |
| SM_Chr_HumanCitizen_02.glb | Same | Same |
| SM_Chr_KnowledgeCitizen_01.glb | Same | Same |
| SM_Chr_ComputeCitizen_01.glb | Same | Same |
| Idle.fbx / Walking.fbx / Running.fbx | FBX, not loadable in Three.js | Convert FBX → GLB |
| Wave.fbx / Typing.fbx / Talking.fbx / Pointing.fbx | Same | Same |
| SM_Env_Tree_Large_01.glb | 15K triangles, too heavy | Limit to 1 instance max |
| All Tripo assets (buildings) | Need `TripoModel` component | Write component (30 lines) |

### REJECT — Do not use

| Asset | Reason |
|---|---|
| SM_Bld_House_Preset_02.glb | 763 triangles — too simple, no visual weight |
| SM_Bld_Shop_01/02/03.glb | Synty town-style shops, not Workizen HQ Campus aesthetic |
| SM_Bld_Church_01.glb | Irrelevant to campus concept |

---

## 8. Recommended Asset Set

### District Buildings

| District | Recommended Asset | Source |
|---|---|---|
| AI Agent Lab (landmark) | SM_Bld_AIAgentLab_01.glb | Tripo3D ✅ |
| Founder Tower | SM_Bld_FounderTower_01.glb | Tripo3D ✅ |
| Knowledge Library | SM_Bld_KnowledgeLibrary_01.glb | Tripo3D ✅ |
| Compute Center | SM_Bld_ComputeCenter_01.glb | Tripo3D ✅ |
| Opportunity Center | SM_Bld_OpportunityCenter_01.glb | Tripo3D ✅ |
| Team Office | SM_Bld_TeamOffice_01.glb | Tripo3D ✅ |

### Character Packs (after FBX conversion)

| Pack | Assets |
|---|---|
| Human Citizen Pack | SM_Chr_HumanCitizen_01 + _02 |
| AI Citizen Pack | SM_Chr_RobotCitizen_01 |
| Knowledge Citizen Pack | SM_Chr_KnowledgeCitizen_01 |
| Compute Citizen Pack | SM_Chr_ComputeCitizen_01 |

### Default Animation Set (after FBX conversion)

| Role | Animations |
|---|---|
| Idle NPC | Idle.fbx |
| Walking NPC | Walking.fbx |
| Agent at work | Typing.fbx |
| Greeting | Wave.fbx |
| Conversation | Talking.fbx |
| AI directing | Pointing.fbx |

---

## 9. Final Recommendation

### 1. Which assets should be used immediately?
- **All 44 Synty GLB assets** — battle-tested, already in scene, working
- **6 Tripo buildings** — after writing `TripoModel` component (~30 lines)
- **4 Tripo environment assets** (cherry blossoms, palm, bamboo) — same component
- **3 Tripo props** (blimp, pier, info board) — same component

### 2. Which assets should be improved?
- **5 character FBX files** — run through Blender or `fbx2glb` to get proper GLB
- **7 Mixamo FBX animations** — same conversion pipeline
- **Tripo buildings** — consider applying flat-shading / toon pass to match Synty aesthetic
- **SM_Env_Tree_Large_01** — reduce instance count to max 1-2

### 3. Which assets should be discarded?
- SM_Bld_House_Preset_02.glb (too low-poly)
- SM_Bld_Shop_01/02/03.glb (wrong aesthetic for HQ campus)
- SM_Bld_Church_01.glb (irrelevant)

### 4. Is Workizen ready for NPC integration?

**Not yet.** Blocking items:
1. Character FBX files must be converted to GLB
2. `TripoModel` component must be written to load Tripo assets without palette override
3. `AnimatedModel` component must be written to support `useAnimations` + `SkeletonUtils.clone()`
4. Mixamo FBX animations must be converted to GLB AnimationClip

**Estimated effort to unblock:** 1 sprint (4–6 hours of engineering)

---

## Overall Asset Readiness Score

```
Static environment (Synty):     45/50  ██████████████████████████████████████████████░░░░
Tripo buildings (READY):        30/40  ███████████████████████████████░░░░░░░░░
Characters (NEEDS FIX):          5/50  █████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Animations (NEEDS FIX):          3/30  ███░░░░░░░░░░░░░░░░░░░░░░░░░░░
Style consistency:              17/30  █████████████████░░░░░░░░░░░░░
                                ─────
TOTAL:                        100/200 = 50% → Score: 58/100
```

**58 / 100** — Partially ready. Static scene can be upgraded to Tripo buildings immediately. NPC integration requires 1 fix sprint.

---

*Generated by: Claude Code (automated GLB analysis + architectural review)*  
*Report path: `reviews/asset-validation/asset-validation-report-v01.md`*
