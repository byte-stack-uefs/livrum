from enum import Enum
from pydantic import BaseModel, EmailStr

class UserType(str, Enum):
    ADMIN = "ADM"
    AUTHOR = "AUTOR"
    CUSTOMER = "CLIENTE"

class UserStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"

class User:
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.nome = kwargs.get("nome")
        self.email = kwargs.get("email")
        self.status: UserStatus = kwargs.get("status")
        self.senha = kwargs.get("senha")
        self.tipo: UserType = kwargs.get("tipo")

class CreateUserForm(BaseModel):
    
    nome: str
    email: EmailStr
    status: UserStatus
    senha: str
    tipo: UserType

class UserDAO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idUsuario")
        self.name = kwargs.get("name")
        self.email = kwargs.get("email")
        self.type = kwargs.get("type")
        self.status = kwargs.get("status")
