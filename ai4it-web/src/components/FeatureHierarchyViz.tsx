'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, CheckCircle2, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface DayData {
  dayName: string;
  dayNum: number;
  temp: number;
  isSaturday: boolean;
  actualMilk: number;
}

export default function FeatureHierarchyViz() {
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(5); // Default to Saturday (idx 5)

  const weekData: DayData[] = [
    { dayName: "Monday", dayNum: 1, temp: 32, isSaturday: false, actualMilk: 2140 },
    { dayName: "Tuesday", dayNum: 2, temp: 34, isSaturday: false, actualMilk: 2210 },
    { dayName: "Wednesday", dayNum: 3, temp: 38, isSaturday: false, actualMilk: 2180 },
    { dayName: "Thursday", dayNum: 4, temp: 35, isSaturday: false, actualMilk: 2300 },
    { dayName: "Friday", dayNum: 5, temp: 33, isSaturday: false, actualMilk: 2350 },
    { dayName: "Saturday (Festival)", dayNum: 6, temp: 31, isSaturday: true, actualMilk: 2850 },
    { dayName: "Sunday", dayNum: 7, temp: 30, isSaturday: false, actualMilk: 2390 },
  ];

  const currentDay = weekData[selectedDayIdx];

  // Hidden Layer Feature Detectors:
  // Neuron 1: Weekend Surge Detector (fires only on Day >= 6)
  // z1 = 60 * Day - 320 -> on Day 6: 360 - 320 = 40 (fires!) -> on Day 5: 300 - 320 = -20 (0)
  const z1 = 60 * currentDay.dayNum - 320;
  const a1 = Math.max(0, z1);

  // Neuron 2: Optimal Mild Transport Weather Detector (prefers temp <= 32°C)
  // z2 = -15 * Temp + 500 -> at 31°C: -465 + 500 = 35 -> at 38°C: -570 + 500 = -70 (0)
  const z2 = -15 * currentDay.temp + 500;
  const a2 = Math.max(0, z2);

  // Neuron 3: Baseline Normal Route Flow (general weekday steady-state)
  // z3 = 30 * Day + 1500
  const z3 = 30 * currentDay.dayNum + 1500;
  const a3 = Math.max(0, z3);

  // Output Layer: Synthesizes features into final prediction:
  // y_pred = 7.5 * a1 + 3.2 * a2 + 0.5 * a3 + 1200
  const predictedMilk = Math.round(7.5 * a1 + 3.2 * a2 + 0.5 * a3 + 1200);
  const error = predictedMilk - currentDay.actualMilk;

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <Layers size={14} />
            <span>3Blue1Brown Visual Anchor 2 · Feature Hierarchy</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            What Do Hidden Layers Actually Do? Feature Detectors
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Grant Sanderson's key insight: layers break complex messy problems down into a hierarchy of specialized sub-detectors.
          </p>
        </div>

        {/* Day selection buttons */}
        <div className="flex flex-wrap gap-1.5">
          {weekData.map((d, idx) => (
            <button
              key={d.dayName}
              onClick={() => setSelectedDayIdx(idx)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                selectedDayIdx === idx
                  ? d.isSaturday
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md font-black'
                    : 'bg-sky-600 text-white border-sky-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {d.dayName.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* The 3-Tier Layer Pipeline: Raw Inputs -> Hidden Detectors -> Final Synthesis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Tier 1: Raw Inputs (Layer 0) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Layer 0: Raw Physical Inputs
            </span>
            <span className="text-[11px] font-sans text-slate-500">Unfiltered measurements</span>
          </div>

          <div className="space-y-3 font-mono">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Day Number ($x_1$):</span>
              <span className="text-lg font-bold text-sky-400">Day {currentDay.dayNum}</span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Temperature ($x_2$):</span>
              <span className="text-lg font-bold text-amber-400">{currentDay.temp}&deg;C</span>
            </div>
          </div>

          <div className="text-[11px] font-sans text-slate-400 border-t border-slate-800/80 pt-2">
            Selected: <strong className="text-white">{currentDay.dayName}</strong>
          </div>
        </div>

        {/* Tier 2: Hidden Layer 1 (Specialized Feature Detectors) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/40 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Layer 1: Learned Feature Detectors</span>
            </span>
            <span className="text-[11px] font-sans text-slate-400">Specialized business concept dials</span>
          </div>

          <div className="space-y-2.5">
            {/* Detector 1: Weekend Surge */}
            <div className={`p-3 rounded-xl border transition-all ${
              a1 > 0 ? 'bg-purple-950/60 border-purple-400 shadow-md shadow-purple-500/20' : 'bg-slate-950 border-slate-800 opacity-60'
            }`}>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-white">1. Weekend Surge Detector</span>
                <span className={`font-bold ${a1 > 0 ? 'text-purple-300' : 'text-slate-600'}`}>
                  {a1 > 0 ? `FIRED ($a_1=${a1}$)` : 'INACTIVE (0)'}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-sans">
                Only fires on Friday evening and Saturday morning surges.
              </div>
            </div>

            {/* Detector 2: Mild Weather */}
            <div className={`p-3 rounded-xl border transition-all ${
              a2 > 0 ? 'bg-emerald-950/60 border-emerald-400 shadow-md shadow-emerald-500/20' : 'bg-slate-950 border-slate-800 opacity-60'
            }`}>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-white">2. Mild Transport Weather</span>
                <span className={`font-bold ${a2 > 0 ? 'text-emerald-300' : 'text-slate-600'}`}>
                  {a2 > 0 ? `FIRED ($a_2=${a2}$)` : 'INACTIVE (0)'}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-sans">
                Fires when mild temperature avoids milk spoilage delays.
              </div>
            </div>

            {/* Detector 3: Normal Route Flow */}
            <div className={`p-3 rounded-xl border transition-all ${
              a3 > 0 ? 'bg-sky-950/60 border-sky-400 shadow-md shadow-sky-500/20' : 'bg-slate-950 border-slate-800 opacity-60'
            }`}>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-white">3. Baseline Cooperative Intake</span>
                <span className={`font-bold ${a3 > 0 ? 'text-sky-300' : 'text-slate-600'}`}>
                  ACTIVE ($a_3={a3}$)
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-sans">
                Baseline daily intake volume from contracted dairy farmers.
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: Output Layer (Prediction Synthesis) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Output Layer: Weighted Synthesis
            </span>
            <span className="text-[11px] font-sans text-slate-500">Combines high-level detector signals</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-center">
            <span className="text-[10px] text-slate-400 uppercase">Neural Network Forecast</span>
            <div className="text-3xl font-black text-white font-mono">
              {predictedMilk.toLocaleString()} <span className="text-sm font-normal text-slate-400">Liters</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Ground Truth Actual: <strong className="text-emerald-400 font-mono">{currentDay.actualMilk.toLocaleString()} L</strong>
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-center ${
            Math.abs(error) < 50 ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
          }`}>
            <span className="font-bold text-xs">Prediction Error: {error > 0 ? `+${error}` : error} Liters</span>
            <span className="block text-[10px] font-sans opacity-80 mt-0.5">
              {currentDay.isSaturday ? 'The Weekend detector fired to bend around the spike!' : 'Regular weekday error well within 2% margin.'}
            </span>
          </div>
        </div>
      </div>

      {/* 3B1B Takeaway Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed">
        <strong className="text-white font-mono block mb-1">Why Deep Learning Outperformed Linear Regression:</strong>
        A straight line was forced to treat Saturday like an ordinary continuation of Tuesday and Wednesday. But a neural network uses its hidden layer to create a specialized <strong>&ldquo;Weekend Surge Detector&rdquo;</strong> that stays quiet all week ($a_1=0$), and only turns on when Saturday arrives!
      </div>
    </div>
  );
}
