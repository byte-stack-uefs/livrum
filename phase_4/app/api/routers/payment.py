from fastapi import APIRouter, Depends, HTTPException
from typing_extensions import Annotated
from models.user import User, UserType
from services.PaymentService import PaymentService
from dependencies.security import UserHasAccess

router = APIRouter(prefix="/payment", tags=["Payment"])

userAccess = UserHasAccess([UserType.CUSTOMER])


@router.get("/pix")
def getPix(user: Annotated[User, Depends(userAccess)]):
    service = PaymentService()
    try:
        response = service.createPix()
    except:
        raise HTTPException(
            500,
            "Não foi possível criar o pix para pagamento, tente novamente mais tarde",
        )

    return response


@router.post("/pay-by-credit-card")
def payByCreditCard():
    pass


@router.get("/pix/isPaid")
def isPixPaid(txid: str) -> bool:

    service = PaymentService()
    try:

        response = service.checkPixPaid(txid)
    except:
        raise HTTPException(
            500,
            "Não foi possível consultar o status do Pix, tente novamente mais tarde",
        )
    return response
