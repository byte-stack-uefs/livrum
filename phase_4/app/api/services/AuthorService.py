from database.database import DB
from models.author import CreateAuthorForm

class AuthorService:

    def addAuthor(self, author: CreateAuthorForm, idUser):

        with DB() as db:
            try:
                db.execute(
                    "INSERT INTO autor (idUsuario, cpf, dataNascimento, endereco, numeroAgencia, numeroConta, numeroOperacao) VALUES (%s, %s, %s, %s, %s)",
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
                return False

        return True



