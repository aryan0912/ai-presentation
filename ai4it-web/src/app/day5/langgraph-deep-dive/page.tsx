'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ArrowLeft, GitBranch, Database, Split, 
  XCircle, CheckCircle2, Layers, RefreshCw, PauseCircle, 
  Terminal, Code2, History, UserCheck, Sparkles 
} from 'lucide-react';

export default function LangGraphDeepDivePage() {
  // Visual Simulator State
  const [simMode, setSimMode] = useState<'self_heal' | 'hitl' | 'linear_fail'>('self_heal');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('critic');
  const [activeCodeTab, setActiveCodeTab] = useState<'graph_builder' | 'state_definition' | 'hitl_code'>('graph_builder');

  // Node details for inspector
  const nodeDetails: Record<string, {
    title: string;
    type: string;
    description: string;
    inputs: string[];
    outputs: string[];
    stateDiff: string;
    whyNeeded: string;
  }> = {
    start: {
      title: "__start__ (Input Boundary)",
      type: "Graph Ingestion",
      description: "Ingests raw natural language user question and initializes thread metadata.",
      inputs: ["User prompt text (e.g. 'Show total milk collected in Anand today')"],
      outputs: ["AgentState initialized with thread_id & retry_count = 0"],
      stateDiff: '+ messages: [HumanMessage(...)]\n+ retry_count: 0',
      whyNeeded: "Defines entry schema and guarantees every downstream node receives a standardized AgentState."
    },
    selector: {
      title: "table_selector_node (Stage 1 Router)",
      type: "Semantic Routing LLM",
      description: "Reads lightweight table summaries (12 tables) and selects only the 1-2 relevant tables.",
      inputs: ["state.messages[-1]", "table_descriptions.json (lightweight metadata)"],
      outputs: ["state.selected_tables (e.g. ['milk_procurement_records', 'collection_centers'])"],
      stateDiff: '+ selected_tables: ["milk_procurement_records", "collection_centers"]',
      whyNeeded: "Reduces context tokens from 6,000 to 750, eliminating hallucinations and slash LLM latency by 70%."
    },
    pruner: {
      title: "schema_pruner_node (Deterministic Slicer)",
      type: "Deterministic Python Function",
      description: "Slices full DDL schemas and Foreign Key JOIN patterns for only the selected tables.",
      inputs: ["state.selected_tables", "table_schemas.json (full columns, data types, constraints)"],
      outputs: ["state.filtered_schema (compact targeted DDL context)"],
      stateDiff: '+ filtered_schema: "CREATE TABLE milk_procurement_records (...)"',
      whyNeeded: "Zero LLM cost. Prepares the exact schema context needed for syntactically correct PostgreSQL generation."
    },
    generator: {
      title: "sql_generator_node (DBA Synthesis Agent)",
      type: "LLM Code Generation",
      description: "Drafts PostgreSQL 16 dialect query. On retry cycles, ingests error feedback to self-correct.",
      inputs: ["state.filtered_schema", "state.messages", "state.critique_feedback (if retrying)"],
      outputs: ["state.generated_sql", "state.retry_count += 1"],
      stateDiff: '+ generated_sql: "SELECT sum(quantity_litres) FROM milk_procurement_records..."\n~ retry_count: state.retry_count + 1',
      whyNeeded: "The brain of the pipeline. Because it accepts critique feedback, it can correct its own mistakes in a cycle!"
    },
    critic: {
      title: "security_critic_node (Security & Syntax Guardrail)",
      type: "Deterministic AST / Guardrail LLM",
      description: "Audits the drafted query for SQL syntax, DPDPA compliance (PII masking), and forbidden DDL/DML.",
      inputs: ["state.generated_sql"],
      outputs: ["state.is_safe (boolean)", "state.critique_feedback (reason for rejection if unsafe)"],
      stateDiff: '+ is_safe: False (or True)\n+ critique_feedback: "Column fat_pct does not exist; use fat_percentage"',
      whyNeeded: "The barrier that prevents broken SQL or malicious data leaks from ever reaching our live database."
    },
    conditional: {
      title: "route_after_critic (Conditional Edge Router)",
      type: "Dynamic Graph Branching Function",
      description: "Pure Python logic evaluating state. Decides whether to loop back, route to human, or execute.",
      inputs: ["state.is_safe", "state.retry_count", "state.is_write_operation"],
      outputs: ["Target Node name string ('sql_generator_node' | 'hitl_gate' | 'neon_executor_node')"],
      stateDiff: 'Dynamic edge evaluation (no state mutation)',
      whyNeeded: "THIS IS THE HEART OF LANGGRAPH. Enables cycles and dynamic routing that linear DAGs can never perform."
    },
    hitl: {
      title: "hitl_gate (Checkpointer Breakpoint)",
      type: "Human-in-the-Loop Interrupt",
      description: "Freezes execution state into Neon DB checkpointer. Waits for human supervisor approval.",
      inputs: ["State snapshot frozen via interrupt_before"],
      outputs: ["Human review signal (Approve / Edit SQL / Reject) via app.update_state()"],
      stateDiff: 'State frozen in PostgresSaver. Awaits resume signal.',
      whyNeeded: "Essential for enterprise compliance. Prevents destructive queries (UPDATE / DELETE) without human sign-off."
    },
    neon: {
      title: "neon_executor_node (PostgreSQL Tool Node)",
      type: "Live Database Tool",
      description: "Executes the verified query against Neon Serverless PostgreSQL with read-only sandbox credentials.",
      inputs: ["state.generated_sql"],
      outputs: ["state.sql_records (array of database rows)"],
      stateDiff: '+ sql_records: [{"total_litres": 142500.50, "center_count": 18}]',
      whyNeeded: "Connects the AI agent to ground truth data residing in cloud relational databases."
    },
    synthesizer: {
      title: "response_synthesizer_node (Executive Reporter)",
      type: "LLM Formatting Agent",
      description: "Converts raw SQL records and user question into clear, grounded markdown tables and insights.",
      inputs: ["state.sql_records", "state.messages"],
      outputs: ["Final user-facing AI response"],
      stateDiff: '+ messages: [AIMessage("Anand district collected 142,500.5 L across 18 centers...")]',
      whyNeeded: "Translates numbers into executive insights suitable for dairy plant managers."
    },
    end: {
      title: "__end__ (Terminal Node)",
      type: "Graph Termination",
      description: "Delivers final verified answer to the user interface and commits final checkpoint.",
      inputs: ["Complete finalized AgentState"],
      outputs: ["Streamed UI Response to client"],
      stateDiff: 'Execution complete. State persisted in Neon thread history.',
      whyNeeded: "Standardized exit boundary marking end of graph turn."
    }
  };

  // Run Step-by-Step Simulation
  const runSimulation = (mode: 'self_heal' | 'hitl' | 'linear_fail') => {
    setSimMode(mode);
    setIsSimulating(true);
    setActiveStep(1);
    setSimLog([]);

    // Step sequences
    // self_heal: 1 (start) -> 2 (selector) -> 3 (pruner) -> 4 (generator fail) -> 5 (critic reject) -> 4 (generator fix) -> 5 (critic pass) -> 7 (neon exec) -> 8 (synth) -> 9 (end)
    // hitl: 1 -> 2 -> 3 -> 4 -> 5 -> 6 (hitl freeze) -> (user approves) -> 7 -> 8 -> 9
    // linear_fail: 1 -> 2 -> 3 -> 4 -> 💥 CRASH at step 5

    let timeline: { step: number; log: string; nodeId: string; delay: number }[] = [];

    if (mode === 'self_heal') {
      timeline = [
        { step: 1, log: "🚀 [START]: Ingested query: 'Show average fat % in Anand collection centers'", nodeId: 'start', delay: 400 },
        { step: 2, log: "📂 [TABLE SELECTOR]: Filtered 12 tables down to: ['milk_procurement_records']", nodeId: 'selector', delay: 1000 },
        { step: 3, log: "✂️ [SCHEMA PRUNER]: Injected targeted DDL & numeric constraints into prompt context", nodeId: 'pruner', delay: 1600 },
        { step: 4, log: "⚙️ [SQL GENERATOR - PASS 1]: Drafted: SELECT avg(fat_pct) FROM milk_procurement_records", nodeId: 'generator', delay: 2400 },
        { step: 5, log: "🛡️ [SECURITY CRITIC]: ❌ REJECTED! Column 'fat_pct' does not exist (valid column: fat_percentage)", nodeId: 'critic', delay: 3200 },
        { step: 4, log: "🔄 [CYCLE TRIGGERED]: State updated with critique feedback. Routing BACK to sql_generator_node...", nodeId: 'generator', delay: 4200 },
        { step: 4, log: "✨ [SQL GENERATOR - PASS 2]: Auto-corrected: SELECT avg(fat_percentage) FROM milk_procurement_records", nodeId: 'generator', delay: 5200 },
        { step: 5, log: "✅ [SECURITY CRITIC]: PASSED! Read-only SELECT validated against schema.", nodeId: 'critic', delay: 6200 },
        { step: 7, log: "⚡ [NEON EXECUTOR]: Query executed in 48ms on Neon DB! Returned: [{'avg_fat': 4.38}]", nodeId: 'neon', delay: 7200 },
        { step: 8, log: "📊 [SYNTHESIZER]: Generated grounded executive response with verified metrics.", nodeId: 'synthesizer', delay: 8200 },
        { step: 9, log: "🎉 [SUCCESS]: Delivered final answer to user. Total time: 1.1s. Zero human intervention needed!", nodeId: 'end', delay: 9200 },
      ];
    } else if (mode === 'hitl') {
      timeline = [
        { step: 1, log: "🚀 [START]: Ingested prompt: 'Update milk baseline price to ₹52.00/L for Anand district'", nodeId: 'start', delay: 400 },
        { step: 2, log: "📂 [TABLE SELECTOR]: Selected table: ['dairy_pricing_slabs']", nodeId: 'selector', delay: 1000 },
        { step: 3, log: "✂️ [SCHEMA PRUNER]: Injected pricing constraints", nodeId: 'pruner', delay: 1600 },
        { step: 4, log: "⚙️ [SQL GENERATOR]: Drafted: UPDATE dairy_pricing_slabs SET rate_per_litre = 52.00 WHERE district = 'Anand'", nodeId: 'generator', delay: 2400 },
        { step: 5, log: "⚠️ [SECURITY CRITIC]: Detected DML write operation! Routing to Human-in-the-Loop Gate.", nodeId: 'critic', delay: 3200 },
        { step: 6, log: "⏸️ [HITL GATE]: Execution frozen via interrupt_before! State snapshotted into PostgresSaver.", nodeId: 'hitl', delay: 4200 },
        { step: 6, log: "👤 [HUMAN APPROVAL]: Plant General Manager clicked 'Approve Price Adjustment' in dashboard.", nodeId: 'hitl', delay: 5800 },
        { step: 7, log: "⚡ [NEON EXECUTOR]: Resumed thread. Transaction committed securely to Neon DB.", nodeId: 'neon', delay: 6800 },
        { step: 8, log: "📊 [SYNTHESIZER]: Generated audit confirmation receipt.", nodeId: 'synthesizer', delay: 7600 },
        { step: 9, log: "🎉 [SUCCESS]: Write safely completed with dual-custody approval log.", nodeId: 'end', delay: 8400 },
      ];
    } else {
      // linear_fail
      timeline = [
        { step: 1, log: "🚀 [START]: Ingested query: 'Show average fat % in Anand collection centers'", nodeId: 'start', delay: 400 },
        { step: 2, log: "📂 [SCHEMA INGESTION]: Loaded entire database schema (12 tables, 5,800 tokens)", nodeId: 'selector', delay: 1000 },
        { step: 3, log: "⚙️ [LLM STEP]: Drafted: SELECT avg(fat_pct) FROM milk_procurement_records", nodeId: 'generator', delay: 1800 },
        { step: 4, log: "⚡ [DIRECT DB EXEC]: Sending directly to Neon DB without validation or retry loop...", nodeId: 'neon', delay: 2600 },
        { step: 5, log: "💥 [FATAL CRASH]: psycopg2.errors.UndefinedColumn: column 'fat_pct' does not exist! Linear chain aborted. HTTP 500 returned to user!", nodeId: 'end', delay: 3400 },
      ];
    }

    timeline.forEach((item, index) => {
      setTimeout(() => {
        setActiveStep(item.step);
        setSelectedNodeId(item.nodeId);
        setSimLog(prev => [...prev, item.log]);
        if (index === timeline.length - 1) {
          setIsSimulating(false);
        }
      }, item.delay);
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <Link href="/day5/q4-scaling-security" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-mono w-fit">
          <ArrowLeft size={16} /> Back to Q4: Scaling &amp; Security
        </Link>
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-900/40 text-indigo-300 border border-indigo-500/30">
          Day 5 Capstone Architecture • Visual Deep-Dive
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: THE PEDAGOGICAL HOOK & WHAT WE ARE BUILDING */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase">
          <GitBranch size={16} /> Architecture Capstone: State Machines for Enterprise AI
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">LangGraph</span> Replaced Linear Chains
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl font-sans">
          In early 2024, production AI teams hit a hard wall with simple chains (<code>Prompt &rarr; LLM &rarr; Output</code>).
          Real-world enterprise systems are not straight assembly lines—they require <strong>stateful cyclic graphs</strong> that can catch errors, self-correct, pause for human approval, and survive server restarts.
        </p>

        {/* What We Are Building: Concrete Visual Overview Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-2">
              <Database size={15} /> The System We Are Constructing
            </span>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
              Live Neon PostgreSQL Integration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="text-indigo-400 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-900/60 flex items-center justify-center text-[10px]">1</span>
                Input Challenge
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Natural language dairy queries from plant managers (e.g., <em>&quot;Which chilling centers in Anand ran above 4°C during peak milk collection yesterday?&quot;</em>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-1.5 ring-1 ring-indigo-500/20">
              <div className="text-purple-400 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-900/60 flex items-center justify-center text-[10px]">2</span>
                The LangGraph Engine
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                A cyclic state machine that prunes 12 Neon DB tables, drafts SQL, catches syntax slips, auto-corrects queries in a feedback loop, and freezes destructive updates for human sign-off.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-900/60 flex items-center justify-center text-[10px]">3</span>
                Grounded Output
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Zero-hallucination executive markdown tables, complete with SQL audit trails, DPDPA data privacy masking, and exact live database verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: TOPOLOGICAL SHOWDOWN — WHY GRAPH IS BETTER THAN LINEAR */}
      {/* ========================================================================= */}
      <div className="glass-card space-y-6 border-indigo-500/40 bg-slate-950/90 p-6 sm:p-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">
            <Split size={14} /> Topological Architecture Comparison
          </div>
          <h2 className="text-2xl font-bold text-white">Why Linear Chains (DAGs) Break &amp; How Graphs Fix Them</h2>
          <p className="text-sm text-slate-300 mt-1 font-sans">
            Examine the actual network structures. A <strong>DAG (Directed Acyclic Graph)</strong> is a one-way conveyor belt with no memory. A <strong>Cyclic State Graph</strong> is an intelligent network with feedback loops.
          </p>
        </div>

        {/* Side-by-Side SVG Architecture Diagrams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Diagram: Linear Chain (DAG) */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-rose-400 flex items-center gap-1.5">
                  <XCircle size={15} /> 1. Linear Pipeline (LangChain LCEL / Sequential Chain)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900/50 text-rose-300 border border-rose-800">
                  Brittle • 0% Recovery
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Unidirectional conveyor belt: <code>Prompt | LLM | SQL Tool | DB</code>. Has no mechanism for loops or memory rollback.
              </p>
            </div>

            {/* SVG Diagram: Linear DAG with Crash */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 overflow-x-auto">
              <svg viewBox="0 0 480 180" className="w-full min-w-[420px] h-auto">
                <defs>
                  <marker id="arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
                  </marker>
                  <marker id="arrow-slate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                  </marker>
                </defs>

                {/* Node 1: User */}
                <rect x="10" y="55" width="85" height="42" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                <text x="52" y="74" fill="#f8fafc" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">User Input</text>
                <text x="52" y="88" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Prompt</text>

                {/* Arrow 1 -> 2 */}
                <line x1="95" y1="76" x2="125" y2="76" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-slate)" />

                {/* Node 2: Prompt + Schema */}
                <rect x="130" y="55" width="95" height="42" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                <text x="177" y="74" fill="#f8fafc" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Schema Inject</text>
                <text x="177" y="88" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">12 Tables</text>

                {/* Arrow 2 -> 3 */}
                <line x1="225" y1="76" x2="255" y2="76" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-slate)" />

                {/* Node 3: LLM SQL Gen */}
                <rect x="260" y="55" width="95" height="42" rx="8" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="307" y="73" fill="#fecdd3" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">LLM SQL Gen</text>
                <text x="307" y="87" fill="#fda4af" fontSize="8" fontFamily="monospace" textAnchor="middle">Syntax Typo!</text>

                {/* Arrow 3 -> 4 */}
                <line x1="355" y1="76" x2="385" y2="76" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-rose)" />

                {/* Node 4: Fatal Crash */}
                <rect x="390" y="50" width="80" height="52" rx="8" fill="#881337" stroke="#e11d48" strokeWidth="2" />
                <text x="430" y="71" fill="#fff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">💥 CRASH</text>
                <text x="430" y="85" fill="#fecdd3" fontSize="8" fontFamily="sans-serif" textAnchor="middle">HTTP 500 Error</text>
                <text x="430" y="95" fill="#fda4af" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Process Aborted</text>

                {/* Dead-End Barrier */}
                <line x1="390" y1="120" x2="470" y2="120" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="430" y="135" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle">NO U-TURN ALLOWED</text>
                <text x="240" y="165" fill="#94a3b8" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                  Acyclic rule: Edges can only advance forward. 1 error = 100% pipeline failure.
                </text>
              </svg>
            </div>

            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/50 text-[11px] font-mono text-rose-300">
              <strong>The Enterprise Vulnerability:</strong> LLMs generate invalid SQL ~15% of the time (hallucinating column names like <code>fat_pct</code> instead of <code>fat_percentage</code>). In a linear chain, this crashes straight into the user&apos;s screen.
            </div>
          </div>

          {/* Right Diagram: Cyclic State Graph (LangGraph) */}
          <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-indigo-400 flex items-center gap-1.5">
                  <CheckCircle2 size={15} /> 2. Cyclic State Graph (LangGraph State Machine)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 border border-indigo-800">
                  Self-Healing • Checkpointed
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Stateful network with cycles: Central <code>AgentState</code>, self-reflection loops, and conditional decision edges.
              </p>
            </div>

            {/* SVG Diagram: Cyclic Graph with Feedback Loop */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 overflow-x-auto">
              <svg viewBox="0 0 480 180" className="w-full min-w-[420px] h-auto">
                <defs>
                  <marker id="arrow-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#818cf8" />
                  </marker>
                  <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
                  </marker>
                  <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#c084fc" />
                  </marker>
                </defs>

                {/* Node 1: Input */}
                <rect x="10" y="80" width="75" height="38" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="47" y="97" fill="#f8fafc" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Input</text>
                <text x="47" y="109" fill="#94a3b8" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Prompt</text>

                {/* Arrow 1 -> Generator */}
                <line x1="85" y1="99" x2="115" y2="99" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow-indigo)" />

                {/* Node 2: SQL Generator (Cycle Target) */}
                <rect x="120" y="78" width="95" height="42" rx="8" fill="#311042" stroke="#a855f7" strokeWidth="2" />
                <text x="167" y="96" fill="#f3e8ff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SQL Generator</text>
                <text x="167" y="110" fill="#d8b4fe" fontSize="7" fontFamily="monospace" textAnchor="middle">↺ Cycle Target</text>

                {/* Arrow Generator -> Critic */}
                <line x1="215" y1="99" x2="245" y2="99" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple)" />

                {/* Node 3: Security Critic */}
                <rect x="250" y="78" width="95" height="42" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="297" y="96" fill="#e0e7ff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Security Critic</text>
                <text x="297" y="110" fill="#a5b4fc" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Syntax &amp; PII Audit</text>

                {/* THE CYCLIC RETURN LOOP (Top Arch) */}
                <path 
                  d="M 297 78 C 297 22, 167 22, 167 74" 
                  fill="none" 
                  stroke="#c084fc" 
                  strokeWidth="2.5" 
                  strokeDasharray="4 3" 
                  markerEnd="url(#arrow-purple)" 
                />
                {/* Loop Label Badge */}
                <rect x="182" y="12" width="102" height="18" rx="4" fill="#581c87" stroke="#c084fc" strokeWidth="1" />
                <text x="233" y="24" fill="#f5d0fe" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  ↺ Feedback Loop (Retry)
                </text>

                {/* Forward Arrow to Executor */}
                <line x1="345" y1="99" x2="375" y2="99" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-emerald)" />

                {/* Node 4: Validated Neon Execution */}
                <rect x="380" y="76" width="90" height="46" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="425" y="96" fill="#ecfdf5" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Neon Cloud DB</text>
                <text x="425" y="110" fill="#6ee7b7" fontSize="7" fontFamily="sans-serif" textAnchor="middle">✅ Clean Execution</text>

                {/* Bottom Explanatory Caption */}
                <text x="240" y="165" fill="#818cf8" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                  Self-healing: Error stack traces are injected into AgentState and fed back to LLM to self-heal.
                </text>
              </svg>
            </div>

            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-[11px] font-mono text-indigo-300">
              <strong>The Enterprise Win:</strong> 94% of LLM syntax errors are silently caught and auto-corrected in under 350ms before the user ever realizes a glitch happened!
            </div>
          </div>
        </div>

        {/* Structural Matrix: Linear DAG vs. Cyclic State Graph */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                <th className="py-2.5 px-3 text-left">Architectural Dimension</th>
                <th className="py-2.5 px-3 text-left text-rose-400">Linear Chain (LCEL / DAG)</th>
                <th className="py-2.5 px-3 text-left text-indigo-400">Cyclic StateGraph (LangGraph)</th>
                <th className="py-2.5 px-3 text-left text-emerald-400">Why It Matters for Dairy Copilot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Network Topology</td>
                <td className="py-2.5 px-3 text-rose-300">Strictly Acyclic (A &rarr; B &rarr; C)</td>
                <td className="py-2.5 px-3 text-indigo-300">Cyclic Network (loops + branches)</td>
                <td className="py-2.5 px-3 text-slate-400 font-sans">Enables autonomous retry loops when SQL fails.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Error Handling</td>
                <td className="py-2.5 px-3 text-rose-300">Crashes with HTTP 500</td>
                <td className="py-2.5 px-3 text-indigo-300">Critic loops feedback to Generator</td>
                <td className="py-2.5 px-3 text-slate-400 font-sans">Self-heals column typos (<code>fat_pct</code> &rarr; <code>fat_percentage</code>).</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">State Persistence</td>
                <td className="py-2.5 px-3 text-rose-300">Ephemeral memory (RAM only)</td>
                <td className="py-2.5 px-3 text-indigo-300">Checkpointed to Neon PostgreSQL</td>
                <td className="py-2.5 px-3 text-slate-400 font-sans">Survives server crashes; allows time-travel rewinds.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Human-In-The-Loop</td>
                <td className="py-2.5 px-3 text-rose-300">Impossible without hacky API breaks</td>
                <td className="py-2.5 px-3 text-indigo-300">Native <code>interrupt_before</code></td>
                <td className="py-2.5 px-3 text-slate-400 font-sans">Mandatory for DPDPA &amp; destructive milk payout updates.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: ACCURATELY LABELED FULL-SYSTEM ARCHITECTURAL DIAGRAM */}
      {/* ========================================================================= */}
      <div className="glass-card space-y-6 border-slate-800 bg-slate-950/95 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">
              <Layers size={14} /> Full State Machine Blueprint
            </div>
            <h2 className="text-2xl font-bold text-white">NDDB 2-Stage Text-to-SQL + Agentic RAG Graph</h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Click any node in the SVG diagram below to inspect its state, inputs, outputs, and role in the pipeline.
            </p>
          </div>
          
          {/* Interactive Simulation Trigger Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => runSimulation('self_heal')}
              disabled={isSimulating}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                simMode === 'self_heal' && isSimulating 
                  ? 'bg-purple-600 text-white animate-pulse' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
              }`}
            >
              <RefreshCw size={13} className={isSimulating && simMode === 'self_heal' ? 'animate-spin' : ''} />
              Simulate Self-Healing Loop
            </button>
            <button
              onClick={() => runSimulation('hitl')}
              disabled={isSimulating}
              className="px-3 py-1.5 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <PauseCircle size={13} />
              Simulate HITL Freeze
            </button>
            <button
              onClick={() => runSimulation('linear_fail')}
              disabled={isSimulating}
              className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <XCircle size={13} />
              Simulate Linear Crash
            </button>
          </div>
        </div>

        {/* Labeled High-Fidelity SVG Architecture Diagram */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto relative">
          <svg viewBox="0 0 960 380" className="w-full min-w-[880px] h-auto select-none">
            <defs>
              {/* Arrow Markers */}
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#60a5fa" />
              </marker>
              <marker id="arrow-purple-lg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#c084fc" />
              </marker>
              <marker id="arrow-emerald-lg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
              </marker>
              <marker id="arrow-cyan-lg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              
              {/* Glow Filter for Active Nodes */}
              <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* STAGE 1: ROUTING & PRUNING BOUNDARY (Background Tint) */}
            <rect x="15" y="45" width="285" height="120" rx="14" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="30" y="65" fill="#64748b" fontSize="9" fontFamily="monospace" fontWeight="bold">STAGE 1: SEMANTIC SCHEMA PRUNING</text>

            {/* STAGE 2: GENERATION & SELF-HEALING CYCLE BOUNDARY */}
            <rect x="315" y="45" width="310" height="280" rx="14" fill="#180b26" stroke="#581c87" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="330" y="65" fill="#c084fc" fontSize="9" fontFamily="monospace" fontWeight="bold">STAGE 2: CYCLIC GENERATION &amp; GUARDRAILS</text>

            {/* STAGE 3: EXECUTION & HITL BOUNDARY */}
            <rect x="640" y="45" width="305" height="280" rx="14" fill="#061f1c" stroke="#065f46" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="655" y="65" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">STAGE 3: LIVE CLOUD EXECUTION &amp; SYNTHESIS</text>

            {/* ================================================================= */}
            {/* NODES & EDGES */}
            {/* ================================================================= */}

            {/* NODE 1: START */}
            <g 
              onClick={() => setSelectedNodeId('start')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <circle 
                cx="55" cy="115" r="28" 
                fill={selectedNodeId === 'start' ? '#1d4ed8' : '#0f172a'} 
                stroke={selectedNodeId === 'start' ? '#60a5fa' : '#3b82f6'} 
                strokeWidth={selectedNodeId === 'start' ? 3 : 2}
                filter={selectedNodeId === 'start' ? 'url(#glow-purple)' : undefined}
              />
              <text x="55" y="112" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">__start__</text>
              <text x="55" y="125" fill="#93c5fd" fontSize="7" fontFamily="monospace" textAnchor="middle">Prompt</text>
            </g>

            {/* EDGE: START -> TABLE_SELECTOR */}
            <line x1="83" y1="115" x2="115" y2="115" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />

            {/* NODE 2: TABLE_SELECTOR */}
            <g 
              onClick={() => setSelectedNodeId('selector')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect 
                x="120" y="88" width="80" height="54" rx="8" 
                fill={selectedNodeId === 'selector' ? '#312e81' : '#1e1b4b'} 
                stroke={selectedNodeId === 'selector' ? '#818cf8' : '#4f46e5'} 
                strokeWidth={selectedNodeId === 'selector' ? 2.5 : 1.5}
                filter={selectedNodeId === 'selector' ? 'url(#glow-purple)' : undefined}
              />
              <text x="160" y="107" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">table_selector</text>
              <text x="160" y="120" fill="#a5b4fc" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Prunes 12 &rarr; 1-2</text>
              <text x="160" y="132" fill="#818cf8" fontSize="7" fontFamily="monospace" textAnchor="middle">Stage 1 LLM</text>
            </g>

            {/* EDGE: TABLE_SELECTOR -> SCHEMA_PRUNER */}
            <line x1="200" y1="115" x2="218" y2="115" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />

            {/* NODE 3: SCHEMA_PRUNER */}
            <g 
              onClick={() => setSelectedNodeId('pruner')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect 
                x="222" y="88" width="70" height="54" rx="8" 
                fill={selectedNodeId === 'pruner' ? '#581c87' : '#2e1065'} 
                stroke={selectedNodeId === 'pruner' ? '#c084fc' : '#7e22ce'} 
                strokeWidth={selectedNodeId === 'pruner' ? 2.5 : 1.5}
                filter={selectedNodeId === 'pruner' ? 'url(#glow-purple)' : undefined}
              />
              <text x="257" y="107" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">schema_pruner</text>
              <text x="257" y="120" fill="#e9d5ff" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Target DDL</text>
              <text x="257" y="132" fill="#d8b4fe" fontSize="7" fontFamily="monospace" textAnchor="middle">Deterministic</text>
            </g>

            {/* EDGE: SCHEMA_PRUNER -> SQL_GENERATOR */}
            <line x1="292" y1="115" x2="330" y2="115" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-purple-lg)" />

            {/* NODE 4: SQL_GENERATOR (THE CYCLE TARGET) */}
            <g 
              onClick={() => setSelectedNodeId('generator')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect 
                x="335" y="85" width="105" height="60" rx="10" 
                fill={selectedNodeId === 'generator' ? '#4a044e' : '#3b0764'} 
                stroke={selectedNodeId === 'generator' ? '#f472b6' : '#d946ef'} 
                strokeWidth={selectedNodeId === 'generator' ? 3 : 2}
                filter={selectedNodeId === 'generator' ? 'url(#glow-purple)' : undefined}
              />
              <text x="387" y="106" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">sql_generator</text>
              <text x="387" y="120" fill="#fbcfe8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Drafts Postgres SQL</text>
              <rect x="345" y="127" width="85" height="13" rx="3" fill="#701a75" />
              <text x="387" y="136" fill="#fdf4ff" fontSize="7" fontFamily="monospace" textAnchor="middle">↺ Target of Cycle</text>
            </g>

            {/* EDGE: SQL_GENERATOR -> SECURITY_CRITIC */}
            <line x1="440" y1="115" x2="480" y2="115" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-purple-lg)" />

            {/* NODE 5: SECURITY_CRITIC */}
            <g 
              onClick={() => setSelectedNodeId('critic')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect 
                x="485" y="85" width="115" height="60" rx="10" 
                fill={selectedNodeId === 'critic' ? '#4c0519' : '#881337'} 
                stroke={selectedNodeId === 'critic' ? '#fb7185' : '#e11d48'} 
                strokeWidth={selectedNodeId === 'critic' ? 3 : 2}
                filter={selectedNodeId === 'critic' ? 'url(#glow-purple)' : undefined}
              />
              <text x="542" y="106" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">security_critic</text>
              <text x="542" y="120" fill="#fecdd3" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Syntax &amp; PII Guardrail</text>
              <rect x="495" y="127" width="95" height="13" rx="3" fill="#9f1239" />
              <text x="542" y="136" fill="#ffe4e6" fontSize="7" fontFamily="monospace" textAnchor="middle">Deterministic + DPDPA</text>
            </g>

            {/* EDGE: SECURITY_CRITIC -> CONDITIONAL EDGE (Down to Diamond) */}
            <line x1="542" y1="145" x2="542" y2="185" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-purple-lg)" />

            {/* NODE 6: CONDITIONAL EDGE ROUTER (Decision Diamond) */}
            <g 
              onClick={() => setSelectedNodeId('conditional')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <polygon 
                points="542,190 600,225 542,260 484,225" 
                fill={selectedNodeId === 'conditional' ? '#3b0764' : '#1e1b4b'} 
                stroke={selectedNodeId === 'conditional' ? '#e879f9' : '#a855f7'} 
                strokeWidth={selectedNodeId === 'conditional' ? 2.5 : 1.5}
              />
              <text x="542" y="222" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">route_after_critic</text>
              <text x="542" y="233" fill="#c084fc" fontSize="7" fontFamily="sans-serif" textAnchor="middle">(Conditional Edge)</text>
            </g>

            {/* ================================================================= */}
            {/* THE CRITICAL CYCLIC FEEDBACK LOOP (Path A) */}
            {/* Curves from left vertex of Diamond (484, 225) back into sql_generator (387, 145) */}
            {/* ================================================================= */}
            <path 
              d="M 484 225 C 410 225, 387 185, 387 150" 
              fill="none" 
              stroke="#e11d48" 
              strokeWidth="2.5" 
              strokeDasharray="4 3" 
              markerEnd="url(#arrow-purple-lg)" 
            />
            {/* Loop Badge */}
            <rect x="360" y="245" width="135" height="26" rx="5" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
            <text x="427" y="257" fill="#fecdd3" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              ↺ Cycle: Error Feedback Loop
            </text>
            <text x="427" y="267" fill="#fda4af" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
              if not is_safe &amp; retry_count &lt; 3
            </text>

            {/* BRANCH B: Dangerous DML Operation -> HITL GATE */}
            <path 
              d="M 542 260 L 542 295 L 655 295" 
              fill="none" 
              stroke="#38bdf8" 
              strokeWidth="2" 
              markerEnd="url(#arrow-cyan-lg)" 
            />
            <text x="590" y="290" fill="#38bdf8" fontSize="7" fontFamily="monospace">Path B: DML Write</text>

            {/* NODE 7: HITL GATE (Human in the loop breakpoint) */}
            <g 
              onClick={() => setSelectedNodeId('hitl')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect 
                x="660" y="270" width="95" height="50" rx="8" 
                fill={selectedNodeId === 'hitl' ? '#0e7490' : '#164e63'} 
                stroke={selectedNodeId === 'hitl' ? '#38bdf8' : '#0891b2'} 
                strokeWidth={selectedNodeId === 'hitl' ? 2.5 : 1.5}
                filter={selectedNodeId === 'hitl' ? 'url(#glow-purple)' : undefined}
              />
              <text x="707" y="290" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">hitl_gate</text>
              <text x="707" y="303" fill="#a5f3fc" fontSize="7" fontFamily="sans-serif" textAnchor="middle">interrupt_before</text>
              <text x="707" y="313" fill="#67e8f9" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Freezes to PostgresSaver</text>
            </g>

            {/* EDGE: HITL -> NEON DB EXECUTOR */}
            <path 
              d="M 755 295 L 795 295 L 795 145" 
              fill="none" 
              stroke="#38bdf8" 
              strokeWidth="2" 
              markerEnd="url(#arrow-cyan-lg)" 
            />

            {/* BRANCH C: Safe Query -> DIRECT TO NEON EXECUTOR */}
            <path 
              d="M 600 225 L 670 225 L 670 120 L 735 120" 
              fill="none" 
              stroke="#34d399" 
              strokeWidth="2.5" 
              markerEnd="url(#arrow-emerald-lg)" 
            />
            <text x="645" y="218" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">Path C: Safe Read</text>

            {/* NODE 8: NEON_EXECUTOR */}
            <g 
              onClick={() => setSelectedNodeId('neon')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect 
                x="740" y="90" width="105" height="55" rx="10" 
                fill={selectedNodeId === 'neon' ? '#065f46' : '#064e3b'} 
                stroke={selectedNodeId === 'neon' ? '#6ee7b7' : '#10b981'} 
                strokeWidth={selectedNodeId === 'neon' ? 2.5 : 1.5}
                filter={selectedNodeId === 'neon' ? 'url(#glow-purple)' : undefined}
              />
              <text x="792" y="110" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">neon_executor</text>
              <text x="792" y="123" fill="#a7f3d0" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle">Neon PostgreSQL Tool</text>
              <text x="792" y="135" fill="#6ee7b7" fontSize="7" fontFamily="monospace" textAnchor="middle">12 Live Tables</text>
            </g>

            {/* EDGE: NEON_EXECUTOR -> SYNTHESIZER */}
            <line x1="845" y1="117" x2="865" y2="117" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-emerald-lg)" />

            {/* NODE 9: RESPONSE_SYNTHESIZER */}
            <g 
              onClick={() => setSelectedNodeId('synthesizer')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <rect 
                x="870" y="90" width="70" height="55" rx="8" 
                fill={selectedNodeId === 'synthesizer' ? '#047857' : '#064e3b'} 
                stroke={selectedNodeId === 'synthesizer' ? '#34d399' : '#059669'} 
                strokeWidth={selectedNodeId === 'synthesizer' ? 2.5 : 1.5}
                filter={selectedNodeId === 'synthesizer' ? 'url(#glow-purple)' : undefined}
              />
              <text x="905" y="111" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">synthesizer</text>
              <text x="905" y="124" fill="#d1fae5" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Markdown</text>
              <text x="905" y="135" fill="#a7f3d0" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Grounded Out</text>
            </g>

            {/* EDGE: SYNTHESIZER -> END */}
            <line x1="905" y1="145" x2="905" y2="190" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-emerald-lg)" />

            {/* NODE 10: END */}
            <g 
              onClick={() => setSelectedNodeId('end')} 
              className="cursor-pointer transition-transform hover:opacity-90"
            >
              <circle 
                cx="905" cy="225" r="26" 
                fill={selectedNodeId === 'end' ? '#047857' : '#022c22'} 
                stroke={selectedNodeId === 'end' ? '#6ee7b7' : '#059669'} 
                strokeWidth={selectedNodeId === 'end' ? 3 : 2}
                filter={selectedNodeId === 'end' ? 'url(#glow-purple)' : undefined}
              />
              <text x="905" y="223" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">__end__</text>
              <text x="905" y="235" fill="#6ee7b7" fontSize="7" fontFamily="monospace" textAnchor="middle">Delivered</text>
            </g>
          </svg>
        </div>

        {/* Live Simulation Trace Stream (If Active) */}
        {simLog.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-300">
              <span className="flex items-center gap-2">
                <Terminal size={14} className="text-indigo-400" />
                Live StateGraph Execution Stream ({simMode.toUpperCase()})
              </span>
              <button 
                onClick={() => setSimLog([])} 
                className="text-[10px] text-slate-400 hover:text-slate-200"
              >
                Clear Trace
              </button>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5 max-h-48 overflow-y-auto">
              {simLog.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-2 ${
                    line.includes('FATAL') || line.includes('REJECTED') ? 'text-rose-400 font-bold' :
                    line.includes('CYCLE') ? 'text-purple-400 font-bold' :
                    line.includes('SUCCESS') || line.includes('PASSED') ? 'text-emerald-400 font-bold' :
                    line.includes('HITL') || line.includes('FREEZE') ? 'text-cyan-400 font-bold' :
                    'text-slate-300'
                  }`}
                >
                  <span className="text-slate-600 select-none">[{idx + 1}]</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Diagram Node Inspector Drawer */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-indigo-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">
                Inspecting Selected Component:
              </span>
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                {nodeDetails[selectedNodeId]?.title || selectedNodeId}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                  {nodeDetails[selectedNodeId]?.type}
                </span>
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Click any other node in the graph diagram above to switch view
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Left: Component Role & Mission */}
            <div className="space-y-3">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Architectural Role:</span>
                <p className="text-slate-200 font-sans leading-relaxed">
                  {nodeDetails[selectedNodeId]?.description}
                </p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Why It Is Essential:</span>
                <p className="text-indigo-300 font-sans leading-relaxed bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-500/20">
                  {nodeDetails[selectedNodeId]?.whyNeeded}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Input Dependencies</span>
                  <ul className="text-[11px] text-slate-300 list-disc list-inside mt-1 space-y-0.5">
                    {nodeDetails[selectedNodeId]?.inputs.map((inItem, i) => (
                      <li key={i} className="truncate">{inItem}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">State Updates</span>
                  <ul className="text-[11px] text-emerald-300 list-disc list-inside mt-1 space-y-0.5">
                    {nodeDetails[selectedNodeId]?.outputs.map((outItem, i) => (
                      <li key={i} className="truncate">{outItem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: State Mutation Blackboard (TypedDict Diff) */}
            <div className="space-y-2">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                AgentState Blackboard Mutation (Python Diff):
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono overflow-x-auto leading-relaxed">
                {nodeDetails[selectedNodeId]?.stateDiff}
              </pre>
              <span className="text-[10px] text-slate-500 font-sans block">
                💡 Every node returns a partial dictionary. LangGraph automatically merges these updates into the persistent central state.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: THE 4 ENTERPRISE PILLARS OF LANGGRAPH */}
      {/* ========================================================================= */}
      <div className="glass-card space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-1">
            Engineered for Production
          </span>
          <h2 className="text-2xl font-bold text-white">The 4 Superpowers That Make LangGraph Enterprise-Ready</h2>
          <p className="text-sm text-slate-300 mt-1 font-sans">
            Why Fortune 500 engineering teams build agentic workflows on LangGraph instead of custom while-loops or raw chains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Code2 size={20} />
              </div>
              <div>
                <span className="text-[10px] text-indigo-400 uppercase font-bold block">Pillar 1</span>
                <strong className="text-white text-sm font-bold font-sans">Strongly-Typed Shared State &amp; Reducers</strong>
              </div>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed text-xs">
              Unlike loose Python dictionaries, LangGraph states use <code>TypedDict</code> and explicit reducers (e.g. <code>Annotated[List[BaseMessage], operator.add]</code>). Messages and audit trails <strong>append</strong> deterministically rather than overwriting, completely eliminating runtime <code>KeyError</code> crashes.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <RefreshCw size={20} />
              </div>
              <div>
                <span className="text-[10px] text-purple-400 uppercase font-bold block">Pillar 2</span>
                <strong className="text-white text-sm font-bold font-sans">True Cycles with Recursion Guardrails</strong>
              </div>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed text-xs">
              LangGraph natively permits directed cyclic edges (<code>sql_generator &harr; security_critic</code>) with strict enforcement limits (<code>recursion_limit=15</code>). When a tool throws a database exception, the agent inspects the stack trace and self-corrects without getting stuck in an infinite billable loop.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <History size={20} />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">Pillar 3</span>
                <strong className="text-white text-sm font-bold font-sans">Fault-Tolerant Checkpointing on Neon PostgreSQL</strong>
              </div>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed text-xs">
              Every step execution atomically writes a state snapshot into <code>PostgresSaver</code> on Neon DB. If an AWS Lambda times out or a Kubernetes pod is evicted, the thread resumes seamlessly from the exact same step without re-spending LLM tokens or re-running expensive vector retrievals.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <UserCheck size={20} />
              </div>
              <div>
                <span className="text-[10px] text-cyan-400 uppercase font-bold block">Pillar 4</span>
                <strong className="text-white text-sm font-bold font-sans">Human-In-The-Loop &amp; Time-Travel Debugging</strong>
              </div>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed text-xs">
              With <code>interrupt_before=[&quot;neon_executor&quot;]</code>, the graph freezes before executing destructive queries (e.g. <code>UPDATE dairy_pricing_slabs</code>). Plant supervisors can view proposed SQL, edit values directly in state, approve, or rewind to an earlier checkpoint like Git!
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5: PRODUCTION RUNNABLE PYTHON BLUEPRINT */}
      {/* ========================================================================= */}
      <div className="glass-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Production LangGraph Code Blueprint</h3>
            <p className="text-xs text-slate-400">The exact runnable Python 3.11+ code implementing the diagram above on Neon PostgreSQL</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCodeTab('graph_builder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeCodeTab === 'graph_builder' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              1. Graph Assembly &amp; Cycles
            </button>
            <button
              onClick={() => setActiveCodeTab('state_definition')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeCodeTab === 'state_definition' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              2. Typed AgentState
            </button>
            <button
              onClick={() => setActiveCodeTab('hitl_code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeCodeTab === 'hitl_code' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              3. HITL &amp; PostgresSaver
            </button>
          </div>
        </div>

        {activeCodeTab === 'graph_builder' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>nddb_langgraph_sql_agent.py (StateGraph Assembly)</span>
              <span className="text-emerald-400">Official LangGraph 0.2+ Specification</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`from typing import TypedDict, Annotated, List, Optional
import operator
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.postgres import PostgresSaver

# ============================================================================
# 1. CONDITIONAL ROUTING EDGE FUNCTION
# ============================================================================
def route_after_critic(state: AgentState) -> str:
    """
    Evaluates the security and syntax report from security_critic_node.
    Returns the exact target node name string.
    """
    # If critic caught a syntax error or hallucinated column:
    if not state["is_safe"]:
        if state["retry_count"] < 3:
            # ↺ THE CYCLIC FEEDBACK LOOP: Route back to generator with error feedback!
            return "sql_generator_node"
        # If max retries exceeded, gracefully abort to synthesizer with error explanation
        return "response_synthesizer_node"
        
    # If the user requested a destructive DML write (UPDATE/DELETE/INSERT):
    if state.get("is_write_operation", False):
        return "hitl_gate" # Route to Human-in-the-Loop breakpoint!
        
    # Standard read-only safe path: Proceed to live execution
    return "neon_executor_node"

# ============================================================================
# 2. ASSEMBLE THE STATEGRAPH
# ============================================================================
builder = StateGraph(AgentState)

# Register Nodes (pure Python callable functions)
builder.add_node("table_selector_node", table_selector_node)
builder.add_node("schema_pruner_node", schema_pruner_node)
builder.add_node("sql_generator_node", sql_generator_node)
builder.add_node("security_critic_node", security_critic_node)
builder.add_node("neon_executor_node", neon_executor_node)
builder.add_node("response_synthesizer_node", response_synthesizer_node)

# Linear Edges (Stage 1)
builder.add_edge(START, "table_selector_node")
builder.add_edge("table_selector_node", "schema_pruner_node")
builder.add_edge("schema_pruner_node", "sql_generator_node")
builder.add_edge("sql_generator_node", "security_critic_node")

# Dynamic Conditional Edge (Stage 2: Self-Healing Cycle or Execution)
builder.add_conditional_edges(
    "security_critic_node",
    route_after_critic,
    {
        "sql_generator_node": "sql_generator_node",             # ↺ Autonomous Retry Loop
        "neon_executor_node": "neon_executor_node",             # Execution
        "response_synthesizer_node": "response_synthesizer_node" # Graceful Fallback
    }
)

builder.add_edge("neon_executor_node", "response_synthesizer_node")
builder.add_edge("response_synthesizer_node", END)

# Compile Graph with Persistence
app = builder.compile()`}
            </pre>
          </div>
        )}

        {activeCodeTab === 'state_definition' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>AgentState Typed Schema with Reducers</span>
              <span className="text-purple-400">Guaranteed Key Safety</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed">
{`from typing import TypedDict, Annotated, List, Optional
import operator
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    """
    The shared state blackboard passed through every node in the graph.
    Reducers define how partial updates are merged into state.
    """
    # operator.add ensures that incoming messages APPEND rather than overwrite
    messages: Annotated[List[BaseMessage], operator.add]
    
    # State fields populated along the graph path
    selected_tables: List[str]     # Set by table_selector_node (e.g. ['chillers'])
    filtered_schema: str           # Set by schema_pruner_node
    generated_sql: str             # Set by sql_generator_node
    is_write_operation: bool       # Set by sql_generator_node (detects UPDATE/INSERT)
    
    # Validation & feedback loop fields
    is_safe: bool                  # Set by security_critic_node
    critique_feedback: Optional[str] # Error details fed back to sql_generator_node
    retry_count: int               # Incremented on each reflection pass
    
    # Live execution results
    sql_records: List[dict]        # Returned by neon_executor_node`}
            </pre>
          </div>
        )}

        {activeCodeTab === 'hitl_code' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Human-In-The-Loop Breakpoints (interrupt_before) &amp; Neon PostgresSaver</span>
              <span className="text-cyan-400">Dual-Custody Protection</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`import psycopg
from langgraph.checkpoint.postgres import PostgresSaver

# Connect to Neon Serverless PostgreSQL Checkpoint Store
DB_URI = "postgresql://user:pass@ep-wandering-water-b52fnnnb-pooler.c-7.us-east-2.aws.neon.tech/neondb"

with psycopg.connect(DB_URI) as conn:
    checkpointer = PostgresSaver(conn)
    checkpointer.setup() # Automatically creates checkpoint migration tables
    
    # 1. Compile graph with an explicit interruption breakpoint
    app = builder.compile(
        checkpointer=checkpointer,
        interrupt_before=["neon_executor_node"] # FREEZE BEFORE DATABASE WRITE!
    )
    
    thread_config = {"configurable": {"thread_id": "anand-session-904"}}
    
    # 2. Run graph until it pauses automatically at the breakpoint
    print("Agent running...")
    for event in app.stream({"messages": [("user", "Set milk baseline payout to ₹52.00/L")]}, thread_config):
        print("Event:", event)
        
    # 3. Execution halts! Human supervisor inspects frozen state from Neon:
    snapshot = app.get_state(thread_config)
    print("\\n[FROZEN STATE AWAITING HUMAN REVIEW]:")
    print("Pending SQL:", snapshot.values["generated_sql"])
    print("Next Node:", snapshot.next) # ('neon_executor_node',)
    
    # 4. Supervisor approves (or edits query directly in state):
    # app.update_state(thread_config, {"generated_sql": "UPDATE dairy_pricing_slabs SET rate = 51.50..."})
    
    # 5. Resume execution by streaming None with the same thread ID:
    print("\\nResuming execution after human authorization...")
    for event in app.stream(None, thread_config):
        print("Resumed Event:", event)`}
            </pre>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 6: PRACTICAL DECISION HEURISTIC */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950 border border-indigo-500/30 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles size={18} className="text-indigo-400" />
          The Architect&apos;s Heuristic: When to use LCEL Chains vs. LangGraph
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <strong className="text-rose-400 block font-bold">Use Simple Linear Chains (LCEL) when:</strong>
            <ul className="text-slate-300 font-sans list-disc list-inside space-y-1">
              <li>Input &rarr; Output is purely linear and deterministic (e.g. summarize this PDF).</li>
              <li>No external tools or databases can fail or return syntax errors.</li>
              <li>No human sign-off or approval pause is required.</li>
              <li>Latency is paramount and you do not need state persistence across restarts.</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-500/40 space-y-1">
            <strong className="text-indigo-400 block font-bold">Use LangGraph State Machines when:</strong>
            <ul className="text-slate-300 font-sans list-disc list-inside space-y-1">
              <li>Agents execute tools (SQL, APIs, Web Browsing) that might fail and require retries.</li>
              <li>Self-correction &amp; critique loops are needed to heal flawed code or schema mismatches.</li>
              <li>Workflows require Human-in-the-Loop review for safety or financial compliance.</li>
              <li>Sessions must survive network drops and server restarts with checkpointed state.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800">
        <Link href="/day5/q4-scaling-security" className="button-secondary w-full sm:w-auto">
          <ArrowLeft size={16} /> Prev: Q4 Scale &amp; Security
        </Link>
        <Link href="/day6" className="button-primary w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
          Proceed to Day 6: Production &amp; Scale <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
