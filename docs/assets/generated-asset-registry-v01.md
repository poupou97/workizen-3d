# Generated Asset Registry v01

Status: Active  
Project: Workizen 3D  
Purpose: Track AI-generated or AI-assisted assets from source prompt through review and runtime integration.

## Registry Rules

- Every generated visual asset must be registered before runtime integration.
- Every registered asset must include enough metadata to trace source tool, prompt file, output path, intended district, review status, and integration status.
- Runtime assets without metadata must be treated as audit gaps until reviewed.
- API call history must be cross-checkable through `logs/tripo/`.

## Registry

| asset_id | asset_name | type | source_tool | source_prompt_file | output_path | format | target_district | status | style_score | integration_status | notes |
|---|---|---|---|---|---|---|---|---|---:|---|---|
| SM_Bld_AIAgentLab_01 | AI Agent Lab | Building | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Bld_AIAgentLab_01.glb` | GLB | AI Agent Lab | INTEGRATED | 7 | Integrated | Listed in asset validation report; native Tripo PBR materials. |
| SM_Bld_FounderTower_01 | Founder Tower | Building | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Bld_FounderTower_01.glb` | GLB | Founder Tower | INTEGRATED | 6 | Integrated | Landmark building; style should continue to be checked against Workizen standard. |
| SM_Bld_KnowledgeLibrary_01 | Knowledge Library | Building | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Bld_KnowledgeLibrary_01.glb` | GLB | Knowledge Library | INTEGRATED | 7 | Integrated | Strong fit for low-poly civic campus. |
| SM_Bld_ComputeCenter_01 | Compute Center | Building | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Bld_ComputeCenter_01.glb` | GLB | Compute Center | INTEGRATED | 6 | Integrated | Needs ongoing scale/material review for district readability. |
| SM_Bld_OpportunityCenter_01 | Opportunity Center | Building | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Bld_OpportunityCenter_01.glb` | GLB | Opportunity Center | INTEGRATED | 7 | Integrated | Marketplace landmark. |
| SM_Bld_TeamOffice_01 | Team Office | Building | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Bld_TeamOffice_01.glb` | GLB | Team Office | INTEGRATED | 6 | Integrated | Raw height differs from normalized building assets; scale must be preserved. |
| SM_Env_CherryBlossom_01 | Cherry Blossom 01 | Environment | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Env_CherryBlossom_01.glb` | GLB | Campus Environment | REVIEWED | 8 | Available | Listed in asset validation report; decorative environment asset. |
| SM_Env_CherryBlossom_02 | Cherry Blossom 02 | Environment | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Env_CherryBlossom_02.glb` | GLB | Campus Environment | REVIEWED | 8 | Available | Variant for campus planting. |
| SM_Env_PalmTree_01 | Palm Tree | Environment | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Env_PalmTree_01.glb` | GLB | Campus Environment | REVIEWED | 7 | Available | Coastal/perimeter use only. |
| SM_Env_Bamboo_01 | Bamboo | Environment | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Env_Bamboo_01.glb` | GLB | Campus Environment | REVIEWED | 7 | Available | Garden/perimeter use. |
| SM_Prop_Blimp_01 | Blimp | Prop | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Prop_Blimp_01.glb` | GLB | Campus Environment | REVIEWED | 8 | Available | Use carefully; should not occlude default camera. |
| SM_Prop_Pier_01 | Pier | Prop | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Prop_Pier_01.glb` | GLB | Campus Environment | REVIEWED | 7 | Available | Coastal dock asset. |
| SM_Prop_InfoBoard_01 | Info Board | Prop | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Prop_InfoBoard_01.glb` | GLB | Campus Environment | REVIEWED | 7 | Available | Wayfinding / signage candidate. |
| SM_Chr_RobotCitizen_01 | Robot Citizen | Character | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Chr_RobotCitizen_01.glb` | GLB | AI Agent Lab | DRAFT | TBD | Blocked | Raw dimensions are not scene-scale normalized; do not integrate until character scale pass. |
| SM_Chr_HumanCitizen_01 | Human Citizen 01 | Character | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_01.glb` | GLB | Citizen Plaza | DRAFT | TBD | Blocked | Raw dimensions are not scene-scale normalized; do not integrate until character scale pass. |
| SM_Chr_HumanCitizen_02 | Human Citizen 02 | Character | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Chr_HumanCitizen_02.glb` | GLB | Citizen Plaza | DRAFT | TBD | Blocked | Raw dimensions are not scene-scale normalized; do not integrate until character scale pass. |
| SM_Chr_KnowledgeCitizen_01 | Knowledge Citizen | Character | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Chr_KnowledgeCitizen_01.glb` | GLB | Knowledge Library | DRAFT | TBD | Blocked | Raw dimensions are not scene-scale normalized; do not integrate until character scale pass. |
| SM_Chr_ComputeCitizen_01 | Compute Citizen | Character | Tripo AI | TBD | `apps/workizen-3d/public/assets/models/SM_Chr_ComputeCitizen_01.glb` | GLB | Compute Center | DRAFT | TBD | Blocked | Raw dimensions are not scene-scale normalized; do not integrate until character scale pass. |

