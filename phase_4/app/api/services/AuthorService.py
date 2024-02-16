from database.database import DB
from models.author import AuthorQntDataForm

class AuthorService:
    
    def _convertAutorDataForm(self, item: dict) -> AuthorQntDataForm:
        return AuthorQntDataForm(**item)

    def getFaturamentoAutor(self, idAutor):
        with DB() as db:
            db.execute(
                "SELECT SUM(ip.valorTotal) AS total_valor FROM pedido p JOIN itempedido ip ON p.idPedido = ip.idPedido JOIN ebook e ON ip.idEbook = e.idEbook WHERE p.status = 'approved' AND e.idAutor = %s;", [idAutor]
            )
            faturamento_total = db.fetchone() 
            
        return faturamento_total
    
    def getFaturamentoMensalAutor(self, mes: int, idAutor=None) -> list[AuthorQntDataForm]:
        if idAutor is not None:
            with DB() as db:
                db.execute(
                    "SELECT e.idAutor, SUM(ip.valorTotal) AS total_valor \
                    FROM pedido p JOIN itempedido ip ON p.idPedido = ip.idPedido \
                    JOIN ebook e ON ip.idEbook = e.idEbook \
                    WHERE p.status = 'approved' AND e.idAutor = %s AND MONTH(p.data) = %s \
                    GROUP BY e.idAutor;", [idAutor, mes]
                )
                data_list = db.fetchone() 
                faturamento_mensal_autor= map(self._convertAutorDataForm, data_list)
            return faturamento_mensal_autor
        else:
            #listagem de faturamento de todos os autores
            with DB() as db:
                db.execute(
                    "SELECT e.idAutor, SUM(ip.valorTotal) AS total_valor \
                    FROM pedido p JOIN itempedido ip ON p.idPedido = ip.idPedido \
                    JOIN ebook e ON ip.idEbook = e.idEbook \
                    WHERE p.status = 'approved' AND MONTH(p.data) = %s \
                    GROUP BY e.idAutor;", [mes]
                )
                data_list = db.fetchall() 
                faturamento_mensal_todos= map(self._convertAutorDataForm, data_list)
            return faturamento_mensal_todos