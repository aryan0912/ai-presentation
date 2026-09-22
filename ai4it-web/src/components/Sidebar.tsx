'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  ChevronRight,
  MapPin,
  Activity,
  ChevronLeft,
  Sparkles,
  Layers,
  BrainCircuit,
  TrendingUp,
  Cpu,
  Server
} from 'lucide-react';
import './sidebar.css';
import { usePresentation } from './PresentationContext';

interface NavItem {
  href: string;
  label: string;
  minutes: string;
  icon?: any;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = usePresentation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'OPENING': true,
    'DAY 1 · Patterns': false,
    'DAY 2 · Memory, Attention & LLMs': false,
    'DAY 3 · Prompting & RAG': false,
    'DAY 4 · Production Architecture': false,
    'DAY 5 · The Full Agentic Stack': true,
    'DAY 6 · Hardening & Capstone': true,
  });

  const navGroups: NavGroup[] = [
    {
      title: 'OPENING',
      defaultOpen: true,
      items: [
        { href: '/', label: 'Welcome & Overview', minutes: '30m' },
        { href: '/course-map', label: 'The 6-Day Map', minutes: '10m' },
        { href: '/day1/dairy-ai', label: 'AI in Dairy Ecosystem', minutes: '20m' },
        { href: '/antigravity', label: 'Antigravity Setup', minutes: '30m' },
      ],
    },
    {
      title: 'DAY 1 · Patterns',
      defaultOpen: false,
      items: [
        { href: '/day1/linear-regression', label: '1. Linear Regression', minutes: '65m' },
        { href: '/day1/neural-network', label: '2. Neural Networks', minutes: '75m' },
        { href: '/day1/case-study', label: '3. Case Study: AI in IT', minutes: '30m' },
        { href: '/day1/sequence-problem', label: '4. When Order Matters', minutes: '20m' },
        { href: '/day1/lab', label: '5. Lab: You Try It', minutes: '15m' },
        { href: '/day1/poc-vs-production', label: '6. POC vs Production', minutes: '10m' },
      ],
    },
    {
      title: 'DAY 2 · Memory, Attention & LLMs',
      defaultOpen: false,
      items: [
        { href: '/day2/nlp-intro', label: '0. NLP: Tokens & Embeddings', minutes: '25m' },
        { href: '/day2/rnn', label: '1. Hop 1: RNN Memory Loop', minutes: '25m' },
        { href: '/day2/lstm', label: '2. Hop 2: LSTM Gated Memory', minutes: '30m' },
        { href: '/day2/transformer', label: '3. Hop 3: The Transformer (3B1B)', minutes: '120m' },
        { href: '/day2/chatgpt-case-study', label: '4. Case Study: How ChatGPT Works', minutes: '20m' },
        { href: '/day2/hands-on', label: '5. Hands-On: Ollama & HF Suite', minutes: '90m' },
      ],
    },
    {
      title: 'DAY 3 · Prompting & RAG',
      defaultOpen: false,
      items: [
        { href: '/day3/industry-use-cases', label: '1. Where AI Lives in IT', minutes: '60m' },
        { href: '/day3/prompting-framework', label: '2. Prompting & Structured JSON', minutes: '60m' },
        { href: '/day3/langflow-intro', label: '3. Meet Langflow (Pre-Lunch)', minutes: '120m' },
        { href: '/day3/rag-plumbing', label: '4. Hitting the Wall: RAG Architecture', minutes: '60m' },
        { href: '/day3/langflow-build', label: '5. Live Build: 8-Node RAG Bot', minutes: '120m' },
      ],
    },
    {
      title: 'DAY 4 · Production Architecture',
      defaultOpen: false,
      items: [
        { href: '/day4/messy-data', label: '1. Messy Data & Code', minutes: '105m' },
        { href: '/day4/production-architecture', label: '2. Production Architecture', minutes: '120m' },
        { href: '/day4/retrieval-quality', label: '3. Retrieval Quality & Eval', minutes: '90m' },
        { href: '/day4/decision-exercise', label: '4. Judgment & Scale', minutes: '75m' },
      ],
    },
    {
      title: 'DAY 5 · The Full Agentic Stack',
      defaultOpen: true,
      items: [
        { href: '/day5', label: 'Overview: 4 Quarters', minutes: '20m' },
        { href: '/day5/q1-tool-factory', label: 'Q1. The Tool Factory', minutes: '105m' },
        { href: '/day5/q2-agentic-rag', label: 'Q2. Agentic RAG', minutes: '105m' },
        { href: '/day5/q3-mcp-revolution', label: 'Q3. The MCP Revolution', minutes: '105m' },
        { href: '/day5/q4-scaling-security', label: 'Q4. Scaling & Security', minutes: '105m' },
      ],
    },
    {
      title: 'DAY 6 · Hardening & Capstone',
      defaultOpen: true,
      items: [
        { href: '/day6', label: 'Overview: Enterprise Hardening', minutes: '20m' },
        { href: '/day6/n8n-connectors', label: '1. n8n Enterprise Connectors', minutes: '50m' },
        { href: '/day6/multi-agent-rca', label: '2. Multi-Agent RCA & Cascade', minutes: '65m' },
        { href: '/day6/red-teaming-governance', label: '3. Red-Teaming & Governance CTF', minutes: '60m' },
        { href: '/day6/scale-and-deployment', label: '4. Scale & Hardware Sizing', minutes: '50m' },
        { href: '/day6/enterprise-roadmap', label: '5. The Capstone Roadmap', minutes: '75m' },
      ],
    },
  ];

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  if (isSidebarCollapsed) {
    return (
      <aside className="sidebar-collapsed">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-xl hover:bg-slate-800 text-sky-400 hover:text-white transition-all m-2"
          title="Expand Sidebar ([)"
        >
          <ChevronRight size={20} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header flex items-center justify-between">
        <div>
          <h2>AI4IT Workshop</h2>
          <p className="subtitle">NDDB ICT Training · 6 Days</p>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Collapse Sidebar ([)"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => {
          const isOpen = openGroups[group.title] ?? true;
          return (
            <div key={group.title} className="nav-group">
              <div
                className="nav-group-header"
                onClick={() => toggleGroup(group.title)}
              >
                <span>{group.title}</span>
                {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </div>

              {isOpen && (
                <div className="space-y-0.5 mt-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-link ${isActive ? 'active' : ''}`}
                      >
                        <span className="truncate pr-2">{item.label}</span>
                        <span className="minute-badge shrink-0">{item.minutes}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
          <Activity size={13} className="text-emerald-400" />
          <span>
            {pathname.startsWith('/day1')
              ? 'Day 1: ~215m · Patterns'
              : pathname.startsWith('/day2')
              ? 'Day 2: ~310m · Attention & LLMs'
              : pathname.startsWith('/day3')
              ? 'Day 3: ~420m · Prompt & RAG'
              : pathname.startsWith('/day4')
              ? 'Day 4: ~390m · Architecture'
              : pathname.startsWith('/day5')
              ? 'Day 5: ~320m · Tools & Agents'
              : pathname.startsWith('/day6')
              ? 'Day 6: ~315m · Capstone'
              : 'NDDB ICT · 6-Day Program'}
          </span>
        </div>
        <Link href="/status" className="text-slate-500 hover:text-slate-300 font-mono text-[11px]">
          /status
        </Link>
      </div>
    </aside>
  );
}
