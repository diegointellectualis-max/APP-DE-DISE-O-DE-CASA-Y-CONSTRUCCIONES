import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';
import { Room, Furniture } from '../types/plan';
import { GridScene } from '../three/GridScene';
import { RoomMesh } from '../three/RoomMesh';
import { FurnitureMesh } from '../three/FurnitureMesh';

interface Scene3DProps {
  rooms: Room[];
  furniture: Furniture[];
  selectedRoomId: string | null;
  selectedFurnitureId: string | null;
  onSelectRoom: (id: string | null) => void;
  onSelectFurniture: (id: string | null) => void;
}

export function Scene3D({ rooms, furniture, selectedRoomId, selectedFurnitureId, onSelectRoom, onSelectFurniture }: Scene3DProps) {
  return (
    <div className="w-full h-full bg-[#0A0B0D]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [15, 15, 15], fov: 35 }}>
        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2.2}
          enableDamping
          dampingFactor={0.05}
        />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <ambientLight intensity={0.4} />
          <spotLight
            position={[20, 40, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight
            position={[-10, 20, -10]}
            intensity={0.5}
          />

          <GridScene />

          <group position={[0, 0, 0]}>
            {rooms.map(room => (
              <RoomMesh 
                key={room.id} 
                room={room} 
                isSelected={selectedRoomId === room.id} 
                onClick={() => onSelectRoom(room.id)}
              />
            ))}

            {furniture.map(item => (
              <FurnitureMesh 
                key={item.id} 
                furniture={item} 
                isSelected={selectedFurnitureId === item.id}
                onClick={() => onSelectFurniture(item.id)}
              />
            ))}
          </group>

          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.5} 
            scale={40} 
            blur={1.5} 
            far={10} 
            resolution={512}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
