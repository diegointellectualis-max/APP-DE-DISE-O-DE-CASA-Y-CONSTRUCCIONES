import React from 'react';
import { MeshProps } from '@react-three/fiber';
import { Grid } from '@react-three/drei';

export function GridScene() {
  return (
    <>
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        fadeStrength={1.5} 
        cellSize={1} 
        sectionSize={5} 
        sectionThickness={1.5}
        sectionColor="#334155"
        cellColor="#1E293B"
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0A0B0D" roughness={0.8} metalness={0.2} />
      </mesh>
    </>
  );
}
