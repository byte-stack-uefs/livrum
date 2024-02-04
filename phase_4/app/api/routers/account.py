from http.client import HTTPException
from fastapi import APIRouter, Depends
from typing import Annotated
from dependencies import security
from models.user import User, UserType, UserBase, UserAutor
from phase_4.app.api.services.UserService import UserService


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

@router.post("/create")
def create_user(new_user: UserBase or UserAutor):
    response = UserService.create_user(new_user)
    if not response:
        raise HTTPException(500, "Não foi possível cadastrar o usuario")

