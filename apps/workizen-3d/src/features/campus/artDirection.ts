export const artDirection = {
  world: {
    sky: "#E8FAFF",
    fog: "#E8FAFF",
    fogNear: 30,
    fogFar: 58,
    grassOuter: "#8FE07B",
    grassInner: "#A4EB8D",
    water: "#59D8FF",
    oceanDeep: "#34BFF4",
    beach: "#FFE8A8",
    beachWet: "#F8D67A",
    path: "#E6D3A4",
    pathSecondary: "#DEC899",
    pathStone: "#F3E5C3",
    pathMarking: "#FFF4D0",
    plazaPaving: "#FFE3A8",
    plazaRing: "#E9B94D",
    platform: "#F3D9A2",
    islandShadow: "#7DCB6D"
  },
  lighting: {
    ambient: {
      color: "#FFF8E7",
      intensity: 0.92
    },
    hemisphere: {
      skyColor: "#ECFBFF",
      groundColor: "#A7E78D",
      intensity: 0.88
    },
    directional: {
      color: "#FFF3D6",
      position: [7, 14, 9] as [number, number, number],
      intensity: 0.92,
      shadowMapSize: [2048, 2048] as [number, number],
      shadowBias: -0.00008,
      shadowNormalBias: 0.025
    },
    toneMappingExposure: 1.18
  },
  districts: {
    citizenPlaza: {
      base: "#FFE3A8",
      accent: "#E9B94D",
      secondary: "#2F80ED"
    },
    aiAgentLab: {
      base: "#BFF8E4",
      accent: "#18C58F",
      secondary: "#45D7F5"
    },
    founderTower: {
      base: "#E7F2FF",
      accent: "#2F80ED",
      secondary: "#F6C84C"
    },
    knowledgeLibrary: {
      base: "#FFF1B8",
      accent: "#F5B82E",
      secondary: "#FFE3A8"
    },
    opportunityCenter: {
      base: "#FFD6C9",
      accent: "#FF7A6E",
      secondary: "#FF9AB3"
    },
    computeCenter: {
      base: "#C8F6FF",
      accent: "#16C7E8",
      secondary: "#2F80ED"
    },
    teamOffice: {
      base: "#E8DEFF",
      accent: "#9B6CFF",
      secondary: "#C7B5FF"
    }
  },
  ui: {
    panelBackground: "rgba(255, 255, 255, 0.92)",
    panelBorder: "rgba(191, 230, 255, 0.82)",
    panelShadow: "0 22px 70px rgba(37, 99, 235, 0.13)",
    softSurface: "#F7FCFF",
    active: "#2F80ED",
    activeHover: "#1D6FE0",
    accent: "#18C58F",
    text: "#0F172A",
    mutedText: "#496579"
  },
  materials: {
    tripoColorLift: 0.1,
    maxMetalness: 0.28,
    minRoughness: 0.48,
    maxRoughness: 0.92,
    envMapIntensity: 0.75,
    labelOutline: "#FFFFFF",
    brightWhite: "#FFFFFF",
    signFace: "#FFFFFF",
    warmPanel: "#FFF7D6",
    post: "#70899B",
    glass: "#E8FAFF"
  }
} as const;

export const districtPaletteById = {
  "citizen-plaza": artDirection.districts.citizenPlaza,
  "ai-agent-lab": artDirection.districts.aiAgentLab,
  "founder-tower": artDirection.districts.founderTower,
  "knowledge-library": artDirection.districts.knowledgeLibrary,
  "opportunity-center": artDirection.districts.opportunityCenter,
  "compute-center": artDirection.districts.computeCenter,
  "team-office": artDirection.districts.teamOffice
} as const;

export type DistrictPaletteId = keyof typeof districtPaletteById;
