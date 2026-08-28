'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Ban, Zap, Clock, Info, CheckCircle2 } from 'lucide-react';

export default function LstmGateFlowViz() {
  const [activeGate, setActiveGate] = useState<'forget' | 'input' | 'output'>('forget');

  const gateData = {
    forget: {
      name: '1. Forget Gate (f_t)',
      tag: 'Sigmoid Filter (\\sigma)',
      color: '#f43f5e',
      border: 'border-rose-500',
      bg: 'bg-rose-950/40',
      formula: 'f_t = sigmoid(W_f * [h[t-1], x_t] + b_f)',
      purpose: 'Multiplies old cell state by a decimal between 0 (discard completely) and 1 (retain completely).',
      analogy: 'Silences transient baseline CPU fluctuations so they do not trigger alert alarms.',
    },
    input: {
      name: '2. Input & Candidate Gate (i_t, \\tilde{C}_t)',
      tag: 'Sigmoid (\\sigma) + Tanh',
      color: '#38bdf8',
      border: 'border-sky-500',
      bg: 'bg-sky-950/40',
      formula: 'i_t = sigmoid(W_i * [h[t-1], x_t] + b_i)  and  C~_t = tanh(W_c * [h[t-1], x_t] + b_c)',
      purpose: 'Decides what critical new information to write into the long-term cell state highway.',
      analogy: 'Writes a confirmed critical chilling compressor breakdown into the incident log.',
    },
    output: {
      name: '3. Output Gate (o_t)',
      tag: 'Sigmoid Filter (\\sigma)',
      color: '#34d399',
      border: 'border-emerald-500',
      bg: 'bg-emerald-950/40',
      formula: 'o_t = sigmoid(W_o * [h[t-1], x_t] + b_o)  =>  h_t = o_t * tanh(C_t)',
      purpose: 'Filters the permanent cell state to decide what immediate hidden vector h_t to emit.',
      analogy: 'Dispatches an immediate alert page to on-call engineers while storing the root cause.',
    },
  };

  const current = gateData[activeGate];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      {/* Top neon indicator */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-rose-500 to-sky-400 animate-pulse" />

      {/* Header & Gate Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
              Hop 2 · Gated Recurrent Architecture
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            LSTM Cell Highway: The Protected Long-Term Conveyor Belt
          </h4>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px]">
          {(['forget', 'input', 'output'] as const).map((gKey) => {
            const g = gateData[gKey];
            const isSelected = activeGate === gKey;
            return (
              <button
                key={gKey}
                onClick={() => setActiveGate(gKey)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {g.name.split('(')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Polish 2: High-Resolution Precision SVG Diagram of LSTM Interior */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800 flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
        <svg viewBox="0 0 740 320" className="w-full max-w-[740px] h-[280px]">
          <defs>
            <linearGradient id="cellHighwayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <filter id="lstmGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={current.color} floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Main Outer LSTM Cell Container Box */}
          <rect
            x="80"
            y="40"
            width="580"
            height="240"
            rx="24"
            fill="#090d16"
            stroke="#334155"
            strokeWidth="2"
          />
          <text x="105" y="70" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">
            LSTM CELL CORE (t)
          </text>

          {/* Top Highway: Cell State Conveyor C_{t-1} -> C_t */}
          <line x1="20" y1="90" x2="720" y2="90" stroke="url(#cellHighwayGrad)" strokeWidth="4" />
          <polygon points="715,85 730,90 715,95" fill="#c084fc" />
          <text x="30" y="78" fill="#c084fc" fontSize="11" fontWeight="bold">C<tspan baselineShift="sub" fontSize="9">t-1</tspan> (Past Long Memory)</text>
          <text x="610" y="78" fill="#c084fc" fontSize="11" fontWeight="bold">C_t (New Long Memory)</text>

          {/* Bottom Hidden State Highway h_{t-1} -> h_t */}
          <line x1="20" y1="250" x2="720" y2="250" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
          <polygon points="715,246 728,250 715,254" fill="#38bdf8" />
          <text x="30" y="272" fill="#38bdf8" fontSize="10" fontWeight="bold">h<tspan baselineShift="sub" fontSize="8">t-1</tspan> (Short Memory)</text>
          <text x="640" y="272" fill="#38bdf8" fontSize="10" fontWeight="bold">h_t (Output State)</text>

          {/* Input Vector x_t coming up */}
          <line x1="140" y1="310" x2="140" y2="250" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="140" cy="305" r="12" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="140" y="309" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">x_t</text>

          {/* Shared Input Bus [h_{t-1}, x_t] */}
          <line x1="140" y1="250" x2="520" y2="250" stroke="#38bdf8" strokeWidth="2" />

          {/* GATE 1: FORGET GATE */}
          <g transform="translate(200, 150)">
            <line x1="0" y1="100" x2="0" y2="0" stroke="#f43f5e" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="-60" stroke="#f43f5e" strokeWidth="2" />
            <rect
              x="-24"
              y="-18"
              width="48"
              height="36"
              rx="8"
              fill={activeGate === 'forget' ? '#881337' : '#1e293b'}
              stroke="#f43f5e"
              strokeWidth="2"
              filter={activeGate === 'forget' ? 'url(#lstmGlow)' : 'none'}
            />
            <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="13" fontWeight="bold">&sigma;</text>
            <text x="0" y="30" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">Forget Gate</text>

            {/* Pointwise Multiplication Node on Highway */}
            <circle cx="0" cy="-60" r="14" fill="#0f172a" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="0" y="-56" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="bold">&times;</text>
          </g>

          {/* GATE 2: INPUT GATE & CANDIDATE */}
          <g transform="translate(360, 150)">
            {/* Input Gate (Sigmoid) */}
            <line x1="-30" y1="100" x2="-30" y2="0" stroke="#38bdf8" strokeWidth="2" />
            <rect
              x="-54"
              y="-18"
              width="48"
              height="36"
              rx="8"
              fill={activeGate === 'input' ? '#0369a1' : '#1e293b'}
              stroke="#38bdf8"
              strokeWidth="2"
              filter={activeGate === 'input' ? 'url(#lstmGlow)' : 'none'}
            />
            <text x="-30" y="4" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">&sigma;</text>
            <text x="-30" y="30" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Input Filter</text>

            {/* Candidate State (Tanh) */}
            <line x1="30" y1="100" x2="30" y2="0" stroke="#38bdf8" strokeWidth="2" />
            <rect
              x="6"
              y="-18"
              width="48"
              height="36"
              rx="8"
              fill={activeGate === 'input' ? '#0369a1' : '#1e293b'}
              stroke="#38bdf8"
              strokeWidth="2"
              filter={activeGate === 'input' ? 'url(#lstmGlow)' : 'none'}
            />
            <text x="30" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">tanh</text>
            <text x="30" y="30" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Candidate</text>

            {/* Multiplication of i_t * C~_t */}
            <circle cx="0" cy="-25" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <text x="0" y="-21" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">&times;</text>
            <line x1="-30" y1="-18" x2="-10" y2="-25" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="30" y1="-18" x2="10" y2="-25" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="0" y1="-36" x2="0" y2="-60" stroke="#38bdf8" strokeWidth="2" />

            {/* Pointwise Addition Node on Highway */}
            <circle cx="0" cy="-60" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="0" y="-56" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">+</text>
          </g>

          {/* GATE 3: OUTPUT GATE */}
          <g transform="translate(540, 150)">
            <line x1="0" y1="100" x2="0" y2="0" stroke="#34d399" strokeWidth="2" />
            <rect
              x="-24"
              y="-18"
              width="48"
              height="36"
              rx="8"
              fill={activeGate === 'output' ? '#065f46' : '#1e293b'}
              stroke="#34d399"
              strokeWidth="2"
              filter={activeGate === 'output' ? 'url(#lstmGlow)' : 'none'}
            />
            <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="13" fontWeight="bold">&sigma;</text>
            <text x="0" y="30" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Output Gate</text>

            {/* Tanh squashing on Highway for emission to h_t */}
            <line x1="-80" y1="-60" x2="40" y2="-60" stroke="#a855f7" strokeWidth="2" />
            <line x1="40" y1="-60" x2="40" y2="50" stroke="#a855f7" strokeWidth="2" />
            <rect x="22" y="32" width="36" height="24" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="40" y="48" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">tanh</text>

            {/* Output Multiplication Node to h_t */}
            <circle cx="0" cy="70" r="12" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
            <text x="0" y="74" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">&times;</text>
            <line x1="0" y1="18" x2="0" y2="58" stroke="#34d399" strokeWidth="2" />
            <line x1="40" y1="56" x2="12" y2="70" stroke="#a855f7" strokeWidth="1.5" />
            <line x1="0" y1="82" x2="0" y2="100" stroke="#34d399" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Gate Inspector Details */}
      <div className={`p-5 rounded-2xl bg-slate-900/90 border ${current.border} space-y-3 transition-all`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: current.color }} />
            {current.name}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
            {current.tag}
          </span>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
          <code>{current.formula}</code>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">
            <strong className="text-white block mb-0.5">Mathematical Function:</strong>
            {current.purpose}
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-purple-200">
            <strong className="text-purple-300 block mb-0.5">IT Operations Analogy:</strong>
            {current.analogy}
          </div>
        </div>
      </div>

      {/* The Unbreakable Sequential Ceiling */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs font-sans leading-relaxed flex items-start gap-3">
        <Clock size={20} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-mono block mb-0.5">The Unbreakable Sequential Ceiling:</strong>
          While gates solve long-range forgetting, the LSTM is still inherently sequential: <strong>Step 50 cannot compute before Step 49 has finished</strong>. No amount of GPU clusters can parallelize a sequential loop. This architectural bottleneck directly led to the invention of <strong>Transformers (Hop 3)</strong>!
        </div>
      </div>

    </div>
  );
}
