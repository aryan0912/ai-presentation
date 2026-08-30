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
    'DAY 1 · Patterns': true,
    'DAY 2 · Memory & Attention': false,
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
      defaultOpen: true,
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
      defaultOpen: true,
      items: [
        { href: '/day2/nlp-intro', label: '1. NLP & MT Intro', minutes: '10m' },
        { href: '/day2/rnn', label: '2. RNN: Model Memory', minutes: '15m' },
        { href: '/day2/lstm', label: '3. LSTM: Gated Memory', minutes: '15m' },
        { href: '/day2/transformer', label: '4. Transformers & Attention', minutes: '45m' },
        { href: '/day2/embeddings', label: '5. Embeddings & Tokens', minutes: '20m' },
        { href: '/day2/chatgpt-case-study', label: '6. Case Study: ChatGPT', minutes: '20m' },
        { href: '/day2/hands-on', label: '7. Hands-On & Synthesis', minutes: '90m' },
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
          <span>Day 1: ~305 min teaching</span>
        </div>
        <Link href="/status" className="text-slate-500 hover:text-slate-300 font-mono text-[11px]">
          /status
        </Link>
      </div>
    </aside>
  );
}

