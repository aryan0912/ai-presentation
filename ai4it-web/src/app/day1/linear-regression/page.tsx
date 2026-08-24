'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Zap
} from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import GuessPrompt from '@/components/GuessPrompt';
import InstructorNote from '@/components/InstructorNote';
import Formula from '@/components/Formula';
import Chart from '@/components/Chart';
import PretextRenderer from '@/components/PretextRenderer';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';
import LinearRegressionDemo from './LinearRegressionDemo';
import { FALLBACK_DATASETS } from '@/lib/api';

export default function LinearRegressionPage() {
  const [userGuess, setUserGuess] = useState<number | null>(null);
  const [activeAnscombeTab, setActiveAnscombeTab] = useState<number>(1);

  const milkData = FALLBACK_DATASETS['milk-7day'];
  const seasonalData = FALLBACK_DATASETS['milk-seasonal-curve'];
  const anscombe = FALLBACK_DATASETS['anscombe'];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Top Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-950/40 border border-blue-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 1 Core Topic · 65 min Teaching Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          1. Linear Regression: The 200-Year-Old Engine
        </h1>
        <PretextRenderer
          text="From Gauss calculating the orbit of Ceres in 1801 to fitting chilling center milk collection and training 70-billion-parameter neural networks today."
          className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed"
        />

        <InstructorNote
          timing="65 minutes total (10:30 - 11:35)"
          aloudQuestion="Before touching any math: look at the last 7 days of milk collection. If you were the chilling center manager dispatching insulated tankers tomorrow morning, what number would you bet on?"
          expectedWrongAnswers={[
            "Participants jumping straight to deep learning formulas before understanding the baseline. Force the room through Beat 2 ('Let them guess') to establish intuition."
          ]}
          instructorTip="Emphasize the difference between persistence baseline (yesterday's number) and least-squares regression. Highlight that every neural network neuron is literally this straight line plus an activation kink."
        />
      </div>

      {/* BEAT 1: Relatable Problem (§5-A) */}
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

          {/* 7-Day Table */}
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
                  <td className="py-3 px-3">2,140 L</td>
                  <td className="py-3 px-3">2,210 L</td>
                  <td className="py-3 px-3">2,180 L</td>
                  <td className="py-3 px-3">2,300 L</td>
                  <td className="py-3 px-3">2,350 L</td>
                  <td className="py-3 px-3">2,420 L</td>
                  <td className="py-3 px-3">2,390 L</td>
                  <td className="py-3 px-3 text-amber-400 bg-amber-950/30 font-extrabold text-xl animate-pulse">
                    ? ? ?
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            Every day, milk trucks arrive from cooperative village societies. The trend is rising, with noisy fluctuations (Wed dropped by 30L, Sun dropped by 30L). How do we predict tomorrow?
          </p>
        </div>

        <DairyAngle title="Why Chilling Center Intake Prediction Matters">
          A Bulk Milk Chilling Center holds thousands of litres of perishable raw milk. If tomorrow's intake reaches 2,450L but you only dispatched a 2,000L insulated tanker, the chilling storage will overflow and spoil. If you over-dispatch a 5,000L multi-axle tanker, diesel and cooling electricity are wasted.
        </DairyAngle>
      </ConceptBeat>

      {/* SECTION A2: Name the Problem Kind (§5-A2 — Module 1.2 Syllabus Contract) */}
      <section className="p-8 rounded-3xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-xl space-y-6">
        <div>
          <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
            Module 1.2 Core Requirement · Taxonomy
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Traditional Machine Learning vs. Generative AI
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Before touching regression equations, let's establish exact data science terminology:
          </p>
        </div>

        {/* 3 Taxonomy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-sm font-bold text-blue-400 uppercase mb-1">1. Supervised Learning</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We have past pairs of inputs (<strong>features</strong>, e.g. Day number) and correct answers (<strong>labels</strong>, e.g. 2,140 Litres). The model adjusts until its error is minimized. <em>This is what we are doing today.</em>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-sm font-bold text-purple-400 uppercase mb-1">2. Unsupervised Learning</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              No labeled right answers. The model clusters or groups data by geometric similarity. <em>(We will meet this on Day 2 with Vector Embeddings).</em>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-sm font-bold text-emerald-400 uppercase mb-1">3. Generative AI</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Doesn't predict a single scalar number. Predicts the probability distribution of the next token in a sequence to generate text, code, or images. <em>(Days 3–6).</em>
            </p>
          </div>
        </div>

        {/* 2-Column High Impact Contrast Table */}
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
                <td className="py-2.5 px-4 text-slate-300">Deterministic: same inputs $\to$ exact same output</td>
                <td className="py-2.5 px-4 text-purple-300">Probabilistic: temperature creates variations each run</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-4 text-slate-300">Wrongness is mathematically measurable (RMSE $\pm$Litres)</td>
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

      {/* BEAT 2: Let Them Guess (§5-B) */}
      <ConceptBeat
        kind="guess"
        number="2"
        title="Let the Room Guess Tomorrow's Collection"
        subtitle="Before revealing the algorithm, how would human experience estimate Day 8?"
        time="10 min"
        phase="predict"
      >
        <GuessPrompt
          question="What is your prediction for Monday's milk intake (Day 8)?"
          promptGuidance="Instructors: Stop here! Ask the room for their strategy before clicking cards."
          options={[
            {
              id: 'persistence',
              label: '1. "Use Yesterday\'s Number"',
              value: '2,390 L',
              explanation:
                'This is the Persistence Baseline (naive lag-1). State plainly: in industrial forecasting, the persistence baseline is notoriously difficult to beat! Any machine learning model you deploy must beat this baseline to justify its existence.'
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
                'You looked at the slope (+42 L/day) and extended the line forward. Congratulations: you just performed intuitive Linear Regression! The rest of this session is simply making "eyeball" mathematically exact.'
            }
          ]}
          allowCustomGuess={true}
          customGuessLabel="Type your exact guess to plot on the live chart:"
          onCustomGuessSubmit={(val) => setUserGuess(val)}
        />
      </ConceptBeat>

      {/* BEAT 3a: Origin Story (§5-C) */}
      <ConceptBeat
        kind="reveal"
        number="3A"
        title="Where This Came From (The Origin Story)"
        subtitle="Linear regression is not an abstract spreadsheet function — it solved history's greatest data crises."
        time="10 min"
        phase="predict"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400">1801 · The Lost Planet</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">Giuseppe Piazzi &amp; Ceres</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Astronomer Piazzi discovers dwarf planet Ceres, tracks it for 41 days, then loses it in the sun's glare. Nobody knows where to point their telescopes when it re-emerges.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 italic">
              <strong>The Lesson: </strong>24-year-old Carl Friedrich Gauss invents least squares to fit an orbit to tiny, noisy observations. Astronomers look where he predicted — Ceres is right there.
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-purple-400">1805 / 1809 · The Priority Dispute</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">Legendre vs. Gauss</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adrien-Marie Legendre publishes the Method of Least Squares first in 1805. Gauss publishes in 1809, claiming he used it since 1795 and tying it to Gaussian distributions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 italic">
              <strong>The Lesson: </strong>This algorithm is 220 years old, and it remains the single most reliable, battle-tested prediction model in enterprise production today.
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">1886 · The Strange Name</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">Galton's "Regression"</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Francis Galton studies parent-child heights: very tall parents have tall children, but on average <em>closer to the population mean</em>. He calls this "Regression towards mediocrity."
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 italic">
              <strong>The Lesson: </strong>"Regression" is not a technical word for lines — it is a historical linguistic artifact from a 19th-century height observation.
            </div>
          </div>
        </div>

        {/* Cauchy Gradient Descent Callout */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <span className="text-amber-400 font-bold font-mono">1847 · Augustin-Louis Cauchy:</span>
            <span>Cauchy publishes Gradient Descent. The iterative method that section E's "Auto-Fit" button uses is 178 years old and trains every neural network in the world today.</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">178 Years Old</span>
        </div>
      </ConceptBeat>

      {/* BEAT 3b: What "Best Fit" Actually Means (§5-D) */}
      <ConceptBeat
        kind="reveal"
        number="3B"
        title="What 'Best Fit' Actually Means"
        subtitle="Formulas, the AI parameter vocabulary (Weights & Biases), and the Loss Surface."
        time="15 min"
        phase="predict"
      >
        {/* D1: Formula with AI Names */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>D1. The Straight Line Equation</span>
          </h3>

          <Formula
            latex="y = m \cdot x + c"
            plainSummary="Prediction = Slope × Input + Starting Offset"
            gloss={[
              { symbol: 'x', meaning: 'Input Day number (1, 2, 3... 7)', aiName: 'Feature' },
              { symbol: 'm', meaning: 'Rate of change (+42 Litres per Day)', aiName: 'Weight (w)' },
              { symbol: 'c', meaning: 'Starting collection volume at Day 0', aiName: 'Bias (b)' },
              { symbol: 'y', meaning: 'Predicted milk intake for that day', aiName: 'Label (ŷ)' },
            ]}
          />

          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs md:text-sm text-purple-200 leading-relaxed">
            <strong className="text-purple-300 uppercase font-mono block mb-1">
              ★ The AI Parameter Connection (Remember this for Day 2)
            </strong>
            `m` has another name: the <strong className="text-sky-300">Weight</strong>. `c` has another name: the <strong className="text-sky-300">Bias</strong>. Every time you hear that an LLM has <em>"70 billion parameters,"</em> it simply means it has 70 billion of these two things! Not 70 billion thoughts — 70 billion $m$s and $c$s organized in matrices.
          </div>
        </div>

        {/* D2: Why Square the Error? */}
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-bold text-white">D2. Measuring Wrongness: Why Square the Error?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-sky-400 block mb-1">1. No Sign Cancellation</strong>
              <p className="text-slate-400">A +20L error and a -20L error don't sum to 0. Squaring makes all errors positive.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-purple-400 block mb-1">2. Heavily Punishes Big Misses</strong>
              <p className="text-slate-400">A 20L miss hurts 4× as much as a 10L miss ($20^2 = 400$ vs $10^2 = 100$). Big misses spoil milk.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-emerald-400 block mb-1">3. Smooth for Calculus</strong>
              <p className="text-slate-400">Parabolas ($x^2$) are smooth everywhere; absolute values ($|x|$) have a sharp non-differentiable kink at 0.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-amber-400 block mb-1">4. Maximum Likelihood</strong>
              <p className="text-slate-400">Under Gaussian noise assumptions, least squares is mathematically the most probable true line.</p>
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* SECTION E: The Interactive Demo */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Section E · Hands-On</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Interactive Regression &amp; Loss Surface Simulator</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Live Mathematical Stepping</span>
        </div>

        <LinearRegressionDemo userGuess={userGuess} />
      </section>

      {/* BEAT 4: Break It (§5-F) */}
      <ConceptBeat
        kind="break"
        number="4"
        title="Break It: When Straight Lines Lie"
        subtitle="Two famous exhibits where linear metrics report success, but the reality is broken."
        time="10 min"
        phase="predict"
      >
        {/* F1: The Flush Season Curve */}
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
            Milk production across India follows calving and green fodder cycles: it rises during the winter Flush Season (Oct–Mar), plateaus, and drops during Lean Season (May–Jul). A straight line is uniformly, confidently wrong.
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

        {/* F2: Anscombe's Quartet (1973) */}
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

      {/* BEAT 5: Apply to IT World (§5-G) */}
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

      {/* SECTION H: The Bridge to Neural Networks (§5-H) */}
      <section className="p-8 rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-slate-950 p-8 space-y-6">
        <div>
          <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
            Section H · The Unified Bridge
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            How a Straight Line Becomes a Neural Network
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            The single most important paragraph on this page:
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 text-slate-200 font-mono text-sm leading-relaxed">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</span>
            <span>One linear regression: <strong className="text-sky-300">y = m·x + c</strong> (one weight, one bias).</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</span>
            <span>Add more inputs: <strong className="text-purple-300">y = m₁x₁ + m₂x₂ + m₃x₃ + c</strong> (more weights, still one bias). Still a straight line, just in multi-dimensional space.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</span>
            <span>Now bend the output with one small non-linear function (like ReLU), and stack several of them.</span>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 font-bold text-base not-italic">
            "That is a Neural Network. A biological or artificial neuron is literally the line you just fitted, with a kink added. Frank Rosenblatt called it a Perceptron in 1958."
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
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
