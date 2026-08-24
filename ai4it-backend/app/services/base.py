from abc import ABC, abstractmethod
from app.models.linear_regression import RegressionState, RegressionStepResult, LossSurfaceRequest, LossSurfaceResult, FitResult, DataPoint
from app.models.neural_network import NNState, NNForwardPassResult, BoundaryRequest, BoundaryResult, TrainRequest, TrainResult
from typing import List

class IRegressionService(ABC):
    @abstractmethod
    def calculate_gradient_step(self, state: RegressionState) -> RegressionStepResult:
        pass

    @abstractmethod
    def compute_loss_surface(self, req: LossSurfaceRequest) -> LossSurfaceResult:
        pass

    @abstractmethod
    def fit_closed_form(self, data: List[DataPoint]) -> FitResult:
        pass

class INeuralNetworkService(ABC):
    @abstractmethod
    def perform_forward_pass(self, state: NNState) -> NNForwardPassResult:
        pass

    @abstractmethod
    def compute_boundary(self, req: BoundaryRequest) -> BoundaryResult:
        pass

    @abstractmethod
    def train_network(self, req: TrainRequest) -> TrainResult:
        pass
