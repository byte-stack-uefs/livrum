from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from models.user import UserType, User
from models.partialForms import PartialUserForm
from dependencies.security import UserHasAccess
from services.UserService import UserService

accessAdmin = UserHasAccess([UserType.ADMIN])
accessCustomer = UserHasAccess([UserType.CUSTOMER])
accessAuthor = UserHasAccess([UserType.AUTHOR])


router = APIRouter(prefix="/user", tags=["Users"])


@router.get("/admins")
def getAdmins(user: Annotated[User, Depends(accessAdmin)]):
    service = UserService()
    return service.getUsersByType(UserType.ADMIN)


@router.get("/authors")
def getAuthors(user: Annotated[User, Depends(accessAdmin)]):
    service = UserService()
    return service.getUsersByType(UserType.AUTHOR)


@router.get("/customers")
def getCustomers(user: Annotated[User, Depends(accessAdmin)]):
    service = UserService()
    return service.getUsersByType(UserType.CUSTOMER)


@router.get("/")
def get(user: Annotated[User, Depends(accessCustomer)]):

    service = UserService()
    user = service.findUserById(user.idUsuario)

    if user is None:
        raise HTTPException(404, "Usuário não encontrado")
                      
    return user

@router.patch("/")
def update(userPartial:PartialUserForm, user: Annotated[User, Depends(accessCustomer)]):

    service = UserService()

    userOriginal = service.findUserById(user.idUsuario)

    if user is None:
        raise HTTPException(404, "Usuário não encontrado")
    
    userPartial.updateOriginalByPartial(userOriginal,userPartial)
    success = service.updateUserById(user.idUsuario,userOriginal)



