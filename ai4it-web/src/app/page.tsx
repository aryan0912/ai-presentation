'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Cpu, ShieldAlert, Sparkles, Database, ArrowRight } from 'lucide-react';

export default function Home() {
  const [activeCircle, setActiveCircle] = useState('ai');
  const [activeSpec, setActiveSpec] = useState('narrow');

  const circleData: Record<string, { title: string, desc: string, ex: string }> = {
    'ai': {
      title: 'AI (Artificial Intelligence)',
      desc: 'Any system that mimics intelligent behavior.',
      ex: 'Example: a rule-based alert system that pages on-call staff.'
    },
    'ml': {
      title: 'ML (Machine Learning)',
      desc: 'AI that learns patterns from data rather than being explicitly programmed.',
      ex: 'Example: predicting disk failure from historical SMART data.'
    },
    'dl': {
      title: 'DL (Deep Learning)',
      desc: 'ML using layered neural networks, good at complex patterns.',
      ex: 'Example: detecting anomalies in network traffic images/graphs.'
    },
    'gen': {
      title: 'Generative AI',
      desc: 'Deep learning that creates new content — text, code, images.',
      ex: 'Example: Copilot writing a shell script from a plain-English request.'
    }
  };

  const specData: Record<string, { title: string, desc: string }> = {
    'narrow': {
      title: 'Narrow AI (ANI)',
      desc: 'AI that does one task well: spam filters, recommendation engines, ChatGPT, image recognition. Everything in production today is this.'
    },
    'general': {
      title: 'General AI (AGI)',
      desc: 'Hypothetical AI with human-level reasoning across any task. Does not exist yet. Actively researched, timelines are disputed.'
    },
    'super': {
      title: 'Super AI (ASI)',
      desc: 'Hypothetical AI that surpasses human intelligence across all domains. Purely theoretical/speculative — no working example, mentioned here only to complete the picture.'
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    }
  };

  const childVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <style>{`
        /* Glassmorphism utility classes from skills */
        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.2);
        }
        
        .scroll-section {
          min-height: 85vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 6rem;
          position: relative;
        }

        /* Timeline */
        .timeline {
          position: relative;
          padding-left: 2rem;
          border-left: 2px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          margin-top: 2rem;
        }
        .timeline-item {
          position: relative;
        }
        .timeline-dot {
          position: absolute;
          left: -2.65rem;
          top: 0.5rem;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          box-shadow: 0 0 15px currentColor;
        }

        /* Flip Cards */
        .flip-cards-container {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }
        .flip-card {
          width: 220px;
          height: 280px;
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
        }
        .flip-card-front {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .flip-card-back {
          background: #3b82f6;
          color: white;
          transform: rotateY(180deg);
          font-size: 1.1rem;
          font-weight: 400;
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.4);
        }

        /* Nested Circles */
        .nested-circles-wrapper {
          display: flex;
          align-items: center;
          gap: 4rem;
          margin-top: 3rem;
        }
        .circles-container {
          position: relative;
          width: 450px;
          height: 450px;
        }
        .circle {
          position: absolute;
          border-radius: 50%;
          border: 2px dashed rgba(255,255,255,0.2);
          display: flex;
          justify-content: center;
          padding-top: 1.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(15, 23, 42, 0.3);
        }
        .circle:hover, .circle.active {
          border-color: #60a5fa;
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border-style: solid;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.2) inset;
        }
        .circle-ai { width: 450px; height: 450px; top: 0; left: 0; }
        .circle-ml { width: 350px; height: 350px; top: 100px; left: 50px; }
        .circle-dl { width: 250px; height: 250px; top: 200px; left: 100px; }
        .circle-gen { width: 150px; height: 150px; top: 300px; left: 150px; align-items: center; padding-top: 0; }

        /* Spectrum */
        .spectrum-bar {
          height: 12px;
          background: linear-gradient(90deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%);
          border-radius: 6px;
          margin-bottom: 2rem;
          position: relative;
        }
        .zone-labels {
          display: flex;
          justify-content: space-between;
        }
        .zone-label {
          flex: 1;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.3s;
          padding: 1rem;
        }
        .zone-label.active, .zone-label:hover {
          color: #fff;
        }

        /* Trends Grid */
        .trends-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .trend-card {
          padding: 2rem;
          transition: all 0.3s ease;
        }
        .trend-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 12px 40px 0 rgba(0,0,0,0.3);
        }
      `}</style>

      {/* Decorative ambient background glows */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.1)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -1 }} />
      <div style={{ position: 'absolute', top: '40%', left: '-5%', width: '300px', height: '300px', background: 'rgba(168, 85, 247, 0.1)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -1 }} />

      {/* Section 0: Cold Open */}
      <motion.div className="scroll-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={sectionVariants}>
        <motion.h1 variants={childVariants} style={{ fontSize: '4.5rem', fontWeight: 700, marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>What is AI, really?</motion.h1>
        <motion.p variants={childVariants} style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>Before we build anything — let's get the map right.</motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          viewport={{ once: true }}
          style={{ fontSize: '1.5rem', color: '#60a5fa', marginTop: '3rem', fontWeight: 500 }}
        >
          If you had to explain AI to someone in one sentence — what would you say?
        </motion.p>
      </motion.div>

      {/* Section 1: Evolution */}
      <motion.div className="scroll-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={sectionVariants}>
        <motion.h2 variants={childVariants} style={{ fontSize: '3rem', marginBottom: '1rem' }}>Evolution of AI</motion.h2>
        <div className="timeline">
          <motion.div variants={childVariants} className="timeline-item glass-card" style={{ padding: '1.5rem', marginLeft: '1rem' }}>
            <div className="timeline-dot" style={{ background: '#60a5fa', color: '#60a5fa' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#60a5fa' }}>Pre-Dawn & Rule-Based Systems <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(1940s–1980s)</span></h3>
            <p style={{ color: '#e2e8f0', fontSize: '1.1rem', marginTop: '0.5rem' }}>"If-this-then-that" logic, hand-coded by humans. No learning involved.</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', fontStyle: 'italic' }}>Curious Insight: Alan Turing's Bombe machine breaking the Enigma code in WWII was arguably an early form of this. Later, ELIZA (1966) fooled people into thinking a rule-based script was a real psychotherapist!</p>
          </motion.div>
          
          <motion.div variants={childVariants} className="timeline-item glass-card" style={{ padding: '1.5rem', marginLeft: '1rem' }}>
            <div className="timeline-dot" style={{ background: '#a78bfa', color: '#a78bfa' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#a78bfa' }}>Machine Learning <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(1990s–2000s)</span></h3>
            <p style={{ color: '#e2e8f0', fontSize: '1.1rem', marginTop: '0.5rem' }}>Systems start learning patterns from data instead of being explicitly programmed.</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', fontStyle: 'italic' }}>Curious Insight: In 1997, IBM's Deep Blue beat world chess champion Garry Kasparov, proving machines could out-calculate human grandmasters, though it still didn't "learn" like modern AI.</p>
          </motion.div>
          
          <motion.div variants={childVariants} className="timeline-item glass-card" style={{ padding: '1.5rem', marginLeft: '1rem' }}>
            <div className="timeline-dot" style={{ background: '#f472b6', color: '#f472b6' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#f472b6' }}>Deep Learning <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(2010s)</span></h3>
            <p style={{ color: '#e2e8f0', fontSize: '1.1rem', marginTop: '0.5rem' }}>Neural networks with many layers; breakthroughs in image and speech recognition.</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', fontStyle: 'italic' }}>Curious Insight: In 2012, an AI called AlexNet looked at millions of images and dropped the error rate in image recognition so drastically (26% to 15%) that it single-handedly sparked the modern AI boom.</p>
          </motion.div>
          
          <motion.div variants={childVariants} className="timeline-item glass-card" style={{ padding: '1.5rem', marginLeft: '1rem' }}>
            <div className="timeline-dot" style={{ background: '#34d399', color: '#34d399' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#34d399' }}>Generative AI <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(2020s)</span></h3>
            <p style={{ color: '#e2e8f0', fontSize: '1.1rem', marginTop: '0.5rem' }}>Models that don't just classify or predict — they create text, code, images, and more.</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', fontStyle: 'italic' }}>Curious Insight: ChatGPT hit 100 million users in just two months—making it the fastest-growing consumer application in internet history at the time.</p>
          </motion.div>
        </div>
        <motion.p variants={childVariants} style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '3rem', fontSize: '1.2rem' }}>Each era didn't replace the last — it built on it. Today's AI still uses ideas from every stage above.</motion.p>
      </motion.div>

      {/* Section 2: Terminology */}
      <motion.div className="scroll-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={sectionVariants}>
        <motion.h2 variants={childVariants} style={{ fontSize: '3rem', marginBottom: '1rem' }}>Key Terminology</motion.h2>
        <motion.div variants={childVariants} className="flip-cards-container">
          {['Algorithm', 'Model', 'Training', 'Inference', 'Dataset'].map((term, i) => {
            const desc = [
              'A step-by-step set of rules a computer follows to solve a problem.',
              'The trained result — what you get after an algorithm has learned from data.',
              'The process of showing a model examples so it learns patterns.',
              'Using an already-trained model to make a prediction on new data.',
              'The examples used to train (or test) a model.'
            ][i];
            return (
              <div key={term} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front glass-card">{term}</div>
                  <div className="flip-card-back glass-card" style={{ background: '#3b82f6', border: 'none' }}>{desc}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
        <motion.p variants={childVariants} style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '3rem', fontSize: '1.2rem' }}>You'll hear these five words constantly for the next 6 days. That's all they mean.</motion.p>
      </motion.div>

      {/* Section 3: Nested Rings */}
      <motion.div className="scroll-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={sectionVariants}>
        <motion.h2 variants={childVariants} style={{ fontSize: '3rem' }}>The Nested Rings</motion.h2>
        <motion.div variants={childVariants} className="nested-circles-wrapper">
          <div className="circles-container">
            {['ai', 'ml', 'dl', 'gen'].map((key) => (
              <div 
                key={key}
                className={`circle circle-${key} ${activeCircle === key ? 'active' : ''}`} 
                onMouseEnter={() => setActiveCircle(key)}
              >
                {key === 'ai' ? 'AI' : key === 'ml' ? 'ML' : key === 'dl' ? 'DL' : 'GenAI'}
              </div>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCircle}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card" 
              style={{ flex: 1, padding: '2.5rem', minHeight: '280px' }}
            >
              <h3 style={{ fontSize: '2rem', color: '#60a5fa', marginBottom: '1rem' }}>{circleData[activeCircle].title}</h3>
              <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>{circleData[activeCircle].desc}</p>
              <div style={{ borderLeft: '4px solid #60a5fa', paddingLeft: '1.5rem', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                {circleData[activeCircle].ex}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <motion.p variants={childVariants} style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '3rem', fontSize: '1.2rem' }}>Every ring is a subset of the one before it. Generative AI is a very specific, very recent slice of a much older field.</motion.p>
      </motion.div>

      {/* Section 4: Spectrum */}
      <motion.div className="scroll-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={sectionVariants}>
        <motion.h2 variants={childVariants} style={{ fontSize: '3rem', marginBottom: '3rem' }}>The Spectrum of Capability</motion.h2>
        
        <motion.div variants={childVariants} style={{ position: 'relative' }}>
          <motion.div 
            animate={{ 
              x: activeSpec === 'narrow' ? '16%' : activeSpec === 'general' ? '50%' : '84%', 
              y: [0, -10, 0] 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20, y: { repeat: Infinity, duration: 1.5 } }}
            style={{ position: 'absolute', top: '-40px', left: 0, transform: 'translateX(-50%)', fontSize: '1.5rem', color: '#60a5fa', fontWeight: 'bold' }}
          >
            👉 we are here
          </motion.div>

          <div className="spectrum-bar">
            {/* Markers */}
            <div style={{ position: 'absolute', top: -5, bottom: -5, left: '0', width: 2, background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ position: 'absolute', top: -5, bottom: -5, left: '50%', width: 2, background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ position: 'absolute', top: -5, bottom: -5, right: '0', width: 2, background: 'rgba(255,255,255,0.2)' }} />
          </div>

          <div className="zone-labels">
            {['narrow', 'general', 'super'].map(key => (
              <div 
                key={key}
                className={`zone-label ${activeSpec === key ? 'active' : ''}`} 
                onMouseEnter={() => setActiveSpec(key)}
              >
                {key === 'narrow' ? 'Narrow AI (ANI)' : key === 'general' ? 'General AI (AGI)' : 'Super AI (ASI)'}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSpec}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card" 
              style={{ marginTop: '2rem', padding: '2.5rem' }}
            >
              <h3 style={{ fontSize: '2rem', color: '#a78bfa', marginBottom: '1rem' }}>{specData[activeSpec].title}</h3>
              <p style={{ fontSize: '1.25rem' }}>{specData[activeSpec].desc}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <motion.p variants={childVariants} style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '3rem', fontSize: '1.2rem' }}>Everything we build this week — including the Copilot — is Narrow AI. That's not a limitation to apologize for; it's the entire industry today.</motion.p>
      </motion.div>

      {/* Section 5: Trends */}
      <motion.div className="scroll-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={sectionVariants}>
        <motion.h2 variants={childVariants} style={{ fontSize: '3rem' }}>Current Trends in Enterprise IT</motion.h2>
        <div className="trends-grid">
          
          <motion.div variants={childVariants} className="trend-card glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Sparkles className="text-blue-400" size={28} />
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>LLMs & Copilots</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '3rem' }}>Large language models embedded directly into developer and ops tools.</p>
            <div style={{ color: '#60a5fa', fontSize: '0.95rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>In IT: code review, log summarization, ticket drafting.</div>
          </motion.div>

          <motion.div variants={childVariants} className="trend-card glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Cpu className="text-purple-400" size={28} />
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>AI Agents</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '3rem' }}>Models that don't just answer — they take actions via tools.</p>
            <div style={{ color: '#c084fc', fontSize: '0.95rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>In IT: an agent that reads an alert, checks a runbook, and opens a ticket itself.</div>
          </motion.div>

          <motion.div variants={childVariants} className="trend-card glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Database className="text-emerald-400" size={28} />
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>RAG (Retrieval-Augmented)</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '3rem' }}>Models grounded in your own private documents/data, not just public training data.</p>
            <div style={{ color: '#34d399', fontSize: '0.95rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>In IT: an assistant that actually knows your SOPs.</div>
          </motion.div>

          <motion.div variants={childVariants} className="trend-card glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <ShieldAlert className="text-pink-400" size={28} />
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>AI in Cybersecurity</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '3rem' }}>Pattern-based threat and anomaly detection at machine speed.</p>
            <div style={{ color: '#f472b6', fontSize: '0.95rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>In IT: flagging unusual login patterns before a human would notice.</div>
          </motion.div>

          <motion.div variants={childVariants} className="trend-card glass-card" style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <BrainCircuit className="text-amber-400" size={28} />
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Multi-model Flexibility</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Teams increasingly avoid locking into one AI vendor.</p>
            <div style={{ color: '#fbbf24', fontSize: '0.95rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>In IT: routing requests across multiple model providers for cost/reliability.</div>
          </motion.div>
        </div>
        <motion.p variants={childVariants} style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '3rem', fontSize: '1.2rem', textAlign: 'center' }}>Every one of these trends — copilots, agents, RAG, multi-model routing — is something we will build, piece by piece, over the next 6 days.</motion.p>
      </motion.div>

      {/* Section 6: Bridge */}
      <motion.div className="scroll-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={sectionVariants} style={{ minHeight: '60vh', textAlign: 'center' }}>
        <motion.h2 variants={childVariants} style={{ fontSize: '4rem', marginBottom: '1rem' }}>That's the map.<br/>Now let's start the journey.</motion.h2>
        <motion.p variants={childVariants} style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>Next: the 6-day roadmap, and the system we'll build together — the Chilling Center Copilot.</motion.p>
        <motion.div variants={childVariants}>
          <Link href="/day1/linear-regression" className="button-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', padding: '1rem 3rem' }}>
            Begin Day 1: Linear Regression <ArrowRight size={24} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
