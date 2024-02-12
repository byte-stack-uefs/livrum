from database.database import DB
from models.cart import Cart, CartDTO
from models.cartItem import CartItemDTO, CartItemForm

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
        self, idUsuario: int
    ) -> list[CartItemForm]:
        cart = self.getCartByClientId(idUsuario)
        with DB() as db:
            db.execute("SELECT itemcarrinho.idCarrinho, itemcarrinho.idEbook, ebook.nome, ebook.capa, ebook.preco FROM itemcarrinho, ebook WHERE itemcarrinho.idCarrinho = %s", [cart.idCart])
            data_list = db.fetchall()

        items = map(self._convertDTOCartItem, data_list)
        return list(items)

    # def getCartByCartId(self, idCart: int) -> Cart:
    #     with DB() as db:
    #         db.execute("SELECT * FROM carrinho WHERE idCarrinho = %s", [idCart])
    #         data = db.fetchone()

    #     cart = None
    #     if data is not None:
    #         cart = Cart(**data)

    #     return cart

    def deleteCart(self, idCart: int, idUsuario: int):
        with DB() as db:
            try:
                db.execute(
                    "DELETE FROM carrinho WHERE idCarrinho = %s AND idUsuario = %s",
                    (idCart, idUsuario)
                )
            except:
                return False

            return True

    def addCartItem(self, idCart: int, idEbook: int):
        with DB() as db:
            try:
                db.execute(
                    "INSERT INTO itemcarrinho (idCarrinho, idEbook) VALUES (%s, %s)",
                    [idCart, idEbook]
                )
            except:
                return False

        return True
    
    def removeCartItem(self, idCart: int, idEbook: int):
        with DB() as db:
            try:
                db.execute(
                    "DELETE FROM itemcarrinho WHERE idCarrinho = %s AND idEbook = %s",
                    [idCart, idEbook])                
            except:
                return False
            return True
        
    def removeAllCartItems(self, idCart: int, idUsuario: int):
        with DB() as db:
            try:
                db.execute(
                    "DELETE FROM itemcarrinho WHERE idCarrinho = %s", idCart)
                self.deleteCart()
            except:
                return False
            return True
            


