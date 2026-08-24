'use client';
import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

export default function NeuralNetworkDemo() {
  const [neurons, setNeurons] = useState(1);
  const [activations, setActivations] = useState<number[]>([]);
  const [complexity, setComplexity] = useState(1.0);
  const [isCalculating, setIsCalculating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fetchBackendMath = async () => {
      setIsCalculating(true);
      try {
        const res = await fetch('http://localhost:8000/api/neural-network/forward', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ neurons })
        });
        
        const data = await res.json();
        if (!data.error) {
          setActivations(data.hidden_activations);
          setComplexity(data.complexity_score);

          // Animate the decision boundary change using the path provided by Python
          anime({
            targets: '#decision-boundary',
            d: [
              { value: data.boundary_path }
            ],
            duration: 800,
            easing: 'easeOutElastic(1, .8)'
          });
          
          anime({
            targets: '.neuron-node-hidden',
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 500,
            easing: 'easeOutQuad'
          });
        }
      } catch (err) {
        console.error("Failed to connect to Python backend. Is it running?", err);
      }
      setIsCalculating(false);
    };

    fetchBackendMath();
  }, [neurons]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      
      {/* Network Architect Panel */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#c084fc' }}>The Architecture</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Stacking bent trendlines (neurons) allows us to create complex decision boundaries.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            className="button-primary" 
            onClick={() => setNeurons(Math.min(neurons + 1, 4))}
            disabled={neurons >= 4 || isCalculating}
            style={{ opacity: neurons >= 4 ? 0.5 : 1 }}
          >
            + Add Expert (Neuron)
          </button>
          <button 
            className="button-primary" 
            onClick={() => setNeurons(Math.max(neurons - 1, 1))}
            disabled={neurons <= 1 || isCalculating}
            style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', opacity: neurons <= 1 ? 0.5 : 1, boxShadow: 'none' }}
          >
            - Remove Expert
          </button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '8px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          
          {isCalculating && (
            <div style={{ position: 'absolute', top: 10, right: 10, fontSize: '0.8rem', color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
              Calculating in Python...
            </div>
          )}

          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            {/* Input Layer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[1, 2, 3].map(i => <div key={i} className="neuron-node" style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#3b82f6' }} />)}
            </div>
            
            {/* Hidden Layer (Dynamic) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[...Array(neurons)].map((_, i) => (
                <div key={i} className="neuron-node-hidden" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#c084fc', boxShadow: `0 0 ${activations[i] * 15}px #c084fc`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#fff', fontWeight: 'bold' }}>
                  {activations[i] ? activations[i].toFixed(2) : '0.00'}
                </div>
              ))}
            </div>

            {/* Output Layer */}
            <div>
              <div className="neuron-node" style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Decision Boundary Visualization */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ color: '#60a5fa', margin: 0 }}>Decision Boundary</h3>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Complexity: <strong style={{ color: '#c084fc' }}>{complexity.toFixed(1)}</strong>
          </div>
        </div>
        
        <svg ref={svgRef} width="100%" height="400" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          
          {/* Data points (Normal vs Anomalies) */}
          <circle cx="100" cy="150" r="8" fill="#3b82f6" />
          <circle cx="150" cy="200" r="8" fill="#3b82f6" />
          <circle cx="200" cy="100" r="8" fill="#3b82f6" />
          <circle cx="350" cy="80" r="8" fill="#3b82f6" />
          
          <circle cx="250" cy="250" r="8" fill="#ef4444" />
          <circle cx="300" cy="300" r="8" fill="#ef4444" />
          <circle cx="350" cy="250" r="8" fill="#ef4444" />
          <circle cx="400" cy="350" r="8" fill="#ef4444" />

          {/* Hard-to-classify anomaly that requires a curve */}
          <circle cx="300" cy="150" r="8" fill="#ef4444" />
          
          {/* Boundary Path */}
          <path 
            id="decision-boundary" 
            d="M 50 350 L 450 50" 
            fill="none" 
            stroke="#22c55e" 
            strokeWidth="4" 
            strokeDasharray="8" 
          />
        </svg>
      </div>

    </div>
  );
}
