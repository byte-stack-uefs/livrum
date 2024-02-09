from enum import Enum
from typing_extensions import Annotated
from fastapi import Query
from pydantic import BaseModel

class Coupon:
    def __init__(self, **kwargs):
        self.idCupom = kwargs.get('idCupom')
        self.nome = kwargs.get('nome')
        self.status= kwargs.get('status')
        self.porcentagem= kwargs.get('porcentagem')
        self.dataExpiracao= kwargs.get('dataExpiracao')
        self.criadoEm= kwargs.get('criadoEm')
        self.modificadoEM= kwargs.get('modificadoEm')
        self.idUsuario= kwargs.get('idUsuario')


class CouponStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"

class CouponDAO:
    def __init__(self, **kwargs):
        self.idCupom = kwargs.get('idCupom')
        self.nome = kwargs.get('nome')
        self.status= kwargs.get('status')
        self.porcentagem= kwargs.get('porcentagem')
        self.dataExpiracao= kwargs.get('dataExpiracao')
        self.idUsuario= kwargs.get('idUsuario')

class CouponDTO(BaseModel):
    idCupom: str
    nome: str
    status: CouponStatus
    porcentagem: float
    dataExpiracao: Annotated[str, Query(pattern=r"^\d{4}-\d{2}$", examples=["2024-12"])]
    idUsuario: str