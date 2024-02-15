from database.database import DB
from models.cart import Cart, CartDTO
from models.cartItem import CartItemDTO
from models.ebook import Ebook, EbookModel


class CartService:

    def createCart(self, idUsuario: int) -> Cart:
        with DB() as db:

            db.execute("INSERT INTO carrinho(idUsuario) VALUES(%s)", [idUsuario])
            id = db.lastrowid
            return Cart(idUsuario=idUsuario, idCarrinho=id)

    def _convertDTOCart(self, item: dict) -> CartDTO:
        return CartDTO(**item)

    def _convertDTOCartItem(self, item: dict) -> CartItemDTO:
        return CartItemDTO(**item)

    def getCartByClientId(self, idUsuario: int) -> Cart:

        cart = None

        with DB() as db:
            db.execute("SELECT * FROM carrinho WHERE idUsuario = %s", [idUsuario])
            data = db.fetchone()

        if data is not None:
            cart = Cart(**data)

        return cart

    def getAllCartItemsIDByCartId(self, idUsuario: int) -> list[CartItemDTO]:
        cart = self.getCartByClientId(idUsuario)
        if cart is None:
            return []
        with DB() as db:
            db.execute(
                "SELECT itemcarrinho.idCarrinho, itemcarrinho.idEbook, ebook.nome, ebook.capa, ebook.preco FROM itemcarrinho JOIN ebook ON itemcarrinho.idEbook = ebook.idEbook WHERE itemcarrinho.idCarrinho = %s;",
                [cart.idCart],
            )
            data_list = db.fetchall()

        items = map(self._convertDTOCartItem, data_list)
        return list(items)

    def deleteCart(self, idCart: int):
        with DB() as db:
            try:
                db.execute("DELETE FROM carrinho WHERE idCarrinho = %s", (idCart))
            except:
                return False

            return True

    def addCartItem(self, idCart: int, idEbook: int):
        with DB() as db:
            try:
                db.execute(
                    "INSERT INTO itemcarrinho (idCarrinho, idEbook) VALUES (%s, %s)",
                    [idCart, idEbook],
                )
            except Exception as e:
                return False

        return True

    def removeCartItem(self, idCart: int, idEbook: int):
        with DB() as db:
            try:
                db.execute(
                    "DELETE FROM itemcarrinho WHERE idCarrinho = %s AND idEbook = %s",
                    [idCart, idEbook],
                )
            except:
                return False
            return True

    def removeAllCartItems(self, idCart: int):
        with DB() as db:
            try:
                db.execute("DELETE FROM itemcarrinho WHERE idCarrinho = %s", [idCart])
            except:
                return False
            return True

    def hasUnavailableEbooks(self, ebooks: list[EbookModel]) -> bool:

        for e in ebooks:
            if not e.isAvailable:
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

        ebooks = map(lambda x: EbookModel(**x), data)
        return list(ebooks)
