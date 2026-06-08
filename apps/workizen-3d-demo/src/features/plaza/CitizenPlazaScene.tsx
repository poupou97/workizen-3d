"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import { Suspense } from "react";
import { buildings, citizens, districts, opportunities } from "./data";
import { BuildingMesh } from "./meshes/BuildingMesh";
import { CitizenMesh } from "./meshes/CitizenMesh";
import { OpportunityMarker } from "./meshes/OpportunityMarker";
import { PlazaGround } from "./meshes/PlazaGround";

export function CitizenPlazaScene() {
  return (
    <Canvas
      camera={{ position: [8, 7, 9], fov: 42 }}
      dpr={[1, 1.8]}
      shadows
      className="h-full w-full"
    >
      <color attach="background" args={["#F8FBFF"]} />
      <fog attach="fog" args={["#F8FBFF", 18, 38]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow
        intensity={1.5}
        position={[7, 10, 5]}
        shadow-mapSize={[1024, 1024]}
      />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <PlazaGround district={districts[0]} />
        {buildings.map((building) => (
          <BuildingMesh key={building.id} building={building} />
        ))}
        {citizens.map((citizen) => (
          <CitizenMesh key={citizen.id} citizen={citizen} />
        ))}
        {opportunities.map((opportunity) => (
          <OpportunityMarker key={opportunity.id} opportunity={opportunity} />
        ))}
        <Text
          position={[0, 0.08, 3.85]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.34}
          color="#7D6632"
          anchorX="center"
          anchorY="middle"
        >
          Citizen Plaza
        </Text>
      </Suspense>
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={6}
        maxDistance={18}
        maxPolarAngle={Math.PI / 2.25}
        target={[0, 0.8, 0]}
      />
    </Canvas>
  );
}
