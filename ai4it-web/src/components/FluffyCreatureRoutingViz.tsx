'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Play } from 'lucide-react';

export default function FluffyCreatureRoutingViz() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const sentence = [
    { text: "A", pos: "det", role: "Determiner" },
    { text: "fluffy", pos: "adj", role: "Adjective (Key)" },
    { text: "blue", pos: "adj", role: "Adjective (Key)" },
    { text: "creature", pos: "noun", role: "Noun (Query Focus)" },
    { text: "roamed", pos: "verb", role: "Verb" },
    { text: "the", pos: "det", role: "Determiner" },
    { text: "verdant", pos: "adj", role: "Adjective" },
    { text: "forest", pos: "noun", role: "Noun" },
  ];

  const steps = [
    {
      title: "1. Raw Embeddings Arrive in Parallel",
      desc: "Every word enters as an isolated vector point. 'Creature' has a generic dictionary representation—it could be a reptilian monster, an alien, or an insect.",
      action: "Isolated Tokens",
    },
    {
      title: "2. The Query Asks: 'Any adjectives describing me?'",
      desc: "'creature' is projected by W_Q into a Query vector. It broadcasts a question backwards across the sentence: 'Are there descriptive adjectives modifying me?'",
      action: "Query Emitted",
    },
    {
      title: "3. Keys Respond: 'We are adjectives!'",
      desc: "'fluffy' and 'blue' are projected by W_K into Key vectors that match 'noun modifier'. Their dot-product compatibility scores spike to 84% and 78%!",
      action: "Compatibility Match",
    },
    {
      title: "4. Value Payload Passed & Residual Update (ΔE)",
      desc: "'fluffy' and 'blue' pass their Value vectors (texture & color semantics). Attention adds this ΔE directly into 'creature's embedding: now it specifically means 'fluffy blue creature'!",
      action: "Contextual Enriched",
    },
  ];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500" />

      {/* Header & Step Navigator */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <Sparkles size={14} />
            <span>3B1B Act 3 · Grammatical Routing Metaphor</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Attention in Action: &ldquo;A fluffy blue creature...&rdquo;
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            How Query, Key, and Value matrices route descriptive context between words in parallel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep(0)}
            disabled={activeStep === 0}
            className="p-2 text-slate-400 hover:text-white disabled:opacity-30"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={activeStep === steps.length - 1}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg disabled:opacity-30 transition-all shadow-md shadow-sky-600/20"
          >
            <span>{activeStep === steps.length - 1 ? 'Complete' : 'Next Step'}</span>
            <Play size={14} className="fill-current" />
          </button>
        </div>
      </div>

      {/* Current Step Description Callout */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <span className="text-sky-400 font-bold text-xs">{steps[activeStep].title}</span>
        <p className="text-slate-300 font-sans text-xs leading-relaxed">
          {steps[activeStep].desc}
        </p>
      </div>

      {/* Sentence Strip with Dynamic Attention Arcs */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-8 relative overflow-hidden">
        {/* Token Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 relative z-10">
          {sentence.map((token, idx) => {
            const isCreature = token.text === 'creature';
            const isFluffyOrBlue = token.text === 'fluffy' || token.text === 'blue';
            const isForest = token.text === 'forest';
            const isVerdant = token.text === 'verdant';

            let highlightStyle = 'bg-slate-950 text-slate-400 border-slate-800';

            if (activeStep >= 1 && isCreature) {
              highlightStyle = 'bg-rose-950/80 text-rose-300 border-rose-500 shadow-lg shadow-rose-500/20 scale-105';
            } else if (activeStep >= 2 && isFluffyOrBlue) {
              highlightStyle = 'bg-amber-950/80 text-amber-300 border-amber-500 shadow-lg shadow-amber-500/20 scale-105';
            } else if (activeStep === 3 && isCreature) {
              highlightStyle = 'bg-purple-950/90 text-purple-200 border-purple-400 shadow-xl shadow-purple-500/30 scale-110';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div className={`px-4 py-2.5 rounded-xl border font-bold text-sm transition-all duration-300 ${highlightStyle}`}>
                  {token.text}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {token.role.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Attention Arcs Diagram */}
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 600 120" className="w-full max-w-[550px] h-[90px] overflow-visible select-none">
            <defs>
              <marker id="arcArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker id="arcArrowPurple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#c084fc" />
              </marker>
            </defs>

            {/* Arc from fluffy to creature */}
            {activeStep >= 2 && (
              <motion.path
                d="M 120 40 Q 180 -10 240 40"
                fill="none"
                stroke="#f59e0b"
                strokeWidth={activeStep === 3 ? 3 : 2}
                strokeDasharray={activeStep === 2 ? "4 4" : "none"}
                markerEnd="url(#arcArrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
            )}

            {/* Arc from blue to creature */}
            {activeStep >= 2 && (
              <motion.path
                d="M 180 40 Q 210 10 240 40"
                fill="none"
                stroke="#38bdf8"
                strokeWidth={activeStep === 3 ? 3 : 2}
                strokeDasharray={activeStep === 2 ? "4 4" : "none"}
                markerEnd="url(#arcArrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            )}

            {/* Labels */}
            {activeStep >= 2 && (
              <text x="180" y="80" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                {activeStep === 3 ? "Value Payload Transferred (ΔE added)" : "High Q · K Dot-Product Compatibility"}
              </text>
            )}
          </svg>
        </div>
      </div>

      {/* Role Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-rose-400 font-bold block text-xs">Query (creature):</span>
          <p className="text-slate-400 text-[11px] font-sans">
            &ldquo;I am a singular noun looking for pre-nominal adjectives.&rdquo;
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-amber-400 font-bold block text-xs">Keys (fluffy &amp; blue):</span>
          <p className="text-slate-400 text-[11px] font-sans">
            &ldquo;We are descriptive adjectives that precede nouns.&rdquo;
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-purple-400 font-bold block text-xs">Result (Updated Vector):</span>
          <p className="text-slate-300 text-[11px] font-sans">
            Vector(&ldquo;creature&rdquo;) moves toward fuzzy, blue animal semantics!
          </p>
        </div>
      </div>
    </div>
  );
}
