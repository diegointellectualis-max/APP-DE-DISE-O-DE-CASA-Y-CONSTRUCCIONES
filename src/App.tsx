import React, { useState, useMemo } from 'react';
import { PlanState, ViewMode, Room, Furniture, RoomTypology, FloorMaterial, FurnitureType } from './types/plan';
import { INITIAL_ROOMS, INITIAL_FURNITURE } from './data/initialData';
import { AppShell } from './components/AppShell';

export default function App() {
  const [state, setState] = useState<PlanState>({
    rooms: INITIAL_ROOMS,
    furniture: INITIAL_FURNITURE,
    selectedRoomId: null,
    selectedFurnitureId: null,
    viewMode: '2D',
  });

  const updateViewMode = (viewMode: ViewMode) => {
    setState(prev => ({ ...prev, viewMode }));
  };

  const selectRoom = (id: string | null) => {
    setState(prev => ({ ...prev, selectedRoomId: id, selectedFurnitureId: null }));
  };

  const selectFurniture = (id: string | null) => {
    setState(prev => ({ ...prev, selectedFurnitureId: id, selectedRoomId: null }));
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setState(prev => ({
      ...prev,
      rooms: prev.rooms.map(r => r.id === id ? { ...r, ...updates } : r)
    }));
  };

  const updateFurniture = (id: string, updates: Partial<Furniture>) => {
    setState(prev => ({
      ...prev,
      furniture: prev.furniture.map(f => f.id === id ? { ...f, ...updates } : f)
    }));
  };

  const addFurniture = (furniture: Omit<Furniture, 'id'>) => {
    const newId = `f-${Date.now()}`;
    setState(prev => ({
      ...prev,
      furniture: [...prev.furniture, { ...furniture, id: newId }],
      selectedFurnitureId: newId,
      selectedRoomId: null
    }));
  };

  const deleteFurniture = (id: string) => {
    setState(prev => ({
      ...prev,
      furniture: prev.furniture.filter(f => f.id !== id),
      selectedFurnitureId: null
    }));
  };

  const moveFurniture = (id: string, x: number, y: number) => {
    const step = 0.1;
    const snappedX = Math.round(x / step) * step;
    const snappedY = Math.round(y / step) * step;
    updateFurniture(id, { position: { x: snappedX, y: snappedY } });
  };

  const rotateFurniture = (id: string) => {
    const furniture = state.furniture.find(f => f.id === id);
    if (furniture) {
      updateFurniture(id, { rotation: (furniture.rotation + 90) % 360 });
    }
  };

  return (
    <AppShell 
      state={state}
      onUpdateViewMode={updateViewMode}
      onSelectRoom={selectRoom}
      onSelectFurniture={selectFurniture}
      onUpdateRoom={updateRoom}
      onUpdateFurniture={updateFurniture}
      onAddFurniture={addFurniture}
      onDeleteFurniture={deleteFurniture}
      onMoveFurniture={moveFurniture}
      onRotateFurniture={rotateFurniture}
    />
  );
}
