from pydantic import BaseModel

class CartItem:
    def __init__(self, **kwargs):
        self.idCart = kwargs.get("idCarrinho")
        self.idEbook = kwargs.get("idEbook")

class CartItemDTO:
    def __init__(self, **kwargs):
        self.idCart = kwargs.get("idCarrinho")
        self.idEbook = kwargs.get("idEbook")
        self.title = kwargs.get("nome")
        self.cover = kwargs.get("capa")
        self.author = ""
        self.price = kwargs.get("preco")

class CartItemForm(BaseModel):
    idEbook: int

# class EbookCartItemForm(BaseModel):
#     id: int;
#     title: str;
#     cover: str;
#     author: str;
#     price: int;