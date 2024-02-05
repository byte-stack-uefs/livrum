from typing import Annotated
from dependencies import security
from models.user import User, UserType
from models.costumer import CostumerUpdateForm, Costumer
from fastapi import APIRouter, Depends, HTTPException
from services.CostumerService import CostumerService
from services.UserService import UserService

router = APIRouter(prefix="/customer", tags=["Customer"])

access = security.UserHasAccess([UserType.CUSTOMER])

@router.post("/", description="Register a customer")
def add():
    return {"message", "Add a customer"}


@router.get("/{id}", description="Get a customer by ID")
def get(id: int):
    return {"message": "Get a customer by ID", "id": id}


@router.get("/library", description="Get all books bought by a client")
def getLibrary():
    return {"message": "Get all books"}


@router.get("/history", description="Get customer history")
def getHistory():
    return {"message": "Get transaction history made by a client"}

@router.patch("/{id}")
def update(id:int, costumer:CostumerUpdateForm, user: Annotated[User, Depends(security.get_current_active_user)]):
    serviceCostumer = CostumerService()
    serviceUser = UserService()
    user = serviceUser.findUserById
    costumer = serviceCostumer.findCostumerById(id)

    if (costumer or user) is None:
        raise HTTPException(404, "Cliente não encontrado")

    success = service.accountUpdate(costumer)

