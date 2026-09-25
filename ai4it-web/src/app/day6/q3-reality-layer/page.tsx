import Link from 'next/link';
import { ArrowLeft, ArrowRight, Network, Target, Activity, DollarSign, Clock, ShieldCheck, Cpu, AlertCircle, FileText } from 'lucide-react';
import ImpactComplexityMatrix from '../components/ImpactComplexityMatrix';

export default function RealityLayerPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <Link href="/day6" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 6 Overview
      </Link>
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase mb-2">
          Module 6 &amp; 7 • Observability &amp; AIOps
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Q3: The Reality Layer, MTTR &amp; Full-Stack AIOps
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          AI does not reduce the number of software bugs—AI reduces the <strong>Mean Time to Resolution (MTTR)</strong>. We move from passive conversational chatboxes to autonomous event-driven log triage and observability pipelines.
        </p>
      </div>

      {/* Core Operational Axiom Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <Clock size={28} />
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest mb-1">
              The Enterprise Engineering Axiom
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              &quot;AI Does Not Eliminate Bugs. AI Reduces MTTR from Hours to Minutes.&quot;
            </h2>
          </div>
        </div>
      </div>

      {/* 2x2 Prioritization Matrix */}
      <div className="glass-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Target size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Enterprise ROI: The 2×2 Prioritization Matrix</h2>
            <p className="text-xs text-slate-400">Classifying AI initiatives to eliminate vanity distractions and dangerous traps</p>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4">
          <ImpactComplexityMatrix />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold text-sm block">Top-Left: Quick Wins (Deploy First)</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              High Impact, Low Complexity (AIOps Log Triage, HR Policy RAG, SQL Query Assistant). Clean data, low failure risk, high executive visibility. Delivers credibility in weeks.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 space-y-1">
            <span className="text-cyan-400 font-bold text-sm block">Top-Right: Strategic Bets (Flagship)</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              High Impact, High Complexity (Chilling Center IoT Copilot, Predictive Dispatch). Requires 3–6 months of engineering, SCADA telemetry, and safety guardrails. Saves millions in operational losses.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold text-sm block">Bottom-Left: Distractions (Avoid)</span>
            <p className="text-slate-400 font-sans leading-relaxed">
              Low Impact, Low Complexity (WhatsApp poems, slide summarizers). Toys that consume developer time without moving operational business metrics.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-1">
            <span className="text-rose-400 font-bold text-sm block">Bottom-Right: Dangerous Traps (Reject)</span>
            <p className="text-rose-300 font-sans leading-relaxed">
              Low Impact, High Complexity (Autonomous DB optimizer with write/drop rights). High engineering risk, catastrophic failure modes, and zero peace of mind for DBAs.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Dimension AI Readiness Radar */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The 5-Dimension Enterprise AI Readiness Audit</h2>
            <p className="text-xs text-slate-400">Scoring departmental capability before writing a single line of agent code</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Dimension</th>
                <th className="p-3">Score 1 (Immature)</th>
                <th className="p-3">Score 3 (Adequate)</th>
                <th className="p-3">Score 5 (AI-Ready Standard)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-emerald-400">1. Data Maturity</td>
                <td className="p-3 text-slate-400">Trapped in paper registers, scanned TIFFs, desktop Excels</td>
                <td className="p-3">Central SQL DBs, but schemas undocumented with duplicates</td>
                <td className="p-3 text-emerald-300 font-bold">Relational stores, automated backups, clean versioned text</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-cyan-400">2. API Hygiene</td>
                <td className="p-3 text-slate-400">Closed monoliths requiring direct screen scraping</td>
                <td className="p-3">Basic undocumented REST APIs; frequent random token expiries</td>
                <td className="p-3 text-cyan-300 font-bold">Documented OpenAPI/Swagger, token auth, containerized</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-indigo-400">3. Team Bandwidth</td>
                <td className="p-3 text-slate-400">No Python skills; exclusively off-the-shelf closed apps</td>
                <td className="p-3">Sysadmins/DBAs with scripting, but no embeddings/vector exp</td>
                <td className="p-3 text-indigo-300 font-bold">Engineers proficient in Python, modern web APIs, Docker &amp; AI</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-amber-400">4. Governance</td>
                <td className="p-3 text-slate-400">No data classification; passwords/PII stored in plain text</td>
                <td className="p-3">Basic RBAC, but no AI acceptable use policy or PII masking</td>
                <td className="p-3 text-amber-300 font-bold">Full DPDPA 2023 compliance, automated Presidio, ISO 42001</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-rose-400">5. Change Mgmt</td>
                <td className="p-3 text-slate-400">Users view AI with suspicion/fear of job cuts; resistance</td>
                <td className="p-3">Excited leadership, but frontline staff untrained</td>
                <td className="p-3 text-rose-300 font-bold">Frontline chiller operators co-designing &amp; testing prompts</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-amber-400">
          <strong>Mandatory Rule:</strong> If a project scores below <strong>15 out of 25</strong>, do not build an autonomous agent. Fix data hygiene and APIs first!
        </div>
      </div>

      {/* MTTR Breakdown & Financial ROI */}
      <div className="glass-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <DollarSign size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Measuring Real Value: The MTTR Breakdown &amp; ₹2.3 Cr Savings</h2>
            <p className="text-xs text-slate-400">Operational Loss Prevention at 120 Bulk Milk Chilling (BMC) Centers</p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
          <span className="text-emerald-400 font-bold block mb-1">MTTR Equation:</span>
          MTTR = MTTD (Detect) + MTTI (Triage / Identify) + MTTRem (Remediate) + MTTV (Verify)
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Phase</th>
                <th className="p-3">Human Legacy Process</th>
                <th className="p-3">AI-Augmented AIOps</th>
                <th className="p-3">Time Saved</th>
                <th className="p-3">Operational Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-slate-300">MTTD (Detect)</td>
                <td className="p-3">18 Minutes (Operator checks physical panel)</td>
                <td className="p-3 text-emerald-400 font-bold">10 Seconds (IoT telemetry trigger)</td>
                <td className="p-3">17.8 min</td>
                <td className="p-3 text-slate-400">Immediate alert prevents thermal runaway</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-slate-300">MTTI (Triage)</td>
                <td className="p-3">45 Minutes (DBAs &amp; sysadmins grepping logs)</td>
                <td className="p-3 text-emerald-400 font-bold">45 Seconds (AI correlates 3 logs)</td>
                <td className="p-3">44.2 min</td>
                <td className="p-3 text-slate-400">Identifies KM2 contactor fault instantly</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-slate-300">MTTRem (Remediate)</td>
                <td className="p-3">35 Minutes (Technician searches paper binders)</td>
                <td className="p-3 text-emerald-400 font-bold">15 Minutes (Step-by-step SOP WhatsApp)</td>
                <td className="p-3">20.0 min</td>
                <td className="p-3 text-slate-400">Backup glycol circuit engaged before 4.5°C</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-slate-300">MTTV (Verify)</td>
                <td className="p-3">15 Minutes (Manual pen &amp; paper record)</td>
                <td className="p-3 text-emerald-400 font-bold">2 Minutes (Automated SQL telemetry check)</td>
                <td className="p-3">13.0 min</td>
                <td className="p-3 text-slate-400">Confirms core milk temp stabilized at 3.8°C</td>
              </tr>
              <tr className="bg-emerald-950/20 font-bold border-t border-emerald-500/40">
                <td className="p-3 text-emerald-400">TOTAL MTTR</td>
                <td className="p-3 text-rose-400">113 Minutes (~2 Hours)</td>
                <td className="p-3 text-emerald-300">18 Minutes</td>
                <td className="p-3 text-emerald-400">84% Reduction</td>
                <td className="p-3 text-emerald-300">Zero Spoiled Milk • Saves ₹2.3 Cr / Year!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3-Year Enterprise TCO Comparison */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <DollarSign className="text-cyan-400" size={22} />
          <div>
            <h2 className="text-xl font-bold text-white">3-Year Enterprise TCO: Cloud APIs vs On-Premises GPU Cluster</h2>
            <p className="text-xs text-slate-400">Total Cost of Ownership comparison based on NDDB workload</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Cost Category</th>
                <th className="p-3">Cloud APIs Only (Azure / AWS)</th>
                <th className="p-3">On-Premises GPU Cluster (2× NVIDIA L40S)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold">Server Hardware &amp; NVMe Storage</td>
                <td className="p-3">₹0 (OpEx)</td>
                <td className="p-3 text-slate-300">₹24,00,000 (One-time CapEx)</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold">100GbE RoCE Networking</td>
                <td className="p-3">₹0</td>
                <td className="p-3 text-slate-300">₹4,50,000 (One-time CapEx)</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold">Datacenter Power &amp; HVAC Cooling</td>
                <td className="p-3">₹0</td>
                <td className="p-3 text-slate-300">₹3,60,000 (3 Years OpEx)</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold">API Token Ingestion Costs (1B tokens/mo)</td>
                <td className="p-3 text-rose-400">₹48,00,000</td>
                <td className="p-3 text-emerald-400 font-bold">₹0 (Unlimited tokens!)</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold">Network Egress Fees</td>
                <td className="p-3 text-rose-400">₹6,50,000</td>
                <td className="p-3 text-emerald-400 font-bold">₹0 (All internal LAN)</td>
              </tr>
              <tr className="bg-indigo-950/30 font-bold border-t border-indigo-500/40 text-sm">
                <td className="p-3 text-white">TOTAL 3-YEAR EXPENDITURE</td>
                <td className="p-3 text-rose-400">₹54,50,000</td>
                <td className="p-3 text-emerald-300">₹35,10,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30 text-xs font-mono text-emerald-300">
          <strong>Net Financial Benefit:</strong> On-premises cluster yields <strong>₹19,40,000 in net savings (35.6% lower TCO)</strong> while maintaining 100% data sovereignty under DPDPA 2023.
        </div>
      </div>

      {/* The 4 Golden Metrics of Enterprise AI Observability */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <Activity className="text-rose-400" size={22} />
          <div>
            <h2 className="text-xl font-bold text-white">Full-Stack Observability: The 4 Golden Metrics</h2>
            <p className="text-xs text-slate-400">OpenTelemetry (OTEL) GenAI semantic monitoring beyond HTTP 200 codes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-rose-400 block text-sm">1. Time to First Token (TTFT)</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Latency from user request arrival until the first token streams back. Target: &lt;800ms. Measures prompt processing and KV-cache lookup speed.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-cyan-400 block text-sm">2. Inter-Token Latency (ITL)</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Latency between consecutive tokens during generation. Target: &lt;25ms. Measures GPU memory bandwidth streaming throughput.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-emerald-400 block text-sm">3. Generation Throughput</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Total tokens generated per second across all concurrent active sessions. Monitors cluster load and triggers KEDA autoscaling.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-amber-400 block text-sm">4. Guardrail Drops &amp; Groundedness</strong>
            <p className="text-slate-300 font-sans leading-relaxed">
              Percentage of drafts intercepted or rejected by Critic loops. Spikes indicate prompt drift or upstream data corruption.
            </p>
          </div>
        </div>
      </div>

      {/* Lab: n8n AIOps CRON Orchestration */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <Network className="text-amber-400" size={24} />
          <div>
            <h2 className="text-xl font-bold text-white">Lab: n8n Event-Driven AIOps Orchestration</h2>
            <p className="text-xs text-slate-400">Automated triage of Modbus TCP, controller alarm, and database logs</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          Langflow waits for a human prompt. An enterprise IT outage does not. We configure n8n for event-driven orchestration (CRON triggers, Webhooks, and Conditional Branching) to ingest logs and auto-create P1 incident tickets.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
          <div className="w-full max-w-xl border border-slate-700 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 leading-relaxed">
            <span className="text-slate-500">// Production n8n Event Flow</span><br/><br/>
            <span className="text-amber-400">[CRON Trigger: Every 5 Mins]</span> <br/>
            &nbsp;&nbsp;└── <span className="text-cyan-400">[HTTP Node: Pull Docker Container Logs]</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <span className="text-emerald-400">[LLM Node: Multi-Service RCA Extraction]</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <span className="text-indigo-400">[IF Node: Critical Error Detected?]</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── TRUE: <span className="text-rose-400">[Jira Node: Create P1 Incident]</span> ➔ <span className="text-emerald-400">[Slack / WhatsApp: Alert On-Call Engineer]</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── FALSE: <span className="text-slate-500">[Stop: Nominal State]</span>
          </div>
          <p className="text-emerald-400 text-xs font-mono font-bold">
            Objective: Verify log triage output and automated runbook synthesis in local n8n instance.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day6/q2-scale-layer" className="button-secondary">
          <ArrowLeft size={16} /> Prev: Q2 The Scale Layer
        </Link>
        <Link href="/day6/q4-capstone" className="button-primary">
          Next: Q4 Grand Capstone <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
