# Tripo Generation Prompt Template

## Asset Name

`<asset_name>`

## Purpose

Describe what this asset is for and why Synty Polygon Town does not already cover the need.

## Target District

`<AI Agent Lab | Founder Tower | Citizen Plaza | Knowledge Library | Opportunity Center | Compute Center | Team Office | Campus Environment>`

## Style

Use the Workizen approved style blend:

- 70% Animal Crossing
- 20% Zepeto
- 10% Modern Startup Ecosystem

Mood: bright, optimistic, friendly, cute low-poly, startup campus.

## Visual Requirements

- Main silhouette:
- Required features:
- Approximate scale:
- Camera/readability requirements:
- Ground alignment expectations:
- Any district-specific signs, symbols, or affordances:

## Color Palette

Use the target district palette from `docs/art-direction/workizen-art-direction-standard-v01.md`.

Primary colors:

- `<color>`

Accent colors:

- `<color>`

## Polygon / Synty Compatibility Requirement

The asset must feel compatible with Synty Polygon Town:

- Low-poly or low-poly-friendly silhouette
- Simple readable forms
- Friendly proportions
- Not hyper-realistic
- Not dark sci-fi
- Materials should not overpower existing Synty palette assets

## Prompt

```text
<Write the full Tripo prompt here.>
```

## Negative Prompt

```text
cyberpunk, dark sci-fi, NFT metaverse, hyper-realistic, gloomy grey, horror, dystopian, gritty, photorealistic, excessive metallic surfaces, aggressive weapons, cluttered details
```

## Output Format

Preferred:

- GLB
- GLTF

Avoid:

- FBX unless conversion is planned and documented

## Review Checklist

- [ ] Metadata created for generated asset.
- [ ] Tripo API call logged in `logs/tripo/YYYY-MM-DD-tripo-calls.md`.
- [ ] Asset added to `docs/assets/generated-asset-registry-v01.md`.
- [ ] Matches Workizen art direction standard.
- [ ] Fits target district palette.
- [ ] Compatible with Synty Polygon Town style.
- [ ] GLB/GLTF loads in Three.js.
- [ ] Scale and ground alignment checked.
- [ ] No API key, private token, or secret committed.

