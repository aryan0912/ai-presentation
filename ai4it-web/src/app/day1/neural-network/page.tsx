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
  ShieldAlert,
  GitPullRequest,
  Lightbulb
} from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import GuessPrompt from '@/components/GuessPrompt';
import InstructorNote from '@/components/InstructorNote';
import Formula from '@/components/Formula';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';
import NeuralNetworkDemo from './NeuralNetworkDemo';
import CompleteNeuralNetworkViz from '@/components/CompleteNeuralNetworkViz';

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
          <span>Day 1 Core Topic · ~131 Min Teaching Budget (Visual Intuition Arc)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          2. Neural Networks: Act Two of the Same Story
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How the exact same downhill calculus from Linear Regression — with activation dials, feature-detecting layers, and geometric hinges — bends around real-world spikes that straight lines could never touch.
        </p>

        <InstructorNote
          timing="~131 minutes total — Structured around 4 core visual anchors"
          aloudQuestion="Remember where Linear Regression left us? We added ambient temperature, but our 2-feature linear model still missed Saturday by 326 Litres. Why couldn't a straight line fix that?"
          expectedWrongAnswers={[
            "Thinking that adding more data or more linear features solves non-linear spikes. Prove that no matter how many features you give a straight line, it cannot bend."
          ]}
          instructorTip="Anchor each phase in visual intuition: 1) The Activation Dial (Knobs + Threshold), 2) The Diode/Hinge proof, 3) Feature Detectors (Weekend detector), and 4) Backprop Wish List!"
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
            In Linear Regression's multi-feature section, we added ambient temperature as a second feature ($w_1 \cdot x_{'{'}day{'}'} + w_2 \cdot x_{'{'}temp{'}'} + c$). But when Saturday's festival spike hit (2,850L), the 2-feature linear model predicted 2,524.1L — <strong className="text-rose-400">still missing by 326 Litres!</strong>
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

      {/* BEAT 3: Comprehensive Architecture & Component Breakdown (45 min) */}
      <ConceptBeat
        kind="reveal"
        number="3"
        title="Comprehensive Architecture & Component Breakdown"
        subtitle="Visualizing the complete picture, then dismantling it step-by-step."
        time="45 min"
        phase="predict"
      >
        <CompleteNeuralNetworkViz />
      </ConceptBeat>

      {/* SECTION C: Decision Boundary Playground, Now Earned (15 min) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Section C · Hands-On Playground</span>
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
            &ldquo;With only 7 data points, a network this flexible can fit almost perfectly &mdash; that's not yet proof it understands festivals in general, just that it has room to memorize what it has seen. Hold that thought; it comes back on Day 6.&rdquo;
          </div>
        </div>
      </ConceptBeat>

      {/* SECTION E: Break It: No Concept of Time (10 min) */}
      <ConceptBeat
        kind="break"
        number="5"
        title="Break It: The Neural Network Has No Memory of Time"
        subtitle="Shuffle the 7 days. The prediction is identical. Order is completely invisible."
        time="10 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 via-slate-900/80 to-slate-950/90 border border-rose-500/40 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">
              Permutation Invariance (Order Blindness)
            </span>
            <button
              onClick={() => setShuffled(!shuffled)}
              className="button-secondary text-xs font-mono"
            >
              {shuffled ? 'Reset Canonical Order (Mon-Sun)' : 'Shuffle Days Randomly'}
            </button>
          </div>

          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            Look at what happens if we shuffle the calendar sequence into random disorder:
          </p>

          <div className="flex flex-wrap gap-2">
            {(shuffled
              ? [multiFactorData[3], multiFactorData[6], multiFactorData[1], multiFactorData[5], multiFactorData[0], multiFactorData[4], multiFactorData[2]]
              : multiFactorData
            ).map((d) => (
              <div key={d.day} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs">
                <div className="text-sky-400 font-bold">{d.day}</div>
                <div className="text-slate-400 text-[10px]">{d.actual}L</div>
                <div className="text-emerald-400 font-bold mt-1">{d.neuralFit}L</div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-rose-300 font-mono leading-relaxed">
            <strong>The Closing Cliffhanger: </strong>
            The prediction for Saturday remains 2,848L regardless of whether it was preceded by Friday or Sunday! To a feedforward network, time does not exist. It cannot tell Monday from Sunday.
            <div className="mt-2 text-white font-sans">
              Tomorrow morning (Day 2), we give the network a memory by looping hidden states through time: <strong>Recurrent Neural Networks (RNNs) and LSTMs!</strong>
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* Next Hop Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day1/linear-regression" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to Linear Regression
        </Link>
        <Link
          href="/day1/case-study"
          className="button-primary"
        >
          <span>Continue to Case Study: AI in Enterprise IT</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
