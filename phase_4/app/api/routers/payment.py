from fastapi import APIRouter, Depends
from typing_extensions import Annotated
from models.user import User, UserType
from services.PaymentService import PaymentService
from dependencies.security import UserHasAccess

router = APIRouter(prefix="/payment", tags=["Payment"])

userAccess = UserHasAccess([UserType.CUSTOMER])


@router.get("/pix")
def getPix(user: Annotated[User, Depends(userAccess)]):
    service = PaymentService()
    response = service.createPix()

    return response


@router.post("/pay-by-credit-card")
def payByCreditCard():
    pass
