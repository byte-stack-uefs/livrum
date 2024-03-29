from pydantic import BaseModel
from typing_extensions import Annotated

class Cart:
    def __init__(self, **kwargs):
        self.idCart = kwargs.get("idCarrinho")
        self.idUsuario = kwargs.get("idUsuario")


class CartDTO:
    def __init__(self, **kwargs):
        self.idCart = kwargs.get("idCarrinho")
        self.idUsuario = kwargs.get("idUsuario")

class CartForm(BaseModel):
    id: int
