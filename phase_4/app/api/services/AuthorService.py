from database.database import DB
from models.author import CreateAuthorForm, Author

class AuthorService:

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
                        author.numeroOperacao
                    ],
                )
            except:
                return e

    def findAuthorByCpf(self, cpf: int) -> Author:

        with DB() as db:
            db.execute("SELECT * FROM autor WHERE cpf = %s", [cpf])
            data = db.fetchone()
        author = None
        if data is not None:
            author = Author(**data)

        return author
        



