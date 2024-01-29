from typing import Annotated
from dependencies import security
from models.user import User, UserType
from models.creditCard import FrontToBackEndCreditCardDTO
from fastapi import APIRouter, Depends
from services.creditCardService import CreditCardService

router = APIRouter(prefix="/credit-card", tags=["Credit Card"])
service = CreditCardService()
access = security.UserHasAccess([UserType.CUSTOMER])

@router.post("/", description="Create a Credit Card")
def add(creditCardData: FrontToBackEndCreditCardDTO, user:Annotated[User,Depends(access)]):
    response = service.addCreditCard(creditCardData,user.idUsuario)
    return {"message": response}

@router.get("/all", description="Get all customer credit cards")
def list(user:Annotated[User,Depends(access)]):
    response = service.getAllCreditCardsByClientId(user.idUsuario);
    return response

@router.delete("/{id}", description="Delete a customer's credit card by its ID")
def delete(id: int, user:Annotated[User,Depends(access)]):
    response = service.deleteCreditCardById(id,user.idUsuario)
    return {"message": response}
