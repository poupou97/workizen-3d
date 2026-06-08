# Workizen Art Direction Standard v01

Status: Active  
Project: Workizen 3D  
Purpose: Govern the visual direction for Workizen 3D assets, generated assets, district composition, and future runtime style tokens.

## Approved Style

Workizen 3D must follow this style blend:

- 70% Animal Crossing
- 20% Zepeto
- 10% Modern Startup Ecosystem

The goal is a friendly digital citizen city, not a generic metaverse, hard sci-fi environment, or realistic enterprise simulation.

## Mood

Approved mood:

- Bright
- Optimistic
- Friendly
- Cute low-poly
- Startup campus

Assets should feel approachable, readable, and civic. Buildings and props should support a campus-like city where humans, AI citizens, knowledge citizens, and compute citizens can work together.

## Preferred Palette

Preferred colors:

- Blue
- Green
- Teal
- Warm cream
- Gold accents

Colors should be clean and optimistic. Use accent colors to identify district purpose, but keep the overall scene harmonious and readable.

## Avoid

Avoid:

- Cyberpunk
- Dark sci-fi
- NFT/metaverse look
- Hyper-realistic PBR
- Gloomy grey tone

AI-generated assets must not introduce dark, metallic, dystopian, overly glossy, or realistic materials that conflict with the Workizen low-poly campus style.

## District Palette

| District | Palette |
|---|---|
| AI Agent Lab | Teal, green, cyan |
| Founder Tower | Blue, white, gold |
| Citizen Plaza | Warm cream, blue, green |
| Knowledge Library | Gold, warm yellow |
| Opportunity Center | Coral, orange, pink |
| Compute Center | Cyan, electric blue |
| Team Office | Purple, lavender |

# Island World Visual Direction

Workizen HQ Campus is now visually standardized as a starter island in the ocean.

The island world direction must include:

- Blue ocean
- Golden beach
- White clouds
- Warm sunlight
- Fresh green grass
- Stone paths
- Flowering trees
- Waterfront details
- Cute island campus mood

The scene should feel bright, friendly, and lived-in. Ocean, beach, paths, nature, districts, and citizens should work together so the world reads as Workizen HQ Island without relying on large explanatory UI panels.

## Runtime Rule

Runtime visual style must be implemented as reusable style tokens in `artDirection.ts`.

Future scene code should reference shared art direction tokens instead of scattering unrelated hard-coded colors, style weights, or district palette rules across components.

## Review Rule

Any new visual asset must be checked against this standard before it can be approved for runtime.

Reviewers must verify:

- The asset matches the approved style blend.
- The mood is bright, friendly, and startup-campus oriented.
- The palette fits the intended district.
- The asset avoids banned visual directions.
- The asset can coexist with Synty Polygon Town and existing Workizen scene assets.
