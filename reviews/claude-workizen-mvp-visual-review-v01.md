# Claude Workizen MVP Visual Review v01

**Reviewer:** Claude Code (claude-sonnet-4-6)
**Date:** 2026-06-07
**App reviewed:** `apps/workizen-3d` (Codex MVP v01)
**Concept art reviewed:** `images/concepts/` (7 district images + 2 hq-campus overviews)
**Status:** Founder Dissatisfaction — Visual Gap Confirmed

---

# 1. Executive Summary

## What the current MVP achieves

The Codex MVP v01 (`apps/workizen-3d`) is a working technical foundation. It opens into a 3D campus scene in the browser, shows all seven approved districts, supports click-to-open panels for districts, NPCs, citizens, and opportunities, and runs a Founder Demo Mode with a guided product vision flow. Desktop, tablet, and mobile smoke checks pass. The data layer and interaction architecture are clean and ready for upgrade.

## Why the Founder is not satisfied

The MVP is still a **technical prototype**, not a Digital Citizen City. Everything you see in the running app — every building, tree, citizen, robot, bench, and lamp — is hand-coded geometric primitives (boxes, cones, spheres). The world is sparse, static, and visually disconnected from the approved concept art.

The concept art shows a **living city**: ~30+ citizens walking around, ~8 distinct robot types with personality, ~40+ trees bordering a rich campus, circular glass buildings with large Workizen signage, outdoor café seating, project boards, fountains, information kiosks, and a coastal/island setting surrounded by water. The MVP shows a flat green plane with 7 box-and-cone buildings, 6 citizen blobs, 10 generic cone trees, and 4 benches.

The emotional gap is enormous. The concept art makes you want to live there. The current MVP communicates nothing about Animal Crossing, Zepeto, or a vibrant startup ecosystem.

## What must change

Three things must change before the Founder sees the world they approved:

1. **Visual density**: multiply citizens ×5, trees ×4, props ×6 minimum
2. **Citizen quality**: AI/robot citizens must look like distinct robots with character — not green capsules with a badge
3. **Building quality**: buildings must read as named civic landmarks with clear Workizen identity — not unlabeled box+cone primitives with a floating text label

---

# 2. Context Recovered

## Workizen vision

**Workizen = Digital Citizen City + Opportunity Marketplace**

Workizen is the visual operating environment of WorkforceOS. It makes work, learning, AI agents, knowledge, and compute visible in a friendly 3D campus. It is not an NFT world, not a crypto metaverse, and not a virtual land platform. It is civic, optimistic, and practical.

## HQ Campus concept

Default world: **Workizen HQ Campus**
Default spawn: **Citizen Plaza** (center)
Main landmark: **AI Agent Lab** (north)

Seven districts arranged around Citizen Plaza in a radial layout, each with distinct color identity, district props, NPCs, citizens, and signage. The campus style target is 70% Animal Crossing, 20% Zepeto, 10% modern startup ecosystem.

## Digital Citizen types

| Type | Examples | Visual identity |
|---|---|---|
| Human Citizen | Founder, Developer, Consultant | Warm colors, chibi proportions |
| AI Citizen | EA Agent, SA Agent, PM Agent, DEV Agent, TEST Agent | Green/teal glow, robot face |
| Knowledge Citizen | AWS Expert, TOGAF Expert, Banking Expert | Gold accents, book/tablet |
| Compute Citizen | MacBook M1, GPU Server, EC2 Node | Cyan/device form factor |

## Opportunity Marketplace purpose

Workizen's product identity is **not just a 3D campus**. The Opportunity Center, opportunity markers, and recommended team path are the visible business logic. Citizens arrive at Citizen Plaza, discover open work at Opportunity Center, and form teams at Team Office. This flow must be visually readable from the first camera view.

## Current MVP status

The MVP is **visually incomplete**. Every asset is a generated placeholder. No Synty FBX asset is loaded at runtime. The purchased Synty Polygon Town pack (695 FBX files, 9 character models) is present under `assets/synty/polygon-town/Source_Files/FBX` but untouched by the app. Citizen and building counts are minimal. The result resembles a CAD wire-frame model demonstration more than a living city.

---

# 3. Concept Art vs Current MVP Gap

## Concept art summary (from approved images)

The main HQ Campus overview (`images/concepts/hq-campus/`) shows:

- The campus **sits on an island** with ocean/sea visible at the edges
- A **lighthouse** in the far background
- **30+ visible citizens** spread across the campus, actively socializing
- **8+ distinct robot/AI citizen models** with expressive faces and poses
- **40+ trees** of varying types bordering all district perimeters
- Buildings with **rounded glass facades**, multi-floor glazing, large "WORKIZEN" branded signage panels
- A **large central fountain** in Citizen Plaza with a glowing "W" logo orb
- **Flower patches, garden hedges, bushes** throughout every path
- **Outdoor café seating** with umbrellas near Opportunity Center
- **Information kiosks and public boards** at every district entrance
- **Street lamps** every 5–6 meters along all paths
- **Park benches** not just in the plaza but also near every building
- Distinct water features — a **pond near Founder Tower**
- Color-coded **roof markings and building panels** per district

Individual district concept images (`images/concepts/*/`) further reveal:

- **AI Agent Lab**: circular/dome building, giant robot face embedded in the facade, holographic display portal, 8–10 robot citizens each with a named label (EA Agent, SA Agent, PM Agent, DEV Agent, TEST Agent), surrounding plaza with benches, flowers, and lamps
- **Citizen Plaza**: 20+ citizens visible simultaneously, Workizen Guide with speech bubbles, Community Board, multiple info signs, activity boards ("Today's Activities")
- **Founder Tower**: rounded multi-floor glass tower, rooftop garden terrace, pond/water feature immediately adjacent, 8+ citizens including robot types nearby
- **Opportunity Center**: large semicircular building with "WORKIZEN OPPORTUNITY CENTER" header panel, Team Match Zone to the left with outdoor seating, Project Board to the right, illuminated central holographic station
- **Knowledge Library**: circular building, warm interior glow, 8+ citizen figures including robots, outdoor umbrella seating, bookshelves visible through glazing
- **Compute Center**: wind turbines on roof, solar panels, server status board, 8+ robot citizens, central holographic cube, Green Compute info board
- **Team Office**: multiple labelled rooms (Meeting Room, Focus Room, Collab Space, Idea Lab, Team Lounge), outdoor team tables, project dashboard board, 8+ citizens active

## Current MVP actual counts (from source code)

| Element | Concept art (approx.) | MVP actual | Gap |
|---|---|---|---|
| Total citizens visible | 30+ | 6 | -24 |
| AI/robot citizen forms | 8–10 distinct robots | 1 (capsule + sphere + badge) | -7 distinct forms |
| Trees | 40+ | 10 | -30 |
| Benches | 20+ | 4 (plaza only) | -16 |
| Street lamps | 20+ | 4 (plaza only) | -16 |
| Flower patches / gardens | 30+ | 8 | -22 |
| District prop groups | 6+ per district | 1–2 per district | -4 per district |
| Information boards/signs | 15+ campus-wide | 3 sign posts | -12 |
| Building facade richness | Rounded glass, multi-floor, branded | Box + cone primitive | Fundamental |
| Water features | Pond + ocean edge | None | Missing entirely |
| Outdoor seating (non-plaza) | 5–6 groups | 0 | Missing |
| Workizen logo on buildings | Yes (large "W" panels) | No | Missing |
| Named robot roster visible | 5+ labeled roles | 0 | Missing |

## Camera composition gap

The concept art uses a **fixed isometric overview** showing at minimum Citizen Plaza + AI Agent Lab + Founder Tower + Knowledge Library + Opportunity Center simultaneously. The current MVP camera starts at the correct position `[10, 9.5, 15]` targeting `[0, 0, -3.2]`, but because the campus is sparse, the first view reveals mostly empty green plane between the scattered buildings. In the concept art, the same camera angle reveals a dense living city with no visible empty ground — every gap is filled with paths, flowers, benches, lamps, trees, or citizens.

---

# 4. Founder Dissatisfaction Analysis

The Founder is correct. The MVP does not resemble the approved concept art. The root causes are:

**Too sparse.** The campus green plane is mostly empty. Between the 7 districts, there is grass with a few paths and 10 trees. In the concept art, every path border, district perimeter, and open area is filled with vegetation, props, or citizens. The world needs at least 4× the current density before it stops feeling like a CAD model.

**Too primitive.** Buildings are three-geometry stacks: a box body, a cone roof, a box door. Every district has the same visual vocabulary. The concept art shows buildings with distinct silhouettes — rounded domes, glass curtain walls, multi-floor volumes with unique rooflines, prominent signage panels. The buildings in the concept art are immediately recognizable; in the MVP, only the floating text label distinguishes one district from another.

**Too few citizens.** 6 citizens on a campus that is supposed to feel like Animal Crossing is the most immediately visible problem. The concept art shows at minimum 20 citizens in Citizen Plaza alone. Citizens are the soul of the city; without them the world is a ghost town.

**Too few AI/robot citizens.** The MVP has one "AI Citizen" — a green capsule with a small accent stripe. The concept art shows 8–10 distinct chibi robot models with named roles (EA Agent, SA Agent, PM Agent, DEV Agent, TEST Agent), facial expressions, and color-coded bodies. This is the most important visual difference because robots = AI-native identity. Without visible robot citizens, Workizen looks like any generic 3D city demo.

**Not enough Animal Crossing / Zepeto feeling.** Animal Crossing achieves warmth through density of detail: flowers everywhere, lamps along every path, benches that look used, trees in clusters not isolation. The current campus has the right color palette but the wrong density. Zepeto achieves friendliness through expressive chibi characters doing things. The current avatars are static capsule-blobs with no poses and no personality.

**Not close enough to the GPT concept art.** The core shapes diverge fundamentally: the concept art uses curved, rounded, circular buildings; the MVP uses box primitives. The concept art includes water (ocean edge, ponds); the MVP is a flat plane. The concept art has the campus on an island with a lighthouse in the distance; the MVP has an infinite green ground plane with fog at the edges. These are not tuning differences — they are structural design differences.

---

# 5. Required Visual Density Spec

The following minimum counts define the visual threshold at which the world starts to feel alive. These are minimums, not targets.

| Element | Current | Minimum next version |
|---|---|---|
| Total visible citizens | 6 | 30 |
| Human citizens | 3 | 15 |
| AI / robot citizens | 1 form | 8 distinct robot models |
| Knowledge citizens | 1 | 4 |
| Compute citizens | 2 (device boxes) | 3 |
| Trees (campus-wide) | 10 | 40 |
| Benches (campus-wide) | 4 | 20 |
| Street lamps (campus-wide) | 4 | 20 |
| Flower / bush patches | 8 | 35 |
| Outdoor seating groups (non-plaza) | 0 | 6 (one per non-plaza district) |
| Information boards / signs | 3 | 16 (2+ per district) |
| District props per district | 1–2 | 5–8 |
| Opportunity markers visible | 3 | 5 |
| Fountain / water features | 1 (plaza fountain stub) | 3 (plaza + founder-tower pond + campus edge water) |
| Named landmark signage on buildings | 0 | 7 (one large branded panel per district) |

---

# 6. District-by-District Improvement Plan

## AI Agent Lab

**Current weakness:** A blue-green box with a cone roof, a floating sphere on top, one antenna, one solar panel. The only AI-specific visual is a small "AI" sign plate. There is one AI Citizen (green capsule) near it and one NPC. Nothing about this reads as the defining landmark of an AI-native city.

**Desired visual goal:** The dominant visual anchor of the entire campus. Should be instantly recognizable from any camera position. A large circular or dome-shaped building with a giant robot/AI face embedded in the facade, blue-green glow panels, holographic "AI AGENT LAB" signage, and 8–10 distinctly shaped robot citizens clustered around it with named role labels.

**Synty asset usage:**
- `SM_Bld_Shop_Concrete_01.fbx` as base structure (kitbashed into circular form)
- `SM_Bld_Skylight*.fbx` for roof transparency suggestion
- `SM_Prop_Antenna_01.fbx` × 3 (rooftop cluster)
- `SM_Prop_Computer_Screen_01.fbx` × 4 (exterior facing screens)
- `SM_Prop_SolarPanel_01.fbx` × 2
- `SM_Prop_Streetlamp_01.fbx` × 6 (surrounding plaza)
- `SM_Env_FlowerPatch_01.fbx` × 8
- `SM_Prop_Fountain_01.fbx` (central holographic display substitute)

**Custom work needed:**
- Giant robot face/head embedded in facade (Three.js custom geometry or billboard texture)
- "AI AGENT LAB" large branded sign panel with glow
- 8 distinct robot citizen models with role labels (EA, SA, PO, PM, DEV, TEST agents)
- Holographic portal effect at entrance

**Priority:** CRITICAL — this is the main visual identity of Workizen

---

## Founder Tower

**Current weakness:** A three-floor stacked box tower with a cone roof and "HQ" sign plate. It reads as a generic tall building, not a flagship headquarters. No rooftop features, no glass curtain wall suggestion, no pond or water feature nearby.

**Desired visual goal:** A rounded multi-floor glass tower with a rooftop garden terrace, a "WORKIZEN" branded panel visible from the campus camera, and a small pond immediately adjacent. Should be the second-tallest and second-most-prominent building.

**Synty asset usage:**
- `SM_Bld_House_ExteriorWall_UpperFloor_Window_01.fbx` × multiple (stacked floors)
- `SM_Bld_House_Deck_01.fbx` + `SM_Bld_House_Deck_Roof_01.fbx` (rooftop terrace)
- `SM_Prop_Fountain_Base_01.fbx` (adjacent pond)
- `SM_Env_Tree_01.fbx` × 6 (rooftop garden suggestion)
- `SM_Prop_Streetlamp_02.fbx` × 4
- `SM_Env_FlowerPatch_02.fbx` × 6
- `SM_Prop_ParkBench*` × 4

**Custom work needed:**
- "WORKIZEN" branded billboard panel with "W" logo
- Rooftop strategy deck suggestion (billboard mesh)
- Blue-tinted glass curtain wall material
- Adjacent water/pond tile (plane geometry with blue material and soft normal)

**Priority:** HIGH

---

## Citizen Plaza

**Current weakness:** A flat warm-stone disc with a fountain stub and 4 benches. The 4 lamps are present. 2 citizens and 1 NPC are visible. The sense of gathering is absent. The Community Board and Today's Activities board from the concept art are missing.

**Desired visual goal:** The busiest, warmest spot on campus. The Workizen "W" fountain glows. 15+ citizens are gathered here in loose groups. Multiple information boards are visible. Flowers border every pathway entry. This is the first thing the Founder sees on spawn.

**Synty asset usage:**
- `SM_Prop_Fountain_01.fbx` (replace current cylinder stub)
- `SM_Prop_ParkBench*` × 8 (scatter beyond current 4)
- `SM_Prop_Streetlamp_01.fbx` × 8 (extend beyond 4)
- `SM_Env_FlowerPatch_01.fbx` / `SM_Env_FlowerPatch_02.fbx` × 12
- `SM_Prop_StreetSign_01.fbx` × 6 (wayfinding to each district)
- `SM_Env_Garden_Straight_01.fbx` × 8 (plaza border hedges)

**Custom work needed:**
- "CITIZEN PLAZA — Meet · Share · Grow Together" large overhead sign (billboard)
- Community Board (flat panel with mock schedule text)
- "WELCOME — All Citizens, One Purpose" welcome kiosk
- 15+ chibi human citizens in varied colors placed in clusters

**Priority:** HIGH — first thing visible on spawn

---

## Knowledge Library

**Current weakness:** A warm-yellow box building with two book stacks outside and a "LIB" sign plate. Reads as a generic house with books. No warmth, no learning atmosphere, no distinct silhouette.

**Desired visual goal:** A circular warm-lit building with a large "WORKIZEN KNOWLEDGE LIBRARY" entry sign, visible bookshelves through glazing, outdoor umbrella seating for 2–3 citizens, and 4+ citizen figures including robots.

**Synty asset usage:**
- `SM_Bld_House_Preset_*.fbx` as base (largest available)
- `SM_Prop_Bookshelf*` × 4 (exterior visible suggestion)
- `SM_Prop_Book_Group*` × 4
- `SM_Prop_Desk*` × 2
- `SM_Env_Plant*` × 6 (potted plants at entrance)
- `SM_Prop_LampStanding_01.fbx` × 4
- `SM_Env_FlowerPatch_03.fbx` × 6
- `SM_Prop_Streetlamp_02.fbx` × 4

**Custom work needed:**
- "WORKIZEN KNOWLEDGE LIBRARY" large branded sign panel
- Knowledge domain expertise boards (AWS, TOGAF, AI, Banking labels)
- Outdoor umbrella + seating geometry (simple cylinder umbrella + bench)
- 4–6 citizen figures including 1–2 knowledge robot types
- Gold-lit warm interior plane visible through façade

**Priority:** MEDIUM

---

## Opportunity Center

**Current weakness:** A pink-accented box building with a market board, a small stall, and a "OPEN WORK" sign plate. The marketplace identity is weak. This is supposed to be the core business district but it is visually smaller and less prominent than the concept art shows.

**Desired visual goal:** A semicircular building with a large illuminated "WORKIZEN OPPORTUNITY CENTER" header panel, a Team Match Zone with outdoor tables to one side, a Project Board (kanban-style) to the other, a central holographic opportunity station. Opportunity markers should be clearly visible from the Citizen Plaza starting camera.

**Synty asset usage:**
- `SM_Bld_Shop_Concrete_01.fbx` + `SM_Bld_Shop_*.fbx` (building base)
- `SM_Prop_ShopShelf*` × 3
- `SM_Prop_Kitchen_Counter*` × 2 (team match counters)
- `SM_Prop_StreetSign_01.fbx` × 4
- `SM_Prop_Streetlamp_01.fbx` × 6
- `SM_Env_FlowerPatch_01.fbx` × 8
- `SM_Prop_ParkBench*` × 4 (outdoor team match seating)
- `SM_Prop_Fountain_Base_01.fbx` (central plaza feature)

**Custom work needed:**
- "WORKIZEN OPPORTUNITY CENTER" large illuminated header panel
- "FEATURED OPPORTUNITIES" board with 3 mock listing cards
- "PROJECT BOARD" kanban panel (columns: Opportunities / People / Partnerships / Purpose)
- "TEAM MATCH ZONE" outdoor seating area
- 4–6 citizen figures including 1–2 AI robot types
- Featured opportunity marker (larger/brighter octahedron)

**Priority:** HIGH — core product identity

---

## Compute Center

**Current weakness:** A cyan-tinted box building with a server stack, antenna, solar panel, and "COMPUTE" sign plate. The two Compute Citizens are device boxes (which is a fair placeholder concept). The tech identity is present but minimal.

**Desired visual goal:** A rounded building with wind turbines on the roof, multiple solar panel rows, a System Status board, a Green Compute info board, a central holographic cube, and 6+ robot citizens with distinct compute/device forms.

**Synty asset usage:**
- `SM_Bld_Shop_Concrete_01.fbx` as base
- `SM_Prop_Antenna_01.fbx` × 4 (rooftop cluster + wind turbine stand-ins)
- `SM_Prop_SolarPanel_01.fbx` × 4
- `SM_Prop_Computer_Screen_01.fbx` × 4
- `SM_Prop_Computer_Keyboard_01.fbx` × 2
- `SM_Prop_StreetSign_04.fbx` × 2 (status boards)
- `SM_Prop_Streetlamp_02.fbx` × 4
- `SM_Env_FlowerPatch_01.fbx` × 4

**Custom work needed:**
- "WORKIZEN COMPUTE CENTER" branded sign panel
- "SYSTEM STATUS" board (GPU Cluster / Data Node / Compute Pool / Storage System / Network — each with Online/Offline label)
- "GREEN COMPUTE" info board (Renewable Energy / Energy Efficient / Low Carbon Footprint / Sustainable Mission)
- 6+ compute robot citizen forms with device/server iconography
- Central holographic cube (emissive geometry)

**Priority:** MEDIUM

---

## Team Office

**Current weakness:** A violet-tinted box building with a meeting table and four chairs outside, plus "TEAM" sign plate. Nothing communicates active collaboration, project planning, or the multi-room richness in the concept art.

**Desired visual goal:** A building suggesting multiple internal rooms (Meeting Room, Focus Room, Collab Space, Idea Lab, Team Lounge), with outdoor team tables active, a Project Dashboard board visible, Today's Schedule board, and Team Workflow board. 6+ citizens actively grouped around tables.

**Synty asset usage:**
- `SM_Bld_House_Preset_*.fbx` (largest base)
- `SM_Bld_House_Deck_01.fbx` (outdoor extension suggestion)
- `SM_Prop_Desk*` × 4
- `SM_Prop_Computer_Screen_01.fbx` × 3
- `SM_Prop_DeskChair*` × 6
- `SM_Prop_CoffeeTable*` × 2
- `SM_Prop_Streetlamp_01.fbx` × 4
- `SM_Env_FlowerPatch_02.fbx` × 6

**Custom work needed:**
- "WORKIZEN TEAM OFFICE" branded sign panel
- "PROJECT DASHBOARD" board (12 Active / 5 Teams / 24 Tasks / 78% Delivery Refinement)
- "TEAM WORKFLOW" board (Plan → Design → Build → Test → Deliver steps)
- "TODAY'S SCHEDULE" kiosk (Standup / Backlog Refinement / Team Workshop / Sprint Review)
- 6+ citizen figures in grouped discussion poses
- Outdoor team seating clusters

**Priority:** MEDIUM-HIGH

---

# 7. How To Get Closest To Concept Art

## Options evaluated

**A. Improve current app with Synty-inspired placeholders** — Continue with procedural geometry, add more props and citizens. Fast, safe, but buildings still won't match concept art. Density can improve; shape quality cannot.

**B. Convert/import Synty FBX/GLB assets** — Correct long-term strategy but blocked on a conversion pipeline that has not been proven yet. Risk of stalling on FBX scale, pivot, and material issues.

**C. Build a visual-only campus scene first** — Freeze all interactions, rebuild world from scratch in Three.js/R3F with pure visual focus. Clean but loses all the working interaction layer.

**D. Buy more assets** — Not needed. The Synty Polygon Town pack (695 FBX assets) is already purchased and contains exactly what is needed: trees, lamps, benches, buildings, props, characters. The bottleneck is usage, not acquisition.

**E. Hybrid approach** — Use option A for the next sprint (maximum density push with procedural geometry matching Synty shapes exactly), while in parallel proving the FBX-to-GLB pipeline with one building. Once pipeline is proven, progressively replace procedural shapes with real GLB assets.

## Recommended: Option E — Hybrid

**Why E wins:**

The single highest-impact action is not replacing buildings with GLB files — it is filling the world with citizens, trees, benches, lamps, props, and signage. This can be done immediately in the existing app with procedural geometry using exactly the same shapes as the Synty models (rounded cylinders for lamps, flat-top box for benches, tapered cone for trees). No FBX pipeline is needed to close 70% of the visual gap.

At the same time, one engineer proves the FBX-to-GLB pipeline on a single `SM_Bld_Shop_Concrete_01.fbx` → GLB conversion. Once that works, progressively swap buildings.

The hybrid closes the density gap in sprint 1 and the building quality gap in sprint 2. Attempting to solve both simultaneously in sprint 1 risks a stalled sprint with no visible improvement for the Founder.

---

# 8. Proposed Next Coding Task

The following is a precise command for Claude Code / Codex to implement the visual upgrade sprint.

---

**Task: Workizen HQ Campus Visual Density Upgrade v02**

App: `apps/workizen-3d`
Scope: visual density, citizens, robots, props, trees, paths, buildings, camera
No backend. No multiplayer. No wallet. No blockchain. No new business features.

**Exact deliverables required:**

1. **Citizens — increase to 30 visible on campus**
   - 15 human citizens placed in clusters (Citizen Plaza 8, Opportunity Center 3, Team Office 4)
   - 8 distinct AI/robot citizen meshes with named role labels:
     - EA Agent (blue round body), SA Agent (teal rectangular), PO Agent (orange),
       PM Agent (purple), DEV Agent (dark green), TEST Agent (red),
       AI Helper (white glow), Commerce Agent (gold)
   - Place 6 robot citizens around AI Agent Lab, 2 at Opportunity Center, 1 at Compute Center
   - 4 knowledge citizens (gold, book-prop suggestion) near Knowledge Library
   - 3 compute citizens (device-box style, improved) at Compute Center

2. **Trees — increase to 40 minimum**
   - Perimeter trees: 16 trees bordering the outer campus edge
   - Cluster trees: 4 tree clusters of 3 (between districts)
   - District border trees: 6 trees per district perimeter (4 districts × 6 = 24)
   - Use 3 tree variant types (cone, round, tall-pine) for variety

3. **Benches — increase to 20 minimum**
   - 4 in Citizen Plaza (existing, keep)
   - 3 per non-plaza district = 18 more (one cluster near each district entrance)

4. **Lamps — increase to 20 minimum**
   - 4 in Citizen Plaza (existing, keep)
   - Place lamps every ~4 units along all path segments
   - Target 3–4 lamps per district surroundings

5. **Flower / bush patches — increase to 35 minimum**
   - 4 patches per district entrance = 28
   - 8 patches along main plaza ring (existing 8, keep or extend)

6. **Signs and information boards per district — 2 minimum per district**
   - Large branded sign plate on each building facade: "WORKIZEN [DISTRICT NAME]"
   - One information board (kiosk or panel) per district showing purpose

7. **Building upgrades (no FBX required)**
   - AI Agent Lab: widen to `[7, 4.2, 6]`, add dome suggestion (wide top cylinder), add 3 antennas, add 4 screen props, add large robot face sphere centered on facade
   - Founder Tower: add glass-panel suggestion (emissive blue strip on each floor), add rooftop disc terrace mesh, add "WORKIZEN HQ" sign plate on all four sides
   - Opportunity Center: widen to `[6, 3, 5]`, add curved awning wing on left and right, add large header sign panel
   - All buildings: add a large `[2.8, 0.6, 0.12]` sign board at entrance level with district label in large text

8. **Paths — extend coverage**
   - Add secondary paths connecting districts to each other (not just to plaza)
   - Add crosswalk markings at each district path entry (alternating color planes)

9. **Water feature — add two**
   - Small pond near Founder Tower: 3-unit radius blue disc, slight emissive ripple suggestion
   - Campus edge water strip: thin plane strip along the northern edge suggesting ocean/coast

10. **Camera**
    - Tighten FOV from 42 to 38 for slightly closer composition
    - Ensure starting frame includes Citizen Plaza fountain, AI Agent Lab dome, and at least 10 visible citizens

---

# 9. Quality Gate

The next visual build passes if and only if all of the following are true:

| Gate | Pass condition |
|---|---|
| First impression | Founder opens app and immediately says it resembles the concept art |
| Citizen Plaza feeling | Plaza looks alive — at least 10 visible citizens before clicking anything |
| AI Agent Lab dominance | AI Agent Lab is visually the largest and most detailed structure on campus |
| Robot citizens visible | At least 6 distinctly robot-shaped AI citizens visible without clicking |
| Opportunity Center prominence | Opportunity Center is visually recognizable as the marketplace from the starting camera |
| Tree density | At least 30 trees visible without panning the camera |
| No empty plane feeling | No area of campus between districts shows blank green ground without props or paths |
| Landmark signage | Every building has its district name branded on the facade (not just a floating text label) |
| Bench and lamp density | At least 3 benches and 3 lamps visible near every district |
| Minimum counts | 30 citizens / 6 robot types / 40 trees / 20 benches / 20 lamps / 35 flower patches |
| Performance | Scene loads in < 5 seconds and maintains 40+ FPS on desktop |
| Smoke check | `npm run smoke:campus` still passes after all changes |

---

# 10. Final Recommendation

## Options

| Option | Assessment |
|---|---|
| Continue with Codex | Risky — Codex produced the current sparse MVP. Without a precise visual spec, Codex will produce similar results. |
| Switch to Claude Code | Viable — Claude Code can execute a precise visual density spec with full codebase awareness and can verify its own output. |
| Hybrid Claude + Codex | Optimal — Claude Code owns the visual upgrade implementation; Codex handles FBX pipeline investigation in parallel. |
| Pause coding / build in Unity or Blender | Not recommended — the app is web-first by design and Unity would restart the entire stack. |

## Recommendation: **Switch to Claude Code for the visual sprint**

The Codex MVP proved the technical architecture works. It established the district layout, interaction model, data layer, and demo flow. Those are correct and should be preserved.

The visual upgrade sprint is a different kind of task: it requires placing 30+ citizens with intentional spatial composition, designing 8 distinct robot citizen meshes within Three.js geometry, coordinating density across 7 districts, and constantly cross-checking against the concept art images. This is a visual composition problem requiring judgment at every step — which citizen goes where, how dense is dense enough, which prop best suggests a Synty building without the actual GLB.

Claude Code can:
- Read the concept art images during the sprint
- Count current assets in the scene and calculate what is missing
- Verify spatial composition after each change
- Stay within the exact spec defined in Section 8 of this document

**One sprint, one focus: make the campus feel alive before any backend, multiplayer, or pipeline work.**

After this visual sprint passes the Section 9 quality gate, return to Codex or use either tool for the FBX pipeline proof.

---

*Report created by Claude Code — 2026-06-07*
*Source: `apps/workizen-3d/src/features/campus/CampusScene.tsx`, `data.ts`, `images/concepts/`, `docs/`, `releases/codex-mvp-v01/`, `assets/synty/polygon-town/`*
