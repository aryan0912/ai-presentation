from pydantic import BaseModel
from typing import List, Optional

class DataPoint(BaseModel):
    x: float
    y: float
    label: Optional[str] = None

class RegressionState(BaseModel):
    m: float
    c: float
    learning_rate: float
    data: List[DataPoint]

class RegressionStepResult(BaseModel):
    old_m: float
    old_c: float
    new_m: float
    new_c: float
    loss: float
    grad_m: float
    grad_c: float

class LossSurfaceRequest(BaseModel):
    data: List[DataPoint]
    m_min: float = -100.0
    m_max: float = 200.0
    c_min: float = 1500.0
    c_max: float = 2800.0
    resolution: int = 40

class LossSurfaceResult(BaseModel):
    m_values: List[float]
    c_values: List[float]
    surface: List[List[float]]
    min_m: float
    min_c: float
    min_loss: float

class FitResult(BaseModel):
    m: float
    c: float
    mse: float
    rmse: float
    r2: float
    predictions: List[float]
