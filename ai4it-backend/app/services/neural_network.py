import numpy as np
from app.services.base import INeuralNetworkService
from app.models.neural_network import NNState, NNForwardPassResult

class NeuralNetworkService(INeuralNetworkService):
    """
    Service responsible for simulating Neural Network calculations.
    Follows the Single Responsibility Principle.
    """
    
    def perform_forward_pass(self, state: NNState) -> NNForwardPassResult:
        n = state.neurons
        
        # Dependency Inversion / Open-Closed:
        # In the future, this mapping can be extracted to a specialized PathGenerator strategy.
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
