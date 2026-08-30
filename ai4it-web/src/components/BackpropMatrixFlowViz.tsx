'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity } from 'lucide-react';

export default function BackpropMatrixFlowViz() {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const reset = () => setStep(0);

  const stepsInfo = [
    "Step 0: Forward Pass. The Hidden Layer sends signals forward through the weights (w1=0.7, w2=0.3) to make a Prediction.",
    "Step 1: The Loss Function. The network compares its Prediction to the Reality. It computes an Error (e.g. +1120 over the actual value).",
    "Step 2: Splitting the Blame. Backpropagation flows in reverse! The Error is multiplied by the weights to see who caused it. w1 gets 70% of the blame, w2 gets 30%.",
    "Step 3: Calculating Gradients (Chain Rule). The blame travels all the way back to the inputs, creating a precise gradient map of exactly how every single weight needs to change.",
    "Step 4: Gradient Descent (The Update). An Optimizer subtracts a tiny fraction of those gradients (Learning Rate) from the weights. The network has learned!"
  ];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-sans text-xs shadow-2xl relative overflow-hidden">
      {/* Top neon indicator */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-500 via-rose-500 to-purple-500 animate-pulse" />

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono">Backpropagation</span> Flow
          </h3>
          <div className="text-slate-400 font-sans text-sm mt-1">
            How error flows backward in proportion to connection strength.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reset} disabled={step === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30">
            <RotateCcw size={18} />
          </button>
          <button onClick={nextStep} disabled={step === totalSteps - 1} className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg disabled:opacity-30 disabled:hover:bg-emerald-600 transition-colors">
            {step === totalSteps - 1 ? 'Finished' : 'Next Step'}
            <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>

      <div className="text-slate-300 text-sm h-24 md:h-16 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono flex flex-col justify-center">
        {stepsInfo[step]}
      </div>

      {/* Interactive Network Diagram with Animated Flow Lines */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
        
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] h-[220px]">
          <defs>
            <marker id="arrowFwd" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrowBwd" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#f43f5e" />
            </marker>
            <filter id="glowFwd" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.8" />
            </filter>
            <filter id="glowBwd" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f43f5e" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Forward / Backward Connecting Lines */}
          {/* h1 -> pred (w_out = 0.70) */}
          <line
            x1="160" y1="65" x2="420" y2="120"
            stroke={step >= 2 ? '#f43f5e' : (step === 0 ? '#38bdf8' : '#334155')}
            strokeWidth={step >= 2 ? 5 : (step === 0 ? 4 : 2)}
            strokeDasharray={step >= 2 ? '5,5' : 'none'}
            markerEnd={step === 0 ? 'url(#arrowFwd)' : (step >= 2 ? 'url(#arrowBwd)' : 'none')}
            filter={step === 0 ? 'url(#glowFwd)' : (step >= 2 ? 'url(#glowBwd)' : 'none')}
            className="transition-all duration-700"
          />
          
          {/* h2 -> pred (w_out = 0.30) */}
          <line
            x1="160" y1="175" x2="420" y2="120"
            stroke={step >= 2 ? '#fda4af' : (step === 0 ? '#7dd3fc' : '#334155')}
            strokeWidth={step >= 2 ? 3 : (step === 0 ? 2 : 2)}
            strokeDasharray={step >= 2 ? '5,5' : 'none'}
            markerEnd={step === 0 ? 'url(#arrowFwd)' : (step >= 2 ? 'url(#arrowBwd)' : 'none')}
            className="transition-all duration-700"
          />

          {/* Hidden Layer Node 1 */}
          <circle cx="120" cy="65" r="40" fill="#0f172a" stroke={step >= 3 ? '#f43f5e' : '#3b82f6'} strokeWidth="3" className="transition-all duration-500" />
          <text x="120" y="60" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">h₁</text>
          <text x="120" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">Act: 50</text>
          
          <rect x="250" y="45" width="60" height="20" rx="4" fill={step >= 4 ? '#10b981' : '#1e293b'} stroke={step >= 4 ? '#34d399' : '#475569'} />
          <text x="280" y="58" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">w₁ = {step >= 4 ? '0.62' : '0.70'}</text>

          {/* Hidden Layer Node 2 */}
          <circle cx="120" cy="175" r="40" fill="#0f172a" stroke={step >= 3 ? '#fda4af' : '#60a5fa'} strokeWidth="3" className="transition-all duration-500" />
          <text x="120" y="170" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">h₂</text>
          <text x="120" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">Act: 20</text>
          
          <rect x="250" y="155" width="60" height="20" rx="4" fill={step >= 4 ? '#10b981' : '#1e293b'} stroke={step >= 4 ? '#34d399' : '#475569'} />
          <text x="280" y="168" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">w₂ = {step >= 4 ? '0.28' : '0.30'}</text>

          {/* Output Node */}
          <circle cx="460" cy="120" r="40" fill="#0f172a" stroke={step >= 1 ? '#f43f5e' : '#38bdf8'} strokeWidth="3" className="transition-all duration-500" />
          <text x="460" y="115" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Pred</text>
          <text x="460" y="135" textAnchor="middle" fill={step >= 1 ? '#f43f5e' : '#38bdf8'} fontSize="12" fontWeight="bold">{step >= 4 ? '2180' : '2226'}</text>

          {/* Error Injection */}
          <AnimatePresence>
            {step >= 1 && (
              <g>
                <line x1="560" y1="120" x2="510" y2="120" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrowBwd)" className="animate-pulse" />
                <rect x="520" y="80" width="80" height="30" rx="6" fill="#881337" stroke="#f43f5e" />
                <text x="560" y="99" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Loss: +1120</text>
              </g>
            )}
          </AnimatePresence>

          {/* Blame Split Annotations */}
          <AnimatePresence>
            {step >= 2 && (
              <g>
                <text x="320" y="85" fill="#f43f5e" fontSize="12" fontWeight="bold" transform="rotate(-10 320 85)">-70% Blame</text>
                <text x="320" y="165" fill="#fda4af" fontSize="11" fontWeight="bold" transform="rotate(10 320 165)">-30% Blame</text>
              </g>
            )}
          </AnimatePresence>

        </svg>
      </div>
    </div>
  );
}
