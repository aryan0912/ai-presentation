'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SymmetryBreakViz() {
  const [initMode, setInitMode] = useState<'zero' | 'random'>('zero');
  const [step, setStep] = useState<number>(0);

  const handleStep = () => {
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-950/95 border border-slate-800 space-y-5 select-none font-mono text-xs">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            3B.7 Deep-Dive · The Symmetry Problem
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Why Weights Cannot Start at Zero (Delivering on Linear Regression's Promise)
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => {
                setInitMode('zero');
                setStep(0);
              }}
              className={`px-3 py-1 rounded transition-colors ${
                initMode === 'zero' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Zero Initialization (Trapped)
            </button>
            <button
              onClick={() => {
                setInitMode('random');
                setStep(0);
              }}
              className={`px-3 py-1 rounded transition-colors ${
                initMode === 'random' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Random Initialization (Symmetry Broken)
            </button>
          </div>

          <button
            onClick={handleStep}
            disabled={step >= 3}
            className="button-primary text-xs px-3 py-1 disabled:opacity-40"
          >
            Step Gradient ({step}/3)
          </button>

          <button
            onClick={handleReset}
            className="button-secondary text-xs px-2.5 py-1 text-slate-400 hover:text-white"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual Neuron Trace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Neuron 1 */}
        <div className={`p-4 rounded-xl border ${
          initMode === 'zero' ? 'bg-slate-900/50 border-slate-800' : 'bg-sky-950/20 border-sky-500/40'
        }`}>
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <span className="font-bold text-sky-400">Hidden Neuron 1 ($h_1$)</span>
            <span className="text-[10px] text-slate-500">Weight $w_1$, Bias $b_1$</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Initial Weight $w_1$:</span>
              <strong className="text-white">{initMode === 'zero' ? '0.00' : '0.45'}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Step 1 Update:</span>
              <strong className="text-sky-300">
                {step >= 1 ? (initMode === 'zero' ? '0.00 &rarr; 0.12' : '0.45 &rarr; 0.62') : '—'}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Step 2 Update:</span>
              <strong className="text-sky-300">
                {step >= 2 ? (initMode === 'zero' ? '0.12 &rarr; 0.28' : '0.62 &rarr; 0.94 (Specializes Trend)') : '—'}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Step 3 Update:</span>
              <strong className="text-sky-300">
                {step >= 3 ? (initMode === 'zero' ? '0.28 &rarr; 0.41' : '0.94 &rarr; 1.25 (Focus: Weekdays)') : '—'}
              </strong>
            </div>
          </div>
        </div>

        {/* Neuron 2 */}
        <div className={`p-4 rounded-xl border ${
          initMode === 'zero' ? 'bg-slate-900/50 border-slate-800' : 'bg-purple-950/20 border-purple-500/40'
        }`}>
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <span className="font-bold text-purple-400">Hidden Neuron 2 ($h_2$)</span>
            <span className="text-[10px] text-slate-500">Weight $w_2$, Bias $b_2$</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Initial Weight $w_2$:</span>
              <strong className={initMode === 'zero' ? 'text-rose-400 font-black' : 'text-white'}>
                {initMode === 'zero' ? '0.00 (Identical to h1!)' : '-0.28'}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Step 1 Update:</span>
              <strong className={initMode === 'zero' ? 'text-rose-400' : 'text-purple-300'}>
                {step >= 1 ? (initMode === 'zero' ? '0.00 &rarr; 0.12 (Clone!)' : '-0.28 &rarr; -0.05') : '—'}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Step 2 Update:</span>
              <strong className={initMode === 'zero' ? 'text-rose-400' : 'text-purple-300'}>
                {step >= 2 ? (initMode === 'zero' ? '0.12 &rarr; 0.28 (Clone!)' : '-0.05 &rarr; +0.48 (Specializes Spike)') : '—'}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Step 3 Update:</span>
              <strong className={initMode === 'zero' ? 'text-rose-400' : 'text-purple-300'}>
                {step >= 3 ? (initMode === 'zero' ? '0.28 &rarr; 0.41 (Still Cloned!)' : '+0.48 &rarr; +1.10 (Focus: Saturday)') : '—'}
              </strong>
            </div>
          </div>
        </div>

      </div>

      {/* Symmetry Diagnosis Alert */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
        initMode === 'zero'
          ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
          : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
      }`}>
        {initMode === 'zero' ? (
          <p>
            <strong className="text-rose-300 block mb-1">
              <AlertTriangle size={14} className="inline mr-1 text-rose-400" />
              The Symmetry Trap:
            </strong>
            Because both neurons started at $w = 0$, both received the exact same gradient and took the exact same step! No matter how many epochs you train, 1,000 neurons initialized to zero will act like <strong>1 single neuron copied 1,000 times</strong>. Depth is completely wasted.
          </p>
        ) : (
          <p>
            <strong className="text-emerald-300 block mb-1">
              <CheckCircle2 size={14} className="inline mr-1 text-emerald-400" />
              Symmetry Broken by Random Initialization:
            </strong>
            Starting with small random numbers ($w_1 = 0.45, w_2 = -0.28$) gives each neuron a different gradient. As training progresses, $h_1$ specializes in the baseline trend while $h_2$ specializes in the Saturday spike!
          </p>
        )}
      </div>

    </div>
  );
}
