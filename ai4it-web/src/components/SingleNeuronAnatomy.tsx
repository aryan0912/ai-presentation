'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircuitBoard, Cpu, ArrowRight, Network, Sparkles, Sliders, Zap, RotateCcw } from 'lucide-react';

interface FeatureInput {
  id: string;
  name: string;
  unit: string;
  x: number; // raw value
  minX: number;
  maxX: number;
  step: number;
  w: number; // dial weight
  minW: number;
  maxW: number;
  description: string;
}

export default function SingleNeuronAnatomy() {
  // Preset scenarios that make the dairy / quality control intuition click instantly
  const [activeScenario, setActiveScenario] = useState<'milk' | 'custom'>('milk');

  // Inputs for Milk Quality / Rejection Decision
  const [inputs, setInputs] = useState<FeatureInput[]>([
    {
      id: 'temp',
      name: 'Milk Temp (°C)',
      unit: '°C',
      x: 12,
      minX: 4,
      maxX: 25,
      step: 1,
      w: 1.8, // positive weight: warmer milk is spoiled/bad
      minW: -3,
      maxW: 3,
      description: 'Above 4°C bacterial growth spikes',
    },
    {
      id: 'acidity',
      name: 'Acidity (pH drift)',
      unit: 'pH',
      x: 6.2,
      minX: 5.0,
      maxX: 7.0,
      step: 0.1,
      w: -2.5, // lower pH means souring, so higher weight to drop below safe threshold
      minW: -3,
      maxW: 3,
      description: 'Fresh milk pH is 6.6 - 6.8',
    },
    {
      id: 'turbidity',
      name: 'Fat/Solids Sensor',
      unit: '%',
      x: 3.5,
      minX: 1.0,
      maxX: 8.0,
      step: 0.1,
      w: 0.6,
      minW: -3,
      maxW: 3,
      description: 'Standard purity reading',
    },
  ]);

  // Neuron threshold / bias
  const [bias, setBias] = useState<number>(-12.0); // baseline skepticism
  const [selectedActivation, setSelectedActivation] = useState<'relu' | 'sigmoid' | 'step'>('relu');

  // Calculations
  const products = inputs.map((inp) => inp.x * inp.w);
  const weightedSum = products.reduce((acc, curr) => acc + curr, 0);
  const z = weightedSum + bias;

  // Activation calculation
  const computeActivation = (val: number) => {
    switch (selectedActivation) {
      case 'relu':
        return Math.max(0, val);
      case 'sigmoid':
        return 1 / (1 + Math.exp(-val));
      case 'step':
        return val >= 0 ? 1 : 0;
      default:
        return Math.max(0, val);
    }
  };

  const activationOutput = computeActivation(z);

  // Interpretation of the decision
  const isFired = selectedActivation === 'sigmoid' ? activationOutput > 0.5 : activationOutput > 0;

  const handleWeightChange = (id: string, newW: number) => {
    setInputs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, w: parseFloat(newW.toFixed(2)) } : item))
    );
  };

  const handleInputChange = (id: string, newX: number) => {
    setInputs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, x: parseFloat(newX.toFixed(1)) } : item))
    );
  };

  const resetPreset = (mode: 'reject' | 'accept') => {
    if (mode === 'reject') {
      // Sour, hot milk -> Neuron fires red alert!
      setInputs([
        { ...inputs[0], x: 18, w: 1.8 },
        { ...inputs[1], x: 5.5, w: -2.5 },
        { ...inputs[2], x: 2.2, w: 0.6 },
      ]);
      setBias(-12.0);
    } else {
      // Pristine cold fresh milk -> Neuron sleeps (0)
      setInputs([
        { ...inputs[0], x: 4, w: 1.8 },
        { ...inputs[1], x: 6.7, w: -2.5 },
        { ...inputs[2], x: 4.2, w: 0.6 },
      ]);
      setBias(-12.0);
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-slate-700/50 space-y-8 font-sans shadow-2xl relative overflow-hidden my-8">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full w-fit mb-3">
            <Network size={14} />
            <span>Interactive Laboratory</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            How a Single Neuron Makes a Decision
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            A neuron is simply an electric mixing chamber. Turn the dials below to see how inputs and weights flow into the summation node, pass the threshold, and fire an output!
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400 text-[11px] mr-1">Quick Scenarios:</span>
          <button
            onClick={() => resetPreset('reject')}
            className="px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/50 text-rose-300 transition-all font-semibold active:scale-95 flex items-center gap-1.5"
          >
            <Zap size={13} className="text-rose-400" />
            Spoiled Milk Alert
          </button>
          <button
            onClick={() => resetPreset('accept')}
            className="px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/50 text-emerald-300 transition-all font-semibold active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles size={13} className="text-emerald-400" />
            Grade-A Milk Safe
          </button>
        </div>
      </div>

      {/* Main Interactive Flow Diagram */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* Step 1: Inputs & Physical Potentiometer Weights (Col 1-5) */}
        <div className="xl:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Sliders size={16} />
              <span>Step 1: Sensors ($x$) × Importance Dials ($w$)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Analog Inputs
            </span>
          </div>

          <div className="space-y-4">
            {inputs.map((inp, idx) => {
              const product = inp.x * inp.w;
              const isPositiveContribution = product > 0;
              return (
                <div
                  key={inp.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">
                      {inp.name}
                    </span>
                    <div className="font-mono text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="bg-slate-900 px-2 py-0.5 rounded text-sky-300 border border-slate-800">
                        x{idx + 1} = {inp.x} {inp.unit}
                      </span>
                      <span className="text-slate-600">×</span>
                      <span className={`px-2 py-0.5 rounded border font-semibold ${inp.w >= 0 ? 'bg-amber-950/40 text-amber-300 border-amber-800/40' : 'bg-rose-950/40 text-rose-300 border-rose-800/40'}`}>
                        w{idx + 1} = {inp.w > 0 ? `+${inp.w}` : inp.w}
                      </span>
                    </div>
                  </div>

                  {/* Input Value Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>Sensor Signal (x): {inp.x}</span>
                      <span>{inp.description}</span>
                    </div>
                    <input
                      type="range"
                      min={inp.minX}
                      max={inp.maxX}
                      step={inp.step}
                      value={inp.x}
                      onChange={(e) => handleInputChange(inp.id, parseFloat(e.target.value))}
                      className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Weight Dial Slider */}
                  <div className="space-y-1 pt-1 border-t border-slate-900">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                        Rosenblatt Dial (Weight $w$):
                      </span>
                      <span className="font-bold text-amber-300">{inp.w}</span>
                    </div>
                    <input
                      type="range"
                      min={inp.minW}
                      max={inp.maxW}
                      step={0.1}
                      value={inp.w}
                      onChange={(e) => handleWeightChange(inp.id, parseFloat(e.target.value))}
                      className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Subtotal output for this branch */}
                  <div className="flex justify-end items-center gap-2 pt-1 font-mono text-[11px]">
                    <span className="text-slate-500">Signal Impact:</span>
                    <span className={`font-bold ${isPositiveContribution ? 'text-amber-400' : 'text-cyan-400'}`}>
                      {product >= 0 ? `+${product.toFixed(1)}` : product.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bias Controller (Internal Threshold) */}
          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                Internal Bias ($b$)
              </span>
              <span className="font-mono bg-purple-950 px-2 py-0.5 rounded text-purple-300 font-bold border border-purple-800/40">
                b = {bias.toFixed(1)}
              </span>
            </div>
            <p className="text-[10px] text-purple-200/70 font-sans">
              How naturally hesitant or trigger-happy is this neuron? A negative bias acts like a heavy spring keeping the alarm silent.
            </p>
            <input
              type="range"
              min={-25}
              max={10}
              step={0.5}
              value={bias}
              onChange={(e) => setBias(parseFloat(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Pipe & Center: Summation Node (Col 6-8) */}
        <div className="xl:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Zap size={16} />
              <span>Step 2: The Summing Chamber ($z$)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Accumulator
            </span>
          </div>

          {/* Center Chamber Animation */}
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <motion.div
              animate={{
                scale: z > 0 ? [1, 1.05, 1] : 1,
                boxShadow:
                  z > 0
                    ? '0 0 35px rgba(245, 158, 11, 0.4)'
                    : '0 0 15px rgba(100, 116, 139, 0.15)',
              }}
              transition={{ repeat: z > 0 ? Infinity : 0, duration: 1.5 }}
              className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center p-3 relative transition-all duration-300 ${
                z > 0
                  ? 'border-amber-400 bg-gradient-to-b from-amber-950/60 to-slate-950 text-white'
                  : 'border-slate-700 bg-slate-950 text-slate-400'
              }`}
            >
              <div className="text-[10px] uppercase font-mono tracking-wider font-bold opacity-75">
                Total Pressure
              </div>
              <div className="text-2xl font-mono font-black mt-0.5 tracking-tight">
                {z.toFixed(1)}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                z = Σ(wx) + b
              </div>

              {/* Status badge floating below node */}
              <div className={`absolute -bottom-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-lg ${
                z >= 0 ? 'bg-amber-500 text-slate-950 border-amber-300' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {z >= 0 ? 'Positive Energy' : 'Sub-Threshold'}
              </div>
            </motion.div>

            {/* Breakdown calculation pill */}
            <div className="mt-8 w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Sum of inputs × weights:</span>
                <span className="text-slate-200 font-bold">{weightedSum.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-purple-400">
                <span>Added Bias baseline:</span>
                <span>{bias > 0 ? `+${bias.toFixed(1)}` : bias.toFixed(1)}</span>
              </div>
              <div className="border-t border-slate-800 pt-1.5 flex justify-between font-bold text-slate-200">
                <span>Net Output before gate (z):</span>
                <span className={z >= 0 ? 'text-amber-400' : 'text-slate-400'}>
                  {z.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Activation function selector */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-300 block">
              Step 3: Choose Activation Filter ($f$)
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(['relu', 'sigmoid', 'step'] as const).map((fn) => (
                <button
                  key={fn}
                  onClick={() => setSelectedActivation(fn)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                    selectedActivation === fn
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-102'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {fn === 'relu' ? 'ReLU (Max 0)' : fn === 'sigmoid' ? 'Sigmoid (S)' : 'Step (0/1)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Activation Output & Decision (Col 9-12) */}
        <div className="xl:col-span-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
              <Sparkles size={16} />
              <span>Step 4: Final Decision</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Action Gate
            </span>
          </div>

          {/* Result Card */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <motion.div
              key={`${isFired}-${activationOutput}`}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-full p-6 rounded-2xl border-2 transition-all flex flex-col items-center space-y-3 ${
                isFired
                  ? 'bg-rose-950/40 border-rose-500/80 shadow-2xl shadow-rose-950/50'
                  : 'bg-emerald-950/30 border-emerald-500/40'
              }`}
            >
              <div className={`p-3 rounded-full ${isFired ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {isFired ? <Zap size={28} /> : <Sparkles size={28} />}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
                  Neuron Output a = f(z)
                </span>
                <span className={`text-4xl font-mono font-black ${isFired ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {activationOutput.toFixed(2)}
                </span>
              </div>

              <div className="text-xs font-semibold px-3 py-1.5 rounded-lg w-full">
                {isFired ? (
                  <span className="text-rose-300 bg-rose-950/80 border border-rose-800/60 block py-1 rounded">
                    TRIGGER ALARM: SPOILED
                  </span>
                ) : (
                  <span className="text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 block py-1 rounded">
                    PASS: TANKER ACCEPTED
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                {selectedActivation === 'relu' && (
                  z < 0 ? (
                    <>Since $z$ is negative ({z.toFixed(1)}), <strong>ReLU zeroes it out completely</strong>. Zero output means no alarm sound.</>
                  ) : (
                    <>Since $z$ is positive ({z.toFixed(1)}), <strong>ReLU passes the exact urgency</strong> ({activationOutput.toFixed(1)}) to the next layer!</>
                  )
                )}
                {selectedActivation === 'sigmoid' && (
                  <>Sigmoid squashes the value into a probability: <strong>{(activationOutput * 100).toFixed(0)}% risk</strong> of spoilage.</>
                )}
                {selectedActivation === 'step' && (
                  <>A harsh cutoff: If $z \ge 0$, binary <strong>1 (Dump)</strong>, else <strong>0 (Keep)</strong>.</>
                )}
              </p>
            </motion.div>
          </div>

          {/* Quick reset */}
          <button
            onClick={() => {
              setInputs([
                { ...inputs[0], x: 12, w: 1.8 },
                { ...inputs[1], x: 6.2, w: -2.5 },
                { ...inputs[2], x: 3.5, w: 0.6 },
              ]);
              setBias(-12.0);
            }}
            className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-mono border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw size={12} />
            Reset Dials to Defaults
          </button>
        </div>

      </div>

      {/* Historical Connection Footer: The 1957 Mark I Perceptron */}
      <div className="relative z-10 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-950 border border-emerald-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CircuitBoard size={16} />
            <span>The 1957 Mark I Perceptron Connection</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            In 1957, Frank Rosenblatt built this exact circuit using <strong>physical electric motors turning metal volume knobs (potentiometers)</strong> to adjust the weights ($w$). When the machine guessed wrong, electric motors buzzed to turn the dials tighter or looser.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">1957 Mark I</div>
            <div className="text-amber-400 text-xs font-bold mt-0.5">400 Metal Dials</div>
          </div>
          <ArrowRight className="text-slate-600 hidden md:block" size={16} />
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Today (ChatGPT)</div>
            <div className="text-emerald-400 text-xs font-bold mt-0.5">1.75 Trillion Math Dials</div>
          </div>
        </div>
      </div>
    </div>
  );
}
