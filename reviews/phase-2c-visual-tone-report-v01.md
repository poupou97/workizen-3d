# Workizen Phase 2C Visual Tone Report v01

Date: 2026-06-08

## Scope

Phase 2C focused only on visual tone and art direction for `apps/workizen-3d`.

No NPC walking, animation work, pathfinding, multiplayer, backend, economy, marketplace logic, or new business features were added.

## Files Changed

- `apps/workizen-3d/src/features/campus/artDirection.ts`
- `apps/workizen-3d/src/features/campus/CampusScene.tsx`
- `apps/workizen-3d/src/features/campus/data.ts`
- `apps/workizen-3d/src/features/campus/TopHud.tsx`
- `apps/workizen-3d/src/features/campus/DemoGuide.tsx`
- `apps/workizen-3d/src/features/campus/SelectionPanel.tsx`
- `apps/workizen-3d/src/app/globals.css`
- `reviews/phase-2c-visual-tone-report-v01.md`

## Art Direction Constants Added

Created `artDirection.ts` as the runtime source of truth for Phase 2C tone:

- Sky color: bright pale cyan
- Fog color/range: light cyan fog with softer far fade
- Grass colors: fresher outer and inner green tones
- Water color: brighter cyan-blue
- Beach/path/plaza colors: warm cream and gold accents
- Ambient light: warm cream, higher intensity
- Hemisphere light: sky cyan and fresh green ground bounce
- Directional light: warmer and softer, lower intensity than harsh direct light
- Shadow settings: softer normal bias and lower shadow bias
- Tone mapping exposure: lifted for brighter perceived scene
- District palette tokens for all seven districts
- UI tokens for white/glass panels, blue-green accents, text, borders, and shadows
- Material tone rules for Tripo assets

## Color And Lighting Changes

- Replaced the previous darker sky/background/fog tone with a brighter cyan direction.
- Updated grass planes to a more optimistic green pair.
- Updated water to clear cyan-blue with lower metalness and more readable transparency.
- Warmed the plaza, paths, beach, district pads, signage faces, and navigation markers.
- Applied art direction constants inside `CampusScene.tsx` instead of scattering color literals for core world tone.
- Retained the existing camera setup; no camera workaround was introduced.

## District Palette Changes

Reinforced the approved district palette through `data.ts` district colors:

- AI Agent Lab: teal / green / cyan
- Founder Tower: blue / white / gold
- Citizen Plaza: warm cream / blue / green
- Knowledge Library: gold / warm yellow
- Opportunity Center: coral / orange / pink
- Compute Center: cyan / electric blue
- Team Office: purple / lavender

## Material Changes

Tripo landmark materials remain native PBR materials. No Synty palette override was added.

Safe normalization added for Tripo materials:

- Preserve texture maps and set texture color space to sRGB.
- Clone materials before adjustment so cached GLTF materials are not progressively mutated.
- Lift material color slightly toward white to fit the brighter campus.
- Cap excessive metalness.
- Clamp roughness into a friendlier low-poly range.
- Apply a moderate environment intensity when available.

## UI Changes

- HUD panels now sit on a brighter white/glass surface with blue-green accents.
- Demo controls changed from heavy slate blocks to blue buttons with softer shadows.
- District navigation buttons use light sky borders and hover states.
- Selection panel cards, badges, tags, and quick-open buttons use softer sky/orange surfaces.
- Global page background and glass panel shadows were updated to reduce the heavy dark feel.

## Screenshots Generated

- `output/screenshots/workizen-phase-2c-tone-overview.png`
- `output/screenshots/workizen-phase-2c-tone-citizen-plaza.png`
- `output/screenshots/workizen-phase-2c-tone-ai-agent-lab.png`
- `output/screenshots/workizen-phase-2c-tone-opportunity-center.png`

All screenshots are 1440 x 900 PNG captures from the running local app.

## Validation

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run smoke:campus` passed for desktop, tablet, and mobile after starting the local dev server.

## Before / After Assessment

Before Phase 2C, the campus had functional landmarks and signage, but the total tone still leaned toward a generic Three.js prototype with heavier UI blocks, duller ground color, darker water, and less unified district color language.

After Phase 2C, the first load reads brighter and more optimistic. Grass, sky, fog, water, plaza paving, signage, and UI now share the approved Workizen direction: 70% Animal Crossing, 20% Zepeto, 10% modern startup ecosystem.

The scene now feels closer to a friendly Digital Citizen City without changing gameplay behavior or camera framing.

## Remaining Risks

- Some distant labels remain small from the default camera; this is a legibility tradeoff from preserving camera behavior.
- Tripo material normalization is intentionally conservative. A few assets may still vary in brightness because their original PBR textures differ.
- Three.js runtime emitted deprecation warnings for `THREE.Clock` and `PCFSoftShadowMap`; these existed at runtime and were not part of this visual tone scope.
