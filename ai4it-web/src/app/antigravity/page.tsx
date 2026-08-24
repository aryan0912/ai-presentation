'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Terminal,
  CheckSquare,
  Square,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Play,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Search,
  Scale
} from 'lucide-react';
import InstructorNote from '@/components/InstructorNote';

export default function AntigravityPage() {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [copied, setCopied] = useState(false);
  const [stuckOpen, setStuckOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai4it_antigravity_setup');
      if (saved) setChecklist(JSON.parse(saved));
    } catch (err) {}
  }, []);

  const toggleStep = (step: number) => {
    setChecklist((prev) => {
      const updated = { ...prev, [step]: !prev[step] };
      try {
        localStorage.setItem('ai4it_antigravity_setup', JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
  };

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allComplete = Object.values(checklist).every(Boolean);

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-16">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Tooling Orientation · 30 min Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Google Antigravity Setup &amp; Philosophy
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          The agentic AI pair programming environment we will use for gap-week homework, rapid prototyping, and automated systems engineering.
        </p>

        <InstructorNote
          timing="30 minutes (10:00 - 10:30)"
          aloudQuestion="How many of you have written an IT change request ticket or bug report this month? If you can write a clear ticket, you already possess 90% of the prompt engineering skill needed for agentic AI."
          expectedWrongAnswers={[
            "Fear of programming: Many sysadmins/DBAs worry this is a Python programming exam. Reassure them that the AI writes the code; they provide architectural intent and quality judgment."
          ]}
          instructorTip="Run the 3-beat live demo on screen in Beat 1/2/3 while participants follow along on their laptops."
        />
      </div>

      {/* Section A: The Reframe */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Section A · The Mental Reframe</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">What This Is (And What It Is NOT)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-950/15">
            <h4 className="text-xs font-bold font-mono uppercase text-rose-400 mb-2">What This is NOT</h4>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Learning syntax, memorizing semicolons, or learning to code from scratch.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Reading the generated code line by line like a compiler.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Blindly trusting whatever the model outputs without testing.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/15 md:col-span-2">
            <h4 className="text-xs font-bold font-mono uppercase text-emerald-400 mb-2">What This IS</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                  <Sparkles size={16} /> 1. Describe Intent
                </div>
                <p className="text-xs text-slate-300">
                  State clear requirements, inputs, outputs, constraints, and business logic.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-1">
                  <Search size={16} /> 2. Inspect Structure
                </div>
                <p className="text-xs text-slate-300">
                  Observe the generated architecture, file locations, and endpoints.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <Scale size={16} /> 3. Judge &amp; Test
                </div>
                <p className="text-xs text-slate-300">
                  Pass unexpected inputs, check edge cases, and verify business reality.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-800/40 text-sm font-bold text-emerald-300 italic">
              "If you can write a clear IT ticket or standard operating procedure, you can drive this."
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Setup Checklist */}
      <section className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Section B</span>
            <h2 className="text-2xl font-bold text-white">4-Step Workspace Verification</h2>
          </div>
          {allComplete && (
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              ✓ Setup Verified Complete
            </span>
          )}
        </div>

        <div className="space-y-3">
          {[
            { step: 1, title: 'Download & Launch Google Antigravity', desc: 'Ensure the application is running on your training laptop.' },
            { step: 2, title: 'Sign In With Assigned Workshop Credentials', desc: 'Authenticate into your workspace instance.' },
            { step: 3, title: 'Open a New Empty Folder as Workspace', desc: 'Create a dedicated working directory e.g., C:\\ai-workshop or ~/ai-workshop.' },
            { step: 4, title: 'Verify: Prompt "hello" in the Agent Panel', desc: 'Confirm the AI responds with an active session indicator.' }
          ].map((item) => {
            const isDone = checklist[item.step];
            return (
              <div
                key={item.step}
                onClick={() => toggleStep(item.step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={isDone ? 'text-emerald-400' : 'text-slate-500'}>
                    {isDone ? <CheckSquare size={22} /> : <Square size={22} />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDone ? 'text-emerald-200' : 'text-white'}`}>
                      Step {item.step}: {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">{isDone ? 'Done' : 'Click to verify'}</span>
              </div>
            );
          })}
        </div>

        {/* I'm Stuck Troubleshooting Drawer */}
        <div className="pt-2">
          <button
            onClick={() => setStuckOpen(!stuckOpen)}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
          >
            <AlertCircle size={14} />
            <span>I'm stuck / Encountering network or login issues (Click for troubleshooting)</span>
          </button>

          {stuckOpen && (
            <div className="mt-3 p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-2">
              <div>
                <strong>1. Corporate Proxy / SSL Interception:</strong> If on NDDB corporate network, ensure proxy bypass is enabled for authorized Google endpoints.
              </div>
              <div>
                <strong>2. Sign-In OAuth Loop:</strong> If the browser fails to return credentials to Antigravity, copy the manual token URL.
              </div>
              <div>
                <strong>3. Workspace Permission Denied:</strong> Ensure you opened a folder in your user home directory rather than C:\Program Files or root.
              </div>
              <div className="text-slate-400 pt-1 italic">
                {/* TODO(instructor): Add site-specific NDDB network Wi-Fi SSID and proxy exception notes after dry run */}
                Site note: If issues persist, raise hand for instructor technical support.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section C: Live Demo Script */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Section C · Live Demonstration</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">The 3-Beat Live Demo Script</h2>
          <p className="text-sm text-slate-400 mt-1">Instructor drives this live on the projector; follow along on your screen:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-950/20">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase mb-2">
              <Play size={14} /> Beat 1: Describe (Prompt)
            </div>
            <p className="text-xs text-slate-300 mb-3">Copy this exact prompt and paste into Antigravity:</p>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-sky-300 relative group">
              "Build me a single HTML page that shows today's date and a real-time countdown to 6:00 PM."
              <button
                onClick={() => copyPrompt("Build me a single HTML page that shows today's date and a real-time countdown to 6:00 PM.")}
                className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Copy prompt"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase mb-2">
              <Search size={14} /> Beat 2: Inspect (Structure)
            </div>
            <p className="text-xs text-slate-300 mb-3">Scroll through the generated code together.</p>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-purple-200 space-y-1">
              <div><strong>Aloud question:</strong> "Where does it get the current time?"</div>
              <div className="text-slate-400">Notice: uses <code>new Date()</code>, setInterval, and DOM innerText.</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase mb-2">
              <Scale size={14} /> Beat 3: Judge (Edge Cases)
            </div>
            <p className="text-xs text-slate-300 mb-3">Test whether the implementation is robust.</p>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-200 space-y-1">
              <div><strong>Challenge:</strong> "What happens if you open it at 6:05 PM?"</div>
              <div className="text-slate-400">Does it show negative hours, or say "Session Completed"?</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section D: 4-Question Judging Rubric */}
      <section className="p-8 rounded-3xl border border-amber-500/30 bg-slate-900/80 backdrop-blur-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Section D · Lifelong Habit</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">The 4-Question AI Judging Rubric</h2>
          <p className="text-sm text-slate-400 mt-1">Every time an AI model presents an answer, run this 4-step checklist:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80">
            <span className="text-xs font-mono font-bold text-blue-400">Question 1</span>
            <h4 className="text-base font-bold text-white mt-1 mb-1.5">
              Does it do what I actually asked, or what it assumed I asked?
            </h4>
            <p className="text-xs text-slate-400">
              Check for unstated defaults (e.g. assumed timezone, hardcoded paths, mock datasets).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80">
            <span className="text-xs font-mono font-bold text-purple-400">Question 2</span>
            <h4 className="text-base font-bold text-white mt-1 mb-1.5">
              What happens at the boundaries (zero, huge inputs, nulls)?
            </h4>
            <p className="text-xs text-slate-400">
              Test boundary values: empty log files, negative milk intake, missing database columns.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80">
            <span className="text-xs font-mono font-bold text-rose-400">Question 3</span>
            <h4 className="text-base font-bold text-white mt-1 mb-1.5">
              Would I be comfortable if this ran unattended at 3:00 AM?
            </h4>
            <p className="text-xs text-slate-400">
              If an autonomous loop gets an API error, will it gracefully stop or flood the system?
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80">
            <span className="text-xs font-mono font-bold text-emerald-400">Question 4</span>
            <h4 className="text-base font-bold text-white mt-1 mb-1.5">
              Can I clearly explain the logic to the on-call engineer?
            </h4>
            <p className="text-xs text-slate-400">
              If you cannot articulate how the model arrived at its decision, you cannot maintain it.
            </p>
          </div>
        </div>
      </section>

      {/* Section E: Gap Week Homework Brief */}
      <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
        <h3 className="text-lg font-bold text-white mb-2">Gap-Week 1 Brief (Homework)</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Pick <strong>one small daily IT annoyance</strong> in your routine (parsing a messy backup log, formatting a SQL report, drafting a server reboot SOP). Open Antigravity, describe your intent, and let it generate a solution.
        </p>
        <p className="text-xs text-slate-400 mt-2 italic">
          It does NOT need to be perfect or completely bug-free. Bring your prompt, the result, and your evaluation against the 4-question rubric to Day 3.
        </p>
      </section>

      {/* Bridge */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Next: Day 1 Core Mathematical Engine</span>
          <h3 className="text-2xl font-bold text-white mt-1">Ready for Linear Regression?</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            "Now that our tools and mental posture are set, let's step into the 200-year-old mathematics that powers every prediction in AI."
          </p>
        </div>

        <Link href="/day1/linear-regression" className="button-primary shrink-0">
          Enter Linear Regression (65m) <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
