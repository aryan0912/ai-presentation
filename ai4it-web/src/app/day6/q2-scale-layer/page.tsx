'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Box, Activity, Terminal, Cpu, HardDrive, Network, Server, Zap, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
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
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTest = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <Link href="/day6" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 6 Overview
      </Link>
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase mb-2">
          Module 7 • Infrastructure &amp; Silicon Scale
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Q2: The Scale Layer, GPU Silicon &amp; vLLM
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          In enterprise AI, token generation is memory-bandwidth bound. We move beyond single-laptop APIs to high-concurrency enterprise serving with continuous batching, PagedAttention, and tailored hardware sizing.
        </p>
      </div>

      {/* VRAM Sizing Formula & Table */}
      <div className="glass-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Cpu size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The Silicon Reality: VRAM Hardware Sizing</h2>
            <p className="text-xs text-slate-400">Memory Bandwidth Bottleneck &amp; Precise Allocation Formula</p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
          <span className="text-slate-400 block mb-1 font-sans text-xs">Universal VRAM Sizing Formula:</span>
          VRAM Required = (Parameters × Bytes per Parameter) + KV-Cache Overhead + Activation Buffer
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Precision Format</th>
                <th className="p-3">Bytes / Weight</th>
                <th className="p-3">70B Model Raw Weights</th>
                <th className="p-3">Recommended Production Silicon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-rose-400">FP16 / BF16 (Full Precision)</td>
                <td className="p-3">2.0 Bytes</td>
                <td className="p-3">140 GB</td>
                <td className="p-3 text-slate-300">2× 80GB GPUs (160GB total) e.g. 2× NVIDIA H100 / A100 via NVLink</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-amber-400">INT8 (8-Bit Quantized)</td>
                <td className="p-3">1.0 Byte</td>
                <td className="p-3">70 GB</td>
                <td className="p-3 text-slate-300">1× 80GB or 2× 48GB GPUs (e.g. 2× NVIDIA L40S)</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-emerald-400">INT4 AWQ (4-Bit Activation-Aware)</td>
                <td className="p-3">0.5 Bytes</td>
                <td className="p-3">35 GB</td>
                <td className="p-3 text-emerald-300 font-bold">1× 48GB GPU (e.g. 1× NVIDIA L40S or RTX 6000 Ada) — Best NDDB Fit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          *Note on CPU vs GPU: Server DDR5 transfer speed is ~100–200 GB/s (yielding 1-2 tokens/s on a 70B model). NVIDIA H100 HBM3 memory bandwidth is 3,350 GB/s (3.35 TB/s), yielding 60–90 tokens/s.
        </p>
      </div>

      {/* Consumer vs Enterprise Mythbusting */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Consumer vs Enterprise Silicon: The RTX 4090 Trap</h2>
            <p className="text-xs text-slate-400">Why gaming GPUs fail in datacenter server racks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-amber-400 block font-mono text-sm">1. Thermal Throttling</strong>
            <p className="text-slate-300 leading-relaxed">
              RTX 4090 draws 450W with axial fans that circulate hot air inside the chassis. In a dense 4U rack, card 2 pulls 80°C exhaust from card 1, throttling down to 300MHz within 12 minutes. Enterprise L40S/H100 cards use passive front-to-back wind-tunnel cooling.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-amber-400 block font-mono text-sm">2. Lack of ECC Memory</strong>
            <p className="text-slate-300 leading-relaxed">
              Consumer GDDR6X lacks Error-Correcting Code. A single cosmic ray or voltage bit-flip causes silent memory corruption—producing gibberish SQL or crashing the CUDA inference kernel. Datacenter GPUs correct bit-flips in hardware.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-amber-400 block font-mono text-sm">3. No NVLink Interconnect</strong>
            <p className="text-slate-300 leading-relaxed">
              NVIDIA physically removed the NVLink bridge from RTX 4090. Splitting a 70B model forces activations over PCIe at 32 GB/s instead of NVLink at 900 GB/s—creating a devastating 28x inter-GPU communication bottleneck.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-amber-400 block font-mono text-sm">4. NVIDIA EULA License Restrictions</strong>
            <p className="text-slate-300 leading-relaxed">
              Section 2.2 of NVIDIA GeForce software license explicitly prohibits datacenter deployment. Deploying consumer GeForce drivers in enterprise racks places the organization in statutory license breach.
            </p>
          </div>
        </div>
      </div>

      {/* Storage & Networking Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card space-y-4">
          <div className="flex items-center gap-3">
            <HardDrive className="text-cyan-400" size={22} />
            <h3 className="text-lg font-bold text-white">High-Throughput AI Storage</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Loading a 140GB model from SATA SSD (500 MB/s) takes <strong>nearly 5 minutes</strong> per container restart. On Gen 5 Enterprise NVMe RAID (14 GB/s), it loads in <strong>under 10 seconds</strong>.
          </p>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300">
            <strong>GPUDirect Storage (GDS):</strong> DMA bypasses host CPU RAM entirely: NVMe Disk ➔ PCIe Switch ➔ GPU VRAM (Zero CPU Bounce).
          </div>
        </div>

        <div className="glass-card space-y-4">
          <div className="flex items-center gap-3">
            <Network className="text-indigo-400" size={22} />
            <h3 className="text-lg font-bold text-white">Ultra-Fast AI Networking</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multi-node model sharding requires microsecond latency. Standard 1GbE/10GbE networks destroy tensor parallel performance.
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <strong className="text-indigo-400">RoCE v2 (100GbE):</strong> RDMA over Ethernet (1.5–3.0µs). Uses existing Cisco/Arista switches with Jumbo Frames (MTU 9000). <em>Recommended for NDDB.</em>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <strong className="text-slate-400">InfiniBand NDR (400Gbps):</strong> &lt;1.0µs native RDMA. Extremely expensive; reserved for multi-million dollar training clusters.
            </div>
          </div>
        </div>
      </div>

      {/* Serving Engine Comparison */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <Server className="text-emerald-400" size={22} />
          <div>
            <h2 className="text-xl font-bold text-white">Model Serving Engine Showdown</h2>
            <p className="text-xs text-slate-400">Comparing inference servers for enterprise production</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Inference Server</th>
                <th className="p-3">Core Technology</th>
                <th className="p-3">Ideal Enterprise Use Case</th>
                <th className="p-3">NDDB Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-emerald-400">vLLM</td>
                <td className="p-3">PagedAttention, Continuous Batching, OpenAI API compatibility</td>
                <td className="p-3">High-throughput LLM text generation and agent tool execution</td>
                <td className="p-3 text-emerald-300 font-bold">Primary Choice for NDDB Datacenter</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-cyan-400">NVIDIA Triton</td>
                <td className="p-3">Multi-framework (PyTorch, ONNX, TensorRT, vLLM backend)</td>
                <td className="p-3">Heterogeneous pipelines (LLMs + Vision + Speech)</td>
                <td className="p-3 text-slate-400">Enterprise multi-modal clusters</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-indigo-400">TGI (Hugging Face)</td>
                <td className="p-3">FlashAttention-2, Tensor Parallelism, token streaming</td>
                <td className="p-3">Native Hugging Face Hub enterprise models</td>
                <td className="p-3 text-slate-400">Alternative for HF Hub workflows</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-amber-400">Ollama</td>
                <td className="p-3">Standalone Go/C++ binary, GGUF local quantized execution</td>
                <td className="p-3">Developer workstations, edge PCs, offline environments</td>
                <td className="p-3 text-amber-300 font-bold">Primary Choice for BMC Edge Laptops</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Vector Database & HNSW Formula */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="text-indigo-400" size={22} />
          <div>
            <h2 className="text-xl font-bold text-white">Enterprise Vector Architecture: pgvector vs Qdrant</h2>
            <p className="text-xs text-slate-400">RAM calculations for Hierarchical Navigable Small World (HNSW) indexing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
            <strong className="text-emerald-400 block text-sm">PostgreSQL + pgvector (0.7+)</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Zero new infrastructure overhead. Full ACID transactional safety. Allows SQL JOINs between vector chunks and relational customer tables. Perfectly handles up to 10–20 Million vectors.
            </p>
            <div className="text-emerald-300">NDDB Strategy: Start here with existing PostgreSQL/Neon databases!</div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <strong className="text-slate-300 block text-sm">Dedicated Vector DB (Qdrant / Milvus)</strong>
            <p className="text-slate-400 font-sans leading-relaxed">
              Engineered exclusively for Approximate Nearest Neighbor (ANN) search at billion-vector scale. Requires separate cluster operations, monitoring, backups, and team skillsets.
            </p>
            <div className="text-slate-400">Migrate only if dataset exceeds 50 Million embeddings.</div>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
          <span className="text-indigo-400 font-bold block mb-1">HNSW Index RAM Sizing Equation:</span>
          <div>RAM Required = Total Vectors × Dimensions × 4 Bytes × 1.25 (Graph Overhead)</div>
          <div className="text-emerald-400 pt-1">
            Example: 100,000 documents × 1536 dims × 4 × 1.25 = 768 MB RAM (Easily fits in standard Postgres RAM).
          </div>
        </div>
      </div>

      {/* Cloud vs On-Premises TCO Tipping Point */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <Zap className="text-amber-400" size={22} />
          <div>
            <h2 className="text-xl font-bold text-white">Cloud AI APIs vs Self-Hosted On-Premises Stack</h2>
            <p className="text-xs text-slate-400">The 30 Million Token/Month Economic Tipping Point</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Metric</th>
                <th className="p-3">Managed Cloud APIs (GPT-4o / Claude 3.5)</th>
                <th className="p-3">Self-Hosted On-Prem (vLLM + 2× L40S)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-slate-300">Cost Structure</td>
                <td className="p-3">$2.50 to $10.00 per Million Tokens (Variable OpEx)</td>
                <td className="p-3 text-emerald-400 font-bold">Fixed Hardware CapEx + Power/HVAC</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-slate-300">Data Sovereignty</td>
                <td className="p-3">Data leaves premises; dependent on cloud Zero Data Retention</td>
                <td className="p-3 text-emerald-400 font-bold">100% on-premises; strictly complies with DPDPA 2023</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-slate-300">Offline Reliability</td>
                <td className="p-3">Fails during WAN ISP cuts or fiber outages</td>
                <td className="p-3 text-emerald-400 font-bold">Runs completely offline inside private campus network</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-slate-300">Economic Tipping Point</td>
                <td className="p-3">Cost-effective below 10M tokens/month</td>
                <td className="p-3 text-emerald-400 font-bold">Dramatically cheaper above 30M tokens/month (Payback in 4 months)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Concurrency Benchmark */}
      <div className="glass-card space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Live Benchmark: Naive Queue vs Continuous Batching (vLLM)</h2>
          <p className="text-sm text-slate-300">
            Average latency is an executive trap. Traditional batching causes head-of-line blocking where request #30 waits behind 29 earlier requests. Watch the p99 latency curve cliff when 200 users hit the service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950 rounded-xl border border-rose-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-mono text-sm font-bold mb-2">
                <Activity size={18} /> Naive Sequential Queue (Standard API)
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Locks the GPU until each sequence completes. Requests accumulate in an unmanaged buffer.
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs border border-slate-800 h-36 flex flex-col justify-end">
              {isRunning && progress > 20 && <div className="text-slate-400">Users: {Math.floor(progress * 0.5)} | Latency: 1.2s</div>}
              {isRunning && progress > 50 && <div className="text-amber-400">Users: {Math.floor(progress * 1.2)} | Latency: 4.8s [QUEUEING]</div>}
              {isRunning && progress > 80 && <div className="text-rose-400">Users: {Math.floor(progress * 1.8)} | Latency: 15.2s [p99 CLIFF]</div>}
              {progress === 100 && <div className="text-rose-500 font-bold">503 Gateway Timeout: Server Overloaded</div>}
              {!isRunning && progress === 0 && <div className="text-slate-600">Awaiting benchmark execution...</div>}
            </div>
          </div>

          <div className="p-5 bg-slate-950 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold mb-2">
                <Box size={18} /> vLLM Engine (PagedAttention + Continuous Batching)
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Dynamically interleaves incoming tokens into physical memory blocks with zero KV-cache fragmentation.
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs border border-slate-800 h-36 flex flex-col justify-end">
              {isRunning && progress > 20 && <div className="text-emerald-400">Users: {Math.floor(progress * 0.5)} | Latency: 0.8s</div>}
              {isRunning && progress > 50 && <div className="text-emerald-400">Users: {Math.floor(progress * 1.2)} | Latency: 1.1s</div>}
              {isRunning && progress > 80 && <div className="text-emerald-400">Users: {Math.floor(progress * 1.8)} | Latency: 1.6s</div>}
              {progress === 100 && <div className="text-emerald-400 font-bold">SUCCESS: 200 requests served, p99 &lt; 2.2s</div>}
              {!isRunning && progress === 0 && <div className="text-slate-600">Awaiting benchmark execution...</div>}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={startTest} 
            disabled={isRunning}
            className="button-primary flex items-center gap-2 text-base px-6 py-3"
          >
            <Terminal size={18} />
            {isRunning ? 'Running Concurrent Load Test...' : 'Execute Concurrency Load Simulation'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day6/q1-trust-layer" className="button-secondary">
          <ArrowLeft size={16} /> Prev: Q1 The Trust Layer
        </Link>
        <Link href="/day6/q3-reality-layer" className="button-primary">
          Next: Q3 The Reality Layer <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
