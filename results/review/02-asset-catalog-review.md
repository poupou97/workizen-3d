# 02 - Asset Catalog Review

Status: Founder Review

Source reviewed:

- `assets/workizen-asset-catalog-v01.md`
- `assets/synty/polygon-town/README.md`
- `assets/synty/polygon-town/Source_Files/`

## 1. Asset Source

Primary asset pack:

- Synty Studios - POLYGON Town Pack

Local location:

```text
assets/synty/polygon-town/Source_Files
```

Primary folders:

- `Characters/`
- `FBX/`
- `OBJ/`
- `Textures/`

Important license/process note from local README:

- Do not publish commercial assets publicly.
- Prefer purchased Synty assets over placeholder cubes.

## 2. Inventory Summary

Approximate source inventory:

| Category | Count | Notes |
| --- | ---: | --- |
| FBX Buildings | 147 | Includes modular house parts, presets, church, shop buildings, signs |
| FBX Environment/Roads | 97 | Trees, bushes, paths, roads, sidewalks, grass, fences, garden pieces |
| FBX Props | 340 | Furniture, books, computers, counters, signs, benches, lamps, solar panel, antenna, etc. |
| FBX Vehicles | 6 | Bus, convertible, firetruck, pickup, school bus, truck |
| Unique Character Models | 9 | Family/shopkeeper/school characters; duplicated in Unreal subfolder |
| Texture Files | 79 | Town textures, road/window textures, emissive, normal, metallic |

If FBX and OBJ are both counted, file counts are roughly doubled for many static meshes. The review should treat FBX as the preferred web pipeline source unless a conversion workflow proves OBJ is easier.

## 3. Category Review

### Buildings

Available building assets:

- House presets 01-11
- House preset with garage
- Modular house walls, doors, windows, roofs, decks, stairs
- Shop 01-03
- Shop concrete
- Shop sign
- Church
- Garden shed

Strength:

- Strong for town/campus base.
- Good for Citizen Plaza perimeter, Team Office, Knowledge Library, Opportunity Center, and small support buildings.

Weakness:

- Does not directly include futuristic AI lab, large glass circular research center, compute facility, or Founder Tower.
- Founder Tower and AI Agent Lab need kitbash/customization.

### Characters

Available character models:

- Daughter
- Father 01/02
- Mother 01/02
- SchoolBoy
- SchoolGirl
- ShopKeeper
- Son

Strength:

- Good for Human Citizen placeholders and social plaza population.

Weakness:

- No robot/AI agent characters.
- No clear Knowledge/Compute Citizen variants.
- No Ready Player Me pipeline yet.

### Environment

Available environment assets:

- Trees
- Bushes
- Hedges
- Grass patches
- Flower patches
- Garden boxes
- Paths
- Roads
- Sidewalks
- Fences
- Driveways

Strength:

- Very suitable for Animal Crossing-like campus feel.
- Strong match for Citizen Plaza, walking paths, and district connectors.

Weakness:

- Does not solve landmark identity by itself.

### Roads & Ground

Available assets:

- Roads
- Road crossings
- Road parking
- Sidewalk corners
- Sidewalk straights
- Path pieces
- Driveway/path variants

Strength:

- Good for clear campus navigation.
- Good for replacing primitive paths in current MVP.

Weakness:

- Concept art uses more decorative circular plaza paving than the raw pack may provide directly.

### Props

Useful props discovered:

- Books and bookshelves
- Computer screen, keyboard, mouse
- Desks and desk chairs
- Park bench
- Fountain and fountain base
- Shop counters, shelves, checkout
- Street signs, sign poles, stop/bus signs
- Solar panel
- Antenna
- Lamps and streetlamps
- Plants and pot plants
- Workbench and work shelf

Strength:

- Strong support for district storytelling.
- Particularly useful for Knowledge Library, Team Office, Opportunity Center, Compute Center, and Citizen Plaza.

Weakness:

- AI-specific signs, Workizen logos, agent boards, hologram markers, robot faces, and data dashboards must be custom UI/texture/signage.

### Vehicles

Available vehicles:

- Bus
- Convertible
- Firetruck
- Pickup
- School bus
- Truck

Suitability:

- Not required for HQ Campus MVP.
- Useful later for city expansion or decorative background activity.

## 4. Suitability By District

| District | Suitability | Recommended Synty Base | Missing/Custom Needs |
| --- | --- | --- | --- |
| AI Agent Lab | Partial | Modular house/shop parts, antenna, computer props, emissive textures | Circular futuristic lab, robot face facade, AI logo, agent signage, glowing panels |
| Founder Tower | Partial | House multi-floor modular parts, shop concrete, roof/window modules | Tall iconic tower silhouette, executive signage, founder beacon |
| Citizen Plaza | Strong | Paths, sidewalks, fountain, benches, lamps, trees, flowers, signs | Workizen central logo/plaza marker |
| Knowledge Library | Good | House/shop building base, books, bookshelves, desks, plants | Library-specific facade/signage and knowledge icon system |
| Opportunity Center | Good | Shop buildings, shop signs, counters, public signage | Opportunity boards, marketplace UI panels, mission cards |
| Compute Center | Partial | Shop/concrete building, computer props, antenna, solar panel, air vents | Server racks/data center identity, compute dashboards, cyan tech accents |
| Team Office | Good | House/shop base, desks, chairs, couch, meeting props, bookshelves | Team workflow boards, meeting-room signage |

## 5. Asset Readiness Score

Asset Readiness: 7/10

Reason:

- The Synty pack is strong enough to upgrade the MVP away from primitive boxes.
- It matches the cute town/campus direction.
- It is not enough by itself to reproduce the concept art landmarks.
- A mapping/kitbash phase is required before runtime integration.

## 6. Asset Risks

Top risks:

1. Concept art implies custom landmark buildings beyond the raw pack.
2. No production-ready robot/AI agent character assets exist in the reviewed pack.
3. No GLB/GLTF conversion workflow is documented.
4. No per-asset license/export/usage status is tracked yet.
5. Runtime app currently uses primitives; asset replacement may require scale/pivot/material testing.
6. If asset integration starts without district mapping, the scene can become visually inconsistent.

## 7. Asset Recommendation

Do not acquire more assets yet.

Recommended next step:

- Create a district-by-district Synty asset selection sheet.
- Choose 1-3 base meshes per district.
- Define custom signage/logo overlays.
- Test one asset import pipeline with a single building before replacing the whole campus.
