'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowUp, Cpu, Sparkles, HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function TransformerArchitectureViz() {
  const [activeLayer, setActiveLayer] = useState<string>('mha');

  const layerDetails: Record<string, { title: string; subtitle: string; desc: string; math: string; why: string; tensorShape: string }> = {
    embed: {
      title: '1. Input Embeddings + Positional Encoding',
      subtitle: 'Converting Tokens to Coordinates with Temporal Wave Signals',
      desc: 'Words are converted to dense vectors (e.g. d_model = 4096) via embedding matrix W_E. Because Attention has no inherent order, fixed sinusoidal wave frequencies (or learned rotary embeddings / RoPE) are added so the model can distinguish first from last.',
      math: 'x_i = \\text{Embedding}(w_i) + \\text{PositionalEncoding}(i)',
      tensorShape: '[Batch Size, Sequence Length (N), d_model]',
      why: 'Because Self-Attention operates on all words in parallel with no loop, order must be injected directly into the geometric coordinates.',
    },
    mha: {
      title: '2. Multi-Head Self-Attention (The Core Engine)',
      subtitle: 'Dynamic All-to-All Token Information Routing',
      desc: 'Every token projects into Query (Q), Key (K), and Value (V) via learned linear layers (W_Q, W_K, W_V). Softmax of the scaled dot products (QK^T / sqrt(d_k)) creates an attention heatmap that dynamically pools values together across 32+ independent attention heads.',
      math: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V',
      tensorShape: '[Batch Size, Num Heads, Sequence Length, Head Dim]',
      why: 'Allows words to look at every other word simultaneously in a single parallel matrix multiply. Head 1 tracks grammar; Head 2 tracks entity references.',
    },
    norm1: {
      title: '3. Add & Layer Normalization (Residual Highway)',
      subtitle: 'Preserving Information Flow & Preventing Gradient Vanishing',
      desc: 'A residual skip-connection adds the original input x directly to the attention output, followed by Layer Normalization across the feature dimension. This creates a clean gradient highway directly from output to input.',
      math: 'x_{\\text{norm}} = \\text{LayerNorm}(x + \\text{MultiHeadAttention}(x))',
      tensorShape: '[Batch Size, Sequence Length, d_model]',
      why: 'Allows training 100+ layer deep transformers without gradients exploding or vanishing (same discovery as ResNet).',
    },
    ffn: {
      title: '4. Position-Wise Feed-Forward Network (FFN)',
      subtitle: 'Deep Non-Linear Knowledge Processing per Token',
      desc: 'A 2-layer multi-layer perceptron (MLP) applied independently to every token position: expands dimension to 4x d_model with SwiGLU / GeLU activation, then projects back down.',
      math: '\\text{FFN}(x) = \\text{GELU}(xW_1 + b_1)W_2 + b_2',
      tensorShape: '[Batch Size, Sequence Length, d_model]',
      why: 'Self-Attention routes and mixes information between tokens; the FFN layer processes and stores factual knowledge within each individual token.',
    },
    output: {
      title: '5. Output Projection & Softmax Generation',
      subtitle: 'Predicting the Next Token Across the 50,000+ Word Vocabulary',
      desc: 'The final hidden state vector is projected via matrix W_vocab onto the full vocabulary size (e.g. 50,000 logits). Softmax converts these logits into a true probability distribution predicting the next word.',
      math: 'P(w_{t+1} \\mid w_{1:t}) = \\text{softmax}(W_{\\text{vocab}} \\cdot h_t)',
      tensorShape: '[Batch Size, Sequence Length, Vocab Size (50k)]',
      why: 'This is the exact generation step used in ChatGPT, Claude, and Llama to emit responses one token at a time!',
    },
  };

  const selected = layerDetails[activeLayer] || layerDetails['mha'];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      {/* Neon border line */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-400 via-purple-500 to-emerald-400 animate-pulse" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
              Architecture Blueprint · &ldquo;Attention Is All You Need&rdquo; (Vaswani et al.)
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            The Complete Transformer Decoder Block Architecture
          </h4>
        </div>

        <span className="text-[11px] text-purple-300 bg-purple-950/60 border border-purple-800/50 px-3 py-1 rounded-full font-sans">
          Click any block to inspect tensor shapes &amp; mathematical equations
        </span>
      </div>

      {/* Polish 3: High-Fidelity SVG Interactive Transformer Diagram + Deep Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Professional Vector SVG Transformer Stack (5 Cols) */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 flex flex-col items-center justify-center relative shadow-inner">
          <svg viewBox="0 0 340 440" className="w-full max-w-[320px] h-[400px]">
            <defs>
              <linearGradient id="mhaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7e22ce" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="ffnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="outGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
              <linearGradient id="embGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <filter id="stackGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#c084fc" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Background Transformer Core Border */}
            <rect x="35" y="65" width="270" height="280" rx="16" fill="#090d16" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="50" y="85" fill="#64748b" fontSize="9" fontWeight="bold">N &times; TRANSFORMER BLOCKS</text>

            {/* BLOCK 5: OUTPUT PROBABILITIES */}
            <g className="cursor-pointer" onClick={() => setActiveLayer('output')}>
              <rect
                x="60"
                y="15"
                width="220"
                height="38"
                rx="10"
                fill={activeLayer === 'output' ? 'url(#outGrad)' : '#1e293b'}
                stroke="#f43f5e"
                strokeWidth={activeLayer === 'output' ? '2.5' : '1'}
                filter={activeLayer === 'output' ? 'url(#stackGlow)' : 'none'}
              />
              <text x="170" y="32" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">5. Output Softmax &amp; Logits</text>
              <text x="170" y="44" textAnchor="middle" fill={activeLayer === 'output' ? '#ffe4e6' : '#94a3b8'} fontSize="8">Next-Token Prediction</text>
            </g>

            {/* Connecting Arrow from FFN to Output */}
            <line x1="170" y1="95" x2="170" y2="53" stroke="#64748b" strokeWidth="2" />
            <polygon points="166,56 170,50 174,56" fill="#64748b" />

            {/* BLOCK 4: FEED FORWARD NETWORK */}
            <g className="cursor-pointer" onClick={() => setActiveLayer('ffn')}>
              <rect
                x="60"
                y="95"
                width="220"
                height="46"
                rx="12"
                fill={activeLayer === 'ffn' ? 'url(#ffnGrad)' : '#1e293b'}
                stroke="#10b981"
                strokeWidth={activeLayer === 'ffn' ? '2.5' : '1'}
                filter={activeLayer === 'ffn' ? 'url(#stackGlow)' : 'none'}
              />
              <text x="170" y="117" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">4. Feed-Forward Network</text>
              <text x="170" y="130" textAnchor="middle" fill={activeLayer === 'ffn' ? '#d1fae5' : '#94a3b8'} fontSize="8">Position-Wise MLP (GELU/SwiGLU)</text>
            </g>

            {/* Residual Skip Line around FFN */}
            <path d="M 50,185 L 30,185 L 30,85 L 170,85 L 170,95" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="170" cy="85" r="7" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="170" y="88" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">+</text>

            {/* BLOCK 3: ADD & LAYERNORM */}
            <g className="cursor-pointer" onClick={() => setActiveLayer('norm1')}>
              <rect
                x="80"
                y="155"
                width="180"
                height="30"
                rx="8"
                fill={activeLayer === 'norm1' ? '#78350f' : '#1e293b'}
                stroke="#f59e0b"
                strokeWidth={activeLayer === 'norm1' ? '2.5' : '1'}
                filter={activeLayer === 'norm1' ? 'url(#stackGlow)' : 'none'}
              />
              <text x="170" y="174" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">3. Add &amp; LayerNorm</text>
            </g>

            {/* Connecting line MHA -> Add/Norm */}
            <line x1="170" y1="205" x2="170" y2="185" stroke="#64748b" strokeWidth="2" />

            {/* BLOCK 2: MULTI-HEAD ATTENTION */}
            <g className="cursor-pointer" onClick={() => setActiveLayer('mha')}>
              <rect
                x="50"
                y="205"
                width="240"
                height="60"
                rx="14"
                fill={activeLayer === 'mha' ? 'url(#mhaGrad)' : '#1e293b'}
                stroke="#c084fc"
                strokeWidth={activeLayer === 'mha' ? '3' : '1.5'}
                filter={activeLayer === 'mha' ? 'url(#stackGlow)' : 'none'}
              />
              <text x="170" y="232" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">2. Multi-Head Attention</text>
              <text x="170" y="248" textAnchor="middle" fill={activeLayer === 'mha' ? '#f3e8ff' : '#cbd5e1'} fontSize="9">
                Query (Q) &bull; Key (K) &bull; Value (V)
              </text>
            </g>

            {/* Residual Skip Line around Attention */}
            <path d="M 50,310 L 20,310 L 20,195 L 170,195 L 170,205" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="170" cy="195" r="7" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="170" y="198" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">+</text>

            {/* Connecting line Embed -> MHA */}
            <line x1="170" y1="365" x2="170" y2="265" stroke="#64748b" strokeWidth="2" />

            {/* BLOCK 1: INPUT EMBEDDINGS + POSITIONAL ENCODING */}
            <g className="cursor-pointer" onClick={() => setActiveLayer('embed')}>
              <rect
                x="60"
                y="365"
                width="220"
                height="46"
                rx="12"
                fill={activeLayer === 'embed' ? 'url(#embGrad)' : '#1e293b'}
                stroke="#38bdf8"
                strokeWidth={activeLayer === 'embed' ? '2.5' : '1'}
                filter={activeLayer === 'embed' ? 'url(#stackGlow)' : 'none'}
              />
              <text x="170" y="387" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">1. Input Embeddings</text>
              <text x="170" y="400" textAnchor="middle" fill={activeLayer === 'embed' ? '#e0f2fe' : '#94a3b8'} fontSize="8">+ Positional Encodings (Sine / RoPE)</text>
            </g>

            {/* Input Words text below */}
            <text x="170" y="430" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
              &ldquo;tanker is late&rdquo; (Input Tokens)
            </text>
          </svg>
        </div>

        {/* Right: Rich Layer Inspector Card (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
              Layer Deep-Dive Inspector
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{selected.title}</h3>
            <p className="text-xs text-slate-300 font-sans mt-0.5">{selected.subtitle}</p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed">
            {selected.desc}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 font-mono text-xs text-purple-300 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Mathematical Operation:</span>
              <code className="text-xs block font-bold text-white leading-relaxed">{selected.math}</code>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-sky-500/30 font-mono text-xs text-sky-300 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Tensor Dimension:</span>
              <code className="text-xs block font-bold text-white leading-relaxed">{selected.tensorShape}</code>
            </div>
          </div>

          <div className="p-3.5 bg-purple-950/30 rounded-xl border border-purple-800/40 text-xs font-sans text-purple-200 leading-relaxed">
            <strong className="text-purple-300 font-mono block mb-1">Why This Layer Is Essential:</strong>
            {selected.why}
          </div>
        </div>

      </div>

    </div>
  );
}
