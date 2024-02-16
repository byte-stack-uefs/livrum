from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from models.partialForms import PartialUserForm
from models.user import UserType, User, UpdateUserForm, UserStatus, UpdateUserModel
from dependencies.security import UserHasAccess
from services.UserService import UserService

accessAdmin = UserHasAccess([UserType.ADMIN])
accessCustomer = UserHasAccess([UserType.CUSTOMER])
accessAdminOrCustomer = UserHasAccess([UserType.ADMIN, UserType.CUSTOMER])


router = APIRouter(prefix="/user", tags=["Users"])


@router.get("/admins")
def getAdmins(user: Annotated[User, Depends(accessAdmin)]):
    service = UserService()
    return service.getAllAdmins()


@router.get("/authors")
def getAuthors(user: Annotated[User, Depends(accessAdmin)]):
    service = UserService()
    return service.getAllAuthors()


@router.get("/customers")
def getCustomers(user: Annotated[User, Depends(accessAdmin)]):
    service = UserService()
    return service.getAllCustomers()


@router.get("/")
def get(user: Annotated[User, Depends(accessAdminOrCustomer)]):

    service = UserService()
    user = service.findUserById(user.idUsuario)

    if user is None:
        raise HTTPException(404, "Usuário não encontrado")

    return user


@router.patch("/")
def update(
    userPartial: PartialUserForm, user: Annotated[User, Depends(accessAdminOrCustomer)]
):

    service = UserService()

    userOriginal = service.findUserById(user.idUsuario)

    if userOriginal is None:
        raise HTTPException(404, "Usuário não encontrado")

    userPartial.updateOriginalByPartial(userOriginal, userPartial)
    response = service.updateUserById(user.idUsuario, userOriginal)

    if not response:
        raise HTTPException(500, "Não foi possível atualizar o usuário")


@router.patch("/{id}")
def updateUser(
    id: int, user: Annotated[User, Depends(accessAdmin)], form: UpdateUserForm
):
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
