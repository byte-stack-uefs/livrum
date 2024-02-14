from pydantic import BaseModel
from fastapi import Query
from typing_extensions import Annotated
from datetime import date

class Customer:
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.cpf = kwargs.get("cpf")
        self.dataNascimento = kwargs.get("dataNascimento")
        self.endereco = kwargs.get("endereco")
        self.telefone = kwargs.get("telefone")

class CreateCustomerForm(BaseModel):

    cpf: Annotated[str, Query(regex=r"^\d{11}$", examples=["12345678909"])]
    dataNascimento: str
    endereco: str
    telefone: Annotated[str, Query(regex=r"^\(\d{2}\) 9\d{4}-\d{4}$", examples=["(12) 91234-5678"])]


