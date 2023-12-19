from enum import Enum


class User:
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.nome = kwargs.get("nome")
        self.email = kwargs.get("email")
        self.status: UserStatus = kwargs.get("status")
        self.senha = kwargs.get("senha")
        self.tipo: UserType = kwargs.get("tipo")


class UserType(str, Enum):
    ADMIN = "ADM"
    AUTHOR = "AUTHOR"
    CUSTOMER = "CUSTOMER"


class UserStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"
