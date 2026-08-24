'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RingData {
  id: string;
  name: string;
  short: string;
  r: number;
  cx: number;
  cy: number;
  color: string;
  border: string;
  bg: string;
  title: string;
  desc: string;
  ex: string;
}

const RINGS: RingData[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    short: 'AI',
    r: 175,
    cx: 200,
    cy: 200,
    color: '#60a5fa',
    border: 'rgba(96, 165, 250, 0.6)',
    bg: 'rgba(59, 130, 246, 0.08)',
    title: 'AI (Artificial Intelligence)',
    desc: 'Any system that mimics intelligent behavior — including rule-based expert systems, heuristic algorithms, and search trees.',
    ex: 'Example: A rule-based alert system that pages on-call staff when CPU > 90% for 5 mins.'
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    short: 'ML',
    r: 130,
    cx: 200,
    cy: 220,
    color: '#a78bfa',
    border: 'rgba(167, 139, 250, 0.7)',
    bg: 'rgba(139, 92, 246, 0.12)',
    title: 'ML (Machine Learning)',
    desc: 'A subset of AI: systems that learn statistical patterns from data rather than following explicitly hardcoded rules.',
    ex: 'Example: Linear regression predicting tomorrow’s milk collection from past 7 days.'
  },
  {
    id: 'dl',
    name: 'Deep Learning',
    short: 'DL',
    r: 88,
    cx: 200,
    cy: 242,
    color: '#f472b6',
    border: 'rgba(244, 114, 182, 0.8)',
    bg: 'rgba(236, 72, 153, 0.16)',
    title: 'DL (Deep Learning)',
    desc: 'A subset of ML: layered neural networks with non-linear activation functions that automatically extract representations from complex data.',
    ex: 'Example: Multi-layer neural network classifying whether network telemetry indicates an anomaly.'
  },
  {
    id: 'gen',
    name: 'Generative AI',
    short: 'GenAI',
    r: 48,
    cx: 200,
    cy: 265,
    color: '#34d399',
    border: 'rgba(52, 211, 153, 0.9)',
    bg: 'rgba(16, 185, 129, 0.25)',
    title: 'Generative AI (GenAI)',
    desc: 'A subset of Deep Learning: foundation models (LLMs, Diffusion) trained on vast corpora to generate novel text, code, images, or plans.',
    ex: 'Example: An LLM copilot generating Python data-cleaning scripts or drafting incident postmortems.'
  }
];

export default function NestedRings() {
  const [activeRing, setActiveRing] = useState<string>('ai');

  const current = RINGS.find((r) => r.id === activeRing) || RINGS[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      {/* Left: Concentric Inscribed Circles SVG Visualizer */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl relative">
        <span className="text-[11px] font-mono uppercase text-slate-500 mb-2 block tracking-wider">
          Interactive Concentric Hierarchy · Click or Hover Any Ring
        </span>

        <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-lg">
            <defs>
              <radialGradient id="ring-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Inscribed concentric circles rendered largest to smallest */}
            {RINGS.map((ring) => {
              const isSelected = activeRing === ring.id;
              return (
                <g
                  key={ring.id}
                  onClick={() => setActiveRing(ring.id)}
                  onMouseEnter={() => setActiveRing(ring.id)}
                  className="cursor-pointer transition-all duration-300"
                >
                  <circle
                    cx={ring.cx}
                    cy={ring.cy}
                    r={ring.r}
                    fill={ring.bg}
                    stroke={isSelected ? ring.color : ring.border}
                    strokeWidth={isSelected ? 3.5 : 1.5}
                    strokeDasharray={isSelected ? undefined : '4 2'}
                    className="transition-all duration-300 hover:opacity-90"
                    style={{
                      filter: isSelected ? `drop-shadow(0 0 12px ${ring.color})` : undefined,
                    }}
                  />
                  {/* Outer label on top arc */}
                  <text
                    x={ring.cx}
                    y={ring.cy - ring.r + 22}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : ring.color}
                    fontSize={ring.id === 'gen' ? '12' : '13'}
                    fontWeight="bold"
                    fontFamily="monospace"
                    className="select-none pointer-events-none tracking-wider"
                  >
                    {ring.short} {ring.id === 'ai' ? '(All Artificial Intelligence)' : ''}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Ring selection pills below */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {RINGS.map((ring) => (
            <button
              key={ring.id}
              onClick={() => setActiveRing(ring.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
                activeRing === ring.id
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              style={{
                borderColor: activeRing === ring.id ? ring.color : undefined,
                color: activeRing === ring.id ? ring.color : undefined,
              }}
            >
              {ring.short}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Rich Animated Explanation Card */}
      <div className="lg:col-span-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-8 rounded-3xl bg-slate-900/90 border backdrop-blur-xl shadow-2xl flex flex-col justify-between min-h-[340px]"
            style={{ borderColor: `${current.color}40` }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                  style={{ background: `${current.color}18`, color: current.color }}
                >
                  Subset Hierarchy Level {RINGS.findIndex((r) => r.id === current.id) + 1} of 4
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {current.id === 'gen' ? 'Most Specific (2020s)' : current.id === 'ai' ? 'Broadest (1950s)' : 'Inner Discipline'}
                </span>
              </div>

              <h3 className="text-3xl font-extrabold text-white mb-3" style={{ color: current.color }}>
                {current.title}
              </h3>

              <p className="text-base text-slate-200 leading-relaxed mb-6">
                {current.desc}
              </p>
            </div>

            <div
              className="p-4 rounded-xl border bg-slate-950/80 text-xs md:text-sm text-slate-300 leading-relaxed font-mono"
              style={{ borderLeftColor: current.color, borderLeftWidth: 4 }}
            >
              <strong className="text-white block mb-1">Industrial Operational Example:</strong>
              {current.ex}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
