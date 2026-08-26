'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, AlertTriangle, CheckCircle2, Zap, HelpCircle } from 'lucide-react';

export default function NeuronArithmeticPlayer() {
  // Stages:
  // 0: Ready
  // 1: Forward Pass (z = 2190, a = 2190, Error = -660)
  // 2: Chain Rule Gradients (dL/da = -1320, da/dz = 1, dz/dw1 = 6 => dL/dw1 = -7920)
  // 3: Isolated w1 Update (w1 => 57.92, Error shrinks -660 => -612.5)
  // 4: Full 3-Parameter Update & Scale Overshoot (w2 => 30.92, b => 2201.32 => z=3507.36, Error = +657.36)
  const [stage, setStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDeadRelu, setIsDeadRelu] = useState<boolean>(false);

  // Auto-play timer
  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      if (stage < 4) {
        setStage((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 2400);
    return () => clearTimeout(timer);
  }, [isPlaying, stage]);

  const handleReset = () => {
    setIsPlaying(false);
    setStage(0);
    setIsDeadRelu(false);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-950/95 border border-slate-800 space-y-6 select-none font-mono text-xs">
      
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            3B.2 &amp; 3B.4 Walkthrough · Single-Neuron Forward &amp; Backward Pass
          </span>
          <h4 className="text-lg font-bold text-white mt-0.5">
            Hand-Working Saturday (Day 6, Temp 31°C, Actual 2,850L)
          </h4>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={14} /> Pause
              </>
            ) : stage >= 4 ? (
              <>
                <RotateCcw size={14} /> Replay
              </>
            ) : (
              <>
                <Play size={14} /> Play Walkthrough
              </>
            )}
          </button>

          <button
            onClick={() => setStage((prev) => Math.min(4, prev + 1))}
            disabled={isPlaying || stage >= 4}
            className="button-secondary text-xs px-2.5 py-1.5 disabled:opacity-40"
          >
            Next Step <ChevronRight size={14} />
          </button>

          <button
            onClick={handleReset}
            className="button-secondary text-xs px-2.5 py-1.5 text-slate-400 hover:text-white"
          >
            <RotateCcw size={14} /> Reset
          </button>

          {/* Dead ReLU Interactive Toggle */}
          <button
            onClick={() => setIsDeadRelu(!isDeadRelu)}
            className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
              isDeadRelu
                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Demonstrate what happens when z is negative"
          >
            <AlertTriangle size={13} className="inline mr-1 text-rose-400" />
            {isDeadRelu ? 'Active: Dead ReLU (z < 0)' : 'Test Dead ReLU'}
          </button>
        </div>
      </div>

      {/* Starting Setup Box */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <span className="text-slate-500 block text-[10px]">Inputs (Saturday):</span>
          <span className="text-white font-bold">Day x₁ = 6, Temp x₂ = 31°C</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Starting Untrained Weights:</span>
          <span className="text-purple-300 font-bold">w₁ = 50, w₂ = -10, b = 2,200</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Ground Truth Actual:</span>
          <span className="text-emerald-400 font-bold">y = 2,850 Litres</span>
        </div>
      </div>

      {/* STAGE 1: Forward Pass (3B.2) */}
      <div className={`p-4 rounded-xl border transition-all ${
        stage >= 1 ? 'bg-sky-950/20 border-sky-500/40' : 'bg-slate-900/20 border-slate-800 opacity-40'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-sky-400 uppercase text-[11px]">
            1. Forward Pass (Saturday Evaluation)
          </span>
          {stage >= 1 && <span className="text-sky-300 text-[10px]">Calculated</span>}
        </div>

        {stage >= 1 ? (
          <div className="space-y-2 text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Pre-Activation: </span>
              <code>z = ({isDeadRelu ? '-50' : '50'} × 6) + (-10 × 31) + {isDeadRelu ? '500' : '2200'} = </code>
              <strong className={isDeadRelu ? 'text-rose-400' : 'text-sky-300'}>
                {isDeadRelu ? '-110' : '2,190'}
              </strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Neuron Activation: </span>
              <code>a = ReLU({isDeadRelu ? '-110' : '2,190'}) = </code>
              <strong className={isDeadRelu ? 'text-rose-400' : 'text-emerald-400'}>
                {isDeadRelu ? '0 (Clamped to Zero!)' : '2,190 Litres'}
              </strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-wrap justify-between gap-2">
              <div>
                <span className="text-slate-400">Residual Error: </span>
                <strong className="text-rose-400">
                  {isDeadRelu ? '0 - 2,850 = -2,850 Litres' : '2,190 - 2,850 = -660 Litres'}
                </strong>
              </div>
              <div>
                <span className="text-slate-400">Squared Loss: </span>
                <strong className="text-purple-300">
                  {isDeadRelu ? '8,122,500' : '435,600'}
                </strong>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-500">Click Play or Next Step to begin hand calculations...</p>
        )}
      </div>

      {/* STAGE 2: The Chain Rule (3B.4) */}
      <div className={`p-4 rounded-xl border transition-all ${
        stage >= 2 ? 'bg-purple-950/20 border-purple-500/40' : 'bg-slate-900/20 border-slate-800 opacity-40'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-purple-400 uppercase text-[11px]">
            2. The 3-Link Chain Rule (Backprop)
          </span>
          {stage >= 2 && <span className="text-purple-300 text-[10px]">Calculated</span>}
        </div>

        {stage >= 2 && (
          <div className="space-y-2 text-slate-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Link 1: ∂Loss / ∂a</span>
                <span className="text-sky-300 font-bold">
                  2 × ({isDeadRelu ? '0 - 2850' : '2190 - 2850'}) = {isDeadRelu ? '-5,700' : '-1,320'}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Link 2: ∂a / ∂z (ReLU')</span>
                <span className={isDeadRelu ? 'text-rose-400 font-black' : 'text-emerald-400 font-bold'}>
                  {isDeadRelu ? '0 (Slope of Flat Region)' : '1 (Since z > 0)'}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Link 3: ∂z / ∂w₁ (Day)</span>
                <span className="text-amber-300 font-bold">x₁ = 6</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/40 text-purple-200">
              <span className="text-slate-400 block mb-1">Chain Rule Multiplication:</span>
              <code className="text-sm font-bold">
                ∂Loss/∂w₁ = (Link 1) × (Link 2) × (Link 3) ={' '}
                {isDeadRelu ? (
                  <span className="text-rose-400">-5,700 × 0 × 6 = 0 (Dead Neuron! No learning happens!)</span>
                ) : (
                  <span className="text-emerald-300">-1,320 × 1 × 6 = -7,920</span>
                )}
              </code>
            </div>
          </div>
        )}
      </div>

      {/* STAGE 3: Isolated w1 Update (Clarity Payoff) */}
      <div className={`p-4 rounded-xl border transition-all ${
        stage >= 3 ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-900/20 border-slate-800 opacity-40'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-emerald-400 uppercase text-[11px]">
            3. Isolated Weight Update (Watching Just w₁ Move, η = 0.001)
          </span>
          {stage >= 3 && <span className="text-emerald-300 text-[10px]">Verified</span>}
        </div>

        {stage >= 3 && (
          <div className="space-y-2 text-slate-300">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <code>w₁_new = 50 - (0.001 × -7,920) = </code>
              <strong className="text-emerald-400 font-bold text-sm"> 57.92</strong>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 flex flex-wrap justify-between items-center gap-2">
              <div>
                <span className="text-slate-400 block text-[10px]">Recomputed Prediction:</span>
                <span className="font-bold">z = (57.92 × 6) + (-10 × 31) + 2200 = 2,237.5 Litres</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Error Reduced!</span>
                <span className="text-emerald-300 font-bold">
                  -660 L &rarr; <strong>-612.5 L</strong> (Shrunk by 47.5 Litres in 1 step!)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STAGE 4: Honest Full 3-Parameter Step & Feature Scale Overshoot */}
      {stage >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-3"
        >
          <div className="flex items-center justify-between border-b border-amber-800/40 pb-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Zap size={16} />
              <span>4. Real Gradient Step: What Happens When All 3 Parameters Move?</span>
            </div>
            <span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-700/60">
              Feature Scale Trap
            </span>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">
            In actual gradient descent, all parameters update together. Let's compute ∂L/∂w₂ (temp) and ∂L/∂b (bias):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">∂L/∂w₂ = -1320 × 1 × 31 = <strong>-40,920</strong></span>
              <span className="text-amber-300">w₂_new = -10 - (0.001 × -40,920) = <strong>30.92</strong></span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">∂L/∂b = -1320 × 1 × 1 = <strong>-1,320</strong></span>
              <span className="text-amber-300">b_new = 2200 - (0.001 × -1,320) = <strong>2,201.32</strong></span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/40 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300">New Output z = (57.92 × 6) + (30.92 × 31) + 2201.32:</span>
              <strong className="text-rose-400 text-sm">3,507.36 Litres</strong>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-slate-800 pt-1">
              <span className="text-slate-400">New Error = 3507.36 - 2850:</span>
              <strong className="text-rose-400 text-sm">+657.36 Litres (Overshoot!)</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/60 text-amber-200 text-xs leading-relaxed">
            <strong className="text-amber-300 block mb-1">Why Did It Overshoot? The Feature Scaling Insight:</strong>
            Because ambient temperature (31°C) is 5× larger than day (6), its gradient ∂L/∂w₂ was 5× bigger (-40,920 vs -7,920), sending w₂ flying from -10 all the way to +30.92! That is why production AI systems <strong>normalize features</strong> (scaling all inputs to mean 0, variance 1) before training!
          </div>
        </motion.div>
      )}

    </div>
  );
}
