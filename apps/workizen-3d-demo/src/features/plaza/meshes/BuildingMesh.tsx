"use client";

import { Text } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { Building } from "../types";
import { usePlazaStore } from "../store";

type BuildingMeshProps = {
  building: Building;
};

export function BuildingMesh({ building }: BuildingMeshProps) {
  const selectObject = usePlazaStore((state) => state.selectObject);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    selectObject(building);
  };

  return (
    <group position={building.position} onClick={handleClick}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={building.size} />
        <meshStandardMaterial color={building.color} roughness={0.62} />
      </mesh>
      <mesh castShadow position={[0, building.size[1] / 2 + 0.36, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[Math.max(building.size[0], building.size[2]) * 0.78, 0.8, 4]} />
        <meshStandardMaterial color={building.roofColor} roughness={0.55} />
      </mesh>
      <mesh castShadow position={[building.size[0] * 0.28, 0.06, building.size[2] / 2 + 0.012]}>
        <boxGeometry args={[0.44, 0.72, 0.06]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.45} />
      </mesh>
      <mesh castShadow position={[-building.size[0] * 0.28, 0.18, building.size[2] / 2 + 0.014]}>
        <boxGeometry args={[0.48, 0.42, 0.06]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.45} />
      </mesh>
      <Text
        position={[0, building.size[1] / 2 + 1.05, 0]}
        fontSize={0.24}
        color="#17202A"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#FFFFFF"
      >
        {building.name}
      </Text>
    </group>
  );
}
