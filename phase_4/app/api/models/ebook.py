from enum import Enum
from database.database import DB


class Ebook:
    def __init__(self, **kwargs):
        self.idEbook = kwargs.get("idEBook")
        self.idAutor = kwargs.get("idAutor")
        self.nome = kwargs.get("nome")
        self.status: EbookStatus = kwargs.get("status")
        self.preco = kwargs.get("preco")
        self.sinopse = kwargs.get("sinopse")
        self.capa = kwargs.get("capa")
        self.qtdPaginas = kwargs.get("qtdPaginas")
        self.idioma = kwargs.get("idioma")
        self.formato = kwargs.get("formato")
        self.tamanhoEmMB = kwargs.get("tamanhoEmMB")
        self.anoLancamento = kwargs.get("anoLancamento")
        self.motivoRejeicao = kwargs.get("motivoRejeicao")
        self.criadoEm = kwargs.get("criadoEm")
        self.modificadoEm = kwargs.get("modificadoEm")
        self.outrosAutores = kwargs.get("outrosAutores")


class EbookDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idEBook")
        self.author = getAuthor(int(kwargs.get("idAutor")))
        self.title = kwargs.get("nome")
        self.releaseYear = kwargs.get("anoLancamento")
        self.price = kwargs.get("preco")
        if kwargs.get("status") == "active":
            self.isAvailable = True
        else:
            self.isAvailable = False
        self.summary = kwargs.get("sinopse")
        self.cover = kwargs.get("capa")

def getAuthor(authorId):
    with DB() as db:
        query = "SELECT nome FROM usuario WHERE idUsuario = %s"
        db.execute(query, [authorId])
        name = db.fetchone()
    return name['nome']


class EbookStatus(str, Enum):
    PENDING = 'pending'
    ACTIVE = 'active'
    INACTIVE = 'inactive'
    REJECTED = 'rejected'
