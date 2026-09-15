'use client';
import React, { useState } from 'react';
import { Terminal, Eye, Code } from 'lucide-react';

const PYTHON_CODE = [
  { line: 1, text: "from langchain_community.document_loaders import DoclingLoader", node: 'loader' },
  { line: 2, text: "from langchain_text_splitters import RecursiveCharacterTextSplitter", node: 'chunker' },
  { line: 3, text: "from langchain_openai import OpenAIEmbeddings, ChatOpenAI", node: 'llm_embed' },
  { line: 4, text: "from langchain_community.vectorstores import FAISS", node: 'vector_store' },
  { line: 5, text: "from langchain_core.prompts import ChatPromptTemplate", node: 'prompt' },
  { line: 6, text: "", node: null },
  { line: 7, text: "# 1. Document Loader Node", node: 'loader' },
  { line: 8, text: "loader = DoclingLoader('chilling_center_report.pdf')", node: 'loader' },
  { line: 9, text: "docs = loader.load()", node: 'loader' },
  { line: 10, text: "", node: null },
  { line: 11, text: "# 2. Chunker Node", node: 'chunker' },
  { line: 12, text: "text_splitter = RecursiveCharacterTextSplitter(", node: 'chunker' },
  { line: 13, text: "    chunk_size=1000,", node: 'chunker' },
  { line: 14, text: "    chunk_overlap=200", node: 'chunker' },
  { line: 15, text: ")", node: 'chunker' },
  { line: 16, text: "splits = text_splitter.split_documents(docs)", node: 'chunker' },
  { line: 17, text: "", node: null },
  { line: 18, text: "# 3 & 4. Embedder and Vector Store Nodes", node: 'vector_store' },
  { line: 19, text: "vectorstore = FAISS.from_documents(", node: 'vector_store' },
  { line: 20, text: "    documents=splits, ", node: 'vector_store' },
  { line: 21, text: "    embedding=OpenAIEmbeddings(model='text-embedding-3-small')", node: 'vector_store' },
  { line: 22, text: ")", node: 'vector_store' },
  { line: 23, text: "", node: null },
  { line: 24, text: "# 5. Retriever Node", node: 'retriever' },
  { line: 25, text: "retriever = vectorstore.as_retriever()", node: 'retriever' },
  { line: 26, text: "", node: null },
  { line: 27, text: "# 6. Prompt Template Node", node: 'prompt' },
  { line: 28, text: "prompt = ChatPromptTemplate.from_template('''", node: 'prompt' },
  { line: 29, text: "Role: You are an NDDB assistant.", node: 'prompt' },
  { line: 30, text: "Context: {context}", node: 'prompt' },
  { line: 31, text: "Question: {question}", node: 'prompt' },
  { line: 32, text: "''')", node: 'prompt' },
  { line: 33, text: "", node: null },
  { line: 34, text: "# 7 & 8. LLM and Chain Execution", node: 'llm_embed' },
  { line: 35, text: "llm = ChatOpenAI(model='gpt-4o-mini')", node: 'llm_embed' },
  { line: 36, text: "chain = (", node: 'retriever' },
  { line: 37, text: "    {'context': retriever, 'question': RunnablePassthrough()}", node: 'retriever' },
  { line: 38, text: "    | prompt", node: 'prompt' },
  { line: 39, text: "    | llm", node: 'llm_embed' },
  { line: 40, text: ")", node: 'llm_embed' },
];

export default function InteractiveCodeAnnotator() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const NODES = [
    { id: 'loader', label: '1. Document Loader (Docling)', color: 'bg-sky-500', text: 'text-sky-400' },
    { id: 'chunker', label: '2. Chunker Node', color: 'bg-purple-500', text: 'text-purple-400' },
    { id: 'vector_store', label: '3 & 4. Embedder + Vector Store', color: 'bg-indigo-500', text: 'text-indigo-400' },
    { id: 'retriever', label: '5. Retriever Node', color: 'bg-emerald-500', text: 'text-emerald-400' },
    { id: 'prompt', label: '6. Prompt Template', color: 'bg-amber-500', text: 'text-amber-400' },
    { id: 'llm_embed', label: '7. LLM Node', color: 'bg-rose-500', text: 'text-rose-400' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
      
      {/* Node List (Left) */}
      <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl mb-4">
          <h3 className="font-bold text-white flex items-center gap-2 mb-2"><Eye size={16}/> Hover to Inspect</h3>
          <p className="text-xs text-slate-400">
            Hover over the Langflow nodes below to see exactly which lines of Python code they generated in the background.
          </p>
        </div>
        
        {NODES.map(node => (
          <div 
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className={`p-3 rounded-xl border transition-all cursor-crosshair flex items-center gap-3 ${
              hoveredNode === node.id 
                ? `bg-slate-800 border-${node.color.split('-')[1]}-500/50 shadow-lg scale-105 z-10` 
                : 'bg-slate-950 border-slate-800 opacity-80'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${node.color}`} />
            <span className={`font-bold text-sm ${hoveredNode === node.id ? 'text-white' : 'text-slate-300'}`}>
              {node.label}
            </span>
          </div>
        ))}
      </div>

      {/* Code View (Right) */}
      <div className="lg:col-span-8">
        <div className="rounded-2xl bg-[#0d1117] border border-slate-800 overflow-hidden shadow-2xl relative">
          
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-slate-800">
            <Terminal size={14} className="text-slate-500" />
            <span className="text-xs font-mono text-slate-400">exported_rag_pipeline.py</span>
          </div>

          <div className="p-6 font-mono text-xs md:text-sm overflow-x-auto">
            {PYTHON_CODE.map((line) => {
              const isHighlighted = hoveredNode === line.node;
              const isDimmed = hoveredNode !== null && hoveredNode !== line.node;
              
              // Find node color for highlight effect
              const activeNodeData = NODES.find(n => n.id === line.node);
              const highlightClass = isHighlighted && activeNodeData 
                ? `bg-slate-800 border-l-2 border-${activeNodeData.color.split('-')[1]}-500 ${activeNodeData.text}` 
                : 'border-l-2 border-transparent text-slate-300';

              return (
                <div 
                  key={line.line}
                  className={`flex transition-all duration-200 ${highlightClass} ${isDimmed ? 'opacity-30' : 'opacity-100'} hover:bg-slate-800/50`}
                >
                  <div className="w-8 shrink-0 text-slate-600 text-right pr-4 select-none">
                    {line.line}
                  </div>
                  <div className="whitespace-pre">
                    {line.text}
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
