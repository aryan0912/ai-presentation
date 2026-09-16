'use client';
import React, { useState } from 'react';
import { 
  Network, 
  Globe, 
  LayoutTemplate, 
  Cpu, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Sliders,
  Terminal
} from 'lucide-react';
import Link from 'next/link';

export default function LangflowIntroPage() {
  const [activeStep, setActiveStep] = useState(1);

  const pipelineSteps = [
    {
      id: 1,
      name: '1. Web Scraper / URL Loader',
      icon: <Globe className="text-sky-400" size={20} />,
      nodeType: 'Input Node',
      description: 'Ingests live text from a public web page (or a Raw Text input node for pasted logs).',
      config: 'URL: https://example.com/system-docs or paste sample error logs directly.',
      socketOut: 'Text (Output)'
    },
    {
      id: 2,
      name: '2. Prompt Template Node',
      icon: <LayoutTemplate className="text-amber-400" size={20} />,
      nodeType: 'Transform Node',
      description: 'The Aha Moment: Connect the morning\'s R-C-I-I-O-C framework! Typing {webpage_text} dynamically spawns an input socket on the node canvas.',
      config: `Role: You are an IT systems analyst.
Context: The following text was extracted from a web source: {webpage_text}
Instruction: Analyze the system architecture and list potential security vulnerabilities.
Output Format: Output as a JSON object with keys "summary" and "vulnerabilities".`,
      socketIn: 'webpage_text (Dynamic Input)',
      socketOut: 'Prompt Value (Output)'
    },
    {
      id: 3,
      name: '3. LLM Model Node',
      icon: <Cpu className="text-purple-400" size={20} />,
      nodeType: 'Brain Node',
      description: 'Connects to an inference engine. Works seamlessly with local Ollama (phi3:mini / llama3.2:3b) or cloud OpenRouter/OpenAI.',
      config: 'Provider: Ollama (http://localhost:11434) or OpenRouter / OpenAI. Model: llama3.2:3b / gpt-4o-mini',
      socketIn: 'Input (from Prompt Template)',
      socketOut: 'Text / Message (Output)'
    },
    {
      id: 4,
      name: '4. Text / Chat Output',
      icon: <MessageSquare className="text-emerald-400" size={20} />,
      nodeType: 'Output Node',
      description: 'Displays the parsed JSON or synthesized IT analysis directly in the interactive playground.',
      config: 'View output in the Playground side panel or raw socket inspector.',
      socketIn: 'Input (from LLM Node)'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 3 · Block 2 (Pre-Lunch: 11:30–01:30)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Meet Langflow: Visual Prompt Pipelines
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Langflow is not coding—it is <strong>visual plumbing</strong> for the prompts you just engineered this morning. We build an initial 4-node pipeline before lunch to verify your environment and de-risk the afternoon.
        </p>
      </div>

      {/* Pre-Lunch Milestone Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-purple-950/40 border border-sky-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">Goal Before Lunch</span>
            <h3 className="text-xl font-bold text-white mt-1">Leave for Lunch with a Green-Lit Pipeline</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              By building a simple 4-node pipeline now, we resolve any local port conflicts, browser issues, or model endpoints early. When we return at 02:30 for full RAG, Langflow is already familiar.
            </p>
          </div>
          <div className="shrink-0 p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-emerald-400 flex items-center gap-2">
            <CheckCircle2 size={16} /> 0 Port Errors · 0 Blockers
          </div>
        </div>
      </div>

      {/* Canvas Anatomy Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Network className="text-sky-400" />
            1. Langflow Canvas Anatomy
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Understanding the 4 basic elements of any visual AI workflow:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-800 flex items-center justify-center text-sky-400 font-mono font-bold text-sm mb-3">
              1
            </div>
            <h4 className="font-bold text-white text-base">Nodes</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Discrete functional units: Loaders, Embedders, Vector Stores, Prompts, and LLMs.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-800 flex items-center justify-center text-amber-400 font-mono font-bold text-sm mb-3">
              2
            </div>
            <h4 className="font-bold text-white text-base">Sockets</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Left = Inputs, Right = Outputs. Color-coded by datatype (String, Document, Embedding, Model).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800 flex items-center justify-center text-purple-400 font-mono font-bold text-sm mb-3">
              3
            </div>
            <h4 className="font-bold text-white text-base">Parameters</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Knobs inside each node: Temperature, Chunk Size, Model Name, and API URLs.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm mb-3">
              4
            </div>
            <h4 className="font-bold text-white text-base">Playground</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Interactive test interface in the bottom-right to test prompts without writing code.
            </p>
          </div>
        </div>
      </section>

      {/* Pipeline 1 Visual Walkthrough */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sliders className="text-amber-400" />
            2. Pipeline 1: Webpage & Text Analyzer (4 Nodes)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Click through each node to see how the morning's prompt framework connects directly into the canvas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Node Selection List */}
          <div className="lg:col-span-5 space-y-3">
            {pipelineSteps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive 
                      ? 'bg-slate-800 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.2)]' 
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      {step.icon}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{step.name}</div>
                      <div className="text-xs text-slate-500">{step.nodeType}</div>
                    </div>
                  </div>
                  <ArrowRight size={16} className={`transition-transform ${isActive ? 'text-sky-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>

          {/* Detailed Node Inspector */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    {pipelineSteps[activeStep - 1].icon}
                    <h3 className="text-lg font-bold text-white">{pipelineSteps[activeStep - 1].name}</h3>
                  </div>
                  <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">
                    {pipelineSteps[activeStep - 1].nodeType}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {pipelineSteps[activeStep - 1].description}
                </p>

                {/* Configuration / Socket Display */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Configuration / Prompt</span>
                    <pre className="mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap">
                      {pipelineSteps[activeStep - 1].config}
                    </pre>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {pipelineSteps[activeStep - 1].socketIn && (
                      <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-mono uppercase text-sky-400 block">Input Socket (In)</span>
                        <span className="text-xs text-slate-300 font-mono">{pipelineSteps[activeStep - 1].socketIn}</span>
                      </div>
                    )}
                    {pipelineSteps[activeStep - 1].socketOut && (
                      <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-mono uppercase text-emerald-400 block">Output Socket (Out)</span>
                        <span className="text-xs text-slate-300 font-mono">{pipelineSteps[activeStep - 1].socketOut}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {activeStep === 2 && (
                <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-300 flex items-start gap-2">
                  <span className="font-bold shrink-0">💡 Note:</span>
                  <span>Notice how typing <code>{`{webpage_text}`}</code> inside the Prompt Template automatically created the socket on the left. This turns hardcoded text into an automated pipeline!</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Pre-Lunch Verification Checklist */}
      <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Terminal className="text-emerald-400" />
          3. Room Verification & Rescue Checklist
        </h2>
        <p className="text-sm text-slate-400">
          Before heading to lunch, confirm every item on this checklist is green on your machine:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">Langflow Web UI Accessible</h4>
              <p className="text-xs text-slate-400 mt-1">Running on <code>http://localhost:7860</code> without port collision.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">Model Provider Responding</h4>
              <p className="text-xs text-slate-400 mt-1">Ollama running on <code>http://localhost:11434</code> (or valid OpenRouter API key entered).</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">Pipeline 1 Ran Successfully</h4>
              <p className="text-xs text-slate-400 mt-1">Hit 'Play' and saw structured JSON or analysis returned in the output socket.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">Flow Saved to Workspace</h4>
              <p className="text-xs text-slate-400 mt-1">Flow named <code>Webpage_Analyzer_v1</code> and saved for future reference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="p-8 rounded-2xl border border-sky-500/30 bg-sky-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-sky-400 font-bold">Next Phase · Post-Lunch (02:30)</span>
          <h3 className="text-2xl font-bold text-white mt-1">Upgrading to Full Document RAG</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Now that prompts can be wired visually, what happens when we replace static webpage input with 500 pages of internal PDFs? We need RAG plumbing.
          </p>
        </div>

        <Link href="/day3/rag-plumbing" className="button-primary shrink-0 flex items-center gap-2">
          Explore RAG Architecture <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
