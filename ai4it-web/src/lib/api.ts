// API client for AI4IT backend with full client-side JavaScript fallbacks
// Ensures zero black-screen risk on projectors and offline network environments

export interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface FitResult {
  m: number;
  c: number;
  mse: number;
  rmse: number;
  r2: number;
  predictions: number[];
}

export interface LossSurfaceResult {
  m_values: number[];
  c_values: number[];
  surface: number[][];
  min_m: number;
  min_c: number;
  min_loss: number;
}

export interface StepResult {
  old_m: number;
  old_c: number;
  new_m: number;
  new_c: number;
  loss: number;
  grad_m: number;
  grad_c: number;
}

export interface Point2D {
  x: number;
  y: number;
  label: number;
}

export interface BoundaryResult {
  points: Point2D[];
  grid_predictions: number[][];
  resolution: number;
  train_accuracy: number;
  is_separable: boolean;
  summary: string;
}

export interface TrainResult {
  loss_history: number[];
  accuracy_history: number[];
  final_loss: number;
  final_accuracy: number;
  weights_summary: Record<string, any>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Canonical Fallback Datasets
export const FALLBACK_DATASETS: Record<string, any> = {
  'milk-7day': [
    { x: 1, y: 2140, label: 'Mon' },
    { x: 2, y: 2210, label: 'Tue' },
    { x: 3, y: 2180, label: 'Wed' },
    { x: 4, y: 2300, label: 'Thu' },
    { x: 5, y: 2350, label: 'Fri' },
    { x: 6, y: 2420, label: 'Sat' },
    { x: 7, y: 2390, label: 'Sun' },
  ],
  'milk-seasonal-curve': [
    { x: 1, y: 1800, label: 'Jan' },
    { x: 2, y: 1950, label: 'Feb' },
    { x: 3, y: 2250, label: 'Mar' },
    { x: 4, y: 2600, label: 'Apr' },
    { x: 5, y: 2850, label: 'May (Peak)' },
    { x: 6, y: 2900, label: 'Jun' },
    { x: 7, y: 2800, label: 'Jul' },
    { x: 8, y: 2500, label: 'Aug' },
    { x: 9, y: 2200, label: 'Sep' },
    { x: 10, y: 1950, label: 'Oct' },
    { x: 11, y: 1850, label: 'Nov' },
    { x: 12, y: 1800, label: 'Dec' },
  ],
  'anscombe': {
    description: 'F. J. Anscombe (1973) - 4 datasets with identical mean, variance, and linear regression line',
    statistics: {
      mean_x: 9.0,
      var_x: 11.0,
      mean_y: 7.5,
      var_y: 4.125,
      linear_regression: 'y = 0.50x + 3.00',
      r2: 0.67,
    },
    dataset_1: [
      { x: 10.0, y: 8.04 }, { x: 8.0, y: 6.95 }, { x: 13.0, y: 7.58 },
      { x: 9.0, y: 8.81 }, { x: 11.0, y: 8.33 }, { x: 14.0, y: 9.96 },
      { x: 6.0, y: 7.24 }, { x: 4.0, y: 4.26 }, { x: 12.0, y: 10.84 },
      { x: 7.0, y: 4.82 }, { x: 5.0, y: 5.68 }
    ],
    dataset_2: [
      { x: 10.0, y: 9.14 }, { x: 8.0, y: 8.14 }, { x: 13.0, y: 8.74 },
      { x: 9.0, y: 8.77 }, { x: 11.0, y: 9.26 }, { x: 14.0, y: 8.10 },
      { x: 6.0, y: 6.13 }, { x: 4.0, y: 3.10 }, { x: 12.0, y: 9.13 },
      { x: 7.0, y: 7.26 }, { x: 5.0, y: 4.74 }
    ],
    dataset_3: [
      { x: 10.0, y: 7.46 }, { x: 8.0, y: 6.77 }, { x: 13.0, y: 12.74 },
      { x: 9.0, y: 7.11 }, { x: 11.0, y: 7.81 }, { x: 14.0, y: 8.84 },
      { x: 6.0, y: 6.08 }, { x: 4.0, y: 5.39 }, { x: 12.0, y: 8.15 },
      { x: 7.0, y: 6.42 }, { x: 5.0, y: 5.73 }
    ],
    dataset_4: [
      { x: 8.0, y: 6.58 }, { x: 8.0, y: 5.76 }, { x: 8.0, y: 7.71 },
      { x: 8.0, y: 8.84 }, { x: 8.0, y: 8.47 }, { x: 8.0, y: 7.04 },
      { x: 8.0, y: 5.25 }, { x: 19.0, y: 12.50 }, { x: 8.0, y: 5.56 },
      { x: 8.0, y: 7.91 }, { x: 8.0, y: 6.89 }
    ]
  },
  'tickets': [
    { x: 1, y: 142, label: 'Week 1' },
    { x: 2, y: 155, label: 'Week 2' },
    { x: 3, y: 168, label: 'Week 3' },
    { x: 4, y: 174, label: 'Week 4' },
    { x: 5, y: 190, label: 'Week 5' },
    { x: 6, y: 205, label: 'Week 6' },
    { x: 7, y: 218, label: 'Week 7' },
    { x: 8, y: 230, label: 'Week 8' },
  ],
  'disk-usage': [
    { x: 1, y: 45.0, label: 'Month 1 (45%)' },
    { x: 2, y: 49.2, label: 'Month 2 (49%)' },
    { x: 3, y: 52.8, label: 'Month 3 (53%)' },
    { x: 4, y: 57.1, label: 'Month 4 (57%)' },
    { x: 5, y: 62.0, label: 'Month 5 (62%)' },
    { x: 6, y: 66.4, label: 'Month 6 (66%)' },
    { x: 7, y: 71.0, label: 'Month 7 (71%)' },
    { x: 8, y: 74.8, label: 'Month 8 (75%)' },
  ]
};

// Check backend reachability
export async function checkBackendStatus(): Promise<{ online: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { method: 'GET', signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      const data = await res.json();
      return { online: true, message: data.message || 'API Online' };
    }
    return { online: false, message: 'Server returned error status' };
  } catch (err) {
    return { online: false, message: 'Running in standalone local fallback mode' };
  }
}

// Fetch dataset with local fallback
export async function fetchDataset(name: string): Promise<{ data: any; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/datasets/${name}`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      return { data, isFallback: false };
    }
  } catch (err) {
    // silently fallback
  }
  return { data: FALLBACK_DATASETS[name] || [], isFallback: true };
}

// Step linear regression
export async function stepLinearRegressionApi(
  m: number,
  c: number,
  learningRate: number,
  data: DataPoint[]
): Promise<{ result: StepResult; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/linear-regression/step`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ m, c, learning_rate: learningRate, data }),
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const result = await res.json();
      return { result, isFallback: false };
    }
  } catch (err) {
    // fallback to local calculation
  }

  // Local JS math calculation
  const n = data.length || 1;
  let totalLoss = 0;
  let gradM = 0;
  let gradC = 0;

  for (const p of data) {
    const pred = m * p.x + c;
    const err = pred - p.y;
    totalLoss += err * err;
    gradM += 2 * err * p.x;
    gradC += 2 * err;
  }

  const mse = totalLoss / n;
  const avgGradM = gradM / n;
  const avgGradC = gradC / n;

  return {
    result: {
      old_m: m,
      old_c: c,
      new_m: m - learningRate * avgGradM,
      new_c: c - learningRate * avgGradC,
      loss: mse,
      grad_m: avgGradM,
      grad_c: avgGradC,
    },
    isFallback: true,
  };
}

// Fit closed form (OLS)
export async function fitLinearRegressionApi(data: DataPoint[]): Promise<{ result: FitResult; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/linear-regression/fit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const result = await res.json();
      return { result, isFallback: false };
    }
  } catch (err) {
    // fallback
  }

  // Local OLS Calculation
  const n = data.length;
  if (n < 2) {
    return {
      result: { m: 0, c: 0, mse: 0, rmse: 0, r2: 1, predictions: [] },
      isFallback: true,
    };
  }

  const xMean = data.reduce((acc, p) => acc + p.x, 0) / n;
  const yMean = data.reduce((acc, p) => acc + p.y, 0) / n;

  let num = 0;
  let den = 0;
  for (const p of data) {
    num += (p.x - xMean) * (p.y - yMean);
    den += (p.x - xMean) * (p.x - xMean);
  }

  const m = den === 0 ? 0 : num / den;
  const c = yMean - m * xMean;

  const preds = data.map((p) => m * p.x + c);
  let totalSqErr = 0;
  let totalVar = 0;
  for (let i = 0; i < n; i++) {
    totalSqErr += (preds[i] - data[i].y) ** 2;
    totalVar += (data[i].y - yMean) ** 2;
  }

  const mse = totalSqErr / n;
  const rmse = Math.sqrt(mse);
  const r2 = totalVar === 0 ? 1 : 1 - totalSqErr / totalVar;

  return {
    result: { m, c, mse, rmse, r2, predictions: preds },
    isFallback: true,
  };
}

// Compute Loss Surface
export async function computeLossSurfaceApi(
  data: DataPoint[],
  mMin: number = -50,
  mMax: number = 150,
  cMin: number = 1600,
  cMax: number = 2600,
  resolution: number = 30
): Promise<{ result: LossSurfaceResult; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/linear-regression/loss-surface`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
        m_min: mMin,
        m_max: mMax,
        c_min: cMin,
        c_max: cMax,
        resolution,
      }),
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const result = await res.json();
      return { result, isFallback: false };
    }
  } catch (err) {
    // fallback
  }

  // Local JS Surface computation
  const mVals: number[] = [];
  const cVals: number[] = [];
  for (let i = 0; i < resolution; i++) {
    mVals.push(mMin + (i / (resolution - 1)) * (mMax - mMin));
    cVals.push(cMin + (i / (resolution - 1)) * (cMax - cMin));
  }

  const surface: number[][] = [];
  let minLoss = Infinity;
  let minM = mVals[0];
  let minC = cVals[0];

  for (let i = 0; i < resolution; i++) {
    const row: number[] = [];
    const curM = mVals[i];
    for (let j = 0; j < resolution; j++) {
      const curC = cVals[j];
      let sumErr = 0;
      for (const p of data) {
        const pred = curM * p.x + curC;
        sumErr += (pred - p.y) ** 2;
      }
      const mse = sumErr / data.length;
      row.push(mse);
      if (mse < minLoss) {
        minLoss = mse;
        minM = curM;
        minC = curC;
      }
    }
    surface.push(row);
  }

  return {
    result: {
      m_values: mVals,
      c_values: cVals,
      surface,
      min_m: minM,
      min_c: minC,
      min_loss: minLoss,
    },
    isFallback: true,
  };
}

// Compute Decision Boundary for Neural Network
export async function computeBoundaryApi(
  datasetType: string = 'rings',
  layers: number = 1,
  neurons: number = 2,
  activation: string = 'relu'
): Promise<{ result: BoundaryResult; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/neural-network/boundary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataset_type: datasetType, layers, neurons, activation }),
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const result = await res.json();
      return { result, isFallback: false };
    }
  } catch (err) {
    // fallback
  }

  // Local fallback simulation
  const resolution = 20;
  const grid: number[][] = [];
  const points: Point2D[] = [];

  // Generate 40 pseudo points
  for (let i = 0; i < 40; i++) {
    const r = i < 20 ? 0.25 + (i % 5) * 0.04 : 0.7 + (i % 6) * 0.05;
    const theta = (i * 0.6) % (2 * Math.PI);
    points.push({
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
      label: i < 20 ? 0 : 1,
    });
  }

  const isLinear = activation === 'none' || neurons === 1;
  for (let i = 0; i < resolution; i++) {
    const row: number[] = [];
    const gy = -1 + (i / (resolution - 1)) * 2;
    for (let j = 0; j < resolution; j++) {
      const gx = -1 + (j / (resolution - 1)) * 2;
      let prob = 0.5;
      if (isLinear) {
        prob = 1 / (1 + Math.exp(-(0.8 * gx - 0.6 * gy)));
      } else {
        const dist = Math.sqrt(gx * gx + gy * gy);
        prob = 1 / (1 + Math.exp(8 * (dist - 0.5)));
      }
      row.push(prob);
    }
    grid.push(row);
  }

  return {
    result: {
      points,
      grid_predictions: grid,
      resolution,
      train_accuracy: isLinear ? 0.55 : neurons >= 4 ? 0.96 : 0.78,
      is_separable: !isLinear && neurons >= 4,
      summary: isLinear
        ? 'Without non-linear activation (or with 1 neuron), the decision boundary is strictly linear.'
        : `Non-linear ${activation.toUpperCase()} decision boundary with ${neurons} neurons active.`,
    },
    isFallback: true,
  };
}
