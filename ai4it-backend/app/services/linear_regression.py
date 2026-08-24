from app.services.base import IRegressionService
from app.models.linear_regression import RegressionState, RegressionStepResult

class LinearRegressionService(IRegressionService):
    """
    Service responsible for handling core linear regression mathematical logic.
    Follows the Single Responsibility Principle.
    """
    
    def calculate_gradient_step(self, state: RegressionState) -> RegressionStepResult:
        n = len(state.data)
        if n == 0:
            raise ValueError("No data points provided for calculation.")

        total_loss = 0.0
        grad_m = 0.0
        grad_c = 0.0

        for point in state.data:
            prediction = state.m * point.x + state.c
            error = prediction - point.y
            
            total_loss += error ** 2
            grad_m += 2 * error * point.x
            grad_c += 2 * error

        mse = total_loss / n
        avg_grad_m = grad_m / n
        avg_grad_c = grad_c / n

        new_m = state.m - (state.learning_rate * avg_grad_m)
        new_c = state.c - (state.learning_rate * avg_grad_c)

        return RegressionStepResult(
            old_m=state.m,
            old_c=state.c,
            new_m=new_m,
            new_c=new_c,
            loss=mse,
            grad_m=avg_grad_m,
            grad_c=avg_grad_c
        )
