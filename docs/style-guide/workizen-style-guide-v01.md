# Workizen Style Guide v1

Status: REVIEW

Date: 2026-06-07

Project: Workizen 3D

## Core Direction

Workizen 3D is a cute, professional, low-poly Digital Citizen City for WorkforceOS / Workizen.vn.

Default World: Workizen HQ Campus

Default Spawn Point: Citizen Plaza

Main Landmark: AI Agent Lab

Product intent:

- Make work, learning, AI agents, knowledge, compute, and team formation visible in a friendly 3D campus.
- Feel civic, optimistic, modern, and practical.
- Support an Opportunity Marketplace experience, not a speculative metaverse.

## Art Direction

Target style:

- Cute low-poly.
- Chibi-friendly proportions.
- Bright but professional.
- Clean civic campus layout.
- Soft daylight.
- Clear district identity.
- Simple shapes first, richer assets later.

Inspirations:

- Synty Polygon Town Pack.
- Modern campus planning.
- Animal Crossing readability.
- Zepeto-like friendly avatars.

Visual mood:

- Friendly.
- Trustworthy.
- Work-focused.
- AI-native.
- Lightweight.
- Approachable for founders, builders, knowledge workers, and operators.

## Color Palette

Primary palette:

| Purpose | Color | Usage |
| --- | --- | --- |
| Workizen Blue | `#2563EB` | Primary UI accents, navigation markers, Founder Tower accents |
| AI Green | `#22C55E` | AI Agent Lab, AI Citizen, automation signals |
| Knowledge Gold | `#F59E0B` | Knowledge Library, learning paths, knowledge citizens |
| Opportunity Coral | `#FB7185` | Opportunity Center, active tasks, mission markers |
| Compute Cyan | `#06B6D4` | Compute Center, compute citizens, job queues |
| Team Violet | `#8B5CF6` | Team Office, collaboration, project status |
| Plaza Warm Stone | `#F4D7A1` | Citizen Plaza paving and gathering areas |

Neutral palette:

| Purpose | Color | Usage |
| --- | --- | --- |
| Campus Grass | `#7CCB6F` | Ground, lawns, soft landscape |
| Path Stone | `#D8C7A3` | Walkways and district paths |
| Building Wall | `#F8FAFC` | Main building surfaces |
| Soft Shadow | `#64748B` | Low-contrast shadows and secondary UI |
| Deep Text | `#0F172A` | UI text and labels |
| White Panel | `#FFFFFF` | Panels and overlays |

Rules:

- Use district colors as accents, not as full-screen palettes.
- Keep the world bright enough for readable building silhouettes.
- Avoid heavy gradients and one-color themes.
- Ensure clickable districts and citizens remain visually distinct.

## Building Style

General building rules:

- Use simplified low-poly massing.
- Keep building silhouettes distinct by district.
- Use clear entrances facing Citizen Plaza or the main navigation path.
- Use signage or symbolic props to make district purpose obvious.
- Keep buildings friendly and civic, not corporate-dark.

District style:

- AI Agent Lab: largest visual emphasis; glassy green-blue accents, antennae, light panels, small robot/agent details.
- Founder Tower: vertical but not intimidating; blue accents, strategy deck, beacon or flag.
- Citizen Plaza: open, welcoming, circular or radial gathering space.
- Knowledge Library: warm gold accents, books, calm facade, readable archive identity.
- Opportunity Center: coral/pink markers, public board, mission panels, active posting area.
- Compute Center: cyan accents, server blocks, cooling vents, clean infrastructure identity.
- Team Office: violet accents, meeting tables, collaboration boards, modular workspace feel.

Scale rules:

- AI Agent Lab should be the most prominent landmark.
- Founder Tower may be tall but should not visually overpower AI Agent Lab.
- Citizen Plaza should remain visually open and readable from the starting camera.
- Buildings should leave navigation paths clear.

## Citizen Style

Citizen style:

- Chibi proportions.
- Friendly silhouettes.
- Simple readable roles.
- Distinct accent colors by citizen type.
- Placeholder avatars are acceptable for MVP.

Citizen type visual cues:

- Human Citizen: warm skin and clothing colors, human profile identity.
- AI Citizen: green/teal accents, subtle glow, helper/agent feel.
- Knowledge Citizen: gold accents, book/tablet/headset props.
- Compute Citizen: cyan/blue accents, device/server/compute badge.

Avatar rules:

- Start with placeholders.
- Add Ready Player Me later through an avatar adapter.
- Avoid provider-specific avatar assumptions in the design spec.
- Keep citizens readable at campus camera distance.

## NPC Style

NPCs should feel like helpful campus hosts, not game enemies or speculative metaverse mascots.

Initial NPCs:

- Workizen Guide: welcoming host in Citizen Plaza.
- AI Architect: expert host at AI Agent Lab.
- Opportunity Manager: mission/work host at Opportunity Center.
- Knowledge Manager: learning host at Knowledge Library.
- Compute Manager: infrastructure host at Compute Center.
- Project Manager: team coordination host at Team Office.

NPC visual rules:

- NPCs should have stronger role cues than generic citizens.
- NPCs should stand near their district entrance or service point.
- NPCs should trigger panels, not full chat in MVP.
- Open WebUI AI NPC chat is later, not MVP.

## Camera Style

Starting camera:

- Isometric or soft third-person overview.
- Shows Citizen Plaza first.
- Keeps AI Agent Lab visible as the main landmark.
- Makes district paths understandable.

Suggested camera feel:

- Calm.
- Stable.
- Easy to navigate.
- No fast motion.
- No disorienting first-person controls for MVP.

Camera rules:

- Start above and behind Citizen Plaza.
- Support orbit/pan/zoom or guided district selection.
- Keep selected buildings framed clearly.
- Avoid extreme wide-angle distortion.
- Avoid dark cinematic shots.

## Environment Rules

Environment should include:

- Daylight sky.
- Soft shadows.
- Grass, paths, and plaza paving.
- Clear main navigation loop.
- District signage.
- Light landscaping.
- Small props that explain work purpose.

Environment should support:

- Fast loading.
- Clickable landmarks.
- Clear labels or panel feedback.
- Desktop and mobile readability.

MVP environment should not require:

- Purchased Synty assets.
- Ready Player Me.
- Mixamo animations.
- Multiplayer servers.
- Backend APIs.

## Things To Avoid

Avoid:

- Crypto visual language.
- NFT galleries.
- Token icons.
- Wallet-first UX.
- Speculative land ownership language.
- Cyberpunk style.
- Dark metaverse style.
- Neon nightclub visuals.
- Dystopian city mood.
- Combat/game enemy framing.
- Overly realistic corporate towers.
- Visual clutter that hides the Opportunity Marketplace purpose.

## Final Style Decisions

- Default World = Workizen HQ Campus.
- Default Spawn = Citizen Plaza.
- Main Landmark = AI Agent Lab.
- Product App = `apps/workizen-3d`.
- POC App = `apps/workizen-3d-demo`.
- Frontend first with mock data.
- Backend later with Laravel.
- No blockchain, no NFT, no production wallet, no multiplayer in MVP.
