from fastapi import APIRouter, Depends
from models.user import User, UserType
from typing_extensions import Annotated
from services.CartService import CartService
from dependencies.security import UserHasAccess

router = APIRouter(prefix="/cart", tags=["Cart"])

access = UserHasAccess([UserType.CUSTOMER])


@router.get("/", description="Get ebooks in cart")
def list(user: Annotated[User, Depends(access)]):
    cart = CartService()
    return cart.getCartEbooksByUserId(user.idUsuario)


@router.post("/{idEbook}", description="Add an ebook to customer's cart")
def add(idEbook: int):
    return {"message": "Added ebook", "ebook": idEbook}


@router.delete("/{idEbook}", description="Delete an ebook to customer's cart")
def delete(idEbook: int):
    return {"message": "Book removed", "ebook": idEbook}


@router.delete("/", description="Delete all ebooks from cart")
def deleteAll():
    return {"message": "Delete all ebooks"}


# Talvez seja removido
@router.post("/buy", description="Buy all ebooks in cart")
def buy():
    return {"message": "Buy all books in cart"}
