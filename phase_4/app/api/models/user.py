from enum import Enum
from pydantic import BaseModel

class UserType(str, Enum):
    ADMIN = "ADM"
    AUTHOR = "AUTOR"
    CUSTOMER = "CLIENTE"

class UserStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"

class UserBase(BaseModel):
    cpf: str
    name: str
    email: str
    address: str
    birthday: str
    password: str
    telephone: str
    type: UserType
    status: UserStatus

class UserAutor(UserBase):
    agencyNumber: str
    accountNumber: str
    operationNumber: str

class UserDAO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idUsuario")
        self.name = kwargs.get("name")
        self.email = kwargs.get("email")
        self.cpf = kwargs.get("cpf")
        self.address = kwargs.get("address")
        self.birthday = kwargs.get("birthday")
        self.password = kwargs.get("password")
        self.telephone = kwargs.get("telephone")
        self.type = kwargs.get("type")
        self.status = kwargs.get("status")
    
        self.agencyNumber = kwargs.get("agencyNumber")
        self.accountNumber = kwargs.get("accountNumber")
        self.operationNumber = kwargs.get("operationNumber")
