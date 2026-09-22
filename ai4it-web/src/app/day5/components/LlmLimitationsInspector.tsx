'use client';

import React, { useState } from 'react';
import { AlertTriangle, Calculator, Clock, Database, Terminal, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface LimitationTest {
  id: string;
  category: string;
  icon: any;
  prompt: string;
  rawLlmOutput: string;
  isHallucination: boolean;
  explanation: string;
  solutionWithAgent: string;
}

const TESTS: LimitationTest[] = [
  {
    id: 'math',
    category: '1. Math & Arithmetic Blindness',
    icon: Calculator,
    prompt: 'Calculate: 384,912.45 * 87.23 / 1.18 exactly to 4 decimal places.',
    rawLlmOutput: '384,912.45 * 87.23 / 1.18 = 28,454,910.8412',
    isHallucination: true,
    explanation: 'Actual exact answer is 28,454,929.7424! The LLM guessed plausible-looking digits based on statistical sub-word token co-occurrences. LLMs do not execute logic circuits.',
    solutionWithAgent: 'Agent emits a structured tool call to a deterministic Python `eval()` or calculator sandbox. Instant 100% precision.',
  },
  {
    id: 'temporal',
    category: '2. Temporal Blindness & Live State',
    icon: Clock,
    prompt: 'What is the current temperature and load on Chiller BMC-04 right now?',
    rawLlmOutput: 'Chiller BMC-04 is operating normally at approximately 4.2°C with 68% electrical load capacity.',
    isHallucination: true,
    explanation: 'The model has no physical senses or internal clock. It invented a convincing status report because "operating normally at 4.2°C" is statistically typical for chillers in training manuals.',
    solutionWithAgent: 'Agent calls a SCADA/IoT telemetry API endpoint: `get_sensor_reading("BMC-04")`. Returns ground truth.',
  },
  {
    id: 'private_data',
    category: '3. Private Enterprise Data Vacuum',
    icon: Database,
    prompt: 'Which technician is assigned to the Anand chilling center emergency roster tonight?',
    rawLlmOutput: 'Rajesh Sharma is scheduled as the primary technician for the Anand facility for the evening shift.',
    isHallucination: true,
    explanation: 'The model was pre-trained on open web data up to its training cutoff. It has never seen your private NDDB internal roster database unless injected via prompt context or tool.',
    solutionWithAgent: 'Agent queries the internal Postgres/SQLite roster schema with parameterized SQL: `SELECT name FROM roster WHERE date=CURRENT_DATE`.',
  },
  {
    id: 'action',
    category: '4. The Action Vacuum (No Hands)',
    icon: Terminal,
    prompt: 'Raise an urgent P1 Jira ticket to dispatch maintenance to Anand BMC Chiller 2.',
    rawLlmOutput: 'I have successfully raised P1 ticket NDDB-8924 for Anand BMC Chiller 2. The dispatch team has been notified.',
    isHallucination: true,
    explanation: 'The most dangerous failure mode: an AI that claims it took an action it never took! Words on a screen cannot execute HTTP POST requests, create tickets, or reboot servers.',
    solutionWithAgent: 'Agent invokes an authenticated API/MCP action: `create_ticket({ project: "NDDB", priority: "P1", ... })`. Harness logs real response ID.',
  },
];

export default function LlmLimitationsInspector() {
  const [selectedTest, setSelectedTest] = useState<LimitationTest>(TESTS[0]);
  const [revealedFix, setRevealedFix] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TESTS.map((t) => {
          const Icon = t.icon;
          const isSelected = selectedTest.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTest(t);
                setRevealedFix(false);
              }}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-950/50 border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon size={18} />
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                  {t.id.toUpperCase()}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white leading-snug">{t.category}</h4>
            </button>
          );
        })}
      </div>

      {/* Test Playground Card */}
      <div className="glass-card border-slate-800 p-6 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">Test Scenario</span>
          <div className="mt-2 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-xs text-blue-400 font-mono font-bold block mb-1">USER PROMPT TO STANDALONE LLM:</span>
            <p className="text-slate-100 font-medium text-base">"{selectedTest.prompt}"</p>
          </div>
        </div>

        {/* Model's Raw Guess */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-rose-400 font-semibold flex items-center gap-1.5">
              <XCircle size={14} /> Standalone LLM Output (No Tools)
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/60 text-rose-300">
              Confident Hallucination
            </span>
          </div>
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-100 font-mono text-sm leading-relaxed">
            {selectedTest.rawLlmOutput}
          </div>
        </div>

        {/* The Diagnostic Explanation */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle size={15} />
            <span>Why this breaks: Next-Token Probability vs Real Reality</span>
          </div>
          <p className="leading-relaxed">{selectedTest.explanation}</p>
        </div>

        {/* Reveal the Agent Solution */}
        <div className="pt-2">
          {!revealedFix ? (
            <button
              onClick={() => setRevealedFix(true)}
              className="button-primary flex items-center gap-2"
            >
              <span>See How Tool Calling & Agents Fix This</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 size={16} />
                <span>The Agentic Solution (LLM Brain + Concrete Tool Hands)</span>
              </div>
              <p className="text-emerald-100 text-sm leading-relaxed">
                {selectedTest.solutionWithAgent}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
