'use client';
import React, { useState } from 'react';
import { FileText, ArrowRight, Eye, Code2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DoclingVisualizer() {
  const [activeTab, setActiveTab] = useState<'naive' | 'docling'>('naive');

  return (
    <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl my-8">
      
      {/* Header Tabs */}
      <div className="flex border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('naive')}
          className={`flex-1 p-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'naive' ? 'bg-rose-950/40 text-rose-400 border-b-2 border-rose-500' : 'text-slate-500 hover:bg-slate-900'}`}
        >
          <AlertTriangle size={16} /> Standard Python Extractor
        </button>
        <button 
          onClick={() => setActiveTab('docling')}
          className={`flex-1 p-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'docling' ? 'bg-emerald-950/40 text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:bg-slate-900'}`}
        >
          <CheckCircle2 size={16} /> IBM Docling (DMS Integration)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        {/* Source PDF View */}
        <div className="p-6 border-r border-slate-800 bg-slate-900 relative">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold bg-slate-950 px-2 py-1 rounded">
            <FileText size={12} /> Source PDF
          </div>
          
          <div className="mt-8 bg-white text-black p-6 rounded shadow-lg font-serif text-sm h-[320px] overflow-hidden opacity-90">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Quarterly Chilling Report</h2>
            <div className="flex gap-6">
              <div className="flex-1">
                <h3 className="font-bold mb-2">North Region</h3>
                <p>Output dropped 12% in May due to localized grid failures. Generators activated successfully but fuel costs rose.</p>
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-2">South Region</h3>
                <p>Output stable. New compressors installed at Mehsana facility increased efficiency by 4%.</p>
              </div>
            </div>
            
            <table className="w-full mt-6 text-xs border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left">Facility</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Volume (L)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Anand-01</td>
                  <td className="border p-2 text-green-700">Online</td>
                  <td className="border p-2">45,000</td>
                </tr>
                <tr>
                  <td className="border p-2">Mehsana-R</td>
                  <td className="border p-2 text-red-700">Offline</td>
                  <td className="border p-2">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Extracted Output View */}
        <div className="p-6 bg-slate-950 relative">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold bg-slate-900 px-2 py-1 rounded border border-slate-800 z-10">
            <Code2 size={12} /> LLM Sees This
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'naive' ? (
              <motion.div 
                key="naive"
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="mt-8 h-full"
              >
                <div className="h-full bg-slate-900/50 p-4 rounded-xl border border-rose-900/50 font-mono text-xs text-rose-300 whitespace-pre-wrap overflow-y-auto">
{`Quarterly Chilling Report
North Region South Region
Output dropped 12% in May Output stable. New
due to localized grid failures. compressors installed at
Generators activated Mehsana facility increased
successfully but fuel costs rose. efficiency by 4%.
Facility Status Volume (L) Anand-01 Online 45,000 Mehsana-R Offline 0`}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-rose-950/30 border border-rose-900 text-xs text-rose-400 font-bold flex items-start gap-2">
                  <Eye size={16} className="shrink-0 mt-0.5" />
                  <p>Columns are read straight across, mixing North and South together. The table is flattened into word soup. If the LLM reads this, it hallucinates.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="docling"
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="mt-8 h-full"
              >
                <div className="h-full bg-slate-900/50 p-4 rounded-xl border border-emerald-900/50 font-mono text-xs text-emerald-300 whitespace-pre-wrap overflow-y-auto">
{`# Quarterly Chilling Report

## North Region
Output dropped 12% in May due to localized grid failures. Generators activated successfully but fuel costs rose.

## South Region
Output stable. New compressors installed at Mehsana facility increased efficiency by 4%.

| Facility | Status | Volume (L) |
|---|---|---|
| Anand-01 | Online | 45,000 |
| Mehsana-R | Offline | 0 |`}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-900 text-xs text-emerald-400 font-bold flex items-start gap-2">
                  <Eye size={16} className="shrink-0 mt-0.5" />
                  <p>Layout logic is preserved. Columns read sequentially. Tables are converted to strict Markdown. The LLM can easily parse and cite this.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
