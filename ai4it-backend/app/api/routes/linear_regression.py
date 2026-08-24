from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.linear_regression import (
    RegressionState, RegressionStepResult,
    LossSurfaceRequest, LossSurfaceResult,
    FitResult, DataPoint
)
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

@router.post("/loss-surface", response_model=LossSurfaceResult)
def get_loss_surface(
    req: LossSurfaceRequest,
    service: IRegressionService = Depends(get_regression_service)
):
    try:
        return service.compute_loss_surface(req)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/fit", response_model=FitResult)
def fit_linear_regression(
    data: List[DataPoint],
    service: IRegressionService = Depends(get_regression_service)
):
    try:
        return service.fit_closed_form(data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
