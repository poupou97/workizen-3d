"use client";

import { Grid, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import * as THREE from "three";
import { AnimatedModel, type ClipName } from "@/features/animation-test/AnimatedModel";

const CLIPS: ClipName[] = ["idle", "walk"];

export default function AnimationTestPage() {
  const [clip, setClip] = useState<ClipName>("idle");
  const [stats, setStats] = useState({ fps: 0, clipActual: "" });

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a2e", display: "flex", flexDirection: "column" }}>
      {/* Debug HUD */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 10,
          background: "rgba(0,0,0,0.65)",
          color: "#e2e8f0",
          fontFamily: "monospace",
          fontSize: 13,
          padding: "10px 14px",
          borderRadius: 8,
          lineHeight: 1.7,
          pointerEvents: "none",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 4, color: "#a78bfa" }}>
          Animation Test — Layla Chen (human-plaza-01)
        </div>
        <div>Clip: <span style={{ color: "#34d399" }}>{clip}</span></div>
        <div>Running: <span style={{ color: "#fbbf24" }}>{stats.clipActual || "—"}</span></div>
        <div>FPS: <span style={{ color: "#60a5fa" }}>{stats.fps || "—"}</span></div>
        <div style={{ marginTop: 4, color: "#94a3b8", fontSize: 11 }}>
          /animation-test · isolated POC · scene untouched
        </div>
      </div>

      {/* Clip switcher buttons */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 10,
        }}
      >
        {CLIPS.map((c) => (
          <button
            key={c}
            onClick={() => setClip(c)}
            style={{
              padding: "10px 28px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: 14,
              fontWeight: "bold",
              background: clip === c ? "#7c3aed" : "#374151",
              color: clip === c ? "#fff" : "#9ca3af",
              letterSpacing: 1,
              textTransform: "uppercase",
              transition: "background 0.15s",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
        style={{ flex: 1 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <color attach="background" args={["#1a1a2e"]} />

        <PerspectiveCamera makeDefault position={[0, 1.2, 3.5]} fov={50} />
        <OrbitControls
          target={[0, 0.85, 0]}
          enablePan={false}
          minDistance={1.5}
          maxDistance={8}
        />

        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight
          castShadow
          position={[4, 8, 4]}
          intensity={1.4}
          color="#fffbe8"
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.001}
        />
        <hemisphereLight
          args={["#c8d8ff", "#5a3e28", 0.4]}
        />

        {/* Ground reference */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[3, 64]} />
          <meshStandardMaterial color="#2d3748" roughness={0.9} />
        </mesh>
        <Grid
          args={[6, 6]}
          position={[0, 0.001, 0]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#4a5568"
          sectionSize={1}
          sectionThickness={1}
          sectionColor="#718096"
          fadeDistance={8}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
        />

        <Suspense fallback={null}>
          <AnimatedModel clipName={clip} onStats={setStats} />
        </Suspense>
      </Canvas>
    </div>
  );
}
