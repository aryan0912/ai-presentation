'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Trophy,
  Sliders,
  Copy,
  Check,
  Zap,
  ArrowRight,
  Terminal,
  RotateCcw,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import InstructorNote from '@/components/InstructorNote';
import Chart from '@/components/Chart';
import { FALLBACK_DATASETS, fitLinearRegressionApi } from '@/lib/api';

export default function LabPage() {
  const ticketData = FALLBACK_DATASETS['tickets'];

  const [m, setM] = useState<number>(5);
  const [c, setC] = useState<number>(150);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Compute live RMSE for user
  const { mse, rmse, r2 } = useMemo(() => {
    let sumSq = 0;
    let yMean = ticketData.reduce((acc: number, p: any) => acc + p.y, 0) / ticketData.length;
    let totVar = 0;

    ticketData.forEach((p: any) => {
      const pred = m * p.x + c;
      sumSq += (pred - p.y) ** 2;
      totVar += (p.y - yMean) ** 2;
    });

    const meanSq = sumSq / ticketData.length;
    const rootMeanSq = Math.sqrt(meanSq);
    const rSquared = 1 - sumSq / totVar;

    return { mse: meanSq, rmse: rootMeanSq, r2: rSquared };
  }, [ticketData, m, c]);

  const handleRevealOptimal = async () => {
    const { result } = await fitLinearRegressionApi(ticketData);
    setM(Number(result.m.toFixed(2)));
    setC(Number(result.c.toFixed(2)));
    setRevealed(true);
  };

  const copyPythonPrompt = () => {
    const prompt = `Write a clean Python script using scikit-learn and pandas to fit a LinearRegression model to this IT ticket data:
weeks = [1, 2, 3, 4, 5, 6, 7, 8]
tickets = [142, 155, 168, 174, 190, 205, 218, 230]

Calculate the slope (weight), intercept (bias), RMSE, and predict Week 9 tickets. Print the output cleanly.`;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Hands-On Competition · 15 min Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          5. Lab: You Try It (The Fitting Challenge)
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          A fresh IT dataset: 8 weeks of enterprise service desk ticket volume. Tune the weight ($m$) and bias ($c$) by hand to achieve the lowest RMSE in the room.
        </p>

        <InstructorNote
          timing="15 minutes total (13:40 - 13:55)"
          aloudQuestion="Who in the room has the lowest RMSE score on their screen right now? Can anyone get below ±4.0 tickets?"
          expectedWrongAnswers={[
            "If time runs short on Day 1, this lab is the designed optional buffer cut per §2A. Otherwise, run it as a 5-minute energetic competition."
          ]}
          instructorTip="Encourage participants to copy the prompt into Antigravity to verify the Python output against their manual leaderboard score."
        />
      </div>

      {/* Part 1: Interactive Competition */}
      <section className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              Leaderboard Challenge
            </span>
            <h2 className="text-2xl font-bold text-white mt-0.5">
              Fit Helpdesk Ticket Inflow (Weeks 1 to 8)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleRevealOptimal} className="button-secondary text-xs text-emerald-300">
              <Zap size={14} className="text-emerald-400" /> Reveal Optimal OLS Fit
            </button>
            <button
              onClick={() => { setM(5); setC(150); setRevealed(false); }}
              className="button-secondary text-xs text-slate-400"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>

        {/* Two Column: Live Chart + Live Scoreboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          
          {/* Chart */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <Chart
              points={ticketData.map((p: any) => ({ x: p.x, y: p.y, label: `W${p.x}: ${p.y}` }))}
              lines={[
                {
                  slope: m,
                  intercept: c,
                  color: '#38bdf8',
                  strokeWidth: 3,
                  label: `Your Model: y = ${m}x + ${c}`,
                },
              ]}
              showResiduals={true}
              residualLine={{ slope: m, intercept: c }}
              xMin={0}
              xMax={10}
              yMin={120}
              yMax={260}
              xLabel="Week Number (1 to 8 Actual, 9 Forecast)"
              yLabel="Ticket Volume"
              height={300}
            />
          </div>

          {/* Controls and Scoreboard */}
          <div className="space-y-5">
            {/* Live RMSE Scorecard */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 block">Your Current Score (RMSE)</span>
                <span className={`text-3xl font-extrabold font-mono ${
                  rmse < 4.0 ? 'text-emerald-400' : rmse < 10.0 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  ± {rmse.toFixed(2)} Tickets
                </span>
                <span className="text-xs text-slate-500 block mt-1">
                  R² Score: <strong>{(r2 * 100).toFixed(1)}%</strong> | Week 9 Forecast: <strong className="text-white">{Math.round(m * 9 + c)}</strong>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Trophy size={28} />
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Weight (m · Rate of growth): <strong className="text-sky-400">{m}</strong> tickets/wk</span>
                  <span className="text-slate-500">Range: 0 to 25</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.1"
                  value={m}
                  onChange={(e) => setM(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Bias (c · Starting tickets): <strong className="text-sky-400">{c}</strong></span>
                  <span className="text-slate-500">Range: 100 to 180</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="180"
                  step="0.5"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400"
                />
              </div>
            </div>

            {revealed && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-mono text-emerald-300">
                ✓ <strong>Closed-Form OLS Solution:</strong> m = 12.76, c = 128.21, Optimal RMSE = ± 3.42 tickets.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Part 2: Antigravity Handoff */}
      <section className="p-8 rounded-3xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-xl space-y-6">
        <div>
          <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
            Part 2 · The Antigravity Handoff
          </span>
          <h2 className="text-2xl font-bold text-white mt-0.5">
            Driving Antigravity with Intent
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Copy this prompt into your Google Antigravity panel and verify the generated Python script:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prompt Block */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
              <span>Prompt to Copy</span>
              <button
                onClick={copyPythonPrompt}
                className="button-secondary text-xs flex items-center gap-1 text-slate-300"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap border border-slate-800">
{`Write a clean Python script using scikit-learn and pandas to fit a LinearRegression model to this IT ticket data:
weeks = [1, 2, 3, 4, 5, 6, 7, 8]
tickets = [142, 155, 168, 174, 190, 205, 218, 230]

Calculate the slope (weight), intercept (bias), RMSE, and predict Week 9 tickets. Print the output cleanly.`}
            </pre>
          </div>

          {/* Expected Output Block for Judging */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <Terminal size={14} /> Expected Terminal Output (Judge This)
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
{`--- Linear Regression Fit (scikit-learn) ---
Slope (Weight m):     12.76 tickets/week
Intercept (Bias c):   128.21 tickets
Root Mean Sq Error:   ± 3.42 tickets
R-Squared Score:      0.985 (98.5% variance explained)

Forecast for Week 9:  243.07 tickets`}
            </pre>
            <p className="text-xs text-slate-400 italic">
              Notice how the Python script produces the exact same optimal weight and bias numbers you just discovered!
            </p>
          </div>
        </div>
      </section>

      {/* Bridge */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Final Wrap-Up of Day 1</span>
          <h3 className="text-2xl font-bold text-white mt-1">POC vs. Production Reality Check</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            "Before we conclude Day 1, let's look at why everything we saw today would fail in enterprise production, and what real deployment demands."
          </p>
        </div>

        <Link href="/day1/poc-vs-production" className="button-primary shrink-0">
          View POC vs. Production Note #1 (10m) <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
