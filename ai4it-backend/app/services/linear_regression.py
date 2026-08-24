import numpy as np
from typing import List
from app.services.base import IRegressionService
from app.models.linear_regression import (
    RegressionState, RegressionStepResult,
    LossSurfaceRequest, LossSurfaceResult,
    FitResult, DataPoint
)

class LinearRegressionService(IRegressionService):
    """
    Service responsible for handling linear regression calculations and loss surfaces.
    Uses pure NumPy.
    """
    
    def calculate_gradient_step(self, state: RegressionState) -> RegressionStepResult:
        n = len(state.data)
        if n == 0:
            raise ValueError("No data points provided for calculation.")

        x = np.array([p.x for p in state.data], dtype=np.float64)
        y = np.array([p.y for p in state.data], dtype=np.float64)

        pred = state.m * x + state.c
        error = pred - y
        
        mse = float(np.mean(error ** 2))
        avg_grad_m = float(np.mean(2 * error * x))
        avg_grad_c = float(np.mean(2 * error))

        new_m = float(state.m - (state.learning_rate * avg_grad_m))
        new_c = float(state.c - (state.learning_rate * avg_grad_c))

        return RegressionStepResult(
            old_m=state.m,
            old_c=state.c,
            new_m=new_m,
            new_c=new_c,
            loss=mse,
            grad_m=avg_grad_m,
            grad_c=avg_grad_c
        )

    def compute_loss_surface(self, req: LossSurfaceRequest) -> LossSurfaceResult:
        if len(req.data) == 0:
            raise ValueError("No data points provided.")

        x = np.array([p.x for p in req.data], dtype=np.float64)
        y = np.array([p.y for p in req.data], dtype=np.float64)

        m_vals = np.linspace(req.m_min, req.m_max, req.resolution)
        c_vals = np.linspace(req.c_min, req.c_max, req.resolution)

        # Vectorized MSE over 2D grid
        # M: (R, 1, 1), C: (1, R, 1), X: (1, 1, N)
        M = m_vals[:, None, None]
        C = c_vals[None, :, None]
        X = x[None, None, :]
        Y = y[None, None, :]

        preds = M * X + C
        losses = np.mean((preds - Y) ** 2, axis=2) # shape: (R_m, R_c)

        min_idx = np.unravel_index(np.argmin(losses), losses.shape)
        min_m = float(m_vals[min_idx[0]])
        min_c = float(c_vals[min_idx[1]])
        min_loss = float(losses[min_idx])

        # Return surface as list of lists (m rows, c cols)
        return LossSurfaceResult(
            m_values=m_vals.tolist(),
            c_values=c_vals.tolist(),
            surface=losses.tolist(),
            min_m=min_m,
            min_c=min_c,
            min_loss=min_loss
        )

    def fit_closed_form(self, data: List[DataPoint]) -> FitResult:
        if len(data) < 2:
            raise ValueError("Need at least 2 points for a linear fit.")

        x = np.array([p.x for p in data], dtype=np.float64)
        y = np.array([p.y for p in data], dtype=np.float64)

        # OLS: m = Cov(x, y) / Var(x), c = mean(y) - m * mean(x)
        x_mean = np.mean(x)
        y_mean = np.mean(y)

        var_x = np.sum((x - x_mean) ** 2)
        if var_x == 0:
            m = 0.0
            c = float(y_mean)
        else:
            cov_xy = np.sum((x - x_mean) * (y - y_mean))
            m = float(cov_xy / var_x)
            c = float(y_mean - m * x_mean)

        preds = m * x + c
        mse = float(np.mean((preds - y) ** 2))
        rmse = float(np.sqrt(mse))
        
        tot_var = np.sum((y - y_mean) ** 2)
        r2 = float(1.0 - (np.sum((preds - y) ** 2) / tot_var)) if tot_var > 0 else 1.0

        return FitResult(
            m=m,
            c=c,
            mse=mse,
            rmse=rmse,
            r2=r2,
            predictions=preds.tolist()
        )
