'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  BrainCircuit,
  Cpu,
  ShieldAlert,
  Sparkles,
  Database,
  ArrowRight,
  Layers,
  HardDrive,
  Radio,
  Map,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  RotateCw
} from 'lucide-react';
import PretextRenderer from '@/components/PretextRenderer';
import NestedRings from '@/components/NestedRings';

export default function Home() {
  const [activeSpec, setActiveSpec] = useState<'narrow' | 'general' | 'super'>('narrow');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const specData = {
    narrow: {
      title: 'Narrow AI (ANI - Artificial Narrow Intelligence)',
      badge: '100% of Today’s Production AI',
      desc: 'AI that excels at specific, bounded tasks: spam filtering, tabular regression, chess, ChatGPT, computer vision, code generation. Every system in enterprise production today belongs here.',
      takeaway: 'Not a limitation: Narrow AI already delivers billions in business value daily.'
    },
    general: {
      title: 'General AI (AGI - Artificial General Intelligence)',
      badge: 'Hypothetical / Active Research',
      desc: 'Hypothetical AI that possesses human-level cognitive ability across any domain, capable of self-directed learning and transfer reasoning without retraining. Timelines are actively debated.',
      takeaway: 'Does not exist today in any laboratory or vendor product.'
    },
    super: {
      title: 'Super AI (ASI - Artificial Superintelligence)',
      badge: 'Theoretical Horizon',
      desc: 'Hypothetical AI that vastly exceeds human cognitive ability across science, creativity, and wisdom. Purely speculative philosophical concept.',
      takeaway: 'Mentioned only to complete the theoretical academic taxonomy.'
    }
  };

  const terminologyCards = [
    {
      term: 'Model',
      phonetic: 'The Trained Artifact',
      desc: 'A mathematical function with millions (or billions) of tunable parameters (weights and biases) that maps inputs to outputs.',
      analogy: 'Think of it as a compiled binary file containing the learned logic.'
    },
    {
      term: 'Training',
      phonetic: 'The Optimization Process',
      desc: 'The computational process of adjusting model parameters iteratively via gradient descent until prediction error is minimized.',
      analogy: 'Like running compiler passes and calibration runs against historical logs.'
    },
    {
      term: 'Inference',
      phonetic: 'Serving Predictions',
      desc: 'Running a frozen, trained model against new, live operational data to produce an instant prediction or classification.',
      analogy: 'Executing the compiled software during production runtime.'
    },
    {
      term: 'Weights & Biases',
      phonetic: 'The Tunable Parameters',
      desc: 'The numerical coefficients inside matrix layers that dictate the strength of connections between features.',
      analogy: 'When a model has "70B parameters", it literally has 70 billion floating-point numbers.'
    },
    {
      term: 'Dataset',
      phonetic: 'The Ground Truth Grounding',
      desc: 'Curated historical observations split into Training (learning patterns), Validation (tuning hyperparameters), and Test (honest evaluation) sets.',
      analogy: 'The raw telemetry, sensor logs, and labeled records fed to the algorithms.'
    }
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="space-y-24 pb-24">
      
      {/* Cold Open / Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-[75vh] flex flex-col justify-center max-w-5xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold w-fit mb-6">
          <span>NDDB ICT Intensive AI Workshop · 6 Days</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          What is AI, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Really?</span>
        </h1>

        <PretextRenderer
          text="A grounded, mathematically honest introduction to Artificial Intelligence for IT infrastructure, dairy operations, and enterprise systems engineers."
          className="text-xl sm:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-8"
        />

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/course-map" className="button-primary text-base px-6 py-3">
            <Map size={18} /> View 6-Day Architecture Map
          </Link>
          <Link href="/day1/linear-regression" className="button-secondary text-base px-6 py-3">
            Start Day 1: Linear Regression <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* Section 1: Evolution of AI */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={sectionVariants}
        className="space-y-8"
      >
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">Chronological Evolution</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">From Rules to Foundations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-slate-500 font-bold block mb-1">1950s–1980s</span>
              <h3 className="text-lg font-bold text-white mb-2">Rule-Based Systems</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Expert systems, decision trees, hardcoded logic. If/else statements written manually by human domain specialists.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              Legacy Expert Systems
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-purple-400 font-bold block mb-1">1990s–2010s</span>
              <h3 className="text-lg font-bold text-white mb-2">Machine Learning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Statistical algorithms (regression, random forests, SVMs) that discover mathematical formulas directly from data.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-300">
              Today's Focus (Day 1)
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-pink-400 font-bold block mb-1">2010s–2020</span>
              <h3 className="text-lg font-bold text-white mb-2">Deep Learning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multi-layer neural networks enabled by GPUs and massive datasets. Computer vision, speech recognition, and embeddings.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-pink-300">
              Weekend 1 · Day 2
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-950/30 border border-blue-500/40 hover:border-blue-400 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">2020–Present</span>
              <h3 className="text-lg font-bold text-white mb-2">Generative AI &amp; LLMs</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Transformers, Large Language Models (LLMs), multimodal reasoning, RAG architectures, and autonomous IT agents.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-800/40 text-[11px] font-mono text-emerald-300">
              Weekends 2 &amp; 3 (Days 3–6)
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-400 italic font-mono">
          "We did not discard the older techniques — modern AI architectures stack on top of them. Linear regression is running inside every transformer layer."
        </p>
      </motion.section>

      {/* Section 2: Interactive Flip Cards (Core Terminology) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={sectionVariants}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">Fundamental Vocabulary</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Core Terminology (Click to Flip)</h2>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:block">5 Essential Concepts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {terminologyCards.map((card, i) => {
            const isFlipped = !!flippedCards[i];
            return (
              <div
                key={card.term}
                onClick={() => toggleFlip(i)}
                className="cursor-pointer h-[220px] [perspective:1000px]"
              >
                <div
                  className={`relative w-full h-full duration-500 [transform-style:preserve-3d] transition-transform ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 [backface-visibility:hidden] p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block mb-1">Term #{i + 1}</span>
                      <h4 className="text-xl font-bold text-white mb-1">{card.term}</h4>
                      <span className="text-[11px] text-slate-400 font-mono block">{card.phonetic}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-3 border-t border-slate-800">
                      <span>Click to flip</span>
                      <RotateCw size={12} className="text-slate-400" />
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-5 rounded-2xl bg-blue-950 border border-blue-400/60 flex flex-col justify-between text-xs text-slate-200">
                    <p className="leading-relaxed font-sans">{card.desc}</p>
                    <p className="text-[11px] text-sky-300 font-mono italic pt-2 border-t border-blue-900/60">{card.analogy}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Section 3: The Nested Rings (Inscribed Circles) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={sectionVariants}
        className="space-y-6"
      >
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">Taxonomy &amp; Hierarchy</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">The Nested Rings of AI</h2>
          <p className="text-sm text-slate-400 mt-1">
            Every ring is a strict mathematical subset of the one containing it:
          </p>
        </div>

        {/* Dedicated Inscribed Rings Visualizer */}
        <NestedRings />
      </motion.section>

      {/* Section 4: Spectrum of Capability */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={sectionVariants}
        className="space-y-8"
      >
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400">Enterprise Reality Check</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">The Spectrum of Capability</h2>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          {/* 3 Step Spectrum Track */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            {(['narrow', 'general', 'super'] as const).map((key) => {
              const active = activeSpec === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSpec(key)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    active
                      ? 'bg-blue-950/60 border-blue-400 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-sky-300">
                      {key === 'narrow' ? '1. Narrow AI (ANI)' : key === 'general' ? '2. General AI (AGI)' : '3. Super AI (ASI)'}
                    </span>
                    {key === 'narrow' && (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                        WE ARE HERE
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block">{specData[key].badge}</span>
                </button>
              );
            })}
          </div>

          {/* Active Detail Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpec}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
            >
              <h4 className="text-xl font-bold text-white">{specData[activeSpec].title}</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{specData[activeSpec].desc}</p>
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs font-mono text-blue-200">
                <strong>Executive Takeaway: </strong> {specData[activeSpec].takeaway}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Section 5: Current Enterprise Trends */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={sectionVariants}
        className="space-y-8"
      >
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">Market &amp; Industry Direction</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Current Trends in Enterprise IT</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-blue-400 mb-3">
                <Sparkles size={22} />
                <h4 className="text-lg font-bold text-white">LLMs &amp; Copilots</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Large language models embedded directly into developer IDEs and terminal shells for code review and log parsing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-blue-300">
              IT Use: Script drafting &amp; log digestion
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-purple-400 mb-3">
                <Cpu size={22} />
                <h4 className="text-lg font-bold text-white">Autonomous Agents</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Models that do not merely answer questions — they take actions via system tools, REST APIs, and database queries.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-300">
              IT Use: Automated alert diagnosis &amp; remediation
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-emerald-400 mb-3">
                <Database size={22} />
                <h4 className="text-lg font-bold text-white">RAG Architectures</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retrieval-Augmented Generation grounding models in NDDB private documentation and SOPs to prevent hallucinations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-300">
              IT Use: Datacenter runbook retrieval
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-indigo-400 mb-3">
                <Layers size={22} />
                <h4 className="text-lg font-bold text-white">Multi-Modal Models</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unified neural networks that ingest text, server rack diagrams, telemetry charts, and system screenshots simultaneously.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-indigo-300">
              IT Use: Diagnostic screenshot analysis
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-sky-500/40 hover:border-sky-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-sky-400 mb-3">
                <Radio size={22} />
                <h4 className="text-lg font-bold text-white">Edge AI Deployment</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Small, efficient models running directly on local chilling center micro-servers with zero cloud dependency.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-300">
              Dairy Use: BMC intake scoring during WAN outage
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/40 hover:border-amber-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-amber-400 mb-3">
                <HardDrive size={22} />
                <h4 className="text-lg font-bold text-white">Small Language Models (SLMs)</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-efficiency 1B–3B parameter models running on standard CPU servers with zero external token costs and complete data privacy.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-300">
              IT Use: On-prem privacy-preserving log parsing
            </div>
          </div>
        </div>

        {/* Enterprise IT Framing Quote */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-blue-500/30 text-xs md:text-sm text-slate-300 leading-relaxed font-mono">
          <strong className="text-white block mb-1">
            "Shifting enterprise IT from a reactive cost centre to a proactive, automated intelligence hub."
          </strong>
          That is the strategic promise. By Day 6, you will be equipped to evaluate and architect exactly how to execute this for NDDB.
        </div>
      </motion.section>

      {/* Section 6: Next Steps / Curriculum Transition */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={sectionVariants}
        className="p-10 rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-950/40 via-slate-950 to-blue-950/40 text-center space-y-6"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
          Ready to Begin Weekend 1
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Explore the Roadmap &amp; Reference Architecture
        </h2>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          See the 6-day curriculum arc, the 3-phase journey (Predict → Generate → Operate), and our reference system: the <strong>Chilling Center Copilot</strong>.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/course-map" className="button-primary text-base px-8 py-3">
            <Map size={18} /> The 6-Day Course Map
          </Link>
          <Link href="/day1/dairy-ai" className="button-secondary text-base px-8 py-3">
            AI in Dairy Ecosystem <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>

    </div>
  );
}
