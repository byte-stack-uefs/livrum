from pydantic import BaseModel, EmailStr
from fastapi import Query
from typing_extensions import Annotated
from typing import Optional

class Customer:
    
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.cpf = kwargs.get("cpf")
        self.dataNascimento = kwargs.get("dataNascimento")
        self.endereco =  kwargs.get("endereco")
        self.telefone = kwargs.get("telefone")

