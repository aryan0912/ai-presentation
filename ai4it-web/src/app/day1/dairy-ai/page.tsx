'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity,
  Truck,
  Thermometer,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Radio,
  WifiOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Building,
  CheckCircle2
} from 'lucide-react';
import InstructorNote from '@/components/InstructorNote';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';

interface ChainStage {
  id: string;
  name: string;
  icon: any;
  appTitle: string;
  appDesc: string;
  isHero?: boolean;
  metrics: string;
  itAngle: string;
}

export default function DairyAiPage() {
  const [selectedStage, setSelectedStage] = useState<string>('chilling');

  const stages: ChainStage[] = [
    {
      id: 'farmer',
      name: '1. Farmer & Village',
      icon: Activity,
      appTitle: 'Cattle Health & Vernacular Services',
      appDesc: 'Computer vision diagnostics for livestock disease detection; voice-activated conversational bots in regional languages for farmer queries.',
      metrics: 'Over 10M+ cooperative dairy farmers requiring localized support in 12+ Indian languages.',
      itAngle: 'Demands lightweight edge processing and low-bandwidth speech-to-text integration.'
    },
    {
      id: 'collection',
      name: '2. Milk Collection Point',
      icon: Layers,
      appTitle: 'Procurement Records & Yield Forecasting',
      appDesc: 'Automated digital weighing, ultrasonic fat/SNF testing integration, and localized morning/evening yield pattern projection.',
      metrics: 'Twice-daily micro-transactions feeding central ERP systems.',
      itAngle: 'Real-time sync to central databases with local SQLite buffering during WAN drops.'
    },
    {
      id: 'chilling',
      name: '3. Bulk Chilling Center (BMC)',
      icon: Thermometer,
      isHero: true,
      appTitle: 'Cold-Chain Predictive Monitoring (Our Core Example)',
      appDesc: 'Predicting milk temperature rise, compressor power failures, and tomorrow intake volume before milk spoils.',
      metrics: 'Critical temperature window: Milk must drop below 4°C within 3 hours to prevent bacterial spoilage.',
      itAngle: 'Runs directly at the edge! This is the core reference scenario we dissect across Days 1–6.'
    },
    {
      id: 'transport',
      name: '4. Insulated Tanker Transport',
      icon: Truck,
      appTitle: 'Chain Traceability & Route Optimization',
      appDesc: 'GPS telemetry, thermal sensor streaming, dynamic route recalculation for insulated milk road tankers.',
      metrics: 'Zero-loss logistics across rural road networks spanning hundreds of kilometers.',
      itAngle: 'Time-series telemetry ingestion, geospatial anomaly detection, and driver alert dispatching.'
    },
    {
      id: 'processing',
      name: '5. Dairy Processing Plant',
      icon: ShieldCheck,
      appTitle: 'Automated Quality Testing & Batch Scheduling',
      appDesc: 'Automated spectral adulteration screening, milk packaging quality inspection, and automated pasteurization scheduling.',
      metrics: 'Massive multi-million-litre daily throughput balancing butterfat, pouch milk, and milk powder production.',
      itAngle: 'SCADA system integration with neural network computer vision QA lines.'
    },
    {
      id: 'cooperative',
      name: '6. Cooperative HQ & Apex Union',
      icon: Building,
      appTitle: 'Supply Chain Intelligence & Analytics',
      appDesc: 'Federated district-level demand forecasting, seasonal flush/lean planning, and automated milk producer payment reconciliation.',
      metrics: 'Enterprise ERP, DMS, and BI reporting across all union federations.',
      itAngle: 'Large-scale RAG over enterprise documentation and automated financial anomaly auditing.'
    }
  ];

  const current = stages.find((s) => s.id === selectedStage) || stages[2];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-16">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Module 1 Requirement · 20 min Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          AI in the Dairy Ecosystem
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Why National Dairy Development Board (NDDB) IT is uniquely positioned for AI: moving from transactional record-keeping to cold-chain predictive intelligence and edge resilience.
        </p>

        <InstructorNote
          timing="20 minutes (09:40 - 10:00)"
          aloudQuestion="How many Bulk Milk Chilling Centers in your federation have reliable fiber internet versus intermittent 4G/cellular connections?"
          expectedWrongAnswers={[
            "Assumption that AI always runs in Microsoft Azure or AWS. Anchor immediately that remote BMCs require on-prem/edge computing (small models, local inference) because internet connectivity in rural districts can drop for hours."
          ]}
          instructorTip="Point to Stage 3 (Chilling Center) and emphasize: 'This is the exact node we follow through linear regression today, neural nets tomorrow, and RAG in Weekend 2.'"
        />
      </div>

      {/* Section A: Present Tense Chain */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Section A · Present Tense</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Where AI Touches the Dairy Supply Chain Today</h2>
          <p className="text-sm text-slate-400 mt-1">Click each stage of the physical dairy pipeline to inspect the active AI implementation:</p>
        </div>

        {/* Chain Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center ${
                  isSelected
                    ? stage.isHero
                      ? 'bg-blue-950/60 border-blue-400 shadow-lg shadow-blue-500/20 ring-2 ring-blue-400/30'
                      : 'bg-sky-950/40 border-sky-400 shadow-md'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg mb-2 ${
                    isSelected
                      ? stage.isHero
                        ? 'bg-blue-500 text-white'
                        : 'bg-sky-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span className="text-xs font-bold text-white leading-tight">{stage.name}</span>
                {stage.isHero && (
                  <span className="mt-1.5 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Course Focus 🥛
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border ${
            current.isHero
              ? 'bg-blue-950/30 border-blue-500/40'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">{current.name}</span>
              <h3 className="text-2xl font-bold text-white mt-0.5">{current.appTitle}</h3>
            </div>
            {current.isHero && (
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 font-semibold">
                ★ The Running Thread of This Workshop
              </span>
            )}
          </div>

          <p className="text-base text-slate-200 leading-relaxed mb-5">{current.appDesc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <strong className="text-sky-300 block mb-1">Operational Scale &amp; Scope:</strong>
              <p className="text-slate-400">{current.metrics}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <strong className="text-purple-300 block mb-1">ICT &amp; Systems Engineering Implication:</strong>
              <p className="text-slate-400">{current.itAngle}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section B: Future Tense (Honest Reality Check) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Section B · Future Tense</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">The Future of AI in Dairy: Honest Technical Assessment</h2>
          <p className="text-sm text-slate-400 mt-1">
            Required by Module 1 syllabus — presented with complete engineering honesty. None of these are "push-button" shipping solutions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Future Item 1 */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                  Status: Research / Early Trials
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">1. Autonomous Supply Chain Coordination</h4>
              <p className="text-xs text-slate-300 mb-4">
                Routing, tanker dispatching, and milk diversion dynamically adjusting themselves in real time without dispatcher intervention.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div><strong>What exists:</strong> Static GPS tracking &amp; manual dispatch tables.</div>
              <div><strong>What's missing:</strong> Real-time telematics integration across diverse union fleets.</div>
              <div><strong>What it takes:</strong> Unified IoT data middleware + agentic decision guardrails.</div>
            </div>
          </div>

          {/* Future Item 2 */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                  Status: Lab Pilot
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">2. Real-Time Inline Quality Testing</h4>
              <p className="text-xs text-slate-300 mb-4">
                Instantaneous spectral/chemical adulterant diagnostics during milk tipping, replacing 15-minute bench testing.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div><strong>What exists:</strong> Benchtop spectrophotometers in district labs.</div>
              <div><strong>What's missing:</strong> Inexpensive, ruggedized inline sensor probes for BMCs.</div>
              <div><strong>What it takes:</strong> Edge calibration ML models hardened for temperature fluctuations.</div>
            </div>
          </div>

          {/* Future Item 3 */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  Status: Rapid Progress
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">3. Conversational Vernacular Producer Interfaces</h4>
              <p className="text-xs text-slate-300 mb-4">
                A milk producer speaking Gujarati, Hindi, or Marathi over WhatsApp voice to receive passbook summaries and veterinary advice.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div><strong>What exists:</strong> SMS alerts and manual call centers.</div>
              <div><strong>What's missing:</strong> Hallucination-free veterinary advice verified against dairy manuals.</div>
              <div><strong>What it takes:</strong> RAG architectures grounded in NDDB veterinary SOPs (Day 4).</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section C: The Edge AI Hook */}
      <section className="p-8 rounded-3xl border border-sky-500/30 bg-sky-950/20 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-2">
          <Radio size={16} className="text-sky-400" />
          <span>Section C · The Edge Constraint</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Why "Edge AI" is Mandatory for Dairy IT
        </h3>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-w-4xl">
          <p>
            A Bulk Milk Chilling Center is a classic <strong>edge site</strong>. It is located in a rural village with intermittent cellular connectivity, no server room, dusty operating conditions, and no on-site systems engineer to reboot a crashing microservice.
          </p>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20 text-white font-medium">
            "That single constraint rules out 80% of what vendors pitch when they say 'just use cloud AI APIs.' If your chilling center loses internet for 4 hours during a monsoon storm, your milk must still be cooled, and your temperature monitoring must never freeze."
          </div>
          <p>
            This is why <strong>Small Language Models (SLMs) and deterministic edge mathematics (like the linear regression we will study in 5 minutes)</strong> are the real backbone of resilient enterprise IT.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-sky-800/40 flex flex-wrap items-center gap-4 text-xs font-mono text-sky-300">
          <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Zero Per-Token API Billing</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Zero Outbound Data Leakage</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Sub-millisecond CPU Latency</span>
        </div>
      </section>

      {/* Section D: Bridge */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Section D · The Technical Bridge</span>
          <h3 className="text-2xl font-bold text-white mt-1">Starting from First Principles</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            "Cold-chain collection prediction is the simplest of all of these, and it's the one we can build up from first principles. Let's start there — with the oldest prediction method there is."
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/antigravity" className="button-secondary">
            Next: Antigravity Setup <ArrowRight size={16} />
          </Link>
          <Link href="/day1/linear-regression" className="button-primary">
            Start Linear Regression (65m) <ArrowRight size={16} />
          </Link>
        </div>
      </div>

    </div>
  );
}
