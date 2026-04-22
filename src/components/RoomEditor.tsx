import React from 'react';
import { Room, Furniture, RoomTypology, FloorMaterial } from '../types/plan';
import { X, Trash2, RotateCw, Settings2, Move } from 'lucide-react';
import { calculateRoomArea, formatArea } from '../utils/geometry';

interface RoomEditorProps {
  room?: Room;
  furniture?: Furniture;
  onUpdateRoom: (id: string, updates: Partial<Room>) => void;
  onUpdateFurniture: (id: string, updates: Partial<Furniture>) => void;
  onDeleteFurniture: (id: string) => void;
  onRotateFurniture: (id: string) => void;
  onClose: () => void;
}

const TYPOLOGIES: RoomTypology[] = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Dining Room', 'Studio', 'Balcony', 'Hallway'];
const MATERIALS: FloorMaterial[] = ['Wood', 'Marble', 'Concrete', 'Tiles', 'Carpet'];

export function RoomEditor({ room, furniture, onUpdateRoom, onUpdateFurniture, onDeleteFurniture, onRotateFurniture, onClose }: RoomEditorProps) {
  if (!room && !furniture) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-1 h-3 bg-blue-500 rounded-sm" />
           <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
             {room ? 'EDITOR DE AMBIENTE' : 'PROPIEDADES DE OBJETO'}
           </h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-500 hover:text-white transition-all active:scale-90"
        >
          <X size={16} />
        </button>
      </div>

      {room && (
        <div className="space-y-6">
           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-white shadow-2xl relative overflow-hidden group">
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Superficie Calculada</div>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-display font-light tracking-tight">{calculateRoomArea(room.points).toFixed(2)}</span>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">m²</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Settings2 size={80} />
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest ml-1">Nombre del Espacio</label>
              <input 
                type="text" 
                value={room.name}
                onChange={(e) => onUpdateRoom(room.id, { name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 text-white text-xs transition-all placeholder:text-slate-700"
                placeholder="Nombre..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest ml-1">Tipología</label>
                <div className="relative">
                  <select 
                    value={room.typology}
                    onChange={(e) => onUpdateRoom(room.id, { typology: e.target.value as RoomTypology })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 text-white text-xs appearance-none cursor-pointer transition-all"
                  >
                    {TYPOLOGIES.map(t => <option key={t} value={t} className="bg-[#0F1115]">{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest ml-1">Altura Techo</label>
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white">
                   <span>2.80</span><span className="text-slate-600">m</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 mb-4">Acabados y Materiales</h3>
              <div className="space-y-3">
                {MATERIALS.slice(0, 3).map(m => (
                  <button
                    key={m}
                    onClick={() => onUpdateRoom(room.id, { material: m })}
                    className={cn(
                      "w-full p-3 rounded-xl border flex items-center gap-4 transition-all duration-300 group",
                      room.material === m 
                        ? "bg-white/10 border-white/20 text-white shadow-2xl" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg border border-white/10 shadow-inner",
                      m === 'Wood' ? "bg-[#3D2B1F]" : m === 'Marble' ? "bg-slate-200" : "bg-slate-800"
                    )} />
                    <div className="text-left flex-1">
                      <p className={cn("text-xs font-bold uppercase tracking-tight leading-none mb-1", room.material === m ? "text-white" : "text-slate-400")}>
                        {m === 'Wood' ? 'Roble Natural' : m === 'Marble' ? 'Mármol Statuario' : 'Hormigón Visto'}
                      </p>
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest">{m === 'Wood' ? 'Textura Mate' : 'Acabado Pulido'}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {furniture && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest ml-1">Nombre del Elemento</label>
            <input 
              type="text" 
              value={furniture.name}
              onChange={(e) => onUpdateFurniture(furniture.id, { name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 text-white text-xs transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest ml-1">Ancho (m)</label>
                <input 
                  type="number" step="0.1"
                  value={furniture.dimensions.width}
                  onChange={(e) => onUpdateFurniture(furniture.id, { dimensions: { ...furniture.dimensions, width: parseFloat(e.target.value) } })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 text-white text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest ml-1">Largo (m)</label>
                <input 
                  type="number" step="0.1"
                  value={furniture.dimensions.depth}
                  onChange={(e) => onUpdateFurniture(furniture.id, { dimensions: { ...furniture.dimensions, depth: parseFloat(e.target.value) } })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 text-white text-xs"
                />
              </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => onRotateFurniture(furniture.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 text-white border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
            >
              <RotateCw size={14} /> Rotar 90°
            </button>
            <button 
              onClick={() => onDeleteFurniture(furniture.id)}
              className="px-5 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all active:scale-95 border border-red-500/20"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex items-start gap-4">
             <div className="mt-0.5 p-1 bg-blue-500/20 rounded text-blue-400">
               <Move size={12} />
             </div>
             <p className="text-[10px] text-slate-400 font-medium leading-relaxed tracking-tight">
                PRO TIP: Puedes arrastrar los objetos directamente en la vista 2D para ajustar su posición final.
             </p>
          </div>
        </div>
      )}
    </div>
  );
}
