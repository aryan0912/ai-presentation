'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, ArrowRight, Database, Users, Network } from 'lucide-react';

export default function CocktailPartyViz() {
  const [activeTab, setActiveTab] = useState<'intro' | 'match' | 'blend'>('intro');
  const [selectedWord, setSelectedWord] = useState<string>('bank');

  const words = [
    { text: "The", role: "determiner", query: "Who am I modifying?", key: "I define specificity", value: "[Syntax Vector]" },
    { text: "river", role: "noun (water context)", query: "What flows or borders me?", key: "I am flowing water & nature", value: "[Water / Nature Semantics]" },
    { text: "bank", role: "ambiguous noun", query: "Am I money or a river border?", key: "I am a physical or financial edge", value: "[Ambiguous Vector]" },
    { text: "was", role: "verb", query: "What tense and subject?", key: "Past state of being", value: "[Tense Vector]" },
    { text: "muddy", role: "adjective", query: "What is wet/dirty?", key: "I describe wet soil", value: "[Mud / Earth Semantics]" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <Users size={12} />
            <span>The Human Metaphor · Self-Attention Unpacked</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">The Cocktail Party Matchmaking</h3>
          <p className="text-slate-400 text-sm mt-1">
            Words in a sentence are like guests at a party. They shout what they need, listen to what others offer, and update their meaning.
          </p>
        </div>

        {/* Mode switcher */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('intro')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'intro' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. The Ambiguity
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'match' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Q &amp; K Handshake
          </button>
          <button
            onClick={() => setActiveTab('blend')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'blend' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Value Update
          </button>
        </div>
      </div>

      {/* Interactive Sentence Strip */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Target Sentence (Click a guest):</span>
        <div className="flex flex-wrap gap-2.5">
          {words.map((w) => (
            <button
              key={w.text}
              onClick={() => setSelectedWord(w.text)}
              className={`px-4 py-3 rounded-xl font-mono text-base font-bold transition-all border ${
                selectedWord === w.text
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {w.text}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Visualizer */}
      <div className="relative min-h-[300px] bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {activeTab === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 text-center max-w-xl mx-auto"
            >
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-1">
                <MessageSquare size={28} />
              </div>
              <h4 className="text-xl font-bold text-white">Why does "bank" need attention?</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                In isolation, the dictionary entry for <span className="text-amber-400 font-mono font-bold">"bank"</span> could mean a financial institution (vault, cash, loan) OR the muddy edge of water.
              </p>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs font-mono text-rose-400 font-bold mb-1">Without Attention (Bag of Words)</div>
                  <div className="text-xs text-slate-400">Every word stands alone. Meaning is frozen and generic.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-800/40 bg-emerald-950/20">
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-1">With Attention (The Party)</div>
                  <div className="text-xs text-slate-300">Words mingle. "bank" hears "river" and "muddy" and shifts its meaning to water-edge.</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Click <strong>"2. Q &amp; K Handshake"</strong> above to see how they find each other.
              </p>
            </motion.div>
          )}

          {activeTab === 'match' && (
            <motion.div
              key="match"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Query Speaker */}
                <div className="w-full md:w-1/2 p-5 rounded-xl bg-rose-950/20 border border-rose-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wide">Query (Q)</span>
                    <span className="text-xs font-mono text-slate-400">"What I am looking for"</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    "{selectedWord}" asks:
                  </div>
                  <div className="text-sm text-rose-200 bg-rose-950/50 p-2.5 rounded-lg border border-rose-800/40">
                    "{words.find(w => w.text === selectedWord)?.query}"
                  </div>
                </div>

                <div className="text-slate-600 font-mono text-xl">🤝</div>

                {/* Key Listener */}
                <div className="w-full md:w-1/2 p-5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">Key (K)</span>
                    <span className="text-xs font-mono text-slate-400">"What I offer"</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    "river" announces:
                  </div>
                  <div className="text-sm text-amber-200 bg-amber-950/50 p-2.5 rounded-lg border border-amber-800/40">
                    "{words.find(w => w.text === 'river')?.key}"
                  </div>
                </div>
              </div>

              {/* Match score callout */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="text-sm text-slate-300">
                  <strong className="text-white">Compatibility Score ($Q \cdot K$): </strong>
                  Because "bank" needed water/finance clarity and "river" offered water nature, their dot-product spikes to <span className="text-emerald-400 font-mono font-bold">92%</span>!
                </div>
                <button
                  onClick={() => setActiveTab('blend')}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 flex items-center gap-1 shrink-0"
                >
                  See Update &rarr;
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'blend' && (
            <motion.div
              key="blend"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="p-5 rounded-xl bg-sky-950/20 border border-sky-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide">Value (V) Transmission</span>
                  <span className="text-xs font-mono text-slate-400">"My actual content payload"</span>
                </div>
                <p className="text-sm text-slate-300">
                  Since the attention score between <strong className="text-white font-mono">"bank"</strong> and <strong className="text-white font-mono">"river"</strong> was high, <strong className="text-sky-300">"river" passes its Value vector</strong> into "bank".
                </p>
                
                {/* Visual Math equation */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs md:text-sm space-y-2">
                  <div className="text-slate-400">New Contextualized Vector for "bank" =</div>
                  <div className="text-amber-400 font-bold pl-4">
                    (0.72 × [River Value]) + (0.21 × [Muddy Value]) + (0.05 × [The Value]) + (0.02 × [Self])
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center gap-3">
                <Sparkles className="text-emerald-400 shrink-0" size={20} />
                <div className="text-xs md:text-sm text-emerald-200">
                  <strong>The Miracle:</strong> The output representation for "bank" is now 100% disambiguated. It no longer means money. It means the edge of a water body!
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">
          <span className="text-rose-400 font-bold">Query (Q):</span> What each word searches for in the sentence.
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">
          <span className="text-amber-400 font-bold">Key (K):</span> What each word offers as a hook or label.
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">
          <span className="text-sky-400 font-bold">Value (V):</span> The semantic information handed over when Q &amp; K match.
        </div>
      </div>
    </div>
  );
}
