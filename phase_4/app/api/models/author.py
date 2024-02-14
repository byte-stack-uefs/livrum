from pydantic import BaseModel
from fastapi import Query
from typing_extensions import Annotated

class Author:
    def __init__():
        pass

class CreateAuthorForm(BaseModel):

    cpf: Annotated[str, Query(regex=r"^\d{11}$", examples=["12345678909"])]
    dataNascimento: str
    endereco: str
    numeroAgencia: Annotated[str, Query(regex=r"^\d{4}-\d$", example="1234-5")]
    numeroConta: Annotated[str, Query(regex=r"^\d{8}-\d$", example="12345678-9")]
    numeroOperacao: Annotated[str, Query(regex=r"^\d{3}$", example="123")]
