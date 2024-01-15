from typing import Annotated
from dependencies import security
from models.user import User, UserType
from models.creditCard import FrontToBackEndCreditCardDTO
from fastapi import APIRouter, Depends
from services.creditCardService import CreditCardService

router = APIRouter(prefix="/credit-card", tags=["Credit Card"])
service = CreditCardService()
access = security.UserHasAccess([UserType.CUSTOMER])

@router.post("/create", description="Create a Credit Card")
def add(creditCardData: FrontToBackEndCreditCardDTO, user:Annotated[User,Depends(access)]):
    response = service.addCreditCard(creditCardData)
    return {"message": response}

@router.get("/{idClient}", description="Get all customer's credit cards")
def list(idClient:int, user:Annotated[User,Depends(access)]):
    response = service.getAllCreditCardsByClientId(idClient);
    return response

@router.delete("/{idCard}", description="Delete a customer's credit card by its ID")
def delete(idCard: int, user:Annotated[User,Depends(access)]):
    response = service.deleteCreditCardById(idCard)
    return {"message": response}
