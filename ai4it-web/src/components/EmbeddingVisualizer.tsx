'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Calculator, ArrowRight, MousePointerClick } from 'lucide-react';

// Define the 2D coordinate space
// X-axis: Gender (Male -1 to Female +1)
// Y-axis: Status (Common -1 to Royal +1)
const WORD_EMBEDDINGS = [
  { word: "King", x: -0.8, y: 0.9 },
  { word: "Queen", x: 0.8, y: 0.9 },
  { word: "Man", x: -0.8, y: -0.2 },
  { word: "Woman", x: 0.8, y: -0.2 },
  { word: "Prince", x: -0.5, y: 0.6 },
  { word: "Princess", x: 0.5, y: 0.6 },
  { word: "Boy", x: -0.7, y: -0.6 },
  { word: "Girl", x: 0.7, y: -0.6 },
];

export default function EmbeddingVisualizer() {
  const [activeMode, setActiveMode] = useState<'explore' | 'math'>('explore');
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Helper to convert coordinate (-1 to 1) to percentage for CSS positioning
  const toPct = (val: number) => `${((val + 1) / 2) * 100}%`;

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-slate-700/50 space-y-8 font-sans shadow-2xl relative overflow-hidden my-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
            <Map size={14} />
            <span>The Coordinates of Meaning</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Word Embeddings: Language as Geometry
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            AI maps words into a physical space. Words with similar meanings live in the same neighborhood. Because they are just coordinates on a map, you can do math with words!
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 font-mono text-xs shrink-0">
           <button
            onClick={() => setActiveMode('explore')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${activeMode === 'explore' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <MousePointerClick size={14} /> Explore Map
          </button>
          <button
            onClick={() => setActiveMode('math')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${activeMode === 'math' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <Calculator size={14} /> Vector Math
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
        
        {/* Left: The 2D Plot */}
        <div className="lg:col-span-2 relative aspect-square max-h-[500px] w-full max-w-[500px] mx-auto bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          {/* Axes */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div className="w-full h-px bg-slate-500 absolute top-1/2 -translate-y-1/2"></div>
            <div className="h-full w-px bg-slate-500 absolute left-1/2 -translate-x-1/2"></div>
          </div>
          
          {/* Axis Labels */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold bg-slate-900 px-2">+ Royal</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-2">- Common</div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold bg-slate-900 px-2 whitespace-nowrap">- Male</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold bg-slate-900 px-2 whitespace-nowrap">+ Female</div>

          {/* Render Points */}
          {WORD_EMBEDDINGS.map((point) => {
            const isHovered = hoveredWord === point.word;
            
            // Math mode specific highlights
            let mathHighlight = false;
            let mathColor = "";
            if (activeMode === 'math') {
              if (point.word === 'King') { mathHighlight = true; mathColor = 'bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]'; }
              if (point.word === 'Man') { mathHighlight = true; mathColor = 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]'; }
              if (point.word === 'Woman') { mathHighlight = true; mathColor = 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'; }
              if (point.word === 'Queen') { mathHighlight = true; mathColor = 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]'; }
            }

            return (
              <div
                key={point.word}
                className="absolute w-0 h-0 flex items-center justify-center transition-all duration-500"
                style={{ 
                  left: toPct(point.x), 
                  bottom: toPct(point.y) 
                }}
                onMouseEnter={() => setHoveredWord(point.word)}
                onMouseLeave={() => setHoveredWord(null)}
              >
                <div className={`relative flex flex-col items-center justify-center cursor-crosshair group ${activeMode === 'math' && !mathHighlight ? 'opacity-30' : 'opacity-100'}`}>
                  {/* The dot */}
                  <div className={`w-3 h-3 rounded-full border-2 border-slate-900 transition-all ${mathHighlight ? mathColor : 'bg-purple-400 group-hover:scale-150'}`} />
                  
                  {/* The label */}
                  <div className={`absolute top-4 px-2 py-1 rounded text-xs font-mono font-bold whitespace-nowrap pointer-events-none transition-all ${
                    isHovered || mathHighlight ? 'bg-slate-800 text-white shadow-lg scale-110 z-10' : 'text-slate-400'
                  }`}>
                    {point.word}
                    {isHovered && <div className="text-[9px] font-normal text-slate-500 mt-0.5">[{point.x}, {point.y}]</div>}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Math Mode Arrows */}
          {activeMode === 'math' && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                </marker>
              </defs>
              {/* King to generic Royalty (minus Man) - pointing downish? Actually King - Man = Royal concept vector */}
              {/* Let's animate a physical path from King, subtract Man, add Woman */}
              {/* King (-0.8, 0.9). Man (-0.8, -0.2). Vector Man->King is (0, 1.1). */}
              {/* Let's just draw lines connecting them. */}
              <motion.line 
                x1="10%" y1="5%" // King approx
                x2="10%" y2="60%" // Man approx (actually y is from top, so bottom is 60%)
                stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
              />
              <motion.line 
                x1="10%" y1="60%" 
                x2="90%" y2="60%" // Woman approx
                stroke="#10b981" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow-green)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }}
              />
              <motion.line 
                x1="90%" y1="60%" 
                x2="90%" y2="5%" // Queen approx
                stroke="#f59e0b" strokeWidth="2" strokeDasharray="4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 2 }}
              />
            </svg>
          )}

        </div>

        {/* Right: Explanations */}
        <div className="space-y-6">
          {activeMode === 'explore' ? (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="font-bold text-white flex items-center gap-2">
                <MousePointerClick size={16} className="text-purple-400" /> Hover the Map
              </h4>
              <p className="text-xs leading-relaxed text-slate-400">
                Notice how the words are arranged. We only used 2 dimensions (Gender and Status) for this example. 
              </p>
              <p className="text-xs leading-relaxed text-slate-400">
                In a real AI model like GPT-4, words are mapped in <strong>thousands of dimensions</strong>—capturing not just gender and status, but plural vs singular, emotion, grammar, and deep context.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-500">
                Current Hover: {hoveredWord ? <span className="text-purple-400 font-bold">{hoveredWord}</span> : 'None'}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-4">
                <h4 className="font-bold text-amber-400 flex items-center gap-2">
                  <Calculator size={16} /> Vector Arithmetic
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  Because words are just coordinates, we can add and subtract them like math equations. The AI learns logical relationships perfectly.
                </p>
                
                <div className="space-y-2 mt-4 font-mono text-xs">
                  <div className="flex items-center gap-2 p-2 rounded bg-slate-900/50 border border-slate-800">
                    <span className="text-sky-400 font-bold">King</span>
                    <span className="text-slate-500">[-0.8, 0.9]</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-500">-</span>
                    <span className="text-rose-400 font-bold">Man</span>
                    <span className="text-slate-500">[-0.8, -0.2]</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-500">+</span>
                    <span className="text-emerald-400 font-bold">Woman</span>
                    <span className="text-slate-500">[0.8, -0.2]</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-amber-900/40 border border-amber-700/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    <span className="text-amber-400 font-bold">= Queen</span>
                    <span className="text-amber-200/50">[0.8, 0.9]</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
