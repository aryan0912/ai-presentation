'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function NeuronFormulaExtender() {
  const [step, setStep] = useState(0);
  const totalSteps = 4;
  const [activeToken, setActiveToken] = useState<string | null>(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const reset = () => setStep(0);

  const stepsInfo = [
    "Step 0: We start with simple Linear Regression (y = mx + c). One input 'x' multiplied by a slope 'm', plus an intercept 'c'.",
    "Step 1: In the real world, we have multiple inputs (e.g. Festival + Weather). The formula naturally extends to have multiple weights (w1, w2).",
    "Step 2: AI researchers just renamed the variables. 'y' became 'z' (Pre-Activation), 'm' became 'w' (Weights), and 'c' became 'b' (Bias). It is exactly the same math!",
    "Step 3: The crucial difference! The Artificial Neuron passes that linear result 'z' through a Non-Linear Activation Function (like ReLU). If the result is negative, it outputs 0. This single change gives Neural Networks their power."
  ];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-sans text-xs shadow-2xl relative overflow-hidden">
      {/* Top neon indicator */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 animate-pulse" />

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-purple-400 font-mono">Artificial Neuron</span> Math
          </h3>
          <div className="text-slate-400 font-sans text-sm mt-1">
            How Linear Regression mathematically morphs into a Neuron.
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

      {/* Main Interactive Formula Box */}
      <div className="py-12 flex flex-wrap items-center justify-center gap-2 font-mono text-2xl md:text-3xl font-extrabold text-white text-center bg-slate-900 rounded-2xl border border-slate-800 shadow-inner min-h-[160px]">
        
        {/* Output */}
        <AnimatePresence mode="popLayout">
          {step === 3 ? (
            <motion.span
              key="output-a"
              initial={{ scale: 0.8, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="text-fuchsia-400 cursor-help"
              onMouseEnter={() => setActiveToken('activation')}
              onMouseLeave={() => setActiveToken(null)}
            >
              a
            </motion.span>
          ) : step === 2 ? (
            <motion.span
              key="output-z"
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="text-amber-400 cursor-help"
              onMouseEnter={() => setActiveToken('pre-activation')}
              onMouseLeave={() => setActiveToken(null)}
            >
              z
            </motion.span>
          ) : (
            <motion.span
              key="output-y"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-amber-400 cursor-help"
              onMouseEnter={() => setActiveToken('prediction')}
              onMouseLeave={() => setActiveToken(null)}
            >
              y
            </motion.span>
          )}
        </AnimatePresence>

        <span className="text-slate-500 mx-1">=</span>

        {/* ReLU wrapper start */}
        <AnimatePresence>
          {step === 3 && (
            <motion.span
              key="relu-start"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              className="text-fuchsia-500 tracking-tighter"
            >
              ReLU(
            </motion.span>
          )}
        </AnimatePresence>

        {/* Term 1 */}
        <span
          className="text-rose-400 cursor-help flex items-center transition-transform hover:scale-110"
          onMouseEnter={() => setActiveToken('weight')}
          onMouseLeave={() => setActiveToken(null)}
        >
          <AnimatePresence mode="popLayout">
            {step >= 2 ? (
              <motion.span key="w1" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>w₁</motion.span>
            ) : step === 1 ? (
              <motion.span key="m1" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>m₁</motion.span>
            ) : (
              <motion.span key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>m</motion.span>
            )}
          </AnimatePresence>
          <span className="text-slate-500 mx-0.5 text-xl">·</span>
          <AnimatePresence mode="popLayout">
            {step >= 1 ? (
              <motion.span key="x1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sky-400">x₁</motion.span>
            ) : (
              <motion.span key="x" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sky-400">x</motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* Term 2 (appears in step 1+) */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.span
              key="term2"
              initial={{ width: 0, opacity: 0, scale: 0 }}
              animate={{ width: 'auto', opacity: 1, scale: 1 }}
              exit={{ width: 0, opacity: 0, scale: 0 }}
              className="flex items-center overflow-hidden"
            >
              <span className="text-slate-500 mx-2">+</span>
              <span
                className="text-rose-400 cursor-help flex items-center transition-transform hover:scale-110"
                onMouseEnter={() => setActiveToken('weight')}
                onMouseLeave={() => setActiveToken(null)}
              >
                <AnimatePresence mode="popLayout">
                  {step >= 2 ? (
                    <motion.span key="w2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>w₂</motion.span>
                  ) : (
                    <motion.span key="m2" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>m₂</motion.span>
                  )}
                </AnimatePresence>
                <span className="text-slate-500 mx-0.5 text-xl">·</span>
                <span className="text-sky-400">x₂</span>
              </span>
            </motion.span>
          )}
        </AnimatePresence>

        <span className="text-slate-500 mx-2">+</span>

        {/* Bias / Intercept */}
        <AnimatePresence mode="popLayout">
          {step >= 2 ? (
            <motion.span
              key="bias"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-emerald-400 cursor-help"
              onMouseEnter={() => setActiveToken('bias')}
              onMouseLeave={() => setActiveToken(null)}
            >
              b
            </motion.span>
          ) : (
            <motion.span
              key="intercept"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-emerald-400 cursor-help"
              onMouseEnter={() => setActiveToken('bias')}
              onMouseLeave={() => setActiveToken(null)}
            >
              c
            </motion.span>
          )}
        </AnimatePresence>

        {/* ReLU wrapper end */}
        <AnimatePresence>
          {step === 3 && (
            <motion.span
              key="relu-end"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              className="text-fuchsia-500 tracking-tighter ml-1"
            >
              )
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Explanatory Tooltip area */}
      <div className="h-10 flex items-center justify-center font-sans text-xs">
        <AnimatePresence mode="wait">
          {activeToken === 'activation' && (
            <motion.div key="act" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="bg-fuchsia-900/40 text-fuchsia-200 px-3 py-1.5 rounded-full border border-fuchsia-500/30">
              <strong>a (Activation):</strong> The final output of the neuron after passing through the non-linear filter.
            </motion.div>
          )}
          {activeToken === 'pre-activation' && (
            <motion.div key="pre" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="bg-amber-900/40 text-amber-200 px-3 py-1.5 rounded-full border border-amber-500/30">
              <strong>z (Pre-Activation):</strong> The raw sum of weights and inputs before the non-linearity is applied.
            </motion.div>
          )}
          {activeToken === 'prediction' && (
            <motion.div key="pred" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="bg-amber-900/40 text-amber-200 px-3 py-1.5 rounded-full border border-amber-500/30">
              <strong>y (Prediction):</strong> The raw continuous output of a linear regression model.
            </motion.div>
          )}
          {activeToken === 'weight' && (
            <motion.div key="w" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="bg-rose-900/40 text-rose-200 px-3 py-1.5 rounded-full border border-rose-500/30">
              <strong>m / w (Slope / Weight):</strong> The learned importance factor multiplied against the input.
            </motion.div>
          )}
          {activeToken === 'bias' && (
            <motion.div key="b" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="bg-emerald-900/40 text-emerald-200 px-3 py-1.5 rounded-full border border-emerald-500/30">
              <strong>c / b (Intercept / Bias):</strong> The baseline value if all inputs were zero.
            </motion.div>
          )}
          {!activeToken && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500">
              Hover over the variables in the formula to see what they mean.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
