'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Download,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Terminal,
  FileSpreadsheet,
  Cpu,
  BarChart2,
  Table as TableIcon
} from 'lucide-react';

interface RowData {
  date: string;
  day: string;
  chilling_center: string;
  ambient_temp_c: number;
  grid_reliability_pct: number;
  is_festival: number;
  is_weekend: number;
  milk_collected_liters: number;
  fat_pct: number;
  snf_pct: number;
  chiller_power_kwh: number;
  quality_alert: number;
}

// Sample of the dataset for instant in-browser preview
const PREVIEW_ROWS: RowData[] = [
  { date: '2026-06-01', day: 'Mon', chilling_center: 'Anand-North', ambient_temp_c: 34.1, grid_reliability_pct: 94.6, is_festival: 0, is_weekend: 0, milk_collected_liters: 4479, fat_pct: 4.46, snf_pct: 8.58, chiller_power_kwh: 881.7, quality_alert: 0 },
  { date: '2026-06-01', day: 'Mon', chilling_center: 'Kheda-Central', ambient_temp_c: 33.8, grid_reliability_pct: 99.1, is_festival: 0, is_weekend: 0, milk_collected_liters: 3850, fat_pct: 3.86, snf_pct: 8.28, chiller_power_kwh: 816.7, quality_alert: 0 },
  { date: '2026-06-01', day: 'Mon', chilling_center: 'Mehsana-Rural', ambient_temp_c: 33.1, grid_reliability_pct: 99.9, is_festival: 0, is_weekend: 0, milk_collected_liters: 3260, fat_pct: 4.29, snf_pct: 8.57, chiller_power_kwh: 738.5, quality_alert: 0 },
  { date: '2026-06-02', day: 'Tue', chilling_center: 'Anand-North', ambient_temp_c: 36.2, grid_reliability_pct: 91.1, is_festival: 0, is_weekend: 0, milk_collected_liters: 4678, fat_pct: 4.31, snf_pct: 8.48, chiller_power_kwh: 968.0, quality_alert: 0 },
  { date: '2026-06-02', day: 'Tue', chilling_center: 'Kheda-Central', ambient_temp_c: 28.8, grid_reliability_pct: 95.6, is_festival: 0, is_weekend: 0, milk_collected_liters: 3810, fat_pct: 4.21, snf_pct: 8.49, chiller_power_kwh: 687.3, quality_alert: 0 },
  { date: '2026-06-02', day: 'Tue', chilling_center: 'Mehsana-Rural', ambient_temp_c: 42.3, grid_reliability_pct: 91.2, is_festival: 0, is_weekend: 0, milk_collected_liters: 3042, fat_pct: 4.04, snf_pct: 8.30, chiller_power_kwh: 840.8, quality_alert: 1 },
  { date: '2026-06-03', day: 'Wed', chilling_center: 'Anand-North', ambient_temp_c: 26.8, grid_reliability_pct: 93.9, is_festival: 0, is_weekend: 0, milk_collected_liters: 4357, fat_pct: 4.40, snf_pct: 8.63, chiller_power_kwh: 735.0, quality_alert: 0 },
  { date: '2026-06-15', day: 'Mon', chilling_center: 'Anand-North', ambient_temp_c: 35.0, grid_reliability_pct: 96.2, is_festival: 1, is_weekend: 0, milk_collected_liters: 5320, fat_pct: 4.52, snf_pct: 8.65, chiller_power_kwh: 1045.2, quality_alert: 0 },
];

export default function HandsOnDatasetSection() {
  const [activeTask, setActiveTask] = useState<'viz' | 'regression' | 'classification'>('regression');
  const [filterCenter, setFilterCenter] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const filteredPreview = useMemo(() => {
    if (filterCenter === 'all') return PREVIEW_ROWS;
    return PREVIEW_ROWS.filter((r) => r.chilling_center === filterCenter);
  }, [filterCenter]);

  const tasks = {
    viz: {
      title: 'Task 1: Exploratory Data Visualization (EDA)',
      objective: 'Discover non-linear festival spikes and temperature correlations before fitting any model.',
      prompt: `Read the dataset 'nddb_chilling_center_operations.csv'. Using matplotlib & seaborn, create a 2x2 dashboard:
1. Scatter plot: Milk Collected (Liters) vs Chiller Power (kWh) colored by ambient temperature.
2. Boxplot: Milk Collection comparison across Normal Days vs Weekends vs Festival Days.
3. Time series: 90-day trajectory of Ambient Temp and Quality Alerts.
4. Heatmap: Correlation matrix of all numeric variables. Save as 'nddb_eda.png'.`,
      code: `# --- Task 1: Visualizing NDDB Operations ---
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('nddb_chilling_center_operations.csv')

plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
sns.scatterplot(data=df, x='milk_collected_liters', y='chiller_power_kwh', hue='ambient_temp_c', palette='viridis')
plt.title('Milk Volume vs Chiller Power Demand')

plt.subplot(1, 2, 2)
sns.boxplot(data=df, x='is_festival', y='milk_collected_liters', palette='Set2')
plt.title('Impact of Festivals on Milk Volume (0=Normal, 1=Festival)')
plt.tight_layout()
plt.show()`
    },
    regression: {
      title: 'Task 2: Linear Regression (Predicting Energy Load)',
      objective: 'Fit an OLS model: Chiller Power (kWh) = m1*(Volume) + m2*(Ambient Temp) + c. Inspect slope & RMSE.',
      prompt: `Load 'nddb_chilling_center_operations.csv'. Using scikit-learn LinearRegression:
1. Feature X = ['milk_collected_liters', 'ambient_temp_c']
2. Target y = 'chiller_power_kwh'
3. Split into 80% Train, 20% Test.
4. Fit the model and print:
   - Base Intercept (Baseline standby cooling power)
   - Coefficient for Milk Volume (kWh per liter chilled)
   - Coefficient for Ambient Temp (kWh penalty per degree heat)
   - Test RMSE and R-Squared score.
5. Predict power required if Anand-North receives 5,200 Liters on a 38°C afternoon.`,
      code: `# --- Task 2: Linear Regression Model Fitting ---
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import root_mean_squared_error, r2_score

df = pd.read_csv('nddb_chilling_center_operations.csv')
X = df[['milk_collected_liters', 'ambient_temp_c']]
y = df['chiller_power_kwh']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"Standby Power (Intercept c): {model.intercept_:.2f} kWh")
print(f"Weight 1 (Volume):           {model.coef_[0]:.4f} kWh/liter")
print(f"Weight 2 (Ambient Temp):     {model.coef_[1]:.2f} kWh/°C")
print(f"Test RMSE:                   ±{root_mean_squared_error(y_test, y_pred):.2f} kWh")
print(f"R² Score:                    {r2_score(y_test, y_pred)*100:.1f}%")`
    },
    classification: {
      title: 'Task 3: Logistic / Neural Classification (Spoilage Alerts)',
      objective: 'Predict binary quality alert (0=Accept, 1=Spoil Risk) and evaluate the 99% Accuracy Trap with Precision/Recall/F1.',
      prompt: `Load 'nddb_chilling_center_operations.csv'. Build a binary classifier (LogisticRegression or MLPClassifier) to predict 'quality_alert'.
1. Features: ['ambient_temp_c', 'grid_reliability_pct', 'milk_collected_liters', 'fat_pct']
2. Check class balance: how many 0s vs 1s?
3. Fit the model and print the classification_report (Precision, Recall, F1-score for class 1).
4. Explain to the NDDB team why a dummy model that always predicts 'Safe' achieves high accuracy but is catastrophic in production.`,
      code: `# --- Task 3: Spoilage Alert Classification ---
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

df = pd.read_csv('nddb_chilling_center_operations.csv')
X = df[['ambient_temp_c', 'grid_reliability_pct', 'milk_collected_liters', 'fat_pct']]
y = df['quality_alert']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)
clf = LogisticRegression(class_weight='balanced')
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
print("=== Classification Report (Focus on F1 & Recall) ===")
print(classification_report(y_test, y_pred, target_names=['Safe (0)', 'Spoil Alert (1)']))`
    }
  };

  const copyPromptOrCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="p-6 md:p-8 rounded-3xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-xl space-y-8 font-sans shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-3">
            <Database size={14} />
            <span>Official Hands-on Dataset · 270 Operational Records</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            NDDB Bulk Chilling Center Operations Dataset
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            A purpose-built, realistic dataset capturing 90 days across 3 district chilling centers (Anand, Kheda, Mehsana). Designed specifically for participants to visualize, fit linear regression, and evaluate neural classification metrics.
          </p>
        </div>

        {/* Action button: Download CSV */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/nddb_chilling_center_operations.csv"
            download="nddb_chilling_center_operations.csv"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/50 active:scale-95"
          >
            <Download size={15} />
            <span>Download CSV (270 Rows)</span>
          </a>
        </div>
      </div>

      {/* Schema / Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono relative z-10">
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Centers Tracked</span>
          <span className="text-white font-bold mt-0.5 block">3 District Centers</span>
          <span className="text-[10px] text-slate-400">Anand, Kheda, Mehsana</span>
        </div>
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Linear Target</span>
          <span className="text-sky-400 font-bold mt-0.5 block">chiller_power_kwh</span>
          <span className="text-[10px] text-slate-400">Physics-linked to Volume & Temp</span>
        </div>
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Non-Linear Signals</span>
          <span className="text-amber-400 font-bold mt-0.5 block">is_festival & is_weekend</span>
          <span className="text-[10px] text-slate-400">Sudden demand kinks & surges</span>
        </div>
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Classification Target</span>
          <span className="text-rose-400 font-bold mt-0.5 block">quality_alert (0/1)</span>
          <span className="text-[10px] text-slate-400">Imbalanced (~7% alerts)</span>
        </div>
      </div>

      {/* Dataset Table Preview */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <TableIcon size={15} className="text-sky-400" />
            <span>Dataset Preview (Top Operational Records)</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="text-slate-500">Filter Center:</span>
            {['all', 'Anand-North', 'Kheda-Central', 'Mehsana-Rural'].map((c) => (
              <button
                key={c}
                onClick={() => setFilterCenter(c)}
                className={`px-2 py-0.5 rounded border transition-colors ${
                  filterCenter === c
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {c === 'all' ? 'All' : c.split('-')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-x-auto">
          <table className="w-full text-left text-[11px] font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-2.5">Date</th>
                <th className="p-2.5">Center</th>
                <th className="p-2.5 text-right">Ambient (°C)</th>
                <th className="p-2.5 text-right">Grid (%)</th>
                <th className="p-2.5 text-center">Festival</th>
                <th className="p-2.5 text-right">Milk (Liters)</th>
                <th className="p-2.5 text-right">Power (kWh)</th>
                <th className="p-2.5 text-center">Quality Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              {filteredPreview.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-2.5 text-slate-400">{row.date} ({row.day})</td>
                  <td className="p-2.5 font-sans font-semibold text-slate-200">{row.chilling_center}</td>
                  <td className="p-2.5 text-right text-amber-300">{row.ambient_temp_c}°C</td>
                  <td className="p-2.5 text-right">{row.grid_reliability_pct}%</td>
                  <td className="p-2.5 text-center">
                    {row.is_festival === 1 ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        Festival
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="p-2.5 text-right font-bold text-sky-300">{row.milk_collected_liters.toLocaleString()} L</td>
                  <td className="p-2.5 text-right font-bold text-emerald-400">{row.chiller_power_kwh} kWh</td>
                  <td className="p-2.5 text-center">
                    {row.quality_alert === 1 ? (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold border border-rose-500/40 animate-pulse">
                        SPOIL ALERT
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold text-[10px]">NORMAL (0)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Guided Participant Tasks */}
      <div className="space-y-4 pt-4 border-t border-slate-800 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={17} className="text-amber-400" />
              <span>3 Step-by-Step Practical Exercises</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an exercise below to view the prompt for Antigravity and the ready-to-run Python script.
            </p>
          </div>

          {/* Exercise Tabs */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTask('viz')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTask === 'viz'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart2 size={13} />
              <span>1. Visualization</span>
            </button>
            <button
              onClick={() => setActiveTask('regression')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTask === 'regression'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp size={13} />
              <span>2. Linear Regression</span>
            </button>
            <button
              onClick={() => setActiveTask('classification')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTask === 'classification'
                  ? 'bg-rose-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert size={13} />
              <span>3. Spoilage Classifier</span>
            </button>
          </div>
        </div>

        {/* Task Details Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTask}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5"
          >
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                {tasks[activeTask].title}
              </span>
              <p className="text-sm font-semibold text-white mt-0.5">
                {tasks[activeTask].objective}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Intent Prompt for Antigravity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 font-mono">
                  <span>Antigravity Intent Prompt (Copy & Run)</span>
                  <button
                    onClick={() => copyPromptOrCode(tasks[activeTask].prompt)}
                    className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 font-sans"
                  >
                    {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-sky-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 min-h-[180px]">
                  {tasks[activeTask].prompt}
                </pre>
              </div>

              {/* Reference Solution Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Terminal size={14} />
                    <span>Complete Python Reference Script</span>
                  </span>
                  <button
                    onClick={() => copyPromptOrCode(tasks[activeTask].code)}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-sans"
                  >
                    {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 min-h-[180px]">
                  {tasks[activeTask].code}
                </pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
