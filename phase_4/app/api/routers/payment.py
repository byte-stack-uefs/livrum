from fastapi import APIRouter, Depends, HTTPException
from typing_extensions import Annotated
from models.user import User, UserType
from services.PaymentService import PaymentService
from services.CreditCardService import CreditCardService
from dependencies.security import UserHasAccess
from models.creditCard import CreditCardPaymentForm
from services.CartService import CartService
from forms.PaymentForm import PaymentForm
from services.CustomerService import CustomerService
from services.OrderService import OrderService, OrderPaymentType, OrderStatus
from services.LibraryService import LibraryService

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

    if len(ebooks) == 0:
        raise HTTPException(
            422, "O carrinho está vazio, adicione alguns ebooks e tente novamente"
        )

    if cartService.hasUnavailableEbooks(ebooks):
        raise HTTPException(409, "Alguns ebooks não estão mais disponíveis para compra")

    customerService = CustomerService()
    customer = customerService.getCustomerById(user.idUsuario)

    payment = PaymentService()
    orderService = OrderService()

    orderId = orderService.createOrder(user.idUsuario, OrderPaymentType.CREDIT_CARD)

    if orderId == False:
        raise HTTPException(
            500,
            "Não foi possível processar o pedido, por favor, tente novamente mais tarde",
        )

    for ebook in ebooks:
        orderService.addEbookToOrder(orderId, ebook, form.idCoupon)

    try:
        txid = payment.payByCreditCard(customer, creditCard, ebooks, form)
        orderService.updateOrderStatus(orderId, OrderStatus.APPROVED)
        orderService.addTxidToOrder(orderId, txid)

        library = LibraryService()
        for ebook in ebooks:
            library.addEbook(user.idUsuario, ebook.id)

        cart = cartService.getCartByClientId(user.idUsuario)
        cartService.removeAllCartItems(cart.idCart)
        cartService.deleteCart(cart.idCart)
        return {}
    except Exception as err:
        orderService.updateOrderStatus(orderId, OrderStatus.FAILED)

        message = (
            err.message
            if hasattr(err, "message")
            else "Não foi possível processar o pedido, tente novamente"
        )

        raise HTTPException(500, message)


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
