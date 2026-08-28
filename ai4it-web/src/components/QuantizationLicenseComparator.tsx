'use client';
import React, { useState } from 'react';
import { Cpu, ShieldCheck, AlertTriangle, CheckCircle2, HardDrive, FileText } from 'lucide-react';

export default function QuantizationLicenseComparator() {
  const [modelSize, setModelSize] = useState<'8B' | '70B'>('8B');
  const [precision, setPrecision] = useState<'FP16' | 'INT8' | 'INT4'>('INT4');

  // Memory calculation: Model params * bytes per param + 20% KV-cache overhead
  const getVram = (size: '8B' | '70B', prec: 'FP16' | 'INT8' | 'INT4') => {
    const bytes = prec === 'FP16' ? 2 : prec === 'INT8' ? 1 : 0.5;
    const numParams = size === '8B' ? 8 : 70;
    const baseGb = numParams * bytes;
    const totalGb = Math.ceil(baseGb * 1.2);
    return { baseGb, totalGb };
  };

  const { baseGb, totalGb } = getVram(modelSize, precision);

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/95 border border-emerald-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            §10 Hands-On Guide · Hugging Face Model Evaluation
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Quantization (VRAM Footprint) & Commercial Licensing Matrix
          </h4>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setModelSize('8B')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              modelSize === '8B' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Llama 3 (8B Params)
          </button>
          <button
            onClick={() => setModelSize('70B')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              modelSize === '70B' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Llama 3 (70B Params)
          </button>
        </div>
      </div>

      {/* Interactive Quantization Calculator */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-white font-bold flex items-center gap-2 text-sm">
            <Cpu size={16} className="text-emerald-400" />
            1. Quantization Level Selector:
          </span>

          <div className="flex gap-1.5">
            {[
              { id: 'FP16', label: '16-bit (FP16 · Unquantized)' },
              { id: 'INT8', label: '8-bit (INT8 · Balanced)' },
              { id: 'INT4', label: '4-bit (INT4 / GGUF · Efficient)' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPrecision(p.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                  precision === p.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* VRAM Visual Comparison Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px]">Weight Size on Disk:</span>
            <div className="text-xl font-bold text-white">~{baseGb} GB</div>
            <span className="text-slate-500 text-[10px]">Raw tensor parameter storage</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px]">Recommended GPU VRAM:</span>
            <div className={`text-xl font-bold ${totalGb <= 8 ? 'text-emerald-400' : totalGb <= 24 ? 'text-amber-400' : 'text-rose-400'}`}>
              ~{totalGb} GB VRAM
            </div>
            <span className="text-slate-500 text-[10px]">Includes KV-cache & context buffer</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px]">Enterprise Hardware Target:</span>
            <div className="text-sm font-bold text-sky-300">
              {totalGb <= 8 ? 'Consumer Laptop / RTX 4060' : totalGb <= 24 ? 'Single RTX 4090 / A10G' : 'Multi-GPU (2x A100 80GB)'}
            </div>
            <span className="text-slate-500 text-[10px]">{totalGb <= 8 ? 'Runs locally on student machines!' : 'Requires enterprise cloud infra'}</span>
          </div>
        </div>
      </div>

      {/* Commercial Licensing Matrix Decision Tree */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <span className="text-white font-bold flex items-center gap-2 text-sm">
          <FileText size={16} className="text-purple-400" />
          2. Commercial Licensing Quick Decision Matrix:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 size={14} /> Apache 2.0 / MIT / Open-Source
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong>Permitted everywhere.</strong> You can modify, host internally, commercialize, and deploy without permission (e.g., Mistral 7B Apache, Qwen 2.5).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <ShieldCheck size={14} /> Llama Community License
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong>Free for commercial use</strong> up to 700M monthly active users. Must include &ldquo;Built with Meta Llama 3&rdquo; attribution.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/40 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-400">
              <AlertTriangle size={14} /> CC-BY-NC (Non-Commercial)
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong>Strictly prohibited for business workflows.</strong> Research/evaluation only. Never deploy on internal production enterprise data!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
