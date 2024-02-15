from fastapi import APIRouter, Depends, Response
from typing import Annotated
from dependencies import security
from models.user import User, UserType

router = APIRouter(prefix="/account", tags=["Account"])


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
