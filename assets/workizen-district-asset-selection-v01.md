# Workizen District Asset Selection v01

Status: Pre-code asset selection
Date: 2026-06-07
Source folder: `assets/synty/polygon-town/Source_Files/FBX`

Use purchased Synty Polygon Town assets where direct runtime import is practical. If exact FBX conversion is not ready, preserve the selected asset language with Synty-inspired low-poly approximations.

## Global Campus Assets

- Paths and roads: `SM_Env_Path*`, `SM_Env_Road*`, `SM_Env_Sidewalk*`, `SM_Env_Driveway*`
- Trees and plants: `SM_Env_Tree*`, `SM_Env_FlowerPatch*`, `SM_Prop_Flowers*`, `SM_Env_Garden*`, `SM_Gerneric_Grass_Patch*`
- Signs: `SM_Prop_Sign*`, `SM_Prop_StreetSign*`, `SM_Prop_StreetSign_Pole*`
- Lamps: `SM_Prop_Streetlamp*`
- Benches and plaza props: `SM_Prop_ParkBench*`, `SM_Prop_Fountain*`

## District Mapping

### Citizen Plaza

Use paths, roads, benches, fountain, lamps, trees, flowers, and signs.

Candidate patterns:
- `SM_Env_Path*`
- `SM_Env_Road_Crossing*`
- `SM_Env_Tree*`
- `SM_Env_FlowerPatch*`
- `SM_Prop_Fountain_Base_01.fbx`
- `SM_Prop_Streetlamp*`
- `SM_Prop_Sign*`

### Opportunity Center

Use shop/commercial buildings, signs, counters, boards, and marketplace props.

Candidate patterns:
- `SM_Bld_Shop_*.fbx`
- `SM_Bld_Shop_Concrete_01.fbx`
- `SM_Bld_Shop_Sign_01.fbx`
- `SM_Prop_ShopShelf*`
- `SM_Prop_Sign*`
- `SM_Prop_StreetSign*`
- `SM_Prop_Kitchen_Counter*`

### Team Office

Use office/house building, desks, chairs, computers, and meeting props.

Candidate patterns:
- `SM_Bld_House_Preset_*.fbx`
- `SM_Bld_House_Deck*.fbx`
- `SM_Prop_Desk*`
- `SM_Prop_Computer_Screen_01.fbx`
- `SM_Prop_Computer_Keyboard_01.fbx`
- `SM_Prop_DeskChair*`
- `SM_Prop_CoffeeTable*`

### Knowledge Library

Use a large house/shop building, bookshelves, books, desks, and plants.

Candidate patterns:
- `SM_Bld_House_Preset_*.fbx`
- `SM_Bld_Shop_*.fbx`
- `SM_Prop_Bookshelf*`
- `SM_Prop_Book*`
- `SM_Prop_Book_Group*`
- `SM_Prop_Desk*`
- `SM_Env_Plant*`
- `SM_Prop_Flowers*`

### Compute Center

Use concrete/shop building, computer props, antenna, solar panel, and cyan tech signage.

Candidate patterns:
- `SM_Bld_Shop_Concrete_01.fbx`
- `SM_Bld_Shop_*.fbx`
- `SM_Prop_Computer_Screen_01.fbx`
- `SM_Prop_Computer_Keyboard_01.fbx`
- `SM_Prop_Antenna_01.fbx`
- `SM_Prop_SolarPanel_01.fbx`
- `SM_Prop_Sign*`

### Founder Tower

Use tallest/multi-floor building combination, HQ sign, and blue/green accent.

Candidate patterns:
- `SM_Bld_House_Preset_*.fbx`
- `SM_Bld_House_Roof*`
- `SM_Bld_House_ExteriorWall*`
- `SM_Bld_Shop_*.fbx`
- `SM_Prop_Sign*`
- `SM_Prop_StreetSign*`

### AI Agent Lab

Use largest available building or kitbash from buildings, antenna, computer props, AI sign, and green/teal accent.

Candidate patterns:
- `SM_Bld_Shop_*.fbx`
- `SM_Bld_Shop_Concrete_01.fbx`
- `SM_Bld_House_Preset_*.fbx`
- `SM_Bld_Skylight*`
- `SM_Prop_Antenna_01.fbx`
- `SM_Prop_Computer_Screen_01.fbx`
- `SM_Prop_Computer_Keyboard_01.fbx`
- `SM_Prop_SolarPanel_01.fbx`
- `SM_Prop_Sign*`

## Implementation Rule

Do not block the visual upgrade on complete FBX import. Start with one building conversion/import test later, while the MVP uses Synty-inspired generated geometry that preserves the same forms, colors, and district prop logic.
