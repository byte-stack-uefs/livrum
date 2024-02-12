from database.database import DB
from models.ebook import Ebook, EbookDTO


class CartService:

    def __init__(self, id) -> None:
        self.idUsuario = id

    def getCartEbooksByUserId(self) -> list[Ebook]:

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
            db.execute(query, [self.idUsuario])
            data = db.fetchall()

        ebooks = map(lambda x: EbookDTO(**x), data)
        return list(ebooks)
