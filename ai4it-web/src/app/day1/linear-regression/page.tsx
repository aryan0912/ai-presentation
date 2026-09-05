'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  HelpCircle,
  History,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  Cpu,
  Compass,
  CheckCircle2,
  Sliders,
  Table,
  Zap,
  RotateCcw
} from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import GuessPrompt from '@/components/GuessPrompt';
import InstructorNote from '@/components/InstructorNote';
import Formula from '@/components/Formula';
import Chart from '@/components/Chart';
import PretextRenderer from '@/components/PretextRenderer';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';
import LinearRegressionDemo from './LinearRegressionDemo';
import EquationTokenHighlight from '@/components/EquationTokenHighlight';
import LossSlice1D from '@/components/LossSlice1D';
import LearningRateComparison from '@/components/LearningRateComparison';
import CalculationFlowPlayer from '@/components/CalculationFlowPlayer';
import WeightVectorViz from '@/components/WeightVectorViz';
import LineToNeuronMorph from '@/components/LineToNeuronMorph';
import { FALLBACK_DATASETS } from '@/lib/api';

export default function LinearRegressionPage() {
  const [userGuess, setUserGuess] = useState<number | null>(null);
  const [activeAnscombeTab, setActiveAnscombeTab] = useState<number>(1);
  const [hasRevealedDownhill, setHasRevealedDownhill] = useState<boolean>(false);

  const milkData = FALLBACK_DATASETS['milk-7day'];
  const seasonalData = FALLBACK_DATASETS['milk-seasonal-curve'];
  const anscombe = FALLBACK_DATASETS['anscombe'];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Top Banner & Instructor Navigation */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-950/40 border border-blue-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 1 Core Topic · ~139 Min Teaching Budget (Deep-Dive Edition)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          1. Linear Regression: The 200-Year-Old Engine
        </h1>
        <PretextRenderer
          text="From Gauss calculating the orbit of Ceres in 1801 to fitting chilling center milk collection and training 70-billion-parameter neural networks today. We go deep here on purpose — every neural network idea for the rest of the course is this same machinery, just repeated."
          className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed"
        />

        <InstructorNote
          timing="~139 minutes total (16 Sections) — Section 3B alone runs ~71 min; do not rush it"
          aloudQuestion="Before touching any math: look at the last 7 days of milk collection. If you were the chilling center manager dispatching insulated tankers tomorrow morning, what number would you bet on?"
          expectedWrongAnswers={[
            "Participants jumping straight to deep learning formulas before understanding the baseline. Force the room through Beat 2 ('Let them guess') to establish intuition."
          ]}
          instructorTip="Emphasize the difference between persistence baseline (yesterday's number) and least-squares regression. Highlight that every neural network neuron is literally this straight line plus an activation kink."
        />
      </div>

      {/* BEAT 1: The Raw Observations (10 min) */}
      <div id="beat-1">
        <ConceptBeat
          kind="problem"
          number="1"
          title="The Raw Observations (7 Days of Chilling Data)"
          subtitle="Before we write any formula, look at the physical reality on the ground."
          time="10 min"
          phase="predict"
        >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-sky-400 font-bold uppercase">
              Bulk Milk Chilling Center (BMC #402) · Daily Intake
            </span>
            <span className="text-xs font-mono text-slate-400">Unit: Litres / Day</span>
          </div>

          {/* 7-Day Table with Framer-Motion Staggered Entrance */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-mono text-slate-400">
                  <th className="py-2.5 px-3">Day 1 (Mon)</th>
                  <th className="py-2.5 px-3">Day 2 (Tue)</th>
                  <th className="py-2.5 px-3">Day 3 (Wed)</th>
                  <th className="py-2.5 px-3">Day 4 (Thu)</th>
                  <th className="py-2.5 px-3">Day 5 (Fri)</th>
                  <th className="py-2.5 px-3">Day 6 (Sat)</th>
                  <th className="py-2.5 px-3">Day 7 (Sun)</th>
                  <th className="py-2.5 px-3 text-amber-400 font-bold bg-amber-950/30 rounded-t-lg">
                    Day 8 (Mon) ???
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-base">
                <tr className="text-white font-bold">
                  {[2140, 2210, 2180, 2300, 2350, 2420, 2390].map((val, idx) => (
                    <motion.td
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.3 }}
                      className="py-3 px-3"
                    >
                      {val.toLocaleString()} L
                    </motion.td>
                  ))}
                  <td className="py-3 px-3 text-amber-400 bg-amber-950/30 font-extrabold text-xl animate-pulse">
                    ? ? ?
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Animated SVG Sparkline Tease across the 7 Points */}
          <div className="mt-5 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
              <span>Visual Trend Pattern</span>
              <span>Rising with Day-to-Day Fluctuation</span>
            </div>
            <svg viewBox="0 0 600 40" className="w-full h-10 overflow-visible">
              <motion.path
                d="M 40 32 L 120 23 L 200 27 L 280 14 L 360 8 L 440 2 L 520 6"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
              />
              {[
                { cx: 40, cy: 32 },
                { cx: 120, cy: 23 },
                { cx: 200, cy: 27 },
                { cx: 280, cy: 14 },
                { cx: 360, cy: 8 },
                { cx: 440, cy: 2 },
                { cx: 520, cy: 6 },
              ].map((pt, idx) => (
                <motion.circle
                  key={idx}
                  cx={pt.cx}
                  cy={pt.cy}
                  r="3.5"
                  fill="#38bdf8"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + idx * 0.15 }}
                />
              ))}
            </svg>
          </div>

          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Every day, milk trucks arrive from cooperative village societies. The trend is rising, with noisy fluctuations (Wed dropped by 30L, Sun dropped by 30L). How do we predict tomorrow?
          </p>
        </div>

        <DairyAngle title="Why Chilling Center Intake Prediction Matters">
          A Bulk Milk Chilling Center holds thousands of litres of perishable raw milk. If tomorrow's intake reaches 2,450L but you only dispatched a 2,000L insulated tanker, the chilling storage will overflow and spoil. If you over-dispatch a 5,000L multi-axle tanker, diesel and cooling electricity are wasted.
        </DairyAngle>
      </ConceptBeat>
      </div>

      {/* BEAT 2: Let the Room Guess with Direct Inline Plot (10 min) */}
      <ConceptBeat
        kind="guess"
        number="2"
        title="Let the Room Guess Tomorrow's Collection"
        subtitle="Before revealing the algorithm, how would human experience estimate Day 8?"
        time="10 min"
        phase="predict"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Guess Prompts */}
          <div className="lg:col-span-7">
            <GuessPrompt
              question="What is your prediction for Monday's milk intake (Day 8)?"
              promptGuidance="Instructors: Stop here! Ask the room for their strategy before clicking cards."
              options={[
                {
                  id: 'persistence',
                  label: '1. "Use Yesterday\'s Number"',
                  value: '2,390 L',
                  explanation:
                    'This is the Persistence Baseline (naive lag-1). In industrial forecasting, any machine learning model must beat this baseline to justify its existence!'
                },
                {
                  id: 'average',
                  label: '2. "Average the 7 Days"',
                  value: '2,284 L',
                  explanation:
                    'Sum / 7 = 2,284 L. This throws away the entire upward trend and under-predicts significantly.'
                },
                {
                  id: 'eyeball',
                  label: '3. "Eyeball the Trendline"',
                  value: '~2,450 L',
                  explanation:
                    'You looked at the slope (+42 L/day) and extended the line forward. Congratulations: you just performed intuitive Linear Regression! Now we make it mathematically exact.'
                }
              ]}
              onSelectOption={(opt) => {
                if (opt.id === 'persistence') setUserGuess(2390);
                if (opt.id === 'average') setUserGuess(2284);
                if (opt.id === 'eyeball') setUserGuess(2450);
              }}
              allowCustomGuess={true}
              customGuessLabel="Type your exact guess to plot directly on the chart:"
              onCustomGuessSubmit={(val) => setUserGuess(val)}
            />
          </div>

          {/* Right Column: Direct Live Inline Scatter Plot with Immediate Guess Feedback */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                  Immediate Observation Plot
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {userGuess ? `Guessed: ${userGuess} L` : 'Waiting for guess...'}
                </span>
              </div>

              <Chart
                points={milkData.map((d: any) => ({ x: d.x, y: d.y, label: d.label }))}
                highlightPoints={
                  userGuess
                    ? [{ x: 8, y: userGuess, color: '#f59e0b', label: `Day 8: ${userGuess} L` }]
                    : []
                }
                xMin={0}
                xMax={9}
                yMin={1800}
                yMax={2600}
                xLabel="Day of Week (1..7, 8=Day 8 Guess)"
                yLabel="Milk Litres"
                height={260}
              />
            </div>

            <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 text-center">
              {userGuess ? (
                <span className="text-amber-300 font-bold">
                  Day 8 plotted at {userGuess.toLocaleString()} L &mdash; see how it continues the rising scatter!
                </span>
              ) : (
                <span>Pick an option on the left to immediately plot Day 8 on this chart &uarr;</span>
              )}
            </div>
          </div>

        </div>
      </ConceptBeat>

      {/* BEAT 3A: Origin Story (5 min Condensed) */}
      <ConceptBeat
        kind="reveal"
        number="3A"
        title="Where This Came From (The Origin Story)"
        subtitle="Linear regression solved history's greatest data crises across 220 years."
        time="5 min"
        phase="predict"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400">1801 · The Lost Planet</span>
              <h3 className="text-base font-bold text-white mt-1 mb-1.5">Giuseppe Piazzi &amp; Ceres</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Astronomer Piazzi loses dwarf planet Ceres in the sun's glare. 24-year-old Carl Friedrich Gauss invents least squares to fit an orbit to tiny observations &mdash; Ceres is found right where Gauss predicted.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-purple-400">1805 / 1809 · The Dispute</span>
              <h3 className="text-base font-bold text-white mt-1 mb-1.5">Legendre vs. Gauss</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adrien-Marie Legendre publishes Least Squares in 1805; Gauss publishes in 1809 tying it to Gaussian distributions. This algorithm is 220 years old and remains production's most battle-tested model.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">1886 · The Name</span>
              <h3 className="text-base font-bold text-white mt-1 mb-1.5">Galton's "Regression"</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Francis Galton finds children of tall parents regress toward the population mean ("regression to mediocrity"). "Regression" is a 19th-century linguistic artifact for fitting lines.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 font-mono text-center">
          <span className="text-slate-500 mr-2">1801 &rarr; 1805 &rarr; 1886 &rarr;</span>
          <span>How does the line learn automatically? That story picks up in <strong>3B.4</strong> with Augustin-Louis Cauchy's 1847 downhill gradient calculus.</span>
        </div>
      </ConceptBeat>

      {/* TAXONOMY & LEARNING METHODS: Supervised / Unsupervised / RL / GenAI */}
      <section className="p-8 rounded-3xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-xl space-y-6">
        <div>
          <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
            Module 1.2 Core Requirement · Taxonomy of Learning Methods
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            The 4 Learning Paradigms &amp; How LLMs Unify Them
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Now that you've seen how we predict from historical data, how does machine learning actually learn? Let's classify the entire AI landscape:
          </p>
        </div>

        {/* 4 Taxonomy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-blue-400 uppercase">1. Supervised</h4>
                <span className="text-[10px] font-mono bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded border border-blue-800/50">Inputs + Labels</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                We have past pairs of inputs (<strong>features</strong>, e.g. Day number) and correct ground-truth answers (<strong>labels</strong>, e.g. 2,140 Litres). The algorithm optimizes weights until error is minimized.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-blue-300">
              Today's Focus (Linear Regression &amp; NNs)
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-purple-400 uppercase">2. Unsupervised</h4>
                <span className="text-[10px] font-mono bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded border border-purple-800/50">No Labels</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                No labeled teacher answers. The algorithm clusters, organizes, and discovers latent geometry directly from raw structure.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-purple-300">
              Day 2 (Vector Embeddings &amp; Pre-training)
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-amber-400 uppercase">3. Reinforcement</h4>
                <span className="text-[10px] font-mono bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-800/50">Rewards / Penalties</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                An <strong>agent</strong> takes actions in an environment, receiving scalar <strong>rewards</strong> or penalties to learn optimal policy strategies via trial and error.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-amber-300">
              Days 2 &amp; 5 (RLHF &amp; Agent Loops)
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-emerald-400 uppercase">4. Generative AI</h4>
                <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/50">Next-Token Gen</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                Instead of predicting a single scalar number or category, predicts the probability distribution of the next sequence token to generate rich text, code, or images.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-300">
              Days 3–6 (LLMs, Copilots &amp; Agents)
            </div>
          </motion.div>
        </div>

        {/* The LLM Synthesis Callout: How LLMs use Supervised + Unsupervised + Reinforcement Learning */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-950 to-blue-950/80 border border-purple-400/40 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              The Grand Synthesis: How Modern LLMs (like ChatGPT &amp; Claude) Use All Three
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            People often ask: <em>"Is ChatGPT supervised, unsupervised, or reinforcement learning?"</em> The breakthrough answer is that modern foundation models stack <strong>all three in sequence</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-1">
              <span className="text-[11px] font-mono font-bold text-purple-300 block">Stage 1: Unsupervised / Self-Supervised</span>
              <strong className="text-white text-xs block">Raw Web Pre-training</strong>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Ingests trillions of unlabeled tokens. The model predicts masked/future words, creating foundational linguistic geometry.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-blue-500/30 space-y-1">
              <span className="text-[11px] font-mono font-bold text-blue-300 block">Stage 2: Supervised Learning (SFT)</span>
              <strong className="text-white text-xs block">Instruction Fine-Tuning</strong>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Expert humans write high-quality (Prompt, Answer) pairs so the model learns how to converse as an assistant rather than just completing raw text.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-1">
              <span className="text-[11px] font-mono font-bold text-amber-300 block">Stage 3: Reinforcement Learning (RLHF)</span>
              <strong className="text-white text-xs block">Human Preference Alignment</strong>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                A reward model rates outputs; reinforcement learning steers the policy away from toxic, evasive, or hallucinatory answers toward helpful truth.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Contrast Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-purple-800/60 text-purple-300 font-mono">
                <th className="py-2.5 px-4 bg-slate-950/80 rounded-tl-lg">Traditional ML (Days 1–2)</th>
                <th className="py-2.5 px-4 bg-purple-950/60 rounded-tr-lg text-purple-200">
                  Generative AI (Days 3–6)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-4 text-slate-300">Predicts a continuous number or discrete class</td>
                <td className="py-2.5 px-4 text-purple-300">Produces conversational text, shell scripts, or code</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-4 text-slate-300">Deterministic: same inputs &rarr; exact same output</td>
                <td className="py-2.5 px-4 text-purple-300">Probabilistic: temperature creates variations each run</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-4 text-slate-300">Wrongness is mathematically measurable (RMSE &plusmn;Litres)</td>
                <td className="py-2.5 px-4 text-purple-300">Wrongness is a subjective human judgement call</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-4 text-slate-300">Runs on low-power CPUs in sub-milliseconds ($0 cost)</td>
                <td className="py-2.5 px-4 text-purple-300">Requires expensive GPU clusters or per-token API fees</td>
              </tr>
              <tr className="hover:bg-slate-900/40 bg-rose-950/10">
                <td className="py-2.5 px-4 text-rose-300 font-bold">Fails visibly (obvious curve miss)</td>
                <td className="py-2.5 px-4 text-rose-300 font-bold">Fails FLUENTLY (hallucinates with total confidence)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 text-xs md:text-sm font-semibold text-purple-200 text-center">
          "Both are 'AI'. Only one of them can tell you exactly how wrong it is. Keep that distinction in your head for the entire 6 days."
        </div>
      </section>

      {/* BEAT 3B: What "Best Fit" Actually Means — The Deep Dive (~71 min) */}
      <ConceptBeat
        kind="reveal"
        number="3B"
        title="What 'Best Fit' Actually Means — The Deep Dive"
        subtitle="From vocabulary to a fully hand-worked training step. This is the foundation every neural network on Day 1's next page builds on."
        time="~71 min"
        phase="predict"
      >
        {/* 3B.1: What the Model Actually Is (8 min) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>3B.1 - What the Model Actually Is</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">8 min</span>
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Remember the restaurant analogy from this morning's opener: the <strong className="text-white">algorithm</strong> is the technique, the <strong className="text-white">dataset</strong> is every dish ever tasted, <strong className="text-white">training</strong> is practicing, and the <strong className="text-white">model</strong> is the finished chef. Here is exactly what "the chef" is made of:
          </p>

          {/* Interactive Formula with Hoverable/Clickable Token Highlighting */}
          <EquationTokenHighlight />

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white block mb-1">The model, precisely defined:</strong>
            The equation (y = m&middot;x + c) never changes. The <strong className="text-sky-300">model</strong> is that equation plus whatever current values m and c happen to hold right now. Change m or c, and you have a different model, a different "chef".
          </div>

          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs md:text-sm text-purple-200 leading-relaxed">
            <strong className="text-purple-300 uppercase font-mono block mb-1">
              The AI Parameter Connection (Remember this for Day 2)
            </strong>
            `m` has another name: the <strong className="text-sky-300">Weight</strong>. `c` has another name: the <strong className="text-sky-300">Bias</strong>. Every time you hear that an LLM has <em>"70 billion parameters,"</em> it simply means it has 70 billion of these two things organised in matrices!
          </div>
        </div>

        {/* 3B.2: Measuring Correctness — The Loss Function with Visual Flat Line (8 min) */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Table size={18} className="text-purple-400" />
            <span>3B.2 - Measuring Correctness: The Loss Function</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">8 min</span>
          </h3>

          {/* Dual View: Guess Prompt + Visual Flat Line showing the giant red error gaps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-3">
              <GuessPrompt
                question="Look at the flat line (m=0, c=2000) plotted on the right. Is that a good model? How do you measure its wrongness?"
                promptGuidance="Instructors: Point to the big vertical red error bars on the right chart!"
                options={[
                  {
                    id: 'looks-ok',
                    label: '1. Looks roughly fine',
                    explanation: "That's a subjective opinion. We need an exact number that doesn't change regardless of who looks.",
                  },
                  {
                    id: 'gap-per-point',
                    label: '2. Measure the gap at each point',
                    explanation: "You are intuitively computing residuals (prediction minus actual) at every day. Let's formalize it!",
                  },
                  {
                    id: 'need-formula',
                    label: '3. We need a single formula for wrongness',
                    explanation: 'Exactly right! That single number is called a Loss Function (MSE). It turns wrongness into a number we can minimize.',
                  },
                ]}
              />
            </div>

            {/* Flat line chart showing initial error state */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                  Initial Flat Line (m=0, c=2000)
                </span>
                <span className="text-[10px] font-mono text-rose-400 font-bold">MSE: 91,014 L²</span>
              </div>
              <Chart
                points={milkData.map((d: any) => ({ x: d.x, y: d.y, label: d.label }))}
                lines={[
                  {
                    slope: 0,
                    intercept: 2000,
                    color: '#f43f5e',
                    strokeWidth: 2.5,
                    strokeDasharray: '4 4',
                    label: 'Initial Flat Line (m=0, c=2000)',
                  },
                ]}
                showResiduals={true}
                residualLine={{ slope: 0, intercept: 2000 }}
                xMin={0}
                xMax={8}
                yMin={1800}
                yMax={2600}
                xLabel="Day of Week"
                yLabel="Milk Intake (Litres)"
                height={220}
              />
              <p className="text-[10px] font-mono text-slate-400 text-center mt-2">
                Notice the huge dashed red error bars &mdash; every prediction is ~300L below reality!
              </p>
            </div>
          </div>

          <h4 className="text-sm font-bold text-slate-200 mt-4">Why Square the Error?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-sky-400 block mb-1">1. No Sign Cancellation</strong>
              <p className="text-slate-400">A +20L and -20L error don't cancel to 0. Squaring makes all errors positive.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-purple-400 block mb-1">2. Heavily Punishes Big Misses</strong>
              <p className="text-slate-400">A 20L miss hurts 4× as much as a 10L miss ($20^2 = 400$ vs $10^2 = 100$).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-emerald-400 block mb-1">3. Smooth for Calculus</strong>
              <p className="text-slate-400">Parabolas ($x^2$) are smooth everywhere; absolute values ($|x|$) have a sharp kink at 0.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-amber-400 block mb-1">4. Maximum Likelihood</strong>
              <p className="text-slate-400">Under Gaussian noise, least squares is mathematically the most probable line.</p>
            </div>
          </div>

          <Formula
            latex="L(m, c) = \frac{1}{n}\sum_{i=1}^{n} \left( \hat{y}_i - y_i \right)^2"
            plainSummary="Loss = average squared gap between prediction and reality, across every data point"
            gloss={[
              { symbol: 'n', meaning: '7, the number of days we have data for', aiName: 'Dataset Size' },
              { symbol: 'y-hat i', meaning: 'What the model predicted for day i', aiName: 'Prediction' },
              { symbol: 'y i', meaning: 'What actually happened on day i', aiName: 'Label' },
              { symbol: 'L', meaning: 'One single number: how wrong the whole model is', aiName: 'Loss (MSE)' },
            ]}
          />
        </div>

        {/* 3B.3: How Will It Learn? Finding Which Way Is Downhill (10 min) */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" />
            <span>3B.3 - How Will It Learn? Finding Which Way Is Downhill</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">10 min</span>
          </h3>

          <GuessPrompt
            question="Loss is high (91,014) at m=0. Which way do you nudge m to roll downhill into lower error, increase or decrease?"
            promptGuidance="Instructors: Look at the flat line above and the bowl below before clicking."
            options={[
              {
                id: 'increase',
                label: '1. Increase m',
                explanation: 'Correct! The line is currently flat (m=0) while the true data rises. Tilting the line up (increasing m) rolls downhill into lower loss.',
              },
              {
                id: 'decrease',
                label: '2. Decrease m',
                explanation: "Wrong direction: making the line slope downwards increases the error even further.",
              },
              {
                id: 'try-both',
                label: "3. Try both and see",
                explanation: "That's brute-force trial and error. Calculus replaces guessing by computing the exact downhill slope in one calculation.",
              },
            ]}
            onSelectOption={() => setHasRevealedDownhill(true)}
          />

          {/* Polished 1D Loss Parabola with High-Contrast Downhill Tangent Slope */}
          <LossSlice1D isRevealed={hasRevealedDownhill} />

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs md:text-sm text-emerald-100 leading-relaxed">
            <strong className="text-emerald-300 block mb-1">The Calculus Connection:</strong>
            That "downhill slope" has an exact mathematical name: the <strong>partial derivative</strong>. In section 3B.6 below, you will watch the computer compute this exact derivative on paper.
          </div>

          <Formula
            latex="\frac{\partial L}{\partial m} = \frac{2}{n}\sum_{i=1}^n (\hat{y}_i - y_i)\cdot x_i, \qquad \frac{\partial L}{\partial c} = \frac{2}{n}\sum_{i=1}^n (\hat{y}_i - y_i)"
            plainSummary="How the computer computes the exact downhill slope for weight (m) and bias (c)"
            gloss={[
              { symbol: 'dL/dm', meaning: 'How much loss changes per nudge to slope (error × day x)', aiName: 'Weight Gradient' },
              { symbol: 'dL/dc', meaning: 'How much loss changes per nudge to intercept (sum of errors)', aiName: 'Bias Gradient' },
            ]}
          />
        </div>

        {/* 3B.4: Learning Rate & Gradient Descent (incl. Cauchy 1847) (12 min) */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap size={18} className="text-amber-400" />
            <span>3B.4 - Learning Rate &amp; Gradient Descent (Cauchy, 1847)</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">12 min</span>
          </h3>

          <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-slate-300 leading-relaxed font-mono">
            <span className="text-amber-400 font-bold block mb-1">1847 · Augustin-Louis Cauchy:</span>
            In 1847, Cauchy published the "roll downhill" method. The update rule below is 179 years old and trains every neural network in the world today.
          </div>

          <Formula
            latex="m_{new} = m_{old} - \eta \cdot \frac{\partial L}{\partial m} \qquad c_{new} = c_{old} - \eta \cdot \frac{\partial L}{\partial c}"
            plainSummary="New parameter = Old parameter minus (Learning Rate times Gradient)"
            gloss={[
              { symbol: 'eta', meaning: 'Step size, how far to move each update', aiName: 'Learning Rate' },
              { symbol: 'minus sign', meaning: 'Move opposite the gradient, downhill into the valley', aiName: 'Descent' },
            ]}
          />

          {/* Interactive Learning Rate Comparison Component */}
          <LearningRateComparison />
        </div>

        {/* 3B.5: Batches & Epochs (5 min) */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers size={18} className="text-sky-400" />
            <span>3B.5 - Batches &amp; Epochs</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">5 min</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-sky-400 block mb-1">Step</strong>
              <p className="text-slate-400">One gradient calculation, one parameter update. Every click of "Single Step" below is one step.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-purple-400 block mb-1">Batch</strong>
              <p className="text-slate-400">The set of data points used to compute one step's gradient. Today: all 7 days, every single step.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-emerald-400 block mb-1">Epoch</strong>
              <p className="text-slate-400">One full pass over the entire dataset. Since our batch already is the entire dataset...</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">...today, one step equals one epoch.</strong> That's only true because our dataset is tiny (7 rows). At scale, datasets are split into mini-batches (Mini-Batch Stochastic Gradient Descent).
          </div>
        </div>

        {/* 3B.6: Initialization & the Slow-Motion Walkthrough with Side-by-Side Line Tilt (15 min) */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu size={18} className="text-rose-400" />
            <span>3B.6 - Initialization &amp; The Slow-Motion Walkthrough</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">15 min</span>
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Before the first step, m and c start at <strong className="text-white">m = 0, c = 2000</strong>. Watch the exact arithmetic evaluated for each row, and observe the line physically tilt upward on Step 1:
          </p>

          {/* Enhanced CalculationFlowPlayer with Data-Space Line Tilt + Loss Space */}
          <CalculationFlowPlayer />
        </div>

        {/* 3B.7: Generalizing: Adding a Second Feature (8 min) */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers size={18} className="text-purple-400" />
            <span>3B.7 - Generalizing: Adding a Second Feature</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal ml-auto">8 min</span>
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Real forecasting uses multiple inputs. Let's add ambient temperature as a second feature to the same week, with a festival-driven Saturday spike (2,850L vs. ~2,420L):
          </p>

          <Formula
            latex="\hat{y} = w_1 \cdot x_{day} + w_2 \cdot x_{temp} + c"
            plainSummary="Still a straight line, just drawn through more dimensions"
            gloss={[
              { symbol: 'x_day, x_temp', meaning: 'Two inputs, stacked into one feature vector', aiName: 'Feature Vector' },
              { symbol: 'w1, w2', meaning: 'One weight per input, together a weight vector', aiName: 'Weights' },
            ]}
          />

          {/* Interactive WeightVectorViz Component */}
          <WeightVectorViz />
        </div>

        {/* 3B.8: Recap: The Whole Pipeline, One Breath (5 min) */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide">
                3B.8 · The Whole Pipeline in One Glance
              </span>
              <h4 className="text-lg font-bold text-white">7 Concepts Built Together</h4>
            </div>
            <span className="text-xs font-mono text-slate-500">5 min Consolidation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-sky-400 block font-bold">1. Model</span>
              <span className="text-[10px] text-slate-400">y = mx + c</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 block font-bold">2. Loss</span>
              <span className="text-[10px] text-slate-400">MSE Error</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 block font-bold">3. Gradient</span>
              <span className="text-[10px] text-slate-400">Downhill Slope</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-amber-400 block font-bold">4. Step Size</span>
              <span className="text-[10px] text-slate-400">Learning Rate</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-purple-400 block font-bold">5. Batch</span>
              <span className="text-[10px] text-slate-400">Dataset Size</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-blue-400 block font-bold">6. Update</span>
              <span className="text-[10px] text-slate-400">Step Repeated</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-indigo-400 block font-bold">7. Vector</span>
              <span className="text-[10px] text-slate-400">Multi-Feature</span>
            </div>
          </div>
        </div>

      </ConceptBeat>

      {/* SECTION E: The Interactive Simulator with Step Inspector & Convergence Curve (15 min) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Section E · Hands-On</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Interactive Regression &amp; Loss Surface Simulator</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">~15 min · Live Mathematical Stepping &amp; Convergence Curve</span>
        </div>

        <LinearRegressionDemo userGuess={userGuess} />
      </section>

      {/* BEAT 4: Break It (10 min) */}
      <ConceptBeat
        kind="break"
        number="4"
        title="Break It: When Straight Lines Lie"
        subtitle="Two famous exhibits where linear metrics report success, but the reality is broken."
        time="10 min"
        phase="predict"
      >
        {/* Exhibit 1: Seasonal Curve */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Exhibit 1 · The Seasonal Curve</span>
              <h4 className="text-lg font-bold text-white">Annual Dairy Flush Season (Non-Linearity)</h4>
            </div>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
              Linear Model Fails
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Milk production follows calving cycles: rising during winter Flush Season, plateauing, and dropping in Lean Season. A straight line is confidently wrong.
          </p>

          <Chart
            points={seasonalData.map((d: any) => ({ x: d.x, y: d.y, label: d.label }))}
            lines={[
              {
                slope: 15,
                intercept: 2100,
                color: '#ef4444',
                strokeWidth: 2.5,
                strokeDasharray: '4 4',
                label: 'Best Straight Line (Confidently Wrong)',
              },
            ]}
            xLabel="Month of Year (1=Jan ... 12=Dec)"
            yLabel="Milk Volume (Litres)"
            height={260}
          />
          <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200">
            <strong>Why We Need Neural Networks: </strong>
            Nature and IT operations are full of bends, curves, and saturations. This curve is the direct motivation for why we need non-linear neural network layers.
          </div>
        </div>

        {/* Exhibit 2: Anscombe's Quartet */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Exhibit 2 · Classic Data Science Warning</span>
              <h4 className="text-lg font-bold text-white">Anscombe's Quartet (1973)</h4>
            </div>
            <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 font-mono text-xs">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setActiveAnscombeTab(num)}
                  className={`px-3 py-1 rounded transition-all ${
                    activeAnscombeTab === num ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dataset {num}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div><span className="text-slate-500 block">Mean of X:</span> <strong className="text-white">9.00</strong></div>
            <div><span className="text-slate-500 block">Mean of Y:</span> <strong className="text-white">7.50</strong></div>
            <div><span className="text-slate-500 block">Fitted Line:</span> <strong className="text-sky-400">y = 0.50x + 3.00</strong></div>
            <div><span className="text-slate-500 block">R² Score:</span> <strong className="text-emerald-400">0.67</strong></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <Chart
                points={anscombe[`dataset_${activeAnscombeTab}`]}
                lines={[{ slope: 0.5, intercept: 3.0, color: '#38bdf8', strokeWidth: 2.5 }]}
                xMin={2}
                xMax={20}
                yMin={2}
                yMax={14}
                xLabel={`Dataset ${activeAnscombeTab} X values`}
                yLabel={`Dataset ${activeAnscombeTab} Y values`}
                height={260}
              />
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong>Dataset {activeAnscombeTab} Shape: </strong>
                {activeAnscombeTab === 1 && 'Clean linear relationship with normal scatter. The only dataset where linear regression is appropriate!'}
                {activeAnscombeTab === 2 && 'Pure parabolic curve! The straight line completely misses the non-linear relationship.'}
                {activeAnscombeTab === 3 && 'Tight collinear line corrupted by a single extreme vertical outlier dragging the slope.'}
                {activeAnscombeTab === 4 && 'Vertical stack of points where a single extreme leverage point creates the false illusion of a slope.'}
              </div>

              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 font-bold text-sm leading-relaxed">
                "The metrics said all four models were identical. Only one of them was any good. If you take one habit from today into your IT career: ALWAYS PLOT YOUR DATA."
              </div>
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* BEAT 5: Apply to IT World (5 min) */}
      <ConceptBeat
        kind="apply"
        number="5"
        title="Where You Already Own This in IT"
        subtitle="How linear models solve daily infrastructure and operational capacity planning."
        time="5 min"
        phase="predict"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50">
            <span className="text-xs font-mono text-sky-400 font-bold uppercase">1. Storage Capacity</span>
            <h4 className="text-lg font-bold text-white mt-1 mb-2">SAN / NAS Disk Growth</h4>
            <p className="text-xs text-slate-300">
              Fitting disk utilization vs. calendar week: <code>y = m·(week) + c</code>. Instantly tells you the exact date the storage pool crosses the 80% threshold.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase">2. Service Desk</span>
            <h4 className="text-lg font-bold text-white mt-1 mb-2">Ticket Inflow Forecasting</h4>
            <p className="text-xs text-slate-300">
              Fitting helpdesk ticket volume against headcount expansion to budget next quarter's IT on-call staffing.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">3. Chilling Centers</span>
            <h4 className="text-lg font-bold text-white mt-1 mb-2">Daily Collection Intake</h4>
            <p className="text-xs text-slate-300">
              Our running example: predicting tomorrow's collection to dispatch appropriately sized milk tankers 18 hours in advance.
            </p>
          </div>
        </div>

        <InfraAngle title="The Straight-Line Assumption Caveat">
          All three applications assume the future behaves in a straight line. The moment an unexpected event hits — a corporate migration, an unannounced festival, or network hardware failure — the straight line lies with high confidence.
        </InfraAngle>
      </ConceptBeat>

      {/* SECTION H: The Bridge to Neural Networks (5 min) */}
      <section className="p-8 rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-slate-950 space-y-6">
        <div>
          <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
            Section H · The Unified Bridge
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            How a Straight Line Becomes a Neural Network
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            The single most important concept on this page:
          </p>
        </div>

        {/* 3-Keyframe Line to Neuron Morph Component */}
        <LineToNeuronMorph />

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 italic max-w-xl">
            "You tuned 2 parameters by hand today. GPT-class models tune hundreds of billions of the same two things, by the same downhill gradient method you just watched."
          </p>
          <Link href="/day1/neural-network" className="button-primary shrink-0">
            Next: Neural Networks (75m) <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
