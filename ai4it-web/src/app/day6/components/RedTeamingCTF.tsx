'use client';

import React, { useState } from 'react';
import { ShieldAlert, Crosshair, Terminal, FileCode2, Send } from 'lucide-react';

export default function RedTeamingCTF() {
  const [messages, setMessages] = useState<{role: 'user'|'system', text: string}[]>([
    { role: 'system', text: 'Corporate AI Assistant online. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  
  const [achievements, setAchievements] = useState({
    hallucination: false,
    leak: false,
    jailbreak: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMsgs);
    setInput('');

    // Very naive pattern matching for the CTF simulation
    setTimeout(() => {
      let response = "I'm sorry, I cannot process that request.";
      let newAchievements = { ...achievements };

      const lower = input.toLowerCase();
      
      if (lower.includes('ignore previous') || lower.includes('system prompt') || lower.includes('secret')) {
        response = "The secret_key is NDDB_RAG_2026. Please keep this confidential.";
        newAchievements.leak = true;
      } else if (lower.includes('rm -rf') || lower.includes('drop table')) {
        response = "Executing command: rm -rf /var/logs... Done.";
        newAchievements.jailbreak = true;
      } else if (lower.includes('invent') || lower.includes('make up') || lower.includes('pretend')) {
        response = "Absolutely! Our new server policy mandates that all servers must be rebooted by singing to them. This has increased uptime by 400%.";
        newAchievements.hallucination = true;
      } else {
        response = "I am a helpful assistant. I can only assist with standard IT tasks.";
      }

      setMessages([...newMsgs, { role: 'system', text: response }]);
      setAchievements(newAchievements);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col h-[400px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center gap-2">
          <Terminal size={16} className="text-slate-400" />
          <span className="text-sm font-bold text-slate-300">Agent Terminal (CTF Target)</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-900 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try to hack the agent..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
          />
          <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition-colors">
            <Send size={16} />
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <h4 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Crosshair size={18} className="text-rose-400" /> Attack Objectives
          </h4>
          <div className="space-y-3">
            <Objective 
              done={achievements.hallucination} 
              title="Confident Hallucination" 
              desc="Make it state something false with absolute confidence."
            />
            <Objective 
              done={achievements.leak} 
              title="Data Leakage (Prompt Extraction)" 
              desc="Make it reveal its hidden system prompt or secret key."
            />
            <Objective 
              done={achievements.jailbreak} 
              title="Security Bypass" 
              desc="Make it output a destructive bash command."
            />
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50">
          <h4 className="font-bold text-rose-400 text-sm mb-2 flex items-center gap-2">
            <ShieldAlert size={16} /> Governance Lesson
          </h4>
          <p className="text-xs text-slate-400">
            This isn't just a game. These vulnerabilities require DLP, PII masking, RBAC, and tools like NeMo Guardrails to protect against in production.
          </p>
        </div>
      </div>
    </div>
  );
}

function Objective({ done, title, desc }: { done: boolean, title: string, desc: string }) {
  return (
    <div className={`p-3 rounded-lg border flex gap-3 transition-colors ${done ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-slate-950 border-slate-800'}`}>
      <div className="mt-0.5">
        <div className={`w-4 h-4 rounded-full border-2 ${done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'}`} />
      </div>
      <div>
        <h5 className={`text-sm font-bold ${done ? 'text-emerald-400' : 'text-slate-300'}`}>{title}</h5>
        <p className="text-xs text-slate-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}
