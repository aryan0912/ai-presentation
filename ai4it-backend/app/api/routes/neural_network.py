from fastapi import APIRouter, Depends
from app.models.neural_network import NNState, NNForwardPassResult
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
    return service.perform_forward_pass(state)
