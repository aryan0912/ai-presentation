'use client';
import React, { useState } from 'react';
import { Layers, Sparkles, Hash, AlertCircle } from 'lucide-react';

export default function TokenizationInspector() {
  const [sampleKey, setSampleKey] = useState<'dairy' | 'it' | 'subword'>('dairy');
  const [customText, setCustomText] = useState<string>('Bulk chilling-center tanker arrived at 04:00 AM');

  // Pre-mapped token breakdowns with color palettes
  const samples = {
    dairy: {
      text: 'Bulk chilling-center tanker arrived at 04:00 AM',
      tokens: [
        { id: 48921, text: 'Bulk', color: 'bg-sky-950 text-sky-300 border-sky-600' },
        { id: 24190, text: ' chill', color: 'bg-emerald-950 text-emerald-300 border-emerald-600' },
        { id: 294, text: 'ing', color: 'bg-emerald-900 text-emerald-200 border-emerald-500' },
        { id: 12, text: '-', color: 'bg-slate-800 text-slate-300 border-slate-600' },
        { id: 6241, text: 'center', color: 'bg-purple-950 text-purple-300 border-purple-600' },
        { id: 38401, text: ' tank', color: 'bg-amber-950 text-amber-300 border-amber-600' },
        { id: 260, text: 'er', color: 'bg-amber-900 text-amber-200 border-amber-500' },
        { id: 8201, text: ' arrived', color: 'bg-sky-950 text-sky-300 border-sky-600' },
        { id: 520, text: ' at', color: 'bg-slate-800 text-slate-300 border-slate-600' },
        { id: 1042, text: ' 04', color: 'bg-rose-950 text-rose-300 border-rose-600' },
        { id: 25, text: ':', color: 'bg-slate-800 text-slate-300 border-slate-600' },
        { id: 980, text: '00', color: 'bg-rose-950 text-rose-300 border-rose-600' },
        { id: 2401, text: ' AM', color: 'bg-purple-950 text-purple-300 border-purple-600' },
      ],
    },
    it: {
      text: 'Kubernetes pod crashed with OOMKilled in namespace prod-db',
      tokens: [
        { id: 39401, text: 'Kuber', color: 'bg-sky-950 text-sky-300 border-sky-600' },
        { id: 1209, text: 'netes', color: 'bg-sky-900 text-sky-200 border-sky-500' },
        { id: 6204, text: ' pod', color: 'bg-purple-950 text-purple-300 border-purple-600' },
        { id: 19842, text: ' crashed', color: 'bg-rose-950 text-rose-300 border-rose-600' },
        { id: 412, text: ' with', color: 'bg-slate-800 text-slate-300 border-slate-600' },
        { id: 82041, text: ' OOM', color: 'bg-rose-950 text-rose-300 border-rose-600' },
        { id: 9841, text: 'Killed', color: 'bg-rose-900 text-rose-200 border-rose-500' },
        { id: 304, text: ' in', color: 'bg-slate-800 text-slate-300 border-slate-600' },
        { id: 18402, text: ' namespace', color: 'bg-emerald-950 text-emerald-300 border-emerald-600' },
        { id: 820, text: ' prod', color: 'bg-amber-950 text-amber-300 border-amber-600' },
        { id: 12, text: '-', color: 'bg-slate-800 text-slate-300 border-slate-600' },
        { id: 4201, text: 'db', color: 'bg-amber-900 text-amber-200 border-amber-500' },
      ],
    },
    subword: {
      text: 'unpasteurized microencapsulation',
      tokens: [
        { id: 410, text: 'un', color: 'bg-sky-950 text-sky-300 border-sky-600' },
        { id: 8401, text: 'pasteur', color: 'bg-sky-900 text-sky-200 border-sky-500' },
        { id: 1042, text: 'ized', color: 'bg-sky-800 text-sky-100 border-sky-400' },
        { id: 9840, text: ' micro', color: 'bg-purple-950 text-purple-300 border-purple-600' },
        { id: 3201, text: 'en', color: 'bg-purple-900 text-purple-200 border-purple-500' },
        { id: 849, text: 'caps', color: 'bg-purple-800 text-purple-100 border-purple-400' },
        { id: 394, text: 'ulation', color: 'bg-purple-700 text-purple-50 border-purple-300' },
      ],
    },
  };

  const activeTokens = samples[sampleKey].tokens;

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Header & Sample Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
            §7 Interactive Demo · Byte-Pair Encoding (BPE)
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Subword Tokenization: How LLMs Slice Raw Text
          </h4>
        </div>

        <div className="flex gap-1.5 text-[11px]">
          <button
            onClick={() => setSampleKey('dairy')}
            className={`px-3 py-1 rounded-lg transition-colors font-bold ${
              sampleKey === 'dairy' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            1. Dairy Chilling Log
          </button>
          <button
            onClick={() => setSampleKey('it')}
            className={`px-3 py-1 rounded-lg transition-colors font-bold ${
              sampleKey === 'it' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            2. Kubernetes Incident
          </button>
          <button
            onClick={() => setSampleKey('subword')}
            className={`px-3 py-1 rounded-lg transition-colors font-bold ${
              sampleKey === 'subword' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            3. Rare Technical Words
          </button>
        </div>
      </div>

      {/* Raw Input String Box */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <span className="text-slate-400 text-[11px] block mb-1">Original Character String:</span>
        <div className="text-sm font-bold text-white tracking-wide">
          &ldquo;{samples[sampleKey].text}&rdquo;
        </div>
      </div>

      {/* Color-Coded Token Chunks Display */}
      <div className="space-y-2">
        <span className="text-purple-300 font-bold flex items-center gap-1.5">
          <Layers size={14} className="text-purple-400" />
          LLM Token Chunks ({activeTokens.length} Tokens Produced):
        </span>

        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          {activeTokens.map((t, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-lg border flex flex-col items-center gap-1 shadow-sm ${t.color}`}
            >
              <span className="font-bold text-sm">
                {t.text.replace(' ', '␣')}
              </span>
              <span className="text-[9px] font-mono opacity-80 border-t border-current/30 pt-0.5 w-full text-center">
                ID: {t.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 space-y-1">
          <strong className="text-purple-300 font-mono block">The Subword Revelation:</strong>
          LLMs do not read whole words or individual letters. They learn frequent character combinations. Words like <em>&ldquo;chilling&rdquo;</em> split into <code>chill</code> + <code>ing</code>; <em>&ldquo;Kubernetes&rdquo;</em> splits into <code>Kuber</code> + <code>netes</code>.
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 space-y-1">
          <strong className="text-sky-300 font-mono block">Why Context Windows Have a Cost:</strong>
          Because attention calculates a score between <em>every token and every other token</em>, doubling context from 4k to 8k tokens quadruples the math ($O(N^2)$ matrix operations).
        </div>
      </div>

    </div>
  );
}
