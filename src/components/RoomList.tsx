import React from 'react';
import { Room } from '../types/plan';
import { calculateRoomArea, formatArea } from '../utils/geometry';
import { cn } from '../lib/utils';
import { Home, Bath, Bed, UtensilsCrossed, Sofa, Coffee } from 'lucide-react';

interface RoomListProps {
  rooms: Room[];
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
}

const TypologyIcon = ({ type, size = 16 }: { type: string, size?: number }) => {
  switch (type) {
    case 'Bedroom': return <Bed size={size} />;
    case 'Bathroom': return <Bath size={size} />;
    case 'Kitchen': return <UtensilsCrossed size={size} />;
    case 'Living Room': return <Sofa size={size} />;
    case 'Dining Room': return <Coffee size={size} />;
    default: return <Home size={size} />;
  }
};

export function RoomList({ rooms, selectedRoomId, onSelectRoom }: RoomListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">ESPACIOS DETECTADOS</h3>
      <div className="space-y-2">
        {rooms.map(room => {
          const isSelected = selectedRoomId === room.id;
          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 group text-left",
                isSelected 
                  ? "bg-white/10 border-white/20 text-white shadow-2xl" 
                  : "bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <div className={cn(
                "w-2 h-2 rounded-full",
                isSelected ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" : "bg-slate-700"
              )} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold truncate leading-none mb-1.5 uppercase tracking-tight">{room.name}</div>
                <div className="flex items-center justify-between">
                  <div className="text-[9px] uppercase font-bold tracking-widest text-slate-500">
                    {room.typology}
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 group-hover:text-slate-400">
                    {formatArea(calculateRoomArea(room.points))} m²
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
