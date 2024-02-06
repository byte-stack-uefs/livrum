from fastapi import APIRouter, Depends
from typing import Annotated
from dependencies import security
from models.user import User, UserType
from services.UserService import UserService
import random
import string
from services.RecoverEmail import RecoverEmail
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
@router.patch("/recuperar-senha")
def passwordRecover(emailUser: str, temporaryPass:str):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    newPass =  ''.join(random.choice(alphabet) for i in range(length))
    response = UserService.recoverPass(emailUser,newPass)
    if response:
       operation = RecoverEmail.emailRecover(emailUser,newPass)
       return operation
    return  {
                "status": "error",
                "message": f"Erro ao enviar e-mail de recuperação de senha"
            }, 500