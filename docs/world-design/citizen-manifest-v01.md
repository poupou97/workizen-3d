# Workizen Citizen Manifest v1

Status: REVIEW

Date: 2026-06-07

Project: Workizen 3D

## Purpose

The Citizen Manifest defines a common mock-data schema for citizens and NPC-like guide characters in Workizen HQ Campus.

The schema is for frontend-first MVP work using mock data. Backend integration will come later through Laravel REST APIs.

## Citizen Types

Supported citizen types:

- Human Citizen
- AI Citizen
- Knowledge Citizen
- Compute Citizen

## Common Manifest Schema

```json
{
  "citizen_id": "string",
  "citizen_type": "Human Citizen | AI Citizen | Knowledge Citizen | Compute Citizen",
  "name": "string",
  "role": "string",
  "description": "string",
  "skills": ["string"],
  "reputation": {
    "score": 0,
    "level": "string",
    "summary": "string"
  },
  "availability": "available | busy | offline | scheduled",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "string",
    "coordinates": [0, 0, 0]
  },
  "current_status": "string",
  "avatar_type": "placeholder | ready-player-me-later | device-placeholder | agent-placeholder",
  "interaction_type": "info_panel | npc_panel | opportunity_panel | compute_panel",
  "allowed_actions": ["string"]
}
```

## Field Rules

- `citizen_id`: stable lowercase identifier for mock data and future API mapping.
- `citizen_type`: one of the four approved citizen types.
- `name`: display name.
- `role`: product/work role, not a game class.
- `description`: short purpose statement.
- `skills`: visible skills for matching, panels, and future team recommendation.
- `reputation`: placeholder in MVP; no production scoring rules yet.
- `availability`: frontend display state only in MVP.
- `location`: current world, district, and suggested scene coordinates.
- `current_status`: short live-state text for UI panels.
- `avatar_type`: placeholder strategy for MVP.
- `interaction_type`: determines the panel style.
- `allowed_actions`: visible actions; actions can be disabled or mock-only in MVP.

## Example Manifests

### Founder

```json
{
  "citizen_id": "founder",
  "citizen_type": "Human Citizen",
  "name": "Founder",
  "role": "Workizen Founder",
  "description": "Sets product direction, reviews governance, and approves Workizen HQ Campus milestones.",
  "skills": ["strategy", "product vision", "governance", "market design"],
  "reputation": {
    "score": 100,
    "level": "Founder",
    "summary": "Initial authority for project direction and approval."
  },
  "availability": "scheduled",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "Founder Tower",
    "coordinates": [0, 0, -14]
  },
  "current_status": "Reviewing pre-coding specifications.",
  "avatar_type": "placeholder",
  "interaction_type": "info_panel",
  "allowed_actions": ["view_strategy", "review_roadmap", "approve_scope"]
}
```

### AI Architect

```json
{
  "citizen_id": "ai-architect",
  "citizen_type": "AI Citizen",
  "name": "AI Architect",
  "role": "AI Systems Guide",
  "description": "Explains AI Citizens, agent workflows, and future automation capabilities.",
  "skills": ["agent design", "workflow automation", "AI architecture", "prompt systems"],
  "reputation": {
    "score": 82,
    "level": "Expert Guide",
    "summary": "Trusted guide for AI-native Workizen concepts."
  },
  "availability": "available",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "AI Agent Lab",
    "coordinates": [0, 0, -5.8]
  },
  "current_status": "Introducing citizens to the AI Agent Lab.",
  "avatar_type": "agent-placeholder",
  "interaction_type": "npc_panel",
  "allowed_actions": ["view_ai_lab", "learn_ai_citizens", "inspect_future_agents"]
}
```

### Opportunity Manager

```json
{
  "citizen_id": "opportunity-manager",
  "citizen_type": "Human Citizen",
  "name": "Opportunity Manager",
  "role": "Opportunity Marketplace Guide",
  "description": "Helps citizens discover available work and understand how teams are formed.",
  "skills": ["opportunity discovery", "matching", "market operations", "work intake"],
  "reputation": {
    "score": 76,
    "level": "Marketplace Guide",
    "summary": "Known for connecting citizens to suitable opportunities."
  },
  "availability": "available",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "Opportunity Center",
    "coordinates": [-5, 0, 3.4]
  },
  "current_status": "Preparing starter opportunities for new citizens.",
  "avatar_type": "placeholder",
  "interaction_type": "npc_panel",
  "allowed_actions": ["view_opportunities", "inspect_team_match", "start_welcome_mission"]
}
```

### Knowledge Manager

```json
{
  "citizen_id": "knowledge-manager",
  "citizen_type": "Knowledge Citizen",
  "name": "Knowledge Manager",
  "role": "Knowledge Library Guide",
  "description": "Guides citizens to reusable playbooks, learning paths, and expert knowledge.",
  "skills": ["knowledge curation", "learning design", "playbooks", "mentoring"],
  "reputation": {
    "score": 79,
    "level": "Knowledge Guide",
    "summary": "Maintains trusted knowledge paths for citizens and AI agents."
  },
  "availability": "available",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "Knowledge Library",
    "coordinates": [-5.8, 0, -5]
  },
  "current_status": "Organizing starter learning paths.",
  "avatar_type": "placeholder",
  "interaction_type": "npc_panel",
  "allowed_actions": ["view_learning_paths", "inspect_playbooks", "recommend_knowledge"]
}
```

### Compute Manager

```json
{
  "citizen_id": "compute-manager",
  "citizen_type": "Compute Citizen",
  "name": "Compute Manager",
  "role": "Compute Resource Guide",
  "description": "Explains compute citizens, workload capacity, and future AI job execution.",
  "skills": ["compute allocation", "queue monitoring", "AI workloads", "infrastructure"],
  "reputation": {
    "score": 73,
    "level": "Compute Guide",
    "summary": "Coordinates compute resource visibility for the campus."
  },
  "availability": "available",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "Compute Center",
    "coordinates": [5.8, 0, -5]
  },
  "current_status": "Monitoring mock compute capacity.",
  "avatar_type": "device-placeholder",
  "interaction_type": "compute_panel",
  "allowed_actions": ["view_compute_capacity", "inspect_mock_queue", "learn_compute_citizens"]
}
```

### Project Manager

```json
{
  "citizen_id": "project-manager",
  "citizen_type": "Human Citizen",
  "name": "Project Manager",
  "role": "Team Formation Guide",
  "description": "Helps form project teams from human, AI, knowledge, and compute citizens.",
  "skills": ["project coordination", "team formation", "delivery tracking", "status reporting"],
  "reputation": {
    "score": 81,
    "level": "Delivery Guide",
    "summary": "Trusted for turning opportunities into coordinated team delivery."
  },
  "availability": "available",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "Team Office",
    "coordinates": [5, 0, 3.4]
  },
  "current_status": "Preparing a starter team composition.",
  "avatar_type": "placeholder",
  "interaction_type": "npc_panel",
  "allowed_actions": ["view_team_office", "inspect_recommended_team", "view_delivery_flow"]
}
```

### MacBook M1 Compute Citizen

```json
{
  "citizen_id": "macbook-m1-compute-citizen",
  "citizen_type": "Compute Citizen",
  "name": "MacBook M1 Compute Citizen",
  "role": "Local Compute Node",
  "description": "Represents a personal compute resource that may later contribute capacity to AI workloads.",
  "skills": ["local inference", "development tasks", "automation runner", "light compute"],
  "reputation": {
    "score": 44,
    "level": "Starter Compute",
    "summary": "Early compute citizen placeholder for MVP visualization."
  },
  "availability": "scheduled",
  "location": {
    "world": "Workizen HQ Campus",
    "district": "Compute Center",
    "coordinates": [7.2, 0, -4.2]
  },
  "current_status": "Registered as a mock compute citizen.",
  "avatar_type": "device-placeholder",
  "interaction_type": "compute_panel",
  "allowed_actions": ["view_device_profile", "inspect_capacity_placeholder", "learn_compute_role"]
}
```

## MVP Boundary

This manifest is for mock frontend data only.

Do not implement production identity, production reputation scoring, production wallet logic, blockchain, NFT ownership, or real compute scheduling in the MVP.
