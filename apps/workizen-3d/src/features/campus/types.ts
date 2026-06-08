export type Vector3Tuple = [number, number, number];

export type SelectionKind = "district" | "npc" | "citizen" | "opportunity" | "team" | "vision";

export type CitizenType = "Human Citizen" | "AI Citizen" | "Knowledge Citizen" | "Compute Citizen";

export type Availability = "available" | "busy" | "offline" | "scheduled";

export interface District {
  id: string;
  name: string;
  description: string;
  purpose: string;
  activeCitizenIds: string[];
  opportunityIds: string[];
  npcIds: string[];
  position: Vector3Tuple;
  size: Vector3Tuple;
  color: string;
  accentColor: string;
}

export interface Reputation {
  score: number;
  level: string;
  summary: string;
}

export interface CitizenManifest {
  citizen_id: string;
  citizen_type: CitizenType;
  name: string;
  role: string;
  description: string;
  skills: string[];
  reputation: Reputation;
  availability: Availability;
  location: {
    world: "Workizen HQ Campus";
    district: string;
    coordinates: Vector3Tuple;
  };
  current_status: string;
  avatar_type: "placeholder" | "knowledge-placeholder" | "compute-human-placeholder" | "ready-player-me-later" | "device-placeholder" | "agent-placeholder";
  interaction_type: "info_panel" | "npc_panel" | "opportunity_panel" | "compute_panel";
  allowed_actions: string[];
  color: string;
  accentColor: string;
}

export interface Npc {
  id: string;
  name: string;
  citizenType: CitizenType;
  role: string;
  purpose: string;
  districtId: string;
  position: Vector3Tuple;
  color: string;
  accentColor: string;
  allowedActions: string[];
}

export interface RecommendedTeamMember {
  role: string;
  name: string;
  citizenType: CitizenType;
}

export interface Opportunity {
  id: string;
  name: string;
  description: string;
  purpose: string;
  districtId: string;
  status: "open" | "draft" | "featured";
  difficulty: "starter" | "standard" | "advanced";
  position: Vector3Tuple;
  recommendedTeam: RecommendedTeamMember[];
}

export interface DemoStep {
  id: string;
  title: string;
  summary: string;
  selection: {
    kind: SelectionKind;
    id: string;
  };
}

export interface Selection {
  kind: SelectionKind;
  id: string;
}
