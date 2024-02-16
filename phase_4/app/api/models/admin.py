from pydantic import BaseModel

class Admin:
    def __init__(self, **kwargs) -> None:
        self.supper = kwargs.get("super")
        self.idUsuario = kwargs.get("idUsuario")

class BackToFrontEndAdminDTO:
    def __init__(self, **kwargs) -> None:
        self.super = kwargs.get("super")
        self.idUsuario = kwargs.get("usuario")

class FrontToBackEndAdminDTO(BaseModel):
    super: int
    idUsuario: int
