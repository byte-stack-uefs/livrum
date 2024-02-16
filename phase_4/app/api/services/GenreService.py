from database.database import DB
from models.genre import Genre


class GenreService:

    def getAllGenres(self):

        with DB() as db:

            db.execute("SELECT * FROM genero")
            data = db.fetchall()

        if data is not None:
            return list([Genre(**x) for x in data])

        return []
