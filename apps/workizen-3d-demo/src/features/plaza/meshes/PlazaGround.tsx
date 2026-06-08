"use client";

import type { ThreeEvent } from "@react-three/fiber";
import type { District } from "../types";
import { usePlazaStore } from "../store";

type PlazaGroundProps = {
  district: District;
};

export function PlazaGround({ district }: PlazaGroundProps) {
  const selectObject = usePlazaStore((state) => state.selectObject);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    selectObject(district);
  };

  return (
    <group onClick={handleClick}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[9.4, 64]} />
        <meshStandardMaterial color="#D9F2DF" roughness={0.82} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={district.position}>
        <circleGeometry args={[3.05, 48]} />
        <meshStandardMaterial color={district.color} roughness={0.7} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[3.35, 3.55, 64]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.72} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.56, 0.72, 0.7, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.48} />
      </mesh>
      <mesh castShadow position={[0, 0.92, 0]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color="#8EC5FF" roughness={0.4} />
      </mesh>
      {[
        [-7.5, 0.12, -1.2],
        [-6.5, 0.12, 2.2],
        [6.8, 0.12, 1.7],
        [7.3, 0.12, -1.7],
        [-1.8, 0.12, -7.2],
        [2.3, 0.12, -7.1],
        [-2.8, 0.12, 6.9],
        [2.7, 0.12, 7.1]
      ].map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, y, z]}>
          <coneGeometry args={[0.42, 0.85, 6]} />
          <meshStandardMaterial color="#6AC98F" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
