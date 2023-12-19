from typing import Annotated
from dependencies import security
from models.user import User, UserType
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/credit-card", tags=["Credit Card"])

access = security.UserHasAccess([UserType.CUSTOMER])


@router.post("/", description="Create a Credit Card")
def add(user: Annotated[User, Depends(access)]):
    return {"message": "Create a credit card"}


@router.get("/", description="Get all customer's credit cards")
def list(user: Annotated[User, Depends(access)]):
    return {"message": "Listing credits cards", "id": user.id}


@router.delete("/{id}", description="Delete a customer's credit card by its ID")
def delete(id: int, user: Annotated[User, Depends(access)]):
    return {"message": "Deleting a credit card", "id": id}
