# Workizen HQ Island World Standard

Status: Active  
Project: Workizen 3D  
Date: 2026-06-08  
Purpose: Make the approved Workizen HQ Campus island direction official before implementation.

## Purpose

This standard defines the canonical world direction for Workizen HQ Campus.

Workizen HQ Campus is a starter island in the middle of the ocean. It should feel like a cute low-poly Digital Citizen City where citizens arrive, orient, explore districts, and understand Workizen through the world itself.

## Approved World Concept

Approved concept:

- Starter island surrounded by blue ocean
- Golden sand beach around the island edge
- Fresh green grass and dense nature
- Stone/tile path network connecting every district
- White clouds, warm sunlight, and bright sky
- Cute low-poly startup campus
- Living Digital Citizen City
- 70% Animal Crossing, 20% Zepeto, 10% modern startup campus

The first impression should be: "This is Workizen HQ Island."

## Island-First Rule

HQ Campus must be composed as an island.

An infinite grass plane is not allowed for the canonical Workizen HQ Campus. Grass can exist as an island terrain layer, but it must terminate at visible beach and ocean edges.

## Ocean Boundary Rule

The outer boundary of the world must be ocean.

The ocean should be visible from the default camera and should clearly communicate that the campus sits on a starter island, not an endless flat prototype ground.

## Golden Sand Beach Rule

The island edge must include a golden sand beach ring or clear sand coastline.

The beach should act as the visual transition between green campus terrain and ocean. It must not be treated as an optional decoration.

## Stone Path Network Rule

Districts must be connected by visible stone or tile paths.

The path network must make the world readable without relying on large UI panels. Users should understand how to move from Citizen Plaza to districts by looking at the world.

## Water Features Rule

Water should be part of the world identity.

Approved water features include:

- Ocean boundary
- Small pond
- Pier
- Bridge
- Waterfront boardwalk
- Coastal details near districts

Water should be clear blue/cyan and friendly, not dark or muddy.

## Sky / Sunlight / Cloud Rule

The world must use a bright sky, warm sunlight, and white cloud language.

Lighting should feel optimistic and soft. Avoid harsh shadows, dark fog, cyberpunk contrast, or gloomy grey tone.

## Nature Density Rule

The island must feel alive and planted.

Required nature layers:

- Dense trees
- Flowers
- Bushes
- Grass
- Lamps
- Benches

Nature should frame district landmarks, soften open spaces, and make the campus feel inhabited.

## Campus Composition Rule

Required world layers:

- Ocean
- Beach
- Path network
- Districts
- Trees
- Flowers
- Citizens

Districts should be arranged around Citizen Plaza and connected through visible paths. Landmarks should create a readable skyline while preserving a cute low-poly island campus mood.

## UI World-First Rule

The 3D world is the primary experience.

UI must support orientation and interaction without dominating the scene. The world should carry identity, navigation, and product meaning before panels explain it.

## Bottom Navigation Rule

Future implementation should move the main menu to bottom navigation.

Bottom navigation should make major areas available without blocking the world. It should replace large persistent top navigation when the island composition is implemented.

## Compact Left Info Card Rule

When the user selects a district, citizen, or opportunity, context detail should appear as a compact left-side info card.

The card should provide short, useful information only. It should not duplicate long explanatory copy or permanently block the center/right side of the world.

## Anti-Patterns

Avoid:

- Empty green plane
- Infinite grass plane
- Sparse buildings
- Disconnected districts
- Oversized UI panels
- Duplicate text panels
- Dark/cyberpunk/metaverse mood
- Gloomy grey lighting
- Camera workaround for scene scale problems
- World identity that depends on UI text instead of visible environment

## Acceptance Criteria

- HQ Campus reads as an island surrounded by ocean.
- Island edge includes visible beach/sand.
- Infinite grass plane is removed from the canonical direction.
- Districts are connected by visible stone/tile paths.
- Ocean, beach, path, district, trees, flowers, and citizens are present as required layers.
- Dense trees, flowers, bushes, lamps, and benches support a living island campus.
- UI does not dominate the scene.
- Main navigation is planned for bottom navigation.
- Selection detail is planned as compact left-side information.
- The world makes users feel: "This is Workizen HQ Island."
