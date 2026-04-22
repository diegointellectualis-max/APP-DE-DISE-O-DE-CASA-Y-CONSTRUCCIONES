import React from 'react';
import { PlanState, ViewMode, Room, Furniture } from '../types/plan';
import { TopBar } from './TopBar';
import { MetricsPanel } from './MetricsPanel';
import { RoomList } from './RoomList';
import { RoomEditor } from './RoomEditor';
import { FurniturePanel } from './FurniturePanel';
import { Plan2D } from './Plan2D';
import { Scene3D } from './Scene3D';

interface AppShellProps {
  state: PlanState;
  onUpdateViewMode: (mode: ViewMode) => void;
  onSelectRoom: (id: string | null) => void;
  onSelectFurniture: (id: string | null) => void;
  onUpdateRoom: (id: string, updates: Partial<Room>) => void;
  onUpdateFurniture: (id: string, updates: Partial<Furniture>) => void;
  onAddFurniture: (furniture: Omit<Furniture, 'id'>) => void;
  onDeleteFurniture: (id: string) => void;
  onMoveFurniture: (id: string, x: number, y: number) => void;
  onRotateFurniture: (id: string) => void;
}

export function AppShell({
  state,
  onUpdateViewMode,
  onSelectRoom,
  onSelectFurniture,
  onUpdateRoom,
  onUpdateFurniture,
  onAddFurniture,
  onDeleteFurniture,
  onMoveFurniture,
  onRotateFurniture
}: AppShellProps) {
  const selectedRoom = state.rooms.find(r => r.id === state.selectedRoomId);
  const selectedFurniture = state.furniture.find(f => f.id === state.selectedFurnitureId);

  return (
    <div className="flex flex-col h-screen bg-[#0A0B0D] text-slate-200 font-sans overflow-hidden">
      <TopBar viewMode={state.viewMode} onUpdateViewMode={onUpdateViewMode} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <aside className="w-72 border-r border-white/5 flex flex-col bg-[#0F1115] z-20 shadow-2xl transition-all duration-500 ease-in-out">
          <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">
            <MetricsPanel rooms={state.rooms} />
            <div className="h-px bg-white/5 mx-1" />
            <RoomList 
              rooms={state.rooms} 
              selectedRoomId={state.selectedRoomId} 
              onSelectRoom={onSelectRoom} 
            />
            <div className="h-px bg-white/5 mx-1" />
            <FurniturePanel onAddFurniture={onAddFurniture} />
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 relative bg-[#0A0B0D] overflow-hidden">
          <div className="absolute inset-0 flex p-4 lg:p-6 transition-all duration-500">
            <div className="w-full h-full bg-[#14161C] rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative">
              {state.viewMode === '2D' && (
                <Plan2D 
                  rooms={state.rooms} 
                  furniture={state.furniture}
                  selectedRoomId={state.selectedRoomId}
                  selectedFurnitureId={state.selectedFurnitureId}
                  onSelectRoom={onSelectRoom}
                  onSelectFurniture={onSelectFurniture}
                  onMoveFurniture={onMoveFurniture}
                />
              )}
              {state.viewMode === '3D' && (
                <Scene3D 
                  rooms={state.rooms} 
                  furniture={state.furniture}
                  selectedRoomId={state.selectedRoomId}
                  selectedFurnitureId={state.selectedFurnitureId}
                  onSelectRoom={onSelectRoom}
                  onSelectFurniture={onSelectFurniture}
                />
              )}
              {state.viewMode === 'SPLIT' && (
                <div className="flex w-full h-full">
                  <div className="w-1/2 border-r border-white/5 relative">
                    <Plan2D 
                      rooms={state.rooms} 
                      furniture={state.furniture}
                      selectedRoomId={state.selectedRoomId}
                      selectedFurnitureId={state.selectedFurnitureId}
                      onSelectRoom={onSelectRoom}
                      onSelectFurniture={onSelectFurniture}
                      onMoveFurniture={onMoveFurniture}
                    />
                  </div>
                  <div className="w-1/2">
                    <Scene3D 
                      rooms={state.rooms} 
                      furniture={state.furniture}
                      selectedRoomId={state.selectedRoomId}
                      selectedFurnitureId={state.selectedFurnitureId}
                      onSelectRoom={onSelectRoom}
                      onSelectFurniture={onSelectFurniture}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Panel for Editor */}
        {(selectedRoom || selectedFurniture) && (
          <aside className="w-80 border-l border-white/5 bg-[#0F1115] z-20 animate-in slide-in-from-right-full duration-500 ease-out shadow-2xl">
            <div className="p-6 overflow-y-auto h-full custom-scrollbar">
              <RoomEditor 
                room={selectedRoom} 
                furniture={selectedFurniture}
                onUpdateRoom={onUpdateRoom}
                onUpdateFurniture={onUpdateFurniture}
                onDeleteFurniture={onDeleteFurniture}
                onRotateFurniture={onRotateFurniture}
                onClose={() => {
                   onSelectRoom(null);
                   onSelectFurniture(null);
                }}
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
