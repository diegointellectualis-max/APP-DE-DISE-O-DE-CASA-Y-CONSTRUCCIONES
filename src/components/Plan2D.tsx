import React, { useState, useRef, useEffect } from 'react';
import { Room, Furniture, Point } from '../types/plan';
import { cn } from '../lib/utils';

interface Plan2DProps {
  rooms: Room[];
  furniture: Furniture[];
  selectedRoomId: string | null;
  selectedFurnitureId: string | null;
  onSelectRoom: (id: string | null) => void;
  onSelectFurniture: (id: string | null) => void;
  onMoveFurniture: (id: string, x: number, y: number) => void;
}

export function Plan2D({ 
  rooms, 
  furniture, 
  selectedRoomId, 
  selectedFurnitureId, 
  onSelectRoom, 
  onSelectFurniture, 
  onMoveFurniture 
}: Plan2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(50); // pixels per meter
  const [offset, setOffset] = useState({ x: 50, y: 50 });
  const [draggingFurniture, setDraggingFurniture] = useState<string | null>(null);

  // Auto-center plan on load
  useEffect(() => {
    if (rooms.length > 0) {
      const allPoints = rooms.flatMap(r => r.points);
      const minX = Math.min(...allPoints.map(p => p.x));
      const maxX = Math.max(...allPoints.map(p => p.x));
      const minY = Math.min(...allPoints.map(p => p.y));
      const maxY = Math.max(...allPoints.map(p => p.y));
      
      const width = containerRef.current?.clientWidth || 800;
      const height = containerRef.current?.clientHeight || 600;
      
      const planWidth = maxX - minX;
      const planHeight = maxY - minY;
      
      const newScale = Math.min(width / (planWidth + 4), height / (planHeight + 4));
      setScale(newScale);
      setOffset({
        x: (width - planWidth * newScale) / 2 - minX * newScale,
        y: (height - planHeight * newScale) / 2 - minY * newScale
      });
    }
  }, [rooms.length === 0]);

  const handleMouseDown = (e: React.MouseEvent, fId: string) => {
    e.stopPropagation();
    setDraggingFurniture(fId);
    onSelectFurniture(fId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingFurniture && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - offset.x) / scale;
      const y = (e.clientY - rect.top - offset.y) / scale;
      onMoveFurniture(draggingFurniture, x, y);
    }
  };

  const handleMouseUp = () => {
    setDraggingFurniture(null);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative cursor-default select-none bg-[#0A0B0D] overflow-hidden"
      onClick={() => {
        onSelectRoom(null);
        onSelectFurniture(null);
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <svg className="w-full h-full">
        {/* Grid Background */}
        <defs>
          <pattern id="grid" width={scale} height={scale} patternUnits="userSpaceOnUse">
            <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#14161C" />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Rooms */}
        <g transform={`translate(${offset.x}, ${offset.y})`}>
          {rooms.map(room => (
            <g key={room.id} onClick={(e) => { e.stopPropagation(); onSelectRoom(room.id); }} className="cursor-pointer">
              {/* Main Room Area */}
              <polygon
                points={room.points.map(p => `${p.x * scale},${p.y * scale}`).join(' ')}
                className={cn(
                  "transition-all duration-300",
                  selectedRoomId === room.id 
                    ? "fill-white/10 stroke-white stroke-[2] opacity-100" 
                    : "fill-white/5 stroke-white/20 stroke-[1] hover:fill-white/10"
                )}
              />
              
              {/* Inner Wall Stroke for Architectural feel (double line effect) */}
              <polygon
                points={room.points.map(p => `${p.x * scale},${p.y * scale}`).join(' ')}
                className="fill-none stroke-white/10 stroke-[10] opacity-30 pointer-events-none"
              />
            </g>
          ))}

          {/* Room Labels */}
          {rooms.map(room => {
             const xs = room.points.map(p => p.x);
             const ys = room.points.map(p => p.y);
             const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
             const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
             return (
               <g key={`label-grp-${room.id}`} className="pointer-events-none select-none">
                 <rect 
                   x={cx * scale - 40} y={cy * scale - 12} width={80} height={24} rx={12} 
                   className={cn(
                     "transition-all duration-300",
                     selectedRoomId === room.id ? "fill-white" : "fill-black/40 backdrop-blur-md"
                   )}
                 />
                 <text
                   x={cx * scale}
                   y={cy * scale + 4}
                   textAnchor="middle"
                   className={cn(
                     "text-[9px] font-bold uppercase tracking-[0.2em]",
                     selectedRoomId === room.id ? "fill-black font-black" : "fill-slate-300"
                   )}
                 >
                   {room.name}
                 </text>
               </g>
             );
          })}

          {/* Furniture */}
          {furniture.map(item => (
            <g 
              key={item.id} 
              transform={`translate(${item.position.x * scale}, ${item.position.y * scale}) rotate(${item.rotation})`}
              className="cursor-move pointer-events-auto group"
              onMouseDown={(e) => handleMouseDown(e, item.id)}
            >
              {/* Shadow effect */}
              <rect
                x={-item.dimensions.width / 2 * scale + 2}
                y={-item.dimensions.depth / 2 * scale + 2}
                width={item.dimensions.width * scale}
                height={item.dimensions.depth * scale}
                rx={6}
                className="fill-black opacity-40 blur-[4px]"
              />
              <rect
                x={-item.dimensions.width / 2 * scale}
                y={-item.dimensions.depth / 2 * scale}
                width={item.dimensions.width * scale}
                height={item.dimensions.depth * scale}
                rx={6}
                className={cn(
                  "transition-all duration-300",
                  selectedFurnitureId === item.id 
                    ? "fill-blue-500 stroke-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-105" 
                    : "fill-slate-800/80 stroke-white/10 stroke-[2] hover:stroke-white/30"
                )}
              />
              
              <text
                y={- (item.dimensions.depth / 2 + 0.6) * scale}
                textAnchor="middle"
                className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity",
                  selectedFurnitureId === item.id ? "fill-white opacity-100" : "fill-slate-500"
                )}
              >
                {item.name}
              </text>
            </g>
          ))}
        </g>
      </svg>
      
      {/* Control overlay */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-3">
        <button 
           onClick={(e) => { e.stopPropagation(); setScale(s => s * 1.2); }}
           className="w-10 h-10 bg-[#0F1115] border border-white/10 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-2xl hover:bg-white/10 transition-colors"
        >+</button>
        <button 
           onClick={(e) => { e.stopPropagation(); setScale(s => s / 1.2); }}
           className="w-10 h-10 bg-[#0F1115] border border-white/10 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-2xl hover:bg-white/10 transition-colors"
        >-</button>
      </div>
    </div>
  );
}
