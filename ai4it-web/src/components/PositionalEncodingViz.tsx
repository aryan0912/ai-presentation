'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, FastForward } from 'lucide-react';

export default function PositionalEncodingViz() {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => setStep(0);

  const stepsInfo = [
    "Step 0: The words are embedded into standard vectors. Notice how identical words (like 'bank' in different contexts) get the exact same vector without position.",
    "Step 1: We generate Positional Encodings using interlocking Sine and Cosine waves of varying frequencies.",
    "Step 2: We mathematically add the Positional Encoding vector directly to the Word Embedding vector.",
    "Step 3: The final vector now contains both semantic meaning and an absolute coordinate in time."
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700/60 p-6 flex flex-col font-sans select-none overflow-hidden">
      {/* Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-sky-400 font-mono">PE</span> Visualizer
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={reset} disabled={step === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30">
            <RotateCcw size={18} />
          </button>
          <button onClick={nextStep} disabled={step === totalSteps - 1} className="flex items-center gap-2 px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg disabled:opacity-30 disabled:hover:bg-sky-600 transition-colors">
            {step === totalSteps - 1 ? 'Finished' : 'Next Step'}
            <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>

      <div className="text-slate-300 text-sm h-12 mb-4 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono flex items-center">
        {stepsInfo[step]}
      </div>

      {/* Visualization Canvas */}
      <div className="relative h-[250px] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
        
        {/* Step 0: Initial Vectors */}
        <AnimatePresence>
          {(step >= 0) && (
            <motion.div
              className="absolute flex flex-col items-center gap-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: step >= 2 ? -150 : 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="text-sky-400 font-bold font-mono text-lg">"tanker"</div>
              <div className="flex flex-col gap-1 p-2 bg-sky-950/40 border border-sky-800 rounded-lg">
                <span className="text-sky-200 font-mono text-xs text-center w-16">0.42</span>
                <span className="text-sky-200 font-mono text-xs text-center w-16">-0.11</span>
                <span className="text-sky-200 font-mono text-xs text-center w-16">0.88</span>
                <span className="text-sky-200 font-mono text-xs text-center w-16">0.05</span>
              </div>
              <div className="text-slate-500 font-mono text-[10px]">Word Vector</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1 & 2: Positional Wave appears and moves to add */}
        <AnimatePresence>
          {(step >= 1) && (
            <motion.div
              className="absolute flex flex-col items-center gap-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: step >= 2 ? -20 : 150 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="text-purple-400 font-bold font-mono text-sm">pos = 1</div>
              <div className="flex flex-col gap-1 p-2 bg-purple-950/40 border border-purple-800 rounded-lg relative">
                {/* Visual Sine Waves */}
                <div className="absolute inset-0 overflow-hidden opacity-30 flex items-center justify-center">
                   <svg width="40" height="80" viewBox="0 0 40 80">
                     <path d="M0,40 Q10,10 20,40 T40,40" fill="none" stroke="#c084fc" strokeWidth="2" />
                     <path d="M0,40 Q10,70 20,40 T40,40" fill="none" stroke="#e879f9" strokeWidth="2" strokeDasharray="2,2" />
                   </svg>
                </div>
                <span className="text-purple-200 font-mono text-xs text-center w-16 z-10">sin(x)</span>
                <span className="text-purple-200 font-mono text-xs text-center w-16 z-10">cos(y)</span>
                <span className="text-purple-200 font-mono text-xs text-center w-16 z-10">sin(z)</span>
                <span className="text-purple-200 font-mono text-xs text-center w-16 z-10">cos(w)</span>
              </div>
              <div className="text-slate-500 font-mono text-[10px]">Position Vector</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: The Plus Sign */}
        <AnimatePresence>
          {(step >= 2) && (
            <motion.div
              className="absolute font-bold text-2xl text-slate-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x: -85 }}
              transition={{ delay: 0.2 }}
            >
              +
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Step 3: Equals and Final Combined Vector */}
        <AnimatePresence>
          {(step >= 3) && (
            <motion.div
              className="absolute font-bold text-2xl text-slate-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x: 50 }}
              transition={{ delay: 0.1 }}
            >
              =
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(step >= 3) && (
            <motion.div
              className="absolute flex flex-col items-center gap-3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 130 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            >
              <div className="text-emerald-400 font-bold font-mono text-sm">Combined State</div>
              <div className="flex flex-col gap-1 p-2 bg-emerald-950/40 border border-emerald-800 rounded-lg">
                <span className="text-emerald-200 font-mono text-xs text-center w-24">0.42 + sin(x)</span>
                <span className="text-emerald-200 font-mono text-xs text-center w-24">-0.11 + cos(y)</span>
                <span className="text-emerald-200 font-mono text-xs text-center w-24">0.88 + sin(z)</span>
                <span className="text-emerald-200 font-mono text-xs text-center w-24">0.05 + cos(w)</span>
              </div>
              <div className="text-slate-500 font-mono text-[10px]">Ready for Attention</div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
