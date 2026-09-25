import Link from 'next/link';
import { ArrowRight, ArrowLeft, ShieldAlert, Cpu, Activity, DollarSign, AlertTriangle, Layers, Flame, Lock } from 'lucide-react';
import RedTeamingAgentHandsOn from '../components/RedTeamingAgentHandsOn';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <Link href="/day5" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 5 Overview
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-2">
          Act 3 • Production Reality &amp; Red-Teaming
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Q4: Scale Theory, Red-Teaming &amp; Production Guardrails
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Everything worked on your single-user laptop. Now we subject our architecture to the brutal laws of enterprise concurrency, p99 latency cliffs, the economic cost flip, and the four unsolved security gaps.
        </p>
      </div>

      {/* The 4 Architectural Shifts at 10,000 Concurrent Users */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl">
            <Flame size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">What Breaks First at 10,000 Concurrent Users?</h2>
            <p className="text-xs text-slate-400">The 4 architectural shifts required to transition from prototype to enterprise scale</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-indigo-400 block text-sm">1. Serving: Continuous Batching (vLLM)</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Standard batching idles compute while waiting for the longest request. <strong>PagedAttention</strong> manages Key-Value (KV) cache like virtual OS memory—boosting GPU throughput by 300%–500% on identical silicon.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-cyan-400 block text-sm">2. Vector Store: pgvector ➔ Qdrant / Milvus</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              While pgvector is great for &lt;100k chunks, 10,000 concurrent ANN searches saturate CPU disk I/O. Dedicated in-memory vector engines shard HNSW graphs across memory clusters.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-emerald-400 block text-sm">3. Semantic Caching (Redis)</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              40% of Monday morning enterprise queries are semantic duplicates (&quot;When is milk payout disbursed?&quot;). Redis returns audited answers in <strong>4 milliseconds at zero GPU cost</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-amber-400 block text-sm">4. Horizontal Autoscaling (KEDA / KServe)</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Never autoscale GPUs on CPU utilization. Autoscale Kubernetes pods dynamically based on <strong>pending request queue depth and KV-cache saturation</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* The Latency Lie: p99 vs Average */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
            <Activity size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The Golden Rule: Average Latency Is a Lie</h2>
            <p className="text-xs text-slate-400">Why executive dashboards hide the p99 cliff</p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-900 rounded border border-slate-800">
              <span className="text-emerald-400 font-bold block">p50 Latency: 800ms</span>
              Fast, crisp token streaming for the median user.
            </div>
            <div className="p-3 bg-slate-900 rounded border border-slate-800">
              <span className="text-blue-400 font-bold block">Average: 1.2 seconds</span>
              The deceptive KPI shown on vendor marketing slides.
            </div>
            <div className="p-3 bg-slate-900 rounded border border-rose-500/30">
              <span className="text-rose-400 font-bold block">p99 Latency: 14.2s (The Cliff)</span>
              1 out of every 100 requests freezes—triggering browser refreshes and cascading outages.
            </div>
          </div>
        </div>
      </div>

      {/* The Cost Reversal */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <DollarSign size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The Cost Reversal Equation: Cloud vs On-Premises</h2>
            <p className="text-xs text-slate-400">Scale completely flips the financial verdict</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Scale Tier</th>
                <th className="p-3">Query Volume</th>
                <th className="p-3">Cloud API Tokens</th>
                <th className="p-3">Self-Hosted GPU Cluster</th>
                <th className="p-3">Architectural Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-blue-400">Team of 50 Users</td>
                <td className="p-3">1,000 queries / day</td>
                <td className="p-3 text-emerald-400 font-bold">~₹12,000 / month</td>
                <td className="p-3 text-slate-400">₹25 Lakhs upfront CapEx</td>
                <td className="p-3 text-emerald-300 font-bold">Cloud Wins by a landslide!</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-rose-400">Enterprise 10,000 Users</td>
                <td className="p-3">400,000 queries / day (600M tokens)</td>
                <td className="p-3 text-rose-400 font-bold">&gt;₹3 Crores / year</td>
                <td className="p-3 text-emerald-400 font-bold">₹80L cluster (₹2.2L/mo amortized)</td>
                <td className="p-3 text-emerald-300 font-bold">On-Premises Wins by ₹2+ Crores!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Red-Teaming Lab */}
      <div className="my-8">
        <RedTeamingAgentHandsOn />
      </div>

      {/* The 4 Unsolved Security Gaps */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl">
            <Lock size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The 4 Unsolved Enterprise Security Gaps</h2>
            <p className="text-xs text-slate-400">Why our current agent remains an ungoverned hazard in production</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-1">
            <strong className="text-rose-400 block text-sm">1. Zero Multi-Tenant Isolation</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Nothing stops a plant manager at Mehsana from querying the private financial margins or telemetry of Anand.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-1">
            <strong className="text-rose-400 block text-sm">2. Zero DLP &amp; PII Masking</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Nothing prevents an employee from typing an Aadhaar card or bank IFSC code, or stops the model from echoing it into logs.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-1">
            <strong className="text-rose-400 block text-sm">3. Zero Tamper-Proof Audit Trail</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              When ticket INC-4471 is created, there is no cryptographically verifiable trace of who authorized the action.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-1">
            <strong className="text-rose-400 block text-sm">4. Zero Statutory Compliance (DPDPA)</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Under India&apos;s Digital Personal Data Protection Act (DPDPA 2023), NDDB faces up to ₹250 Crores in statutory penalties for unshielded leaks.
            </p>
          </div>
        </div>
      </div>

      {/* The Bridge to Day 6 */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-emerald-950/40 border border-indigo-500/40 space-y-3">
        <h3 className="text-lg font-bold text-white">The Three Cliffhangers into Day 6</h3>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          Tomorrow morning on Day 6, we bridge these gaps permanently:
        </p>
        <ul className="text-xs text-slate-300 font-mono space-y-1 list-disc list-inside">
          <li><strong>Quarter 1: The Trust Layer</strong> — DPDPA 2023 compliance, Microsoft Presidio PII masking, and Langflow Cyclic Self-Reflection Loops.</li>
          <li><strong>Quarter 2: The Scale Layer</strong> — Production GPU silicon, vLLM continuous batching, and Locust p99 load tests.</li>
          <li><strong>Quarter 3 &amp; 4: The Reality Layer &amp; Grand Capstone</strong> — AIOps log triage with n8n, MTTR reduction, and the 180-day enterprise AI roadmap.</li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800">
        <Link href="/day5/q3-mcp-revolution" className="button-secondary w-full sm:w-auto">
          <ArrowLeft size={16} /> Prev: Q3 The MCP Revolution
        </Link>
        <Link href="/day5/langgraph-deep-dive" className="button-primary w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
          Special: LangGraph Agentic Engine <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
