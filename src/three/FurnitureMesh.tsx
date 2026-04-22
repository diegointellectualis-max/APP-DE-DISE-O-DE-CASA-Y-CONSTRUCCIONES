import React from 'react';
import { Furniture } from '../types/plan';
import { RoundedBox } from '@react-three/drei';

interface FurnitureMeshProps {
  furniture: Furniture;
  isSelected: boolean;
  onClick: () => void;
}

export function FurnitureMesh({ furniture, isSelected, onClick }: FurnitureMeshProps) {
  const { width, depth, height } = furniture.dimensions;
  const { x, y } = furniture.position;
  const rotationRad = (furniture.rotation * Math.PI) / 180;

  // Simple abstract representations for a "premium" architectural feel
  const getColor = (type: string) => {
    if (isSelected) return '#1A1C1E';
    switch (type) {
      case 'bed': return '#E9ECEF';
      case 'sofa': return '#DEE2E6';
      case 'kitchen_unit': return '#2C2E31';
      case 'bathroom_unit': return '#F8F9FA';
      default: return '#CED4DA';
    }
  };

  return (
    <group 
      position={[x, height / 2, y]} 
      rotation={[0, -rotationRad, 0]} 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <RoundedBox
        args={[width, height, depth]} // width, height, depth
        radius={0.05}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={getColor(furniture.type)} 
          roughness={0.5}
          metalness={isSelected ? 0.5 : 0.2}
          emissive={isSelected ? '#1A1C1E' : '#000000'}
          emissiveIntensity={isSelected ? 0.1 : 0}
        />
      </RoundedBox>

      {/* Detail accents for premium look */}
      {furniture.type === 'bed' && (
        <mesh position={[0, height / 2 + 0.02, depth / 4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width * 0.9, depth * 0.45]} />
          <meshStandardMaterial color="#ADB5BD" alphaTest={0.5} />
        </mesh>
      )}

      {furniture.type === 'sofa' && (
        <mesh position={[0, height / 4, -depth / 3]} castShadow>
          <boxGeometry args={[width * 0.95, height * 0.8, depth * 0.2]} />
          <meshStandardMaterial color="#BDBDBD" />
        </mesh>
      )}
    </group>
  );
}
