from database.database import DB
from models.author import AuthorQntDataForm

class AuthorService:
    
    def _convertAutorQntDataForm(self, item: dict) -> AuthorQntDataForm:
        return AuthorQntDataForm(**item)

    def getFaturamentoAutor(self, idAutor):
        with DB() as db:
            db.execute(
                "SELECT SUM(ip.valorTotal) AS total_valor \
                FROM pedido p \
                JOIN itempedido ip ON p.idPedido = ip.idPedido \
                JOIN ebook e ON ip.idEbook = e.idEbook \
                WHERE p.status = 'approved' AND e.idAutor = %s;", [idAutor]
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
        
        faturamento_mensal_autor= map(self._convertAutorQntDataForm, data_list)
        return faturamento_mensal_autor
    
    def getTotalUnidadesVendidasMes(self, mes: int, idAutor=None):
        if idAutor is not None:
            with DB() as db:
                db.execute(
                    "SELECT e.idAutor, COUNT(*) AS total_registros \
                    FROM pedido p \
                    JOIN itempedido ip ON p.idPedido = ip.idPedido \
                    JOIN ebook e ON ip.idEbook = e.idEbook \
                    WHERE p.status = 'approved' AND e.idAutor = %s AND MONTH(p.data) = %s \
                    GROUP BY e.idAutor;", [idAutor, mes]
                )
                data_list = db.fetchone() 
        else:
            with DB() as db:
                db.execute(
                    "SELECT e.idAutor, COUNT(*) AS total_registros \
                    FROM pedido p \
                    JOIN itempedido ip ON p.idPedido = ip.idPedido \
                    JOIN ebook e ON ip.idEbook = e.idEbook \
                    WHERE p.status = 'approved' AND MONTH(p.data) = %s \
                    GROUP BY e.idAutor;", [mes]
                )
                data_list = db.fetchall() 

        unidades_vendidas_mes = map(self._convertAutorQntDataForm, data_list)
        return unidades_vendidas_mes

    def getTotalObrasCriadasMes(self, mes: int, idAutor=None):
        if idAutor is not None:
            with DB() as db:
                db.execute(
                    "SELECT idAutor, COUNT(*) AS total_registros \
                    FROM Ebook \
                    WHERE idAutor = %s AND MONTH(criadoEm) = %s \
                    GROUP BY idAutor;", [idAutor, mes]
                )
                data_list = db.fetchone() 
        
        else:
            with DB() as db:
                db.execute(
                    "SELECT idAutor, COUNT(*) AS total_registros \
                    FROM Ebook \
                    WHERE MONTH(criadoEm) = %s \
                    GROUP BY idAutor;", [mes]
                )
                data_list = db.fetchall() 
        
        obras_criadas_mes = map(self._convertAutorQntDataForm, data_list)
        return obras_criadas_mes
