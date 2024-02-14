from pydantic import BaseModel
from fastapi import Query
from typing_extensions import Annotated
from datetime import date

class Customer:
    def __init__():
        pass

class CreateCustomerForm(BaseModel):

    cpf: Annotated[str, Query(regex=r"^\d{11}$", examples=["12345678909"])]
    dataNascimento: str
    endereco: str
    telefone: Annotated[str, Query(regex=r"^\(\d{2}\) 9\d{4}-\d{4}$", examples=["(12) 91234-5678"])]
