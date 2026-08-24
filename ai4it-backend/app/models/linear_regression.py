from pydantic import BaseModel
from typing import List

class DataPoint(BaseModel):
    x: float
    y: float

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
