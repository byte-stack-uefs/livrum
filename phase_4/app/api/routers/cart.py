from fastapi import APIRouter
from dependencies import security
from models.user import User, UserType
from typing import Annotated, Optional
#from models.cart import CartForm
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/carrinho", tags=["Cart"])
access = security.UserHasAccess([UserType.CUSTOMER])


@router.get("/", description="Get ebooks in cart")
def list(user: Annotated[User, Depends(access)]):
    if user:
        pass
    else:
        pass
    return {"message": "Ebooks"}


@router.post("/{idEbook}", description="Add an ebook to customer's cart")
def add(idEbook: int, user: Annotated[Optional[User], Depends(access)]):
    return {"message": "Added ebook", "ebook": idEbook}


@router.delete("/{idEbook}", description="Delete an ebook to customer's cart")
def delete(idEbook: int):
    return {"message": "Book removed", "ebook": idEbook}


@router.delete("/", description="Delete all ebooks from cart")
def deleteAll():
    return {"message": "Delete all ebooks"}

# Talvez seja removido
@router.post("/buy", description="Create cart with all ebooks")
def addCart(user: Annotated[User, Depends(access)]):
    return {"message": "Buy all books in cart"}
