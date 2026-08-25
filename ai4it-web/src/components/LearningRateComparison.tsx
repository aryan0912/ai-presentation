'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function LearningRateComparison() {
  const [hasGuessed, setHasGuessed] = useState<boolean>(false);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState<number>(0);

  const handleGuess = (val: string) => {
    setUserGuess(val);
    setHasGuessed(true);
    setAnimKey((prev) => prev + 1);
  };

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
            Interactive Speed Comparison
          </span>
          <h4 className="text-lg font-bold text-white mt-0.5">
            The 3 Learning Rate Regimes
          </h4>
        </div>

        {hasGuessed && (
          <button
            onClick={handleReplay}
            className="button-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 text-slate-300"
          >
            <RotateCcw size={13} /> Replay All 3 Bowls
          </button>
        )}
      </div>

      {/* GUESS GATE BEFORE PLAYING (§7 3B.4) */}
      {!hasGuessed ? (
        <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <HelpCircle size={18} />
            <span>Guess Before Watching: Which Learning Rate Wins the Race Downhill?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Three marbles are placed on identical bowls under different learning rates. Which one reaches the bottom first, and which one fails completely?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-xs">
            <button
              onClick={() => handleGuess('small')}
              className="p-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-sky-500 text-left text-slate-300 transition-colors"
            >
              <strong className="text-sky-400 block mb-1">1. Tiny Steps Win</strong>
              <span className="text-[11px] text-slate-400">Safe, steady, never overshoots</span>
            </button>

            <button
              onClick={() => handleGuess('tuned')}
              className="p-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-emerald-500 text-left text-slate-300 transition-colors"
            >
              <strong className="text-emerald-400 block mb-1">2. Well-Tuned Wins</strong>
              <span className="text-[11px] text-slate-400">Balances speed &amp; stability in ~5 steps</span>
            </button>

            <button
              onClick={() => handleGuess('huge')}
              className="p-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-rose-500 text-left text-slate-300 transition-colors"
            >
              <strong className="text-rose-400 block mb-1">3. Giant Leap Wins</strong>
              <span className="text-[11px] text-slate-400">Fastest possible leap across the valley</span>
            </button>
          </div>
        </div>
      ) : (
        /* 3 Synchronized Bowls Display */
        <div key={animKey} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* BOWL 1: Too Small */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-sky-400">η = 0.001 (Too Small)</span>
                <span className="text-[10px] font-mono text-slate-500">15+ tiny hops</span>
              </div>
              <div className="relative h-28 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                <svg viewBox="0 0 160 100" className="w-full h-full">
                  <path d="M 20 20 Q 80 90 140 20" fill="none" stroke="#334155" strokeWidth="2" />
                  <circle cx="80" cy="90" r="3" fill="#34d399" />
                  {/* Dot animation: crawling down */}
                  <motion.circle
                    r="4.5"
                    fill="#38bdf8"
                    initial={{ cx: 30, cy: 30 }}
                    animate={{
                      cx: [30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74],
                      cy: [30, 36, 42, 48, 54, 60, 66, 72, 78, 83, 87, 89],
                    }}
                    transition={{ duration: 3.5, ease: 'linear' }}
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5 leading-tight">
              <strong>Painfully slow:</strong> Glacially crawls downhill. Safe, but takes thousands of steps to converge.
            </p>
          </div>

          {/* BOWL 2: Just Right */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-300">η = 0.02 (Just Right)</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">Optimal</span>
              </div>
              <div className="relative h-28 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                <svg viewBox="0 0 160 100" className="w-full h-full">
                  <path d="M 20 20 Q 80 90 140 20" fill="none" stroke="#334155" strokeWidth="2" />
                  <circle cx="80" cy="90" r="3" fill="#34d399" />
                  {/* Dot animation: 5 visible steps settling to bottom */}
                  <motion.circle
                    r="5"
                    fill="#34d399"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    initial={{ cx: 30, cy: 30 }}
                    animate={{
                      cx: [30, 52, 70, 84, 80],
                      cy: [30, 62, 84, 88, 90],
                    }}
                    transition={{ duration: 2.2, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeOut' }}
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] text-emerald-200 mt-2.5 leading-tight">
              <strong>Smooth descent:</strong> Rolls briskly downhill and settles into the valley basin in ~5–6 updates.
            </p>
          </div>

          {/* BOWL 3: Too Large (Blow Up!) */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-rose-400">η = 0.35 (Too Large)</span>
                <span className="text-[10px] font-mono text-rose-400 font-bold">Divergence!</span>
              </div>
              <div className="relative h-28 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                <svg viewBox="0 0 160 100" className="w-full h-full">
                  <path d="M 20 20 Q 80 90 140 20" fill="none" stroke="#334155" strokeWidth="2" />
                  <circle cx="80" cy="90" r="3" fill="#34d399" />
                  {/* Dot animation: overshooting wall to wall then flying out */}
                  <motion.circle
                    r="5"
                    fill="#f43f5e"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    initial={{ cx: 30, cy: 30, opacity: 1 }}
                    animate={{
                      cx: [30, 120, 10, 155, 175],
                      cy: [30, 35, 10, -20, -50],
                      opacity: [1, 1, 1, 0.8, 0],
                    }}
                    transition={{ duration: 2.5, times: [0, 0.3, 0.6, 0.85, 1], ease: 'easeInOut' }}
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] text-rose-200 mt-2.5 leading-tight">
              <strong>Explosive failure:</strong> Overshoots the bottom, bounces up the opposite wall, and rockets out of bounds!
            </p>
          </div>

        </div>
      )}

      {/* IT-Domain Anchor Callout (§7 3B.4) */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
        <strong className="text-amber-400 block mb-1">
          IT Systems Anchor (Autoscaling &amp; Control Theory):
        </strong>
        This is the identical trade-off you manage in Kubernetes autoscaling step size, cloud capacity scaling policies, or PID controller gain: set the step too conservative, and you are always lagging demand; set it too aggressive, and your cluster oscillates wildly or thrashes nodes into crash loops.
      </div>
    </div>
  );
}
