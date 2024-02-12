from enum import Enum


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
        self.author: str = kwargs.get("nomeAutor")
        self.otherAuthors: str = kwargs.get("outrosAutores")
        self.title: str = kwargs.get("nome")
        self.releaseYear = kwargs.get("anoLancamento")
        self.price: float = kwargs.get("preco")
        self.status: EbookStatus = kwargs.get("status")
        self.isAvailable: bool = self.status == EbookStatus.ACTIVE
        self.cover: str = kwargs.get("capa")


class EbookStatus(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    INACTIVE = "inactive"
    REJECTED = "rejected"
