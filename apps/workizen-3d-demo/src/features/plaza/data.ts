import type { Building, Citizen, District, Opportunity } from "./types";

export const districts: District[] = [
  {
    id: "citizen-plaza",
    name: "Citizen Plaza Center",
    type: "district",
    description: "A friendly town square where Digital Citizens gather, learn, and find meaningful work.",
    futureCapability: "Live presence, guided onboarding, and event programming.",
    position: [0, 0.04, 0],
    color: "#F7DFA6"
  }
];

export const buildings: Building[] = [
  {
    id: "ai-agent-lab",
    name: "AI Agent Lab",
    type: "building",
    districtId: "citizen-plaza",
    description: "A playful lab for future AI citizen assistants, workflows, and automation experiments.",
    futureCapability: "Ready Player Me agent hosts and Colyseus-powered multiplayer collaboration.",
    position: [-5.2, 0.9, -2.8],
    size: [2.2, 1.8, 2.2],
    color: "#B8F2D0",
    roofColor: "#4CBF89"
  },
  {
    id: "knowledge-library",
    name: "Knowledge Library",
    type: "building",
    districtId: "citizen-plaza",
    description: "A calm library where citizens discover playbooks, lessons, and work guidance.",
    futureCapability: "Personalized learning paths and searchable WorkforceOS knowledge.",
    position: [0, 1, -4.4],
    size: [2.8, 2, 2.2],
    color: "#FFE3A3",
    roofColor: "#FFB84D"
  },
  {
    id: "compute-center",
    name: "Compute Center",
    type: "building",
    districtId: "citizen-plaza",
    description: "A compact operations hub for compute citizens and task orchestration.",
    futureCapability: "Real-time job queues, simulation dashboards, and agent workload visibility.",
    position: [5.1, 1.1, -2.6],
    size: [2.4, 2.2, 2.2],
    color: "#BFE1FF",
    roofColor: "#5BA8F5"
  },
  {
    id: "opportunity-board",
    name: "Opportunity Board",
    type: "building",
    districtId: "citizen-plaza",
    description: "A public board where citizens preview available civic work and learning missions.",
    futureCapability: "Marketplace listings, assignment matching, and team mission boards.",
    position: [-4.6, 0.75, 3.3],
    size: [2.7, 1.5, 1.2],
    color: "#FFD0C4",
    roofColor: "#FF8E72"
  },
  {
    id: "team-office",
    name: "Team Office",
    type: "building",
    districtId: "citizen-plaza",
    description: "A neat workspace for teams, mentors, and operators to coordinate citizen projects.",
    futureCapability: "Shared rooms, project boards, and multiplayer team presence.",
    position: [4.8, 0.95, 3.1],
    size: [2.5, 1.9, 2],
    color: "#D9D0FF",
    roofColor: "#8A76FF"
  }
];

export const citizens: Citizen[] = [
  {
    id: "human-citizen",
    name: "Human Citizen",
    type: "citizen",
    role: "human",
    description: "A chibi placeholder for a person joining Workizen to learn, contribute, and grow.",
    futureCapability: "Ready Player Me avatar import, profile identity, and personal progression.",
    position: [-1.6, 0.85, 1.2],
    color: "#FFB7A8",
    accentColor: "#3656D4"
  },
  {
    id: "ai-citizen",
    name: "AI Citizen",
    type: "citizen",
    role: "ai",
    description: "A friendly AI helper citizen that can guide users through tasks and spaces.",
    futureCapability: "Agent behaviors, speech bubbles, and workflow copilots.",
    position: [1.5, 0.85, 1],
    color: "#B8F2D0",
    accentColor: "#2E8B69"
  },
  {
    id: "knowledge-citizen",
    name: "Knowledge Citizen",
    type: "citizen",
    role: "knowledge",
    description: "A learning-focused citizen representing guides, lessons, and shared know-how.",
    futureCapability: "Contextual knowledge retrieval and personalized learning mentors.",
    position: [-1.1, 0.85, -1.2],
    color: "#FFE3A3",
    accentColor: "#9B6A00"
  },
  {
    id: "compute-citizen",
    name: "Compute Citizen",
    type: "citizen",
    role: "compute",
    description: "A systems-oriented citizen for compute tasks, automation, and operations.",
    futureCapability: "Queue monitoring, simulation helpers, and compute resource visualization.",
    position: [1.2, 0.85, -1.4],
    color: "#BFE1FF",
    accentColor: "#2369A8"
  }
];

export const opportunities: Opportunity[] = [
  {
    id: "welcome-mission",
    name: "Welcome Mission",
    type: "opportunity",
    description: "A starter mission introducing citizens to the plaza, library, and opportunity board.",
    futureCapability: "Guided onboarding missions connected to the real Opportunity Marketplace.",
    position: [-4.6, 1.8, 3.3],
    status: "open"
  },
  {
    id: "knowledge-sprint",
    name: "Knowledge Sprint",
    type: "opportunity",
    description: "A learning mission that turns Workizen playbooks into citizen-ready guidance.",
    futureCapability: "Team learning sprints with progress tracking and reputation events.",
    position: [0, 2.2, -4.4],
    status: "future"
  }
];
