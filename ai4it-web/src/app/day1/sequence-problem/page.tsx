'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Clock,
  Eye,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Search
} from 'lucide-react';
import InstructorNote from '@/components/InstructorNote';
import Chart from '@/components/Chart';

export default function SequenceProblemPage() {
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [windowOffset, setWindowOffset] = useState<number>(0);

  // Original 7-Day sequence vs Shuffled sequence
  const originalMilk = [
    { x: 1, y: 2140, label: 'Mon' },
    { x: 2, y: 2210, label: 'Tue' },
    { x: 3, y: 2180, label: 'Wed' },
    { x: 4, y: 2300, label: 'Thu' },
    { x: 5, y: 2350, label: 'Fri' },
    { x: 6, y: 2420, label: 'Sat' },
    { x: 7, y: 2390, label: 'Sun' },
  ];

  const shuffledMilk = [
    { x: 1, y: 2390, label: 'Sun' },
    { x: 2, y: 2180, label: 'Wed' },
    { x: 3, y: 2350, label: 'Fri' },
    { x: 4, y: 2140, label: 'Mon' },
    { x: 5, y: 2300, label: 'Thu' },
    { x: 6, y: 2210, label: 'Tue' },
    { x: 7, y: 2420, label: 'Sat' },
  ];

  const currentPoints = isShuffled ? shuffledMilk : originalMilk;

  // 21-day timeline to demonstrate fixed window limitation
  const extendedHistory = [
    { day: -14, intake: 2900, note: 'Diwali Festival Peak (3 Weeks Ago)' },
    { day: -13, intake: 2850, note: '' },
    { day: -12, intake: 2700, note: '' },
    { day: -11, intake: 2500, note: '' },
    { day: -10, intake: 2300, note: '' },
    { day: -9, intake: 2200, note: '' },
    { day: -8, intake: 2180, note: '' },
    { day: -7, intake: 2140, note: 'Window Start' },
    { day: -6, intake: 2210, note: '' },
    { day: -5, intake: 2180, note: '' },
    { day: -4, intake: 2300, note: '' },
    { day: -3, intake: 2350, note: '' },
    { day: -2, intake: 2420, note: '' },
    { day: -1, intake: 2390, note: 'Yesterday' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Architectural Limit · 20 min Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          4. When Order Matters: The Sequence Problem
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Why standard feedforward neural networks fail when temporal order and long-term memory are introduced.
        </p>

        <InstructorNote
          timing="20 minutes total (13:20 - 13:40)"
          aloudQuestion="If I shuffle the words in an email, or shuffle the chronological events leading up to a database crash, does the meaning stay the same? So why does our neural network produce the exact same prediction?"
          expectedWrongAnswers={[
            "Thinking that feedforward networks preserve order implicitly. Make them click the shuffle button to see that the network's matrix multiplication treats input index 1 through 7 as unordered parallel slots."
          ]}
          instructorTip="This page is specifically designed to leave an open pedagogical hunger for Day 2 (Recurrent Neural Networks, LSTMs, and Transformers)."
        />
      </div>

      {/* Interactive Paradox 1: Shuffling Inputs */}
      <section className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
              Paradox 1 · Permutation Invariance
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-0.5">
              The Feedforward Neural Network Has No Chronology
            </h2>
          </div>

          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className="button-primary text-xs flex items-center gap-2"
          >
            <RotateCcw size={14} className={isShuffled ? 'rotate-180 transition-transform' : ''} />
            <span>{isShuffled ? 'Reset to Chronological Order' : 'Shuffle Input Days (Randomize Order)'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Chart Display */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <Chart
              points={currentPoints}
              lines={[
                {
                  points: currentPoints.map((p) => ({ x: p.x, y: p.y })),
                  color: isShuffled ? '#f43f5e' : '#38bdf8',
                  strokeWidth: 2.5,
                  strokeDasharray: isShuffled ? '3 3' : undefined,
                  label: isShuffled ? 'Scrambled Sequence' : 'True Chronological Trend',
                },
              ]}
              xMin={0}
              xMax={8}
              yMin={1900}
              yMax={2600}
              xLabel="Input Vector Position (Slot 1 to 7)"
              yLabel="Milk Volume (Litres)"
              height={260}
            />
          </div>

          {/* Comparison Cards */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400 uppercase font-bold block mb-1">Human Perception:</span>
              <p className={isShuffled ? 'text-rose-300 font-bold' : 'text-slate-200'}>
                {isShuffled
                  ? '❌ "This looks like wild, noisy static! The upward trend is completely destroyed."'
                  : '✓ "Clear upward momentum (+42 L/day). I expect tomorrow to rise."'
                }
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs font-mono">
              <span className="text-purple-300 uppercase font-bold block mb-1">Feedforward Network Prediction:</span>
              <div className="text-lg font-bold text-emerald-400">
                2,442 Litres ({isShuffled ? 'Completely Unchanged!' : 'Standard Model Output'})
              </div>
              <p className="text-slate-400 mt-1 text-[11px]">
                Because each slot connects to a fixed weight matrix $W$, shuffling inputs changes which slot gets multiplied, but the network as a whole has no concept that Slot 1 came <em>before</em> Slot 2 in time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paradox 2: The Fixed Context Window Blind Spot */}
      <section className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-6">
        <div>
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            Paradox 2 · Memory Horizon
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-0.5">
            The Fixed 7-Day Window Blind Spot
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Suppose a massive festival occurred 14 days ago, lifting baseline milk collection across the whole state:
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="relative pt-6 pb-2">
            {/* 14-day timeline blocks */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto text-[11px] font-mono">
              {extendedHistory.map((item, idx) => {
                const inWindow = idx >= 7;
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg text-center min-w-[70px] border transition-all ${
                      inWindow
                        ? 'bg-blue-950/60 border-blue-400 text-blue-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-600'
                    }`}
                  >
                    <span className="block font-bold">{item.intake} L</span>
                    <span className="text-[9px] block text-slate-400">Day {item.day}</span>
                  </div>
                );
              })}
            </div>

            {/* Window Indicator */}
            <div className="mt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">← Past (Ignored by Fixed Model)</span>
              <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-400/40 font-bold">
                Active 7-Day Context Window (Visible)
              </span>
              <span className="text-slate-500">Today →</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs md:text-sm text-amber-200 leading-relaxed">
            <strong>The Blind Spot: </strong>
            If information happened at Day -14, a 7-day model literally cannot perceive it. The memory horizon is hard-capped by the input vector length.
          </div>
        </div>
      </section>

      {/* The Big Open Question (Large Type Hook for Day 2) */}
      <section className="p-10 rounded-3xl border border-purple-500/50 bg-gradient-to-br from-purple-950/50 via-slate-950 to-blue-950/40 text-center space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
          The Question That Opens Weekend 1 · Day 2
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          "How Do You Give a Model a Memory?"
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          How do we build an AI architecture where past outputs loop back into future states, enabling language comprehension, time-series forecasting, and conversational memory?
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/day1/lab" className="button-primary">
            Next: Try It Yourself in the Lab (15m) <ArrowRight size={16} />
          </Link>
          <Link href="/day1/poc-vs-production" className="button-secondary">
            View POC vs Production Note #1
          </Link>
        </div>
      </section>

    </div>
  );
}
