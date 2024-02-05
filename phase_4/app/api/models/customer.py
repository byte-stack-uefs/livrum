from pydantic import BaseModel, EmailStr
from fastapi import Query
from typing_extensions import Annotated

class Customer:
    
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.cpf = kwargs.get("cpf")
        self.dataNascimento = kwargs.get("dataNascimento")
        self.endereco: UserStatus = kwargs.get("endereco")
        self.telefone = kwargs.get("telefone")

    def updateAttributes(self, endereco, telefone):

        if endereco != self.endereco:
            self.endereco = endereco

        if telefone != self.telefone:
            self.telefone = telefone


class CustomerUpdateForm(BaseModel):
    
    telefone: Annotated[str, Query(pattern=r"^\(\d{2}\) 9\d{4}-\d{4}$", examples=["(12) 94567-8901"])]
    email: EmailStr
    senha: str
    endereco: str


