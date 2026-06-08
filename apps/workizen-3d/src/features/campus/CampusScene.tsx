"use client";

import { Float, OrbitControls, PerspectiveCamera, Text, useAnimations, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { artDirection } from "./artDirection";
import { citizens, districts, npcs, opportunities } from "./data";
import { useCampusStore } from "./store";
import type { CitizenManifest, District, Npc, Opportunity, Vector3Tuple } from "./types";

function stopAndRun(event: ThreeEvent<MouseEvent>, action: () => void) {
  event.stopPropagation();
  action();
}

// ── Synty Polygon Town Assets ─────────────────────────────────────────────────

const SYNTY_PALETTE = "/assets/textures/PolygonTown_Texture_01_A.png"

// ─────────────────────────────────────────────────────────────────────────────
// SCENE HEIGHT CONVENTION — 1 scene unit = 1 meter
//
// HEIGHT.*  = target height in meters for every asset type
//
// tripoH(targetH, rawH?)  — returns { scale, yOffset } for any Tripo GLB:
//   scale   = targetH / rawH        (stretch to reach target height)
//   yOffset = targetH / 2           (lift center to ground, always correct)
//
// NOTE: rawH is the GLB's actual Y bounding-box size. Most Tripo models are
// normalized to rawH≈1.0. Exceptions with measured rawH:
//   TeamOffice  rawH = 0.766   → tripoH(HEIGHT.BLD_S, 0.766)
//   Pier        rawH = 0.377   → tripoH(HEIGHT.PIER, 0.377)
//   Blimp       rawH = 0.556   → floating prop, use scale directly
//
// HEIGHT LADDER (shortest → tallest, meters):
//   DEVICE   0.85  compute terminal      procedural
//   ROBOT    1.10  AI agent robot        Tripo rawH≈1.0
//   HUMAN    1.20  human citizen         Tripo rawH≈1.0
//   BAMBOO   2.50  bamboo cluster        Tripo rawH=1.000
//   CHERRY   3.50  cherry blossom        Tripo rawH=0.974
//   BLD_S    3.50  team office           Tripo rawH=0.766 (tripoH corrects scale)
//   BLD_L    4.20  AI Agent Lab           Tripo rawH≈1.0
//   BLD_M    3.50  library/compute/opp   Tripo rawH≈1.0
//   PALM     4.50  palm tree             Tripo rawH=0.997
//   TOWER    4.50  founder tower         Tripo rawH=1.000
//   ─────    4.69  Synty deciduous tree  scale=0.010  ← reference, do not change
//   ─────    5.48  Synty pine tree       scale=0.010  ← reference, do not change
//
// Synty asset heights (measured, calibrated — DO NOT change scale values):
//   SM_Env_Tree_01          scale=0.010 → 4.69m
//   SM_Env_Tree_Pine_01     scale=0.010 → 5.48m
//   SM_Env_Tree_Large_01    scale=0.004 → 4.65m
//   SM_Prop_Fountain_01     scale=0.012 → 1.82m
//   SM_Prop_Bookshelf_01    scale=0.010 → 2.19m
//   SM_Prop_Desk_01         scale=0.012 → 1.05m
// ─────────────────────────────────────────────────────────────────────────────

function tripoH(targetH: number, rawH = 1.0): { scale: number; yOffset: number } {
  return { scale: targetH / rawH, yOffset: targetH / 2 }
}

const HEIGHT = {
  // Characters (Tripo rawH ≈ 1.0)
  HUMAN:   1.20,  // human citizen
  ROBOT:   1.10,  // AI agent robot
  DEVICE:  0.85,  // compute terminal (procedural — label reference only)

  // Vegetation (Tripo)
  BAMBOO:  2.50,  // bamboo cluster
  CHERRY:  3.50,  // cherry blossom
  PALM:    4.50,  // palm tree

  // Buildings (Tripo)
  TOWER:   4.50,  // founder tower — district landmark
  BLD_L:   4.20,  // AI Agent Lab — main north landmark
  BLD_M:   3.50,  // knowledge library / compute center / opportunity center
  BLD_S:   3.50,  // team office (rawH=0.766 → use tripoH with rawH arg)

  // Props (Tripo)
  PIER:    1.50,  // dock pier (rawH=0.377 → use tripoH with rawH arg)
  BLIMP:   4.00,  // airship (floating — direct scale, rawH=0.556)
} as const

const SYNTY_TREE_PATHS = [
  "/assets/models/SM_Generic_Tree_01.glb",
  "/assets/models/SM_Generic_Tree_02.glb",
  "/assets/models/SM_Generic_Tree_03.glb",
  "/assets/models/SM_Generic_Tree_04.glb",
] as const

// Preload all Synty assets at module load
SYNTY_TREE_PATHS.forEach(p => useGLTF.preload(p))
;[
  // environment
  "/assets/models/SM_Env_Bush_01.glb",
  "/assets/models/SM_Env_Bush_02.glb",
  "/assets/models/SM_Env_FlowerPatch_01.glb",
  "/assets/models/SM_Env_FlowerPatch_02.glb",
  "/assets/models/SM_Env_Tree_01.glb",
  "/assets/models/SM_Env_Tree_Pine_01.glb",
  "/assets/models/SM_Env_Tree_Large_01.glb",
  "/assets/models/SM_Env_Hedge_01.glb",
  "/assets/models/SM_Env_Hedge_02.glb",
  "/assets/models/SM_Env_Hedge_03.glb",
  // props
  "/assets/models/SM_Prop_ParkBench_01.glb",
  "/assets/models/SM_Prop_Streetlamp_01.glb",
  "/assets/models/SM_Prop_Streetlamp_02.glb",
  "/assets/models/SM_Prop_Fountain_01.glb",
  "/assets/models/SM_Prop_Fountain_Base_01.glb",
  "/assets/models/SM_Prop_Bookshelf_01.glb",
  "/assets/models/SM_Prop_Bookshelf_02.glb",
  "/assets/models/SM_Prop_Antenna_01.glb",
  "/assets/models/SM_Prop_SolarPanel_01.glb",
  "/assets/models/SM_Prop_Computer_Screen_01.glb",
  "/assets/models/SM_Prop_VendingMachine_01.glb",
  "/assets/models/SM_Prop_ShopCounter_01.glb",
  "/assets/models/SM_Prop_Desk_01.glb",
  "/assets/models/SM_Prop_Sign_01.glb",
  // clouds & rocks
  "/assets/models/SM_Generic_Cloud_01.glb",
  "/assets/models/SM_Generic_Cloud_02.glb",
  "/assets/models/SM_Generic_Cloud_03.glb",
  "/assets/models/SM_Generic_Small_Rocks_01.glb",
  "/assets/models/SM_Generic_Small_Rocks_02.glb",
  // Tripo buildings
  "/assets/models/SM_Bld_AIAgentLab_01.glb",
  "/assets/models/SM_Bld_FounderTower_01.glb",
  "/assets/models/SM_Bld_KnowledgeLibrary_01.glb",
  "/assets/models/SM_Bld_ComputeCenter_01.glb",
  "/assets/models/SM_Bld_OpportunityCenter_01.glb",
  "/assets/models/SM_Bld_TeamOffice_01.glb",
  // Tripo environment
  "/assets/models/SM_Env_CherryBlossom_01.glb",
  "/assets/models/SM_Env_CherryBlossom_02.glb",
  "/assets/models/SM_Env_PalmTree_01.glb",
  "/assets/models/SM_Env_Bamboo_01.glb",
  // Tripo props
  "/assets/models/SM_Prop_Blimp_01.glb",
  "/assets/models/SM_Prop_Pier_01.glb",
  "/assets/models/SM_Prop_InfoBoard_01.glb",
  // Tripo characters
  "/assets/models/SM_Chr_HumanCitizen_01.glb",
  "/assets/models/SM_Chr_HumanCitizen_02.glb",
  "/assets/models/SM_Chr_RobotCitizen_01.glb",
  "/assets/models/SM_Chr_KnowledgeCitizen_01.glb",
  "/assets/models/SM_Chr_ComputeCitizen_01.glb",
  // Mixamo animations (rigged skeleton clips)
  "/assets/animations/Idle.glb",
  "/assets/animations/Walking.glb",
  "/assets/animations/Wave.glb",
  "/assets/animations/Typing.glb",
  "/assets/animations/Talking.glb",
  "/assets/animations/Pointing.glb",
].forEach(p => useGLTF.preload(p))

function SyntyModel({
  path,
  scale = 0.01,
  position,
  rotation,
  yOffset = 0,
}: {
  path: string
  scale?: number
  position: Vector3Tuple
  rotation?: [number, number, number]
  yOffset?: number
}) {
  const { scene } = useGLTF(path)
  const palette = useTexture(SYNTY_PALETTE)

  const cloned = useMemo(() => {
    const copy = scene.clone(true)
    palette.flipY = false
    palette.colorSpace = THREE.SRGBColorSpace
    copy.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshStandardMaterial({ map: palette, roughness: 0.82 })
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
    return copy
  }, [scene, palette])

  const [x, y, z] = position
  return (
    <primitive
      object={cloned}
      scale={scale}
      position={[x, y + yOffset, z]}
      rotation={rotation ?? [0, 0, 0]}
    />
  )
}

// ── Tripo3D Assets (native PBR, no palette override) ─────────────────────────

function TripoModel({
  path,
  scale = 1.0,
  position,
  rotation,
  yOffset = 0,
}: {
  path: string
  scale?: number
  position: Vector3Tuple
  rotation?: [number, number, number]
  yOffset?: number
}) {
  const { scene } = useGLTF(path)

  const cloned = useMemo(() => {
    const copy = scene.clone(true)
    copy.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        const normalized = materials.map((material) => {
          const clonedMaterial = material.clone()
          normalizeTripoMaterial(clonedMaterial)
          return clonedMaterial
        })
        mesh.material = Array.isArray(mesh.material) ? normalized : normalized[0]
      }
    })
    return copy
  }, [scene])

  const [x, y, z] = position
  return (
    <primitive
      object={cloned}
      scale={scale}
      position={[x, y + yOffset, z]}
      rotation={rotation ?? [0, 0, 0]}
    />
  )
}

function normalizeTripoMaterial(material: THREE.Material) {
  const mat = material as THREE.MeshStandardMaterial
  if (mat?.map) mat.map.colorSpace = THREE.SRGBColorSpace
  if (mat?.color) mat.color.lerp(new THREE.Color(artDirection.materials.brightWhite), artDirection.materials.tripoColorLift)
  if (typeof mat.metalness === "number") mat.metalness = Math.min(mat.metalness, artDirection.materials.maxMetalness)
  if (typeof mat.roughness === "number") {
    mat.roughness = Math.min(
      artDirection.materials.maxRoughness,
      Math.max(artDirection.materials.minRoughness, mat.roughness)
    )
  }
  if ("envMapIntensity" in mat) mat.envMapIntensity = artDirection.materials.envMapIntensity
  mat.needsUpdate = true
}

function createOrganicIslandShape(radiusX: number, radiusZ: number, wobble = 0.08) {
  const shape = new THREE.Shape()
  const segments = 72

  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2
    const organic =
      1 +
      Math.sin(angle * 3 + 0.4) * wobble +
      Math.cos(angle * 5 - 0.7) * wobble * 0.55 +
      Math.sin(angle * 7 + 1.8) * wobble * 0.28
    const x = Math.cos(angle) * radiusX * organic
    const z = Math.sin(angle) * radiusZ * organic
    if (index === 0) {
      shape.moveTo(x, z)
    } else {
      shape.lineTo(x, z)
    }
  }

  return shape
}

// AnimatedModel: dùng cho GLB có đầy đủ skeleton + animations (Ready Player Me, Mixamo với mesh)
// Tripo characters hiện tại không có skeleton → dùng TripoModel thay thế
function AnimatedModel({
  modelPath,
  animPath,
  clipName,
  position,
  scale = 1.0,
  rotation,
}: {
  modelPath: string
  animPath: string
  clipName?: string
  position: Vector3Tuple
  scale?: number
  rotation?: [number, number, number]
}) {
  const group = useRef<THREE.Group>(null!)
  const { scene } = useGLTF(modelPath)
  const { animations } = useGLTF(animPath)
  const cloned = useMemo(() => cloneSkeleton(scene), [scene])
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const name = clipName ?? Object.keys(actions)[0]
    if (name && actions[name]) actions[name].reset().fadeIn(0.3).play()
    return () => { Object.values(actions).forEach(a => a?.stop()) }
  }, [actions, clipName])

  const [x, y, z] = position
  return (
    <group ref={group} position={[x, y, z]} scale={scale} rotation={rotation ?? [0, 0, 0]}>
      <primitive object={cloned} />
    </group>
  )
}

// ── Ground & Paths ────────────────────────────────────────────────────────────

function CampusGround() {
  const beachShape = useMemo(() => createOrganicIslandShape(17.4, 15.8, 0.055), [])
  const wetBeachShape = useMemo(() => createOrganicIslandShape(16.7, 15.1, 0.06), [])
  const grassShape = useMemo(() => createOrganicIslandShape(15.4, 13.7, 0.075), [])
  const innerGrassShape = useMemo(() => createOrganicIslandShape(13.4, 11.5, 0.065), [])

  return (
    <group>
      {/* Ocean boundary */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, -0.3]}>
        <planeGeometry args={[76, 70]} />
        <meshStandardMaterial color={artDirection.world.oceanDeep} roughness={0.1} metalness={0.02} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.205, -0.3]}>
        <circleGeometry args={[16.5, 96]} />
        <meshStandardMaterial color={artDirection.world.water} roughness={0.09} metalness={0.03} transparent opacity={0.62} />
      </mesh>
      {/* Organic beach and island landmass */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.095, -0.35]}>
        <shapeGeometry args={[beachShape]} />
        <meshStandardMaterial color={artDirection.world.beach} roughness={0.84} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.087, -0.35]}>
        <shapeGeometry args={[wetBeachShape]} />
        <meshStandardMaterial color={artDirection.world.beachWet} roughness={0.82} transparent opacity={0.76} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, -0.35]}>
        <shapeGeometry args={[grassShape]} />
        <meshStandardMaterial color={artDirection.world.grassOuter} roughness={0.86} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.045, -0.35]}>
        <shapeGeometry args={[innerGrassShape]} />
        <meshStandardMaterial color={artDirection.world.grassInner} roughness={0.86} />
      </mesh>
      <CampusPaths />
      <WaterfrontDetails />
      <PlazaDetails />
      <WorkizenBranding />
      <CampusDecor />
    </group>
  );
}

function CampusPaths() {
  const paths: { position: Vector3Tuple; scale: Vector3Tuple; rotation: number; color?: string }[] = [
    // Main N-S axis (plaza to AI Lab)
    { position: [0, 0.012, -4.0], scale: [1.3, 1, 8.5], rotation: 0, color: artDirection.world.path },
    // W diagonal (plaza to Founder Tower)
    { position: [-4.1, 0.013, -3.8], scale: [1.1, 1, 7.8], rotation: -Math.PI / 4.2 },
    // E diagonal (plaza to Library)
    { position: [4.1, 0.013, -3.8], scale: [1.1, 1, 7.8], rotation: Math.PI / 4.2 },
    // W axis (plaza to Opportunity Center)
    { position: [-4.1, 0.014, 0], scale: [1.25, 1, 9.0], rotation: Math.PI / 2 },
    // E axis (plaza to Compute Center)
    { position: [4.1, 0.014, 0], scale: [1.25, 1, 9.0], rotation: Math.PI / 2 },
    // S axis (plaza to Team Office)
    { position: [0, 0.015, 3.8], scale: [1.2, 1, 7.8], rotation: 0 },
    // SW connection (Opportunity to Team Office)
    { position: [-4.2, 0.016, 3.7], scale: [0.85, 1, 7.8], rotation: -Math.PI / 3.7, color: artDirection.world.pathSecondary },
    // Secondary N path extension (AI Lab to northern perimeter)
    { position: [0, 0.012, -10.5], scale: [1.0, 1, 4.0], rotation: 0, color: artDirection.world.pathSecondary },
    // W-side loop (Opp to Founder connector)
    { position: [-7.5, 0.013, -4.2], scale: [0.9, 1, 7.5], rotation: -Math.PI / 5.5, color: artDirection.world.pathSecondary }
  ];

  return (
    <group>
      {paths.map((path, index) => (
        <Path key={index} {...path} />
      ))}
      {/* Soft stone outer circulation loop */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, -0.2]} scale={[1.28, 1.0, 1.02]}>
        <ringGeometry args={[8.1, 8.55, 96]} />
        <meshStandardMaterial color={artDirection.world.pathSecondary} roughness={0.8} transparent opacity={0.9} />
      </mesh>
      {/* Citizen Plaza circle */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial color={artDirection.world.plazaPaving} roughness={0.78} />
      </mesh>
      {/* Plaza inner ring accent */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[2.75, 3.14, 64]} />
        <meshStandardMaterial color={artDirection.world.plazaRing} roughness={0.7} />
      </mesh>
      {/* Crosswalk markings at district entrances */}
      <CrosswalkMark position={[0, 0.018, -3.4]} />
      <CrosswalkMark position={[-3.4, 0.018, 0]} rotation={Math.PI / 2} />
      <CrosswalkMark position={[3.4, 0.018, 0]} rotation={Math.PI / 2} />
      <CrosswalkMark position={[0, 0.018, 3.4]} />
    </group>
  );
}

function CrosswalkMark({ position, rotation = 0 }: { position: Vector3Tuple; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[-0.3, 0, 0.3].map((x) => (
        <mesh key={x} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.005, 0]}>
          <planeGeometry args={[0.18, 0.72]} />
          <meshStandardMaterial color={artDirection.world.pathMarking} roughness={0.76} />
        </mesh>
      ))}
    </group>
  );
}

function Path({
  position,
  rotation,
  scale,
  color = artDirection.world.path
}: {
  position: Vector3Tuple;
  rotation: number;
  scale: Vector3Tuple;
  color?: string;
}) {
  const width = 0.92 * scale[0];
  const length = scale[2];
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>
      {[-length / 2, length / 2].map((z) => (
        <mesh key={z} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, z]}>
          <circleGeometry args={[width / 2, 24]} />
          <meshStandardMaterial color={color} roughness={0.78} />
        </mesh>
      ))}
      {[-0.22, 0.22].map((offset) => (
        <mesh key={offset} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[offset * width, 0.004, 0]}>
          <planeGeometry args={[0.08, length * 0.92]} />
          <meshStandardMaterial color={artDirection.world.pathStone} roughness={0.82} transparent opacity={0.34} />
        </mesh>
      ))}
    </group>
  );
}

// ── Plaza Details ─────────────────────────────────────────────────────────────

function PlazaDetails() {
  return (
    <group>
      {/* Synty fountain */}
      <SyntyModel path="/assets/models/SM_Prop_Fountain_Base_01.glb" position={[0, 0, 0]} scale={0.012} />
      <SyntyModel path="/assets/models/SM_Prop_Fountain_01.glb" position={[0, 0, 0]} scale={0.012} />
      <DistrictSignBoard label="CITIZEN PLAZA" position={[0, 1.24, 3.35]} accent="#D59E45" wide />
      <InfoBoard
        title="WELCOME BOARD"
        lines={["Workizen HQ", "Digital Citizen City", "Start Here"]}
        position={[-2.75, 0, 2.6]}
        accent="#D59E45"
      />
      <InfoBoard
        title="CAMPUS MAP"
        lines={["AI · Founder · Library", "Opportunity · Compute", "Team Office"]}
        position={[0, 0, 3.05]}
        accent="#2563EB"
      />
      <InfoBoard
        title="CITIZEN REGISTRY"
        lines={["Human Citizens", "AI · Knowledge", "Compute Citizens"]}
        position={[2.75, 0, 2.6]}
        accent="#22C55E"
      />
      {/* Benches */}
      {(
        [
          [-2.2, 0, -1.4, Math.PI / 2],
          [2.2, 0, -1.4, -Math.PI / 2],
          [-2.2, 0, 1.35, Math.PI / 2],
          [2.2, 0, 1.35, -Math.PI / 2]
        ] as [number, number, number, number][]
      ).map(([x, y, z, rotation], index) => (
        <Bench key={index} position={[x, y, z]} rotation={rotation} />
      ))}
      {/* Lamps */}
      {(
        [
          [-2.85, 0, -2.4],
          [2.85, 0, -2.4],
          [-2.85, 0, 2.4],
          [2.85, 0, 2.4]
        ] as Vector3Tuple[]
      ).map((position, index) => (
        <Lamp key={index} position={position} />
      ))}
    </group>
  );
}

function WorkizenBranding() {
  return (
    <group position={[0, 0, -2.8]}>
      <mesh castShadow receiveShadow position={[0, 1.35, 0]}>
        <boxGeometry args={[4.5, 1.2, 0.16]} />
        <meshStandardMaterial color={artDirection.materials.signFace} roughness={0.42} />
      </mesh>
      <mesh position={[0, 1.72, 0.1]}>
        <boxGeometry args={[4.5, 0.32, 0.04]} />
        <meshStandardMaterial color={artDirection.ui.active} roughness={0.34} />
      </mesh>
      <Label text="WORKIZEN" position={[0, 1.73, 0.16]} color="#FFFFFF" small />
      <Label text="HQ CAMPUS" position={[0, 1.36, 0.16]} color={artDirection.ui.active} small />
      <Label text="Digital Citizen City" position={[0, 1.08, 0.16]} color={artDirection.ui.accent} small />
      <mesh castShadow position={[-2.55, 1.36, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.25, 12]} />
        <meshStandardMaterial color={artDirection.world.plazaRing} roughness={0.42} />
      </mesh>
      <mesh castShadow position={[2.55, 1.36, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.25, 12]} />
        <meshStandardMaterial color={artDirection.world.plazaRing} roughness={0.42} />
      </mesh>
    </group>
  );
}

function WaterfrontDetails() {
  const coastalRocks: { position: Vector3Tuple; variant: number; scale: number }[] = [
    { position: [-12.8, 0, 9.6], variant: 0, scale: 0.012 },
    { position: [-9.8, 0, 12.0], variant: 1, scale: 0.011 },
    { position: [-4.8, 0, 14.2], variant: 0, scale: 0.01 },
    { position: [4.6, 0, 14.0], variant: 1, scale: 0.011 },
    { position: [9.8, 0, 11.9], variant: 0, scale: 0.01 },
    { position: [13.1, 0, 7.2], variant: 1, scale: 0.012 },
    { position: [14.4, 0, -3.4], variant: 0, scale: 0.01 },
    { position: [-14.2, 0, -3.8], variant: 1, scale: 0.01 },
  ];

  return (
    <group>
      <TripoModel
        path="/assets/models/SM_Prop_Pier_01.glb"
        position={[0, 0, 14.6]}
        scale={tripoH(HEIGHT.PIER, 0.377).scale}
        yOffset={tripoH(HEIGHT.PIER, 0.377).yOffset - 0.06}
        rotation={[0, Math.PI, 0]}
      />
      <PondFeature position={[6.7, 0.02, 5.7]} radius={1.45} />
      <BridgeFeature position={[6.7, 0.09, 5.7]} rotation={Math.PI / 2} />
      <Path position={[3.35, 0.018, 6.55]} scale={[0.72, 1, 6.4]} rotation={Math.PI / 2.8} color={artDirection.world.pathSecondary} />
      {coastalRocks.map(({ position, variant, scale }, index) => (
        <SyntyModel
          key={index}
          path={variant === 0 ? "/assets/models/SM_Generic_Small_Rocks_01.glb" : "/assets/models/SM_Generic_Small_Rocks_02.glb"}
          position={position}
          scale={scale}
        />
      ))}
    </group>
  );
}

// ── Campus-wide Decoration ────────────────────────────────────────────────────

type TreePlacement = {
  position: Vector3Tuple
  variant: number
  scale?: number
  yOffset?: number
  path?: string
}

function CampusDecor() {
  const PLAZA_SMALL_TREES: TreePlacement[] = [
    { position: [-2.8, 0, 2.25], variant: 0, scale: 0.006, yOffset: -0.03 },
    { position: [2.8, 0, 2.25], variant: 1, scale: 0.006, yOffset: -0.03 },
    { position: [-2.95, 0, -2.2], variant: 2, scale: 0.0058, yOffset: -0.03 },
    { position: [2.95, 0, -2.2], variant: 3, scale: 0.0058, yOffset: -0.03 },
    { position: [0, 0, 3.65], variant: 0, scale: 0.0055, yOffset: -0.04 },
  ];

  const BETWEEN_BUILDING_TREES: TreePlacement[] = [
    { position: [-5.8, 0, -5.3], variant: 2, scale: 0.008 },
    { position: [5.8, 0, -5.4], variant: 1, scale: 0.008 },
    { position: [-10.6, 0, -5.6], variant: 0, scale: 0.0085 },
    { position: [10.6, 0, -5.6], variant: 2, scale: 0.0085 },
    { position: [-5.9, 0, 3.5], variant: 1, scale: 0.008 },
    { position: [5.9, 0, 3.5], variant: 0, scale: 0.008 },
    { position: [-8.9, 0, -10.1], variant: 2, scale: 0.008 },
    { position: [8.9, 0, -10.1], variant: 1, scale: 0.008 },
    { position: [3.6, 0, 8.9], variant: 3, scale: 0.008 },
  ];

  const BENCH_SHADE_TREES: TreePlacement[] = [
    { position: [-9.8, 0, 3.8], variant: 0, scale: 0.0085 },
    { position: [9.8, 0, 3.8], variant: 1, scale: 0.0085 },
    { position: [-6.1, 0, -10.9], variant: 2, scale: 0.0085 },
    { position: [6.1, 0, -10.9], variant: 0, scale: 0.0085 },
    { position: [-3.2, 0, 9.6], variant: 1, scale: 0.008 },
  ];

  const COASTLINE_TREES: TreePlacement[] = [
    { position: [-14.1, 0, 0.7], variant: 1, scale: 0.009 },
    { position: [-13.5, 0, -5.5], variant: 2, scale: 0.009 },
    { position: [-11.8, 0, -10.2], variant: 0, scale: 0.009 },
    { position: [-5.0, 0, -13.9], variant: 2, scale: 0.009 },
    { position: [0.6, 0, -14.2], variant: 0, scale: 0.009 },
    { position: [5.8, 0, -13.5], variant: 1, scale: 0.009 },
    { position: [11.9, 0, -9.4], variant: 0, scale: 0.009 },
    { position: [14.0, 0, -4.2], variant: 1, scale: 0.009 },
    { position: [13.9, 0, 2.6], variant: 2, scale: 0.009 },
    { position: [12.0, 0, 8.4], variant: 1, scale: 0.009 },
    { position: [7.3, 0, 12.1], variant: 2, scale: 0.009 },
    { position: [1.9, 0, 13.2], variant: 0, scale: 0.0088 },
    { position: [-4.1, 0, 13.1], variant: 1, scale: 0.0088 },
    { position: [-9.4, 0, 11.1], variant: 2, scale: 0.009 },
    { position: [-12.9, 0, 6.1], variant: 0, scale: 0.009 },
    { position: [14.0, 0, -0.7], variant: 3, path: "/assets/models/SM_Env_Tree_Pine_01.glb", scale: 0.008, yOffset: 0.12 },
  ];

  const treeGroups = [
    ...PLAZA_SMALL_TREES,
    ...BETWEEN_BUILDING_TREES,
    ...BENCH_SHADE_TREES,
    ...COASTLINE_TREES,
  ];

  const lamps: Vector3Tuple[] = [
    // Major paths outside the central plaza ring
    [-0.85, 0, -4.9], [0.85, 0, -4.9],
    [-5.1, 0, 0], [-6.9, 0, 0],
    [5.1, 0, 0], [6.9, 0, 0],
    [0, 0, 5.1],
    [-4.85, 0, -4.85],
    [4.85, 0, -4.85]
  ];

  const benches: { position: Vector3Tuple; rotation: number }[] = [
    // AI Agent Lab surroundings
    { position: [-1.9, 0, -5.5], rotation: 0 },
    { position: [1.9, 0, -5.5], rotation: 0 },
    { position: [-3.3, 0, -6.9], rotation: Math.PI / 4 },
    // Founder Tower surroundings
    { position: [-8.6, 0, -6.9], rotation: Math.PI / 2 },
    { position: [-7.2, 0, -10.6], rotation: 0 },
    { position: [-5.6, 0, -9.6], rotation: Math.PI / 6 },
    // Knowledge Library surroundings
    { position: [8.6, 0, -6.9], rotation: -Math.PI / 2 },
    { position: [7.2, 0, -10.6], rotation: 0 },
    { position: [5.6, 0, -9.6], rotation: -Math.PI / 6 },
    // Opportunity Center surroundings
    { position: [-9.6, 0, 2.9], rotation: Math.PI / 2 },
    { position: [-7.6, 0, 3.3], rotation: 0 },
    { position: [-6.6, 0, 2.6], rotation: Math.PI / 2 },
    // Compute Center surroundings
    { position: [9.6, 0, 2.9], rotation: -Math.PI / 2 },
    { position: [7.6, 0, 3.3], rotation: 0 },
    { position: [6.6, 0, 2.6], rotation: -Math.PI / 2 },
    // Team Office surroundings
    { position: [2.3, 0, 5.1], rotation: -Math.PI / 2 },
    { position: [-2.3, 0, 5.1], rotation: Math.PI / 2 },
    { position: [0, 0, 9.6], rotation: 0 }
  ];

  const flowers: { position: Vector3Tuple; color: string }[] = [
    // ── Original 8 flower patches (kept, re-colored) ──
    { position: [-3.4, 0, -0.2], color: "#F9A8D4" },
    { position: [3.4, 0, -0.2], color: "#FDE68A" },
    { position: [-1.95, 0, -3.15], color: "#A7F3D0" },
    { position: [1.95, 0, -3.15], color: "#FDE68A" },
    { position: [-9.95, 0, -1.85], color: "#F9A8D4" },
    { position: [9.95, 0, 1.85], color: "#A7F3D0" },
    { position: [-1.95, 0, 6.05], color: "#FDE68A" },
    { position: [1.95, 0, 6.05], color: "#F9A8D4" },
    // ── Extra plaza-ring flowers (5) ──
    { position: [-3.05, 0, 1.85], color: "#FDE68A" },
    { position: [3.05, 0, 1.85], color: "#F9A8D4" },
    { position: [0, 0, -3.3], color: "#A7F3D0" },
    { position: [2.65, 0, -2.65], color: "#FDE68A" },
    { position: [-2.65, 0, -2.65], color: "#F9A8D4" },
    // ── Around AI Agent Lab (4) ──
    { position: [-2.9, 0, -5.6], color: "#A7F3D0" },
    { position: [2.9, 0, -5.6], color: "#A7F3D0" },
    { position: [-4.3, 0, -7.1], color: "#DCFCE7" },
    { position: [4.3, 0, -7.1], color: "#DCFCE7" },
    // ── Around Founder Tower (3) ──
    { position: [-8.6, 0, -7.6], color: "#BFDBFE" },
    { position: [-5.6, 0, -7.6], color: "#BFDBFE" },
    { position: [-9.1, 0, -9.6], color: "#E0F2FE" },
    // ── Around Knowledge Library (3) ──
    { position: [8.6, 0, -7.6], color: "#FEF3C7" },
    { position: [5.6, 0, -7.6], color: "#FEF3C7" },
    { position: [9.1, 0, -9.6], color: "#FDE68A" },
    // ── Around Opportunity Center (3) ──
    { position: [-9.6, 0, 1.6], color: "#FFD3DC" },
    { position: [-6.9, 0, 2.1], color: "#FFD3DC" },
    { position: [-10.6, 0, -1.1], color: "#FCA5A5" },
    // ── Around Compute Center (3) ──
    { position: [9.6, 0, 1.6], color: "#BAE6FD" },
    { position: [6.9, 0, 2.1], color: "#BAE6FD" },
    { position: [10.6, 0, -1.1], color: "#E0F2FE" },
    // ── Around Team Office (3) ──
    { position: [2.6, 0, 4.6], color: "#E9D5FF" },
    { position: [-2.6, 0, 4.6], color: "#E9D5FF" },
    { position: [0, 0, 9.3], color: "#DDD6FE" },
    // ── Path-side flowers (4) ──
    { position: [-1.55, 0, -1.6], color: "#FDE68A" },
    { position: [1.55, 0, -1.6], color: "#F9A8D4" },
    { position: [-1.55, 0, 1.6], color: "#A7F3D0" },
    { position: [1.55, 0, 1.6], color: "#FDE68A" }
  ];

  return (
    <group>
      {treeGroups.map((tree, index) => (
        <Tree key={index} {...tree} />
      ))}
      {lamps.map((position, index) => (
        <Lamp key={index} position={position} />
      ))}
      {benches.map(({ position, rotation }, index) => (
        <Bench key={index} position={position} rotation={rotation} />
      ))}
      {flowers.map(({ position, color }, index) => (
        <FlowerPatch key={index} position={position} color={color} />
      ))}
      {/* Synty bush clusters */}
      <BushCluster position={[-6.5, 0, -5.2]} />
      <BushCluster position={[6.5, 0, -5.2]} />
      <BushCluster position={[-9.0, 0, 2.0]} />
      <BushCluster position={[9.0, 0, 2.0]} />
      <BushCluster position={[-1.5, 0, 8.5]} />
      <BushCluster position={[1.5, 0, 8.5]} />
      <BushCluster position={[-8.5, 0, -10.5]} />
      <BushCluster position={[8.5, 0, -10.5]} />
      <BushCluster position={[-12.1, 0, 6.7]} />
      <BushCluster position={[12.1, 0, 6.7]} />
      <BushCluster position={[-6.6, 0, 11.7]} />
      <BushCluster position={[6.6, 0, 11.7]} />
      <BushCluster position={[-2.8, 0, 12.6]} />
      <BushCluster position={[2.8, 0, 12.6]} />
      {/* Hedges along key paths */}
      <SyntyModel path="/assets/models/SM_Env_Hedge_01.glb" position={[-3.6, 0, -1.2]} scale={0.007} />
      <SyntyModel path="/assets/models/SM_Env_Hedge_01.glb" position={[3.6, 0, -1.2]} scale={0.007} />
      <SyntyModel path="/assets/models/SM_Env_Hedge_02.glb" position={[-3.6, 0, 1.2]} scale={0.007} />
      <SyntyModel path="/assets/models/SM_Env_Hedge_02.glb" position={[3.6, 0, 1.2]} scale={0.007} />
      <SyntyModel path="/assets/models/SM_Env_Hedge_03.glb" position={[-1.2, 0, -3.6]} scale={0.007} rotation={[0, Math.PI / 2, 0]} />
      <SyntyModel path="/assets/models/SM_Env_Hedge_03.glb" position={[1.2, 0, -3.6]} scale={0.007} rotation={[0, Math.PI / 2, 0]} />
      {/* Rock clusters */}
      <SyntyModel path="/assets/models/SM_Generic_Small_Rocks_01.glb" position={[-5.5, 0, 3.8]} scale={0.012} />
      <SyntyModel path="/assets/models/SM_Generic_Small_Rocks_02.glb" position={[5.5, 0, 3.8]} scale={0.012} />
      <SyntyModel path="/assets/models/SM_Generic_Small_Rocks_01.glb" position={[-10.2, 0, -8.8]} scale={0.01} />
      <SyntyModel path="/assets/models/SM_Generic_Small_Rocks_02.glb" position={[10.2, 0, -8.8]} scale={0.01} />
      {/* Beach flower edge */}
      <FlowerPatch position={[-11.6, 0, 7.9]} />
      <FlowerPatch position={[-8.0, 0, 10.9]} />
      <FlowerPatch position={[-3.8, 0, 12.7]} />
      <FlowerPatch position={[3.8, 0, 12.7]} />
      <FlowerPatch position={[8.0, 0, 10.9]} />
      <FlowerPatch position={[11.6, 0, 7.9]} />
      {/* Floating clouds */}
      <SyntyModel path="/assets/models/SM_Generic_Cloud_01.glb" position={[-8, 14, -6]} scale={0.05} />
      <SyntyModel path="/assets/models/SM_Generic_Cloud_02.glb" position={[10, 16, -10]} scale={0.04} />
      <SyntyModel path="/assets/models/SM_Generic_Cloud_03.glb" position={[4, 13, -14]} scale={0.045} />
      <SyntyModel path="/assets/models/SM_Generic_Cloud_01.glb" position={[-12, 15, 4]} scale={0.035} />
      <SyntyModel path="/assets/models/SM_Generic_Cloud_02.glb" position={[14, 17, 2]} scale={0.05} />
    </group>
  );
}

// ── Building District Meshes ──────────────────────────────────────────────────

function DistrictMesh({ district }: { district: District }) {
  const select = useCampusStore((state) => state.select);
  const selected = useCampusStore((state) => state.selected);
  const isSelected = selected.kind === "district" && selected.id === district.id;
  const [x, , z] = district.position;

  return (
    <group
      position={[x, 0, z]}
      onClick={(event) => stopAndRun(event, () => select({ kind: "district", id: district.id }))}
    >
      {district.id === "citizen-plaza" ? (
        <mesh receiveShadow position={[0, 0.07, 0]}>
          <cylinderGeometry args={[3.2, 3.2, 0.14, 64]} />
          <meshStandardMaterial color={isSelected ? "#FFE8B8" : district.color} roughness={0.75} />
        </mesh>
      ) : (
        <LandmarkBuilding district={district} selected={isSelected} />
      )}
    </group>
  );
}

// ── Tripo District Landmark Buildings — one per district ─────────────────────

type LandmarkBuildingConfig = {
  path: string
  scale: number
  yOffset: number
  rotation?: [number, number, number]
  labelHeight: number
  signZ: number
}

const LANDMARK_BUILDINGS: Record<string, LandmarkBuildingConfig> = {
  "ai-agent-lab": {
    path: "/assets/models/SM_Bld_AIAgentLab_01.glb",
    ...tripoH(HEIGHT.BLD_L),
    rotation: [0, Math.PI, 0],
    labelHeight: HEIGHT.BLD_L,
    signZ: 2.75,
  },
  "founder-tower": {
    path: "/assets/models/SM_Bld_FounderTower_01.glb",
    ...tripoH(HEIGHT.TOWER),
    rotation: [0, Math.PI * 0.88, 0],
    labelHeight: HEIGHT.TOWER,
    signZ: 2.05,
  },
  "knowledge-library": {
    path: "/assets/models/SM_Bld_KnowledgeLibrary_01.glb",
    ...tripoH(HEIGHT.BLD_M),
    rotation: [0, Math.PI * 1.08, 0],
    labelHeight: HEIGHT.BLD_M,
    signZ: 2.1,
  },
  "compute-center": {
    path: "/assets/models/SM_Bld_ComputeCenter_01.glb",
    ...tripoH(HEIGHT.BLD_M),
    rotation: [0, -Math.PI / 2, 0],
    labelHeight: HEIGHT.BLD_M,
    signZ: 2.05,
  },
  "opportunity-center": {
    path: "/assets/models/SM_Bld_OpportunityCenter_01.glb",
    ...tripoH(HEIGHT.BLD_M),
    rotation: [0, Math.PI / 2, 0],
    labelHeight: HEIGHT.BLD_M,
    signZ: 2.05,
  },
  "team-office": {
    path: "/assets/models/SM_Bld_TeamOffice_01.glb",
    ...tripoH(HEIGHT.BLD_S, 0.766),
    rotation: [0, 0, 0],
    labelHeight: HEIGHT.BLD_S,
    signZ: 2.1,
  },
}

function LandmarkBuilding({ district, selected }: { district: District; selected: boolean }) {
  const cfg = LANDMARK_BUILDINGS[district.id]
  if (!cfg) return null

  return (
    <group>
      <mesh receiveShadow position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[selected ? 2.9 : 2.65, 48]} />
        <meshStandardMaterial color={selected ? artDirection.materials.warmPanel : artDirection.world.platform} roughness={0.78} />
      </mesh>
      <TripoModel
        path={cfg.path}
        position={[0, 0, 0]}
        scale={cfg.scale}
        yOffset={cfg.yOffset ?? 0}
        rotation={cfg.rotation}
      />
      <DistrictSignBoard
        label={district.name.toUpperCase()}
        position={[0, 1.22, cfg.signZ]}
        accent={district.accentColor}
      />
      <DistrictProps district={district} />
    </group>
  )
}

// ── District-specific Props ───────────────────────────────────────────────────

function DistrictProps({ district }: { district: District }) {
  const d = district.size[2] / 2 + 0.4

  if (district.id === "knowledge-library") {
    return (
      <group>
        <SyntyModel path="/assets/models/SM_Prop_Bookshelf_01.glb" position={[-1.8, 0, d]} scale={0.01} rotation={[0, Math.PI, 0]} />
        <SyntyModel path="/assets/models/SM_Prop_Bookshelf_02.glb" position={[1.8, 0, d]} scale={0.01} rotation={[0, Math.PI, 0]} />
      </group>
    )
  }

  if (district.id === "opportunity-center") {
    return (
      <group>
        <SyntyModel path="/assets/models/SM_Prop_ShopCounter_01.glb" position={[-2.0, 0, d]} scale={0.012} />
        <SyntyModel path="/assets/models/SM_Prop_VendingMachine_01.glb" position={[2.0, 0, d]} scale={0.01} rotation={[0, Math.PI, 0]} />
        <InfoBoard
          title="OPPORTUNITY BOARD"
          lines={["Open Missions", "Team Matching", "Startup Work"]}
          position={[district.size[0] / 2 + 0.9, 0, 0.4]}
          accent={district.accentColor}
        />
      </group>
    )
  }

  if (district.id === "compute-center") {
    return (
      <group>
        <SyntyModel path="/assets/models/SM_Prop_Antenna_01.glb" position={[2.0, district.size[1] + 0.2, -0.5]} scale={0.012} />
        <SyntyModel path="/assets/models/SM_Prop_SolarPanel_01.glb" position={[-2.0, 0, -district.size[2] / 2 - 0.5]} scale={0.012} />
        <SyntyModel path="/assets/models/SM_Prop_SolarPanel_01.glb" position={[2.0, 0, -district.size[2] / 2 - 0.5]} scale={0.012} rotation={[0, Math.PI, 0]} />
        <SyntyModel path="/assets/models/SM_Prop_Computer_Screen_01.glb" position={[0, 0, d]} scale={0.012} rotation={[0, Math.PI, 0]} />
      </group>
    )
  }

  if (district.id === "team-office") {
    return (
      <group>
        <SyntyModel path="/assets/models/SM_Prop_Desk_01.glb" position={[-1.4, 0, d]} scale={0.012} rotation={[0, Math.PI, 0]} />
        <SyntyModel path="/assets/models/SM_Prop_Desk_01.glb" position={[1.4, 0, d]} scale={0.012} rotation={[0, Math.PI, 0]} />
      </group>
    )
  }

  return null
}

// ── Reusable Primitive Components ─────────────────────────────────────────────

function Door({ color, position }: { color: string; position: Vector3Tuple }) {
  return (
    <mesh castShadow position={position}>
      <boxGeometry args={[0.72, 1.22, 0.09]} />
      <meshStandardMaterial color={color} roughness={0.48} />
    </mesh>
  );
}

function WindowRow({ width, z, y, accent }: { width: number; z: number; y: number; accent: string }) {
  const count = Math.max(2, Math.floor(width / 1.15));
  const spacing = width / (count + 1);

  return (
    <group>
      {Array.from({ length: count }).map((_, index) => (
        <mesh key={index} position={[-width / 2 + spacing * (index + 1), y, z]}>
          <boxGeometry args={[0.44, 0.44, 0.07]} />
        <meshStandardMaterial color={artDirection.materials.glass} emissive={accent} emissiveIntensity={0.08} roughness={0.24} />
        </mesh>
      ))}
    </group>
  );
}

function Awning({ width, z, y, accent }: { width: number; z: number; y: number; accent: string }) {
  return (
    <mesh castShadow position={[0, y, z]} rotation={[Math.PI / 12, 0, 0]}>
      <boxGeometry args={[width, 0.16, 0.54]} />
      <meshStandardMaterial color={accent} roughness={0.46} />
    </mesh>
  );
}

function SignPlate({ label, position, accent }: { label: string; position: Vector3Tuple; accent: string }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.55, 0.46, 0.1]} />
        <meshStandardMaterial color={artDirection.materials.signFace} roughness={0.4} />
      </mesh>
      <Label text={label} position={[0, 0.01, 0.07]} color={accent} small />
    </group>
  );
}

function DistrictSignBoard({
  label,
  position,
  accent,
  wide = false
}: {
  label: string;
  position: Vector3Tuple;
  accent: string;
  wide?: boolean;
}) {
  const w = wide ? 4.6 : 3.0;
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[w, 0.74, 0.13]} />
        <meshStandardMaterial color={accent} roughness={0.36} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[w - 0.24, 0.52, 0.04]} />
        <meshStandardMaterial color={artDirection.materials.signFace} roughness={0.48} />
      </mesh>
      <Label text={label} position={[0, 0.01, 0.14]} color={accent} small />
    </group>
  );
}

function InfoBoard({
  title,
  lines,
  position,
  accent
}: {
  title: string;
  lines: string[];
  position: Vector3Tuple;
  accent: string;
}) {
  return (
    <group position={position}>
      {/* Post */}
      <mesh castShadow position={[0, 0.64, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 1.28, 8]} />
        <meshStandardMaterial color={artDirection.materials.post} />
      </mesh>
      {/* Board */}
      <mesh castShadow position={[0, 1.48, 0]}>
        <boxGeometry args={[1.42, 1.06, 0.1]} />
        <meshStandardMaterial color={artDirection.materials.signFace} roughness={0.42} />
      </mesh>
      {/* Header stripe */}
      <mesh position={[0, 1.89, 0.06]}>
        <boxGeometry args={[1.42, 0.25, 0.04]} />
        <meshStandardMaterial color={accent} roughness={0.38} />
      </mesh>
      <Label text={title} position={[0, 1.89, 0.12]} color="#FFFFFF" small />
      {lines.slice(0, 3).map((line, i) => (
        <Label key={i} text={line} position={[0, 1.62 - i * 0.24, 0.12]} color={accent} small />
      ))}
    </group>
  );
}

function PondFeature({ position, radius = 1.8 }: { position: Vector3Tuple; radius?: number }) {
  return (
    <group position={position}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <circleGeometry args={[radius, 36]} />
        <meshStandardMaterial color="#7DD3FC" roughness={0.06} metalness={0.14} transparent opacity={0.82} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.065, 0]}>
        <ringGeometry args={[radius, radius + 0.24, 36]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.72} />
      </mesh>
    </group>
  );
}

function BridgeFeature({ position, rotation = 0 }: { position: Vector3Tuple; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
        <boxGeometry args={[2.75, 0.16, 0.58]} />
        <meshStandardMaterial color="#B77A42" roughness={0.62} />
      </mesh>
      {[-0.86, -0.43, 0, 0.43, 0.86].map((x) => (
        <mesh key={x} castShadow receiveShadow position={[x, 0.23, 0]}>
          <boxGeometry args={[0.08, 0.06, 0.7]} />
          <meshStandardMaterial color="#F2C27D" roughness={0.58} />
        </mesh>
      ))}
      {[-1.18, 1.18].map((x) => (
        <mesh key={x} castShadow position={[x, 0.38, 0]}>
          <boxGeometry args={[0.08, 0.52, 0.72]} />
          <meshStandardMaterial color="#8B5E34" roughness={0.64} />
        </mesh>
      ))}
    </group>
  );
}

function Tree({
  position,
  variant,
  scale = 0.01,
  yOffset = 0.13,
  path
}: {
  position: Vector3Tuple;
  variant: number;
  scale?: number;
  yOffset?: number;
  path?: string;
}) {
  return (
    <SyntyModel
      path={path ?? SYNTY_TREE_PATHS[variant % SYNTY_TREE_PATHS.length]}
      position={position}
      scale={scale}
      yOffset={yOffset}
    />
  )
}

function BushCluster({ position }: { position: Vector3Tuple; color?: string }) {
  const idx = Math.abs(Math.round(position[0] + position[2])) % 2
  const paths = ["/assets/models/SM_Env_Bush_01.glb", "/assets/models/SM_Env_Bush_02.glb"]
  return <SyntyModel path={paths[idx]} position={position} yOffset={-0.05} />
}

function FlowerPatch({ position }: { position: Vector3Tuple; color?: string }) {
  const idx = Math.abs(Math.round(position[0])) % 2
  const paths = ["/assets/models/SM_Env_FlowerPatch_01.glb", "/assets/models/SM_Env_FlowerPatch_02.glb"]
  return <SyntyModel path={paths[idx]} position={position} />
}

function Bench({ position, rotation }: { position: Vector3Tuple; rotation: number }) {
  return (
    <SyntyModel
      path="/assets/models/SM_Prop_ParkBench_01.glb"
      position={position}
      rotation={[0, rotation, 0]}
    />
  )
}

function Lamp({ position }: { position: Vector3Tuple }) {
  return (
    <SyntyModel
      path="/assets/models/SM_Prop_Streetlamp_01.glb"
      position={position}
      scale={0.007}
    />
  )
}

function Antenna({ position, color }: { position: Vector3Tuple; color: string }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.76, 10]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[0, 0.84, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#DFFBFF" emissive={color} emissiveIntensity={0.24} />
      </mesh>
      <mesh position={[0, 1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.018, 8, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

function SolarPanel({ position, accent }: { position: Vector3Tuple; accent: string }) {
  return (
    <group position={position} rotation={[0, -0.45, 0]}>
      <mesh castShadow position={[0, 0.42, 0]} rotation={[-0.4, 0, 0]}>
        <boxGeometry args={[1.1, 0.08, 0.72]} />
        <meshStandardMaterial color="#0F172A" emissive={accent} emissiveIntensity={0.09} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 0.36, 8]} />
        <meshStandardMaterial color="#64748B" />
      </mesh>
    </group>
  );
}

function BookStack({ position }: { position: Vector3Tuple }) {
  return (
    <group position={position}>
      {["#F97316", "#22C55E", "#2563EB"].map((color, index) => (
        <mesh key={color} castShadow position={[0, 0.12 + index * 0.12, 0]}>
          <boxGeometry args={[0.68, 0.1, 0.42]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function MarketBoard({ position, accent }: { position: Vector3Tuple; accent: string }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.86, 0]}>
        <boxGeometry args={[1.08, 1.12, 0.09]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      {[0.48, 0.76, 1.04].map((y) => (
        <mesh key={y} position={[0, y, 0.06]}>
          <boxGeometry args={[0.74, 0.06, 0.04]} />
          <meshStandardMaterial color={accent} />
        </mesh>
      ))}
    </group>
  );
}

function MarketStall({ position, accent }: { position: Vector3Tuple; accent: string }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[1.0, 0.5, 0.52]} />
        <meshStandardMaterial color="#FCE7F3" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 0.88, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.78, 0.48, 4]} />
        <meshStandardMaterial color={accent} roughness={0.5} />
      </mesh>
    </group>
  );
}

function ServerStack({ position, accent }: { position: Vector3Tuple; accent: string }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((index) => (
        <mesh key={index} castShadow position={[0, 0.28 + index * 0.5, 0]}>
          <boxGeometry args={[0.72, 0.42, 0.5]} />
          <meshStandardMaterial color={index === 1 ? "#E0F2FE" : "#F8FAFC"} emissive={accent} emissiveIntensity={0.05} />
        </mesh>
      ))}
    </group>
  );
}

function MeetingTable({ position, accent }: { position: Vector3Tuple; accent: string }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[1.28, 0.18, 0.72]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.52} />
      </mesh>
      {(
        [
          [-0.82, 0.32, 0],
          [0.82, 0.32, 0],
          [0, 0.32, -0.55],
          [0, 0.32, 0.55]
        ] as Vector3Tuple[]
      ).map((chair, index) => (
        <mesh key={index} castShadow position={chair}>
          <boxGeometry args={[0.32, 0.38, 0.32]} />
          <meshStandardMaterial color={accent} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

// ── Citizen Meshes ────────────────────────────────────────────────────────────

const CITIZEN_MODELS_BY_TYPE: Record<string, { path: string; scale: number }> = {
  "agent-placeholder":         { path: "/assets/models/SM_Chr_RobotCitizen_01.glb",     scale: HEIGHT.ROBOT },
  "knowledge-placeholder":     { path: "/assets/models/SM_Chr_KnowledgeCitizen_01.glb", scale: HEIGHT.HUMAN },
  "compute-human-placeholder": { path: "/assets/models/SM_Chr_ComputeCitizen_01.glb",   scale: HEIGHT.HUMAN },
}

const HUMAN_MODELS = [
  "/assets/models/SM_Chr_HumanCitizen_01.glb",
  "/assets/models/SM_Chr_HumanCitizen_02.glb",
]

function getCitizenModel(citizen: CitizenManifest): { path: string; scale: number } | undefined {
  if (citizen.avatar_type in CITIZEN_MODELS_BY_TYPE) {
    return CITIZEN_MODELS_BY_TYPE[citizen.avatar_type]
  }
  if (citizen.avatar_type === "placeholder") {
    const idx = citizen.citizen_id.charCodeAt(citizen.citizen_id.length - 1) % 2
    return { path: HUMAN_MODELS[idx], scale: HEIGHT.HUMAN }
  }
  return undefined
}

function CitizenMesh({ citizen }: { citizen: CitizenManifest }) {
  const select = useCampusStore((state) => state.select);
  const [x, , z] = citizen.location.coordinates;
  const isComputeDevice = citizen.avatar_type === "device-placeholder";
  const tripoModel = getCitizenModel(citizen);
  const labelBaseY = isComputeDevice ? HEIGHT.DEVICE : (tripoModel ? tripoModel.scale + 0.2 : 1.35)
  const typeColor = getCitizenTypeColor(citizen.citizen_type)

  return (
    <Float speed={0.85} rotationIntensity={0.04} floatIntensity={0.07}>
      <group
        position={[x, 0, z]}
        onClick={(event) => stopAndRun(event, () => select({ kind: "citizen", id: citizen.citizen_id }))}
      >
        {isComputeDevice ? (
          // Compute device: keep procedural (it's a device, not a person)
          <>
            <mesh castShadow position={[0, 0.48, 0]}>
              <boxGeometry args={[0.76, 0.58, 0.5]} />
              <meshStandardMaterial color={citizen.color} roughness={0.55} />
            </mesh>
            <mesh position={[0, 0.52, 0.27]}>
              <boxGeometry args={[0.46, 0.22, 0.04]} />
              <meshStandardMaterial color={citizen.accentColor} emissive={citizen.accentColor} emissiveIntensity={0.14} />
            </mesh>
          </>
        ) : tripoModel ? (
          // Tripo normalized 1×1×1, yOffset = scale/2 to sit on ground
          <TripoModel
            path={tripoModel.path}
            position={[0, 0, 0]}
            scale={tripoModel.scale}
            yOffset={tripoModel.scale / 2}
          />
        ) : (
          // Fallback procedural human
          <>
            <mesh castShadow position={[0, 0.42, 0]}>
              <capsuleGeometry args={[0.25, 0.42, 6, 12]} />
              <meshStandardMaterial color={citizen.color} roughness={0.58} />
            </mesh>
            <mesh castShadow position={[0, 0.92, 0]}>
              <sphereGeometry args={[0.28, 18, 18]} />
              <meshStandardMaterial color={citizen.color} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.72, 0.27]}>
              <boxGeometry args={[0.38, 0.13, 0.05]} />
              <meshStandardMaterial color={citizen.accentColor} />
            </mesh>
          </>
        )}
        <Label
          text={citizen.name}
          position={[0, labelBaseY, 0]}
          color={citizen.accentColor}
          small
        />
        <CitizenTypeBadge
          label={citizen.citizen_type}
          position={[0, labelBaseY - 0.28, 0]}
          color={typeColor}
        />
      </group>
    </Float>
  );
}

function getCitizenTypeColor(type: CitizenManifest["citizen_type"]) {
  if (type === "AI Citizen") return "#22C55E"
  if (type === "Knowledge Citizen") return "#F59E0B"
  if (type === "Compute Citizen") return "#06B6D4"
  return "#2563EB"
}

function CitizenTypeBadge({
  label,
  position,
  color
}: {
  label: CitizenManifest["citizen_type"];
  position: Vector3Tuple;
  color: string;
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.28, 0.22, 0.055]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[1.18, 0.14, 0.025]} />
        <meshStandardMaterial color={color} roughness={0.42} />
      </mesh>
      <Label text={label} position={[0, 0.005, 0.07]} color="#FFFFFF" tiny />
    </group>
  );
}

function NpcMesh({ npc }: { npc: Npc }) {
  const select = useCampusStore((state) => state.select);
  const [x, , z] = npc.position;

  return (
    <group position={[x, 0, z]} onClick={(event) => stopAndRun(event, () => select({ kind: "npc", id: npc.id }))}>
      <mesh castShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.24, 0.3, 0.75, 18]} />
        <meshStandardMaterial color={npc.color} roughness={0.56} />
      </mesh>
      <mesh castShadow position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.31, 18, 18]} />
        <meshStandardMaterial color={npc.color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <torusGeometry args={[0.32, 0.035, 8, 24]} />
        <meshStandardMaterial color={npc.accentColor} emissive={npc.accentColor} emissiveIntensity={0.12} />
      </mesh>
      <Label text={npc.name} position={[0, 1.58, 0]} color={npc.accentColor} small />
    </group>
  );
}

function OpportunityMarker({ opportunity }: { opportunity: Opportunity }) {
  const select = useCampusStore((state) => state.select);
  const [x, y, z] = opportunity.position;

  return (
    <Float speed={1.8} rotationIntensity={0.14} floatIntensity={0.24}>
      <group
        position={[x, y, z]}
        onClick={(event) => stopAndRun(event, () => select({ kind: "opportunity", id: opportunity.id }))}
      >
        <mesh castShadow>
          <octahedronGeometry args={[0.44, 0]} />
          <meshStandardMaterial color="#FB7185" emissive="#FB7185" emissiveIntensity={0.2} roughness={0.34} />
        </mesh>
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 1.24, 8]} />
          <meshStandardMaterial color="#BE123C" />
        </mesh>
        <Label text={opportunity.name} position={[0, 0.8, 0]} color="#BE123C" small />
      </group>
    </Float>
  );
}

// ── Label ─────────────────────────────────────────────────────────────────────

function Label({
  text,
  position,
  color,
  small = false,
  tiny = false
}: {
  text: string;
  position: Vector3Tuple;
  color: string;
  small?: boolean;
  tiny?: boolean;
}) {
  return (
    <Text
      position={position}
      fontSize={tiny ? 0.13 : small ? 0.2 : 0.32}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.012}
      outlineColor="#FFFFFF"
      maxWidth={tiny ? 1.4 : small ? 2.3 : 4.2}
    >
      {text}
    </Text>
  );
}

// ── Scene Assembly ────────────────────────────────────────────────────────────

function SceneContents() {
  const clearSelection = useCampusStore((state) => state.clearSelection);

  return (
    <group onPointerMissed={clearSelection}>
      <CampusGround />
      {districts.map((district) => (
        <DistrictMesh key={district.id} district={district} />
      ))}
      {citizens.map((citizen) => (
        <CitizenMesh key={citizen.citizen_id} citizen={citizen} />
      ))}
      {npcs.map((npc) => (
        <NpcMesh key={npc.id} npc={npc} />
      ))}
      {opportunities.map((opportunity) => (
        <OpportunityMarker key={opportunity.id} opportunity={opportunity} />
      ))}
    </group>
  );
}

export function CampusScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.7]}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = artDirection.lighting.toneMappingExposure
        }}
      >
        <color attach="background" args={[artDirection.world.sky]} />
        <fog attach="fog" args={[artDirection.world.fog, artDirection.world.fogNear, artDirection.world.fogFar]} />
        <PerspectiveCamera makeDefault position={[1.5, 26, 28]} fov={48} />
        <ambientLight color={artDirection.lighting.ambient.color} intensity={artDirection.lighting.ambient.intensity} />
        <directionalLight
          castShadow
          color={artDirection.lighting.directional.color}
          position={artDirection.lighting.directional.position}
          intensity={artDirection.lighting.directional.intensity}
          shadow-mapSize={artDirection.lighting.directional.shadowMapSize}
          shadow-bias={artDirection.lighting.directional.shadowBias}
          shadow-normalBias={artDirection.lighting.directional.shadowNormalBias}
        />
        <hemisphereLight
          args={[
            artDirection.lighting.hemisphere.skyColor,
            artDirection.lighting.hemisphere.groundColor,
            artDirection.lighting.hemisphere.intensity
          ]}
        />
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
        <OrbitControls
          target={[1.5, 0.2, -1.2]}
          enableDamping
          dampingFactor={0.08}
          minDistance={10}
          maxDistance={40}
          maxPolarAngle={Math.PI / 2.4}
        />
      </Canvas>
    </div>
  );
}
