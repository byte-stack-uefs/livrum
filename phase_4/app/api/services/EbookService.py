import shutil
from database.database import DB
from models.ebook import Ebook, EbookDAO, EbookDTO

class EbookService:
    def _convertDAO(self, item: dict) -> EbookDAO:
        return EbookDAO(**item)
    
    def addEbook(self, novoEbook:EbookDTO,idAutor, pdf_path: str) -> Ebook:

        with DB() as db:
            try:
                db.execute("INSERT INTO EBook (nome,idAutor,qtdPaginas,anoLancamento,idioma,sinopse,capa,tamanhoEmMB,preco)VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s)", 
                        [novoEbook.nome,idAutor,novoEbook.n_paginas,novoEbook.anoLancamento,novoEbook.idioma,novoEbook.sinopse,novoEbook.img,novoEbook.tamArqEmMb,novoEbook.preco])
                db.commit()
                shutil.copy(pdf_path, f"files/{novoEbook.idEbook}.pdf")

            except:
                return False

        return True

