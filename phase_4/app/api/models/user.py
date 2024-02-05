from enum import Enum


class User:
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.nome = kwargs.get("nome")
        self.email = kwargs.get("email")
        self.status: UserStatus = kwargs.get("status")
        self.senha = kwargs.get("senha")
        self.tipo: UserType = kwargs.get("tipo")

    def updateAttributes(self, email, senha):

        if email != self.email:
            self.email = email

        if senha != self.senha:
            self.senha = senha


class UserType(str, Enum):
    ADMIN = "ADM"
    AUTHOR = "AUTOR"
    CUSTOMER = "CLIENTE"


class UserStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"


class UserDAO:
    def __init__(self, **kwargs):
        self.name = kwargs.get("nome")
        self.email = kwargs.get("email")
        self.id = kwargs.get("idUsuario")
        self.type: UserType = kwargs.get("tipo")
        self.status: UserStatus = kwargs.get("status")
