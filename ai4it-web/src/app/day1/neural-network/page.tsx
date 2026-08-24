'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Sliders,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import GuessPrompt from '@/components/GuessPrompt';
import InstructorNote from '@/components/InstructorNote';
import Formula from '@/components/Formula';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';
import NeuralNetworkDemo from './NeuralNetworkDemo';

export default function NeuralNetworkPage() {
  const [reluInput, setReluInput] = useState<number>(0);
  const [shuffled, setShuffled] = useState<boolean>(false);

  // Multi-factor simulation data
  const multiFactorData = [
    { day: 'Mon', temp: 32, festival: 0, intake: 2140 },
    { day: 'Tue', temp: 34, festival: 0, intake: 2210 },
    { day: 'Wed', temp: 38, festival: 0, intake: 2180 },
    { day: 'Thu', temp: 35, festival: 0, intake: 2300 },
    { day: 'Fri', temp: 33, festival: 0, intake: 2350 },
    { day: 'Sat', temp: 31, festival: 1, intake: 2850 }, // Festival surge!
    { day: 'Sun', temp: 30, festival: 0, intake: 2390 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 1 Core Topic · 75 min Teaching Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          2. Neural Networks: Stacking Bent Lines
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Why a single straight line fails on real-world complexity, how activation functions introduce non-linear bends, and how backpropagation tunes thousands of weights.
        </p>

        <InstructorNote
          timing="75 minutes total (11:35 - 12:50)"
          aloudQuestion="If we stack two linear equations together: y = 2(3x + 4) + 5 = 6x + 13. Is the result anything more than a single straight line?"
          expectedWrongAnswers={[
            "Belief that adding more layers automatically makes a network smart. Prove on the board that without non-linear activation (ReLU), 100 deep layers collapse into 1 single straight line."
          ]}
          instructorTip="Demonstrate the non-linear collapse in Section B, let them play with decision boundaries in Section C, and finish with the input shuffle in Section F."
        />
      </div>

      {/* Section A: Reframing Neural Networks */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="Reframing the Neuron: Stacked Bent Trendlines"
        subtitle="Not a magic biological brain — an interconnected mesh of slope-intercept equations with non-linear kinks."
        time="10 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="text-sm text-slate-200 leading-relaxed space-y-3">
            <p>
              Popular media often describes neural networks as "mimicking human brain neurons." For an IT and software engineer, that analogy obscures the engineering truth.
            </p>
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-purple-200 font-semibold">
              "A neural network is simply a mathematical pipeline that stacks several bent trendlines together. Each hidden neuron specializes in fitting a piece of the curve, and the output layer combines them into an intricate decision surface."
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* Section B: The Activation Function (§6-B) */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="The Activation Function: Why Non-Linearity is Everything"
        subtitle="Without the bend, depth buys you nothing."
        time="15 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <Formula
            latex="\text{ReLU}(z) = \max(0, z) = \max(0, w \cdot x + b)"
            plainSummary="Rectified Linear Unit: Pass positive values through unchanged; clamp negative values to zero."
            gloss={[
              { symbol: 'z', meaning: 'Weighted linear sum (w·x + b)', aiName: 'Pre-Activation' },
              { symbol: 'max(0, z)', meaning: 'Kink that zeroes out negatives', aiName: 'Activation' },
              { symbol: 'ReLU', meaning: 'The default activation of modern AI', aiName: 'Non-Linearity' },
            ]}
          />

          {/* Interactive Kink Slider */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white font-bold">Interactive ReLU Kink Explorer:</span>
              <span className="text-purple-300">Input z: {reluInput.toFixed(1)} $\to$ Output ReLU(z): <strong className="text-emerald-400">{Math.max(0, reluInput).toFixed(1)}</strong></span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.5"
              value={reluInput}
              onChange={(e) => setReluInput(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>-10.0 (Clamped to 0)</span>
              <span>0.0 (The Critical Kink Point)</span>
              <span>+10.0 (Linear Pass-Through)</span>
            </div>
          </div>

          {/* 3 Activation Functions Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">1. ReLU (Winner in LLMs)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Super cheap to compute (just a comparison with 0), doesn't saturate on large positive values, and avoids vanishing gradients during deep backprop.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-sky-400 block mb-1">2. Sigmoid (Logistic)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>σ(z) = 1 / (1 + e^-z)</code>. Squeezes everything into [0, 1] probabilities. Classic, but saturates (flattens) at extremes, slowing learning.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-purple-400 block mb-1">3. Tanh (Hyperbolic)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Squeezes outputs into [-1, 1]. Zero-centered, which aids optimization in RNNs and early hidden layers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs md:text-sm text-rose-200">
            <strong>The Mathematical Proof: </strong>
            {"Suppose Layer 1 is y₁ = W₁x + b₁ and Layer 2 is y₂ = W₂y₁ + b₂. Then y₂ = W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂) = W_new·x + b_new."}{' '}
            <em>Ten linear layers stacked = exactly one linear layer. Depth without non-linearity is a mathematical illusion.</em>
          </div>
        </div>
      </ConceptBeat>

      {/* Section C: Decision Boundary Playground */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Section C · Playground</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Decision Boundary Playground</h2>
          <p className="text-sm text-slate-400 mt-1">
            Watch how adding neurons and choosing non-linear activations bends boundaries around complex non-linear datasets:
          </p>
        </div>

        <NeuralNetworkDemo />
      </section>

      {/* Section D: Backpropagation Honestly */}
      <ConceptBeat
        kind="reveal"
        number="3"
        title="Backpropagation: The Chain Rule on High-Dimensional Surfaces"
        subtitle="How the network adjusts thousands of weights simultaneously."
        time="15 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <p className="text-sm text-slate-200 leading-relaxed">
            In our 1-variable linear regression, we computed partial derivatives <code>∂Loss/∂m</code> and <code>∂Loss/∂c</code> to nudge the parameter marker downhill.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-slate-300 font-mono leading-relaxed">
            "Backpropagation is literally that exact same downhill roll on a loss surface — just calculated across thousands (or billions) of parameter axes simultaneously using the calculus Chain Rule."
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-blue-400 block mb-1">1. Forward Pass</strong>
              <span>Inputs flow through weights &amp; activations → output prediction ŷ is generated.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-purple-400 block mb-1">2. Loss Calculation</strong>
              <span>Prediction is compared to real ground truth → loss error is computed (ŷ - y)².</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-emerald-400 block mb-1">3. Backward Flow (Grad)</strong>
              <span>Error gradients flow backward through every layer → weights are updated downhill.</span>
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* Section E: Multi-Factor Forecast (Dairy Context) */}
      <ConceptBeat
        kind="apply"
        number="4"
        title="Multi-Factor Prediction: Day + Temperature + Festival"
        subtitle="Why real-world systems require multi-dimensional input vectors."
        time="10 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            A single day-number cannot explain why Saturday's milk collection jumped by 500 Litres. But when we pass a 3-dimensional feature vector <code>[x_day, x_temp, x_festival]</code>, the neural network weights capture the seasonal festival demand:
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3">Day</th>
                  <th className="py-2 px-3">Ambient Temp</th>
                  <th className="py-2 px-3">Festival Flag</th>
                  <th className="py-2 px-3">Actual Intake</th>
                  <th className="py-2 px-3 text-sky-400">Linear 1D Fit</th>
                  <th className="py-2 px-3 text-emerald-400">Multi-Factor Neural Fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {multiFactorData.map((row) => (
                  <tr key={row.day} className={row.festival ? 'bg-purple-950/20' : ''}>
                    <td className="py-2 px-3 font-bold text-white">{row.day}</td>
                    <td className="py-2 px-3">{row.temp} °C</td>
                    <td className="py-2 px-3">
                      {row.festival ? <span className="text-purple-300 font-bold px-1.5 py-0.5 rounded bg-purple-900">Festival (1)</span> : 'Regular (0)'}
                    </td>
                    <td className="py-2 px-3 font-bold">{row.intake} L</td>
                    <td className="py-2 px-3 text-rose-300">~2,400 L (Missed by 450L!)</td>
                    <td className="py-2 px-3 text-emerald-300 font-bold">2,835 L (Accurate!)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ConceptBeat>

      {/* Section F: Break It (Permutation Invariance Hook) */}
      <ConceptBeat
        kind="break"
        number="5"
        title="Break It: The Neural Network Has No Memory of Time"
        subtitle="The fatal limitation that sets up Day 2's Sequential Deep Learning."
        time="10 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl border border-rose-500/40 bg-rose-950/15 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white">Input Order Ignorance (Permutation Invariance)</h4>
            <button
              onClick={() => setShuffled(!shuffled)}
              className="button-secondary text-xs text-amber-300 flex items-center gap-1.5"
            >
              <RotateCcw size={13} /> {shuffled ? 'Reset to Monday-Sunday' : 'Shuffle Input Day Order'}
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Feed a standard feedforward neural network the 7 days of milk in reverse or random order:
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-slate-500 block">Input Vector:</span>
              <span className="text-white font-bold">
                {shuffled ? '[Sun 2390, Wed 2180, Fri 2350, Mon 2140, Thu 2300, Tue 2210, Sat 2420]' : '[Mon 2140, Tue 2210, Wed 2180, Thu 2300, Fri 2350, Sat 2420, Sun 2390]'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Neural Network Output:</span>
              <span className="text-emerald-400 font-bold text-sm">2,442 Litres (Unchanged!)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 text-xs text-rose-200 leading-relaxed">
            <strong>Why This is Broken: </strong>
            To a human, randomizing the sequence destroys the trend line completely. But to a feedforward neural network, the 7 days are just 7 independent slot numbers. <strong>It has zero concept of time, sequence, or continuity.</strong>
          </div>
        </div>

        {/* Bridge to Day 2 Sequence Hook */}
        <div className="mt-8 p-8 rounded-2xl border border-purple-500/30 bg-purple-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400 font-bold">Day 1 Closing Paradox</span>
            <h3 className="text-2xl font-bold text-white mt-1">How Do You Give a Model a Memory?</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              "Next in our curriculum: Case studies in IT, hands-on lab practice, and the sequence problem that opens Day 2 (RNNs, LSTMs, and Transformers)."
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/day1/case-study" className="button-primary">
              Next: Case Studies in IT (30m) <ArrowRight size={16} />
            </Link>
            <Link href="/day1/sequence-problem" className="button-secondary">
              When Order Matters
            </Link>
          </div>
        </div>
      </ConceptBeat>

    </div>
  );
}
