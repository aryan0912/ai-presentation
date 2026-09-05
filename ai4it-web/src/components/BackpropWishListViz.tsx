'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';

export default function BackpropWishListViz() {
  const [step, setStep] = useState<number>(0);

  const steps = [
    {
      title: "1. The Forward Miss (Saturday Spike)",
      desc: "Our model outputted 2,524L, but actual milk was 2,850L. We are short by +326 Liters!",
      action: "Calculate Output Error",
    },
    {
      title: "2. The Output Neuron's 'Wish List'",
      desc: "The output neuron says: 'To increase my prediction by +326, who contributed to me?' Output = w_1*a_1 + w_2*a_2 + b. We want to nudge three things: increase bias b, and increase weights on whichever hidden neurons were active!",
      action: "Assign Output Blame",
    },
    {
      title: "3. Blame Apportionment (Passing the Wish Backward)",
      desc: "Neuron 1 (Weekend Detector) was firing strongly (a_1 = 40). Neuron 2 was inactive (a_2 = 0). The network assigns 100% of the blame to Neuron 1's upstream weights and leaves Neuron 2 untouched!",
      action: "Pass Gradient Backward",
    },
    {
      title: "4. Nudge the Knobs (Gradient Step)",
      desc: "Every weight adjusts by: new_weight = old_weight - (learning_rate * blame). The Saturday spike is captured on the very next epoch!",
      action: "Weights Updated",
    },
  ];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-400" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <GitPullRequest size={14} />
            <span>3Blue1Brown Visual Anchor 4 · Demystifying Backpropagation</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Backpropagation: Passing the &ldquo;Wish List&rdquo; Backward
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Grant Sanderson's perspective: Backprop is not terrifying multivariable calculus—it is simply passing an upstream wish list of desired nudges backward.
          </p>
        </div>

        {/* Step navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(0)}
            disabled={step === 0}
            className="p-2 text-slate-400 hover:text-white disabled:opacity-30"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg disabled:opacity-30 transition-all shadow-md shadow-purple-600/20"
          >
            <span>{step === steps.length - 1 ? 'Finished' : 'Next Step'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Current Step Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <span className="text-purple-300 font-bold text-xs">{steps[step].title}</span>
        <p className="text-slate-300 font-sans text-xs leading-relaxed">
          {steps[step].desc}
        </p>
      </div>

      {/* Visual Backprop Network Flow Diagram */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center relative">
        <svg viewBox="0 0 600 220" className="w-full max-w-[560px] h-[190px]">
          {/* Defs for arrowheads */}
          <defs>
            <marker id="backArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#f43f5e" />
            </marker>
            <marker id="forwardArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Layer 0: Inputs */}
          <circle cx="80" cy="70" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="80" y="74" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Day (6)</text>

          <circle cx="80" cy="150" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="80" y="154" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Temp (31)</text>

          {/* Layer 1: Hidden Neurons */}
          <circle cx="280" cy="70" r="26" fill="#1e1b4b" stroke={step >= 2 ? "#a855f7" : "#475569"} strokeWidth="2.5" />
          <text x="280" y="68" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">Weekend</text>
          <text x="280" y="80" fill="#c084fc" fontSize="9" textAnchor="middle">a₁ = 40</text>

          <circle cx="280" cy="150" r="26" fill="#0f172a" stroke="#475569" strokeWidth="2" />
          <text x="280" y="148" fill="#64748b" fontSize="9" textAnchor="middle">Mild Temp</text>
          <text x="280" y="160" fill="#64748b" fontSize="9" textAnchor="middle">a₂ = 0</text>

          {/* Layer 2: Output Neuron */}
          <circle cx="480" cy="110" r="30" fill="#4c0519" stroke={step >= 1 ? "#f43f5e" : "#475569"} strokeWidth="2.5" />
          <text x="480" y="106" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">Output (ŷ)</text>
          <text x="480" y="120" fill="#fda4af" fontSize="9" textAnchor="middle">2,524L</text>

          {/* Forward connections */}
          <line x1="102" y1="70" x2="254" y2="70" stroke="#334155" strokeWidth="1.5" />
          <line x1="102" y1="150" x2="254" y2="70" stroke="#334155" strokeWidth="1.5" />
          <line x1="306" y1="70" x2="450" y2="110" stroke="#334155" strokeWidth="1.5" />
          <line x1="306" y1="150" x2="450" y2="110" stroke="#334155" strokeWidth="1.5" />

          {/* Reverse Error Flow Arrows (Backpropagation) */}
          {step >= 1 && (
            <g>
              {/* Target error signal */}
              <text x="530" y="60" fill="#f43f5e" fontSize="11" fontWeight="bold">Error: +326L</text>
              <path d="M 530 70 Q 500 80 485 85" fill="none" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#backArrow)" />
            </g>
          )}

          {step >= 2 && (
            <g>
              {/* Backprop wish to Weekend detector */}
              <path d="M 450 100 Q 380 70 310 70" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" markerEnd="url(#backArrow)" />
              <text x="380" y="60" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">
                Nudge w₁ (+Δw)
              </text>
            </g>
          )}

          {step >= 3 && (
            <g>
              {/* Upstream knob adjustment */}
              <path d="M 254 70 Q 180 50 106 70" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#forwardArrow)" />
              <text x="180" y="50" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                Knob Adjusted!
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* The 3 Things the Output Neuron Wishes For */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-sky-400 font-bold block text-xs">Wish 1: Increase Bias ($b$)</span>
          <p className="text-[11px] text-slate-400 font-sans">
            A uniform baseline boost to all predictions: $b \leftarrow b + \eta \cdot \delta$.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-amber-400 font-bold block text-xs">Wish 2: Reward Active Neurons</span>
          <p className="text-[11px] text-slate-400 font-sans">
            Increase weight $w_1$ connected to the Weekend detector because it was already firing ($a_1=40$).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-emerald-400 font-bold block text-xs">Wish 3: Ignore Inactive Dials</span>
          <p className="text-[11px] text-slate-400 font-sans">
            Since $a_2 = 0$, changing $w_2$ has zero effect ($w_2 \times 0 = 0$). Zero gradient wasted!
          </p>
        </div>
      </div>
    </div>
  );
}
