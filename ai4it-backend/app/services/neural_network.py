import numpy as np
from typing import List, Dict, Any
from app.services.base import INeuralNetworkService
from app.models.neural_network import (
    NNState, NNForwardPassResult,
    BoundaryRequest, BoundaryResult, Point2D,
    TrainRequest, TrainResult
)

class NeuralNetworkService(INeuralNetworkService):
    """
    Service responsible for simulating Neural Network calculations,
    decision boundaries, and activation function effects using NumPy.
    """
    
    def perform_forward_pass(self, state: NNState) -> NNForwardPassResult:
        n = state.neurons
        boundary_path, complexity_score = self._generate_boundary(n)
        hidden_activations = np.random.rand(n).tolist()
        
        return NNForwardPassResult(
            boundary_path=boundary_path,
            complexity_score=complexity_score,
            hidden_activations=hidden_activations
        )
        
    def _generate_boundary(self, neurons_count: int) -> tuple[str, float]:
        if neurons_count == 1:
            return "M 50 350 L 450 50", 1.0
        elif neurons_count == 2:
            return "M 50 350 Q 250 350 450 50", 5.4
        elif neurons_count == 3:
            return "M 50 350 C 150 150, 350 350, 450 50", 12.8
        else:
            return "M 50 350 C 100 50, 200 450, 350 150 S 400 350, 450 50", 42.0

    def _generate_dataset(self, dataset_type: str, n_samples: int = 100) -> tuple[np.ndarray, np.ndarray]:
        np.random.seed(42)
        if dataset_type == "rings":
            # Concentric rings
            n_inner = n_samples // 2
            n_outer = n_samples - n_inner
            
            r_inner = np.random.uniform(0.1, 0.4, n_inner)
            theta_inner = np.random.uniform(0, 2 * np.pi, n_inner)
            x_inner = np.stack([r_inner * np.cos(theta_inner), r_inner * np.sin(theta_inner)], axis=1)
            y_inner = np.zeros(n_inner, dtype=int)
            
            r_outer = np.random.uniform(0.6, 0.95, n_outer)
            theta_outer = np.random.uniform(0, 2 * np.pi, n_outer)
            x_outer = np.stack([r_outer * np.cos(theta_outer), r_outer * np.sin(theta_outer)], axis=1)
            y_outer = np.ones(n_outer, dtype=int)
            
            X = np.vstack([x_inner, x_outer])
            Y = np.concatenate([y_inner, y_outer])
            return X, Y
        elif dataset_type == "moons":
            # Two interleaving half circles
            n_per = n_samples // 2
            theta1 = np.linspace(0, np.pi, n_per)
            x1 = np.stack([np.cos(theta1), np.sin(theta1)], axis=1) + np.random.normal(0, 0.08, (n_per, 2))
            y1 = np.zeros(n_per, dtype=int)
            
            theta2 = np.linspace(0, np.pi, n_per)
            x2 = np.stack([1 - np.cos(theta2), 1 - np.sin(theta2) - 0.5], axis=1) + np.random.normal(0, 0.08, (n_per, 2))
            y2 = np.ones(n_per, dtype=int)
            
            X = np.vstack([x1, x2])
            # Scale to [-1, 1]
            X = (X - np.mean(X, axis=0)) / (np.std(X, axis=0) * 1.5)
            Y = np.concatenate([y1, y2])
            return X, Y
        else: # linear
            X = np.random.uniform(-1, 1, (n_samples, 2))
            Y = (X[:, 0] + X[:, 1] > 0).astype(int)
            return X, Y

    def compute_boundary(self, req: BoundaryRequest) -> BoundaryResult:
        X, Y = self._generate_dataset(req.dataset_type, n_samples=80)
        resolution = 25
        grid_coords = np.linspace(-1.1, 1.1, resolution)
        gx, gy = np.meshgrid(grid_coords, grid_coords)
        grid_flat = np.stack([gx.ravel(), gy.ravel()], axis=1)

        # Simulation of neural network evaluation with activation
        if req.activation == "none" or req.neurons == 1:
            # Linear model collapses to a single hyperplane regardless of layers
            w = np.array([0.8, -0.6])
            preds_flat = 1.0 / (1.0 + np.exp(-(grid_flat @ w)))
            train_preds = (1.0 / (1.0 + np.exp(-(X @ w)))) > 0.5
            accuracy = float(np.mean(train_preds == Y))
            summary = "Without non-linear activation (or with 1 neuron), the decision boundary is strictly linear. Depth without kinks collapses to a single line."
            separable = False
        else:
            # Non-linear activation allows bending
            # Fit a synthetic multi-neuron simulation
            if req.dataset_type == "rings":
                r = np.sqrt(grid_flat[:, 0]**2 + grid_flat[:, 1]**2)
                threshold = 0.5
                if req.neurons >= 4 and req.layers >= 1:
                    preds_flat = 1.0 / (1.0 + np.exp(10 * (r - threshold)))
                    train_r = np.sqrt(X[:, 0]**2 + X[:, 1]**2)
                    train_preds = (train_r > threshold)
                    accuracy = float(np.mean(train_preds == Y))
                    separable = True
                    summary = f"With {req.neurons} neurons and {req.activation.upper()} activation, the network successfully bends boundaries around the concentric cluster ({accuracy*100:.1f}% accuracy)."
                else:
                    preds_flat = 1.0 / (1.0 + np.exp(3 * (grid_flat[:, 0]**2 - 0.3)))
                    train_preds = (X[:, 0]**2 > 0.3)
                    accuracy = float(np.mean(train_preds == Y))
                    separable = False
                    summary = f"With only {req.neurons} neuron(s), the model struggles to form a closed convex boundary ({accuracy*100:.1f}% accuracy)."
            else:
                w1 = np.array([1.2, -1.0])
                preds_flat = 1.0 / (1.0 + np.exp(-(grid_flat @ w1 + 0.3 * np.sin(grid_flat[:, 0] * 3))))
                train_preds = (X @ w1 + 0.3 * np.sin(X[:, 0] * 3)) > 0
                accuracy = float(np.mean(train_preds == Y))
                separable = True
                summary = f"Non-linear {req.activation.upper()} decision boundary bending active."

        grid_2d = preds_flat.reshape(resolution, resolution).tolist()
        points_list = [Point2D(x=float(X[i, 0]), y=float(X[i, 1]), label=int(Y[i])) for i in range(len(Y))]

        return BoundaryResult(
            points=points_list,
            grid_predictions=grid_2d,
            resolution=resolution,
            train_accuracy=accuracy,
            is_separable=separable,
            summary=summary
        )

    def train_network(self, req: TrainRequest) -> TrainResult:
        np.random.seed(42)
        # Synthetic loss curve that mirrors typical neural net training
        base_loss = 0.8
        decay_rate = 0.12 * req.learning_rate * 10
        epochs = max(5, req.epochs)
        
        losses = []
        accuracies = []
        for ep in range(epochs):
            loss = base_loss * np.exp(-decay_rate * ep) + 0.05 * np.random.normal(0, 0.02)
            loss = max(0.01, float(loss))
            acc = min(0.98, 0.5 + 0.48 * (1.0 - np.exp(-decay_rate * ep * 0.8)))
            losses.append(round(loss, 4))
            accuracies.append(round(float(acc), 4))

        return TrainResult(
            loss_history=losses,
            accuracy_history=accuracies,
            final_loss=losses[-1],
            final_accuracy=accuracies[-1],
            weights_summary={
                "total_parameters": (2 * req.neurons) + req.neurons + (req.neurons * 1) + 1,
                "layer_weights": f"Input (2) -> Hidden ({req.neurons}) -> Output (1)",
                "activation": req.activation
            }
        )
