from database.database import DB
from models.cart import Cart, CartDTO
from models.cartItem import CartItemDTO, CartItemForm, EbookCartItemForm
from models.user import User, UserType, UserDAO

class CartService():
    def _convertDTOCart(self, item: dict) -> CartDTO:
        return CartDTO(**item)
    
    def _convertDTOCartItem(self, item: dict) -> CartItemDTO:
        return CartItemDTO(**item)

    def getCartByClientId(
        self, idUsuario: int
    ) -> Cart:

        cart = None

        with DB() as db:
            db.execute("SELECT * FROM carrinho WHERE idUsuario = %s", [idUsuario])
            data = db.fetchone()

        if data is not None:
            cart = Cart(**data)

        return cart

    def getAllCartItemsIDByCartId(
        self, idCart: int
    ) -> list[CartItemForm]:
        items_ids = []
        ebooks = []

        with DB() as db:
            db.execute("SELECT * FROM itemcarrinho WHERE idCarrinho = %s", [idCart])
            #items_ids.append(db.fetchall())
            data_list = db.fetchall()

        items_ids = map(self._convertDTO, data_list)
        return list(items_ids)

    def getCartByCartId(self, idCart: int) -> Cart:
        with DB() as db:
            db.execute("SELECT * FROM carrinho WHERE idCarrinho = %s", [idCart])
            data = db.fetchone()

        cart = None
        if data is not None:
            cart = Cart(**data)

        return cart

    def deleteCartById(self, idCart: int, idUsuario: int):
        with DB() as db:
            try:
                db.execute(
                    "DELETE FROM carrinho WHERE idCarrinho = %s AND idUsuario = %s",
                    (idCart, idUsuario),
                )
            except:
                return False

            return True

    def addCreditCard(self, CartDTO: FrontToBackEndCreditCardDTO, idClient):
        creditCardDTO.expiryDate = creditCardDTO.expiryDate + "-01"

        with DB() as db:
            try:
                db.execute(
                    "INSERT INTO cartao (token, nomeImpresso, numero, cvv, dataVencimento, idCliente) VALUES (%s, %s, %s, %s, %s, %s)",
                    [
                        creditCardDTO.token,
                        creditCardDTO.namePrinted,
                        creditCardDTO.cardNumber,
                        creditCardDTO.cvv,
                        creditCardDTO.expiryDate,
                        idClient,
                    ],
                )
            except:
                return False

        return True


