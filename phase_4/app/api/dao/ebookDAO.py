from models.ebook import AuthorEbookDTO, Ebook, EbookDTO, EbookStatus, ReproveEbookDTO
from database.database import DB

class EbookDAO:
    def findEbookByOptionalFilters(id = None, name = None, author = None, title = None, release_year = None, price_min = None, price_max = None, id_client = None) -> [EbookDTO]:
        ebooks = []
        with DB() as db:
            consulta = "SELECT * FROM Ebook WHERE 1 = 1"
            valores = []
            if id is not None:
                consulta += " AND idEBook = %s"
                valores.append(id)
            if name is not None:
                consulta += " AND nome like %s"
                valores.append(f"%{name}%")
            if author is not None:
                db.execute("SELECT idUsuario FROM Usuario WHERE nome like %s", [f"%{author}%"])
                autor = db.fetchone()
                if not autor: pass
                consulta += " AND idAutor = %s"
                valores.append(autor['idUsuario'])
            if title is not None:
                consulta += " AND nome like %s"
                valores.append(f"%{title}%")
            if release_year is not None:
                consulta += " AND anoLancamento <= %s"
                valores.append(release_year)
            if price_min is not None:
                consulta += " AND preco >= %s"
                valores.append(price_min)
            if price_max is not None:
                consulta += " AND preco <= %s"
                valores.append(price_max)
            db.execute(consulta, valores)
            data = db.fetchall()

            for ebook in data:
                ebookDTO = EbookDTO(**ebook)
                ebooks.append(ebookDTO)

                if id_client is not None:
                    db.execute("SELECT * FROM Biblioteca WHERE idCliente = %s and idEBook = %s", [id_client, ebookDTO.id])
                    response = db.fetchone()
                    ebookDTO.isAvailable = response is None


        return ebooks

    def findAll() -> [AuthorEbookDTO]:
        ebooks = []
        with DB() as db:
            consulta = "SELECT * FROM Ebook"
            db.execute(consulta)
            data = db.fetchall()
            for ebook in data:
                ebookDTO = Ebook(**ebook)
                db.execute("SELECT * FROM usuario WHERE idUsuario = %s", [ebookDTO.idAutor])
                usuario = db.fetchone()
                ebookDTO = AuthorEbookDTO(**ebook)
                ebookDTO.nome_autor = usuario['nome']

                # Obter informações sobre os gêneros do eBook
                db.execute("""
                    SELECT genero.nome
                    FROM genero
                    INNER JOIN generoebook ON genero.idGenero = generoebook.idGenero
                    INNER JOIN ebook ON generoebook.idEBook = ebook.idEBook
                    WHERE generoebook.idEBook = %s
                """, [ebookDTO.id])
                generos = db.fetchall()
                ebookDTO.genero = [genero['nome'] for genero in generos]
                ebooks.append(ebookDTO)
        return ebooks
    
    def approveEbook(id):
        with DB() as db:
            update = "UPDATE Ebook SET status = %s where idEBook = %s"
            db.execute(update, [EbookStatus.ACTIVE, id])
    
    def repproveEbook(reproveEbook: ReproveEbookDTO):
        with DB() as db:
            update = "UPDATE Ebook SET status = %s, motivoRejeicao=%s where idEBook = %s"
            db.execute(update, [EbookStatus.REJECTED, reproveEbook.reason, str(reproveEbook.id)])

    def disableEbook(id):
        with DB() as db:
            update = "UPDATE Ebook SET status = %s where idEBook = %s"
            db.execute(update, [EbookStatus.INACTIVE, id])