from enum import Enum

from database.database import DB

from pydantic import BaseModel
from typing_extensions import Annotated
from fastapi import Query

class Ebook:
    def __init__(self, **kwargs):
        self.idAutor = kwargs.get("idAutor")
        self.idEbook = kwargs.get("idEbook")
        self.nome = kwargs.get("nome")
        self.autor = kwargs.get("autor")
        self.n_paginas: int = kwargs.get("n_paginas")
        self.anoLancamento = kwargs.get("anoLancamento")
        self.criadoEm = kwargs.get("criadoEm")
        self.idioma = kwargs.get("idioma")
        self.sinopse = kwargs.get("sinopse")
        self.img = kwargs.get("img")
        self.tamArqEmMb = kwargs.get("tamArq")
        self.status: EbookStatus = kwargs.get("status")
        self.preco = kwargs.get("preco")
        self.motivoRejeicao = kwargs.get("motivoRejeicao")
        self.modificadoEm = kwargs.get("modificadoEm")
        self.outrosAutores = kwargs.get("outrosAutores")

class EbookModel:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idEBook")
        self.idAuthor = kwargs.get("idAutor")
        self.title = kwargs.get("nome")
        self.author = getAuthor(self.idAuthor)
        self.pages: int = kwargs.get("n_paginas")
        self.createdAt = kwargs.get("criadoEm")
        self.languages = kwargs.get("idioma")
        self.summary: str = kwargs.get("sinopse")
        self.authors = kwargs.get("outrosAutores")
        self.size = kwargs.get("tamArq")
        self.price: float = kwargs.get("preco")
        self.cover = kwargs.get("capa")
        self.releaseYear = kwargs.get("anoLancamento")
        self.status: EbookStatus = kwargs.get("status")
        self.isAvailable: bool = self.status == EbookStatus.ACTIVE

class EbookDTO(BaseModel):
    idEbook: str
    nome: str
    autor: str
    n_paginas: int
    criadoEm: Annotated[str, Query(pattern=r"^\d{4}-\d{2}$", examples=["2024-12"])]
    img: str
    tamArqEmMb: str
    preco: float

class EbookShowupDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idEBook")
        self.author = getAuthor(kwargs.get("idAutor"))
        self.title = kwargs.get("nome")
        self.releaseYear = kwargs.get("anoLancamento")
        self.price = kwargs.get("preco")
        self.isAvailable = True
        self.cover = kwargs.get("capa")
        self.size = kwargs.get("tamanhoEmMB")
        if self.size == None:
            self.size = "-"
        self.pages = kwargs.get("qtdPaginas")
        if self.pages == None:
            self.pages = "-"                    
        self.summary = kwargs.get("sinopse")
        self.format = "PDF"

class CatalogEbookDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idEBook")
        self.author = getAuthor(kwargs.get("idAutor"))
        self.title = kwargs.get("nome")
        self.releaseYear = kwargs.get("anoLancamento")
        self.price = kwargs.get("preco")
        self.isAvailable = True
        self.cover = kwargs.get("capa")

def getAuthor(authorId):
    with DB() as db:
        query = "SELECT nome FROM usuario WHERE idUsuario = %s"
        db.execute(query, [authorId])
        name = db.fetchone()
    return name['nome']

class AuthorEbookDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idEBook")
        self.nome = kwargs.get("nome")
        self.data = format(kwargs.get("criadoEm"), "%d/%m/%Y")
        self.ano_lancamento = kwargs.get("anoLancamento")
        self.preco = kwargs.get("preco")
        self.link_foto = kwargs.get("capa")
        self.status = kwargs.get("status")
        self.qtd_pag = kwargs.get("qtdPaginas")
        self.nome_autor = ""
        self.genero = ""
        self.idioma = kwargs.get("idioma")
        self.sinopse = kwargs.get("sinopse")
        self.motivo_recusa = kwargs.get("motivoRejeicao")

class BestSellerEbookDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idEBook")
        self.name = kwargs.get("nome")
        self.price = kwargs.get("preco")
        self.sold = kwargs.get("qtd_pedido")
        self.revenue = kwargs.get("faturamento")
        self.genres = []

class ReproveEbookDTO(BaseModel):
    id: int
    reason: str

class EbookStatus(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    INACTIVE = "inactive"
    REJECTED = "rejected"
