'use client';

import React, { useState } from 'react';
import { Network, GitFork, ArrowRight, Play, CheckCircle2, RotateCw, Layers } from 'lucide-react';

interface NodeStep {
  id: string;
  name: string;
  type: 'state' | 'llm' | 'condition' | 'tool';
  description: string;
  codeSnippet: string;
}

const NODES: NodeStep[] = [
  {
    id: 'state',
    name: '1. The State Schema',
    type: 'state',
    description: 'Every LangGraph agent begins with a typed dictionary (TypedDict) passing memory through the graph.',
    codeSnippet: `from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    chiller_id: str
    is_safe: bool`,
  },
  {
    id: 'agent',
    name: '2. The Reasoning Node (LLM)',
    type: 'llm',
    description: 'Calls the LLM with tool schemas bound. The LLM decides whether to respond with text or call a tool.',
    codeSnippet: `def call_model(state: AgentState):
    messages = state['messages']
    response = model_with_tools.invoke(messages)
    return {"messages": [response]}`,
  },
  {
    id: 'condition',
    name: '3. The Conditional Edge (Router)',
    type: 'condition',
    description: 'Inspects the last message: Did the LLM request a tool call, or did it produce a final human answer?',
    codeSnippet: `def should_continue(state: AgentState):
    last_message = state['messages'][-1]
    if not last_message.tool_calls:
        return "end" # Route to END
    return "execute_tool" # Route to Tool Node`,
  },
  {
    id: 'tool',
    name: '4. The Tool Node (The Hands)',
    type: 'tool',
    description: 'Executes the Python tool (or MCP client call), appends the result to messages, and loops back to the LLM.',
    codeSnippet: `tool_node = ToolNode([get_chiller_telemetry, log_incident])

# Loop definition in StateGraph:
workflow.add_edge("execute_tool", "call_model")`,
  },
];

export default function AgentWorkflowsVisualizer() {
  const [selectedNode, setSelectedNode] = useState<NodeStep>(NODES[0]);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isLooping, setIsLooping] = useState<boolean>(false);

  const simulateStep = () => {
    setIsLooping(true);
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % NODES.length;
      setActiveStepIdx(current);
      setSelectedNode(NODES[current]);
      if (current === 0) {
        clearInterval(interval);
        setIsLooping(false);
      }
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Visual Flow Diagram */}
      <div className="glass-card p-6 border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Network size={18} className="text-indigo-400" />
              <span>LangGraph Architecture: The Cyclic State Machine</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Workflows are DAGs (straight lines). Agents are <strong>Stateful Cycles</strong>.
            </p>
          </div>
          <button
            onClick={simulateStep}
            disabled={isLooping}
            className="button-primary flex items-center gap-1.5 text-xs py-1.5 px-3"
          >
            <Play size={13} />
            <span>{isLooping ? 'Cycling Graph...' : 'Simulate Loop'}</span>
          </button>
        </div>

        {/* The 4 Graph Nodes in Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {NODES.map((node, idx) => {
            const isSelected = selectedNode.id === node.id;
            const isActiveInLoop = activeStepIdx === idx && isLooping;
            return (
              <button
                key={node.id}
                onClick={() => {
                  setSelectedNode(node);
                  setActiveStepIdx(idx);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isActiveInLoop
                    ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-500/50'
                    : isSelected
                    ? 'bg-blue-950/40 border-blue-500 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                  Step {idx + 1}
                </div>
                <h4 className="text-xs font-bold text-white mb-1 truncate">{node.name}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{node.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code & Logic Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5 border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              {selectedNode.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
              {selectedNode.type}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{selectedNode.description}</p>
          
          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-mono text-slate-400 font-bold block">Python LangGraph Code:</span>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
              {selectedNode.codeSnippet}
            </pre>
          </div>
        </div>

        {/* Visual Langflow Equivalent */}
        <div className="glass-card p-5 border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                Langflow Visual Mapping
              </span>
              <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/40 border border-purple-800">
                No-Code GUI
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Everything in LangGraph code directly maps 1-to-1 to visual Langflow nodes:
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">State Schema</span>
                <span className="text-indigo-400">Memory Node (Buffer)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Reasoning Node</span>
                <span className="text-blue-400">Agent Node (OpenAI/Anthropic)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Tool Execution</span>
                <span className="text-emerald-400">Custom Component / MCP Tool</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-[11px] text-indigo-300 mt-4">
            <strong>Key Insight:</strong> Langflow does not replace code — it renders LangGraph's cyclic state graph into visual draggable blocks.
          </div>
        </div>
      </div>
    </div>
  );
}
