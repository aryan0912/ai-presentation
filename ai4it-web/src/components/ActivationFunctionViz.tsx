'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Info } from 'lucide-react';

export default function ActivationFunctionViz() {
  const [funcType, setFuncType] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');
  const [inputValue, setInputValue] = useState<number>(1.5);

  // Math definitions
  const funcs = {
    relu: {
      name: 'ReLU (Rectified Linear Unit)',
      desc: 'The most popular modern choice. "If negative, snap to 0. If positive, pass it through exactly as is." It acts like a logic gate letting only positive signals through.',
      math: 'y = max(0, x)',
      compute: (x: number) => Math.max(0, x),
      domain: [-5, 5],
      range: [-1, 5],
      svgRangeY: [4, -1] // For visual scaling
    },
    sigmoid: {
      name: 'Sigmoid',
      desc: 'The classic squasher. Takes any number from negative infinity to infinity and smoothly squishes it into a neat probability between 0.0 and 1.0.',
      math: 'y = 1 / (1 + e^-x)',
      compute: (x: number) => 1 / (1 + Math.exp(-x)),
      domain: [-6, 6],
      range: [-0.1, 1.1],
      svgRangeY: [1.2, -0.2]
    },
    tanh: {
      name: 'Tanh (Hyperbolic Tangent)',
      desc: 'Similar to Sigmoid but squishes between -1.0 and 1.0. This allows negative values to strongly suppress a neuron\'s downstream effect.',
      math: 'y = tanh(x)',
      compute: (x: number) => Math.tanh(x),
      domain: [-5, 5],
      range: [-1.2, 1.2],
      svgRangeY: [1.5, -1.5]
    }
  };

  const currentFunc = funcs[funcType];
  const outputValue = currentFunc.compute(inputValue);

  // SVG coordinate scaling
  const width = 500;
  const height = 300;
  const pad = 40;
  
  const scaleX = (x: number) => pad + ((x - currentFunc.domain[0]) / (currentFunc.domain[1] - currentFunc.domain[0])) * (width - 2 * pad);
  
  const yMin = currentFunc.svgRangeY[1];
  const yMax = currentFunc.svgRangeY[0];
  const scaleY = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * (height - 2 * pad);

  // Generate curve
  const getCurvePath = () => {
    const segments: string[] = [];
    const step = (currentFunc.domain[1] - currentFunc.domain[0]) / 100;
    for (let x = currentFunc.domain[0]; x <= currentFunc.domain[1]; x += step) {
      const y = currentFunc.compute(x);
      const px = scaleX(x);
      const py = scaleY(y);
      if (segments.length === 0) segments.push(`M ${px} ${py}`);
      else segments.push(`L ${px} ${py}`);
    }
    return segments.join(' ');
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 font-mono text-xs shadow-2xl relative overflow-hidden my-8">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-500" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <Zap size={14} />
            <span>Interactive Visualizer · The Non-Linear "Kink"</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight font-sans">
            Activation Functions: How Neurons Decide to Fire
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-2 max-w-xl">
            Without these functions, a neural network is just a giant linear equation. By adding a "kink" (non-linearity), the network can learn complex patterns. Slide the input to see how each function reacts!
          </p>
        </div>

        {/* Function Selector */}
        <div className="flex flex-col gap-2 shrink-0">
          {(['relu', 'sigmoid', 'tanh'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFuncType(type)}
              className={`px-4 py-2 rounded-lg border font-bold transition-all text-left ${
                funcType === type
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500 shadow-lg shadow-purple-900/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {funcs[type].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Interactive Canvas */}
        <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center">
          <div className="relative w-full aspect-video max-h-[300px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1={scaleX(currentFunc.domain[0])} y1={scaleY(0)} x2={scaleX(currentFunc.domain[1])} y2={scaleY(0)} stroke="#334155" strokeWidth="2" />
              <line x1={scaleX(0)} y1={scaleY(yMin)} x2={scaleX(0)} y2={scaleY(yMax)} stroke="#334155" strokeWidth="2" />
              
              {/* Curve */}
              <motion.path
                key={funcType}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                d={getCurvePath()}
                fill="none"
                stroke="#a855f7" // purple-500
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
              />

              {/* The Dot */}
              <motion.circle
                cx={scaleX(inputValue)}
                cy={scaleY(outputValue)}
                r="6"
                fill="#38bdf8" // sky-400
                className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              />

              {/* Dotted lines to axes */}
              <motion.line
                x1={scaleX(inputValue)}
                y1={scaleY(0)}
                x2={scaleX(inputValue)}
                y2={scaleY(outputValue)}
                stroke="#38bdf8"
                strokeDasharray="4 4"
                strokeWidth="2"
                opacity="0.6"
              />
              <motion.line
                x1={scaleX(0)}
                y1={scaleY(outputValue)}
                x2={scaleX(inputValue)}
                y2={scaleY(outputValue)}
                stroke="#38bdf8"
                strokeDasharray="4 4"
                strokeWidth="2"
                opacity="0.6"
              />

              {/* Labels */}
              <text x={width - 20} y={scaleY(0) + 20} fill="#64748b" fontSize="12" textAnchor="end">Input (z)</text>
              <text x={scaleX(0) + 10} y={20} fill="#64748b" fontSize="12">Output (a)</text>
            </svg>
          </div>

          {/* Slider Control */}
          <div className="w-full mt-6 flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-400 w-16">Input:</span>
            <input
              type="range"
              min={currentFunc.domain[0]}
              max={currentFunc.domain[1]}
              step="0.1"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value))}
              className="w-full accent-sky-500"
            />
            <span className="text-sky-400 font-bold w-12 text-right">{inputValue.toFixed(1)}</span>
          </div>
        </div>

        {/* Right: Explanation */}
        <div className="space-y-4 flex flex-col">
          <div className="p-5 rounded-xl bg-purple-950/20 border border-purple-500/20 h-full flex flex-col justify-center">
            <h4 className="text-lg font-bold text-white mb-2 font-sans">{currentFunc.name}</h4>
            <div className="flex items-center gap-2 mb-4 bg-slate-950 p-2 rounded-lg border border-slate-800 w-fit">
              <Activity size={16} className="text-slate-400" />
              <span className="text-amber-300 font-bold tracking-wider">{currentFunc.math}</span>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
              {currentFunc.desc}
            </p>

            <div className="mt-auto p-4 rounded-lg bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200">
              <div className="flex gap-2 items-start">
                <Info size={16} className="shrink-0 mt-0.5 text-sky-400" />
                <span>
                  <strong>Current State:</strong> With input <strong>{inputValue.toFixed(2)}</strong>, the neuron outputs <strong>{outputValue.toFixed(2)}</strong>.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
