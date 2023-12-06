from typing import Annotated
from fastapi import APIRouter, Depends
from models.user import User
from dependencies import security

router = APIRouter(prefix="/credit-card", tags=["Credit Card"])


@router.post("/", description="Create a Credit Card")
def add():
    return {"message": "Create a credit card"}


@router.get("/", description="Get all customer's credit cards")
def list(user: Annotated[User, Depends(security.get_current_active_user)]):
    return {"message": "Listing credits cards", "id": user.id}


@router.delete("/{id}", description="Delete a customer's credit card by its ID")
def delete(id: int):
    return {"message": "Deleting a credit card", "id": id}
