'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Activity, ArrowRight, Layers, AlertTriangle, Sparkles } from 'lucide-react';

export default function RnnMemoryDecayViz() {
  const [currentStep, setCurrentStep] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // 28-day synthetic milk intake sequence with a major festival surge on Day 4 (2,900L)
  const daysData = [
    { day: 1, val: 2140, label: 'Mon' },
    { day: 2, val: 2210, label: 'Tue' },
    { day: 3, val: 2180, label: 'Wed' },
    { day: 4, val: 2900, isSpike: true, label: 'Thu (Festival)' },
    { day: 5, val: 2350, label: 'Fri' },
    { day: 6, val: 2420, label: 'Sat' },
    { day: 7, val: 2390, label: 'Sun' },
    { day: 8, val: 2380, label: 'Mon' },
    { day: 9, val: 2410, label: 'Tue' },
    { day: 10, val: 2400, label: 'Wed' },
    { day: 11, val: 2430, label: 'Thu' },
    { day: 12, val: 2450, label: 'Fri' },
    { day: 13, val: 2440, label: 'Sat' },
    { day: 14, val: 2420, label: 'Sun' },
    { day: 15, val: 2460, label: 'Mon' },
    { day: 16, val: 2480, label: 'Tue' },
    { day: 17, val: 2450, label: 'Wed' },
    { day: 18, val: 2490, label: 'Thu' },
    { day: 19, val: 2510, label: 'Fri' },
    { day: 20, val: 2500, label: 'Sat' },
    { day: 21, val: 2480, label: 'Sun' },
    { day: 22, val: 2520, label: 'Mon' },
    { day: 23, val: 2540, label: 'Tue' },
    { day: 24, val: 2510, label: 'Wed' },
    { day: 25, val: 2530, label: 'Thu' },
    { day: 26, val: 2560, label: 'Fri' },
    { day: 27, val: 2580, label: 'Sat' },
    { day: 28, val: 2550, label: 'Sun' },
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 28) {
            setIsPlaying(false);
            return 4;
          }
          return prev + 1;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Retention of Day 4's spike influence as step moves from 4 to 28
  const getInfluence = (step: number) => {
    if (step < 4) return 0;
    if (step === 4) return 100;
    const distance = step - 4;
    return Math.max(1, Number((100 * Math.pow(0.82, distance)).toFixed(1)));
  };

  const currentInfluence = getInfluence(currentStep);

  // Unrolled chain display around the current step (showing 5 cells in focus)
  const visibleSteps = [
    Math.max(1, currentStep - 2),
    Math.max(1, currentStep - 1),
    currentStep,
    Math.min(28, currentStep + 1),
    Math.min(28, currentStep + 2),
  ].filter((v, idx, arr) => arr.indexOf(v) === idx);

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      {/* Luminous top neon line */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-500 via-purple-500 to-sky-400 animate-pulse" />

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
              Hop 1 · Unrolled Recurrent Architecture
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            RNN Hidden State Vector Passing &amp; Vanishing Memory ($t=1 \to 28$)
          </h4>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/30'
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause Loop' : 'Play Flow'}</span>
          </button>

          <button
            onClick={() => { setIsPlaying(false); setCurrentStep(4); }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all"
            title="Reset to Day 4 Spike"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Polish 1: High-Fidelity SVG Unrolled Recurrent Network Diagram */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between w-full">
          <span>Unrolled Computational Graph in Time: h_t = tanh(W &middot; h_{'{t-1}'} + U &middot; x_t)</span>
          <span className="text-sky-300 font-bold">Focus: Day {currentStep}</span>
        </div>

        <svg viewBox="0 0 800 240" className="w-full max-w-[800px] h-[220px]">
          <defs>
            <linearGradient id="rnnGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="spikeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="neonShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.6" />
            </filter>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrowFaded" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Render 5 unrolled cells */}
          {visibleSteps.map((stepNum, idx) => {
            const cx = 100 + idx * 150;
            const cy = 110;
            const isSpike = stepNum === 4;
            const isCurrent = stepNum === currentStep;
            const stepInf = getInfluence(stepNum);
            const dataItem = daysData[stepNum - 1];

            return (
              <g key={stepNum} className="transition-all duration-300">
                {/* Connecting Hidden State Arrow from previous cell */}
                {idx > 0 && (
                  <g>
                    <line
                      x1={cx - 105}
                      y1={cy}
                      x2={cx - 45}
                      y2={cy}
                      stroke={stepNum <= currentStep ? '#38bdf8' : '#334155'}
                      strokeWidth={stepNum <= currentStep ? '3' : '1.5'}
                      markerEnd={stepNum <= currentStep ? 'url(#arrow)' : 'url(#arrowFaded)'}
                    />
                    <text
                      x={cx - 75}
                      y={cy - 10}
                      textAnchor="middle"
                      fill={stepNum <= currentStep ? '#38bdf8' : '#64748b'}
                      fontSize="9"
                      fontWeight="bold"
                    >
                      h_{stepNum - 1}
                    </text>
                  </g>
                )}

                {/* Input Vector Arrow x_t coming up from bottom */}
                <line
                  x1={cx}
                  y1={200}
                  x2={cx}
                  y2={cy + 40}
                  stroke={isSpike ? '#f59e0b' : '#94a3b8'}
                  strokeWidth={isSpike ? '3' : '1.5'}
                  strokeDasharray={isSpike ? 'none' : '3 3'}
                  markerEnd="url(#arrow)"
                />
                <circle cx={cx} cy={205} r="14" fill="#0f172a" stroke={isSpike ? '#f59e0b' : '#475569'} strokeWidth="1.5" />
                <text x={cx} y={209} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                  x_{stepNum}
                </text>
                <text x={cx} y={230} textAnchor="middle" fill={isSpike ? '#fbbf24' : '#94a3b8'} fontSize="8" fontWeight="bold">
                  {dataItem.val}L
                </text>

                {/* Main RNN Cell Node Box */}
                <rect
                  x={cx - 42}
                  y={cy - 35}
                  width="84"
                  height="70"
                  rx="14"
                  fill={isCurrent ? 'url(#rnnGlow)' : isSpike ? '#451a03' : '#0f172a'}
                  stroke={isCurrent ? '#38bdf8' : isSpike ? '#f59e0b' : '#334155'}
                  strokeWidth={isCurrent ? '2.5' : '1.5'}
                  filter={isCurrent ? 'url(#neonShadow)' : 'none'}
                />

                {/* Cell Internal Labels */}
                <text x={cx} y={cy - 12} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  Day {stepNum}
                </text>
                <text x={cx} y={cy + 5} textAnchor="middle" fill={isCurrent ? '#e0f2fe' : '#94a3b8'} fontSize="9">
                  tanh(Wh + Ux)
                </text>

                {/* Remaining Spike Memory Badge inside Cell */}
                {stepNum >= 4 && (
                  <g transform={`translate(${cx}, ${cy + 22})`}>
                    <rect x="-30" y="-7" width="60" height="14" rx="4" fill="#000000" fillOpacity="0.7" />
                    <text textAnchor="middle" dy="3.5" fill={stepInf > 40 ? '#34d399' : stepInf > 10 ? '#fbbf24' : '#f87171'} fontSize="8" fontWeight="bold">
                      {stepInf}% Mem
                    </text>
                  </g>
                )}

                {/* Output Prediction Arrow y_t going UP */}
                <line
                  x1={cx}
                  y1={cy - 35}
                  x2={cx}
                  y2={25}
                  stroke={isCurrent ? '#38bdf8' : '#475569'}
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                />
                <circle cx={cx} cy={20} r="12" fill="#0f172a" stroke={isCurrent ? '#38bdf8' : '#334155'} strokeWidth="1.5" />
                <text x={cx} y={24} textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">
                  y_{stepNum}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Step Slider & Memory Retention Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Step Slider (8 Cols) */}
        <div className="md:col-span-8 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Day 1 (Start)</span>
            <span className="text-amber-400 font-bold">Day 4 (Festival Surge: 2,900L)</span>
            <span className="text-rose-400 font-bold">Day 25+ (Memory Vanished)</span>
            <span>Day 28</span>
          </div>
          <input
            type="range"
            min="1"
            max="28"
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>

        {/* Memory Retention Gauge (4 Cols) */}
        <div className="md:col-span-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">
            Day 4 Signal in $h_{`{${currentStep}}`}$:
          </span>
          <div className={`text-2xl font-black ${currentInfluence > 50 ? 'text-emerald-400' : currentInfluence > 15 ? 'text-amber-400' : 'text-rose-400'}`}>
            {currentInfluence}%
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mt-1">
            <motion.div
              className={`h-full ${currentInfluence > 50 ? 'bg-emerald-500' : currentInfluence > 15 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${currentInfluence}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

      </div>

      {/* Honest Pedagogical Explanation */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
        <strong className="text-sky-300 font-mono block mb-1">The Vanishing Past Phenomenon:</strong>
        Because $h_t$ is repeatedly squashed through continuous matrix multiplications ($W$), the gradient and influence of Day 4 exponentially decays into noise by Week 3. This critical failure directly motivated the creation of <strong>LSTMs (Hop 2)</strong>!
      </div>

    </div>
  );
}
