'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function MultiHeadViz() {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const reset = () => setStep(0);

  const stepsInfo = [
    "Step 0: Instead of one massive attention calculation, we split the high-dimensional Q, K, V vectors into multiple smaller 'heads' (e.g. 8 heads).",
    "Step 1: Each head performs Scaled Dot-Product Attention completely independently and in parallel on the GPU.",
    "Step 2: The outputs from all heads are concatenated back together into a single large vector.",
    "Step 3: A final Linear projection mixes the information from all heads together."
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700/60 p-6 flex flex-col font-sans select-none overflow-hidden">
      {/* Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-orange-400 font-mono">Multi-Head</span> Visualizer
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={reset} disabled={step === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30">
            <RotateCcw size={18} />
          </button>
          <button onClick={nextStep} disabled={step === totalSteps - 1} className="flex items-center gap-2 px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg disabled:opacity-30 disabled:hover:bg-orange-600 transition-colors">
            {step === totalSteps - 1 ? 'Finished' : 'Next Step'}
            <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>

      <div className="text-slate-300 text-sm h-16 md:h-12 mb-4 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono flex items-center">
        {stepsInfo[step]}
      </div>

      {/* Visualization Canvas */}
      <div className="relative h-[280px] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
        
        {/* Step 0: Split */}
        <AnimatePresence>
          {(step === 0) && (
            <motion.div
              className="absolute flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex gap-1">
                 <div className="w-8 h-12 bg-rose-900/50 border border-rose-500 rounded flex items-center justify-center text-xs text-rose-300">Q</div>
                 <div className="w-8 h-12 bg-amber-900/50 border border-amber-500 rounded flex items-center justify-center text-xs text-amber-300">K</div>
                 <div className="w-8 h-12 bg-sky-900/50 border border-sky-500 rounded flex items-center justify-center text-xs text-sky-300">V</div>
              </div>
              
              <div className="flex gap-8">
                 <div className="text-slate-400 font-mono text-xs flex flex-col items-center">&darr; Head 1 (Grammar)</div>
                 <div className="text-slate-400 font-mono text-xs flex flex-col items-center">&darr; Head 2 (Entity)</div>
                 <div className="text-slate-400 font-mono text-xs flex flex-col items-center">&darr; Head 3 (Tense)</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1: Parallel Attention */}
        <AnimatePresence>
          {(step === 1) && (
            <motion.div
              className="absolute flex items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
               {[1, 2, 3].map((h) => (
                 <div key={h} className="w-20 h-24 bg-purple-900/30 border-2 border-purple-500 rounded-lg flex flex-col items-center justify-center shadow-lg relative">
                   <div className="absolute top-2 text-[10px] text-purple-300 font-mono">Head {h}</div>
                   <div className="text-sm font-bold text-white mt-3">Scaled<br/>Dot-Product</div>
                 </div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Concat */}
        <AnimatePresence>
          {(step === 2) && (
            <motion.div
              className="absolute flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex gap-2">
                 {[1, 2, 3].map((h) => (
                   <div key={h} className="w-16 h-8 bg-emerald-900/40 border border-emerald-500 rounded flex items-center justify-center text-emerald-300 text-xs">O_{h}</div>
                 ))}
              </div>
              <div className="text-slate-400 text-2xl">&darr;</div>
              <div className="w-52 h-10 bg-emerald-800/60 border-2 border-emerald-400 rounded-lg flex items-center justify-center text-emerald-100 font-bold tracking-widest shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                CONCATENATE
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Final Linear */}
        <AnimatePresence>
          {(step === 3) && (
            <motion.div
              className="absolute flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-52 h-10 bg-emerald-800/60 border-2 border-emerald-400 rounded-lg flex items-center justify-center text-emerald-100 font-bold tracking-widest">
                CONCATENATE
              </div>
              <div className="text-slate-400 text-xl font-bold">&times; W_O</div>
              <div className="w-40 h-12 bg-orange-900/50 border-2 border-orange-500 rounded-xl flex items-center justify-center text-orange-200 font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                Final Context Vector
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
