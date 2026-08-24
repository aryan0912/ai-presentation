from abc import ABC, abstractmethod

class IRegressionService(ABC):
    @abstractmethod
    def calculate_gradient_step(self, state):
        pass

class INeuralNetworkService(ABC):
    @abstractmethod
    def perform_forward_pass(self, state):
        pass
