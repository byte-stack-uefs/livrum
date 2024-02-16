from pydantic import BaseModel, EmailStr
from datetime import date
from fastapi import Query
from typing_extensions import Annotated
from models.user import UserType, UserStatus
from typing import Optional, Type


class PartialFormBase(BaseModel):
    @classmethod
    def updateOriginalByPartial(cls, original_instance, partial_instance):
        for key, value in partial_instance.dict().items():
            if value is not None and getattr(original_instance, key) != getattr(
                partial_instance, key
            ):
                print(
                    f"Atributo: {key}, Valor na instância original: {getattr(original_instance, key)}, Valor na instância parcial: {value}"
                )
                setattr(original_instance, key, value)


class PartialUserForm(PartialFormBase):
    nome: Optional[str] = None
    email: Optional[EmailStr] = None
    status: Optional[UserStatus] = None
    senha: Optional[str] = None
    tipo: Optional[UserType] = None


class PartialCustomerForm(PartialFormBase):
    cpf: Optional[
        Annotated[str, Query(regex=r"^\d{11}$", examples=["12345678909"])]
    ] = None
    dataNascimento: Optional[date] = None
    endereco: Optional[str] = None
    telefone: Optional[
        Annotated[str, Query(regex=r"^\d{11}", examples=["(12) 91234-5678"])]
    ] = None
