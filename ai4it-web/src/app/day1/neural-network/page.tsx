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
  Calendar,
  ChevronRight,
  TrendingUp,
  Cpu,
  ShieldAlert
} from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import GuessPrompt from '@/components/GuessPrompt';
import InstructorNote from '@/components/InstructorNote';
import Formula from '@/components/Formula';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';
import NeuralNetworkDemo from './NeuralNetworkDemo';
import NeuronFormulaExtender from '@/components/NeuronFormulaExtender';
import NeuronArithmeticPlayer from '@/components/NeuronArithmeticPlayer';
import MultiNeuronBendsViz from '@/components/MultiNeuronBendsViz';
import SymmetryBreakViz from '@/components/SymmetryBreakViz';
import LinearLayerMatrixViz from '@/components/LinearLayerMatrixViz';
import BackpropMatrixFlowViz from '@/components/BackpropMatrixFlowViz';

export default function NeuralNetworkPage() {
  const [reluInput, setReluInput] = useState<number>(0);
  const [shuffled, setShuffled] = useState<boolean>(false);

  // 7-day milk data from Linear Regression 3B.7
  const multiFactorData = [
    { day: 'Mon (1)', temp: 32, festival: 0, actual: 2140, linear1D: 2140.7, linear2D: 2138.4, neuralFit: 2142 },
    { day: 'Tue (2)', temp: 34, festival: 0, actual: 2210, linear1D: 2188.6, linear2D: 2191.2, neuralFit: 2208 },
    { day: 'Wed (3)', temp: 38, festival: 0, actual: 2180, linear1D: 2236.4, linear2D: 2244.1, neuralFit: 2185 },
    { day: 'Thu (4)', temp: 35, festival: 0, actual: 2300, linear1D: 2284.3, linear2D: 2296.9, neuralFit: 2298 },
    { day: 'Fri (5)', temp: 33, festival: 0, actual: 2350, linear1D: 2332.1, linear2D: 2349.7, neuralFit: 2351 },
    { day: 'Sat (6)', temp: 31, festival: 1, actual: 2850, linear1D: 2502.9, linear2D: 2524.1, neuralFit: 2848 }, // Saturday Spike!
    { day: 'Sun (7)', temp: 30, festival: 0, actual: 2390, linear1D: 2427.9, linear2D: 2455.3, neuralFit: 2392 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 1 Core Topic · ~131 Min Teaching Budget (Act Two of the Same Story)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          2. Neural Networks: Act Two of the Same Story
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How the exact same downhill calculus from Linear Regression — with one bend bolted on and stacked in parallel — bends around real-world complexity that straight lines could never touch.
        </p>

        <InstructorNote
          timing="~131 minutes total (14 Sections) — Section 3B runs ~65 min; treat this as direct continuity from Linear Regression"
          aloudQuestion="Remember where Linear Regression left us? We added ambient temperature, but our 2-feature linear model still missed Saturday by 326 Litres. Why couldn't a straight line fix that?"
          expectedWrongAnswers={[
            "Thinking that adding more data or more linear features solves non-linear spikes. Prove that no matter how many features you give a straight line, it cannot bend."
          ]}
          instructorTip="Emphasize that a neuron is literally y = mx + c with ReLU() wrapped around it. Walk through the hand arithmetic in 3B.2/3B.4 before opening the Decision Boundary playground in Section C."
        />
      </div>

      {/* BEAT 1: Reopening the Cliffhanger — Saturday, Again (8 min) */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="Reopening the Cliffhanger: Saturday, Again"
        subtitle="We left this unresolved in Linear Regression on purpose. Let's finish it."
        time="8 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">
              The Unresolved Miss from Linear Regression 3B.7
            </span>
            <span className="text-xs font-mono text-slate-400">Target Ground Truth: 2,850 Litres</span>
          </div>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            In Linear Regression's multi-feature section, we added ambient temperature as a second feature (w₁·x_day + w₂·x_temp + c). But when Saturday's festival spike hit (2,850L), the 2-feature linear model predicted 2,524.1L — <strong className="text-rose-400">still missing by 326 Litres!</strong>
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                  <th className="py-2 px-3">Model Attempt</th>
                  <th className="py-2 px-3">Inputs Used</th>
                  <th className="py-2 px-3">Saturday Prediction</th>
                  <th className="py-2 px-3">Actual Intake</th>
                  <th className="py-2 px-3 text-rose-400">Miss (Residual)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2 px-3 font-semibold text-white">1-Feature Linear (OLS)</td>
                  <td className="py-2 px-3">Day only ($x$)</td>
                  <td className="py-2 px-3">2,502.9 L</td>
                  <td className="py-2 px-3 font-bold text-white">2,850 L</td>
                  <td className="py-2 px-3 text-rose-400 font-bold">-347.1 L</td>
                </tr>
                <tr className="bg-rose-950/20">
                  <td className="py-2 px-3 font-semibold text-white">2-Feature Linear (LR 3B.7)</td>
                  <td className="py-2 px-3">Day ($x_1$) + Temp ($x_2$)</td>
                  <td className="py-2 px-3">2,524.1 L</td>
                  <td className="py-2 px-3 font-bold text-white">2,850 L</td>
                  <td className="py-2 px-3 text-rose-400 font-bold">-325.9 L (326L Miss!)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed font-mono">
            <strong className="text-white">The Engineering Diagnosis: </strong>
            Temperature barely helped because the real driver was a sudden categorical festival, and no matter how many weights you give a straight line, <em>it is still just a flat line</em>. It cannot bend.
          </div>
        </div>

        <DairyAngle title="Why Saturday Matters at the Chilling Center">
          Missing Saturday by 326 Litres means 326 litres of milk sitting outside temperature control with no tanker available. A model that misses non-linear surges creates operational emergencies.
        </DairyAngle>
      </ConceptBeat>

      {/* BEAT 2: Let Them Guess: What's Actually Missing? (8 min) */}
      <ConceptBeat
        kind="guess"
        number="2"
        title="Let Them Guess: What's Actually Missing?"
        subtitle="Before introducing neurons, what does the mathematical architecture need?"
        time="8 min"
        phase="predict"
      >
        <GuessPrompt
          question="A straight line cannot bend around Saturday. What would it take to let a model notice something is different that day, without hand-coding every festival in advance?"
          promptGuidance="Instructors: Stop here! Ask the room why more continuous data alone cannot fix a straight line."
          options={[
            {
              id: 'more-data',
              label: '1. Collect 100 days of data',
              explanation: "More data just fits the straight line tighter — it still forces a flat slope across the whole month.",
            },
            {
              id: 'more-features',
              label: '2. Add 10 more linear features (humidity, truck count, etc.)',
              explanation: "A linear model with 10 features is still a flat hyper-plane. It can tilt in 10 dimensions, but it cannot bend.",
            },
            {
              id: 'bend',
              label: '3. Change the model\'s shape: give it the ability to BEND',
              explanation: 'Exactly right! What is missing is non-linearity. The model needs a mathematical "kink" so it can stay flat on weekdays and ramp up on festivals.',
            },
          ]}
        />
      </ConceptBeat>

      {/* BEAT 3A: The Reveal: One Bend Changes Everything (10 min) */}
      <ConceptBeat
        kind="reveal"
        number="3A"
        title="The Reveal: One Bend Changes Everything"
        subtitle="A neural network is simply stacked bent trendlines."
        time="10 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-purple-200 text-xs md:text-sm leading-relaxed">
            <strong className="text-purple-300 font-bold block mb-1">Closing the Loop from Beat 1:</strong>
            "This is the bend that a 2-feature linear model could never have, no matter how many features you gave it. Not a new kind of math — the exact same y = mx + c you hand-computed an hour ago, with exactly one new operation bolted on."
          </div>

          <Formula
            latex="\text{ReLU}(z) = \max(0, z) = \max(0, w_1 x_1 + w_2 x_2 + b)"
            plainSummary="Rectified Linear Unit: Pass positive numbers through unchanged; clamp negative numbers to zero."
            gloss={[
              { symbol: 'z', meaning: 'Linear pre-activation (w1·x1 + w2·x2 + b)', aiName: 'Pre-Activation' },
              { symbol: 'max(0, z)', meaning: 'The kink: zeroes out negatives, linear for positives', aiName: 'ReLU Activation' },
            ]}
          />

          {/* Interactive Kink Slider */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white font-bold">Interactive ReLU Kink Explorer:</span>
              <span className="text-purple-300">
                Input z: {reluInput.toFixed(1)} &rarr; Output ReLU(z): <strong className="text-emerald-400">{Math.max(0, reluInput).toFixed(1)}</strong>
              </span>
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

          {/* The Mathematical Proof of Linear Collapse */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs md:text-sm text-rose-200 leading-relaxed font-mono">
            <strong className="text-rose-300 block mb-1">The Mathematical Proof (Why Stacking Linear Layers Fails):</strong>
            {"Suppose Layer 1 is y₁ = W₁x + b₁ and Layer 2 is y₂ = W₂y₁ + b₂. Stacking them gives: y₂ = W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂) = W_new·x + b_new."}
            <br />
            <em className="text-slate-300 block mt-1">
              One hundred linear layers stacked without an activation function collapses algebraically into exactly ONE single straight line. Depth without non-linearity is a mathematical illusion.
            </em>
          </div>
        </div>
      </ConceptBeat>

      {/* BEAT 3B: What a Neuron Actually Does (~65 min) */}
      <ConceptBeat
        kind="reveal"
        number="3B"
        title="What a Neuron Actually Does — The Deep Dive"
        subtitle="From formula evolution and hand-worked chain rule to parallel kinks and symmetry breaking."
        time="~65 min"
        phase="predict"
      >
        {/* 3B.1: What a Neuron Actually Is (8 min) */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>3B.1 - What a Neuron Actually Is</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">8 min</span>
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Click through the stages below to watch the formula evolve from Linear Regression directly into an artificial neuron:
          </p>
          <NeuronFormulaExtender />
        </div>

        {/* 3B.2 & 3B.4: Forward Pass & Chain Rule Hand Walkthrough (22 min) */}
        <div className="mt-12 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu size={18} className="text-amber-400" />
            <span>3B.2 &amp; 3B.4 - Forward Pass, Chain Rule &amp; The Gradient Step</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">22 min</span>
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Let's hand-compute Saturday's data (Day 6, Temp 31°C, Actual 2,850L) through an untrained neuron, trace the 3-link chain rule, and watch the error drop:
          </p>
          <NeuronArithmeticPlayer />
        </div>

        {/* 3B.3: Measuring Correctness (Again) (5 min) */}
        <div className="mt-12 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity size={18} className="text-sky-400" />
            <span>3B.3 - Measuring Correctness (Again)</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">5 min</span>
          </h3>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed font-mono">
            <strong className="text-white">Same Loss Function as Linear Regression: </strong>
            We are not learning a new way to measure wrongness; a neural network is wrong in the exact same units:
          </div>
          <Formula
            latex="L = \frac{1}{n} \sum_{i=1}^n (\hat{y}_i - y_i)^2"
            plainSummary="Loss = Mean Squared Error, identical to Linear Regression"
            gloss={[
              { symbol: 'L', meaning: 'Single scalar number: how wrong the entire network is', aiName: 'MSE Loss' },
              { symbol: 'y-hat i', meaning: 'Neural network prediction for row i', aiName: 'Prediction' },
              { symbol: 'y i', meaning: 'Real ground truth for row i', aiName: 'Label' },
            ]}
          />
        </div>

        {/* 3B.5: From One Neuron to a Layer: Where "Linear Layer" Comes From (14 min) */}
        <div className="mt-12 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-400" />
            <span>3B.5 - From One Neuron to a Layer: Where "Linear Layer" Comes From</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">14 min</span>
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Stacking multiple neurons simply means creating a matrix $W$. Each neuron is one row of the matrix:
          </p>
          <LinearLayerMatrixViz />
          <MultiNeuronBendsViz />
        </div>

        {/* 3B.6: Backprop Through Layers — The Same Matrix, Read Backward (18 min) */}
        <div className="mt-12 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers size={18} className="text-emerald-400" />
            <span>3B.6 - Backprop Through Layers: The Same Matrix, Read Backward</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">18 min</span>
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Watch how error travels backward across the output layer, reusing the forward connection strengths (0.7 / 0.3) in reverse:
          </p>
          <BackpropMatrixFlowViz />
        </div>

        {/* 3B.7: Initialization Actually Matters Now (8 min) */}
        <div className="mt-12 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap size={18} className="text-amber-400" />
            <span>3B.7 - Initialization Actually Matters Now</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">8 min</span>
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            In Linear Regression, starting at $m=0, c=2000$ was fine because the bowl had only one bottom. But in neural networks, starting at zero causes the <strong>Symmetry Problem</strong>:
          </p>
          <SymmetryBreakViz />
        </div>

        {/* 3B.8: Recap: The Expanded Pipeline (5 min) */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wide">
                3B.8 · The Expanded Pipeline in One Glance
              </span>
              <h4 className="text-lg font-bold text-white">7 Concepts Built Together</h4>
            </div>
            <span className="text-xs font-mono text-slate-500">5 min Consolidation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-sky-400 block font-bold">1. Neuron</span>
              <span className="text-[10px] text-slate-400">z = w·x + b</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-purple-400 block font-bold">2. Activation</span>
              <span className="text-[10px] text-slate-400">a = ReLU(z)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 block font-bold">3. Loss</span>
              <span className="text-[10px] text-slate-400">MSE (Same)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 block font-bold">4. Chain Rule</span>
              <span className="text-[10px] text-slate-400">∂L/∂w Links</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-amber-400 block font-bold">5. Parallel Kinks</span>
              <span className="text-[10px] text-slate-400">More Neurons</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-blue-400 block font-bold">6. Backprop</span>
              <span className="text-[10px] text-slate-400">Downhill Steps</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-indigo-400 block font-bold">7. Random Init</span>
              <span className="text-[10px] text-slate-400">Break Symmetry</span>
            </div>
          </div>
        </div>

      </ConceptBeat>

      {/* SECTION C: Decision Boundary Playground, Now Earned (15 min) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Section C · Hands-On</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Decision Boundary Playground</h2>
          <p className="text-sm text-slate-400 mt-1">
            Now that you have hand-computed what a neuron computes, watch how adding neurons and choosing non-linear activations bends boundaries around complex datasets:
          </p>
        </div>

        <NeuralNetworkDemo />
      </section>

      {/* SECTION D: Closing the Cliffhanger — The Numbers, Reconciled (10 min) */}
      <ConceptBeat
        kind="apply"
        number="4"
        title="Closing the Cliffhanger: The Numbers Reconciled"
        subtitle="Same Saturday. Same 2,850 litres. Three attempts."
        time="10 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3">Day</th>
                  <th className="py-2 px-3">Temp</th>
                  <th className="py-2 px-3">Festival</th>
                  <th className="py-2 px-3">Actual Intake</th>
                  <th className="py-2 px-3 text-slate-400">1-Feature Linear (3B.1)</th>
                  <th className="py-2 px-3 text-rose-300">2-Feature Linear (3B.7)</th>
                  <th className="py-2 px-3 text-emerald-400 font-bold">Multi-Factor Neural Fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {multiFactorData.map((row) => (
                  <tr key={row.day} className={row.festival ? 'bg-purple-950/20' : ''}>
                    <td className="py-2 px-3 font-bold text-white">{row.day}</td>
                    <td className="py-2 px-3">{row.temp} °C</td>
                    <td className="py-2 px-3">
                      {row.festival ? (
                        <span className="text-purple-300 font-bold px-1.5 py-0.5 rounded bg-purple-900">
                          Festival (1)
                        </span>
                      ) : (
                        'Regular (0)'
                      )}
                    </td>
                    <td className="py-2 px-3 font-bold">{row.actual.toLocaleString()} L</td>
                    <td className="py-2 px-3 text-slate-400">{row.linear1D.toFixed(1)} L</td>
                    <td className="py-2 px-3 text-rose-400 font-semibold">
                      {row.linear2D.toFixed(1)} L {row.festival ? '(Miss: 326L)' : ''}
                    </td>
                    <td className="py-2 px-3 text-emerald-300 font-bold">
                      {row.neuralFit.toLocaleString()} L {row.festival ? '(Resolved!)' : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sysadmin Overfitting Cliffhanger */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs md:text-sm text-amber-200 leading-relaxed font-mono">
            <strong className="text-amber-300 block mb-1">
              <ShieldAlert size={15} className="inline mr-1 text-amber-400" />
              The Critical Overfitting Caveat &amp; Day 6 Cliffhanger:
            </strong>
            "With only 7 data points, a network this flexible can fit almost perfectly &mdash; that's not yet proof it understands festivals in general, just that it has room to memorize what it has seen. Hold that thought; it comes back on Day 6."
          </div>
        </div>
      </ConceptBeat>

      {/* SECTION E: Break It: No Concept of Time (10 min) */}
      <ConceptBeat
        kind="break"
        number="5"
        title="Break It: The Neural Network Has No Memory of Time"
        subtitle="The fatal limitation of feedforward networks that sets up Day 2."
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
                {shuffled
                  ? '[Sun 2390, Wed 2180, Fri 2350, Mon 2140, Thu 2300, Tue 2210, Sat 2850]'
                  : '[Mon 2140, Tue 2210, Wed 2180, Thu 2300, Fri 2350, Sat 2850, Sun 2390]'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Neural Network Output:</span>
              <span className="text-emerald-400 font-bold text-sm">2,442 Litres (Unchanged!)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 text-xs text-rose-200 leading-relaxed font-mono">
            <strong>Why This is Broken: </strong>
            To a human, randomizing the sequence destroys the calendar trend completely. But to a feedforward neural network, the 7 days are just 7 independent slot numbers. <strong>It has zero concept of time, sequence, or continuity.</strong>
          </div>
        </div>

        {/* Bridge to Day 2 */}
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
