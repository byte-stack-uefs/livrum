from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from models.user import UserType, User, UpdateUserForm, UserStatus, UpdateUserModel
from dependencies.security import UserHasAccess
from services.UserService import UserService

access = UserHasAccess([UserType.ADMIN])

router = APIRouter(prefix="/user", tags=["Users"])


@router.get("/admins")
def getAdmins(user: Annotated[User, Depends(access)]):
    service = UserService()
    return service.getAllAdmins()


@router.get("/authors")
def getAuthors(user: Annotated[User, Depends(access)]):
    service = UserService()
    return service.getAllAuthors()


@router.get("/customers")
def getCustomers(user: Annotated[User, Depends(access)]):
    service = UserService()
    return service.getAllCustomers()


@router.patch("/{id}")
def updateUser(id: int, user: Annotated[User, Depends(access)], form: UpdateUserForm):
    service = UserService()

    _user = service.findUserById(id)
    if (
        hasattr(_user, "super")
        and _user.super
        and form.status is not None
        and form.status != UserStatus.ACTIVE.value
    ):
        raise HTTPException(409, "Não é possível desativar um super usuário")

    update = UpdateUserModel(**form.__dict__)

    for key, val in update.__dict__.items():
        if val is not None:
            _user.__setattr__(key, val)

    try:
        service.updateUser(_user)
    except Exception as e:
        raise HTTPException(422, e.args[0])
