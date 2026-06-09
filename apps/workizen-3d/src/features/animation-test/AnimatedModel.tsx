"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const IDLE_PATH = "/assets/rigged/layla-chen/animations/Idle.glb";
const WALK_PATH = "/assets/rigged/layla-chen/animations/Walk.glb";

// Matches CITIZEN_TARGET_HEIGHT in CampusScene.
const TARGET_HEIGHT = 1.7;

useGLTF.preload(IDLE_PATH);
useGLTF.preload(WALK_PATH);

export type ClipName = "idle" | "walk";

// Measure world-space bounding box (handles embedded Tripo node matrix).
function computeNorm(scene: THREE.Object3D): { scaleFactor: number; groundOffset: number } {
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const currentH = size.y > 0 ? size.y : 1;
  const sf = TARGET_HEIGHT / currentH;
  return { scaleFactor: sf, groundOffset: -box.min.y * sf };
}

// Each clip gets its own sub-component so the GLB's own skeleton drives its own animation.
// Cross-applying a clip from one GLB to another GLB's skeleton causes partial bone binding
// (only bones whose names match get animated → T-pose arms, unnatural gait).

function ClipScene({
  path,
  clipName,
  onStats,
}: {
  path: string;
  clipName: ClipName;
  onStats?: (stats: { fps: number; clipActual: string }) => void;
}) {
  const gltf = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);

  const { scaleFactor, groundOffset } = useMemo(
    () => computeNorm(gltf.scene),
    [gltf.scene]
  );

  const { actions } = useAnimations(gltf.animations, groupRef);

  // Auto-play the single animation clip embedded in this GLB.
  useEffect(() => {
    const clip = gltf.animations[0];
    if (!clip) return;
    const action = actions[clip.name];
    if (!action) return;
    action.reset().setLoop(THREE.LoopRepeat, Infinity).play();
  }, [actions, gltf.animations]);

  const fpsState = useRef({ frames: 0, elapsed: 0 });
  useFrame((_, delta) => {
    if (!onStats) return;
    fpsState.current.frames += 1;
    fpsState.current.elapsed += delta;
    if (fpsState.current.elapsed >= 1) {
      const fps = Math.round(fpsState.current.frames / fpsState.current.elapsed);
      fpsState.current.frames = 0;
      fpsState.current.elapsed = 0;
      onStats({ fps, clipActual: clipName });
    }
  });

  return (
    <group ref={groupRef} position={[0, groundOffset, 0]} scale={scaleFactor}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export function AnimatedModel({
  clipName = "idle",
  onStats,
}: {
  clipName?: ClipName;
  onStats?: (stats: { fps: number; clipActual: string }) => void;
}) {
  // Swap between the two GLB scenes so each skeleton drives its own animation correctly.
  return clipName === "idle" ? (
    <ClipScene path={IDLE_PATH} clipName="idle" onStats={onStats} />
  ) : (
    <ClipScene path={WALK_PATH} clipName="walk" onStats={onStats} />
  );
}
