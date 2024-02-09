class Ebook:
    class Ebook:
     def __init__(self, **kwargs):
        self.idAutor = kwargs.get("idAutor")
        self.idEbook = kwargs.get("idEbook")
        self.nome = kwargs.get("nome")
        self.autor = kwargs.get("autor")
        self.n_paginas:kwargs.get("n_paginas")
        self.anoLancamento:kwargs.get('anoLancamento')
        self.criadoEm = kwargs.get("criadoEm")
        self.idioma= kwargs.get("idioma")
        self.sinopse= kwargs.get('sinopse')
        self.img= kwargs.get('img')
        self.tamArqEmMb= kwargs.get('tamArq')
        self.status: EbookStatus = kwargs.get('status')
        self.preco= kwargs.get('preco')
        self.motivoRejeicao= kwargs.get('motivoRejeicao')
        self.modificadoEm= kwargs.get('modificadoEm')
        self.outrosAutores= kwargs.get('outrosAutores')

class EbookStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"


class EbookDAO:
    def __init__(self, **kwargs):
        self.idEbook = kwargs.get("idEbook")
        self.nome = kwargs.get("nome")
        self.autor = kwargs.get("autor")
        self.n_paginas:kwargs.get("n_paginas")
        self.criadoEm = kwargs.get("criadoEm")
        self.idioma= kwargs.get("idioma")
        self.sinopse= kwargs.get('sinopse')
        self.img= kwargs.get('img')
        self.tamArqEmMb= kwargs.get('tamArq')
        self.preco= kwargs.get('preco')


class EbookDTO(BaseModel):
    idEbook: str
    nome: str
    autor: str
    n_paginas: int
    criadoEm = Annotated[str, Query(pattern=r"^\d{4}-\d{2}$", examples=["2024-12"])]
    img: str
    tamArqEmMb: str   
    preco: float