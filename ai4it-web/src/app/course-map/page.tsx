'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  MessageSquare,
  Bot,
  ArrowRight,
  ShieldAlert,
  Server,
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ChevronRight,
  Radio,
  BookOpen
} from 'lucide-react';
import InstructorNote from '@/components/InstructorNote';

// Currently teaching Day 1
const CURRENT_DAY = 1;

interface CapabilityCardData {
  id: string;
  title: string;
  days: string;
  phase: string;
  phaseColor: string;
  unlocked: boolean;
  whatItDoes: string;
  whatItNeeds: string;
  whatItCosts: string;
  howItFails: string;
  nddbRole: string;
}

export default function CourseMapPage() {
  const [selectedCapability, setSelectedCapability] = useState<string>('predict');
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  const capabilities: Record<string, CapabilityCardData> = {
    predict: {
      id: 'predict',
      title: '1. PREDICT: Milk Collection Forecaster',
      days: 'Days 1–2',
      phase: 'PREDICTS',
      phaseColor: '#60a5fa',
      unlocked: true,
      whatItDoes: 'Forecasts tomorrow\'s milk intake per BMC (Bulk Milk Chilling Center) based on historical collection cycles, temperature, and day of week.',
      whatItNeeds: '90 days of structured collection records, ~50 MB database table, zero GPU compute required.',
      whatItCosts: 'Effectively $0.00 — runs on a standard CPU node in under 5 milliseconds via deterministic NumPy math.',
      howItFails: 'Confidently wrong during sudden religious festivals, flash strikes, or unexpected dairy cooperative policy changes not captured in linear features.',
      nddbRole: 'Allows tanker dispatchers to right-size collection routes 18 hours in advance, reducing spoiled milk and diesel waste.'
    },
    answer: {
      id: 'answer',
      title: '2. ANSWER: SOP Knowledge Assistant',
      days: 'Days 3–4',
      phase: 'TALKS',
      phaseColor: '#a78bfa',
      unlocked: CURRENT_DAY >= 3,
      whatItDoes: 'Answers technical and procedural questions about NDDB chiller maintenance, milk testing protocols, and ICT troubleshooting using grounded RAG.',
      whatItNeeds: 'Vector database (e.g. pgvector/Qdrant), chunked PDF manuals, embedding model API, and LLM inference endpoint.',
      whatItCosts: 'Real API cost scaling with queries (~$0.002 to $0.01 per query via OpenRouter/Azure) or dedicated on-prem GPU inference server.',
      howItFails: 'Hallucinates outdated procedures if document versioning is messy; retrieval fails on ambiguous abbreviations (e.g., conflicting BMC codes).',
      nddbRole: 'Gives field engineers immediate 24/7 access to accurate chiller maintenance steps in vernacular language.'
    },
    act: {
      id: 'act',
      title: '3. ACT: Autonomous Incident Responder',
      days: 'Days 5–6',
      phase: 'ACTS',
      phaseColor: '#34d399',
      unlocked: CURRENT_DAY >= 5,
      whatItDoes: 'Monitors temperature telemetry alerts, verifies against historical norms, contacts the duty technician, and creates a prioritized ITSM ticket autonomously.',
      whatItNeeds: 'ReAct agent execution loop, secure tool APIs (ITSM, SMS gateway, SCADA read access), strict human-in-the-loop permission bounds.',
      whatItCosts: 'Highest cost — multiple LLM reasoning turns per incident ($0.03-$0.15/event) + robust monitoring infrastructure.',
      howItFails: 'Infinite tool execution loops on intermittent API timeout errors; false-positive mass ticket creation during network storms.',
      nddbRole: 'Closes the loop from raw sensor alarm to logged maintenance ticket in seconds without waiting for human triage.'
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-16">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-950/40 border border-blue-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Syllabus Roadmap · 10 min Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          The 6-Day Architecture Map
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          One reference system explored across six intensive days. We move from statistical numerical forecasting to semantic retrieval, autonomous agent actions, and enterprise governance.
        </p>

        <InstructorNote
          timing="10 minutes (09:30 - 09:40)"
          aloudQuestion="Look at these three words: Predicts, Talks, Acts. Which of these three does your current IT infrastructure already do, and where are you feeling the pressure to expand?"
          expectedWrongAnswers={[
            "Participants may think they will be required to write Python neural network code from scratch. Clarify immediately that their role is system architect: specifying, judging, and auditing.",
            "Some may ask why the Copilot is not built hands-on: emphasize that cost, stability, and enterprise evaluation skills make 'reading and judging' the highest-leverage skill."
          ]}
          instructorTip="Emphasize that the PREDICT phase (Days 1-2) runs completely live right now with zero LLM API cost, while Days 3-6 demonstrate full architecture."
        />
      </div>

      {/* Section A: One System, Six Days */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Section A</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">One System, Three Phases, Six Days</h2>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">Click any phase to inspect topics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Phase 1 */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => setExpandedPhase(1)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              expandedPhase === 1
                ? 'bg-blue-950/30 border-blue-400 shadow-xl shadow-blue-500/10'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Days 1–2
              </span>
              <TrendingUp className="text-blue-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">1. PREDICTS</h3>
            <p className="text-xs text-blue-300 font-mono mb-3">Forecasts tomorrow's collection</p>
            <p className="text-sm text-slate-300 mb-4">
              Deterministic mathematical models. We fit lines, add activation kinks, stack layers, and introduce sequential memory.
            </p>
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <div>• Day 1: Linear Regression &amp; Neurons</div>
              <div>• Day 2: RNNs, Embeddings &amp; Transformers</div>
            </div>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => setExpandedPhase(2)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              expandedPhase === 2
                ? 'bg-purple-950/30 border-purple-400 shadow-xl shadow-purple-500/10'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                Days 3–4
              </span>
              <MessageSquare className="text-purple-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">2. TALKS</h3>
            <p className="text-xs text-purple-300 font-mono mb-3">Answers questions over private SOPs</p>
            <p className="text-sm text-slate-300 mb-4">
              Probabilistic language generation. Zero/few-shot prompts, RAG chunking, vector embeddings, and ERP/DMS integration.
            </p>
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <div>• Day 3: Advanced Prompt Engineering</div>
              <div>• Day 4: RAG Pipeline &amp; Enterprise APIs</div>
            </div>
          </motion.div>

          {/* Phase 3 */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => setExpandedPhase(3)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              expandedPhase === 3
                ? 'bg-emerald-950/30 border-emerald-400 shadow-xl shadow-emerald-500/10'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Days 5–6
              </span>
              <Bot className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">3. ACTS</h3>
            <p className="text-xs text-emerald-300 font-mono mb-3">Autonomously triggers tools &amp; alerts</p>
            <p className="text-sm text-slate-300 mb-4">
              Autonomous agent reasoning loops. Tool calling, automated incident triage, DPDPA compliance, and on-prem hardware sizing.
            </p>
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <div>• Day 5: Agent Loops, Tools &amp; Security</div>
              <div>• Day 6: Hardware, Governance &amp; Roadmap</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section B: Meet the Reference Copilot */}
      <section className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <Radio size={14} className="animate-pulse" />
            <span>Demonstrated Reference Architecture</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Meet the Chilling Center Copilot</h2>
          <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">Our Engineering Stance: </strong>
            "You are not going to write raw Python code or build this Copilot piece by piece. You are going to understand it well enough to <strong>specify it, judge it, stress-test it, and decide whether it belongs in your part of NDDB</strong>. By Day 6, you will be able to point at any box in this diagram and state exactly what is inside it, what it costs to run, and how it fails."
          </div>
        </div>

        {/* Interactive SVG Diagram */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col items-center">
          <svg viewBox="0 0 760 260" className="w-full max-w-2xl overflow-visible select-none">
            {/* Top Node: Copilot Master */}
            <rect x="250" y="10" width="260" height="50" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="380" y="34" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14" fontFamily="sans-serif">
              Chilling Center Copilot
            </text>
            <text x="380" y="49" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
              Unified ICT &amp; Operational Assistant
            </text>

            {/* Connecting Lines */}
            <path d="M 380 60 L 380 90 L 130 90 L 130 120" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 380 60 L 380 120" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 380 60 L 380 90 L 630 90 L 630 120" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />

            {/* Box 1: PREDICT */}
            <g
              onClick={() => setSelectedCapability('predict')}
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect
                x="30"
                y="120"
                width="200"
                height="65"
                rx="8"
                fill={selectedCapability === 'predict' ? '#1e3a8a' : '#0f172a'}
                stroke="#60a5fa"
                strokeWidth={selectedCapability === 'predict' ? 2.5 : 1.5}
              />
              <text x="130" y="145" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="13">
                [ 1. PREDICT ]
              </text>
              <text x="130" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                Forecast Intake (Days 1–2)
              </text>
              <text x="130" y="176" textAnchor="middle" fill="#94a3b8" fontSize="9">
                90-day historical tabular data
              </text>
            </g>

            {/* Box 2: ANSWER */}
            <g
              onClick={() => setSelectedCapability('answer')}
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect
                x="280"
                y="120"
                width="200"
                height="65"
                rx="8"
                fill={selectedCapability === 'answer' ? '#3b0764' : '#0f172a'}
                stroke="#a78bfa"
                strokeWidth={selectedCapability === 'answer' ? 2.5 : 1.5}
              />
              <text x="380" y="145" textAnchor="middle" fill="#a78bfa" fontWeight="bold" fontSize="13">
                [ 2. ANSWER ]
              </text>
              <text x="380" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                RAG over SOPs (Days 3–4)
              </text>
              <text x="380" y="176" textAnchor="middle" fill="#94a3b8" fontSize="9">
                Chiller manuals &amp; maintenance docs
              </text>
            </g>

            {/* Box 3: ACT */}
            <g
              onClick={() => setSelectedCapability('act')}
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect
                x="530"
                y="120"
                width="200"
                height="65"
                rx="8"
                fill={selectedCapability === 'act' ? '#064e3b' : '#0f172a'}
                stroke="#34d399"
                strokeWidth={selectedCapability === 'act' ? 2.5 : 1.5}
              />
              <text x="630" y="145" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="13">
                [ 3. ACT ]
              </text>
              <text x="630" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                Tools &amp; Agents (Days 5–6)
              </text>
              <text x="630" y="176" textAnchor="middle" fill="#94a3b8" fontSize="9">
                Automated ticketing &amp; alerts
              </text>
            </g>

            {/* Bottom Feeds */}
            <text x="130" y="210" textAnchor="middle" fill="#64748b" fontSize="10">↓ Collection Database</text>
            <text x="380" y="210" textAnchor="middle" fill="#64748b" fontSize="10">↓ SOP Document Base</text>
            <text x="630" y="210" textAnchor="middle" fill="#64748b" fontSize="10">↓ ITSM / SMS Gateway</text>
          </svg>

          <span className="text-xs text-slate-500 mt-2 font-mono">
            Click any subsystem box above to inspect its engineering specification card below
          </span>
        </div>

        {/* 4-Field Specification Card */}
        {selectedCapability && (
          <motion.div
            key={selectedCapability}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 border-slate-700/80"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-5">
              <div>
                <span className="text-xs font-mono font-bold" style={{ color: capabilities[selectedCapability].phaseColor }}>
                  {capabilities[selectedCapability].days} Roadmap Subsystem
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{capabilities[selectedCapability].title}</h3>
              </div>
              <span
                className="text-xs font-mono font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${capabilities[selectedCapability].phaseColor}20`,
                  color: capabilities[selectedCapability].phaseColor,
                  border: `1px solid ${capabilities[selectedCapability].phaseColor}50`
                }}
              >
                {capabilities[selectedCapability].phase}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field 1: What it does */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase mb-1">
                  <CheckCircle2 size={14} />
                  <span>1. What It Does</span>
                </div>
                <p className="text-sm text-slate-200">{capabilities[selectedCapability].whatItDoes}</p>
                <div className="mt-2 text-xs text-slate-400 italic">
                  <strong>NDDB Value: </strong>{capabilities[selectedCapability].nddbRole}
                </div>
              </div>

              {/* Field 2: What it needs */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase mb-1">
                  <Server size={14} />
                  <span>2. What It Needs</span>
                </div>
                <p className="text-sm text-slate-200">{capabilities[selectedCapability].whatItNeeds}</p>
              </div>

              {/* Field 3: What it costs */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
                  <DollarSign size={14} />
                  <span>3. What It Costs</span>
                </div>
                <p className="text-sm text-slate-200 font-mono text-xs leading-relaxed">{capabilities[selectedCapability].whatItCosts}</p>
              </div>

              {/* Field 4: How it fails (Mandatory & Critical) */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase mb-1">
                  <AlertTriangle size={14} />
                  <span>4. How It Fails (Failure Modes)</span>
                </div>
                <p className="text-sm text-rose-200 leading-relaxed">{capabilities[selectedCapability].howItFails}</p>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Section C: Ground Rules */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section C</span>
          <h2 className="text-2xl font-bold text-white">Workshop Ground Rules</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
            <h4 className="text-base font-bold text-blue-300 mb-1">1. Specify &amp; Judge, Not Coding</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              You will describe system intent, inspect outputs, and judge whether calculations make business sense.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
            <h4 className="text-base font-bold text-purple-300 mb-1">2. Daily Retrieval Quiz</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every morning opens with a 5-minute un-graded concept check. Active retrieval cements memory far better than re-reading.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
            <h4 className="text-base font-bold text-rose-300 mb-1">3. Nothing Is Production-Ready</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We will deliberately flag three times why a POC demo would break in production (Note #1 today, #2 on RAG, #3 on Agents).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
            <h4 className="text-base font-bold text-emerald-300 mb-1">4. Gap-Week Antigravity Homework</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Take one daily routine task, describe it to Google Antigravity, and bring the result (even if broken) to the next weekend.
            </p>
          </div>
        </div>
      </section>

      {/* Section D: Bridge */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Section D · The Bridge</span>
          <h3 className="text-2xl font-bold text-white mt-1">Ready to start with Dairy Context?</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            "The Copilot's first job is to predict. And every prediction machine in AI is a descendant of one 200-year-old idea. First, let's explore where AI already touches the Dairy Ecosystem."
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/day1/dairy-ai" className="button-primary">
            Next: AI in Dairy Ecosystem <ArrowRight size={16} />
          </Link>
          <Link href="/day1/linear-regression" className="button-secondary">
            Skip to Linear Regression
          </Link>
        </div>
      </div>

    </div>
  );
}
