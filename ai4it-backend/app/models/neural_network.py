from pydantic import BaseModel
from typing import List

class NNState(BaseModel):
    neurons: int

class NNForwardPassResult(BaseModel):
    boundary_path: str
    complexity_score: float
    hidden_activations: List[float]
