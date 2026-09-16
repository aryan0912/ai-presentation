'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, CheckCircle, TerminalSquare, Settings2, ShieldCheck, HelpCircle, Braces, ArrowRight } from 'lucide-react';
import PromptWorkbench from '@/components/PromptWorkbench';

const CopyBlock = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group mt-2">
      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
        {text}
      </pre>
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copy to clipboard"
      >
        {copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default function PromptingFrameworkPage() {
  const [activeStep, setActiveStep] = useState(6);

  const steps = [
    { label: 'Role', content: 'You are a senior DBA reviewing a slow query.', color: 'text-purple-400' },
    { label: 'Context', content: 'This query runs every 5 minutes on a table with 40M rows.', color: 'text-sky-400' },
    { label: 'Instruction', content: 'Suggest an index that would speed this up.', color: 'text-emerald-400' },
    { label: 'Input Data', content: 'SELECT * FROM chiller_logs WHERE status="ERR" AND temp > 40;', color: 'text-amber-400' },
    { label: 'Output', content: 'Respond with just the CREATE INDEX statement, one line.', color: 'text-rose-400' },
    { label: 'Constraints', content: 'Do not suggest rewriting the query itself.', color: 'text-indigo-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 3 · Block 2</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          The Structure of a Good Prompt
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Stop treating the AI like a search engine. Treat it like a junior engineer who just joined the team today: they are smart, but they have zero context about your systems unless you provide it.
        </p>
      </div>

      {/* R-C-I-I-O-C Framework */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2">1. The R-C-I-I-O-C Framework & Interactive Workbench</h2>
        <PromptWorkbench />
      </section>

      {/* Manual Step Inspection */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2">2. Step-by-Step Prompt Stripping</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <p className="text-sm text-slate-400 mb-4">
              Watch what happens to the output quality when you strip pieces out of the prompt. Use the slider to add/remove context.
            </p>
            <input 
              type="range" 
              min="1" 
              max="6" 
              value={activeStep}
              onChange={(e) => setActiveStep(parseInt(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-sm space-y-3 min-h-[300px]">
              {steps.map((step, idx) => (
                <div key={step.label} className={`transition-all duration-300 ${idx < activeStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                  <span className={`font-bold uppercase ${step.color} w-32 inline-block`}>{step.label}:</span>
                  <span className="text-slate-300">{step.content}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">Predicted LLM Output</h3>
            
            <div className="text-slate-300 italic text-sm">
              {activeStep === 1 && "I am ready to help. Please provide a query to review."}
              {activeStep === 2 && "A 40M row table needs indexing on filtered columns. What is the query?"}
              {activeStep === 3 && "Without seeing the query, I recommend indexing the columns used in your WHERE clause."}
              {activeStep === 4 && "CREATE INDEX idx_chiller_status_temp ON chiller_logs (status, temp); ... I also recommend rewriting the query to..."}
              {activeStep === 5 && "CREATE INDEX idx_chiller_status_temp ON chiller_logs (status, temp);\n\nNote: You could also rewrite..."}
              {activeStep === 6 && "CREATE INDEX idx_chiller_status_temp ON chiller_logs (status, temp);"}
            </div>
          </div>

        </div>
      </section>

      {/* The 5 Named Patterns */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2">2. Five Named Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="font-bold text-sky-400 mb-2 flex items-center gap-2"><Settings2 size={16}/> Persona</h3>
            <p className="text-xs text-slate-400">Frames the tone and depth of expertise.</p>
            <div className="mt-3 p-2 bg-slate-950 text-xs font-mono text-slate-300 rounded border border-slate-800">"You are a senior SOC analyst..."</div>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><TerminalSquare size={16}/> Template</h3>
            <p className="text-xs text-slate-400">Forces a specific layout.</p>
            <div className="mt-3 p-2 bg-slate-950 text-xs font-mono text-slate-300 rounded border border-slate-800">"Fill this exact structure: Symptom / Cause / Fix"</div>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="font-bold text-purple-400 mb-2 flex items-center gap-2"><CheckCircle size={16}/> Recipe</h3>
            <p className="text-xs text-slate-400">Forces sequential execution.</p>
            <div className="mt-3 p-2 bg-slate-950 text-xs font-mono text-slate-300 rounded border border-slate-800">"Step 1: read log. Step 2: identify class..."</div>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="font-bold text-rose-400 mb-2 flex items-center gap-2"><HelpCircle size={16}/> Error-Explainer</h3>
            <p className="text-xs text-slate-400">Translates tech-jargon to plain English.</p>
            <div className="mt-3 p-2 bg-slate-950 text-xs font-mono text-slate-300 rounded border border-slate-800">"Explain this stack trace to a junior dev..."</div>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="font-bold text-orange-400 mb-2 flex items-center gap-2"><ShieldCheck size={16}/> Auditor</h3>
            <p className="text-xs text-slate-400">Finds flaws instead of generating code.</p>
            <div className="mt-3 p-2 bg-slate-950 text-xs font-mono text-slate-300 rounded border border-slate-800">"Review this Ansible playbook for security flaws..."</div>
          </div>
        </div>
      </section>

      {/* Structured Output Centerpiece */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <Braces className="text-emerald-400" />
          3. The Centerpiece: Structured Output
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl">
          A script cannot parse <em>"Well, it depends on a few factors."</em> It can parse <code>{`{"root_cause": "disk_full"}`}</code>. This is the actual skill that turns an LLM from a chat toy into IT infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900 border border-rose-900/50 rounded-2xl space-y-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest font-mono">The Bad Output</span>
            <div className="p-4 bg-slate-950 rounded-lg text-sm text-slate-300 italic border border-slate-800">
              "Based on the logs provided, it looks like the Mehsana-Rural chiller went offline at 14:02. The probable cause is a grid failure, though the temperature spike might also indicate..."
            </div>
            <p className="text-xs font-mono text-rose-400/80 bg-rose-950/30 p-2 rounded">Error: Cannot feed into automated systemsto a Python automation script.</p>
          </div>

          <div className="p-6 bg-slate-900 border border-emerald-900/50 rounded-2xl space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">The Structured Output</span>
            <div className="p-4 bg-slate-950 rounded-lg text-sm text-emerald-300 font-mono whitespace-pre border border-emerald-900/50">
{`{
  "chiller_id": "Mehsana-Rural",
  "offline_time": "14:02:00",
  "root_cause": "grid_failure",
  "confidence": 0.95
}`}
            </div>
            <p className="text-xs font-mono text-emerald-400/80 bg-emerald-950/30 p-2 rounded">Production-ready: `json.loads()` and automated ticket creation.</p>
          </div>
        </div>
      </section>

      {/* Hands-On Exercises */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2">4. Hands-on Exercises</h2>
        <p className="text-slate-400 text-sm">
          Copy these raw IT inputs and try to craft prompts in your tool (ChatGPT/Claude/Gemini) that achieve the requested goal.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
            <h3 className="font-bold text-white mb-2">Exercise 1: Draft an SOP</h3>
            <p className="text-xs text-slate-400 mb-4">Turn this rough bullet list into a formal SOP paragraph for chilling-center compressor maintenance.</p>
            <div className="mt-auto">
              <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500">Raw Input</span>
              <CopyBlock text={`- check oil levels
- if oil black, drain it
- replace filter (part #AF-400)
- refill synthetic oil 5W-40
- turn on, check pressure > 40psi
- log it in the book`} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
            <h3 className="font-bold text-white mb-2">Exercise 2: Parse Raw Log (JSON)</h3>
            <p className="text-xs text-slate-400 mb-4">Extract structured fields (timestamp, center, error code, severity) as JSON from this messy log.</p>
            <div className="mt-auto">
              <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500">Raw Input</span>
              <CopyBlock text={`[2024-06-12 14:02:44] WARN - system-mon - node=MEH-RURAL-01 - Temp spike detected: 42C (threshold 38C). ErrCode: THRM-88. Cooling cycle aborted. Retrying in 5m.`} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
            <h3 className="font-bold text-white mb-2">Exercise 3: Extract Ticket Fields</h3>
            <p className="text-xs text-slate-400 mb-4">Extract category, urgency (High/Med/Low), and a 1-sentence summary as JSON.</p>
            <div className="mt-auto">
              <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500">Raw Input</span>
              <CopyBlock text={`User: "The Anand North chiller dashboard is totally blank. Just a white screen. I tried refreshing but nothing happens. The trucks are coming in 20 mins and I need to record the temperatures!!"`} />
            </div>
          </div>

        </div>
      </section>

      {/* The Limitation Reveal: Bridge to Langflow & RAG */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/30 border border-rose-900/50 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
          <span>The Limitation Reveal · The Bridge to Langflow</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          "Now ask your tool about your internal plant SOP..."
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
          Try this in ChatGPT, Claude, or Gemini: <em>"What is the exact escalation procedure when Anand Chilling Center Tank #3 temperature exceeds 8°C?"</em>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-rose-400 text-sm">What Happens:</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The model either hallucinates generic refrigeration advice or admits it doesn't know. No amount of "role playing" or "chain of thought" can summon documents it was never trained on.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 text-sm">The Core Takeaway:</h4>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "You cannot prompt your way out of missing knowledge. Missing knowledge requires architecture."
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Link href="/day3/langflow-intro" className="button-primary flex items-center gap-2 text-sm">
            Transition to Langflow Pipelines <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}

