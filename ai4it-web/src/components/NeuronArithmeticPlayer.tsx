'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, Zap } from 'lucide-react';

export default function NeuronArithmeticPlayer() {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const reset = () => setStep(0);

  const stepsInfo = [
    "Step 0: Forward Pass (Math). The neuron takes Inputs (x) multiplied by Weights (w), and adds the Bias (b). z = (30 * 57) + (2 * 30) + 2200 = 3970.",
    "Step 1: Forward Pass (Activation). We pass z through ReLU. Since 3970 is positive, a = 3970. (If it were negative, a = 0).",
    "Step 2: Calculate Error. The actual milk demand was 2850. The neuron guessed 3970. Error = 3970 - 2850 = +1120. We overshot!",
    "Step 3: Chain Rule (Backprop). We distribute blame backward. How much is w1 to blame? (Error * da/dz * dz/dw1) = 1120 * 1 * 30 = 33600. The gradient tells us w1 is a big part of the problem.",
    "Step 4: Weight Update. We subtract a fraction (Learning Rate) of the gradient from w1. The new weight is smaller, meaning our next guess will be lower and closer to reality!"
  ];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-sans text-xs shadow-2xl relative overflow-hidden">
      {/* Top neon indicator */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 animate-pulse" />

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-purple-400 font-mono">Single Neuron</span> Arithmetic
          </h3>
          <div className="text-slate-400 font-sans text-sm mt-1">
            Following the math: Forward prediction, backward blame, and updating.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reset} disabled={step === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30">
            <RotateCcw size={18} />
          </button>
          <button onClick={nextStep} disabled={step === totalSteps - 1} className="flex items-center gap-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg disabled:opacity-30 disabled:hover:bg-purple-600 transition-colors">
            {step === totalSteps - 1 ? 'Finished' : 'Next Step'}
            <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>

      <div className="text-slate-300 text-sm h-24 md:h-16 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono flex flex-col justify-center">
        {stepsInfo[step]}
      </div>

      {/* Math Visuals */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col relative shadow-inner overflow-hidden font-mono gap-6">
        
        {/* Forward Pass Block */}
        <div className={`p-4 rounded-xl border transition-all duration-500 ${step >= 0 ? 'bg-slate-950 border-amber-500/30' : 'opacity-30 grayscale'}`}>
          <div className="text-amber-400 font-bold mb-2 uppercase tracking-widest text-[10px]">1. Forward Pass</div>
          
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-white">z =</span>
            <span className="text-sky-400 bg-sky-900/30 px-2 py-1 rounded">30</span>
            <span className="text-slate-500">×</span>
            <span className="text-rose-400 bg-rose-900/30 px-2 py-1 rounded">57</span>
            <span className="text-slate-500">+</span>
            <span className="text-sky-400 bg-sky-900/30 px-2 py-1 rounded">2</span>
            <span className="text-slate-500">×</span>
            <span className="text-rose-400 bg-rose-900/30 px-2 py-1 rounded">30</span>
            <span className="text-slate-500">+</span>
            <span className="text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded">2200</span>
            <span className="text-slate-500">=</span>
            <span className="text-amber-300 font-bold bg-amber-900/40 px-3 py-1 rounded">3970</span>
          </div>

          {step >= 1 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 text-sm md:text-base">
              <span className="text-white">a = <span className="text-fuchsia-400">ReLU</span>(3970) =</span>
              <span className="text-fuchsia-300 font-bold bg-fuchsia-900/40 px-3 py-1 rounded shadow-[0_0_15px_rgba(217,70,239,0.3)]">3970</span>
            </motion.div>
          )}
        </div>

        {/* Error Block */}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-slate-950 border border-rose-500/30">
            <div className="text-rose-400 font-bold mb-2 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <AlertTriangle size={14} /> 2. Error Calculation
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white">Error =</span>
              <span className="text-fuchsia-300">3970 (Guess)</span>
              <span className="text-slate-500">-</span>
              <span className="text-emerald-300">2850 (Actual)</span>
              <span className="text-slate-500">=</span>
              <span className="text-rose-500 font-bold bg-rose-900/40 px-3 py-1 rounded shadow-[0_0_15px_rgba(244,63,94,0.3)]">+1120</span>
            </div>
          </motion.div>
        )}

        {/* Backprop Block */}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-slate-950 border border-purple-500/30">
            <div className="text-purple-400 font-bold mb-2 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <RotateCcw size={14} /> 3. Backpropagation (Chain Rule for w1)
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm leading-relaxed">
              <span className="text-white bg-slate-800 px-2 py-0.5 rounded">Gradient (w1)</span>
              <span className="text-slate-500">=</span>
              <span className="text-rose-400">Error (+1120)</span>
              <span className="text-slate-500">×</span>
              <span className="text-fuchsia-400">ReLU Deriv (1)</span>
              <span className="text-slate-500">×</span>
              <span className="text-sky-400">Input x1 (30)</span>
              <span className="text-slate-500">=</span>
              <span className="text-purple-300 font-bold bg-purple-900/40 px-3 py-1 rounded">+33,600</span>
            </div>
          </motion.div>
        )}

        {/* Update Block */}
        {step >= 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
            <div className="text-emerald-400 font-bold mb-2 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <Zap size={14} /> 4. Weight Update
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white">New w1</span>
              <span className="text-slate-500">=</span>
              <span className="text-rose-400 line-through opacity-70">57</span>
              <span className="text-slate-500">-</span>
              <span className="text-slate-400">(0.001 × 33600)</span>
              <span className="text-slate-500">=</span>
              <span className="text-emerald-400 font-bold bg-emerald-900/40 px-3 py-1 rounded shadow-[0_0_15px_rgba(52,211,153,0.3)]">23.4</span>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
