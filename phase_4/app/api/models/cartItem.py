from pydantic import BaseModel


class CartItem:
    def __init__(self, **kwargs):
        self.idCart = kwargs.get("idCarrinho")
        self.id = kwargs.get("idEbook")


class CartItemDTO:
    def __init__(self, **kwargs):
        self.idCart = kwargs.get("idCarrinho")
        self.id = kwargs.get("idEbook")
        self.title = kwargs.get("nome")
        self.cover = kwargs.get("capa")
        self.price = kwargs.get("preco")
        self.isAvailable = kwargs.get("status") == "active"
        self.idAuthor = kwargs.get("idAutor")
        self.author = kwargs.get("nomeAutor")


class CartItemForm(BaseModel):
    id: int
