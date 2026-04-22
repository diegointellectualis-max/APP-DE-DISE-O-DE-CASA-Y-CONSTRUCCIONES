export type ViewMode = '2D' | '3D' | 'SPLIT';

export type RoomTypology = 
  | 'Living Room' 
  | 'Bedroom' 
  | 'Kitchen' 
  | 'Bathroom' 
  | 'Dining Room' 
  | 'Studio' 
  | 'Balcony'
  | 'Hallway';

export type FloorMaterial = 'Wood' | 'Marble' | 'Concrete' | 'Tiles' | 'Carpet';

export interface Point {
  x: number;
  y: number;
}

export interface Room {
  id: string;
  name: string;
  typology: RoomTypology;
  material: FloorMaterial;
  points: Point[]; // Polygons in 2D space (meters)
  color: string;
}

export type FurnitureType = 
  | 'bed' 
  | 'sofa' 
  | 'desk' 
  | 'table' 
  | 'kitchen_unit' 
  | 'bathroom_unit' 
  | 'storage';

export interface Furniture {
  id: string;
  type: FurnitureType;
  name: string;
  position: Point;
  rotation: number; // Degrees
  dimensions: { width: number; depth: number; height: number };
}

export interface PlanState {
  rooms: Room[];
  furniture: Furniture[];
  selectedRoomId: string | null;
  selectedFurnitureId: string | null;
  viewMode: ViewMode;
}
