from database.database import DB
from models.ebook import Ebook, EbookDAO

class EbookService:
    def _convertDAO(self, item: dict) -> EbookDAO:
        return EbookDAO(**item)
    
    def addEbook(self, nome: str, idAutor: str, n_paginas: int ,anoLancamento: int, idioma:str, sinopse: str, img: str,tamArqEmMb: int,preco:float) -> Ebook:

        with DB() as db:
            db.execute("INSERT INTO EBook (nome,idAutor,qtdPaginas,anoLancamento,idioma,sinopse,capa,tamanhoEmMB,preco)VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s)", [nome,idAutor,n_paginas,anoLancamento,idioma,sinopse,img,tamArqEmMb,preco])
            data = db.commit()

        ebook = None
        if data is not None:
            ebook = Ebook(**data)
