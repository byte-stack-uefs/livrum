from http.client import HTTPException
from fastapi import APIRouter, Depends
from typing import Annotated
from dependencies import security
from models.user import User, UserType
from models.account import CreateAccount
from services.UserService import UserService
from services.CustomerService import CustomerService
from services.AuthorService import AuthorService

router = APIRouter(prefix="/account", tags=["Account"])
serviceUser = UserService()
serviceAuthor = AuthorService()
serviceCustomer = CustomerService()

@router.post("/login")
def login():
    return {"message": "Login"}


@router.post("/logout")
def logout():
    return {"message": "logout"}


@router.get("/isAuthenticated")
def isAuth(user: Annotated[User, Depends(security.get_current_active_user)]):
    return {"message": "uau"}

@router.post("/create")
def createAccount(createAccountForm: CreateAccount):
    
    idUser = serviceUser.createUser(createAccountForm.formUser)
    if not idUser:
        raise HTTPException(500, "Não foi possível cadastrar o usuario")

    if(createAccountForm.formUser.type == UserType.AUTHOR):

        serviceAuthor.createAuthor(createAccountForm.formAuthor,idUser)

    else:

        serviceCustomer.createCustomer(createAccountForm.formCustomer,idUser)

    


    




