'use client';
import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

const dataPoints = [
  { x: 1, y: 3 },
  { x: 2, y: 4 },
  { x: 3, y: 5.5 },
  { x: 4, y: 6 },
  { x: 5, y: 8 },
  { x: 6, y: 9.5 },
  { x: 7, y: 11 },
];

export default function LinearRegressionDemo() {
  const [m, setM] = useState(1);
  const [c, setC] = useState(1);
  const [loss, setLoss] = useState(0);
  const [gradM, setGradM] = useState(0);
  const [gradC, setGradC] = useState(0);
  const [learningRate, setLearningRate] = useState(0.02);
  const [isStepping, setIsStepping] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Helper to re-calculate local loss without calling API (for manual slider moves)
  const calculateLocalLoss = () => {
    let currentLoss = 0;
    dataPoints.forEach((point, i) => {
      const predictedY = m * point.x + c;
      const error = Math.abs(predictedY - point.y);
      currentLoss += error * error;

      anime({
        targets: `#error-line-${i}`,
        y2: 400 - (predictedY * 30),
        stroke: error > 1.5 ? '#ef4444' : '#22c55e',
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
    
    anime({
      targets: '#trend-line',
      y1: 400 - ((m * 0 + c) * 30),
      y2: 400 - ((m * 10 + c) * 30),
      duration: 300,
      easing: 'easeOutQuad'
    });

    return currentLoss / dataPoints.length;
  };

  useEffect(() => {
    setLoss(calculateLocalLoss());
  }, [m, c]);

  const takeGradientStep = async () => {
    setIsStepping(true);
    try {
      const res = await fetch('http://localhost:8000/api/linear-regression/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          m,
          c,
          learning_rate: learningRate,
          data: dataPoints
        })
      });
      
      const data = await res.json();
      if (!data.error) {
        setM(data.new_m);
        setC(data.new_c);
        setLoss(data.loss);
        setGradM(data.grad_m);
        setGradC(data.grad_c);
      }
    } catch (err) {
      console.error('Failed to call python backend', err);
    }
    setIsStepping(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#60a5fa' }}>Interactive Graph</h3>
        <svg ref={svgRef} width="100%" height="400" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          {/* Grid lines */}
          {[...Array(10)].map((_, i) => (
            <g key={i}>
              <line x1="0" y1={i * 40} x2="100%" y2={i * 40} stroke="rgba(255,255,255,0.05)" />
              <line x1={i * 50} y1="0" x2={i * 50} y2="100%" stroke="rgba(255,255,255,0.05)" />
            </g>
          ))}
          
          {/* Trend line */}
          <line id="trend-line" x1="0" y1="400" x2="500" y2="400" stroke="#3b82f6" strokeWidth="4" />
          
          {/* Data points & Error lines */}
          {dataPoints.map((point, i) => (
            <g key={i}>
              <line 
                id={`error-line-${i}`}
                x1={point.x * 50} 
                y1={400 - (point.y * 30)} 
                x2={point.x * 50} 
                y2={400 - (point.y * 30)} 
                stroke="#ef4444" 
                strokeWidth="2" 
                strokeDasharray="4"
              />
              <circle cx={point.x * 50} cy={400 - (point.y * 30)} r="6" fill="#e2e8f0" />
            </g>
          ))}
        </svg>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            className="button-primary" 
            onClick={takeGradientStep}
            disabled={isStepping}
            style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
          >
            {isStepping ? 'Calculating in Python...' : 'Python Backend: Take Gradient Step'}
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#c084fc' }}>The Math</h3>
        <div style={{ fontSize: '2rem', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
          y = <span style={{ color: '#3b82f6' }}>{m.toFixed(2)}</span>x + <span style={{ color: '#ec4899' }}>{c.toFixed(2)}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Mean Squared Error (Loss)</div>
            <div style={{ fontSize: '1.75rem', color: loss > 1 ? '#ef4444' : '#22c55e', fontWeight: 'bold' }}>
              {loss.toFixed(3)}
            </div>
          </div>
          
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Gradients (Python Computed)</div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#60a5fa', marginTop: '0.5rem' }}>
              dm: {gradM.toFixed(2)}<br/>
              dc: {gradC.toFixed(2)}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Weight (m) - The Slope
          </label>
          <input 
            type="range" 
            min="0" max="3" step="0.05" 
            value={m} 
            onChange={(e) => setM(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Bias (c) - The Baseline
          </label>
          <input 
            type="range" 
            min="-5" max="10" step="0.1" 
            value={c} 
            onChange={(e) => setC(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Learning Rate (Step Size)
          </label>
          <input 
            type="range" 
            min="0.001" max="0.1" step="0.001" 
            value={learningRate} 
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ textAlign: 'right', fontFamily: 'monospace', color: '#94a3b8' }}>{learningRate}</div>
        </div>

      </div>
    </div>
  );
}
