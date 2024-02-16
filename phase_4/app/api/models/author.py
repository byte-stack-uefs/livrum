from pydantic import BaseModel
from fastapi import Query
from typing_extensions import Annotated

class Author:
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.cpf = kwargs.get("cpf")
        self.dataNascimento = kwargs.get("dataNascimento")
        self.endereco = kwargs.get("endereco")
        self.numeroAgencia = kwargs.get("numeroAgencia")
        self.numeroConta = kwargs.get("numeroConta")
        self.numeroOperacao = kwargs.get("numeroOperacao")

class CreateAuthorForm(BaseModel):

    cpf: Annotated[str, Query(regex=r"^\d{11}$", examples=["12345678909"])]
    dataNascimento: str
    endereco: str
    numeroAgencia: Annotated[str, Query(regex=r"^\d{4}-\d$", example="1234-5")]
    numeroConta: Annotated[str, Query(regex=r"^\d{8}-\d$", example="12345678-9")]
    numeroOperacao: Annotated[str, Query(regex=r"^\d{3}$", example="123")]

