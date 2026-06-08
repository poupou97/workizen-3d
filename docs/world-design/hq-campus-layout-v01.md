# Workizen HQ Campus Layout v1

Status: REVIEW

Date: 2026-06-07

Project: Workizen 3D

## Core Decisions

Selected Master Plan: Variation D

Default Map: Workizen HQ Campus

Default Spawn Point: Citizen Plaza

Main Landmark: AI Agent Lab

Product App: `apps/workizen-3d`

POC App: `apps/workizen-3d-demo`

## Layout Principle

Variation D places AI Agent Lab as the main campus landmark and uses Citizen Plaza as the central spawn and orientation point.

The campus should read as a civic work campus:

- Citizen Plaza is the first place citizens arrive.
- AI Agent Lab is visible immediately and feels like the core of the AI-native city.
- Opportunity Center, Knowledge Library, Compute Center, and Team Office form the work loop.
- Founder Tower anchors strategy and governance.

## Relative Layout Positions

Recommended relative layout:

```text
                 North

          [Founder Tower]
                |
      [Knowledge Library] --- [AI Agent Lab] --- [Compute Center]
                \              |              /
                 \             |             /
                  \      [Citizen Plaza]    /
                   \          /   \         /
                    [Opportunity Center]  [Team Office]

                 South
```

District placement logic:

- Citizen Plaza: center and spawn.
- AI Agent Lab: north of Citizen Plaza, most prominent landmark.
- Founder Tower: far north, aligned behind or near AI Agent Lab as strategy/governance anchor.
- Knowledge Library: northwest, connected to AI Agent Lab and Citizen Plaza.
- Compute Center: northeast, connected to AI Agent Lab and Citizen Plaza.
- Opportunity Center: southwest, close to Citizen Plaza for early user journey.
- Team Office: southeast, close to Opportunity Center for team formation flow.

## Suggested React Three Fiber Coordinates

Coordinate assumptions:

- `x`: left/right.
- `y`: vertical height.
- `z`: depth.
- Citizen Plaza is at world origin.
- Negative `z` is north.
- Positive `z` is south.

Suggested district anchors:

| District | Position `[x, y, z]` | Approx Size `[x, y, z]` | Notes |
| --- | --- | --- | --- |
| Citizen Plaza | `[0, 0, 0]` | `[5, 0.1, 5]` | Spawn point and central gathering area |
| AI Agent Lab | `[0, 0, -8]` | `[4.5, 3.2, 4]` | Main landmark; should be visually strongest |
| Founder Tower | `[0, 0, -14]` | `[3, 5.5, 3]` | Tall strategy landmark; secondary to AI Lab in attention |
| Knowledge Library | `[-7, 0, -6]` | `[3.8, 2.4, 3.2]` | Warm learning district |
| Compute Center | `[7, 0, -6]` | `[3.8, 2.8, 3.2]` | Infrastructure and compute district |
| Opportunity Center | `[-6, 0, 5]` | `[4, 2.4, 3]` | Public opportunity discovery district |
| Team Office | `[6, 0, 5]` | `[4, 2.4, 3]` | Collaboration and project team district |

Suggested NPC anchors:

| NPC | District | Position `[x, y, z]` |
| --- | --- | --- |
| Workizen Guide | Citizen Plaza | `[0, 0, 1.5]` |
| AI Architect | AI Agent Lab | `[0, 0, -5.8]` |
| Opportunity Manager | Opportunity Center | `[-5, 0, 3.4]` |
| Knowledge Manager | Knowledge Library | `[-5.8, 0, -5]` |
| Compute Manager | Compute Center | `[5.8, 0, -5]` |
| Project Manager | Team Office | `[5, 0, 3.4]` |

Suggested citizen anchors:

| Citizen Type | Starting Area | Position `[x, y, z]` |
| --- | --- | --- |
| Human Citizen | Citizen Plaza | `[-1.2, 0, 0.8]` |
| AI Citizen | Citizen Plaza / AI path | `[1.2, 0, 0.8]` |
| Knowledge Citizen | Library path | `[-2.2, 0, -1.2]` |
| Compute Citizen | Compute path | `[2.2, 0, -1.2]` |

## Suggested Camera Starting Position

Starting camera:

```text
position: [9, 8, 12]
target: [0, 0, -3]
fieldOfView: 45
```

Camera goals:

- Citizen Plaza visible in the foreground/center.
- AI Agent Lab visible in the upper middle of the scene.
- Founder Tower visible behind AI Agent Lab if possible.
- Opportunity Center and Team Office visible near the lower sides.
- Navigation paths readable from the first view.

Mobile camera adjustment:

```text
position: [11, 10, 15]
target: [0, 0, -3]
fieldOfView: 50
```

## Suggested Navigation Flow

Primary user journey:

1. Spawn at Citizen Plaza.
2. Meet Workizen Guide.
3. Select AI Agent Lab.
4. Meet AI Architect.
5. Visit Knowledge Library.
6. Visit Opportunity Center.
7. Inspect an opportunity.
8. Visit Team Office.
9. See a recommended team concept.
10. Visit Compute Center.

Secondary strategy flow:

1. Spawn at Citizen Plaza.
2. Select Founder Tower.
3. View strategy/governance panel.
4. Return to Citizen Plaza.

## MVP Interaction Rules

Each district should support:

- Hover or focus feedback.
- Click selection.
- Info panel.
- Purpose description.
- Related NPC.
- Future capability note.

Each NPC should support:

- Click selection.
- Role panel.
- Short guided message.
- Allowed actions list.

Each citizen should support:

- Click selection.
- Citizen manifest panel.
- Skills, reputation placeholder, availability, status, and location.

## Implementation Boundary

This document is a design specification only.

Do not implement backend, blockchain, NFT, wallet, multiplayer, Ready Player Me, Mixamo, or Open WebUI in the MVP.

The first product implementation should happen in:

```text
apps/workizen-3d
```

The existing app:

```text
apps/workizen-3d-demo
```

should be treated as a POC/reference only.
