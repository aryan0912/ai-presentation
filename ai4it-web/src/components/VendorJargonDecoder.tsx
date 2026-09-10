'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sliders, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  BookOpen, 
  Activity, 
  FileText, 
  Scale,
  Flame,
  Binary,
  RotateCcw
} from 'lucide-react';

export default function VendorJargonDecoder() {
  const [activeTab, setActiveTab] = useState<'task' | 'metrics' | 'training'>('task');

  // Tab 1: Task toggle
  const [taskMode, setTaskMode] = useState<'regression' | 'classification'>('regression');

  // Tab 2: Metrics interactive simulator
  // 100 milk tankers: 95 Pure, 5 Adulterated
  // User sets how conservative/aggressive model threshold is
  const [modelBehavior, setModelBehavior] = useState<'lazy' | 'balanced' | 'hyperactive'>('lazy');

  // Tab 3: Batches & Epochs calculator
  const [datasetSize, setDatasetSize] = useState<number>(10000);
  const [batchSize, setBatchSize] = useState<number>(32);
  const [epochs, setEpochs] = useState<number>(50);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const stepsPerEpoch = Math.ceil(datasetSize / batchSize);
  const totalGradientSteps = stepsPerEpoch * epochs;

  // Compute metrics for Tab 2
  const metricsData = useMemo(() => {
    // Total 100 tankers: 95 Actual Pure (Negative), 5 Actual Adulterated (Positive)
    if (modelBehavior === 'lazy') {
      // Lazy vendor model: Predicts Pure for all 100!
      // True Negatives = 95, False Negatives = 5, True Positives = 0, False Positives = 0
      const tp = 0;
      const fp = 0;
      const fn = 5;
      const tn = 95;
      const acc = (tp + tn) / 100; // 95%
      const prec = tp + fp > 0 ? tp / (tp + fp) : 0; // 0%
      const rec = tp + fn > 0 ? tp / (tp + fn) : 0; // 0%
      const f1 = prec + rec > 0 ? (2 * prec * rec) / (prec + rec) : 0;
      return { tp, fp, fn, tn, acc, prec, rec, f1 };
    } else if (modelBehavior === 'balanced') {
      // Balanced model: Catches 4 out of 5 adulterations, flags 2 false alarms
      const tp = 4;
      const fp = 2;
      const fn = 1;
      const tn = 93;
      const acc = (tp + tn) / 100; // 97%
      const prec = tp / (tp + fp); // 4/6 = 66.7%
      const rec = tp / (tp + fn); // 4/5 = 80.0%
      const f1 = (2 * prec * rec) / (prec + rec);
      return { tp, fp, fn, tn, acc, prec, rec, f1 };
    } else {
      // Hyperactive model: Flags everything suspicious!
      // Catches all 5, but flags 20 false alarms
      const tp = 5;
      const fp = 20;
      const fn = 0;
      const tn = 75;
      const acc = (tp + tn) / 100; // 80%
      const prec = tp / (tp + fp); // 5/25 = 20%
      const rec = tp / (tp + fn); // 5/5 = 100%
      const f1 = (2 * prec * rec) / (prec + rec);
      return { tp, fp, fn, tn, acc, prec, rec, f1 };
    }
  }, [modelBehavior]);

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
            <Zap size={14} className="text-amber-400" />
            <span>Sysadmin &amp; RFP Survival Kit</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            The Vendor Pitch Decoder
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            When external vendors pitch AI to NDDB, they use these exact jargons. Here is what they actually mean, how to test them, and what to demand in your technical RFPs.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('task')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'task'
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-900/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Binary size={14} />
            <span>1. Task: Regr vs Class</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'metrics'
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-900/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale size={14} />
            <span>2. The 99% Accuracy Trap</span>
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'training'
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-900/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen size={14} />
            <span>3. Batches &amp; Epochs</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {/* ==================== TAB 1: REGRESSION VS CLASSIFICATION ==================== */}
        {activeTab === 'task' && (
          <motion.div
            key="task"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="text-base font-bold text-white">
                  What is the model outputting: A Number or a Category?
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  A Neural Network's internal math is identical; only the final output node changes.
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setTaskMode('regression')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    taskMode === 'regression' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Regression (Quantity)
                </button>
                <button
                  onClick={() => setTaskMode('classification')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    taskMode === 'classification' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Classification (Label)
                </button>
              </div>
            </div>

            {/* Visual Comparison Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left: Explanatory Card */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${taskMode === 'regression' ? 'bg-sky-500/20 text-sky-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {taskMode === 'regression' ? <TrendingUp size={20} /> : <Binary size={20} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Core Definition</span>
                    <h5 className="text-lg font-bold text-white">
                      {taskMode === 'regression' ? 'Regression: Predicting How Much' : 'Classification: Predicting Which Class'}
                    </h5>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {taskMode === 'regression' ? (
                    <>
                      The target is a <strong>continuous numerical value</strong> on a scale. There is no ceiling or floor. The loss measures how far off the prediction was via <strong>Mean Squared Error (MSE)</strong>.
                    </>
                  ) : (
                    <>
                      The target is a <strong>discrete category or decision boundary</strong>. The model outputs a probability between 0% and 100%. The loss measures classification confidence via <strong>Cross-Entropy Loss</strong>.
                    </>
                  )}
                </p>

                {/* Practical Examples */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">NDDB &amp; IT Ops Examples:</span>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {taskMode === 'regression' ? (
                      <>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2">
                          <span className="text-sky-400 font-bold font-mono">🥛 Dairy:</span>
                          <span>&ldquo;How many litres of milk will the Anand chilling center receive tomorrow?&rdquo; (e.g. 2,850 L)</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2">
                          <span className="text-sky-400 font-bold font-mono">💻 IT Ops:</span>
                          <span>&ldquo;What will the average CPU utilization % be on the ERP database server at 2:00 PM?&rdquo; (e.g. 78.4%)</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2">
                          <span className="text-purple-400 font-bold font-mono">🥛 Dairy:</span>
                          <span>&ldquo;Is this milk tanker Pure or Adulterated with starch/detergent?&rdquo; (Binary: 0 or 1)</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2">
                          <span className="text-purple-400 font-bold font-mono">💻 IT Ops:</span>
                          <span>&ldquo;Is this firewall traffic packet Benign or a DDoS Attack?&rdquo; (Categorical / Anomaly)</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Neural Output Layer Transformation */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase block mb-1">Under The Hood</span>
                  <h5 className="text-sm font-bold text-white">How the Network Output Node Changes</h5>
                  <p className="text-xs text-slate-400 mt-1">
                    All hidden layers extract the same features. Only the final mathematical activation function flips:
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Final Layer Formula:</span>
                    <span className="text-amber-300 font-bold">
                      {taskMode === 'regression' ? 'y_pred = W · h + b' : 'p = Sigmoid(W · h + b)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Output Range:</span>
                    <span className="text-slate-200">
                      {taskMode === 'regression' ? '(-∞ to +∞) e.g. 2,848 Litres' : '[0.0 to 1.0] e.g. 0.94 (94% Adulterated)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Primary Evaluation Metric:</span>
                    <span className="text-emerald-400 font-bold">
                      {taskMode === 'regression' ? 'RMSE / MAE (Litres error)' : 'Precision, Recall, F1-Score (Next Tab)'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200">
                  <strong>💡 The Bridge to Section C:</strong> In the Decision Boundary Playground below, you are running a <strong>Classification</strong> model—learning to draw non-linear borders separating Class 0 (Blue dots) from Class 1 (Purple dots)!
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ==================== TAB 2: THE 99% ACCURACY TRAP ==================== */}
        {activeTab === 'metrics' && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="text-rose-400" size={18} />
                The Milk Adulteration Paradox: Why &ldquo;99% Accuracy&rdquo; Is Often a Scam
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Scenario: 100 milk tankers arrive at an NDDB chilling center. <strong>95 are Pure, 5 are Adulterated with urea/detergent</strong>. Watch what happens when a vendor pitches different models:
              </p>
            </div>

            {/* Model Behavior Selector */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 pl-2">Select Vendor Pitch:</span>
              <button
                onClick={() => setModelBehavior('lazy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  modelBehavior === 'lazy'
                    ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. &ldquo;Lazy&rdquo; Model (Predicts 100% Pure)
              </button>
              <button
                onClick={() => setModelBehavior('balanced')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  modelBehavior === 'balanced'
                    ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Realistic Balanced Model
              </button>
              <button
                onClick={() => setModelBehavior('hyperactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  modelBehavior === 'hyperactive'
                    ? 'bg-amber-600 text-white font-bold shadow-lg shadow-amber-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Hyperactive Alarm (Over-reports)
              </button>
            </div>

            {/* Metrics Dashboard Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Accuracy */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 relative overflow-hidden">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Overall Accuracy</span>
                <span className={`text-2xl font-black font-mono ${
                  metricsData.acc >= 0.95 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {(metricsData.acc * 100).toFixed(0)}%
                </span>
                <p className="text-[11px] text-slate-400 leading-tight pt-1">
                  % of total predictions that were correct.
                </p>
                {modelBehavior === 'lazy' && (
                  <span className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                    THE TRAP!
                  </span>
                )}
              </div>

              {/* Precision */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Precision (Quality)</span>
                <span className={`text-2xl font-black font-mono ${
                  metricsData.prec >= 0.6 ? 'text-sky-400' : 'text-rose-400'
                }`}>
                  {(metricsData.prec * 100).toFixed(0)}%
                </span>
                <p className="text-[11px] text-slate-400 leading-tight pt-1">
                  When it yelled &ldquo;Adulterated&rdquo;, how often was it true?
                </p>
              </div>

              {/* Recall */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Recall (Sensitivity)</span>
                <span className={`text-2xl font-black font-mono ${
                  metricsData.rec >= 0.7 ? 'text-purple-400' : 'text-rose-400'
                }`}>
                  {(metricsData.rec * 100).toFixed(0)}%
                </span>
                <p className="text-[11px] text-slate-400 leading-tight pt-1">
                  Out of all 5 bad tankers, how many did it catch?
                </p>
              </div>

              {/* F1 Score */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">F1-Score (The Truth)</span>
                <span className={`text-2xl font-black font-mono ${
                  metricsData.f1 >= 0.7 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {(metricsData.f1 * 100).toFixed(0)}%
                </span>
                <p className="text-[11px] text-slate-400 leading-tight pt-1">
                  Harmonic mean of Precision and Recall.
                </p>
              </div>

            </div>

            {/* Intuitive Flow Visualizer */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <ShieldAlert size={120} />
              </div>
              
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="font-bold text-white text-sm">The Reality Flow (100 Tankers Arrive)</span>
                <span>Actual Reality: <span className="text-emerald-400 font-bold">95 Pure</span> · <span className="text-rose-400 font-bold">5 Adulterated</span></span>
              </div>

              {/* Graphical Funnel */}
              <div className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4">
                
                {/* AI Decisions */}
                <div className="flex flex-col justify-center space-y-12 border-r border-slate-800 pr-4">
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">AI Decision:</span>
                    <span className="bg-slate-900 px-3 py-2 rounded-lg text-slate-300 font-mono text-xs border border-slate-700 block">
                      "Looks Pure"
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">AI Decision:</span>
                    <span className="bg-rose-950/30 px-3 py-2 rounded-lg text-rose-300 font-mono text-xs border border-rose-900/50 block font-bold">
                      "Adulterated!"
                    </span>
                  </div>
                </div>

                {/* Reality Split */}
                <div className="flex flex-col justify-center space-y-4">
                  
                  {/* Top Branch (Model said Pure) */}
                  <div className="grid grid-cols-2 gap-3 relative">
                    <div className="absolute -left-6 top-1/2 w-6 h-[2px] bg-slate-800 -translate-y-1/2"></div>
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/50">
                      <div className="flex items-center gap-2 mb-1 text-emerald-400">
                        <CheckCircle2 size={16} />
                        <span className="text-xs font-bold uppercase">True Negative</span>
                      </div>
                      <span className="text-lg font-black text-white font-mono">{metricsData.tn}</span>
                      <p className="text-[10px] text-slate-400 leading-tight mt-1">Actually pure. Safely passed into chilling center.</p>
                    </div>
                    
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 border-dashed relative">
                      <div className="absolute -left-3 top-1/2 text-rose-500 -translate-y-1/2 bg-slate-950 rounded-full">
                        <AlertTriangle size={16} />
                      </div>
                      <div className="flex items-center gap-2 mb-1 text-rose-400">
                        <span className="text-xs font-bold uppercase">False Negative</span>
                      </div>
                      <span className="text-lg font-black text-rose-400 font-mono">{metricsData.fn}</span>
                      <p className="text-[10px] text-rose-200/70 leading-tight mt-1 font-bold">THE DANGER: Actually adulterated, but model missed it! Poison enters supply.</p>
                    </div>
                  </div>

                  {/* Bottom Branch (Model said Adulterated) */}
                  <div className="grid grid-cols-2 gap-3 relative">
                    <div className="absolute -left-6 top-1/2 w-6 h-[2px] bg-slate-800 -translate-y-1/2"></div>
                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50">
                      <div className="flex items-center gap-2 mb-1 text-amber-400">
                        <span className="text-xs font-bold uppercase">False Positive</span>
                      </div>
                      <span className="text-lg font-black text-amber-400 font-mono">{metricsData.fp}</span>
                      <p className="text-[10px] text-slate-400 leading-tight mt-1">Actually pure. Model panicked and dumped good milk (Waste of money).</p>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/50">
                      <div className="flex items-center gap-2 mb-1 text-purple-400">
                        <ShieldAlert size={16} />
                        <span className="text-xs font-bold uppercase">True Positive</span>
                      </div>
                      <span className="text-lg font-black text-white font-mono">{metricsData.tp}</span>
                      <p className="text-[10px] text-slate-400 leading-tight mt-1">Actually adulterated. Model correctly blocked it! (The goal).</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Vendor Defense Note */}
              <div className="mt-4 p-4 rounded-lg bg-sky-950/20 border border-sky-800/40 text-xs text-sky-200 leading-relaxed font-sans">
                <strong>🛡️ What to put in your NDDB AI RFP:</strong> Never accept a vendor bid stating only <em>"Model achieves 95%+ Accuracy"</em>. (The Lazy model gets 95% just by passing everything!). 
                Demand: <strong>"Minimum 80% Recall on rare defects, with F1-Score &gt; 0.75."</strong> This guarantees the model is actually looking for the rare 5 adulterated tankers, not just rubber-stamping the 95 pure ones.
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== TAB 3: BATCHES & EPOCHS ==================== */}
        {activeTab === 'training' && (
          <motion.div
            key="training"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="text-sky-400" size={18} />
                Training Mechanics: The Textbook Analogy
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Vendors say: <em>&ldquo;We trained on 10,000 samples with Batch Size 32 for 50 Epochs.&rdquo;</em> Here is how the computer actually digests data:
              </p>
            </div>

            {/* 4 Terminology Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">1. The Dataset (N)</span>
                <h6 className="font-bold text-white text-sm">The Entire Textbook</h6>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  All 10,000 historical chilling center logs collected over 3 years.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">2. Batch Size (B)</span>
                <h6 className="font-bold text-white text-sm">One Bite at a Time</h6>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  You can&apos;t swallow 10,000 logs at once (GPU VRAM blow-up). You feed <strong>32 logs</strong> per step.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">3. Step / Iteration</span>
                <h6 className="font-bold text-white text-sm">One Gradient Nudge</h6>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Every batch digested triggers <strong>one downhill update</strong> of weights and biases.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">4. Epoch</span>
                <h6 className="font-bold text-white text-sm">One Complete Revision</h6>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  When the model has seen <strong>every single log</strong> in the dataset exactly once.
                </p>
              </div>
            </div>

            {/* Interactive Arithmetic Calculator */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-white uppercase">Interactive Training Math Calculator</span>
                <span className="text-[10px] font-mono text-slate-500">Live Arithmetic</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Slider 1: Dataset Size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Dataset Size (N):</span>
                    <span className="text-sky-400 font-bold">{datasetSize.toLocaleString()} rows</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={1000}
                    value={datasetSize}
                    onChange={(e) => setDatasetSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                  <span className="text-[10px] text-slate-500 block">Total records available</span>
                </div>

                {/* Slider 2: Batch Size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Batch Size (B):</span>
                    <span className="text-purple-400 font-bold">{batchSize} rows/batch</span>
                  </div>
                  <select
                    value={batchSize}
                    onChange={(e) => setBatchSize(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                  >
                    <option value={16}>16 (Small VRAM)</option>
                    <option value={32}>32 (Standard Default)</option>
                    <option value={64}>64 (Fast CPU/GPU)</option>
                    <option value={128}>128 (Large Datacenter)</option>
                  </select>
                  <span className="text-[10px] text-slate-500 block">Rows ingested per weight update</span>
                </div>

                {/* Slider 3: Epochs */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Total Epochs:</span>
                    <span className="text-emerald-400 font-bold">{epochs} Epochs</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={epochs}
                    onChange={(e) => setEpochs(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500 block">Times the full dataset is re-read</span>
                </div>

              </div>
              {/* Animated Visualization & Calculated Outputs */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="flex flex-col border-b md:border-b-0 md:border-r border-slate-800 pb-2 md:pb-0 md:pr-4">
                    <span className="text-slate-400">Steps per Single Epoch (N / B):</span>
                    <span className="text-amber-300 font-bold text-lg">{stepsPerEpoch.toLocaleString()} steps</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400">Total Weight Updates (Steps × Epochs):</span>
                    <span className="text-emerald-400 font-black text-lg">{totalGradientSteps.toLocaleString()} nudges</span>
                  </div>
                </div>

                {/* Animation Canvas */}
                <div className="relative h-24 bg-slate-950 rounded-lg border border-slate-800 flex items-center px-4 overflow-hidden">
                  {/* The Dataset Pile */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-12 h-16 bg-sky-900/40 border border-sky-500/50 rounded flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex flex-wrap gap-0.5 p-1 opacity-40">
                        {Array.from({length: 20}).map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 bg-sky-400 rounded-sm" />
                        ))}
                      </div>
                      <span className="font-bold text-sky-300 relative z-10 text-[10px]">Data</span>
                    </div>
                  </div>

                  {/* The Neural Network Model */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-16 h-16 bg-purple-900/40 border-2 border-purple-500 rounded-xl flex items-center justify-center">
                      <Zap size={24} className="text-purple-400" />
                    </div>
                    <span className="text-[10px] text-purple-300 font-bold font-mono mt-1">Model</span>
                  </div>

                  {/* Animated Batches */}
                  <AnimatePresence>
                    {isSimulating && (
                      <motion.div
                        initial={{ left: 60, opacity: 0 }}
                        animate={{ left: "calc(100% - 90px)", opacity: [0, 1, 1, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          ease: "linear",
                          repeat: 3, // Simulate 4 steps visually
                        }}
                        onAnimationComplete={() => setIsSimulating(false)}
                        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
                      >
                        <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-[8px] font-bold text-amber-950">
                          {batchSize}
                        </div>
                        <span className="text-[10px] text-amber-400 font-mono">1 Step</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button
                  onClick={() => setIsSimulating(true)}
                  disabled={isSimulating}
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs font-mono transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} className={isSimulating ? "animate-spin" : ""} />
                  {isSimulating ? "Simulating 1 Epoch..." : "Simulate 1 Epoch"}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 italic">
                📌 <strong>Takeaway:</strong> More epochs does not always mean better. If you read the same textbook 500 times, you start memorizing the exact typos instead of the concepts (Overfitting!).
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
