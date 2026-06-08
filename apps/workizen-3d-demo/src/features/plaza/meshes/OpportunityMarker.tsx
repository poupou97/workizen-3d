"use client";

import { Text } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { Opportunity } from "../types";
import { usePlazaStore } from "../store";

type OpportunityMarkerProps = {
  opportunity: Opportunity;
};

export function OpportunityMarker({ opportunity }: OpportunityMarkerProps) {
  const selectObject = usePlazaStore((state) => state.selectObject);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    selectObject(opportunity);
  };

  return (
    <group position={opportunity.position} onClick={handleClick}>
      <mesh castShadow>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color="#FF8E72" emissive="#FF8E72" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 12]} />
        <meshStandardMaterial color="#6B7280" />
      </mesh>
      <Text
        position={[0, 0.48, 0]}
        fontSize={0.16}
        color="#17202A"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.012}
        outlineColor="#FFFFFF"
      >
        {opportunity.name}
      </Text>
    </group>
  );
}
