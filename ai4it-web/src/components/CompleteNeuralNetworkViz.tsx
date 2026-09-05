'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Plus, Info, RefreshCw, Zap, TrendingDown, Layers, Activity } from 'lucide-react';

export default function CompleteNeuralNetworkViz() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 'arch', label: 'Complete Architecture', icon: <Network size={16} /> },
    { id: 'linear', label: '1. Linear Transform (Wx + b)', icon: <Layers size={16} /> },
    { id: 'activation', label: '2. Activation (ReLU)', icon: <Activity size={16} /> },
    { id: 'loss', label: '3. Loss Function (MSE)', icon: <TrendingDown size={16} /> },
    { id: 'backprop', label: '4. Backpropagation', icon: <RefreshCw size={16} /> },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
      {/* Top Navigation */}
      <div className="flex flex-wrap border-b border-slate-700 bg-slate-950/50">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(idx)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeStep === idx 
                ? 'text-purple-400 bg-slate-800/80 border-b-2 border-purple-400' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-b-2 border-transparent'
            }`}
          >
            {step.icon}
            {step.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8 min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.div
              key="arch"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-white mb-2">The Complete Picture</h3>
              <p className="text-slate-400 text-sm mb-8 text-center max-w-2xl">
                A Neural Network connects Inputs to Outputs through "Hidden Layers". Every line is a Weight (W), every node holds a Bias (b) and an Activation Function.
              </p>
              
              <div className="relative w-full max-w-3xl h-64 bg-slate-950/50 rounded-xl border border-slate-800 p-8 flex justify-between items-center">
                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <g stroke="#334155" strokeWidth="2" fill="none">
                    <path d="M 120 80 L 350 60" />
                    <path d="M 120 80 L 350 128" />
                    <path d="M 120 80 L 350 196" />
                    
                    <path d="M 120 176 L 350 60" />
                    <path d="M 120 176 L 350 128" />
                    <path d="M 120 176 L 350 196" />
                    
                    <path d="M 400 60 L 630 128" />
                    <path d="M 400 128 L 630 128" />
                    <path d="M 400 196 L 630 128" />
                  </g>
                </svg>

                {/* Input Layer */}
                <div className="flex flex-col gap-12 z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-white font-mono shadow-[0_0_15px_rgba(71,85,105,0.5)]">
                      x₁
                    </div>
                    <span className="text-xs text-slate-400 mt-2">Day</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-white font-mono shadow-[0_0_15px_rgba(71,85,105,0.5)]">
                      x₂
                    </div>
                    <span className="text-xs text-slate-400 mt-2">Temp</span>
                  </div>
                </div>

                {/* Hidden Layer */}
                <div className="flex flex-col gap-4 z-10">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-purple-900/60 border-2 border-purple-500 flex items-center justify-center text-white font-mono shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        h_{i}
                      </div>
                    </div>
                  ))}
                  <span className="text-xs text-purple-400 mt-1 font-semibold text-center">Hidden Layer</span>
                </div>

                {/* Output Layer */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-20 h-20 rounded-full bg-emerald-900/60 border-2 border-emerald-500 flex items-center justify-center text-white font-mono shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                    ŷ
                  </div>
                  <span className="text-xs text-emerald-400 mt-2 font-semibold">Prediction</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeStep === 1 && (
            <motion.div
              key="linear"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold text-white mb-2">1. Pre-activation (Linear Transformation)</h3>
              <p className="text-slate-400 text-sm mb-6">
                Before applying any non-linearity, each neuron simply computes a weighted sum of its inputs, plus a bias.
              </p>
              
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-center">
                <div className="text-2xl text-white mb-4">
                  z = <span className="text-blue-400">W</span>x + <span className="text-rose-400">b</span>
                </div>
                <div className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Where <span className="text-blue-400">W</span> is the Weight Matrix (how much we care about each input), 
                  and <span className="text-rose-400">b</span> is the Bias (a baseline threshold).
                  <br/><br/>
                  <span className="text-amber-400/80">Math Note:</span> This is mathematically equivalent to Linear Regression ($y = mx + c$) extended to multiple dimensions.
                </div>
              </div>
            </motion.div>
          )}

          {activeStep === 2 && (
            <motion.div
              key="activation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold text-white mb-2">2. The Activation Function (ReLU)</h3>
              <p className="text-slate-400 text-sm mb-6">
                Without an activation function, the entire network collapses mathematically into a single straight line. ReLU provides the necessary non-linear "bend".
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center">
                  <div className="text-xl text-white font-mono mb-2">
                    a = max(0, z)
                  </div>
                  <div className="text-sm text-slate-400 text-center">
                    Rectified Linear Unit (ReLU) acts as a diode. If $z$ is negative, it outputs 0. If $z$ is positive, it passes it through.
                  </div>
                </div>
                
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex items-center justify-center h-48 relative">
                   {/* Simple axes */}
                   <div className="absolute left-6 right-6 top-1/2 border-b border-slate-600"></div>
                   <div className="absolute top-6 bottom-6 left-1/2 border-l border-slate-600"></div>
                   
                   {/* ReLU Line */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path d="M 0 50 L 50 50 L 100 0" stroke="#a855f7" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                   </svg>
                   <span className="absolute bottom-2 text-xs text-slate-500 font-mono">z</span>
                   <span className="absolute left-2 text-xs text-slate-500 font-mono">a(z)</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeStep === 3 && (
            <motion.div
              key="loss"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold text-white mb-2">3. The Loss Function (MSE)</h3>
              <p className="text-slate-400 text-sm mb-6">
                Once we have a prediction (ŷ), we compare it against reality (y) to calculate how badly we missed.
              </p>
              
              <div className="bg-rose-950/20 rounded-xl p-6 border border-rose-500/30 text-center">
                <div className="text-2xl text-white font-mono mb-4">
                  L = <span className="text-slate-400">1/n ∑</span>(y - ŷ)²
                </div>
                <div className="text-sm text-slate-400 max-w-lg mx-auto">
                  Mean Squared Error strongly penalizes large misses. A prediction that is off by 300 liters creates a massive error signal, forcing the network to pay attention to that mistake.
                </div>
              </div>
            </motion.div>
          )}

          {activeStep === 4 && (
            <motion.div
              key="backprop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-white mb-2">4. Backpropagation</h3>
              <p className="text-slate-400 text-sm mb-8 text-center max-w-2xl">
                The network passes the error backwards, calculating partial derivatives (gradients) to update every weight and bias.
              </p>

              <div className="relative w-full max-w-3xl h-48 bg-slate-950/50 rounded-xl border border-rose-500/30 p-8 flex justify-between items-center overflow-hidden">
                {/* SVG Connections backwards */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <g stroke="#f43f5e" strokeWidth="3" fill="none" strokeDasharray="5,5" className="animate-[dash_1s_linear_infinite]">
                    <path d="M 600 96 L 400 96" />
                    <path d="M 330 96 L 150 96" />
                  </g>
                </svg>

                <div className="flex flex-col items-center z-10 w-24">
                  <div className="text-rose-400 font-mono text-sm font-bold bg-slate-900 p-2 rounded-lg border border-rose-500/50">
                    ΔW, Δb
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 text-center">Update Inputs</span>
                </div>

                <div className="flex flex-col items-center z-10 w-24">
                  <div className="text-rose-400 font-mono text-sm font-bold bg-slate-900 p-2 rounded-lg border border-rose-500/50">
                    ∂L/∂h
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 text-center">Hidden Gradients</span>
                </div>

                <div className="flex flex-col items-center z-10 w-24">
                  <div className="text-rose-400 font-mono text-sm font-bold bg-slate-900 p-2 rounded-lg border border-rose-500/50">
                    ∂L/∂ŷ
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 text-center">Output Error</span>
                </div>
              </div>
              
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes dash {
                  to {
                    stroke-dashoffset: -20;
                  }
                }
              `}} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
