from fastapi import APIRouter

router = APIRouter(prefix="/credit-card", tags=["Credit Card"])


@router.post("/", description="Create a Credit Card")
def add():
    return {"message": "Create a credit card"}


@router.get("/", description="Get all customer's credit cards")
def list():
    return {"message": "Listing credits cards"}


@router.delete("/{id}", description="Delete a customer's credit card by its ID")
def delete(id: int):
    return {"message": "Deleting a credit card", "id": id}
