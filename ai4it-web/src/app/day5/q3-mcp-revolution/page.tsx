import Link from 'next/link';
import { ArrowRight, ArrowLeft, Network, Cable, ShieldAlert, Cpu, AlertTriangle, CheckCircle2, Workflow } from 'lucide-react';
import McpTemplateHandsOn from '../components/McpTemplateHandsOn';
import McpDiagram from '../components/McpDiagram';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <Link href="/day5" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 5 Overview
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-2">
          Act 3 • Standardized Agent Protocols
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Q3: The MCP Revolution &amp; Enterprise Integration with n8n
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Solving the N × M plumbing crisis. Just as ODBC unified database connectivity in the 1990s and USB-C unified hardware peripherals, Anthropic&apos;s Model Context Protocol (MCP) creates an open standard for AI tools and resources.
        </p>
      </div>

      {/* The N x M Plumbing Crisis */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl">
            <Cable size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The N × M Plumbing Crisis</h2>
            <p className="text-xs text-slate-400">Why bespoke point-to-point tool adapters collapse in production</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-2">
            <span className="text-rose-400 font-bold block text-sm">Bespoke Point-to-Point Plumbing</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              5 AI clients (LangGraph, Claude Desktop, ChatGPT, Ollama, VS Code) connecting to 10 enterprise tools (PostgreSQL, Jira, MinIO, SAP, SCADA) requires <strong>50 separate custom integration adapters</strong>. When a schema alters, all 50 break simultaneously.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
            <span className="text-emerald-400 font-bold block text-sm">The MCP Standard (ODBC / USB-C for AI)</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              Build <strong>One MCP Server</strong> for your enterprise services. Any compliant client connects via JSON-RPC 2.0 (stdio or SSE), auto-discovers available tools and schemas, and starts executing safely without client-side code changes.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 MCP Primitives */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Cpu size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The 3 Primitives of an MCP Server</h2>
            <p className="text-xs text-slate-400">Standardized JSON-RPC 2.0 contract interfaces</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-emerald-400 block text-sm">1. Tools</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Executable functions with strongly-typed JSON schema arguments (e.g. <code className="text-emerald-300">get_chiller_telemetry(chiller_id)</code>). Emits results back to the LLM.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-cyan-400 block text-sm">2. Resources</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Read-only data endpoints URI-addressed (e.g. <code className="text-cyan-300">sop://chillers/section3.md</code> or streaming tail logs). Provides background context to the model.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-amber-400 block text-sm">3. Prompts</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Pre-packaged prompt templates and operational workflows defined by system administrators that guide how agents reason across services.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive MCP Architecture Diagram */}
      <div className="my-8">
        <McpDiagram />
      </div>

      {/* Interactive Hands-On MCP Inspection */}
      <div className="my-8">
        <McpTemplateHandsOn />
      </div>

      {/* Supply Chain Warning */}
      <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs font-mono text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <ShieldAlert size={18} />
          Critical Enterprise Warning: MCP is a Software Supply-Chain Decision
        </div>
        <p className="font-sans leading-relaxed text-slate-300">
          Connecting an untrusted third-party MCP server from GitHub or Reddit is <strong>running arbitrary executable code inside your corporate perimeter</strong>. An MCP server inherits the full OS permissions of the launching user and can read files, exfiltrate environment variables, or run unvetted queries. Standardized does not mean safe—strictly govern your internal MCP registry!
        </p>
      </div>

      {/* Langflow vs n8n Battle Card */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Workflow size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Langflow vs n8n: The Enterprise Division of Labor</h2>
            <p className="text-xs text-slate-400">Designing the Brain vs Connecting the Nervous System</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Platform</th>
                <th className="p-3">Core Specialty</th>
                <th className="p-3">Ideal Role in NDDB Architecture</th>
                <th className="p-3">Connector Ecosystem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-indigo-400">Langflow</td>
                <td className="p-3">LLM-First: Fine-tuning prompts, vector embeddings, chunking, and cyclic graphs</td>
                <td className="p-3 text-indigo-300 font-bold">The AI Brain (Model Reasoning Engine)</td>
                <td className="p-3 text-slate-400">AI-centric vector stores &amp; LLM providers</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-amber-400">n8n</td>
                <td className="p-3">Automation-First: Enterprise event triggers, CRON schedules, retry policies</td>
                <td className="p-3 text-amber-300 font-bold">The Corporate Nervous System</td>
                <td className="p-3 text-slate-300">400+ Enterprise Connectors (Postgres, Jira, SAP, Slack, Outlook)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day5/q2-agentic-rag" className="button-secondary">
          <ArrowLeft size={16} /> Prev: Q2 Agentic RAG
        </Link>
        <Link href="/day5/q4-scaling-security" className="button-primary">
          Next: Q4 Scaling &amp; Security <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
