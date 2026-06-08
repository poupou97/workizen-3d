"use client";

import { Text } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { Citizen } from "../types";
import { usePlazaStore } from "../store";

type CitizenMeshProps = {
  citizen: Citizen;
};

export function CitizenMesh({ citizen }: CitizenMeshProps) {
  const selectObject = usePlazaStore((state) => state.selectObject);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    selectObject(citizen);
  };

  return (
    <group position={citizen.position} onClick={handleClick}>
      <mesh castShadow position={[0, 0.45, 0]}>
        <capsuleGeometry args={[0.28, 0.48, 8, 16]} />
        <meshStandardMaterial color={citizen.color} roughness={0.52} />
      </mesh>
      <mesh castShadow position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color="#FFE2C6" roughness={0.48} />
      </mesh>
      <mesh castShadow position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color={citizen.accentColor} roughness={0.5} />
      </mesh>
      <mesh position={[-0.11, 1, 0.31]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#17202A" />
      </mesh>
      <mesh position={[0.11, 1, 0.31]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#17202A" />
      </mesh>
      <mesh castShadow position={[-0.38, 0.42, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color={citizen.color} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.38, 0.42, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color={citizen.color} roughness={0.5} />
      </mesh>
      <Text
        position={[0, 1.65, 0]}
        fontSize={0.18}
        color="#17202A"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.012}
        outlineColor="#FFFFFF"
      >
        {citizen.name}
      </Text>
    </group>
  );
}
