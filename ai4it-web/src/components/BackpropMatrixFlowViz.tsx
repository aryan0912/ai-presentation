'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Activity } from 'lucide-react';

export default function BackpropMatrixFlowViz() {
  const [stage, setStage] = useState<number>(1);

  return (
    <div className="p-6 rounded-2xl bg-slate-950/95 border border-slate-800 space-y-6 select-none font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            3B.6 Deep-Dive · The Same Matrix, Read Backward
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Backpropagation Across Layers: Error Flows Backward in Proportion to Connection Strength
          </h4>
        </div>

        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            onClick={() => setStage(1)}
            className={`px-3 py-1 rounded transition-colors ${
              stage === 1 ? 'bg-sky-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            1. Forward Pass (pred = 2,226)
          </button>
          <button
            onClick={() => setStage(2)}
            className={`px-3 py-1 rounded transition-colors ${
              stage === 2 ? 'bg-rose-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            2. Compute Error (∂Loss/∂pred)
          </button>
          <button
            onClick={() => setStage(3)}
            className={`px-3 py-1 rounded transition-colors ${
              stage === 3 ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            3. Split Blame Backward (70% / 30%)
          </button>
        </div>
      </div>

      {/* Interactive Network Diagram with Animated Flow Lines */}
      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center">
        
        <svg viewBox="0 0 480 200" className="w-full max-w-[480px] h-[190px]">
          {/* Forward / Backward Connecting Lines */}
          {/* h1 -> pred (w_out = 0.70) */}
          <line
            x1="120" y1="55" x2="360" y2="100"
            stroke={stage >= 3 ? '#ec4899' : '#38bdf8'}
            strokeWidth={stage >= 3 ? 4 : 3}
            className="transition-all"
          />
          {/* h2 -> pred (w_out = 0.30) */}
          <line
            x1="120" y1="145" x2="360" y2="100"
            stroke={stage >= 3 ? '#ec4899' : '#34d399'}
            strokeWidth={stage >= 3 ? 2.5 : 1.8}
            className="transition-all"
          />

          {/* Hidden Node h1 */}
          <g transform="translate(120, 55)">
            <circle r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="bold">h₁: 2,190</text>
          </g>

          {/* Hidden Node h2 */}
          <g transform="translate(120, 145)">
            <circle r="22" fill="#0f172a" stroke="#34d399" strokeWidth="2.5" />
            <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="bold">h₂: 2,310</text>
          </g>

          {/* Output Node (Prediction) */}
          <g transform="translate(360, 100)">
            <circle r="26" fill="#0f172a" stroke={stage >= 2 ? '#f43f5e' : '#a855f7'} strokeWidth="3" />
            <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="bold">
              {stage >= 1 ? 'pred: 2,226' : 'ŷ'}
            </text>
          </g>

          {/* Weight Labels on Wire */}
          <text x="210" y="65" fill={stage >= 3 ? '#ec4899' : '#38bdf8'} fontSize="10" fontWeight="bold">
            w_out[0] = 0.70 {stage >= 3 ? '(takes 70% blame)' : ''}
          </text>
          <text x="210" y="145" fill={stage >= 3 ? '#ec4899' : '#34d399'} fontSize="10" fontWeight="bold">
            w_out[1] = 0.30 {stage >= 3 ? '(takes 30% blame)' : ''}
          </text>

          {/* Flow Direction Indicator */}
          {stage < 3 ? (
            <g transform="translate(240, 100)">
              <text textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">&rarr; Forward Flow &rarr;</text>
            </g>
          ) : (
            <g transform="translate(240, 100)">
              <text textAnchor="middle" fill="#ec4899" fontSize="11" fontWeight="bold">&larr; Error Flows Backward &larr;</text>
            </g>
          )}
        </svg>

      </div>

      {/* Step Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className={`p-3.5 rounded-xl border transition-colors ${
          stage === 1 ? 'bg-sky-950/40 border-sky-500 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <strong className="text-white block mb-1">Step 1: Forward Prediction</strong>
          <p className="text-[11px] leading-relaxed">
            pred = (0.7 &times; 2,190) + (0.3 &times; 2,310) = 1,533 + 693 = <strong>2,226 Litres</strong>
          </p>
        </div>

        <div className={`p-3.5 rounded-xl border transition-colors ${
          stage === 2 ? 'bg-rose-950/40 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <strong className="text-white block mb-1">Step 2: Output Error Gradient</strong>
          <p className="text-[11px] leading-relaxed">
            Error = 2,226 - 2,850 = <strong>-624 Litres</strong>
            <br />
            ∂Loss/∂pred = 2 &times; (-624) = <strong>-1,248</strong>
          </p>
        </div>

        <div className={`p-3.5 rounded-xl border transition-colors ${
          stage === 3 ? 'bg-purple-950/40 border-purple-500 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <strong className="text-white block mb-1">Step 3: Blame Distributed Backward</strong>
          <p className="text-[11px] leading-relaxed">
            ∂Loss/∂h₁ = -1,248 &times; 0.7 = <strong>-873.6 (70%)</strong>
            <br />
            ∂Loss/∂h₂ = -1,248 &times; 0.3 = <strong>-374.4 (30%)</strong>
          </p>
        </div>
      </div>

      {/* The 3Blue1Brown Insight Callout */}
      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 text-xs leading-relaxed">
        <strong className="text-emerald-300 block mb-1">
          Why It&rsquo;s Called &ldquo;Backpropagation&rdquo; &mdash; Same Numbers, Opposite Direction:
        </strong>
        Notice how <code>h₁</code> takes exactly 70% of the blame and <code>h₂</code> takes exactly 30% &mdash; in <em>precisely</em> the same ratio as the forward weights (0.7 / 0.3) that combined them! The network does not invent new math for backprop; it re-uses the forward connection weights in reverse to route credit and blame backward.
      </div>

    </div>
  );
}
