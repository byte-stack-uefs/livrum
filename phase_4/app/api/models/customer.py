from pydantic import BaseModel, EmailStr, constr

class Customer:
    
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.cpf = kwargs.get("cpf")
        self.dataNascimento = kwargs.get("dataNascimento")
        self.endereco: UserStatus = kwargs.get("endereco")
        self.telefone = kwargs.get("telefone")

    def updateAttributes(self, endereco, telefone):

        if endereco != self.endereco:
            self.endereco = endereco

        if telefone != self.telefone:
            self.telefone = telefone


class CustomerUpdateForm(BaseModel):

    telefone: str
    email: EmailStr
    senha: str
    endereco: str


