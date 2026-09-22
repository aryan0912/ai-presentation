'use client';

import React, { useState } from 'react';
import { Terminal, Database, Play, CheckCircle2, RefreshCw, Send, ArrowRight } from 'lucide-react';

interface ChillerRow {
  id: string;
  location: string;
  temp: number;
  compressor: 'RUNNING' | 'IDLE' | 'TRIPPED';
  updatedAt: string;
}

const INITIAL_DB: ChillerRow[] = [
  { id: 'BMC-01', location: 'Anand Main Dairy', temp: 3.8, compressor: 'RUNNING', updatedAt: '2 mins ago' },
  { id: 'BMC-02', location: 'Kheda Chilling Centre', temp: 4.1, compressor: 'RUNNING', updatedAt: '1 min ago' },
  { id: 'BMC-04', location: 'Baroda North Hub', temp: 7.4, compressor: 'TRIPPED', updatedAt: 'Just now' },
  { id: 'BMC-07', location: 'Nadiad Rural BMC', temp: 3.5, compressor: 'IDLE', updatedAt: '5 mins ago' },
];

export default function BuildAnMcpLab() {
  const [database, setDatabase] = useState<ChillerRow[]>(INITIAL_DB);
  const [selectedMethod, setSelectedMethod] = useState<'tools/list' | 'tools/call' | 'resources/read'>('tools/list');
  const [selectedChiller, setSelectedChiller] = useState<string>('BMC-04');
  const [alertReason, setAlertReason] = useState<string>('High temperature warning (7.4C)');
  const [jsonRpcLog, setJsonRpcLog] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const executeMcpCall = () => {
    setIsExecuting(true);
    const newLogs: string[] = [];

    if (selectedMethod === 'tools/list') {
      newLogs.push(`--> CLIENT REQUEST:\n{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}`);
      setTimeout(() => {
        newLogs.push(`<-- MCP SERVER RESPONSE:\n{\n  "jsonrpc": "2.0",\n  "id": 1,\n  "result": {\n    "tools": [\n      {\n        "name": "get_chiller_telemetry",\n        "description": "Fetch real-time sensor metrics for BMC chiller",\n        "inputSchema": { "type": "object", "properties": { "chiller_id": { "type": "string" } }, "required": ["chiller_id"] }\n      },\n      {\n        "name": "log_incident_alert",\n        "description": "Log an urgent maintenance incident in the chilling DB",\n        "inputSchema": { "type": "object", "properties": { "chiller_id": { "type": "string" }, "reason": { "type": "string" } }, "required": ["chiller_id", "reason"] }\n      }\n    ]\n  }\n}`);
        setJsonRpcLog(newLogs);
        setIsExecuting(false);
      }, 400);
    } else if (selectedMethod === 'tools/call') {
      newLogs.push(`--> CLIENT CALL:\n{"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "get_chiller_telemetry", "arguments": {"chiller_id": "${selectedChiller}"}}}`);
      setTimeout(() => {
        const item = database.find(c => c.id === selectedChiller) || database[0];
        newLogs.push(`<-- MCP SERVER RESPONSE (From SQLite Query):\n{\n  "jsonrpc": "2.0",\n  "id": 2,\n  "result": {\n    "content": [\n      {\n        "type": "text",\n        "text": "{\\"id\\": \\"${item.id}\\", \\"location\\": \\"${item.location}\\", \\"temperature\\": ${item.temp}, \\"compressor\\": \\"${item.compressor}\\", \\"status\\": \\"${item.temp > 4.5 ? 'CRITICAL_HIGH' : 'NORMAL'}\\"}"\n      }\n    ]\n  }\n}`);
        setJsonRpcLog(newLogs);
        setIsExecuting(false);
      }, 400);
    } else {
      newLogs.push(`--> CLIENT REQUEST:\n{"jsonrpc": "2.0", "id": 3, "method": "resources/read", "params": {"uri": "chillers://fleet/status"}}`);
      setTimeout(() => {
        newLogs.push(`<-- MCP SERVER RESOURCE DATA:\n{\n  "jsonrpc": "2.0",\n  "id": 3,\n  "result": {\n    "contents": [\n      {\n        "uri": "chillers://fleet/status",\n        "mimeType": "application/json",\n        "text": "Total Active BMCs: ${database.length}, Alarms: 1 (BMC-04)"\n      }\n    ]\n  }\n}`);
        setJsonRpcLog(newLogs);
        setIsExecuting(false);
      }, 400);
    }
  };

  return (
    <div className="space-y-6">
      {/* Synthetic Database View */}
      <div className="glass-card p-5 border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-emerald-400" />
            <h3 className="font-bold text-white text-base">Synthetic SQLite Database: `nddb_chilling_telemetry.db`</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">4 Active Rows (In-Memory)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="py-2 px-3">Chiller ID</th>
                <th className="py-2 px-3">Location</th>
                <th className="py-2 px-3">Temp (°C)</th>
                <th className="py-2 px-3">Compressor</th>
                <th className="py-2 px-3">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {database.map((c) => (
                <tr key={c.id} className={c.temp > 4.5 ? 'bg-rose-950/20 text-rose-300' : ''}>
                  <td className="py-2 px-3 font-bold text-white">{c.id}</td>
                  <td className="py-2 px-3">{c.location}</td>
                  <td className="py-2 px-3 font-bold">{c.temp}°C</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.compressor === 'RUNNING' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {c.compressor}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-400">{c.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Protocol Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Handshake Controls */}
        <div className="lg:col-span-5 glass-card p-5 space-y-4">
          <span className="text-xs font-mono uppercase text-blue-400 font-bold block">1. Configure JSON-RPC Dispatch</span>

          <div className="space-y-3">
            <label className="text-xs text-slate-300 font-medium block">Select MCP Method to Send:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedMethod('tools/list')}
                className={`p-2.5 rounded-lg border text-xs font-mono transition-all text-center ${
                  selectedMethod === 'tools/list' ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                tools/list
              </button>
              <button
                onClick={() => setSelectedMethod('tools/call')}
                className={`p-2.5 rounded-lg border text-xs font-mono transition-all text-center ${
                  selectedMethod === 'tools/call' ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                tools/call
              </button>
              <button
                onClick={() => setSelectedMethod('resources/read')}
                className={`p-2.5 rounded-lg border text-xs font-mono transition-all text-center ${
                  selectedMethod === 'resources/read' ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                resources/read
              </button>
            </div>

            {selectedMethod === 'tools/call' && (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 animate-in fade-in">
                <label className="text-[11px] font-mono text-slate-400 block">Parameter `chiller_id`:</label>
                <select
                  value={selectedChiller}
                  onChange={(e) => setSelectedChiller(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs font-mono text-white"
                >
                  <option value="BMC-01">BMC-01 (Anand)</option>
                  <option value="BMC-02">BMC-02 (Kheda)</option>
                  <option value="BMC-04">BMC-04 (Baroda - High Temp Alarm)</option>
                  <option value="BMC-07">BMC-07 (Nadiad)</option>
                </select>
              </div>
            )}

            <button
              onClick={executeMcpCall}
              disabled={isExecuting}
              className="w-full button-primary flex items-center justify-center gap-2 mt-4"
            >
              {isExecuting ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
              <span>Send JSON-RPC over Stdio</span>
            </button>
          </div>
        </div>

        {/* Right: Raw JSON-RPC Handshake Inspector */}
        <div className="lg:col-span-7 glass-card p-5 space-y-3 bg-slate-950/80 border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
              <Terminal size={14} /> 2. Live JSON-RPC 2.0 Wire Inspector
            </span>
            <span className="text-[11px] font-mono text-slate-500">Stdio Stream</span>
          </div>

          <div className="h-64 overflow-y-auto p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-300 space-y-3">
            {jsonRpcLog.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-600">
                Click "Send JSON-RPC over Stdio" to inspect the MCP handshake...
              </div>
            ) : (
              jsonRpcLog.map((log, idx) => (
                <pre key={idx} className={`p-2.5 rounded whitespace-pre-wrap ${
                  log.startsWith('-->') ? 'bg-blue-950/30 text-blue-300 border border-blue-900/40' : 'bg-emerald-950/30 text-emerald-300 border border-emerald-900/40'
                }`}>
                  {log}
                </pre>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
