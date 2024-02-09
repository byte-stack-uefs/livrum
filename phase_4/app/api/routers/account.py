from fastapi import APIRouter, Depends
from typing import Annotated
from dependencies import security
from models.user import User, UserType, RecoveryEmailForm
from services.UserService import UserService
import random
import string
from services.RecoverEmail import RecoverEmail
from dependencies.security import get_password_hash
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
def passwordRecover(emailUser: RecoveryEmailForm):
    
    alphabet = string.ascii_letters + string.digits + string.punctuation
    newPass =  ''.join(random.choice(alphabet) for i in range(10))
    passToHash = get_password_hash(newPass)
    response = UserService.recoverPass(emailUser.email,passToHash)

    if response:
       operation = RecoverEmail.emailRecover(emailUser.email,newPass)
       return operation
    return  {
                "status": "error",
                "message": f"Erro ao enviar e-mail de recuperação de senha"
            }, 500