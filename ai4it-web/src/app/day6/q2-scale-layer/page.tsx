'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Box, Activity, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ScaleLayerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsRunning(false);
            return 100;
          }
          return p + 5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTest = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <Link href="/day6" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 6
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Q2: The Scale Layer & vLLM</h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          It's time to break the servers. We are moving from a single laptop API to enterprise concurrency using **Continuous Batching** and **KV-Caching** with vLLM.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="glass-card flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-cyan-400" size={24} />
            <h2 className="text-xl font-bold text-white">Standard Naive API</h2>
          </div>
          <p className="text-sm text-slate-400 mb-6 flex-grow">
            Traditional batching locks the GPU until the longest sequence completes. Watch what happens to the p99 latency when 200 concurrent users hit this endpoint.
          </p>
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm border border-slate-800 h-48 flex flex-col justify-end">
            {isRunning && progress > 20 && <div className="text-emerald-500">Users: {Math.floor(progress * 0.5)} ... Latency: 1.2s</div>}
            {isRunning && progress > 40 && <div className="text-emerald-500">Users: {Math.floor(progress * 1.2)} ... Latency: 2.8s</div>}
            {isRunning && progress > 60 && <div className="text-amber-500">Users: {Math.floor(progress * 1.8)} ... Latency: 8.4s [WARN]</div>}
            {isRunning && progress > 80 && <div className="text-rose-500">Users: {Math.floor(progress * 2.0)} ... Latency: 15.2s [TIMEOUT]</div>}
            {progress === 100 && <div className="text-rose-500 font-bold mt-2">CRITICAL FAILURE: 503 Service Unavailable</div>}
          </div>
        </div>

        <div className="glass-card flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Box className="text-emerald-400" size={24} />
            <h2 className="text-xl font-bold text-white">vLLM (Continuous Batching)</h2>
          </div>
          <p className="text-sm text-slate-400 mb-6 flex-grow">
            vLLM dynamically interleaves tokens and manages KV-Cache like virtual memory. Let's hit it with the exact same 200 concurrent users.
          </p>
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm border border-slate-800 h-48 flex flex-col justify-end">
            {isRunning && progress > 20 && <div className="text-emerald-500">Users: {Math.floor(progress * 0.5)} ... Latency: 0.8s</div>}
            {isRunning && progress > 40 && <div className="text-emerald-500">Users: {Math.floor(progress * 1.2)} ... Latency: 1.1s</div>}
            {isRunning && progress > 60 && <div className="text-emerald-500">Users: {Math.floor(progress * 1.8)} ... Latency: 1.4s</div>}
            {isRunning && progress > 80 && <div className="text-emerald-500">Users: {Math.floor(progress * 2.0)} ... Latency: 1.8s</div>}
            {progress === 100 && <div className="text-emerald-400 font-bold mt-2">SUCCESS: All requests served under 2s.</div>}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={startTest} 
          disabled={isRunning}
          className="button-primary flex items-center gap-2 text-lg px-8 py-4"
        >
          <Terminal size={20} />
          {isRunning ? 'Running Locust Load Test...' : 'Start Locust Load Test'}
        </button>
      </div>

      <div className="flex justify-between pt-8 mt-12 border-t border-slate-800">
        <Link href="/day6/q1-trust-layer" className="button-secondary">
          <ArrowLeft size={16} /> Prev: Q1 Trust Layer
        </Link>
        <Link href="/day6/q3-reality-layer" className="button-primary">
          Next: Q3 Reality Layer <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
