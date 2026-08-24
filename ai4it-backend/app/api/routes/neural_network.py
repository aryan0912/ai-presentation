from fastapi import APIRouter, Depends, HTTPException
from app.models.neural_network import (
    NNState, NNForwardPassResult,
    BoundaryRequest, BoundaryResult,
    TrainRequest, TrainResult
)
from app.services.neural_network import NeuralNetworkService
from app.services.base import INeuralNetworkService

router = APIRouter(prefix="/neural-network", tags=["Neural Network"])

def get_nn_service() -> INeuralNetworkService:
    return NeuralNetworkService()

@router.post("/forward", response_model=NNForwardPassResult)
def forward_pass_nn(
    state: NNState, 
    service: INeuralNetworkService = Depends(get_nn_service)
):
    try:
        return service.perform_forward_pass(state)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/boundary", response_model=BoundaryResult)
def compute_decision_boundary(
    req: BoundaryRequest,
    service: INeuralNetworkService = Depends(get_nn_service)
):
    try:
        return service.compute_boundary(req)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/train", response_model=TrainResult)
def train_neural_network(
    req: TrainRequest,
    service: INeuralNetworkService = Depends(get_nn_service)
):
    try:
        return service.train_network(req)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
