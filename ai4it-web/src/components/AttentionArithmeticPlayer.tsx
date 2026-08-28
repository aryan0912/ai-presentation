'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Shuffle, Layers, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AttentionArithmeticPlayer() {
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  // Exact 3-token vectors from Spec §5:
  // tanker = [1, 0]
  // is = [0, 1]
  // late = [1, 1]
  const tokens = isShuffled
    ? [
        { word: 'late', vec: [1, 1], idx: 1 },
        { word: 'is', vec: [0, 1], idx: 2 },
        { word: 'tanker', vec: [1, 0], idx: 3 },
      ]
    : [
        { word: 'tanker', vec: [1, 0], idx: 1 },
        { word: 'is', vec: [0, 1], idx: 2 },
        { word: 'late', vec: [1, 1], idx: 3 },
      ];

  // Dot product calculation for "late" against all 3 words:
  // score(late, tanker) = [1,1]·[1,0] = 1
  // score(late, is)     = [1,1]·[0,1] = 1
  // score(late, late)   = [1,1]·[1,1] = 2
  // Softmax weights:
  // e^1 = 2.718, e^1 = 2.718, e^2 = 7.389 -> sum = 12.825
  // w(tanker) = 2.718 / 12.825 ≈ 0.212 (21.2%)
  // w(is)     = 2.718 / 12.825 ≈ 0.212 (21.2%)
  // w(late)   = 7.389 / 12.825 ≈ 0.576 (57.6%)
  // Blended vector = 0.212*[1,0] + 0.212*[0,1] + 0.576*[1,1] = [0.788, 0.788]

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      {/* Header & Sentence Order Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
            §5 & §6 Deep-Dive · Exact Hand Attention Arithmetic
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Querying the Sentence: &ldquo;{isShuffled ? 'late is tanker' : 'tanker is late'}&rdquo;
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition-all ${
              isShuffled
                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Shuffle size={13} />
            <span>{isShuffled ? 'Order: "late is tanker" (Shuffled)' : 'Test Order: Shuffle Words'}</span>
          </button>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 1, label: '1. Toy Word Vectors' },
          { id: 2, label: '2. Dot-Product Similarity Scores' },
          { id: 3, label: '3. Softmax Attention Weights' },
          { id: 4, label: '4. Blended Context Vector' },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              step === s.id
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Interactive Token Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokens.map((t) => (
          <div
            key={t.word}
            className={`p-4 rounded-xl border transition-all ${
              t.word === 'late'
                ? 'bg-sky-950/40 border-sky-400/80 shadow-lg shadow-sky-500/10'
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold text-white uppercase">&ldquo;{t.word}&rdquo;</span>
              {t.word === 'late' && (
                <span className="px-2 py-0.5 rounded bg-sky-900 text-sky-200 text-[10px] font-bold">
                  Query Focus
                </span>
              )}
            </div>
            <div className="text-slate-400 text-xs font-mono">
              Vector: <span className="text-sky-300 font-bold">[{t.vec[0]}, {t.vec[1]}]</span>
            </div>

            {step >= 2 && (
              <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Dot Score ([1,1]·[{t.vec[0]},{t.vec[1]}])</span>
                  <span className="font-bold text-amber-300">
                    {t.word === 'late' ? '2' : '1'}
                  </span>
                </div>
              </div>
            )}

            {step >= 3 && (
              <div className="mt-1 text-[11px] space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Softmax Weight:</span>
                  <span className="font-bold text-emerald-400">
                    {t.word === 'late' ? '0.576 (57.6%)' : '0.212 (21.2%)'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Calculation Walkthrough Box */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        {step === 1 && (
          <div className="space-y-2">
            <strong className="text-sky-300 block text-sm">Step 1: Assign Illustrative 2D Vectors</strong>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              We represent words as small 2D vectors: <code>tanker = [1, 0]</code>, <code>is = [0, 1]</code>, <code>late = [1, 1]</code>. In real transformers, embeddings are 768 to 4,096 dimensions — we use 2D so we can compute the exact math by hand!
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <strong className="text-amber-300 block text-sm">Step 2: Dot Product Similarity (Query = "late")</strong>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-slate-200">
              <div>&bull; <code>score(late, tanker) = [1, 1] &middot; [1, 0] = (1&times;1) + (1&times;0) = </code><strong className="text-amber-400">1</strong></div>
              <div>&bull; <code>score(late, is) &nbsp; &nbsp; = [1, 1] &middot; [0, 1] = (1&times;0) + (1&times;1) = </code><strong className="text-amber-400">1</strong></div>
              <div>&bull; <code>score(late, late) &nbsp; = [1, 1] &middot; [1, 1] = (1&times;1) + (1&times;1) = </code><strong className="text-amber-400">2</strong></div>
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Higher dot product means higher directional alignment. "Late" has maximum similarity to itself (score 2), and equal partial alignment with "tanker" and "is" (score 1).
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <strong className="text-emerald-300 block text-sm">Step 3: Softmax (Exponentiate & Normalize)</strong>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-slate-200">
              <div>&bull; <code>e^1 = 2.718, &nbsp; e^1 = 2.718, &nbsp; e^2 = 7.389 &rarr; Sum = 12.825</code></div>
              <div>&bull; <code>weight(tanker) = 2.718 / 12.825 = </code><strong className="text-emerald-400">0.212 (21.2%)</strong></div>
              <div>&bull; <code>weight(is) &nbsp; &nbsp; = 2.718 / 12.825 = </code><strong className="text-emerald-400">0.212 (21.2%)</strong></div>
              <div>&bull; <code>weight(late) &nbsp; = 7.389 / 12.825 = </code><strong className="text-emerald-400">0.576 (57.6%)</strong></div>
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Softmax turns any arbitrary raw scores into positive percentages that sum exactly to 100%.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2">
            <strong className="text-purple-300 block text-sm">Step 4: Blend the Vectors (Weighted Sum)</strong>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 text-sm">
              <code>new "late" = (0.212 &times; [1, 0]) + (0.212 &times; [0, 1]) + (0.576 &times; [1, 1])</code>
              <br />
              <code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; = [0.212, 0] + [0, 0.212] + [0.576, 0.576]</code>
              <br />
              <code className="text-purple-300 font-bold text-base mt-1 block">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; = [0.788, 0.788]</code>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              &ldquo;Late&rdquo; just looked at every word in the sentence simultaneously, assigned 58% attention to itself and 21% each to &ldquo;tanker&rdquo; and &ldquo;is&rdquo;, and generated a <strong>context-aware blended vector</strong>.
            </p>
          </div>
        )}
      </div>

      {/* Shuffled Order Insight Callout (§6) */}
      {isShuffled && (
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-200 text-xs font-sans leading-relaxed">
          <strong className="text-rose-300 font-mono block mb-0.5">The Order Problem Revealed (§6):</strong>
          Notice that when we shuffled the sentence to &ldquo;late is tanker&rdquo;, <strong>the attention scores and weights remained completely identical (0.212, 0.212, 0.576)</strong>. Unmodified attention has zero concept of word order! This is why Transformers require <strong>Positional Encoding</strong> — adding a small wave signal to each vector before attention runs so the model knows who came first.
        </div>
      )}

      {/* Honest Q/K/V Projection Caveat */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-sans leading-relaxed">
        <strong className="text-slate-300 font-mono block mb-0.5">Required Honest Note on Real Transformers:</strong>
        Real transformers do not compare raw embeddings directly. Instead, each word vector is multiplied by three learned matrix layers (Query $W_Q$, Key $W_K$, Value $W_V$) — which are literally the exact same $Wx+b$ linear layers from Saturday! We simplified to raw vectors so we could compute the entire forward pass live by hand; the mechanics are identical.
      </div>

    </div>
  );
}
