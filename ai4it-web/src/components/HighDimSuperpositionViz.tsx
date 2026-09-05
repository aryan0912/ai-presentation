'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, ShieldAlert, Zap, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function HighDimSuperpositionViz() {
  const [dimensions, setDimensions] = useState<number>(3);
  const [allowNearOrthogonal, setAllowNearOrthogonal] = useState<boolean>(false);
  const [angleTolerance, setAngleTolerance] = useState<number>(2); // 88° to 92° (±2°)

  // Exact math logic:
  // In exact 90° orthogonality: capacity = dimensions
  // In near-orthogonality (Johnson-Lindenstrauss / high-dimensional sphere packing):
  // For d = 3: exactly 3 (loose angle allows ~4-6)
  // For d = 100: ~thousands
  // For d = 12,288 (GPT-3 embedding dimension): capacity grows exponentially into hundreds of thousands
  const getCapacity = () => {
    if (!allowNearOrthogonal) {
      return dimensions;
    }
    if (dimensions === 3) return 6;
    if (dimensions === 10) return 48;
    if (dimensions === 100) return 4200;
    if (dimensions === 768) return 95000;
    if (dimensions === 12288) return 1500000;
    return dimensions * 15;
  };

  const capacity = getCapacity();

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-sky-500 to-emerald-400" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <Sparkles size={14} />
            <span>The Mind-Bender · High-Dimensional Superposition</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            How Can a 12,288-D Vector Space Store the Whole Internet?
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Why high dimensions defy 3D human intuition and allow millions of distinct concepts to coexist without interference.
          </p>
        </div>

        {/* Dimension Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { dim: 3, label: "3D (Physical Space)" },
            { dim: 100, label: "100D (Word2Vec)" },
            { dim: 12288, label: "12,288D (GPT-3 Scale)" },
          ].map((item) => (
            <button
              key={item.dim}
              onClick={() => setDimensions(item.dim)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                dimensions === item.dim
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Quiz / Dilemma Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strict Orthogonality */}
        <div
          onClick={() => setAllowNearOrthogonal(false)}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            !allowNearOrthogonal
              ? 'bg-purple-950/30 border-purple-400 shadow-lg shadow-purple-500/10'
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <span>Case A: Pure Perpendicular (Exact 90.0°)</span>
            </span>
            {!allowNearOrthogonal && (
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/40">
                ACTIVE VIEW
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            In standard linear algebra, the maximum number of mutually perpendicular vectors in an $N$-dimensional space is strictly $N$.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between font-mono">
            <span className="text-slate-400 text-[11px]">Independent Concepts:</span>
            <span className="text-lg font-bold text-purple-300">{dimensions}</span>
          </div>
        </div>

        {/* Relaxed Almost-Orthogonal Superposition */}
        <div
          onClick={() => setAllowNearOrthogonal(true)}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            allowNearOrthogonal
              ? 'bg-emerald-950/30 border-emerald-400 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <span>Case B: Superposition (Almost 90°: 88°–92°)</span>
            </span>
            {allowNearOrthogonal && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                ACTIVE VIEW
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            If vectors only need to be <strong>almost perpendicular</strong> (so their dot product is nearly 0 with negligible noise), capacity explodes exponentially!
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between font-mono">
            <span className="text-slate-400 text-[11px]">Independent Concepts:</span>
            <span className="text-lg font-bold text-emerald-400">
              {capacity.toLocaleString()} concepts!
            </span>
          </div>
        </div>
      </div>

      {/* Visual Canvas Representation */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-slate-400 text-xs font-sans max-w-xl">
          {dimensions === 3 ? (
            <span>
              In your 3D living room, you can only point along <strong>X (Length), Y (Width), and Z (Height)</strong>. Once you have 3 mutually 90° lines, there is physically zero room for a 4th perpendicular line!
            </span>
          ) : (
            <span>
              In a high-dimensional space ($D = {dimensions.toLocaleString()}$), the "equator" of an $N$-sphere concentrates nearly all its surface area. Vectors chosen at random are almost guaranteed to be at 89.9° to each other!
            </span>
          )}
        </div>

        {/* Dynamic Capacity Counter Metric */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-around w-full max-w-lg">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Space Dimension</span>
            <span className="text-2xl font-black text-sky-400">{dimensions.toLocaleString()}D</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Vector Constraint</span>
            <span className="text-sm font-bold text-slate-300">
              {allowNearOrthogonal ? '88° to 92° (Superposition)' : 'Strict 90.0°'}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Concept Capacity</span>
            <span className={`text-2xl font-black ${allowNearOrthogonal ? 'text-emerald-400' : 'text-purple-400'}`}>
              {capacity.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* The 3B1B Reveal Callout */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs font-sans text-purple-200 leading-relaxed">
        <strong className="text-white font-mono block mb-1">The Anthropic &amp; 3Blue1Brown Superposition Theory:</strong>
        This geometric property explains how GPT-4 or Claude can know Shakespeare, Python syntax, dairy cold-chain maintenance, and astrophysics simultaneously inside a model of finite dimension. Neural networks encode far more concepts than they have dimensions by packing them into almost-orthogonal superpositions!
      </div>
    </div>
  );
}
