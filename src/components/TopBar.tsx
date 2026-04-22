import React from 'react';
import { ViewMode } from '../types/plan';
import { LayoutGrid, Box, Columns2, Share2, Download } from 'lucide-react';
import { cn } from '../lib/utils';

interface TopBarProps {
  viewMode: ViewMode;
  onUpdateViewMode: (mode: ViewMode) => void;
}

export function TopBar({ viewMode, onUpdateViewMode }: TopBarProps) {
  return (
    <header className="h-16 px-6 border-b border-white/10 bg-[#0F1115] flex items-center justify-between z-30 shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <Share2 size={18} strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white leading-none uppercase">ArchPlan Pro</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">SISTEMA DE DIGITALIZACIÓN PRO</p>
        </div>
      </div>

      <div className="hidden md:flex items-center bg-white/5 rounded-lg p-1 border border-white/10 shadow-inner">
        <button
          onClick={() => onUpdateViewMode('2D')}
          className={cn(
            "flex items-center gap-2 px-5 py-1.5 rounded-md text-[11px] font-bold transition-all duration-300",
            viewMode === '2D' ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white"
          )}
        >
          <LayoutGrid size={12} />
          PLANO 2D
        </button>
        <button
          onClick={() => onUpdateViewMode('3D')}
          className={cn(
            "flex items-center gap-2 px-5 py-1.5 rounded-md text-[11px] font-bold transition-all duration-300",
            viewMode === '3D' ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white"
          )}
        >
          <Box size={12} />
          MODELO 3D
        </button>
        <button
          onClick={() => onUpdateViewMode('SPLIT')}
          className={cn(
            "flex items-center gap-2 px-5 py-1.5 rounded-md text-[11px] font-bold transition-all duration-300",
            viewMode === 'SPLIT' ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white"
          )}
        >
          <Columns2 size={12} />
          SPLIT VIEW
        </button>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-wider">Cloud Sync Active</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
            <Share2 size={14} />
            Share
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg text-[11px] font-bold hover:bg-slate-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95 uppercase tracking-widest">
            <Download size={14} />
            Exportar
          </button>
        </div>
      </div>
    </header>
  );
}
