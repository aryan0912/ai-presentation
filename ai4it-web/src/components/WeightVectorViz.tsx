'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Layers, ArrowRight } from 'lucide-react';

export default function WeightVectorViz() {
  const [hasGuessed, setHasGuessed] = useState<boolean>(false);
  const [userGuess, setUserGuess] = useState<string | null>(null);

  const handleGuess = (val: string) => {
    setUserGuess(val);
    setHasGuessed(true);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wide">
            Multi-Feature Regression
          </span>
          <h4 className="text-lg font-bold text-white mt-0.5">
            Bundling Weights into a Feature Vector
          </h4>
        </div>
        <span className="text-xs font-mono text-slate-500">Day + Temp &rarr; Volume</span>
      </div>

      {/* Visual Weight Bundling Vector Animation */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-4 text-center">
        <div className="space-y-1">
          <span className="text-xs font-mono text-slate-400 block">Individual Feature Weights:</span>
          <div className="flex items-center gap-3 font-mono text-sm">
            <span className="px-3 py-1.5 rounded-lg bg-sky-950/80 text-sky-300 border border-sky-800/60 font-bold">
              w₁ (Day Weight)
            </span>
            <span className="text-slate-500">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold">
              w₂ (Temp Weight)
            </span>
          </div>
        </div>

        <ArrowRight size={20} className="text-slate-600 hidden md:block" />

        <div className="space-y-1">
          <span className="text-xs font-mono text-slate-400 block">Bundled Weight Vector (W):</span>
          <div className="px-4 py-2 rounded-xl bg-purple-950/60 text-purple-200 border border-purple-500/50 font-mono text-base font-bold flex items-center gap-1.5">
            <span>W = [</span>
            <span className="text-sky-400">w₁</span>
            <span className="text-slate-400">,</span>
            <span className="text-emerald-400">w₂</span>
            <span>]</span>
          </div>
        </div>
      </div>

      {/* GUESS GATE BEFORE REVEALING TABLE (§7 3B.7) */}
      {!hasGuessed ? (
        <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <HelpCircle size={18} />
            <span>Guess: We're adding temperature to explain Saturday's spike (2,850L). Will it help?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Saturday had an unannounced local festival, causing milk intake to surge from ~2,420L to 2,850L. How much will adding ambient temperature as a 2nd weight fix this miss?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-xs">
            <button
              onClick={() => handleGuess('fully')}
              className="p-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-sky-500 text-left text-slate-300 transition-colors"
            >
              <strong className="text-sky-400 block mb-1">1. Fully Fixes It</strong>
              <span className="text-[11px] text-slate-400">More data = perfect straight fit</span>
            </button>

            <button
              onClick={() => handleGuess('partial')}
              className="p-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-emerald-500 text-left text-slate-300 transition-colors"
            >
              <strong className="text-emerald-400 block mb-1">2. Partially Helps</strong>
              <span className="text-[11px] text-slate-400">Cuts the miss significantly in half</span>
            </button>

            <button
              onClick={() => handleGuess('nothing')}
              className="p-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-rose-500 text-left text-slate-300 transition-colors"
            >
              <strong className="text-rose-400 block mb-1">3. Barely Anything</strong>
              <span className="text-[11px] text-slate-400">Straight lines can't bend for categories</span>
            </button>
          </div>
        </div>
      ) : (
        /* Revealed 1-Feature vs. 2-Feature Comparison Table */
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
            <table className="w-full text-center border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                  <th className="py-2.5 px-3">Day</th>
                  <th className="py-2.5 px-3">Temp (°C)</th>
                  <th className="py-2.5 px-3">Actual Intake</th>
                  <th className="py-2.5 px-3 text-sky-400">1-Feature Fit (Day Only)</th>
                  <th className="py-2.5 px-3 text-emerald-400">2-Feature Fit (Day + Temp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr><td className="py-2 px-3 text-white font-bold">Mon</td><td>32°C</td><td>2,140 L</td><td>2,110.0 L</td><td>2,171.6 L</td></tr>
                <tr><td className="py-2 px-3 text-white font-bold">Tue</td><td>34°C</td><td>2,210 L</td><td>2,188.6 L</td><td>2,198.5 L</td></tr>
                <tr><td className="py-2 px-3 text-white font-bold">Wed</td><td>38°C</td><td>2,180 L</td><td>2,267.1 L</td><td>2,185.9 L</td></tr>
                <tr><td className="py-2 px-3 text-white font-bold">Thu</td><td>35°C</td><td>2,300 L</td><td>2,345.7 L</td><td>2,311.8 L</td></tr>
                <tr><td className="py-2 px-3 text-white font-bold">Fri</td><td>33°C</td><td>2,350 L</td><td>2,424.3 L</td><td>2,418.0 L</td></tr>
                
                {/* Saturday Festival Row with Slow 2s Breathe Pulse */}
                <tr className="bg-purple-950/40 border-y-2 border-purple-500/50 font-bold animate-[pulse_2s_ease-in-out_infinite]">
                  <td className="py-2.5 px-3 text-white">Sat (Festival)</td>
                  <td>31°C</td>
                  <td className="text-purple-300 text-sm">2,850 L</td>
                  <td className="text-rose-400">
                    2,502.9 L <span className="text-[10px] text-rose-300 block">(-347 L miss)</span>
                  </td>
                  <td className="text-rose-400">
                    2,524.1 L <span className="text-[10px] text-rose-300 block">(-326 L miss)</span>
                  </td>
                </tr>

                <tr><td className="py-2 px-3 text-white font-bold">Sun</td><td>30°C</td><td>2,390 L</td><td>2,581.4 L</td><td>2,610.5 L</td></tr>
              </tbody>
            </table>
          </div>

          {/* Visual Bar Comparison of Miss */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-300 block">
              Visual Saturday Miss Comparison:
            </span>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-24 text-slate-400 text-[11px]">1-Feature Miss:</span>
                <div className="h-4 rounded bg-rose-500/30 border border-rose-500/60 text-rose-300 text-[10px] flex items-center px-2" style={{ width: '85%' }}>
                  347 Litres Error
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 text-slate-400 text-[11px]">2-Feature Miss:</span>
                <div className="h-4 rounded bg-rose-500/30 border border-rose-500/60 text-rose-300 text-[10px] flex items-center px-2" style={{ width: '80%' }}>
                  326 Litres Error (Barely 6% improvement)
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200 font-mono leading-relaxed">
            <strong>The Honest Punchline:</strong> Adding temperature barely closed the gap (from 347L to 326L). Why? Because Saturday was driven by a festival — a categorical event, not a continuous slope. And no matter how many weights you add to a line, a flat plane cannot bend.
          </div>
        </div>
      )}
    </div>
  );
}
