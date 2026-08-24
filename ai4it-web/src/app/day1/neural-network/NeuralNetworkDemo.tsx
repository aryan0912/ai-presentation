'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { computeBoundaryApi, BoundaryResult } from '@/lib/api';
import BackendBadge from '@/components/BackendBadge';
import { Play, RotateCcw, AlertTriangle, Layers, Zap, CheckCircle2 } from 'lucide-react';

interface NeuralNetworkDemoProps {
  onBoundaryUpdate?: (res: BoundaryResult) => void;
}

export default function NeuralNetworkDemo({ onBoundaryUpdate }: NeuralNetworkDemoProps) {
  const [datasetType, setDatasetType] = useState<string>('rings');
  const [layers, setLayers] = useState<number>(1);
  const [neurons, setNeurons] = useState<number>(4);
  const [activation, setActivation] = useState<string>('relu');
  const [boundaryResult, setBoundaryResult] = useState<BoundaryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    computeBoundaryApi(datasetType, layers, neurons, activation).then((res) => {
      setBoundaryResult(res.result);
      if (onBoundaryUpdate) onBoundaryUpdate(res.result);
      setIsLoading(false);
    });
  }, [datasetType, layers, neurons, activation]);

  const handlePresetOneNeuron = () => {
    setNeurons(1);
    setLayers(1);
    setActivation('none');
  };

  const handlePresetOptimal = () => {
    setNeurons(6);
    setLayers(2);
    setActivation('relu');
  };

  return (
    <div className="space-y-6">
      {/* Control Strip */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Dataset Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setDatasetType('rings')}
              className={`px-3 py-1 rounded-lg transition-all ${
                datasetType === 'rings' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Concentric Rings
            </button>
            <button
              onClick={() => setDatasetType('moons')}
              className={`px-3 py-1 rounded-lg transition-all ${
                datasetType === 'moons' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Two Moons
            </button>
          </div>

          {/* Activation Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {['relu', 'sigmoid', 'tanh', 'none'].map((act) => (
              <button
                key={act}
                onClick={() => setActivation(act)}
                className={`px-2.5 py-1 rounded-lg uppercase transition-all ${
                  activation === act ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePresetOneNeuron}
            className="px-3 py-1 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs font-mono font-semibold hover:bg-rose-900/50 flex items-center gap-1"
          >
            <AlertTriangle size={12} /> Test 1 Neuron (Linear Collapse)
          </button>

          <button
            onClick={handlePresetOptimal}
            className="px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-mono font-semibold hover:bg-emerald-900/50 flex items-center gap-1"
          >
            <Zap size={12} /> Auto-Fit Multi-Neuron
          </button>

          <BackendBadge />
        </div>
      </div>

      {/* Grid: Interactive Boundary Plot (Left) + Architecture Topology (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Decision Boundary Visualization */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">Decision Boundary Surface</span>
                <h4 className="text-base font-bold text-white">2D Feature Classification</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Training Accuracy</span>
                <span className={`text-sm font-mono font-bold ${
                  boundaryResult?.train_accuracy && boundaryResult.train_accuracy > 0.85 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {boundaryResult ? `${(boundaryResult.train_accuracy * 100).toFixed(1)}%` : '--'}
                </span>
              </div>
            </div>

            {/* Canvas/SVG Representation */}
            <div className="relative w-full h-[320px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
              <svg viewBox="0 0 320 320" className="w-full h-full">
                {/* Decision background grid */}
                {boundaryResult &&
                  boundaryResult.grid_predictions.map((row, rIdx) => {
                    const cellSize = 320 / boundaryResult.resolution;
                    return row.map((prob, cIdx) => {
                      // Blue for class 0, Purple/Pink for class 1
                      const fill = prob > 0.5
                        ? `rgba(168, 85, 247, ${Math.min(0.6, (prob - 0.5) * 1.2)})`
                        : `rgba(59, 130, 246, ${Math.min(0.6, (0.5 - prob) * 1.2)})`;
                      return (
                        <rect
                          key={`cell-${rIdx}-${cIdx}`}
                          x={cIdx * cellSize}
                          y={rIdx * cellSize}
                          width={cellSize + 0.5}
                          height={cellSize + 0.5}
                          fill={fill}
                        />
                      );
                    });
                  })}

                {/* Draw 2D Points */}
                {boundaryResult &&
                  boundaryResult.points.map((p, idx) => {
                    // Map x, y from [-1.1, 1.1] to [0, 320]
                    const cx = ((p.x - -1.1) / 2.2) * 320;
                    const cy = 320 - ((p.y - -1.1) / 2.2) * 320;
                    const color = p.label === 0 ? '#60a5fa' : '#c084fc';
                    return (
                      <circle
                        key={`pt-${idx}`}
                        cx={cx}
                        cy={cy}
                        r={4.5}
                        fill={color}
                        stroke="#0b0f19"
                        strokeWidth={1.5}
                        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                      />
                    );
                  })}
              </svg>

              {activation === 'none' && (
                <div className="absolute inset-0 bg-rose-950/20 backdrop-blur-[1px] flex items-center justify-center p-6 text-center">
                  <div className="p-3 rounded-xl bg-rose-950/90 border border-rose-500 text-rose-200 text-xs font-mono font-bold">
                    No Activation Function (Linear): The network can only draw straight cuts! Non-linear clusters cannot be separated.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 font-mono">
            {boundaryResult?.summary}
          </div>
        </div>

        {/* Right: Architecture & Stacking Controls */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold uppercase">Stacked Linear Layers</span>
                <h4 className="text-base font-bold text-white">Neurons (Knobs) &amp; Depth</h4>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40">
                {(2 * neurons) + neurons + (neurons * 1) + 1} Parameters
              </span>
            </div>

            {/* Network Topology Visualizer */}
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 min-h-[160px] flex items-center justify-around relative">
              {/* Input Layer */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Input Layer (2)</span>
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-xs font-bold text-blue-300 font-mono">x₁</div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-xs font-bold text-blue-300 font-mono">x₂</div>
                </div>
              </div>

              {/* Hidden Layer (Dynamic) */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">
                  Hidden Layer ({neurons} {activation.toUpperCase()} Neurons)
                </span>
                <div className="flex flex-wrap max-w-[120px] justify-center gap-2">
                  {[...Array(neurons)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center text-[10px] font-bold text-purple-300 font-mono animate-pulse"
                    >
                      h{i+1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Layer */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-mono text-emerald-400 uppercase">Output (1)</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-300 font-mono">ŷ</div>
              </div>
            </div>

            {/* Sliders */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Hidden Neurons per Layer: <strong className="text-purple-300">{neurons}</strong></span>
                  <span className="text-slate-500">Range: 1 to 8</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={neurons}
                  onChange={(e) => setNeurons(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Activation Function: <strong className="text-sky-300 uppercase">{activation}</strong></span>
                  <span className="text-slate-500">Non-linear Kink</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono text-center">
                  {['relu', 'sigmoid', 'tanh', 'none'].map((act) => (
                    <button
                      key={act}
                      onClick={() => setActivation(act)}
                      className={`p-2 rounded border uppercase transition-all ${
                        activation === act ? 'bg-sky-950 border-sky-400 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {act}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed font-mono">
            <strong>The Mathematical Truth: </strong>
            10 linear layers stacked together without an activation kink is algebraically identical to 1 linear layer. The non-linear activation is the entire trick.
          </div>
        </div>

      </div>
    </div>
  );
}
