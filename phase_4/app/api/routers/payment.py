from fastapi import APIRouter, Depends, HTTPException
from typing_extensions import Annotated
from models.user import User, UserType
from services.PaymentService import PaymentService
from services.CreditCardService import CreditCardService
from dependencies.security import UserHasAccess
from models.creditCard import CreditCardPaymentForm
from services.CartService import CartService
from forms.PaymentForm import PaymentForm

router = APIRouter(prefix="/payment", tags=["Payment"])

userAccess = UserHasAccess([UserType.CUSTOMER])


@router.post("/pix")
def getPix(user: Annotated[User, Depends(userAccess)], form: PaymentForm):
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
def payByCreditCard(
    form: CreditCardPaymentForm,
    user: Annotated[User, Depends(userAccess)],
):

    cardService = CreditCardService()
    creditCard = cardService.getCreditCardByCardId(form.idCreditCard)

    if creditCard.cvv != form.cvv:
        raise HTTPException(
            400, {"field": "cvv", "message": "O código de segurança está inválido"}
        )

    cartService = CartService()
    ebooks = cartService.getCartEbooksByUserId(user.idUsuario)

    if cartService.hasUnavailableEbooks(ebooks):
        raise HTTPException(409, "Alguns ebooks não estão mais disponíveis para compra")

    payment = PaymentService()
    payment.payByCreditCard(creditCard, ebooks, form.idCoupon)


@router.get("/pix/isPaid/{txid}")
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
