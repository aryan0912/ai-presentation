from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class NNState(BaseModel):
    neurons: int

class NNForwardPassResult(BaseModel):
    boundary_path: str
    complexity_score: float
    hidden_activations: List[float]

class BoundaryRequest(BaseModel):
    dataset_type: str = "rings" # "rings", "moons", or "linear"
    layers: int = 1
    neurons: int = 2
    activation: str = "relu" # "relu", "sigmoid", "tanh", "none"

class Point2D(BaseModel):
    x: float
    y: float
    label: int

class BoundaryResult(BaseModel):
    points: List[Point2D]
    grid_predictions: List[List[float]]
    resolution: int
    train_accuracy: float
    is_separable: bool
    summary: str

class TrainRequest(BaseModel):
    dataset_type: str = "rings"
    epochs: int = 30
    learning_rate: float = 0.1
    layers: int = 2
    neurons: int = 4
    activation: str = "relu"

class TrainResult(BaseModel):
    loss_history: List[float]
    accuracy_history: List[float]
    final_loss: float
    final_accuracy: float
    weights_summary: Dict[str, Any]
