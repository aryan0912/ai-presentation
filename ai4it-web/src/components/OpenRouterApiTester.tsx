'use client';
import React, { useState } from 'react';
import { Network, Send, Zap, ShieldAlert, ArrowRight, Code } from 'lucide-react';

export default function OpenRouterApiTester() {
  const [selectedModel, setSelectedModel] = useState<string>('meta-llama/llama-3.2-3b-instruct');
  const [prompt, setPrompt] = useState<string>('Write a 2-sentence IT incident alert for a chilling center compressor breakdown.');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const models = [
    { id: 'meta-llama/llama-3.2-3b-instruct', name: 'Llama 3.2 (3B) · Fast / Lightweight', latency: '240ms', cost: '$0.00006 / 1k' },
    { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B · Balanced Enterprise', latency: '420ms', cost: '$0.0002 / 1k' },
    { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet · Deep Reasoning', latency: '850ms', cost: '$0.003 / 1k' },
  ];

  const handleRun = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (selectedModel.includes('llama')) {
        setResponse('CRITICAL ALERT: Bulk Milk Chilling Center Compressor Unit #2 has suffered an unexpected hardware failure, causing milk tank temperatures to rise toward 6.5°C. Immediate on-site technician dispatch and backup cooling unit switchover are required to prevent batch spoilage.');
      } else if (selectedModel.includes('mistral')) {
        setResponse('INCIDENT #8421: Chilling compressor offline at BMC Station 4. Automated alerts have notified regional maintenance; auxiliary refrigeration initiated to maintain temperature below 4.0°C.');
      } else {
        setResponse('PRIORITY 1 INCIDENT: Loss of primary cooling compression detected on Chilling Tank #4 at BMC Facility. Secondary telemetry indicates an initial thermal gradient rise of +0.8°C/hr; initiate immediate diversion of scheduled intake tankers to Station B.');
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
            §11 Hands-On Mechanics · One API, Many Providers
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            OpenRouter Unified API Sandbox (Mechanics Only)
          </h4>
        </div>

        <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
          Endpoint: <code>https://openrouter.ai/api/v1/chat/completions</code>
        </span>
      </div>

      {/* Model Selector & Request Input */}
      <div className="space-y-3">
        <label className="text-slate-300 font-bold block">1. Select Target LLM Provider:</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {models.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedModel === m.id
                  ? 'bg-purple-950/40 border-purple-400 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="text-white font-bold text-xs mb-1">{m.name.split('·')[0]}</div>
              <div className="text-[10px] text-slate-400 font-sans">{m.name.split('·')[1]}</div>
              <div className="mt-2 pt-2 border-t border-slate-800/80 flex justify-between text-[10px] text-slate-500">
                <span>Lat: {m.latency}</span>
                <span>{m.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payload Editor & Execution Button */}
      <div className="space-y-2">
        <label className="text-slate-300 font-bold block">2. Standardized OpenAI-Compatible Payload:</label>
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
          />
          <button
            onClick={handleRun}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all shadow-lg shadow-purple-600/20"
          >
            <Send size={13} />
            <span>{isLoading ? 'Dispatching...' : 'Send API Call'}</span>
          </button>
        </div>
      </div>

      {/* API Response Output */}
      {response && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <span className="text-purple-300 font-bold block">Response from {selectedModel}:</span>
          <p className="text-slate-200 font-sans text-xs leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            {response}
          </p>
        </div>
      )}

      {/* Explicit Deferral Callout for Day 4 */}
      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-sans leading-relaxed">
        <strong className="text-purple-300 font-mono block mb-0.5">Looking Ahead to Day 4:</strong>
        Notice how we called completely different AI labs (Meta, Mistral, Anthropic) using the exact same JSON format without changing our code. The architectural reasons behind multi-provider routing (fallback resilience, cost arbitration) will be unpacked fully on <strong>Day 4</strong>!
      </div>

    </div>
  );
}
