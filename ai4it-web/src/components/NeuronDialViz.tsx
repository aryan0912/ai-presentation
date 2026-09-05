'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Zap, Lightbulb, ArrowRight, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function NeuronDialViz() {
  // Inputs from Saturday: Day = 6 (Saturday), Temp = 31°C
  const x1 = 6;
  const x2 = 31;

  // Interactive weights & bias
  const [w1, setW1] = useState<number>(50); // Weight for Day
  const [w2, setW2] = useState<number>(-10); // Weight for Temp
  const [b, setB] = useState<number>(-100); // Bias (Inactivity threshold)
  const [useActivation, setUseActivation] = useState<boolean>(true);

  // Pre-activation calculation: z = w1*x1 + w2*x2 + b
  const z = w1 * x1 + w2 * x2 + b;

  // Activation (ReLU): a = max(0, z)
  const a = useActivation ? Math.max(0, z) : z;
  const isFired = a > 0;

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-sky-500 to-emerald-400" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <Lightbulb size={14} />
            <span>3Blue1Brown Visual Anchor 1 · The Anatomical Truth</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            What is a Neuron? The Activation Dial
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Forget sci-fi biology. A neuron is just a container holding a number ($a$) that lights up when incoming weighted signals exceed its threshold.
          </p>
        </div>

        {/* Preset quick configurations */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setW1(50); setW2(-10); setB(-100); }}
            className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-all text-xs font-bold"
          >
            Reset Default
          </button>
          <button
            onClick={() => { setW1(80); setW2(0); setB(-450); }}
            className="px-2.5 py-1.5 rounded-lg border border-purple-500/40 bg-purple-950/40 text-purple-300 hover:text-white transition-all text-xs font-bold"
          >
            Weekend Only ($w_2=0$)
          </button>
        </div>
      </div>

      {/* The 3-Step Physical Diagram: Inputs -> Weighted Sum -> Diode -> Output Dial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Step 1: Incoming Connections (Knobs) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>1. Incoming Knobs (Weights)</span>
            <Sliders size={14} className="text-purple-400" />
          </div>

          {/* Knob 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Input 1: Day ($x_1 = 6$)</span>
              <span className="text-sky-400 font-bold font-mono">Weight $w_1 = {w1}$</span>
            </div>
            <input
              type="range"
              min="-100"
              max="150"
              step="5"
              value={w1}
              onChange={(e) => setW1(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <span className="text-[10px] text-slate-500 block">Contribution: $6 \times {w1} = {6 * w1}$</span>
          </div>

          {/* Knob 2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Input 2: Temp ($x_2 = 31^\circ\text{'{'}C{'}'}$)</span>
              <span className="text-amber-400 font-bold font-mono">Weight $w_2 = {w2}$</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              step="2"
              value={w2}
              onChange={(e) => setW2(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span className="text-[10px] text-slate-500 block">Contribution: $31 \times ({w2}) = {31 * w2}$</span>
          </div>

          {/* Knob 3: Bias */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="flex justify-between">
              <span className="text-rose-300 font-bold">Inactivity Threshold (Bias $b$)</span>
              <span className="text-rose-400 font-bold font-mono">$b = {b}$</span>
            </div>
            <input
              type="range"
              min="-300"
              max="100"
              step="10"
              value={b}
              onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
            <span className="text-[10px] text-slate-500 block">How negative the neuron stays before firing</span>
          </div>
        </div>

        {/* Step 2: The Pre-Activation Sum & Diode (Hinge) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-center flex flex-col justify-center items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            2. The Electrical Diode (Hinge)
          </span>

          {/* Pre-activation box */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 w-full space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Pre-Activation Total ($z$):</span>
            <div className="text-lg font-bold text-white font-mono">
              $z = ({w1 * x1}) + ({w2 * x2}) + ({b}) = $ <span className={z >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{z}</span>
            </div>
          </div>

          {/* Activation switch toggle */}
          <div className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-300">Hinge: $\text{'{'}ReLU{'}'}(z) = \max(0, z)$</span>
            <button
              onClick={() => setUseActivation(!useActivation)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                useActivation ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {useActivation ? 'ReLU ACTIVE' : 'LINEAR (NO HINGE)'}
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-sans leading-relaxed">
            {z < 0 && useActivation ? (
              <span className="text-rose-400 font-bold">
                ⛔ Signal is negative ($z = {z}$). Diode blocks the current! Activation remains zero ($a = 0$).
              </span>
            ) : (
              <span className="text-emerald-400 font-bold">
                ⚡ Signal is positive ($z = {z}$). Diode conducts fully! Activation passes untouched ($a = {a}$).
              </span>
            )}
          </div>
        </div>

        {/* Step 3: The Output Activation Dial */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-center flex flex-col justify-center items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            3. The Final Activation Dial ($a$)
          </span>

          {/* Giant glowing dial / lightbulb */}
          <div className="relative flex items-center justify-center my-2">
            <motion.div
              animate={{
                scale: isFired ? 1.08 : 0.95,
                boxShadow: isFired
                  ? '0 0 35px rgba(52, 211, 153, 0.4)'
                  : '0 0 10px rgba(0, 0, 0, 0.5)',
              }}
              className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center transition-colors duration-300 ${
                isFired
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-600'
              }`}
            >
              <span className="text-[11px] uppercase font-bold tracking-wider">Activation</span>
              <span className="text-3xl font-black font-mono mt-1">{a}</span>
              <span className="text-[10px] font-sans mt-0.5 opacity-80">
                {isFired ? 'LIGHTS UP' : 'DARK (OFF)'}
              </span>
            </motion.div>
          </div>

          <div className="text-[11px] text-slate-400 font-sans">
            This number ($a = {a}$) is now handed to the next layer as an input feature!
          </div>
        </div>
      </div>

      {/* 3B1B Core Insight Anchor */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed">
        <strong className="text-white font-mono block mb-1">The 3Blue1Brown Insight:</strong>
        A neural network is not a mysterious thinking entity. It is a mathematical switchboard of millions of these simple dials. The <strong>weights</strong> determine what causes a dial to light up; the <strong>bias</strong> sets the threshold for how strict it is before lighting up; and the <strong>activation function</strong> ensures that stacking dials can bend around nonlinear spikes!
      </div>
    </div>
  );
}
