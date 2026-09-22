'use client';
import React, { useState } from 'react';
import { Database, Terminal, Code2, Server, Play, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function McpTemplateHandsOn() {
  const [activeTab, setActiveTab] = useState<'template' | 'business_logic'>('template');
  const [isServerRunning, setIsServerRunning] = useState(false);

  const templateCode = `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { executeQuery } from "./business_logic.js"; // You write this!

// 1. Initialize the MCP Server (Boilerplate)
const server = new McpServer({
  name: "nddb-sql-mcp",
  version: "1.0.0"
});

// 2. Register a Tool
server.tool(
  "query_database",
  { query: z.string() },
  async ({ query }) => {
    // 3. Call your business logic
    const results = await executeQuery(query);
    return {
      content: [{ type: "text", text: JSON.stringify(results) }]
    };
  }
);

// 4. Start the Server over Stdio (Boilerplate)
const transport = new StdioServerTransport();
await server.connect(transport);
console.log("MCP Server running on stdio");
`;

  const businessLogicCode = `import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Connect to the internal SQL Database
async function getDb() {
  return open({
    filename: '/opt/data/chillers.db',
    driver: sqlite3.Database
  });
}

// Execute the query requested by the LLM
export async function executeQuery(sqlQuery: string) {
  // SAFETY CHECK: Only allow SELECT statements!
  if (!sqlQuery.trim().toUpperCase().startsWith('SELECT')) {
    throw new Error("Security Violation: Only SELECT queries are permitted.");
  }
  
  const db = await getDb();
  try {
    const rows = await db.all(sqlQuery);
    return rows;
  } catch (error) {
    return { error: error.message };
  }
}
`;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold text-lg">MCP Server Template</h3>
              <p className="text-slate-400 text-sm">Separating protocol boilerplate from business logic</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsServerRunning(!isServerRunning)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              isServerRunning 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 hover:bg-indigo-500/30'
            }`}
          >
            {isServerRunning ? (
              <><CheckCircle2 className="w-4 h-4" /> Server Listening (stdio)</>
            ) : (
              <><Play className="w-4 h-4" /> Start Server</>
            )}
          </button>
        </div>
      </div>

      {/* Editor Split View */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Pane - Protocol Boilerplate */}
        <div className="border-r border-slate-700">
          <div className="flex items-center justify-between bg-slate-800/80 px-4 py-2 border-b border-slate-700">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
              <Server className="w-4 h-4" /> mcp_server.ts
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold bg-slate-800 px-2 py-0.5 rounded">We Provide This</span>
          </div>
          <div className="p-4 bg-[#1e1e1e] overflow-x-auto h-[400px]">
            <pre className="text-sm font-mono leading-relaxed text-slate-300">
              <code>{templateCode}</code>
            </pre>
          </div>
        </div>

        {/* Right Pane - Business Logic */}
        <div className="bg-[#1e1e1e]">
          <div className="flex items-center justify-between bg-emerald-900/20 px-4 py-2 border-b border-slate-700">
            <div className="flex items-center gap-2 text-emerald-300 font-mono text-sm">
              <Code2 className="w-4 h-4" /> business_logic.ts
            </div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold bg-emerald-900/40 border border-emerald-500/30 px-2 py-0.5 rounded animate-pulse">You Write This</span>
          </div>
          <div className="p-4 overflow-x-auto h-[400px]">
            <pre className="text-sm font-mono leading-relaxed text-emerald-100/90">
              <code>{businessLogicCode}</code>
            </pre>
          </div>
        </div>
      </div>


    </div>
  );
}
