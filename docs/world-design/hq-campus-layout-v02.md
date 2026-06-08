# Workizen HQ Campus Layout v02

Status: Canonical pre-code layout
Date: 2026-06-07

## Core Decisions

- Default Map: Workizen HQ Campus
- Default Spawn: Citizen Plaza
- Main Landmark: AI Agent Lab
- Canonical Layout: Variation D, revised for immediate MVP coding

Older layout documents are reference only. Use this file as the active source for runtime placement.

## District Layout

| Direction | District | Role |
| --- | --- | --- |
| Center | Citizen Plaza | Spawn, orientation, first contact |
| North | AI Agent Lab | Main landmark and visual anchor |
| North West | Founder Tower | Founder review and governance |
| North East | Knowledge Library | Knowledge, playbooks, expertise |
| West | Opportunity Center | Opportunity Marketplace |
| East | Compute Center | Compute Citizens and capacity |
| South | Team Office | Team formation and delivery planning |

## Suggested React Three Fiber Coordinates

| District | Position | Visual Priority |
| --- | --- | --- |
| Citizen Plaza | `[0, 0, 0]` | Spawn and center |
| AI Agent Lab | `[0, 0, -8]` | Highest landmark priority |
| Founder Tower | `[-7, 0, -8]` | Tall secondary landmark |
| Knowledge Library | `[7, 0, -8]` | Warm learning district |
| Opportunity Center | `[-8, 0, 0]` | Marketplace focus |
| Compute Center | `[8, 0, 0]` | Tech/resource focus |
| Team Office | `[0, 0, 7]` | Delivery destination |

## Product Flow

Citizen Plaza -> Opportunity Center -> Team Office

This is the business journey: arrive, discover work, form a team.

## Visual Flow

Citizen Plaza -> AI Agent Lab

This is the first-load visual journey: the Founder should immediately see the plaza and the AI Agent Lab as the main campus landmark.

## Camera Starting Position

- Camera position: `[10, 9.5, 15]`
- Camera target: `[0, 0, -3.2]`
- First view must include Citizen Plaza and AI Agent Lab.
- Founder Tower and Knowledge Library should be readable as side landmarks.

## Navigation Rules

- Paths must connect every district to Citizen Plaza.
- Opportunity Center must be easy to find from the plaza.
- Team Office must visually connect to Opportunity Center.
- AI Agent Lab must be larger/brighter/more detailed than other districts.
- The campus should feel like Animal Crossing/Zepeto, not a CAD model or cyberpunk city.
