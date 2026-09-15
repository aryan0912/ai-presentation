'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Sparkles, 
  Sliders, 
  Copy, 
  Check, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  RotateCcw,
  FileCode,
  ArrowRight
} from 'lucide-react';

interface PromptBlock {
  key: string;
  name: string;
  badge: string;
  color: string;
  border: string;
  bg: string;
  description: string;
  activeText: string;
}

const BLOCKS: PromptBlock[] = [
  {
    key: 'role',
    name: 'Role',
    badge: 'R',
    color: 'text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-950/20',
    description: 'Defines seniority, technical domain lens, and responsibility.',
    activeText: 'You are a senior database administrator with 15 years of PostgreSQL production experience.'
  },
  {
    key: 'context',
    name: 'Context',
    badge: 'C',
    color: 'text-sky-400',
    border: 'border-sky-500/40',
    bg: 'bg-sky-950/20',
    description: 'Background environment, table scale, and operational SLAs.',
    activeText: 'Context: This query runs every 5 minutes on a table with 40M rows. It currently takes 45 seconds. Target SLA is under 200 milliseconds.'
  },
  {
    key: 'instruction',
    name: 'Instruction',
    badge: 'I',
    color: 'text-emerald-400',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-950/20',
    description: 'Precise task required from the model.',
    activeText: 'Instruction: Analyze the query execution plan and recommend the single most impactful composite index.'
  },
  {
    key: 'input',
    name: 'Input Data',
    badge: 'I',
    color: 'text-amber-400',
    border: 'border-amber-500/40',
    bg: 'bg-amber-950/20',
    description: 'Raw query, schema snippet, or logs under inspection.',
    activeText: 'Input Query:\nSELECT chiller_id, status, AVG(temp_celsius)\nFROM sensor_telemetry\nWHERE recorded_at > NOW() - INTERVAL \'24 hours\' AND alert_flag = TRUE\nGROUP BY chiller_id, status;'
  },
  {
    key: 'output',
    name: 'Output Format',
    badge: 'O',
    color: 'text-rose-400',
    border: 'border-rose-500/40',
    bg: 'bg-rose-950/20',
    description: 'Strict schema specification (JSON) for programmatic parsing.',
    activeText: 'Output Format: Return ONLY a valid JSON object with keys: "index_statement", "estimated_speedup_pct", "risk_level", "rationale". No markdown prose, no preamble.'
  },
  {
    key: 'constraints',
    name: 'Constraints',
    badge: 'C',
    color: 'text-indigo-400',
    border: 'border-indigo-500/40',
    bg: 'bg-indigo-950/20',
    description: 'Non-negotiable boundaries and guardrails.',
    activeText: 'Constraints: Do NOT alter existing table schemas or column definitions. Do NOT suggest query rewrites that change aggregation logic.'
  }
];

const NAMED_PATTERNS = [
  {
    name: 'Persona Pattern',
    tag: 'Auditor Lens',
    desc: 'Forces strict enterprise compliance or security audit behavior.',
    example: 'You are a strict security auditor. Review this Dockerfile and flag anything violating CIS benchmarks.'
  },
  {
    name: 'Template Pattern',
    tag: 'Deterministic Structure',
    desc: 'Locks output into rigid fields without relying on complex schemas.',
    example: 'Fill this exact template without commentary: [Symptom] / [Root Cause] / [Immediate Hotfix] / [Permanent Prevention].'
  },
  {
    name: 'Recipe Pattern',
    tag: 'Step-by-Step Guardrail',
    desc: 'Enforces execution sequence so the model avoids hallucinating shortcuts.',
    example: 'Step 1: Read the syslog. Step 2: Classify exception type. Step 3: Map to runbook SOP-402. Step 4: Output action list.'
  },
  {
    name: 'Error-Explainer',
    tag: 'Audience Calibration',
    desc: 'Calibrates tone and baseline technical depth to the reader.',
    example: 'Explain this PostgreSQL deadlock trace to an on-call junior SRE who knows basic SQL but not engine lock semantics.'
  },
  {
    name: 'Auditor Pattern',
    tag: 'Multi-Criteria Flagging',
    desc: 'Applies discrete criteria scoring for mission-critical IT tasks.',
    example: 'Audit this Bash script: (1) Exploitable vulnerabilities, (2) Privilege escalation risks, (3) Missing error trapping.'
  }
];

export default function PromptWorkbench() {
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({
    role: true,
    context: true,
    instruction: true,
    input: true,
    output: true,
    constraints: true
  });
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleKey = (key: string) => {
    setActiveKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setAll = (val: boolean) => {
    setActiveKeys({
      role: val,
      context: val,
      instruction: val,
      input: val,
      output: val,
      constraints: val
    });
  };

  const activeCount = Object.values(activeKeys).filter(Boolean).length;

  const assembledPrompt = BLOCKS
    .filter(b => activeKeys[b.key])
    .map(b => b.activeText)
    .join('\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(assembledPrompt || 'My database is slow, what should I do?');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSimulatedOutput = () => {
    if (activeCount === 6) {
      return (
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-emerald-400 border-b border-emerald-950/60 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} /> Deterministic JSON Output
            </span>
            <span className="text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 text-emerald-300">
              Parsable by Automation Script
            </span>
          </div>
          <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed bg-slate-950/90 p-3 rounded-lg border border-emerald-900/30 overflow-x-auto">
{`{
  "index_statement": "CREATE INDEX idx_sensor_telemetry_chiller_temp ON sensor_telemetry (alert_flag, recorded_at DESC) INCLUDE (chiller_id, temp_celsius);",
  "estimated_speedup_pct": "98.2%",
  "risk_level": "LOW",
  "rationale": "Index eliminates the full table scan across 40M rows by filtering directly on the high-selectivity alert_flag predicate and pre-sorting recorded_at."
}`}
          </pre>
          <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800 flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span>Adheres to all constraints: Zero schema alterations, zero logic modifications, strictly bounded latency.</span>
          </div>
        </div>
      );
    }

    if (!activeKeys.output) {
      return (
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between text-amber-400 border-b border-amber-950/60 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <AlertCircle size={14} /> Output Format Missing
            </span>
            <span className="text-[10px] bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40 text-amber-300">
              Unstructured Prose
            </span>
          </div>
          <div className="text-slate-300 leading-relaxed space-y-2 bg-slate-950/90 p-3 rounded-lg border border-amber-900/30">
            <p>Here are several thoughts on optimizing your database. First, you should look into creating an index on the table, perhaps on <code>recorded_at</code> or <code>alert_flag</code>. In addition, you might want to consider partitioning the 40 million row table by month to improve maintenance cycles.</p>
            <p className="text-slate-400 italic">"It could also be beneficial to check whether your buffer pool size is configured appropriately in postgresql.conf..."</p>
          </div>
          <div className="text-[11px] text-rose-400 bg-rose-950/30 p-2.5 rounded border border-rose-900/30 flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>Failure: Monitoring or CI/CD scripts cannot parse conversational paragraphs.</span>
          </div>
        </div>
      );
    }

    if (!activeKeys.constraints) {
      return (
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between text-rose-400 border-b border-rose-950/60 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <AlertCircle size={14} /> Constraints Missing
            </span>
            <span className="text-[10px] bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/40 text-rose-300">
              Unbounded Risky Suggestion
            </span>
          </div>
          <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950/90 p-3 rounded-lg border border-rose-900/30 overflow-x-auto font-mono">
{`{
  "recommendation": "ALTER TABLE sensor_telemetry DROP COLUMN payload; REINDEX TABLE sensor_telemetry;",
  "speedup": "High",
  "note": "We recommend completely re-architecting this table into a Redis time-series stream."
}`}
          </pre>
          <div className="text-[11px] text-rose-400 bg-rose-950/30 p-2.5 rounded border border-rose-900/30 flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>Severe: Model suggested dropping production columns because no negative boundary was defined.</span>
          </div>
        </div>
      );
    }

    if (activeCount <= 2) {
      return (
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <AlertCircle size={14} className="text-rose-500" /> Naive Generic Response
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
              Generic Web Search Result
            </span>
          </div>
          <div className="text-slate-400 leading-relaxed bg-slate-950/90 p-3 rounded-lg border border-slate-800 space-y-2">
            <p>Databases can become slow for several reasons: 1. Lack of appropriate indexes. 2. Low disk I/O or insufficient RAM. 3. Locks and blocking queries. 4. Outdated query planner statistics.</p>
            <p>Try running <code>ANALYZE</code> or check your slow query log to identify bottleneck operations.</p>
          </div>
          <div className="text-[11px] text-slate-500 bg-slate-900/40 p-2 rounded border border-slate-800">
            Zero actionable value for an NDDB production incident: no table scale context, no schema understanding.
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between text-sky-400 border-b border-sky-950/60 pb-2">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <AlertCircle size={14} /> Partially Degraded Output
          </span>
          <span className="text-[10px] bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/40 text-sky-300">
            Missing Context / Role
          </span>
        </div>
        <div className="text-slate-300 bg-slate-950/90 p-3 rounded-lg border border-sky-900/30 space-y-2">
          <p>Without SLA context or full role constraints, the model produces generic index suggestions without considering write penalties on high-throughput inserts.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 rounded-3xl bg-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold mb-1">
            <Sliders size={14} /> Interactive Prompt Laboratory
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">The R-C-I-I-O-C Specification Engine</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Toggle prompt parameters to see how removing dimensions degrades model execution from production JSON to unusable prose.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAll(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
              activeCount === 6 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Active ({activeCount}/6)
          </button>
          <button
            onClick={() => setAll(false)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Reset (Naive)
          </button>
        </div>
      </div>

      {/* 6 Dimension Selector Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {BLOCKS.map(block => {
          const isActive = activeKeys[block.key];
          return (
            <button
              key={block.key}
              onClick={() => toggleKey(block.key)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive 
                  ? `${block.bg} ${block.border} shadow-lg shadow-black/40 ring-1 ring-white/10` 
                  : 'bg-slate-900/40 border-slate-800/80 opacity-50 hover:opacity-80'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                  isActive ? `${block.color} bg-slate-900/90 border border-white/10` : 'text-slate-500 bg-slate-800'
                }`}>
                  {block.badge}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' : 'bg-slate-800 text-slate-500'
                }`}>
                  {isActive ? 'ON' : 'OFF'}
                </span>
              </div>
              <div>
                <div className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {block.name}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {block.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Prompt Assembly vs Live Execution Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Assembled Prompt */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold">
              <Terminal size={14} className="text-sky-400" />
              <span>Constructed System Prompt</span>
              <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {activeCount} of 6 components active
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
            </button>
          </div>

          <div className="p-4 flex-1 space-y-3 font-mono text-xs overflow-y-auto max-h-[380px]">
            {activeCount === 0 ? (
              <div className="text-slate-500 italic p-6 text-center">
                "My database is running slow, what should I do?"
                <span className="block text-[11px] text-slate-600 mt-1">(Naive zero-context baseline prompt)</span>
              </div>
            ) : (
              BLOCKS.map(block => (
                <AnimatePresence key={block.key}>
                  {activeKeys[block.key] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-3 rounded-lg border ${block.border} ${block.bg} space-y-1`}
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${block.color} flex items-center gap-1.5`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        [{block.name}]
                      </span>
                      <p className="text-slate-200 whitespace-pre-wrap leading-relaxed text-xs">
                        {block.activeText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))
            )}
          </div>
        </div>

        {/* Right: Simulated Model Output */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold">
              <Cpu size={14} className="text-purple-400" />
              <span>Model Execution Telemetry</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Temp: 0.1</span>
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto max-h-[380px]">
            {renderSimulatedOutput()}

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Execution Determinism:</span>
              <span className={`font-mono font-bold ${activeCount === 6 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {activeCount === 6 ? 'High (Strict Schema)' : 'Low (Conversational Drift)'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 5 Named IT Patterns Reference */}
      <div className="pt-6 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode size={18} className="text-indigo-400" />
              Five Named Patterns for IT Operations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Production blueprints built on the R-C-I-I-O-C foundation. Click any pattern to inspect the prompt formula.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {NAMED_PATTERNS.map((p, idx) => {
            const isSel = selectedPattern === idx;
            return (
              <button
                key={p.name}
                onClick={() => setSelectedPattern(isSel ? null : idx)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSel 
                    ? 'bg-indigo-950/40 border-indigo-500 text-white ring-1 ring-indigo-500/50' 
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-indigo-400 font-semibold mb-1 uppercase tracking-wider">
                  {p.tag}
                </div>
                <div className="font-bold text-xs text-white mb-1.5">{p.name}</div>
                <p className="text-[11px] text-slate-400 leading-snug">{p.desc}</p>
              </button>
            );
          })}
        </div>

        {selectedPattern !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-slate-900 border border-indigo-800/50 text-xs space-y-2"
          >
            <div className="flex items-center justify-between text-indigo-300 font-mono font-bold">
              <span>{NAMED_PATTERNS[selectedPattern].name} Implementation Sample:</span>
              <button 
                onClick={() => setSelectedPattern(null)}
                className="text-[10px] text-slate-500 hover:text-white"
              >
                Close
              </button>
            </div>
            <pre className="text-slate-200 bg-slate-950 p-3 rounded font-mono whitespace-pre-wrap border border-slate-800">
              {NAMED_PATTERNS[selectedPattern].example}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}
