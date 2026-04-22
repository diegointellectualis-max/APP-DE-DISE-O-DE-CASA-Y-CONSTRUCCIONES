import { Room, Furniture } from '../types/plan';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'Área Social Principal',
    typology: 'Living Room',
    material: 'Wood',
    color: '#e5e7eb',
    points: [
      { x: 0, y: 0 },
      { x: 6, y: 0 },
      { x: 6, y: 5 },
      { x: 0, y: 5 },
    ],
  },
  {
    id: 'room-2',
    name: 'Dormitorio Principal',
    typology: 'Bedroom',
    material: 'Carpet',
    color: '#d1d5db',
    points: [
      { x: 6, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 4 },
      { x: 6, y: 4 },
    ],
  },
  {
    id: 'room-3',
    name: 'Baño en Suite',
    typology: 'Bathroom',
    material: 'Tiles',
    color: '#9ca3af',
    points: [
      { x: 6, y: 4 },
      { x: 10, y: 4 },
      { x: 10, y: 6 },
      { x: 6, y: 6 },
    ],
  },
  {
    id: 'room-4',
    name: 'Cocina Abierta',
    typology: 'Kitchen',
    material: 'Tiles',
    color: '#f3f4f6',
    points: [
      { x: 0, y: 5 },
      { x: 3, y: 5 },
      { x: 3, y: 8 },
      { x: 0, y: 8 },
    ],
  },
];

export const INITIAL_FURNITURE: Furniture[] = [
  {
    id: 'f-1',
    type: 'sofa',
    name: 'Sofá Seccional',
    position: { x: 1.5, y: 1.5 },
    rotation: 0,
    dimensions: { width: 2.2, depth: 0.9, height: 0.8 },
  },
  {
    id: 'f-2',
    type: 'bed',
    name: 'Cama King',
    position: { x: 8, y: 2 },
    rotation: -90,
    dimensions: { width: 2.0, depth: 2.1, height: 0.6 },
  },
];

export const FURNITURE_PRESETS: Omit<Furniture, 'id' | 'position' | 'rotation'>[] = [
  { type: 'sofa', name: 'Sofá', dimensions: { width: 2.0, depth: 0.9, height: 0.8 } },
  { type: 'bed', name: 'Cama', dimensions: { width: 1.6, depth: 2.0, height: 0.6 } },
  { type: 'desk', name: 'Escritorio', dimensions: { width: 1.4, depth: 0.7, height: 0.75 } },
  { type: 'table', name: 'Mesa Comedor', dimensions: { width: 1.6, depth: 0.9, height: 0.75 } },
  { type: 'kitchen_unit', name: 'Módulo Cocina', dimensions: { width: 2.4, depth: 0.6, height: 0.9 } },
  { type: 'bathroom_unit', name: 'Lavabo', dimensions: { width: 1.0, depth: 0.5, height: 0.8 } },
  { type: 'storage', name: 'Armario', dimensions: { width: 1.5, depth: 0.6, height: 2.2 } },
];
