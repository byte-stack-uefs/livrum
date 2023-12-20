from fastapi import APIRouter

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("/", description="Get ebooks in cart")
def list():
    return {"message": "Ebooks"}


@router.post("/{idEbook}", description="Add an ebook to customer's cart")
def add(idEbook: int):
    return {"message": "Added ebook", "ebook": idEbook}


@router.delete("/{idEbook}", description="Delete an ebook to customer's cart")
def delete(idEbook: int):
    return {"message": "Book removed", "ebook": idEbook}


@router.delete("/", description="Delete all ebooks from cart")
def deleteAll():
    return {"message": "Delete all ebooks"}


@router.post("/buy", description="Buy all ebooks in cart")
def buy():
    return {"message": "Buy all books in cart"}
