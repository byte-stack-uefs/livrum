from typing import Annotated
from fastapi import APIRouter, Depends
from models.user import UserType, User
from dependencies.security import UserHasAccess
from services.userService import UserService

access = UserHasAccess([UserType.ADMIN])

router = APIRouter(prefix="/user", tags=["Users"])


@router.get("/admins")
def getAdmins(user: Annotated[User, Depends(access)]):
    service = UserService()
    return service.getUsersByType(UserType.ADMIN)


@router.get("/authors")
def getAuthors(user: Annotated[User, Depends(access)]):
    service = UserService()
    return service.getUsersByType(UserType.AUTHOR)


@router.get("/customers")
def getCustomers(user: Annotated[User, Depends(access)]):
    service = UserService()
    return service.getUsersByType(UserType.CUSTOMER)