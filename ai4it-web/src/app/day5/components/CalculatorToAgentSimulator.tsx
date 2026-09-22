'use client';

import React, { useState } from 'react';
import { Calculator, Database, ShieldAlert, Cpu, ArrowRight, Play, CheckCircle2, RefreshCw } from 'lucide-react';

export default function CalculatorToAgentSimulator() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepFinished, setStepFinished] = useState<boolean>(false);

  // Step 1: Calculator
  const [calcInput, setCalcInput] = useState('14285.70 * 18.5 / 100');
  
  // Step 2: Unsafe SQL
  const [sqlPrompt, setSqlPrompt] = useState('Clean up all old telemetry records before 2024');

  // Step 3: Parameterized Safe Tool
  const [selectedBmc, setSelectedBmc] = useState('BMC-04');
  const [hoursBack, setHoursBack] = useState('6');

  const runSimulation = () => {
    setIsRunning(true);
    setStepFinished(false);
    setTimeout(() => {
      setIsRunning(false);
      setStepFinished(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* 3 Steps Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => {
            setActiveStep(1);
            setStepFinished(false);
          }}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeStep === 1
              ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-500/10'
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Calculator size={18} className="text-purple-400" />
            <span className="text-xs font-mono font-bold uppercase text-purple-400">Rung 1: The Simplest Tool</span>
          </div>
          <h4 className="text-sm font-semibold text-white">The Deterministic Calculator</h4>
          <p className="text-xs text-slate-400 mt-1">Stops arithmetic hallucinations cold.</p>
        </button>

        <button
          onClick={() => {
            setActiveStep(2);
            setStepFinished(false);
          }}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeStep === 2
              ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/10'
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert size={18} className="text-rose-400" />
            <span className="text-xs font-mono font-bold uppercase text-rose-400">Rung 2: The Trap</span>
          </div>
          <h4 className="text-sm font-semibold text-white">Free-Form SQL Generation</h4>
          <p className="text-xs text-slate-400 mt-1">Why giving raw DB write access destroys tables.</p>
        </button>

        <button
          onClick={() => {
            setActiveStep(3);
            setStepFinished(false);
          }}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeStep === 3
              ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Database size={18} className="text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase text-emerald-400">Rung 3: The Architecture Fix</span>
          </div>
          <h4 className="text-sm font-semibold text-white">Parameterized Safe Queries</h4>
          <p className="text-xs text-slate-400 mt-1">Read-only parameterized tools with type contracts.</p>
        </button>
      </div>

      {/* Interactive Simulation Box */}
      <div className="glass-card border-slate-800 p-6 space-y-6">
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Rung 1: Calculator Execution</span>
              <span className="text-xs text-slate-400 font-mono">Input $\to$ JSON tool call $\to$ Python math</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs text-slate-400 font-mono">Arithmetic Prompt Expression:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={calcInput}
                  onChange={(e) => setCalcInput(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm flex-1"
                />
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="button-primary flex items-center gap-1.5"
                >
                  <Play size={14} />
                  <span>Execute Tool</span>
                </button>
              </div>
            </div>

            {isRunning && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
                <RefreshCw size={14} className="animate-spin text-purple-400" />
                <span>Harness parsing tool call and computing exact float result...</span>
              </div>
            )}

            {stepFinished && (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 font-mono text-xs space-y-2">
                  <div className="text-purple-300 font-bold">1. EMITTED TOOL CALL (From LLM):</div>
                  <pre className="text-slate-200 bg-slate-950 p-2.5 rounded border border-purple-900/40">
{`{
  "name": "calculate",
  "arguments": {
    "expression": "${calcInput}"
  }
}`}
                  </pre>
                  <div className="text-emerald-400 font-bold pt-2">2. DETERMINISTIC RETURN VALUE (From Python):</div>
                  <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm font-bold">
                    = 2,642.8545 (Exact, verified to 6 decimal precision)
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Rung 2: The Free-Form SQL Vulnerability</span>
              <span className="text-xs text-rose-300 font-mono">High Danger</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs text-slate-400 font-mono">User prompt to unconstrained SQL agent:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sqlPrompt}
                  onChange={(e) => setSqlPrompt(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm flex-1"
                />
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm transition-colors flex items-center gap-1.5"
                >
                  <Play size={14} />
                  <span>Generate SQL</span>
                </button>
              </div>
            </div>

            {stepFinished && (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 font-mono text-xs space-y-2">
                  <div className="text-rose-400 font-bold flex items-center gap-1.5">
                    <ShieldAlert size={15} />
                    <span>LLM GENERATED RAW SQL (UNCHECKED WRITE PERMISSION):</span>
                  </div>
                  <pre className="text-rose-200 bg-slate-950 p-2.5 rounded border border-rose-900/60 overflow-x-auto">
{`-- LLM interpreted "clean up" as DROP/DELETE
DELETE FROM bmc_telemetry_historical 
WHERE recorded_at < '2024-01-01';

-- Result: 1,420,000 milk temperature and fat inspection rows ERASED FOREVER`}
                  </pre>
                  <p className="text-xs text-rose-300 italic pt-1">
                    No hacker broke in. An honest IT engineer typed an ambiguous sentence, and the raw SQL executor destroyed historical data without human review.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Rung 3: The Architecture Fix</span>
              <span className="text-xs text-emerald-300 font-mono">Safe, Read-Only, Parameterized Tool</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-1">Select Chiller (Parameter 1):</label>
                  <select
                    value={selectedBmc}
                    onChange={(e) => setSelectedBmc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm"
                  >
                    <option value="BMC-01">BMC-01 (Anand Main)</option>
                    <option value="BMC-02">BMC-02 (Kheda Chilling)</option>
                    <option value="BMC-04">BMC-04 (Baroda North)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-1">Time Horizon (Parameter 2):</label>
                  <select
                    value={hoursBack}
                    onChange={(e) => setHoursBack(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm"
                  >
                    <option value="1">Last 1 Hour</option>
                    <option value="6">Last 6 Hours</option>
                    <option value="24">Last 24 Hours</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="button-primary flex items-center gap-1.5"
                >
                  <Play size={14} />
                  <span>Call Parameterized Tool</span>
                </button>
              </div>
            </div>

            {stepFinished && (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 font-mono text-xs space-y-2">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>PARAMETERIZED TOOL CALL EMITTED:</span>
                  </div>
                  <pre className="text-slate-200 bg-slate-950 p-2.5 rounded border border-emerald-900/40">
{`{
  "name": "get_bmc_telemetry",
  "arguments": {
    "bmc_id": "${selectedBmc}",
    "hours_back": ${hoursBack}
  }
}`}
                  </pre>
                  <div className="text-emerald-300 font-bold pt-1">SANITIZED DATABASE QUERY EXECUTED (Read-Only Connection):</div>
                  <pre className="text-emerald-200 bg-slate-950 p-2.5 rounded border border-emerald-900/40">
{`SELECT timestamp, temperature_c, compressor_status 
FROM telemetry_feed 
WHERE bmc_id = ? AND timestamp >= NOW() - INTERVAL ? HOUR;
-- [Parameters: '${selectedBmc}', ${hoursBack}] -> 100% immune to SQL injection & accidental deletion`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
