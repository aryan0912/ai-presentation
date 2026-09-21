'use client';

import React, { useState } from 'react';
import { Target } from 'lucide-react';

type Initiative = {
  id: string;
  name: string;
  impact: number;
  complexity: number;
};

export default function ImpactComplexityMatrix() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([
    { id: '1', name: 'Log Summarization', impact: 40, complexity: 20 },
    { id: '2', name: 'Auto-Resolving Tickets', impact: 85, complexity: 90 },
    { id: '3', name: 'Semantic Code Search', impact: 70, complexity: 30 },
    { id: '4', name: 'Full Automated Refactoring', impact: 90, complexity: 95 },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggingId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, 100 - ((e.clientY - rect.top) / rect.height) * 100)); // Invert Y so bottom is 0

    setInitiatives(initiatives.map(init => 
      init.id === id ? { ...init, complexity: x, impact: y } : init
    ));
    setDraggingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
        <div>
          <h3 className="font-bold text-white flex items-center gap-2">
            <Target className="text-amber-400" size={18} /> Impact vs. Complexity
          </h3>
          <p className="text-xs text-slate-400 mt-1">Drag the initiatives to see where they belong on the matrix.</p>
        </div>
      </div>

      <div className="relative w-full aspect-square md:aspect-[3/2] bg-slate-950 border-l-2 border-b-2 border-slate-600 ml-6 mb-6">
        {/* Grid Lines */}
        <div className="absolute inset-0 border-b border-l border-slate-800 pointer-events-none" style={{ left: '50%', width: '50%', height: '50%' }} />
        <div className="absolute inset-0 border-r border-t border-slate-800 pointer-events-none" style={{ left: '0', top: '50%', width: '50%', height: '50%' }} />

        {/* Quadrant Labels */}
        <div className="absolute top-4 left-4 text-slate-500 font-bold opacity-50 uppercase text-xs">Quick Wins</div>
        <div className="absolute top-4 right-4 text-slate-500 font-bold opacity-50 uppercase text-xs">Strategic Bets</div>
        <div className="absolute bottom-4 left-4 text-slate-500 font-bold opacity-50 uppercase text-xs">Distractions</div>
        <div className="absolute bottom-4 right-4 text-slate-500 font-bold opacity-50 uppercase text-xs">Money Pits</div>

        {/* Axes Labels */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-bold text-slate-400 tracking-widest uppercase">
          Impact
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-400 tracking-widest uppercase">
          Complexity
        </div>

        {/* Drop Zone */}
        <div 
          className="absolute inset-0"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {initiatives.map(init => (
            <div
              key={init.id}
              draggable
              onDragStart={(e) => handleDragStart(e, init.id)}
              onDragEnd={() => setDraggingId(null)}
              className={`absolute w-32 -ml-16 -mb-6 p-2 rounded-lg text-xs font-bold text-center cursor-grab active:cursor-grabbing shadow-lg transition-transform ${
                draggingId === init.id ? 'opacity-50 scale-105' : 'hover:scale-105'
              }`}
              style={{
                left: `${init.complexity}%`,
                bottom: `${init.impact}%`,
                backgroundColor: init.impact > 50 ? (init.complexity < 50 ? '#059669' : '#ca8a04') : (init.complexity < 50 ? '#475569' : '#e11d48'),
                color: 'white'
              }}
            >
              {init.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
