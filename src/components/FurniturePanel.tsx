import React from 'react';
import { Furniture, FurnitureType } from '../types/plan';
import { FURNITURE_PRESETS } from '../data/initialData';
import { Plus, Armchair, BedDouble, Monitor, Table, Refrigerator, Bath, Box } from 'lucide-react';
import { cn } from '../lib/utils';

interface FurniturePanelProps {
  onAddFurniture: (f: Omit<Furniture, 'id'>) => void;
}

const FurnitureIcon = ({ type, size = 18 }: { type: FurnitureType, size?: number }) => {
  switch (type) {
    case 'sofa': return <Armchair size={size} />;
    case 'bed': return <BedDouble size={size} />;
    case 'desk': return <Monitor size={size} />;
    case 'table': return <Table size={size} />;
    case 'kitchen_unit': return <Refrigerator size={size} />;
    case 'bathroom_unit': return <Bath size={size} />;
    case 'storage': return <Box size={size} />;
    default: return <Plus size={size} />;
  }
};

export function FurniturePanel({ onAddFurniture }: FurniturePanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">LIBRERÍA DE OBJETOS</h3>
      <div className="grid grid-cols-2 gap-3">
        {FURNITURE_PRESETS.map((preset, idx) => (
          <button
            key={`${preset.type}-${idx}`}
            onClick={() => onAddFurniture({
              ...preset,
              position: { x: 5, y: 5 },
              rotation: 0
            })}
            className="flex flex-col items-center justify-center p-5 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 group gap-3 shadow-2xl group active:scale-95"
          >
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-white transition-all duration-300 border border-white/5">
              <FurnitureIcon type={preset.type} size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-200 transition-colors">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
