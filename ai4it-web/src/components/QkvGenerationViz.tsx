'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QkvGenerationViz() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Contextualized Embedding",
      desc: "We start with the word vector (x) that already contains its positional encoding. It knows what it means and where it is."
    },
    {
      title: "The Query Weight Matrix (W_Q)",
      desc: "To find out what this word is 'looking for', we multiply it by a learned weight matrix W_Q."
    },
    {
      title: "Generating the Query (Q)",
      desc: "The result of this matrix multiplication is the Query vector (Q). The model learns to pull out 'search intent'."
    },
    {
      title: "Generating Key and Value",
      desc: "We do the exact same thing with two other learned matrices (W_K and W_V) to generate the Key (what I have) and Value (my payload)."
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{steps[step].title}</h3>
          <p className="text-slate-400 text-sm max-w-lg h-12">{steps[step].desc}</p>
        </div>
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === step ? 'bg-sky-400' : 'bg-slate-700'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-64 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
        
        {/* Contextualized Embedding (x) */}
        <motion.div 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: step === 0 ? 0 : -200, opacity: 1 }}
          className="absolute flex flex-col items-center gap-2"
        >
          <span className="text-teal-400 font-mono text-sm">Embedding (x)</span>
          <div className="bg-teal-900/30 border border-teal-500/50 p-2 rounded flex flex-col gap-1">
            <div className="w-8 h-4 bg-teal-400/80 rounded-sm"></div>
            <div className="w-8 h-4 bg-teal-400/80 rounded-sm"></div>
            <div className="w-8 h-4 bg-teal-400/80 rounded-sm"></div>
            <div className="w-8 h-4 bg-teal-400/80 rounded-sm"></div>
          </div>
        </motion.div>

        {/* Multiplication Operator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: -90 }}
          className="absolute text-2xl text-slate-500 font-mono"
        >
          ×
        </motion.div>

        {/* Weight Matrix W_Q / W_K / W_V */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: step >= 1 ? 1 : 0, x: 20 }}
          className="absolute flex flex-col items-center gap-2"
        >
          <span className="text-white font-mono text-sm">
            {step < 3 ? 'Weight Matrix (W_Q)' : 'W_Q, W_K, W_V'}
          </span>
          <div className="bg-slate-800/80 border border-slate-600 p-2 rounded grid grid-cols-4 gap-1">
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} className="w-6 h-4 bg-slate-500/50 rounded-sm"></div>
            ))}
          </div>
        </motion.div>

        {/* Equals Sign */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0, x: 150 }}
          className="absolute text-2xl text-slate-500 font-mono"
        >
          =
        </motion.div>

        {/* Output Vector (Q / K / V) */}
        <AnimatePresence mode="wait">
          {step >= 2 && (
            <motion.div
              key={step}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 240, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute flex flex-col items-center gap-2"
            >
              <span className={`font-mono text-sm ${step === 2 ? 'text-rose-400' : 'text-amber-400'}`}>
                {step === 2 ? 'Query (Q)' : 'Q, K, V Vectors'}
              </span>
              <div className="flex gap-4">
                {/* Q */}
                <div className="bg-rose-900/30 border border-rose-500/50 p-2 rounded flex flex-col gap-1">
                  <div className="w-8 h-4 bg-rose-400/80 rounded-sm"></div>
                  <div className="w-8 h-4 bg-rose-400/80 rounded-sm"></div>
                  <div className="w-8 h-4 bg-rose-400/80 rounded-sm"></div>
                  <div className="w-8 h-4 bg-rose-400/80 rounded-sm"></div>
                </div>
                
                {/* K, V shown in step 3 */}
                {step === 3 && (
                  <>
                    <div className="bg-amber-900/30 border border-amber-500/50 p-2 rounded flex flex-col gap-1">
                      <div className="w-8 h-4 bg-amber-400/80 rounded-sm"></div>
                      <div className="w-8 h-4 bg-amber-400/80 rounded-sm"></div>
                      <div className="w-8 h-4 bg-amber-400/80 rounded-sm"></div>
                      <div className="w-8 h-4 bg-amber-400/80 rounded-sm"></div>
                    </div>
                    <div className="bg-sky-900/30 border border-sky-500/50 p-2 rounded flex flex-col gap-1">
                      <div className="w-8 h-4 bg-sky-400/80 rounded-sm"></div>
                      <div className="w-8 h-4 bg-sky-400/80 rounded-sm"></div>
                      <div className="w-8 h-4 bg-sky-400/80 rounded-sm"></div>
                      <div className="w-8 h-4 bg-sky-400/80 rounded-sm"></div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      {/* Controls */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          onClick={() => setStep(Math.min(3, step + 1))}
          disabled={step === 3}
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-500 disabled:opacity-50"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
