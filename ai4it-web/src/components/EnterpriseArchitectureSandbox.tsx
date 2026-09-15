'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  ShieldCheck, 
  DollarSign, 
  Activity, 
  Cpu, 
  Sliders, 
  CheckCircle2,
  HardDrive,
  Cloud,
  Lock,
  Zap,
  Gauge
} from 'lucide-react';

export default function EnterpriseArchitectureSandbox() {
  const [modelHost, setModelHost] = useState<'local' | 'hosted'>('local');
  const [vectorDb, setVectorDb] = useState<'pgvector' | 'chroma' | 'milvus'>('pgvector');
  const [rbacEnabled, setRbacEnabled] = useState<boolean>(true);
  const [cacheEnabled, setCacheEnabled] = useState<boolean>(true);

  // Compute live trade-off scorecard for 50 users & 2,000 docs
  const costPerMonth = modelHost === 'local' 
    ? (vectorDb === 'milvus' ? 140 : 45) // Server depreciation / power
    : (vectorDb === 'milvus' ? 260 : 135); // API tokens + hosted DB

  const avgLatencyMs = modelHost === 'local' 
    ? (cacheEnabled ? 320 : 950) 
    : (cacheEnabled ? 180 : 650);

  const privacyScore = modelHost === 'local' ? 100 : 65;
  const opsComplexity = vectorDb === 'milvus' ? 'High (K8s)' : vectorDb === 'pgvector' ? 'Low (Existing DB)' : 'Minimal (Single File)';

  return (
    <div className="space-y-8 rounded-3xl bg-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold mb-1">
            <Sliders size={14} /> Team-of-50 Architecture Configurator
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Production Simulator</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Model parameters for 50 active enterprise users and 2,000 internal documents. Toggle deployment infrastructure to observe cost, privacy, and latency trade-offs.
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Scope Parameters</div>
          <div className="text-xs font-mono text-slate-300">50 Seats · 2,000 SOPs · ~15k Chunks</div>
        </div>
      </div>

      {/* Control Knobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Knob 1: Model Deployment */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
            <Cpu size={13} className="text-sky-400" /> LLM Inference Host
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setModelHost('local')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold border transition-all text-center ${
                modelHost === 'local' 
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-md' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <HardDrive size={14} className="mx-auto mb-1 text-emerald-400" />
              Local Ollama
            </button>
            <button
              onClick={() => setModelHost('hosted')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold border transition-all text-center ${
                modelHost === 'hosted' 
                  ? 'bg-sky-950/40 border-sky-500 text-sky-300 shadow-md' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Cloud size={14} className="mx-auto mb-1 text-sky-400" />
              Cloud API
            </button>
          </div>
          <p className="text-[10px] text-slate-500 leading-snug">
            {modelHost === 'local' ? 'Data never leaves NDDB intranet. Zero per-token cloud bill.' : 'Ultra-low latency, zero GPU maintenance, pay-per-token.'}
          </p>
        </div>

        {/* Knob 2: Vector DB Engine */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
            <Database size={13} className="text-purple-400" /> Vector Database
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setVectorDb('pgvector')}
              className={`p-2 rounded-xl text-[11px] font-mono font-semibold border transition-all text-center ${
                vectorDb === 'pgvector' 
                  ? 'bg-purple-950/40 border-purple-500 text-purple-300 shadow-md' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              pgvector
            </button>
            <button
              onClick={() => setVectorDb('chroma')}
              className={`p-2 rounded-xl text-[11px] font-mono font-semibold border transition-all text-center ${
                vectorDb === 'chroma' 
                  ? 'bg-purple-950/40 border-purple-500 text-purple-300 shadow-md' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Chroma
            </button>
            <button
              onClick={() => setVectorDb('milvus')}
              className={`p-2 rounded-xl text-[11px] font-mono font-semibold border transition-all text-center ${
                vectorDb === 'milvus' 
                  ? 'bg-purple-950/40 border-purple-500 text-purple-300 shadow-md' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Milvus
            </button>
          </div>
          <p className="text-[10px] text-slate-500 leading-snug">
            {vectorDb === 'pgvector' ? 'Leverages existing PostgreSQL enterprise cluster.' : vectorDb === 'chroma' ? 'Embedded lightweight file store.' : 'Distributed high-scale cluster for millions of vectors.'}
          </p>
        </div>

        {/* Knob 3: Role-Based Access Control */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
            <Lock size={13} className="text-amber-400" /> RBAC Metadata Filter
          </span>
          <button
            onClick={() => setRbacEnabled(!rbacEnabled)}
            className={`w-full p-2.5 rounded-xl text-xs font-mono font-semibold border transition-all flex items-center justify-center gap-2 ${
              rbacEnabled 
                ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-md' 
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            <ShieldCheck size={14} className={rbacEnabled ? 'text-amber-400' : 'text-slate-600'} />
            <span>{rbacEnabled ? 'RBAC Enforced' : 'Unrestricted Access'}</span>
          </button>
          <p className="text-[10px] text-slate-500 leading-snug">
            {rbacEnabled ? 'Chunks filtered by user department role before similarity ranking.' : 'Warning: Confidential executive SOPs accessible by all staff.'}
          </p>
        </div>

        {/* Knob 4: Semantic Caching */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
            <Zap size={13} className="text-rose-400" /> Semantic Caching
          </span>
          <button
            onClick={() => setCacheEnabled(!cacheEnabled)}
            className={`w-full p-2.5 rounded-xl text-xs font-mono font-semibold border transition-all flex items-center justify-center gap-2 ${
              cacheEnabled 
                ? 'bg-rose-950/40 border-rose-500 text-rose-300 shadow-md' 
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            <Zap size={14} className={cacheEnabled ? 'text-rose-400' : 'text-slate-600'} />
            <span>{cacheEnabled ? 'Cache Active (Redis)' : 'Cache Disabled'}</span>
          </button>
          <p className="text-[10px] text-slate-500 leading-snug">
            {cacheEnabled ? 'Identical questions hit cache: 10ms latency, zero token cost.' : 'Every query hits vector DB and LLM inference engine.'}
          </p>
        </div>

      </div>

      {/* Dynamic Telemetry Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 font-mono">
        
        {/* Metric 1: Monthly Cost */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
            <DollarSign size={12} className="text-emerald-400" /> Estimated Monthly OPEX
          </div>
          <div className="text-3xl font-extrabold text-white">
            ${costPerMonth} <span className="text-xs text-slate-500 font-normal">/ month</span>
          </div>
          <p className="text-[10px] text-slate-400">
            {modelHost === 'local' ? 'Server electricity + storage depreciation' : 'API token billing for ~3,000 queries/mo'}
          </p>
        </div>

        {/* Metric 2: Average Query Latency */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
            <Activity size={12} className="text-sky-400" /> P95 Response Latency
          </div>
          <div className="text-3xl font-extrabold text-white">
            {avgLatencyMs} <span className="text-xs text-slate-500 font-normal">ms</span>
          </div>
          <p className="text-[10px] text-slate-400">
            {cacheEnabled ? 'Includes 35% cache hit acceleration' : 'Full pipeline retrieval & generation pass'}
          </p>
        </div>

        {/* Metric 3: Data Privacy Guarantee */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
            <ShieldCheck size={12} className="text-indigo-400" /> Data Privacy & Sovereign Index
          </div>
          <div className={`text-3xl font-extrabold ${privacyScore === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {privacyScore}%
          </div>
          <p className="text-[10px] text-slate-400">
            {modelHost === 'local' ? '100% on-premise containment' : 'Data egress through encrypted external API'}
          </p>
        </div>

        {/* Metric 4: Operational Complexity */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
            <Gauge size={12} className="text-purple-400" /> DevOps Footprint
          </div>
          <div className="text-xl font-bold text-white pt-1">
            {opsComplexity}
          </div>
          <p className="text-[10px] text-slate-400">
            {vectorDb === 'pgvector' ? 'No new servers required; reuses DB team skillsets' : 'Requires dedicated cluster infrastructure management'}
          </p>
        </div>

      </div>

      {/* Synthesis Conclusion */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-bold text-white block mb-0.5">The Reference Recommendation for 50 Enterprise Users:</span>
          <span className="text-slate-400">
            Self-hosted local model (Ollama) + existing relational pgvector + strict metadata RBAC + Redis semantic cache provides total data confidentiality at lowest long-term cost.
          </span>
        </div>
        <div className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono text-[11px] font-bold">
          Optimum Architecture
        </div>
      </div>
    </div>
  );
}
