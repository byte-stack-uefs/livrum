from fastapi import APIRouter
from models.user import User, UserType
from typing import Annotated, Optional
from services.CartService import CartService
from fastapi import APIRouter, Depends, HTTPException
from dependencies.security import UserHasAccess

router = APIRouter(prefix="/carrinho", tags=["Cart"])

access = UserHasAccess([UserType.CUSTOMER])


@router.get("/", description="Get all ebooks in cart")
def list(user: Annotated[User, Depends(access)]):

    if user is not None:
        service = CartService()
        response = service.getAllCartItemsIDByCartId(user.idUsuario)
        return response
    return []


@router.post("/{idEbook}", description="Add an ebook to customer's cart")
def add(idEbook: int, user: Annotated[Optional[User], Depends(access)]):

    if user is not None:
        service = CartService()
        cart = service.getCartByClientId(user.idUsuario)
        if cart is None:
            cart = service.createCart(user.idUsuario)
        response = service.addCartItem(idCart=cart.idCart, idEbook=idEbook)
        if not response:
            raise HTTPException(500, "Não foi possível adicionar o ebook ao carrinho")
        return {"message": "Added ebook", "ebook": idEbook}
    return {}


@router.delete("/{idEbook}", description="Delete an ebook to customer's cart")
def delete(idEbook: int, user: Annotated[Optional[User], Depends(access)]):

    if user is not None:
        service = CartService()
        cart = service.getCartByClientId(user.idUsuario)
        if cart is None:
            raise HTTPException(404, "Carrinho não encontrado")

        if cart.idUsuario != user.idUsuario:
            raise HTTPException(403, "O carrinho não pertence ao usuário logado")

        success = service.removeCartItem(idCart=cart.idCart, idEbook=idEbook)

        if not success:
            raise HTTPException(500, "Não foi possível remover o ebook")
    return {}


@router.delete("/", description="Delete all ebooks from cart")
def deleteAll(user: Annotated[Optional[User], Depends(access)]):

    if user is not None:

        service = CartService()
        cart = service.getCartByClientId(user.idUsuario)
        if cart is None:
            raise HTTPException(404, "Carrinho não encontrado")

        if cart.idUsuario != user.idUsuario:
            raise HTTPException(403, "O carrinho não pertence ao usuário logado")

        success = service.removeAllCartItems(idCart=cart.idCart)
        s = service.deleteCart(cart.idCart)

        if not success:
            raise HTTPException(500, "Não foi possível limpar o carrinho")
    return {}
