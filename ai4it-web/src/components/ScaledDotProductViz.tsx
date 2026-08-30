'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function ScaledDotProductViz() {
  const [step, setStep] = useState(0);
  const totalSteps = 6;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const reset = () => setStep(0);

  const stepsInfo = [
    "Step 0: We start with three matrices: Query (What I want), Key (What I have), and Value (My actual data).",
    "Step 1: MatMul (Q × K^T). We compute the dot product between every Query and every Key to see how well they match.",
    "Step 2: Scale. We divide the raw scores by √d_k to prevent gradients from vanishing during training.",
    "Step 3: Mask (Optional). For autoregressive generation (like GPT), we mask future tokens so the model can't 'cheat' by looking ahead.",
    "Step 4: Softmax. The scaled scores are squashed into a probability distribution (0 to 1) that sums to 100%.",
    "Step 5: MatMul with V. We multiply the Softmax weights by the Value matrix to create the final Context Vector."
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700/60 p-6 flex flex-col font-sans select-none overflow-hidden">
      {/* Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-purple-400 font-mono">Attention</span> Visualizer
        </h3>
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

      <div className="text-slate-300 text-sm h-16 md:h-12 mb-4 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono flex items-center">
        {stepsInfo[step]}
      </div>

      {/* Visualization Canvas */}
      <div className="relative h-[250px] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
        
        {/* Step 0: Q, K, V */}
        <AnimatePresence>
          {(step === 0) && (
            <motion.div
              className="absolute flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-16 h-20 bg-rose-900/50 border-2 border-rose-500 rounded flex items-center justify-center text-rose-300 font-bold text-xl">Q</div>
              <div className="w-16 h-20 bg-amber-900/50 border-2 border-amber-500 rounded flex items-center justify-center text-amber-300 font-bold text-xl">K</div>
              <div className="w-16 h-20 bg-sky-900/50 border-2 border-sky-500 rounded flex items-center justify-center text-sky-300 font-bold text-xl">V</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1: Q x K^T */}
        <AnimatePresence>
          {(step === 1) && (
            <motion.div
              className="absolute flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-16 h-20 bg-rose-900/50 border-2 border-rose-500 rounded flex items-center justify-center text-rose-300 font-bold text-xl">Q</div>
              <div className="text-slate-400 text-2xl font-bold">&times;</div>
              <div className="w-20 h-16 bg-amber-900/50 border-2 border-amber-500 rounded flex items-center justify-center text-amber-300 font-bold text-xl">K<sup className="text-xs">T</sup></div>
              <div className="text-slate-400 text-2xl font-bold">=</div>
              <div className="w-20 h-20 bg-slate-800 border-2 border-slate-600 rounded flex flex-col items-center justify-center text-slate-300 text-xs">
                <span>104</span>
                <span>-23</span>
                <span>89</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Scale */}
        <AnimatePresence>
          {(step === 2) && (
            <motion.div
              className="absolute flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-20 h-20 bg-slate-800 border-2 border-slate-600 rounded flex flex-col items-center justify-center text-slate-300 text-xs relative">
                 <span>104</span>
                 <span>-23</span>
                 <span>89</span>
              </div>
              <div className="flex flex-col items-center text-slate-400 font-mono text-sm">
                 <span className="border-b border-slate-500 px-2">&divide;</span>
                 <span>&radic;d_k</span>
              </div>
              <div className="text-slate-400 text-2xl font-bold">=</div>
              <div className="w-20 h-20 bg-slate-800 border-2 border-slate-500 rounded flex flex-col items-center justify-center text-slate-200 text-xs">
                <span>13.0</span>
                <span>-2.8</span>
                <span>11.1</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Mask */}
        <AnimatePresence>
          {(step === 3) && (
            <motion.div
              className="absolute flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-20 h-20 bg-slate-800 border-2 border-slate-500 rounded flex flex-col items-center justify-center text-slate-200 text-xs relative overflow-hidden">
                <span>13.0</span>
                <span>-2.8</span>
                <span className="bg-red-900/80 w-full text-center text-red-300">-&infin;</span>
              </div>
              <div className="text-red-400 font-mono text-xs max-w-[100px] text-center">
                 Future tokens masked out
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Softmax */}
        <AnimatePresence>
          {(step === 4) && (
            <motion.div
              className="absolute flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-purple-400 font-mono text-lg font-bold">Softmax</div>
              <div className="text-slate-400 text-2xl font-bold">&rarr;</div>
              <div className="w-20 h-20 bg-purple-900/30 border-2 border-purple-500 rounded flex flex-col items-center justify-center text-purple-200 text-xs">
                <span>0.99</span>
                <span>0.01</span>
                <span>0.00</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 5: MatMul with V */}
        <AnimatePresence>
          {(step === 5) && (
            <motion.div
              className="absolute flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 bg-purple-900/30 border-2 border-purple-500 rounded flex flex-col items-center justify-center text-purple-200 text-xs">
                <span>0.99</span>
                <span>0.01</span>
                <span>0.00</span>
              </div>
              <div className="text-slate-400 text-2xl font-bold">&times;</div>
              <div className="w-16 h-20 bg-sky-900/50 border-2 border-sky-500 rounded flex items-center justify-center text-sky-300 font-bold text-xl">V</div>
              <div className="text-slate-400 text-2xl font-bold">=</div>
              <div className="w-24 h-24 bg-emerald-900/50 border-2 border-emerald-500 rounded flex flex-col items-center justify-center text-emerald-300 font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                Context<br/>Vector
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
