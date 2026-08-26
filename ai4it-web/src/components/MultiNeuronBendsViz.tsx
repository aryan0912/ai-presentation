'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MultiNeuronBendsViz() {
  const [highlightNeuron, setHighlightNeuron] = useState<'all' | 'n1' | 'n2'>('all');

  const width = 500;
  const height = 240;
  const padding = { top: 25, right: 30, bottom: 45, left: 50 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Day range: 1 to 7
  const scaleX = (day: number) => padding.left + ((day - 1) / 6) * plotWidth;
  // Output range: 0 to 3000
  const scaleY = (val: number) => padding.top + plotHeight - (val / 3000) * plotHeight;

  // Generate curves for Day 1..7
  // Neuron 1 (Baseline Trend): ReLU(40*(day - 1) + 2100)
  // Neuron 2 (Festival Spike Detector): ReLU(450*(day - 5.5)) -> 0 on days 1-5, +225 on day 6, 0 otherwise
  const days = [1, 2, 3, 4, 5, 6, 7];

  const n1Pts = days.map((d) => ({
    x: scaleX(d),
    y: scaleY(Math.max(0, 42 * d + 2100)),
    val: Math.max(0, 42 * d + 2100),
  }));

  const n2Pts = days.map((d) => {
    const val = d === 6 ? 430 : d === 7 ? 0 : 0;
    return {
      x: scaleX(d),
      y: scaleY(val * 3 + 200), // Scaled for visibility
      val: val,
    };
  });

  const combinedPts = days.map((d) => {
    const n1 = Math.max(0, 42 * d + 2100);
    const n2 = d === 6 ? 430 : 0;
    return {
      x: scaleX(d),
      y: scaleY(n1 + n2),
      val: n1 + n2,
    };
  });

  const pathN1 = n1Pts.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');
  const pathN2 = n2Pts.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');
  const pathCombined = combinedPts.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');

  return (
    <div className="p-6 rounded-2xl bg-slate-950/95 border border-slate-800 space-y-4 select-none">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-mono text-purple-400 uppercase font-bold tracking-wider">
            3B.5 Visual Demonstration · Piecewise Non-Linearity
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Why More Neurons = More Bends (Combining Kinks)
          </h4>
        </div>

        {/* View Filters */}
        <div className="flex gap-1.5 font-mono text-xs">
          <button
            onClick={() => setHighlightNeuron('all')}
            className={`px-2.5 py-1 rounded ${
              highlightNeuron === 'all' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Combined Output
          </button>
          <button
            onClick={() => setHighlightNeuron('n1')}
            className={`px-2.5 py-1 rounded ${
              highlightNeuron === 'n1' ? 'bg-sky-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Neuron 1 (Trend)
          </button>
          <button
            onClick={() => setHighlightNeuron('n2')}
            className={`px-2.5 py-1 rounded ${
              highlightNeuron === 'n2' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Neuron 2 (Festival Spike)
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full h-[240px] bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Grid lines */}
          <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1.5" />
          
          {/* Day Ticks */}
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <g key={d}>
              <line x1={scaleX(d)} y1={padding.top} x2={scaleX(d)} y2={padding.top + plotHeight + 4} stroke="#1e293b" strokeDasharray="3 3" />
              <text x={scaleX(d)} y={padding.top + plotHeight + 16} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                {d === 6 ? 'Sat (6)' : `Day ${d}`}
              </text>
            </g>
          ))}

          {/* Neuron 1 Line (Blue) */}
          {(highlightNeuron === 'all' || highlightNeuron === 'n1') && (
            <motion.path
              d={pathN1}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={highlightNeuron === 'n1' ? 3.5 : 2}
              strokeDasharray={highlightNeuron === 'all' ? '4 3' : 'none'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Neuron 2 Spike Kink (Rose) */}
          {(highlightNeuron === 'all' || highlightNeuron === 'n2') && (
            <motion.path
              d={pathN2}
              fill="none"
              stroke="#f43f5e"
              strokeWidth={highlightNeuron === 'n2' ? 3.5 : 2}
              strokeDasharray={highlightNeuron === 'all' ? '4 3' : 'none'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Combined Summed Line (Emerald) */}
          {highlightNeuron === 'all' && (
            <motion.path
              d={pathCombined}
              fill="none"
              stroke="#34d399"
              strokeWidth="3.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          )}

          {/* Saturday Point Annotation */}
          <circle cx={scaleX(6)} cy={scaleY(2850)} r="6" fill="#34d399" stroke="#ffffff" strokeWidth="2" />
          <text x={scaleX(6) - 10} y={scaleY(2850) - 10} fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">
            Combined Fit: 2,850 L
          </text>
        </svg>
      </div>

      {/* Narrative Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-sky-400 font-bold block mb-1">Neuron 1 (General Trend)</span>
          <p className="text-slate-400 text-[11px]">
            Fits the gentle Monday-to-Friday climb (~2,140L to ~2,350L).
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-rose-400 font-bold block mb-1">Neuron 2 (Festival Kink)</span>
          <p className="text-slate-400 text-[11px]">
            ReLU clamps it to 0 on weekdays; its kink triggers ONLY on Saturday (+450L).
          </p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
          <span className="text-emerald-300 font-bold block mb-1">Output Layer = N₁ + N₂</span>
          <p className="text-emerald-200 text-[11px]">
            Linear combination bends perfectly around Saturday without breaking the weekday fit!
          </p>
        </div>
      </div>

    </div>
  );
}
