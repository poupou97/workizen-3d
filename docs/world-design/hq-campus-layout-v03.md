# Workizen HQ Campus Layout v03

Status: Canonical island layout  
Date: 2026-06-08  
Supersedes: `docs/world-design/hq-campus-layout-v02.md` for future world composition work.

## Core Decisions

- World type: Starter Island
- Default spawn: Citizen Plaza
- Main landmark: AI Agent Lab
- Outer boundary: Ocean
- Island edge: Golden beach ring
- Movement language: Stone/tile path ring and radial paths
- Visual mood: Animal Crossing + Zepeto + modern startup campus

## Canonical Layout

Citizen Plaza remains the center spawn and orientation point.

AI Agent Lab becomes the main visual landmark on the north-east/east side of the island, visible from the center and treated as the strongest Workizen identity anchor.

Founder Tower and Knowledge Library occupy the northern skyline. Opportunity Center anchors the west. Compute Center anchors the east/south-east. Team Office sits south as the delivery and collaboration destination.

## District Placement

| Area | District | Role |
| --- | --- | --- |
| Center | Citizen Plaza | Spawn, orientation, campus map, welcome boards |
| North | Founder Tower | Founder review, strategy, governance |
| North | Knowledge Library | Playbooks, knowledge, expertise |
| North East / East | AI Agent Lab | Main landmark, AI-native identity |
| West | Opportunity Center | Opportunity Marketplace |
| East / South East | Compute Center | Compute Citizens and capacity |
| South | Team Office | Team formation and delivery planning |
| Outer Ring | Ocean, beach, nature, paths | Island identity and boundary |

## Ocean Boundary

The island must be surrounded by ocean.

Ocean should be visible from the default camera and should frame the campus as a starter island rather than an infinite map.

## Beach Ring

The island edge should include a visible golden sand beach ring.

The beach ring separates green campus terrain from ocean and gives the world a warm, friendly coastline.

## Stone Path Ring

The island should use a stone/tile path network:

- A central plaza ring around Citizen Plaza
- Radial paths to every district
- An outer path loop or partial loop connecting district edges
- Clear path markers where needed

Paths should make navigation obvious without relying on large UI panels.

## Waterfront Elements

Approved waterfront elements:

- Pier
- Bridge
- Pond
- Boardwalk
- Small coastal lamps
- Benches facing water
- Flowers and bushes near beach edges

Use these where appropriate to make the island feel inhabited and intentional.

## Outer Ring Layers

The outer ring should include:

- Ocean
- Golden beach
- Trees
- Flowers
- Path network
- Pier / bridge / pond where appropriate

## Conceptual Layout Diagram

```text
                         OCEAN
              ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
          Golden Beach + Trees + Flowers Ring

                 [Founder Tower]   [Knowledge Library]
                        \              /
                         \            /
                          \          /
        [Opportunity Center] -- [Citizen Plaza] -- [AI Agent Lab]
                          \          \                 \
                           \          \                 [Ocean View]
                            \          \
                         [Team Office]  [Compute Center]

          Golden Beach + Pier / Pond / Bridge Elements
              ~ ~ ~ ~ ~ ~ ~ OCEAN ~ ~ ~ ~ ~ ~ ~
```

## Product Flow

Citizen Plaza -> Opportunity Center -> Team Office

This remains the primary business journey: arrive, discover work, form a team.

## Visual Flow

Citizen Plaza -> AI Agent Lab -> Ocean-framed island campus

This should be the first-load visual story: Workizen is an AI-native Digital Citizen City on a friendly starter island.

## Implementation Notes

- Do not use camera changes as a workaround for poor island scale or composition.
- Do not reintroduce an infinite grass plane.
- Keep UI secondary to the world.
- Prepare future bottom navigation and compact left info card patterns.
