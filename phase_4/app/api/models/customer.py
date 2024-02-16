from pydantic import BaseModel
from fastapi import Query
from typing_extensions import Annotated
from datetime import date


class Customer:
    def __init__(self, **kwargs):
        self.cpf = kwargs.get("cpf")
        self.idUsuario = kwargs.get("idUsuario")
        self.nome = kwargs.get("nome")
        self.email = kwargs.get("email")
        self.telefone = kwargs.get("telefone")
        self.dataNascimento = kwargs.get("dataNascimento")


class CreateCustomerForm(BaseModel):

    cpf: Annotated[str, Query(regex=r"^\d{11}$", examples=["12345678909"])]
    dataNascimento: str
    endereco: str
    telefone: Annotated[
        str, Query(regex=r"^\(\d{2}\) 9\d{4}-\d{4}$", examples=["(12) 91234-5678"])
    ]
