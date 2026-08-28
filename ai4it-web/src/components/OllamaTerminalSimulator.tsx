'use client';
import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Info, Server, Cpu } from 'lucide-react';

export default function OllamaTerminalSimulator() {
  const [copied, setCopied] = useState(false);
  const [selectedTask, setSelectedTask] = useState<'run' | 'prompt' | 'system'>('run');

  const commands = {
    run: 'ollama run llama3.2:1b',
    prompt: 'ollama run llama3.2:1b "Analyze this error log: [Chilling Tank #4 Temp Spike 8.2C at 03:14 AM] and provide 3 immediate diagnostic checks."',
    system: 'ollama run llama3.2:1b "System: You are NDDB Chilling Center Operations Copilot. User: What is the maximum safe holding temperature for raw milk?"',
  };

  const outputs = {
    run: `pulling manifest
pulling 75e7a9b0c265... 100% ▕████████████████▏ 1.3 GB
verifying sha256 digest
writing manifest
success
>>> Send a message (/? for help)`,
    prompt: `>>> Diagnostic Assessment for Chilling Tank #4 Temperature Spike:

1. Refrigerant & Compressor Status: Check suction pressure on Compressor Unit B. If suction pressure is below 15 psi, inspect for refrigerant leak.
2. Agitator Motor Verification: Confirm the mechanical agitator is rotating. A stopped agitator creates localized thermal stratification.
3. Inflow Valve & Pre-Cooler Bypass: Verify if a fresh warm milk batch was pumped in without plate-cooler pre-chilling.`,
    system: `>>> According to NDDB Dairy Operations Standards:
The maximum safe holding temperature for raw bulk milk is 4.0°C (39.2°F). If raw milk exceeds 4.0°C for more than 2 consecutive hours, bacterial multiplication (psychrotrophic bacteria) accelerates rapidly, risking batch spoilage.`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[selectedTask]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
            §9 Instructor Projector Scaffolding · Local Model Execution
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Ollama CLI Prompter &amp; Diagnostic Exercise
          </h4>
        </div>

        <div className="flex gap-1.5 text-[11px]">
          <button
            onClick={() => setSelectedTask('run')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              selectedTask === 'run' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            1. Pull &amp; Run Model
          </button>
          <button
            onClick={() => setSelectedTask('prompt')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              selectedTask === 'prompt' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            2. Log Analysis Prompt
          </button>
          <button
            onClick={() => setSelectedTask('system')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              selectedTask === 'system' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            3. System Role Framing
          </button>
        </div>
      </div>

      {/* Student Activity Banner */}
      <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/40 text-sky-200 text-xs font-sans flex items-start gap-3">
        <Cpu size={18} className="text-sky-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-mono block mb-0.5">Your Turn — Hands-On Student Activity:</strong>
          Open your terminal / Command Prompt and run the command below on your own laptop hardware. The terminal viewer below is your projector-facing reference to confirm expected outputs and troubleshoot.
        </div>
      </div>

      {/* Copy-Paste Command Box */}
      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-emerald-400 font-bold">$</span>
          <code className="text-white text-sm font-mono whitespace-nowrap">{commands[selectedTask]}</code>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 shrink-0 transition-all font-sans text-xs font-semibold"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copied ? 'Copied!' : 'Copy Command'}</span>
        </button>
      </div>

      {/* Reference Terminal Output Window */}
      <div className="rounded-xl bg-black border border-slate-800 overflow-hidden shadow-2xl">
        <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-300 font-bold">Local Terminal &bull; Reference Output</span>
          </div>
          <span className="text-slate-500 font-mono">localhost:11434</span>
        </div>

        <div className="p-4 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
          {outputs[selectedTask]}
        </div>
      </div>

    </div>
  );
}
