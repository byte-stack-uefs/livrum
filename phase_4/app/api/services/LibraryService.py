from database.database import DB


class LibraryService:

    def addEbook(self, customerId: int, ebookId: int):

        with DB() as db:
            db.execute(
                "INSERT INTO biblioteca(idCliente, idEBook) VALUES (%s, %s)",
                [customerId, ebookId],
            )
