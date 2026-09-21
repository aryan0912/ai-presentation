'use client';

import React from 'react';

export default function LatencyPercentileChart() {
  // A mock representation of latency distribution
  const average = "800ms";
  const p99 = "14.2s";

  return (
    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Why Average Latency Lies</h3>
        <p className="text-slate-400 text-sm">
          At 10,000 users, if your 99th percentile (p99) is 14 seconds, that means hundreds of users every day are having a terrible experience, completely hidden by the "average".
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs font-mono uppercase text-slate-400">Average Latency (p50)</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{average}</div>
          <span className="text-[10px] text-slate-500 block mt-1">Looks great on a dashboard</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs font-mono uppercase text-slate-400">p99 Latency</span>
          <div className="text-2xl font-bold text-rose-400 mt-1">{p99}</div>
          <span className="text-[10px] text-slate-500 block mt-1">1 in 100 requests timeout</span>
        </div>
      </div>

      <div className="relative h-48 border-b border-l border-slate-700 pl-4 pb-4">
        {/* Y Axis Label */}
        <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-500 font-mono py-2">
          <span>15s</span>
          <span>10s</span>
          <span>5s</span>
          <span>0s</span>
        </div>

        {/* X Axis Label */}
        <div className="absolute bottom-[-24px] left-4 right-0 flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Fastest</span>
          <span>p50 (Median)</span>
          <span>p99</span>
          <span>Slowest</span>
        </div>

        {/* The Curve */}
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M 0,95 Q 30,95 50,90 T 90,80 Q 95,80 98,5 L 100,0 L 100,100 L 0,100 Z" 
            fill="rgba(56, 189, 248, 0.1)" 
          />
          <path 
            d="M 0,95 Q 30,95 50,90 T 90,80 Q 95,80 98,5 L 100,0" 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="2" 
          />
          
          {/* Average Marker */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="#34d399" strokeWidth="1" strokeDasharray="2,2" />
          <circle cx="50" cy="90" r="2" fill="#34d399" />
          
          {/* p99 Marker */}
          <line x1="97" y1="0" x2="97" y2="100" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
          <circle cx="97" cy="15" r="2" fill="#f43f5e" />
        </svg>

      </div>
    </div>
  );
}
