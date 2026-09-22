import LatencyPercentileChart from '../../day5/components/LatencyPercentileChart';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Server, Database, Activity, Layers, HardDrive, Cpu, ShieldCheck } from 'lucide-react';

export default function ScaleAndDeploymentPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-cyan-400 font-mono text-sm font-bold uppercase tracking-wider">Day 6 • Module 7</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-2">
          RAG & Agent Scale: Enterprise Hardware, Sizing & Deployment
        </h1>
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          Everything worked on your laptop with Ollama or a single API key. Now picture 10,000 NDDB cooperative employees and 200 chilling centers hitting the system at once. 
          What breaks first, how do we size the hardware, and how do we architect for production scale?
        </p>
      </div>

      {/* 4 Pillars of Scaled Production AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card border-t-4 border-t-rose-500 p-5 space-y-2">
          <div className="text-rose-400 mb-1"><Layers size={22} /></div>
          <h4 className="font-bold text-white text-sm">1. High-Throughput Serving</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            vLLM & TGI. Continuous iteration-level batching, PagedAttention (KV-cache paging). Never serialize LLM inference requests.
          </p>
        </div>

        <div className="glass-card border-t-4 border-t-emerald-500 p-5 space-y-2">
          <div className="text-emerald-400 mb-1"><Database size={22} /></div>
          <h4 className="font-bold text-white text-sm">2. Vector DB at Scale</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            pgvector is fine for POCs. At 10M+ chunks, migrate to dedicated, distributed vector engines (Qdrant, Milvus) with HNSW indexing and sharding.
          </p>
        </div>

        <div className="glass-card border-t-4 border-t-purple-500 p-5 space-y-2">
          <div className="text-purple-400 mb-1"><Activity size={22} /></div>
          <h4 className="font-bold text-white text-sm">3. Semantic Caching</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Redis / GPTCache. In enterprise IT, 20% of common queries ("BMC milk collection deadline", "VPN setup") account for 80% of volume. Cache embeddings to cut LLM costs by 70%.
          </p>
        </div>

        <div className="glass-card border-t-4 border-t-blue-500 p-5 space-y-2">
          <div className="text-blue-400 mb-1"><Server size={22} /></div>
          <h4 className="font-bold text-white text-sm">4. K8s & GPU Autoscaling</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Kubernetes + KServe/Ray. Autoscale GPU worker pods based on token queue backlog, not CPU utilization.
          </p>
        </div>
      </div>

      {/* Latency & Percentiles Section */}
      <LatencyPercentileChart />

      {/* Hardware Sizing Cheat Sheet */}
      <div className="glass-card p-6 border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu size={18} className="text-amber-400" />
          <span>NDDB On-Prem Hardware Sizing Rule of Thumb</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="py-2.5 px-3">Model Parameter Size</th>
                <th className="py-2.5 px-3">Precision (FP16 / INT4)</th>
                <th className="py-2.5 px-3">Minimum VRAM Needed</th>
                <th className="py-2.5 px-3">Recommended GPU Spec</th>
                <th className="py-2.5 px-3">Concurrent Users Supported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">8B (e.g. Llama 3.1 8B)</td>
                <td className="py-2.5 px-3">INT4 Quantized</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">~6 GB - 8 GB</td>
                <td className="py-2.5 px-3">1x RTX 4090 / A5000 (24GB)</td>
                <td className="py-2.5 px-3">25 - 50 concurrent users</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">8B (e.g. Llama 3.1 8B)</td>
                <td className="py-2.5 px-3">FP16 (Uncompressed)</td>
                <td className="py-2.5 px-3 text-blue-400 font-bold">~16 GB + KV cache</td>
                <td className="py-2.5 px-3">1x A100 / L40S (48GB)</td>
                <td className="py-2.5 px-3">100+ concurrent users</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">70B (Enterprise Grade)</td>
                <td className="py-2.5 px-3">INT4 / AWQ</td>
                <td className="py-2.5 px-3 text-amber-400 font-bold">~40 GB</td>
                <td className="py-2.5 px-3">1x A100 (80GB) or 2x L40S</td>
                <td className="py-2.5 px-3">50 - 80 concurrent users</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">70B (Enterprise Grade)</td>
                <td className="py-2.5 px-3">FP16 Full Precision</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">~140 GB + KV cache</td>
                <td className="py-2.5 px-3">2x A100 (80GB) / 2x H100</td>
                <td className="py-2.5 px-3">200+ concurrent enterprise users</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-800">
        <Link href="/day6/red-teaming-governance" className="button-secondary">
          <ArrowLeft size={16} /> Back: Red-Teaming & Governance
        </Link>
        <Link href="/day6/enterprise-roadmap" className="button-primary">
          Next: The Capstone Roadmap <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
