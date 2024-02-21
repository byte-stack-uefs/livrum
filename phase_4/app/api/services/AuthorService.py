from database.database import DB
from models.author import AuthorQntDataForm
from models.author import CreateAuthorForm, Author


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
                WHERE p.status = 'approved' AND e.idAutor = %s;",
                [idAutor],
            )
            faturamento_total = db.fetchone()

        return faturamento_total

    def getFaturamentoMensalAutor(self, mes: int, ano: int, idAutor=None):
        if idAutor is not None:
            with DB() as db:
                db.execute(
                    "SELECT e.idAutor, SUM(ip.valorTotal) AS total_valor \
                    FROM pedido p JOIN itempedido ip ON p.idPedido = ip.idPedido \
                    JOIN ebook e ON ip.idEbook = e.idEbook \
                    WHERE p.status = 'approved' AND e.idAutor = %s AND MONTH(p.data) = %s AND YEAR(p.data) = %s \
                    GROUP BY e.idAutor;",
                    [idAutor, mes, ano],
                )
                d = db.fetchone()
                data_list = [] if d is None else [d]
        else:
            # listagem de faturamento de todos os autores
            with DB() as db:
                db.execute(
                    "SELECT e.idAutor, SUM(ip.valorTotal) AS total_valor \
                    FROM pedido p JOIN itempedido ip ON p.idPedido = ip.idPedido \
                    JOIN ebook e ON ip.idEbook = e.idEbook \
                    WHERE p.status = 'approved' AND MONTH(p.data) = %s AND YEAR(p.data) = %s \
                    GROUP BY e.idAutor;",
                    [mes, ano],
                )
                data_list = db.fetchall()
        return data_list

    def getTotalUnidadesVendidasMes(self, mes: int, ano: int, idAutor=None):
        if idAutor is not None:
            with DB() as db:
                db.execute(
                    "SELECT e.idAutor, COUNT(*) AS total_registros \
                    FROM pedido p \
                    JOIN itempedido ip ON p.idPedido = ip.idPedido \
                    JOIN ebook e ON ip.idEbook = e.idEbook \
                    WHERE p.status = 'approved' AND e.idAutor = %s AND MONTH(p.data) = %s AND YEAR(p.data) = %s \
                    GROUP BY e.idAutor;",
                    [idAutor, mes, ano],
                )
                d = db.fetchone()
                data_list = [] if d is None else [d]
        else:
            with DB() as db:
                db.execute(
                    "SELECT e.idAutor, COUNT(*) AS total_registros \
                    FROM pedido p \
                    JOIN itempedido ip ON p.idPedido = ip.idPedido \
                    JOIN ebook e ON ip.idEbook = e.idEbook \
                    WHERE p.status = 'approved' AND MONTH(p.data) = %s AND YEAR(p.data) = %s \
                    GROUP BY e.idAutor;",
                    [mes, ano],
                )
                data_list = db.fetchall()

        return data_list

    def getTotalObrasCriadasMes(self, mes: int, ano: int, idAutor=None):
        if idAutor is not None:
            with DB() as db:
                db.execute(
                    "SELECT idAutor, COUNT(*) AS total_registros \
                    FROM ebook \
                    WHERE idAutor = %s AND MONTH(criadoEm) = %s AND YEAR(criadoEm) = %s \
                    GROUP BY idAutor;",
                    [idAutor, mes, ano],
                )
                d = db.fetchone()
                data_list = [] if d is None else [d]

        else:
            with DB() as db:
                db.execute(
                    "SELECT idAutor, COUNT(*) AS total_registros \
                    FROM ebook \
                    WHERE MONTH(criadoEm) = %s AND YEAR(criadoEm) = %s \
                    GROUP BY idAutor;",
                    [mes, ano],
                )
                data_list = db.fetchall()

        return data_list

    def addAuthor(self, author: CreateAuthorForm, idUser):

        with DB() as db:
            try:
                db.execute(
                    "INSERT INTO autor (idUsuario, cpf, dataNascimento, endereco, numeroAgencia, numeroConta, numeroOperacao) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    [
                        idUser,
                        author.cpf,
                        author.dataNascimento,
                        author.endereco,
                        author.numeroAgencia,
                        author.numeroConta,
                        author.numeroOperacao,
                    ],
                )
                return True
            except:
                return False

    def findAuthorByCpf(self, cpf: int) -> Author:

        with DB() as db:
            db.execute("SELECT * FROM autor WHERE cpf = %s", [cpf])
            data = db.fetchone()
        author = None
        if data is not None:
            author = Author(**data)

        return author
