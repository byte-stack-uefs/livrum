from typing import Annotated
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import datetime, timedelta
from passlib.context import CryptContext
from services.userService import UserService
from models.user import User, UserStatus, UserType
from fastapi import Depends, HTTPException, status, APIRouter, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

EXPIRE = 60
ALGO = "HS256"
SECRET = "2dc1f208deabcce0f6fbcca025987e7cf4cf7790a2a83a6bde3edb164f5e1c4c"

authScheme = OAuth2PasswordBearer(tokenUrl="/auth")
passwordContext = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Token(BaseModel):
    access_token: str
    token_type: str


def verify_password(plain: str, hashed: str) -> bool:
    return passwordContext.verify(plain, hashed)


def get_password_hash(plain: str) -> str:
    return passwordContext.hash(plain)


def create_access_token(data: dict, expires: timedelta):
    to_encode = data.copy()
    if expires:
        expire = datetime.now() + timedelta(expires)
    else:
        expire = datetime.now() + timedelta(EXPIRE)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET, algorithm=ALGO)


async def get_current_user(token: Annotated[str, Depends(authScheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGO])
        id: str = payload.get("id")
        if id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    userService: UserService = UserService()
    user = userService.findUserById(id)
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(user: Annotated[User, Depends(get_current_user)]):
    if user.status != UserStatus.ACTIVE:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="User is NOT active")
    return user


class UserHasAccess:
    def __init__(self, access: list[UserType]):
        self.access = access

    def __call__(self, user: Annotated[User, Depends(get_current_active_user)]):
        if user and user.tipo not in self.access:
            raise HTTPException(
                status.HTTP_403_FORBIDDEN, detail="User has no access to this resource"
            )

        return user


def findUser(email: str) -> User:
    service: UserService = UserService()
    return service.findUserByEmail(email)


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/", description="Authenticates an User")
def token(form: Annotated[OAuth2PasswordRequestForm, Depends()], response: Response):
    user = findUser(form.username)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")

    if not verify_password(form.password, user.senha):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Wrong password")

    access_token = create_access_token({"id": user.idUsuario, "type": user.tipo}, 60)
    response.set_cookie("token", access_token)
    return {"access_token": access_token, "token_type": "bearer", "user": user}
