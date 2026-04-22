import React, { useMemo } from 'react';
import { Shape, ExtrudeGeometry, Vector2 } from 'three';
import { Room } from '../types/plan';
import { getMaterialColor } from '../utils/geometry';

interface RoomMeshProps {
  room: Room;
  isSelected: boolean;
  onClick: () => void;
}

export function RoomMesh({ room, isSelected, onClick }: RoomMeshProps) {
  const shape = useMemo(() => {
    const s = new Shape();
    s.moveTo(room.points[0].x, room.points[0].y);
    for (let i = 1; i < room.points.length; i++) {
      s.lineTo(room.points[i].x, room.points[i].y);
    }
    s.closePath();
    return s;
  }, [room.points]);

  const extrudeSettings = {
    steps: 1,
    depth: 0.1,
    bevelEnabled: false,
  };

  const wallExtrudeSettings = {
    steps: 1,
    depth: 2.2, // 2.2m standard height
    bevelEnabled: false,
  };

  // Create wall shape (outline)
  const wallShape = useMemo(() => {
    const s = new Shape();
    s.moveTo(room.points[0].x, room.points[0].y);
    for (let i = 1; i < room.points.length; i++) {
      s.lineTo(room.points[i].x, room.points[i].y);
    }
    s.closePath();
    return s;
  }, [room.points]);

  const floorColor = getMaterialColor(room.material);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Floor */}
      <mesh 
        position={[0, 0, 0]} 
        receiveShadow 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial 
          color={isSelected ? '#1A1C1E' : floorColor} 
          roughness={0.8}
          metalness={0.1}
          transparent={isSelected}
          opacity={isSelected ? 0.3 : 1}
        />
      </mesh>

      {/* Walls (simplified wireframe-like translucent walls for professional Look) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[wallShape, wallExtrudeSettings]} />
        <meshStandardMaterial 
          color="#ADB5BD" 
          transparent 
          opacity={0.1} 
          wireframe 
        />
      </mesh>

      {/* Solid Walls base */}
       <mesh position={[0, 0, 0]}>
        <extrudeGeometry args={[wallShape, { ...extrudeSettings, depth: 0.15 }]} />
        <meshStandardMaterial color="#6B7280" />
      </mesh>
    </group>
  );
}
