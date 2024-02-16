from fastapi import APIRouter, Depends, HTTPException, Response
from typing import Annotated
from dependencies import security
from models.user import User, UserType
import random
import string
from services.RecoverEmail import RecoverEmail
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
def logout(response: Response):
    response.delete_cookie("token")
    return {}


@router.get("/isAuthenticated")
def isAuth(user: Annotated[User, Depends(security.get_current_active_user)]):
    return {}


@router.patch("/recuperar-senha")
def passwordRecover(emailUser: str):
    length = 12
    alphabet = string.ascii_letters + string.digits + string.punctuation
    newPass = "".join(random.choice(alphabet) for i in range(length))
    response = UserService.recoverPass(emailUser, newPass)
    if response:
        operation = RecoverEmail.emailRecover(emailUser, newPass)
        return {
            "status": "success",
            "message": f"Solicitação de recuperação de senha recebida. Verifique seu e-mail para instruções adicionais.",
        }, 200
    return {
        "status": "error",
        "message": f"Erro ao enviar e-mail de recuperação de senha",
    }, 500


@router.post("/create")
def createAccount(createAccountForm: CreateAccount):

    if createAccountForm.authorForm is not None:

        isExistingCpf = serviceAuthor.findAuthorByCpf(createAccountForm.authorForm.cpf)

    else:

        isExistingCpf = serviceCustomer.findCustomerByCpf(
            createAccountForm.customerForm.cpf
        )

    if not isExistingCpf:

        isExistingEmail = serviceUser.findUserByEmail(createAccountForm.userForm.email)

        if not isExistingEmail:

            idUser = serviceUser.addUser(createAccountForm.userForm)

            if createAccountForm.userForm.tipo == UserType.AUTHOR:

                response = serviceAuthor.addAuthor(createAccountForm.authorForm, idUser)

            else:

                response = serviceCustomer.addCustomer(
                    createAccountForm.customerForm, idUser
                )

        else:

            raise HTTPException(400, "Email já cadastrado.")

    else:

        raise HTTPException(400, "CPF já cadastrado.")
