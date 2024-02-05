from pydantic import BaseModel, EmailStr, constr

class Costumer:
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.cpf = kwargs.get("cpf")
        self.dataNascimento = kwargs.get("dataNascimento")
        self.endereco: UserStatus = kwargs.get("endereco")
        self.telefone = kwargs.get("telefone")

class CustomerUpdateForm(BaseModel):

    telefone: constr(regex=r'^\(\d{2}\)\s\d{4,5}-\d{4}$')  # Máscara para telefone (ex: (99) 12345-6789)
    email: EmailStr
    senha: constr(min_length=8)  # Exemplo mínimo de comprimento da senha
    endereco: str


