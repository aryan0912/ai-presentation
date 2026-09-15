'use client';
import React, { useState } from 'react';
import { Search, TextSearch, Spline, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HybridSearchVisualizer() {
  const [query, setQuery] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearched(true);
    }
  };

  const isExactCode = query.toUpperCase().includes('BMC-402');

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl my-8">
      
      {/* Search Input */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h3 className="text-xl font-bold text-white mb-2">Try an Exact Identifier Search</h3>
        <p className="text-sm text-slate-400 mb-6">Type an exact error code like <code className="bg-slate-900 px-2 py-1 rounded text-rose-400 border border-slate-800 font-mono">BMC-402</code> to see how semantic search fails.</p>
        
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsSearched(false);
            }}
            placeholder='e.g., "BMC-402"'
            className="w-full bg-slate-900 border border-slate-700 rounded-full px-6 py-4 text-white focus:outline-none focus:border-sky-500 font-mono text-center text-lg shadow-inner"
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 bg-sky-600 hover:bg-sky-500 rounded-full px-6 text-white font-bold transition-colors flex items-center gap-2">
            <Search size={18} /> Search
          </button>
        </form>
      </div>

      {/* Results Matrix */}
      {isSearched && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pure Semantic Vector Search */}
          <div className="p-6 rounded-2xl border border-rose-900/50 bg-rose-950/10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-900/30">
              <div className="p-2 bg-rose-950/50 text-rose-400 rounded-lg border border-rose-900"><Spline size={20} /></div>
              <div>
                <h4 className="font-bold text-rose-400">Pure Vector Search</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Semantic Meaning Only</p>
              </div>
            </div>

            <div className="flex-1">
              {isExactCode ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-sm text-slate-400">
                    <span className="font-mono text-xs block mb-1 text-slate-500">Score: 0.82</span>
                    "General maintenance procedures for bulk milk coolers..."
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-sm text-slate-400">
                    <span className="font-mono text-xs block mb-1 text-slate-500">Score: 0.79</span>
                    "Compressor fault troubleshooting guide..."
                  </div>
                  <div className="mt-4 p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg flex items-start gap-2">
                    <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-rose-300">Failed to find <code className="font-mono">BMC-402</code>. The exact string has no "semantic meaning" to embed, so it just returns general refrigeration documents.</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-emerald-900/50 bg-emerald-950/20 text-sm text-slate-300">
                  <span className="font-mono text-xs block mb-1 text-emerald-500">Score: 0.95</span>
                  Returned semantically related documents for "{query}".
                </div>
              )}
            </div>
          </div>

          {/* Keyword (BM25) Search */}
          <div className="p-6 rounded-2xl border border-sky-900/50 bg-sky-950/10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sky-900/30">
              <div className="p-2 bg-sky-950/50 text-sky-400 rounded-lg border border-sky-900"><TextSearch size={20} /></div>
              <div>
                <h4 className="font-bold text-sky-400">Keyword Search (BM25)</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Exact String Matching</p>
              </div>
            </div>

            <div className="flex-1">
              {isExactCode ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-emerald-900/50 bg-emerald-950/20 text-sm text-slate-300">
                    <span className="font-mono text-xs block mb-1 text-emerald-500">Exact Match</span>
                    "...Error Code <strong>BMC-402</strong> indicates a pressure valve failure in the primary circuit..."
                  </div>
                  <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-300">Perfect match. Keyword search excels at finding exact alphanumeric identifiers like logs, hashes, and error codes.</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-sm text-slate-400">
                  <span className="font-mono text-xs block mb-1 text-slate-500">Miss</span>
                  If you didn't type exact keywords from the document, this search will likely fail where Vector search succeeds.
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2 mt-4 p-5 rounded-xl border border-indigo-500/30 bg-indigo-950/20 text-center">
            <h4 className="font-bold text-indigo-400 mb-1">The Solution: Hybrid Search</h4>
            <p className="text-sm text-indigo-200">Run both searches simultaneously and merge the results. The failure modes cancel each other out.</p>
          </div>

        </motion.div>
      )}

    </div>
  );
}
