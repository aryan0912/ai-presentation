import LatencyPercentileChart from '../components/LatencyPercentileChart';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Server, Database, Activity, Layers } from 'lucide-react';

export default function ScaleTheoryPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-rose-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 • Block 4</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          Scale Theory: The Engineering Reality
        </h1>
        <p className="text-slate-400">
          Everything worked on your laptop for you. Now picture 10,000 NDDB employees hitting the Copilot at once. What breaks first?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card">
          <div className="text-rose-400 mb-3"><Layers size={24} /></div>
          <h4 className="font-bold text-white mb-2">Serving (vLLM/TGI)</h4>
          <p className="text-xs text-slate-400">Continuous batching and shared KV-caching. Interleaving token generation instead of serialized requests.</p>
        </div>
        <div className="glass-card">
          <div className="text-emerald-400 mb-3"><Database size={24} /></div>
          <h4 className="font-bold text-white mb-2">Vector Store</h4>
          <p className="text-xs text-slate-400">pgvector works for 50 people. At scale, you need Milvus or Qdrant, sharded and replicated.</p>
        </div>
        <div className="glass-card">
          <div className="text-purple-400 mb-3"><Activity size={24} /></div>
          <h4 className="font-bold text-white mb-2">Caching (Redis)</h4>
          <p className="text-xs text-slate-400">At 10,000 users, caching is load-bearing. A few hundred common questions will be asked thousands of times.</p>
        </div>
        <div className="glass-card">
          <div className="text-blue-400 mb-3"><Server size={24} /></div>
          <h4 className="font-bold text-white mb-2">Horizontal Scale</h4>
          <p className="text-xs text-slate-400">Kubernetes/KServe. Multiple serving replicas behind a load balancer, autoscaling on queue depth.</p>
        </div>
      </div>

      <LatencyPercentileChart />

      <div className="flex justify-between pt-8">
        <Link href="/day5/sql-guardrails" className="button-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <Link href="/day5/mcp-and-n8n" className="button-primary">
          Next: MCP & n8n <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
