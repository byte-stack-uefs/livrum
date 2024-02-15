from fastapi import APIRouter
from dependencies import security
from models.cart import CartForm
from models.cartItem import CartItemForm
from models.user import User, UserType
from typing import Annotated, Optional
from services.CartService import CartService
from fastapi import APIRouter, Depends, HTTPException
from dependencies.security import UserHasAccess

router = APIRouter(prefix="/carrinho", tags=["Cart"])
access = security.UserHasAccess([UserType.CUSTOMER])
service = CartService()

access = UserHasAccess([UserType.CUSTOMER])


@router.get("/", description="Get all ebooks in cart")
def list(user: Annotated[User, Depends(access)]):
    response = service.getAllCartItemsIDByCartId(user.idUsuario)
    return response


@router.post("/{idEbook}", description="Add an ebook to customer's cart")
def add(
    cartData: CartForm, idEbook: int, user: Annotated[Optional[User], Depends(access)]
):
    response = service.addCartItem(idCart=cartData.id, idEbook=idEbook)
    if not response:
        raise HTTPException(500, "Não foi possível cadastrar o cartão")
    return {"message": "Added ebook", "ebook": idEbook}


@router.delete("/{idEbook}", description="Delete an ebook to customer's cart")
def delete(idEbook: int, user: Annotated[Optional[User], Depends(access)]):
    cart = service.getCartByClientId(user.idUsuario)
    if cart is None:
        raise HTTPException(404, "Carrinho não encontrado")

    if cart.idUsuario != user.idUsuario:
        raise HTTPException(403, "O carrinho não pertence ao usuário logado")

    success = service.removeCartItem(idCart=cart.idCart, idEbook=idEbook)

    if not success:
        raise HTTPException(500, "Não foi possível remover o ebook")


@router.delete("/", description="Delete all ebooks from cart")
def deleteAll(user: Annotated[Optional[User], Depends(access)]):
    cart = service.getCartByClientId(user.idUsuario)
    if cart is None:
        raise HTTPException(404, "Carrinho não encontrado")

    if cart.idUsuario != user.idUsuario:
        raise HTTPException(403, "O carrinho não pertence ao usuário logado")

    success = service.removeAllCartItems(idCart=cart.idCart)

    if not success:
        raise HTTPException(500, "Não foi possível limpar o carrinho")
