import LinearRegressionDemo from './LinearRegressionDemo';

export default function LinearRegressionPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>1. Linear Regression</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.25rem' }}>
        Finding the straight line that best fits our data.
      </p>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', background: 'rgba(15, 23, 42, 0.8)' }}>
        <h3 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>🥛 The Daily Life Analogy: Predicting Commute Time</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          If you leave for work at 8:00 AM, it takes 30 mins. At 8:30 AM, it takes 45 mins. 
          Your brain automatically draws a "trendline" to guess that at 8:15 AM, it might take ~37 mins.
          <br/><br/>
          In Enterprise IT (or our Chilling Center), we use this to predict tomorrow's milk collection based on the last 7 days.
        </p>
      </div>

      <LinearRegressionDemo />

      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem', borderLeft: '4px solid #3b82f6' }}>
        <h3 style={{ marginBottom: '1rem' }}>🛠️ Hands-on: The Dairy Forecaster</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          <strong>Task:</strong> You have a CSV of historical milk data. Use Antigravity to write a simple Python script to find the best line automatically (using scikit-learn).
          <br/>
          <strong>Competition:</strong> The first one to get the lowest Mean Squared Error wins!
        </p>
      </div>
    </div>
  );
}
