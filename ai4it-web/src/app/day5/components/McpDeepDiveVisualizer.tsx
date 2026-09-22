'use client';

import React, { useState } from 'react';
import { Network, Database, RefreshCw, CheckCircle2, ArrowRight, Zap, Code2, Server } from 'lucide-react';

export default function McpDeepDiveVisualizer() {
  const [activeTab, setActiveTab] = useState<'problem' | 'protocol' | 'comparison'>('problem');

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-4 pb-2">
        <button
          onClick={() => setActiveTab('problem')}
          className={`pb-2 px-1 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'problem' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          1. The N × M Integration Crisis
        </button>
        <button
          onClick={() => setActiveTab('protocol')}
          className={`pb-2 px-1 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'protocol' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          2. The Protocol Architecture (Client · Host · Server)
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`pb-2 px-1 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'comparison' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          3. REST vs Function Calling vs MCP
        </button>
      </div>

      {/* Tab 1: The N x M Problem */}
      {activeTab === 'problem' && (
        <div className="glass-card p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">The Burning Question: "Why MCP if APIs already existed?"</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every IT engineer asks: <em>"We had REST APIs and Swagger for 15 years, and OpenAI released Function Calling in 2023. Why did Anthropic build Model Context Protocol (MCP) and why is everyone adopting it?"</em>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-3">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Without MCP: The N × M Mess</span>
              <p className="text-xs text-rose-200 leading-relaxed">
                You have 4 AI Clients (Claude Desktop, Antigravity IDE, Langflow, ChatGPT) and 5 Enterprise Data Sources (Chilling Center DB, SCADA Sensors, Jira ITSM, SAP ERP, Git).
              </p>
              <div className="p-3 bg-slate-950 rounded border border-rose-900/40 text-center font-mono text-sm text-rose-300 font-bold">
                4 Clients × 5 Data Sources = 20 Custom Connectors!
              </div>
              <p className="text-xs text-slate-400">
                Each client writes its own authentication, payload parsing, schema serialization, and error recovery. A total maintenance nightmare.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">With MCP: The Universal Standard Bus</span>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Build <strong>one MCP Server</strong> per enterprise asset. Any AI host that speaks MCP plugs in automatically.
              </p>
              <div className="p-3 bg-slate-950 rounded border border-emerald-900/40 text-center font-mono text-sm text-emerald-300 font-bold">
                4 Clients + 5 MCP Servers = 9 Total Components!
              </div>
              <p className="text-xs text-slate-400">
                Just like <strong>ODBC</strong> standardized database drivers, or <strong>USB-C</strong> standardized hardware cables, or <strong>LSP</strong> standardized code editors.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: The Protocol Architecture */}
      {activeTab === 'protocol' && (
        <div className="glass-card p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">The MCP Triad: Host, Client, and Server</h3>
            <p className="text-sm text-slate-300">
              MCP operates over JSON-RPC 2.0 (via local Stdio or network SSE). It exposes three distinct capability primitives:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/40 space-y-2">
              <div className="text-blue-400 font-bold text-sm flex items-center gap-1.5">
                <Code2 size={16} /> 1. Tools (Executable Actions)
              </div>
              <p className="text-xs text-slate-300">
                Callable functions that take parameters and run real operations:
              </p>
              <code className="text-[11px] block bg-slate-900 p-2 rounded text-blue-300 font-mono">
                tools/list<br />
                tools/call (e.g. get_temp)
              </code>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-2">
              <div className="text-purple-400 font-bold text-sm flex items-center gap-1.5">
                <Database size={16} /> 2. Resources (Readable Context)
              </div>
              <p className="text-xs text-slate-300">
                Read-only static or dynamic data streams identified by URIs:
              </p>
              <code className="text-[11px] block bg-slate-900 p-2 rounded text-purple-300 font-mono">
                resources/list<br />
                resources/read (chillers://status)
              </code>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2">
              <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                <Zap size={16} /> 3. Prompts (Pre-Built Workflows)
              </div>
              <p className="text-xs text-slate-300">
                Reusable prompt templates packaged right on the server:
              </p>
              <code className="text-[11px] block bg-slate-900 p-2 rounded text-amber-300 font-mono">
                prompts/list<br />
                prompts/get (audit_chiller_incident)
              </code>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Detailed Comparison */}
      {activeTab === 'comparison' && (
        <div className="glass-card p-6 space-y-6">
          <h3 className="text-xl font-bold text-white mb-2">Technical Matrix: REST vs Function Calling vs MCP</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="py-2.5 px-3">Dimension</th>
                  <th className="py-2.5 px-3">Traditional REST API</th>
                  <th className="py-2.5 px-3">OpenAI Function Calling</th>
                  <th className="py-2.5 px-3 text-emerald-400">Model Context Protocol (MCP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">Target Consumer</td>
                  <td className="py-2.5 px-3">Human software developers</td>
                  <td className="py-2.5 px-3">A single LLM endpoint</td>
                  <td className="py-2.5 px-3 text-emerald-300 font-bold">Any AI client or Host IDE</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">Discovery</td>
                  <td className="py-2.5 px-3">Read Swagger/OpenAPI docs</td>
                  <td className="py-2.5 px-3">Manually pasted into prompt payload</td>
                  <td className="py-2.5 px-3 text-emerald-300 font-bold">Autonomous Protocol Handshake (`tools/list`)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">Execution Layer</td>
                  <td className="py-2.5 px-3">Remote cloud web server</td>
                  <td className="py-2.5 px-3">Handled by custom application code</td>
                  <td className="py-2.5 px-3 text-emerald-300 font-bold">Local-First (Stdio) or Remote (SSE)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">Enterprise Analogy</td>
                  <td className="py-2.5 px-3">Webhooks & HTTP Endpoints</td>
                  <td className="py-2.5 px-3">Proprietary plugin format</td>
                  <td className="py-2.5 px-3 text-emerald-300 font-bold">ODBC / USB-C / Language Server (LSP)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
