'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function NeuronFormulaExtender() {
  // Stages:
  // 1: LR 1-Feature: y = m·x + c
  // 2: LR 2-Feature: y = w1·x1 + w2·x2 + c
  // 3: Neuron Pre-Activation: z = w1·x1 + w2·x2 + b
  // 4: Neuron Full Activation: a = ReLU(w1·x1 + w2·x2 + b)
  const [stage, setStage] = useState<number>(1);
  const [activeToken, setActiveToken] = useState<string | null>(null);

  return (
    <div className="my-6 p-6 rounded-2xl border border-purple-500/30 bg-slate-950/90 backdrop-blur-md space-y-6 select-none">
      
      {/* Stage Selector Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">
            Formula Evolution: Linear Regression &rarr; Artificial Neuron
          </span>
        </div>

        <div className="flex gap-1.5 font-mono text-[11px]">
          {[
            { id: 1, label: '1. LR (1-Feature)' },
            { id: 2, label: '2. LR (2-Feature)' },
            { id: 3, label: '3. Pre-Activation (z)' },
            { id: 4, label: '4. ReLU Neuron (a)' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStage(s.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-bold ${
                stage === s.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Formula Box */}
      <div className="py-4 flex flex-wrap items-center justify-center gap-2 font-mono text-2xl md:text-3xl font-extrabold text-white text-center">
        
        {stage === 1 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <span className="text-sky-400">y</span>
            <span className="text-slate-500">=</span>
            <span className="text-purple-300">m</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">x</span>
            <span className="text-slate-500">+</span>
            <span className="text-amber-400">c</span>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <span className="text-sky-400">y</span>
            <span className="text-slate-500">=</span>
            <span className="text-purple-300">w₁</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">x₁</span>
            <span className="text-slate-500">+</span>
            <span className="text-purple-300">w₂</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">x₂</span>
            <span className="text-slate-500">+</span>
            <span className="text-amber-400">c</span>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <span className="text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">z</span>
            <span className="text-slate-500">=</span>
            <span className="text-purple-300">w₁</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">x₁</span>
            <span className="text-slate-500">+</span>
            <span className="text-purple-300">w₂</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">x₂</span>
            <span className="text-slate-500">+</span>
            <span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">b</span>
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-500/60">a</span>
            <span className="text-slate-500">=</span>
            <span className="text-purple-400 font-black">ReLU(</span>
            <span className="text-purple-300">w₁</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">x₁</span>
            <span className="text-slate-500">+</span>
            <span className="text-purple-300">w₂</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">x₂</span>
            <span className="text-slate-500">+</span>
            <span className="text-amber-400">b</span>
            <span className="text-purple-400 font-black">)</span>
          </motion.div>
        )}
      </div>

      {/* Explanatory Context Footer */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
        {stage === 1 && (
          <p>
            <strong className="text-sky-400">Linear Regression (1D):</strong> The foundational line. One weight ($m$) scales the input ($x$), and one bias ($c$) sets the starting offset.
          </p>
        )}
        {stage === 2 && (
          <p>
            <strong className="text-purple-400">Linear Regression (2D):</strong> From LR 3B.7 — multiple inputs ($x_1, x_2$) each get their own weight ($w_1, w_2$). Still a straight flat plane.
          </p>
        )}
        {stage === 3 && (
          <p>
            <strong className="text-sky-400">Neuron Pre-Activation (z):</strong> Exactly the same 2-feature linear equation! We rename the output to $z$ because it's not the final answer yet, and $c$ is renamed to $b$ (bias) to match standard AI terminology.
          </p>
        )}
        {stage === 4 && (
          <div className="space-y-1">
            <p className="text-emerald-300 font-bold">
              The Artificial Neuron: Literally y = mx + c with ReLU() wrapped around it!
            </p>
            <p className="text-[11px] text-slate-400">
              a = ReLU(z) = max(0, z). If z &gt; 0, it passes through; if z &le; 0, it zeroes out. That single function call is the bend that makes deep learning possible.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Glossary Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-slate-800/80 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-sky-400 font-bold block">z (Pre-Activation)</span>
          <span className="text-[11px] text-slate-400">Weighted sum (w·x + b)</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-emerald-400 font-bold block">a (Activation)</span>
          <span className="text-[11px] text-slate-400">Final output after ReLU</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-purple-300 font-bold block">w₁, w₂ (Weights)</span>
          <span className="text-[11px] text-slate-400">Feature slopes</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-amber-400 font-bold block">b (Bias)</span>
          <span className="text-[11px] text-slate-400">Offset (formerly c)</span>
        </div>
      </div>

    </div>
  );
}
