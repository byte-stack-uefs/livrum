from pathlib import Path
from fastapi.responses import FileResponse
from dao.ebookDAO import EbookDAO
from database.database import DB
from models.ebook import AuthorEbookDTO, Ebook, EbookModel, EbookDTO, ReproveEbookDTO


class EbookService:
    def _convertDAO(self, item: dict) -> EbookModel:
        return EbookModel(**item)

    def addEbook(self, novoEbook: EbookDTO, idAutor) -> Ebook:

        with DB() as db:
            try:
                db.execute(
                    "INSERT INTO EBook (nome,idAutor,qtdPaginas,anoLancamento,idioma,sinopse,capa,tamanhoEmMB,preco)VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s)",
                    [
                        novoEbook.nome,
                        idAutor,
                        novoEbook.n_paginas,
                        novoEbook.anoLancamento,
                        novoEbook.idioma,
                        novoEbook.sinopse,
                        novoEbook.img,
                        novoEbook.tamArqEmMb,
                        novoEbook.preco,
                    ],
                )
                data = db.commit()
            except:
                return False
        return True

    def findEbookByOptionalFilters(
        id=None,
        name=None,
        author=None,
        title=None,
        release_year=None,
        price_min=None,
        price_max=None,
        id_client=None,
    ) -> [EbookDTO]:
        ebooks = []
        try:
            ebooks = EbookDAO.findEbookByOptionalFilters(
                id, name, author, title, release_year, price_min, price_max, id_client
            )
        except Exception as ex:
            print("Erro ao buscar Ebooks", ex)

        return ebooks

    def findAll() -> [AuthorEbookDTO]:
        ebooks = []
        try:
            ebooks = EbookDAO.findAll()
        except Exception as ex:
            print("Erro ao buscar Ebooks", ex)
        return ebooks

    def approveEbook(id):
        try:
            EbookDAO.approveEbook(id)
        except Exception as ex:
            print("Erro ao aprovar Ebook com id:", id, ex)

    def repproveEbook(reproveEbook: ReproveEbookDTO):
        try:
            EbookDAO.repproveEbook(reproveEbook)
        except Exception as ex:
            print("Erro ao reprovar Ebook com id:", id, ex)

    def disableEbook(id):
        try:
            EbookDAO.disableEbook(id)
        except Exception as ex:
            print("Erro ao inativar Ebook com id:", id, ex)

    def getEbookById(id):
        try:
            return EbookDAO.getEbookById(id)
        except Exception as ex:
            print("Erro ao aprovar Ebook com id:", id, ex)

    def downloadEbook(id: int):
        file_path = Path(f"files/{id}.pdf")
        if file_path.is_file():
            return FileResponse(file_path, filename=id + ".pdf")
        return None

    def getBestSellers(id = None):
        try:
            return EbookDAO.getBestSellers(id)
        except Exception as ex:
            print("Erro ao buscar Ebooks para Autor com id:", id, ex)

    def getMoreViewedEbooks(self):

        with DB() as db:

            db.execute(
                "SELECT * FROM ebook WHERE status = 'active' ORDER BY visto DESC LIMIT 10"
            )
            data = db.fetchall()

        if data is not None:
            return list([EbookModel(**x) for x in data])

        return []

    def getNewerEbooks(self):
        with DB() as db:

            db.execute(
                "SELECT * FROM ebook WHERE criadoEm > DATE_SUB(NOW(), INTERVAL 1 MONTH) AND status = 'active' LIMIT 10"
            )
            data = db.fetchall()

        if data is not None:
            return list([EbookModel(**x) for x in data])

        return []

    def getMostBuyed(self):

        with DB() as db:

            db.execute(
                "SELECT \
                    e.*, \
                    COUNT(e.idEBook) AS c \
                FROM \
                    ebook e \
                JOIN itempedido i ON \
                    i.idEBook = e.idEBook \
                JOIN pedido p ON \
                    p.idPedido = i.idPedido \
                WHERE \
                    p.status = 'approved' \
                    AND e.status = 'active' \
                GROUP BY \
                    e.idEBook \
                ORDER BY \
                    c DESC \
                LIMIT 10"
            )

            data = db.fetchall()

        if data is not None:
            return list([EbookModel(**x) for x in data])
        return []

    def getSimilarEbooks(self, idEbook):

        with DB() as db:

            db.execute("SELECT idAutor FROM ebook WHERE idEBook = %s", [idEbook])
            idAutor = db.fetchone()["idAutor"]

            db.execute(
                "SELECT \
                    * \
                FROM \
                    ebook e \
                WHERE \
                    e.status = 'active' \
                    AND e.idEBook != %s \
                    AND e.idAutor = %s",
                [idEbook, idAutor],
            )

            data = db.fetchall()
            if data is not None:
                return list([EbookModel(**x) for x in data])

        return []
