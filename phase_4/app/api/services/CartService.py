from database.database import DB
from models.ebook import Ebook, EbookDAO
from typing import List


class CartService:

    def hasUnavailableEbooks(self, ebooks: List[EbookDAO]) -> bool:

        for e in ebooks:
            if e.isAvailable:
                return True
        return False

    def getCartEbooksByUserId(self, id) -> list:

        query = "SELECT \
                    e.*, u.nome AS nomeAutor	 \
                FROM \
                    ebook e \
                JOIN itemcarrinho i ON \
                    i.idEBook = e.idEBook \
                JOIN carrinho c ON \
                    c.idCarrinho = i.idCarrinho \
                JOIN autor a ON a.idUsuario = e.idAutor \
                JOIN usuario u ON a.idUsuario = u.idUsuario \
                WHERE \
                    c.idUsuario = %s;"
        with DB() as db:
            db.execute(query, [id])
            data = db.fetchall()

        ebooks = map(lambda x: EbookDAO(**x), data)
        return list(ebooks)
