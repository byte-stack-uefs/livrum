class Customer:
    def __init__(self, **kwargs):
        self.cpf = kwargs.get("cpf")
        self.idUsuario = kwargs.get("idUsuario")
        self.nome = kwargs.get("nome")
        self.email = kwargs.get("email")
        self.telefone = kwargs.get("telefone")
        self.dataNascimento = kwargs.get("dataNascimento")
