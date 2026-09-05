'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface CandidateToken {
  token: string;
  logit: number;
  meaning: string;
}

export default function TemperatureSamplingViz() {
  const [temperature, setTemperature] = useState<number>(0.7);
  const prompt = "To date, the cleverest thinker of all time was";

  const candidates: CandidateToken[] = [
    { token: "Aristotle", logit: 3.2, meaning: "Historical philosopher (Top pick)" },
    { token: "Plato", logit: 2.8, meaning: "Classic alternative" },
    { token: "probably", logit: 2.1, meaning: "Nuanced hedged continuation" },
    { token: "Leonardo", logit: 1.6, meaning: "Renaissance polymath" },
    { token: "Newton", logit: 1.2, meaning: "Scientific revolutionary" },
    { token: "banana", logit: -1.5, meaning: "Nonsense hallucination" },
  ];

  // Softmax with temperature: P(i) = exp(z_i / T) / sum(exp(z_j / T))
  const calculateProbabilities = () => {
    if (temperature <= 0.05) {
      // Deterministic / greedy argmax (T = 0)
      let maxIdx = 0;
      let maxLogit = candidates[0].logit;
      candidates.forEach((c, idx) => {
        if (c.logit > maxLogit) {
          maxLogit = c.logit;
          maxIdx = idx;
        }
      });
      return candidates.map((c, idx) => (idx === maxIdx ? 100 : 0));
    }

    const scaledLogits = candidates.map((c) => Math.exp(c.logit / temperature));
    const sum = scaledLogits.reduce((acc, val) => acc + val, 0);
    return scaledLogits.map((val) => Number(((val / sum) * 100).toFixed(1)));
  };

  const probabilities = calculateProbabilities();

  const getTemperatureDescription = () => {
    if (temperature === 0) {
      return {
        label: "T = 0.0 (Deterministic / Greedy)",
        desc: "Always selects the exact highest-scoring token ('Aristotle'). Completely predictable, robotic, and repetitive if run multiple times.",
        color: "text-sky-400 border-sky-500/40 bg-sky-950/30",
      };
    } else if (temperature < 0.9) {
      return {
        label: `T = ${temperature.toFixed(1)} (Creative & Coherent - Recommended)`,
        desc: "Natural human-like variation. High probability tokens are favored, but occasional alternatives are sampled to make text flow naturally.",
        color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30",
      };
    } else {
      return {
        label: `T = ${temperature.toFixed(1)} (High Entropy / Chaos)`,
        desc: "Probabilities flatten out. Rare and nonsensical tokens ('banana') now have real odds. Creative, but quickly degenerates into incoherence.",
        color: "text-amber-400 border-amber-500/40 bg-amber-950/30",
      };
    }
  };

  const currentDesc = getTemperatureDescription();

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-500 via-purple-500 to-amber-500" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <Thermometer size={14} />
            <span>3B1B Act 1 · Next-Token Probability Distribution</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Demystifying the Chatbot: The Temperature Slider
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            An LLM doesn't "think" in whole essays; it predicts probabilities for the single next token, then samples from that distribution.
          </p>
        </div>

        {/* Preset quick buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTemperature(0)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
              temperature === 0 ? 'bg-sky-600 text-white border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            T = 0 (Greedy)
          </button>
          <button
            onClick={() => setTemperature(0.7)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
              temperature === 0.7 ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            T = 0.7 (Default)
          </button>
          <button
            onClick={() => setTemperature(1.8)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
              temperature === 1.8 ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            T = 1.8 (Chaotic)
          </button>
        </div>
      </div>

      {/* Live Prompt Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Input Prompt Context:</span>
        <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <span>&ldquo;{prompt}&rdquo;</span>
          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 text-xs animate-pulse">
            [Next Token ?]
          </span>
        </div>
      </div>

      {/* Temperature Slider Controls */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Thermometer size={16} className={temperature > 1 ? 'text-amber-400' : 'text-sky-400'} />
            <span>Temperature (Randomness Control):</span>
          </label>
          <span className="text-base font-black text-white font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-700">
            {temperature.toFixed(2)}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="2.0"
          step="0.05"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />

        {/* Dynamic Mode Explainer */}
        <div className={`p-3 rounded-xl border ${currentDesc.color} transition-all`}>
          <div className="font-bold text-xs">{currentDesc.label}</div>
          <div className="text-xs font-sans text-slate-300 mt-0.5">{currentDesc.desc}</div>
        </div>
      </div>

      {/* Probability Bar Chart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Candidate Next Tokens in Vocabulary</span>
          <span>Sampling Probability (Softmax)</span>
        </div>

        <div className="space-y-2.5">
          {candidates.map((c, idx) => {
            const prob = probabilities[idx];
            const isWinner = prob > 50;

            return (
              <div
                key={c.token}
                className={`p-3 rounded-xl border transition-all ${
                  isWinner
                    ? 'bg-slate-900/90 border-sky-500/50 shadow-md shadow-sky-500/10'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm font-mono">&ldquo;{c.token}&rdquo;</span>
                    <span className="text-[11px] font-sans text-slate-400">({c.meaning})</span>
                  </div>
                  <span className={`font-mono text-xs font-bold ${prob > 20 ? 'text-sky-300' : 'text-slate-400'}`}>
                    {prob.toFixed(1)}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <motion.div
                    className={`h-full rounded-full ${
                      prob > 50
                        ? 'bg-sky-500'
                        : prob > 20
                        ? 'bg-emerald-500'
                        : prob > 5
                        ? 'bg-purple-500'
                        : 'bg-slate-700'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${prob}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-world anchor note */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-sans text-slate-400 leading-relaxed">
        <strong className="text-white font-mono block mb-1">The 3Blue1Brown Takeaway:</strong>
        When ChatGPT generates an answer, it runs this exact prediction forward pass 200 to 500 times—sampling one token, appending it to the input, and repeating. Modern chatbots are not sentient essay writers; they are ultra-fast next-token predictors repeating a cycle of matrix multiplications at GPU speeds.
      </div>
    </div>
  );
}
