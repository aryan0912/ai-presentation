'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';

export default function ReLUCurveBender() {
  const [neuronCount, setNeuronCount] = useState<number>(3);
  const [hingePosition, setHingePosition] = useState<number>(5.0); // Saturday hinge around Day 5

  // Actual milk dataset
  const points = [
    { day: 1, milk: 2140 },
    { day: 2, milk: 2210 },
    { day: 3, milk: 2180 },
    { day: 4, milk: 2300 },
    { day: 5, milk: 2350 },
    { day: 6, milk: 2850 }, // The Spike!
    { day: 7, milk: 2390 },
  ];

  // SVG coordinate scaling
  // X: Day 1-7 mapped to 40 - 560
  const scaleX = (d: number) => 40 + ((d - 1) / 6) * 520;
  // Y: Milk 2000-3000 mapped to 250 - 30 (inverted for SVG)
  const scaleY = (m: number) => 250 - ((m - 2000) / 1000) * 220;

  // Calculate curve points depending on neuronCount
  const getCurvePath = () => {
    const segments: string[] = [];
    for (let d = 1; d <= 7; d += 0.2) {
      let val = 2100 + (d - 1) * 55; // Baseline slope

      if (neuronCount >= 2) {
        // Hinge 1: Surge starts climbing at Day hingePosition
        val += Math.max(0, 480 * (d - hingePosition));
      }
      if (neuronCount >= 3) {
        // Hinge 2: Relief / drop after Saturday (Day 6)
        val -= Math.max(0, 520 * (d - 6.0));
      }

      const px = scaleX(d);
      const py = scaleY(val);
      if (segments.length === 0) {
        segments.push(`M ${px} ${py}`);
      } else {
        segments.push(`L ${px} ${py}`);
      }
    }
    return segments.join(' ');
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-sky-500 to-amber-500" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <TrendingUp size={14} />
            <span>3Blue1Brown Visual Anchor 3 · How Neural Networks Bend</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            The Geometry of ReLU: Building Curves from Hinges
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Universal Approximation made visual: adding simple linear hinges together allows a neural network to bend around any arbitrary surge.
          </p>
        </div>

        {/* Preset button selector for number of neurons */}
        <div className="flex items-center gap-2">
          {[
            { n: 1, label: "1 Neuron (Linear Line)" },
            { n: 2, label: "2 Neurons (One Hinge)" },
            { n: 3, label: "3 Neurons (Curve Clamps Saturday!)" },
          ].map((item) => (
            <button
              key={item.n}
              onClick={() => setNeuronCount(item.n)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                neuronCount === item.n
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center relative">
        <svg viewBox="0 0 600 280" className="w-full max-w-[580px] h-[240px]">
          {/* Grid lines */}
          <line x1="40" y1="250" x2="560" y2="250" stroke="#334155" strokeWidth="1.5" />
          <line x1="40" y1="30" x2="40" y2="250" stroke="#334155" strokeWidth="1.5" />

          {/* Grid labels */}
          <text x="35" y="255" fill="#64748b" fontSize="10" textAnchor="end">2,000L</text>
          <text x="35" y="145" fill="#64748b" fontSize="10" textAnchor="end">2,500L</text>
          <text x="35" y="40" fill="#64748b" fontSize="10" textAnchor="end">3,000L</text>

          {/* Day X-axis ticks */}
          {points.map((p) => (
            <g key={p.day}>
              <line x1={scaleX(p.day)} y1="250" x2={scaleX(p.day)} y2="255" stroke="#64748b" />
              <text x={scaleX(p.day)} y="270" fill={p.day === 6 ? "#f59e0b" : "#94a3b8"} fontSize="11" fontWeight={p.day === 6 ? "bold" : "normal"} textAnchor="middle">
                {p.day === 6 ? "Sat (6)*" : `D${p.day}`}
              </text>
            </g>
          ))}

          {/* Data Points */}
          {points.map((p) => (
            <g key={p.day}>
              <circle
                cx={scaleX(p.day)}
                cy={scaleY(p.milk)}
                r={p.day === 6 ? 7 : 4.5}
                fill={p.day === 6 ? "#f59e0b" : "#38bdf8"}
                stroke="#ffffff"
                strokeWidth={p.day === 6 ? 2 : 1}
              />
              <text
                x={scaleX(p.day)}
                y={scaleY(p.milk) - 10}
                fill={p.day === 6 ? "#f59e0b" : "#cbd5e1"}
                fontSize="10"
                fontWeight={p.day === 6 ? "bold" : "normal"}
                textAnchor="middle"
              >
                {p.milk}L
              </text>
            </g>
          ))}

          {/* Fitted Curve */}
          <motion.path
            d={getCurvePath()}
            fill="none"
            stroke={neuronCount === 1 ? "#f43f5e" : neuronCount === 2 ? "#38bdf8" : "#a855f7"}
            strokeWidth="3.5"
            transition={{ duration: 0.4 }}
          />

          {/* Hinge Marker when >= 2 neurons */}
          {neuronCount >= 2 && (
            <g>
              <line
                x1={scaleX(hingePosition)}
                y1="30"
                x2={scaleX(hingePosition)}
                y2="250"
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text x={scaleX(hingePosition) + 6} y="45" fill="#c084fc" fontSize="10" fontWeight="bold">
                ReLU Hinge 1 (Active)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Dynamic Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className={`p-4 rounded-xl border ${neuronCount === 1 ? 'bg-rose-950/40 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
          <span className="font-bold block text-xs mb-1">1 Neuron (Linear Regression)</span>
          <p className="text-[11px] font-sans">
            A rigid flat wooden ruler. It misses Saturday by 326 Liters because a single linear function cannot bend.
          </p>
        </div>

        <div className={`p-4 rounded-xl border ${neuronCount === 2 ? 'bg-sky-950/40 border-sky-500 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
          <span className="font-bold block text-xs mb-1">2 Neurons (One Hinge)</span>
          <p className="text-[11px] font-sans">
            One ReLU activation adds a kink ($a = \max(0, z)$). The line remains flat all week, then hinges upward for Saturday!
          </p>
        </div>

        <div className={`p-4 rounded-xl border ${neuronCount === 3 ? 'bg-purple-950/40 border-purple-500 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
          <span className="font-bold block text-xs mb-1">3 Neurons (Full Spike Capture)</span>
          <p className="text-[11px] font-sans">
            A second hinge clamps back down for Sunday. The network models the spike perfectly without ruining weekday accuracy!
          </p>
        </div>
      </div>
    </div>
  );
}
