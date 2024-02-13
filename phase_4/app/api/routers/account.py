from fastapi import APIRouter, Depends
from typing import Annotated
from dependencies import security, recoverEmail
from models.user import User, UserType, RecoveryEmailForm
from dependencies.recoverEmail import RecoverEmail
from services.UserService import UserService

router = APIRouter(prefix="/account", tags=["Account"])


@router.post("/login")
def login():
    return {"message": "Login"}


@router.post("/logout")
def logout():
    return {"message": "logout"}


@router.get("/isAuthenticated")
def isAuth(user: Annotated[User, Depends(security.get_current_active_user)]):
    return {"message": "uau"}


@router.post("/recuperar-senha")
def passwordRecover(emailUser: RecoveryEmailForm):

    random_password = RecoverEmail.generateRandomPassword()
    response = UserService.updatePasswordByEmail(emailUser.email,random_password)

    if response:

       operation = RecoverEmail.emailRecover(emailUser.email,random_password)

       return operation

    return  {
                "status": "error",
                "message": f"Erro ao enviar e-mail de recuperação de senha"
            }, 500