from fastapi import APIRouter

router = APIRouter(prefix="/customer", tags=["Customer"])


@router.post("/", description="Register a customer")
def add():
    return {"message", "Add a customer"}


@router.get("/{id}", description="Get a customer by ID")
def get(id: int):
    return {"message": "Get a customer by ID", "id": id}


@router.get("/library", description="Get all books bought by a client")
def getLibrary():
    return {"message": "Get all books"}


@router.get("/history", description="Get customer history")
def getHistory():
    return {"message": "Get transaction history made by a client"}
