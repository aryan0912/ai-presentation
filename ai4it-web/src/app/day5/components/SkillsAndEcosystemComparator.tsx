'use client';

import React, { useState } from 'react';
import { Sparkles, Terminal, Bot, Cpu, FolderCode, FileCode, CheckCircle2, Copy } from 'lucide-react';

interface EcosystemItem {
  id: string;
  name: string;
  badge: string;
  concept: string;
  howItWorks: string;
  configExample: string;
}

const PLATFORMS: EcosystemItem[] = [
  {
    id: 'antigravity',
    name: 'Google Antigravity (Our IDE)',
    badge: 'IDE Native',
    concept: 'Skills (Markdown + Scripts) + MCP Servers (Background Processes)',
    howItWorks: 'Skills are loaded dynamically from `.agents/skills/` based on semantic triggers in user requests. MCP servers run lazily or eagerly via `mcp_config.json` in the user app data directory, exposing tools that the agent calls as native APIs.',
    configExample: `// ~/.gemini/antigravity-ide/mcp_config.json
{
  "mcpServers": {
    "chilling-center-db": {
      "command": "python",
      "args": ["-m", "mcp_servers.dairy_sql", "--db", "./telemetry.db"],
      "env": { "NDDB_ENV": "production" }
    }
  }
}`,
  },
  {
    id: 'claude',
    name: 'Claude Desktop',
    badge: 'Desktop App',
    concept: 'Local MCP Host connecting to filesystem, SQLite, and custom tools',
    howItWorks: 'Anthropic designed Claude Desktop as a native MCP Host. When Claude launches, it reads its JSON config, starts background child processes via Stdio, lists their tools via `tools/list`, and presents a hammer/wrench icon in the chat box.',
    configExample: `// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "sqlite-telemetry": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "/var/nddb/chillers.db"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/docs/sops"]
    }
  }
}`,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT & Custom GPTs',
    badge: 'Cloud Web',
    concept: 'Custom Actions (OpenAPI / Swagger specs over HTTPS)',
    howItWorks: 'Unlike local MCP which runs processes on your local laptop, ChatGPT Actions communicate over the public internet to remote HTTPS servers using OpenAPI JSON schemas. It requires exposing internal endpoints or using tunnels (ngrok/Cloudflare).',
    configExample: `// Custom GPT Action Schema (OpenAPI 3.1.0)
{
  "openapi": "3.1.0",
  "info": { "title": "NDDB Chiller API", "version": "1.0.0" },
  "paths": {
    "/api/chiller/status": {
      "get": {
        "operationId": "getChillerStatus",
        "summary": "Retrieve live chiller temperature",
        "parameters": [{ "name": "chiller_id", "in": "query", "required": true }]
      }
    }
  }
}`,
  },
  {
    id: 'langflow_n8n',
    name: 'Langflow & n8n',
    badge: 'Visual Orchestrators',
    concept: 'Visual Nodes for Agent Runtimes & Enterprise Connectors',
    howItWorks: 'Langflow provides the Agent Reasoning node (LangChain/LangGraph under the hood) where tools can be dragged and attached. n8n acts as the external connector bus, exposing hundreds of enterprise nodes (SAP, Jira, Slack, WhatsApp) as MCP or webhook endpoints.',
    configExample: `// Conceptual n8n Agent Node Binding
{
  "node": "n8n-nodes-langchain.agent",
  "parameters": {
    "tools": [
      "n8n-tool-jira-create-ticket",
      "n8n-tool-scada-telemetry-webhook",
      "mcp-connector-bmc-database"
    ]
  }
}`,
  },
];

export default function SkillsAndEcosystemComparator() {
  const [selected, setSelected] = useState<EcosystemItem>(PLATFORMS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selected.configExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Platform Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PLATFORMS.map((p) => {
          const isSelected = selected.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-blue-950/50 border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  isSelected ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {p.badge}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{p.name}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{p.concept}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Platform Inspection Card */}
      <div className="glass-card p-6 border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{selected.name}</h3>
            <span className="text-xs font-mono text-blue-400">{selected.concept}</span>
          </div>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">{selected.howItWorks}</p>
        </div>

        {/* Configuration snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <FileCode size={14} /> Production Configuration Payload:
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
            {selected.configExample}
          </pre>
        </div>
      </div>
    </div>
  );
}
