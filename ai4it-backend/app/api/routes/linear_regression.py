from fastapi import APIRouter, Depends, HTTPException
from app.models.linear_regression import RegressionState, RegressionStepResult
from app.services.linear_regression import LinearRegressionService
from app.services.base import IRegressionService

router = APIRouter(prefix="/linear-regression", tags=["Linear Regression"])

def get_regression_service() -> IRegressionService:
    return LinearRegressionService()

@router.post("/step", response_model=RegressionStepResult)
def step_linear_regression(
    state: RegressionState, 
    service: IRegressionService = Depends(get_regression_service)
):
    try:
        return service.calculate_gradient_step(state)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
