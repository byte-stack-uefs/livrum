from database.database import DB
from models.ebook import Ebook, EbookDAO, EbookDTO

class EbookService:
    def _convertDAO(self, item: dict) -> EbookDAO:
        return EbookDAO(**item)
    
    def addEbook(self, novoEbook:EbookDTO,idAutor) -> Ebook:
        with DB() as db:
            try:
                db.execute("INSERT INTO EBook (nome,idAutor,qtdPaginas,anoLancamento,idioma,sinopse,capa,tamanhoEmMB,preco)VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s)", 
                        [novoEbook.nome,idAutor,novoEbook.n_paginas,novoEbook.anoLancamento,novoEbook.idioma,novoEbook.sinopse,novoEbook.img,novoEbook.tamArqEmMb,novoEbook.preco])
                data = db.commit()
            except:
                return False
        return True

