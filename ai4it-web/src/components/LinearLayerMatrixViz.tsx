'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LinearLayerMatrixViz() {
  const [hoveredNeuron, setHoveredNeuron] = useState<'all' | 'h1' | 'h2'>('all');
  const [hoveredWeight, setHoveredWeight] = useState<string | null>(null);

  return (
    <div className="p-6 rounded-2xl bg-slate-950/95 border border-slate-800 space-y-6 select-none font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
            3B.5 Deep-Dive · 3Blue1Brown-Style Dual Representation
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Where &ldquo;Linear Layer&rdquo; Comes From: Graph of Circles = Rows of a Matrix
          </h4>
        </div>

        <div className="flex gap-1.5 text-[11px]">
          <button
            onClick={() => setHoveredNeuron('all')}
            className={`px-3 py-1 rounded transition-colors ${
              hoveredNeuron === 'all' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Full Layer
          </button>
          <button
            onClick={() => setHoveredNeuron('h1')}
            className={`px-3 py-1 rounded transition-colors ${
              hoveredNeuron === 'h1' ? 'bg-sky-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Row 1 (Neuron h₁)
          </button>
          <button
            onClick={() => setHoveredNeuron('h2')}
            className={`px-3 py-1 rounded transition-colors ${
              hoveredNeuron === 'h2' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Row 2 (Neuron h₂)
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual View: Circles & Lines (Left) vs. Matrix Formulation (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Circles and Lines Graph Diagram */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center relative">
          <span className="text-[11px] font-bold text-slate-400 uppercase mb-4 tracking-wide">
            1. Graph-of-Circles View
          </span>

          <svg viewBox="0 0 260 200" className="w-full max-w-[260px] h-[190px]">
            {/* Connection Lines */}
            {/* x1 (Day=6) -> h1 (w=50) */}
            <line
              x1="45" y1="55" x2="215" y2="55"
              stroke={hoveredNeuron === 'all' || hoveredNeuron === 'h1' ? '#38bdf8' : '#334155'}
              strokeWidth={hoveredWeight === 'w11' ? 4 : 2.5}
              className="transition-all"
            />
            {/* x2 (Temp=31) -> h1 (w=-10) */}
            <line
              x1="45" y1="145" x2="215" y2="55"
              stroke={hoveredNeuron === 'all' || hoveredNeuron === 'h1' ? '#f43f5e' : '#334155'}
              strokeWidth={hoveredWeight === 'w12' ? 4 : 2}
              strokeDasharray="4 3"
              className="transition-all"
            />

            {/* x1 (Day=6) -> h2 (w=-20) */}
            <line
              x1="45" y1="55" x2="215" y2="145"
              stroke={hoveredNeuron === 'all' || hoveredNeuron === 'h2' ? '#f43f5e' : '#334155'}
              strokeWidth={hoveredWeight === 'w21' ? 4 : 2}
              strokeDasharray="4 3"
              className="transition-all"
            />
            {/* x2 (Temp=31) -> h2 (w=30) */}
            <line
              x1="45" y1="145" x2="215" y2="145"
              stroke={hoveredNeuron === 'all' || hoveredNeuron === 'h2' ? '#34d399' : '#334155'}
              strokeWidth={hoveredWeight === 'w22' ? 4 : 2.5}
              className="transition-all"
            />

            {/* Input Nodes */}
            <g transform="translate(45, 55)">
              <circle r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="bold">x₁: 6</text>
            </g>
            <g transform="translate(45, 145)">
              <circle r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="bold">x₂: 31</text>
            </g>

            {/* Hidden Nodes */}
            <g transform="translate(215, 55)">
              <circle r="20" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text textAnchor="middle" dy="4" fill="#38bdf8" fontSize="10" fontWeight="bold">h₁</text>
            </g>
            <g transform="translate(215, 145)">
              <circle r="20" fill="#0f172a" stroke="#34d399" strokeWidth="2.5" />
              <text textAnchor="middle" dy="4" fill="#34d399" fontSize="10" fontWeight="bold">h₂</text>
            </g>

            {/* Labels */}
            <text x="130" y="45" fill="#38bdf8" fontSize="9" fontWeight="bold">w₁₁ = 50</text>
            <text x="130" y="160" fill="#34d399" fontSize="9" fontWeight="bold">w₂₂ = 30</text>
          </svg>

          <p className="text-[10px] text-slate-400 text-center mt-2">
            Each connecting wire is a weight. Blue = Positive, Red = Negative.
          </p>
        </div>

        {/* Right: Matrix Multiplication View Wx + b */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wide">
              2. Matrix View: z = W · x + b
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Row 1 = h₁, Row 2 = h₂</span>
          </div>

          {/* KaTeX / Visual Matrix Alignment */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-center gap-2 md:gap-3 text-sm md:text-base font-mono">
            {/* Matrix W */}
            <div className="flex items-center">
              <span className="text-2xl text-slate-600 font-light">[</span>
              <div className="flex flex-col text-center px-1">
                <span
                  onMouseEnter={() => { setHoveredNeuron('h1'); setHoveredWeight('w11'); }}
                  onMouseLeave={() => { setHoveredNeuron('all'); setHoveredWeight(null); }}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    hoveredNeuron === 'h1' ? 'bg-sky-950 text-sky-300 font-bold' : 'text-slate-300'
                  }`}
                >
                  50 &nbsp; -10
                </span>
                <span
                  onMouseEnter={() => { setHoveredNeuron('h2'); setHoveredWeight('w21'); }}
                  onMouseLeave={() => { setHoveredNeuron('all'); setHoveredWeight(null); }}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    hoveredNeuron === 'h2' ? 'bg-emerald-950 text-emerald-300 font-bold' : 'text-slate-300'
                  }`}
                >
                  -20 &nbsp; 30
                </span>
              </div>
              <span className="text-2xl text-slate-600 font-light">]</span>
            </div>

            <span className="text-slate-500 font-bold">&times;</span>

            {/* Input Vector x */}
            <div className="flex items-center">
              <span className="text-2xl text-slate-600 font-light">[</span>
              <div className="flex flex-col text-center px-1">
                <span className="text-sky-400 font-bold">6</span>
                <span className="text-sky-400 font-bold">31</span>
              </div>
              <span className="text-2xl text-slate-600 font-light">]</span>
            </div>

            <span className="text-slate-500 font-bold">+</span>

            {/* Bias Vector b */}
            <div className="flex items-center">
              <span className="text-2xl text-slate-600 font-light">[</span>
              <div className="flex flex-col text-center px-1">
                <span className="text-amber-400 font-bold">2,200</span>
                <span className="text-amber-400 font-bold">1,500</span>
              </div>
              <span className="text-2xl text-slate-600 font-light">]</span>
            </div>

            <span className="text-slate-500 font-bold">=</span>

            {/* Resulting Pre-Activation Vector z */}
            <div className="flex items-center">
              <span className="text-2xl text-purple-500 font-light">[</span>
              <div className="flex flex-col text-center px-1">
                <span className="text-sky-300 font-bold">2,190 (z₁)</span>
                <span className="text-emerald-300 font-bold">2,310 (z₂)</span>
              </div>
              <span className="text-2xl text-purple-500 font-light">]</span>
            </div>
          </div>

          {/* Row-by-Row Explanations */}
          <div className="space-y-2 text-[11px]">
            <div className={`p-2.5 rounded-lg border transition-colors ${
              hoveredNeuron === 'h1' || hoveredNeuron === 'all'
                ? 'bg-sky-950/40 border-sky-500/40 text-sky-200'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <strong className="text-sky-300 block mb-0.5">Row 1 (Neuron h₁ &mdash; Leans on Day):</strong>
              z₁ = (50 &times; 6) + (-10 &times; 31) + 2,200 = 300 - 310 + 2,200 = <strong>2,190</strong> &rarr; a₁ = ReLU(2,190) = <strong>2,190</strong>
            </div>

            <div className={`p-2.5 rounded-lg border transition-colors ${
              hoveredNeuron === 'h2' || hoveredNeuron === 'all'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <strong className="text-emerald-300 block mb-0.5">Row 2 (Neuron h₂ &mdash; Leans on Temp):</strong>
              z₂ = (-20 &times; 6) + (30 &times; 31) + 1,500 = -120 + 930 + 1,500 = <strong>2,310</strong> &rarr; a₂ = ReLU(2,310) = <strong>2,310</strong>
            </div>
          </div>
        </div>

      </div>

      {/* The Crucial Linguistic & Engineering Distinction */}
      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-purple-200 text-xs leading-relaxed">
        <strong className="text-purple-300 block mb-1">
          Why Is It Called a &ldquo;Linear Layer&rdquo; If Neural Networks Are Non-Linear?
        </strong>
        Because the matrix transformation <code>z = Wx + b</code> is strictly linear (affine). The layer itself is completely flat! The non-linearity comes <em>entirely</em> from <code>a = ReLU(z)</code> applied after. Stack linear layers alternating with ReLU activations, and the network can bend around anything &mdash; but each individual linear layer is literally just Linear Regression written as a matrix!
      </div>

    </div>
  );
}
