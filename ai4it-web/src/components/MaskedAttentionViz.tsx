'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MaskedAttentionViz() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Raw Attention Scores",
      desc: "In the Decoder, words attend to each other to generate the next word. But wait—Word 1 shouldn't be able to look at Word 2 before Word 2 is generated!"
    },
    {
      title: "The Look-Ahead Mask",
      desc: "To prevent 'cheating' by looking into the future, we apply a mask to the upper triangle of the attention matrix, filling it with negative infinity (-∞)."
    },
    {
      title: "Applying the Mask",
      desc: "We add the mask to our raw scores. Any score added to -∞ becomes -∞."
    },
    {
      title: "Softmax Transformation",
      desc: "When we pass these scores through the Softmax function, e^(-∞) becomes exactly 0. Future words now have 0.0% influence!"
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

      <div className="relative h-72 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
        
        {/* Raw Scores Matrix */}
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: step >= 1 ? -180 : 0 }}
          className="absolute flex flex-col items-center gap-2"
        >
          <span className="text-yellow-400 font-mono text-sm">Raw Scores (Q×K)</span>
          <div className="bg-slate-800/50 border border-slate-600 p-3 rounded grid grid-cols-3 gap-2">
            {[1.2, 3.4, 0.5, 0.8, 2.1, 4.5, 0.1, 1.1, 3.0].map((val, i) => (
              <div key={i} className="w-12 h-8 bg-slate-700 rounded flex items-center justify-center text-xs font-mono text-white">
                {val.toFixed(1)}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plus Sign */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 1 ? 1 : 0 }}
          className="absolute text-3xl text-slate-500 font-mono"
        >
          +
        </motion.div>

        {/* The Mask Matrix */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: step === 1 ? 1 : 0, x: step === 1 ? 180 : 200 }}
          className="absolute flex flex-col items-center gap-2"
        >
          <span className="text-rose-400 font-mono text-sm">Look-Ahead Mask</span>
          <div className="bg-rose-900/20 border border-rose-500/50 p-3 rounded grid grid-cols-3 gap-2">
            {[0, "-∞", "-∞", 0, 0, "-∞", 0, 0, 0].map((val, i) => (
              <div key={i} className={`w-12 h-8 rounded flex items-center justify-center text-xs font-mono ${val === "-∞" ? 'bg-rose-900/80 text-rose-200' : 'bg-slate-700 text-white'}`}>
                {val}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Masked Scores (Overlays Raw Scores) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0, x: step === 3 ? -180 : 0 }}
          className="absolute flex flex-col items-center gap-2 z-10 bg-slate-950"
        >
          <span className="text-teal-400 font-mono text-sm">Masked Scores</span>
          <div className="bg-teal-900/20 border border-teal-500/50 p-3 rounded grid grid-cols-3 gap-2">
            {[1.2, "-∞", "-∞", 0.8, 2.1, "-∞", 0.1, 1.1, 3.0].map((val, i) => (
              <div key={i} className={`w-12 h-8 rounded flex items-center justify-center text-xs font-mono ${val === "-∞" ? 'bg-rose-900/80 text-rose-200' : 'bg-slate-700 text-white'}`}>
                {val === "-∞" ? val : (val as number).toFixed(1)}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Arrow to Softmax */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 3 ? 1 : 0 }}
          className="absolute text-xl text-slate-500 font-mono flex flex-col items-center"
        >
          <span className="text-xs mb-1">Softmax</span>
          →
        </motion.div>

        {/* Final Probabilities Matrix */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: step === 3 ? 1 : 0, x: step === 3 ? 180 : 200 }}
          className="absolute flex flex-col items-center gap-2"
        >
          <span className="text-green-400 font-mono text-sm">Attention Weights</span>
          <div className="bg-green-900/20 border border-green-500/50 p-3 rounded grid grid-cols-3 gap-2">
            {["100%", "0%", "0%", "21%", "79%", "0%", "4%", "12%", "84%"].map((val, i) => (
              <div key={i} className={`w-12 h-8 rounded flex items-center justify-center text-xs font-mono ${val === "0%" ? 'bg-rose-900/80 text-rose-200 font-bold' : 'bg-green-900/80 text-green-100'}`}>
                {val}
              </div>
            ))}
          </div>
        </motion.div>

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
