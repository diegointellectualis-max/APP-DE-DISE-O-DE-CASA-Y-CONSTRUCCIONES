import React from 'react';
import { Room } from '../types/plan';
import { calculateRoomArea, formatArea } from '../utils/geometry';
import { Square, Layers } from 'lucide-react';

interface MetricsPanelProps {
  rooms: Room[];
}

export function MetricsPanel({ rooms }: MetricsPanelProps) {
  const totalArea = rooms.reduce((acc, room) => acc + calculateRoomArea(room.points), 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-1 h-3 bg-blue-500" />
          ESTADO DEL PROYECTO
        </h3>
        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">Optimizado</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="p-5 bg-white/5 rounded-xl border border-white/10 shadow-2xl group hover:border-white/20 transition-all duration-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-white transition-colors border border-white/10">
              <Square size={16} />
            </div>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Superficie Total</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-light text-white tracking-tight">{totalArea.toFixed(1)}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">m²</span>
          </div>
          <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-white/40 group-hover:bg-white transition-all duration-700" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Ambientes</span>
              <Layers size={12} className="text-slate-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-display font-light text-white">{rooms.length.toString().padStart(2, '0')}</span>
              <span className="text-[9px] text-emerald-400 font-bold tracking-tighter uppercase">+1</span>
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-2xl transition-all duration-300">
             <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Estado</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">Sincronizado</p>
          </div>
        </div>
      </div>
    </div>
  );
}
