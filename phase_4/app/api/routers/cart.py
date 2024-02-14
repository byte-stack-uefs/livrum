from fastapi import APIRouter
from dependencies import security
from models.cart import CartForm
from models.cartItem import CartItemForm
from models.user import User, UserType
from typing import Annotated, Optional
from services.CartService import CartService
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(prefix="/carrinho", tags=["Cart"])
access = security.UserHasAccess([UserType.CUSTOMER])
service = CartService()


@router.get("/", description="Get all ebooks in cart")
def list(user: Annotated[User, Depends(access)]):
    response = service.getAllCartItemsIDByCartId(user.idUsuario)
    return response


@router.post("/{idEbook}", description="Add an ebook to customer's cart")
def add(cartData: CartForm, idEbook: int, user: Annotated[Optional[User], Depends(access)]):
    response = service.addCartItem(idCart=cartData.id, idEbook=idEbook)
    if not response:
        raise HTTPException(500, "Não foi possível cadastrar o cartão")
    return {"message": "Added ebook", "ebook": idEbook}


@router.delete("/{idEbook}", description="Delete an ebook to customer's cart")
def delete(idEbook: int, user: Annotated[Optional[User], Depends(access)]):
    response = service.removeCartItem(idCart=service.getCartByClientId(user).idCart, idEbook=idEbook)
    return response


@router.delete("/", description="Delete all ebooks from cart")
def deleteAll(user: Annotated[Optional[User], Depends(access)]):
    response = service.removeAllCartItems(idCart=service.getCartByClientId(user).idCart, idUsuario=user.idUsuario)
    return {"message": "Delete all ebooks"}

# Talvez seja removido
@router.post("/buy", description="Create cart with all ebooks")
def addCart(user: Annotated[User, Depends(access)]):
    return {"message": "Buy all books in cart"}
