import NeuralNetworkDemo from './NeuralNetworkDemo';

export default function NeuralNetworkPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>2. Neural Networks & Backpropagation</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.25rem' }}>
        When straight lines aren't enough, we stack them to learn complex patterns.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(15, 23, 42, 0.8)' }}>
          <h3 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>🏡 The Daily Life Analogy: Buying a House</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            You don't buy a house based <em>only</em> on its size. You look at size, location, age, and nearby schools.
            <br/><br/>
            A neural network is like a committee of experts. One expert looks at size, one looks at location. Their combined votes give the final price.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(15, 23, 42, 0.8)' }}>
          <h3 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>📐 Backpropagation Intuition</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            When the network guesses wrong, the error flows <em>backwards</em>. 
            <br/><br/>
            It tells each expert: <em>"We guessed $500k, but the house sold for $400k. The Location expert voted too high, so we reduce their influence next time."</em>
          </p>
        </div>
      </div>

      <NeuralNetworkDemo />

      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem', borderLeft: '4px solid #c084fc' }}>
        <h3 style={{ marginBottom: '1rem' }}>🛠️ Hands-on: The Server Anomaly Detector</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          <strong>Task:</strong> You have a dataset of server metrics (CPU, Temp, Memory). Some servers are healthy, some are failing. A straight line can't separate them.
          <br/>
          <strong>Action:</strong> Prompt Antigravity to build a basic Neural Network (using scikit-learn's MLPClassifier) to classify normal vs. failing servers based on the metrics!
        </p>
      </div>

      <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
        <a href="/day1/linear-regression" className="button-primary" style={{ background: 'rgba(255,255,255,0.1)' }}>
          &larr; Back to Linear Regression
        </a>
        <a href="/day2/rnn" className="button-primary">
          Next: RNN & Memory (Day 2) &rarr;
        </a>
      </div>
    </div>
  );
}
