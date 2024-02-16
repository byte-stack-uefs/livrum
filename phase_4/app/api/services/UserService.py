from database.database import DB
from models.user import User, UserType, UserDAO


class UserService:
    def _convertDAO(self, item: dict) -> UserDAO:
        return UserDAO(**item)

    def findUserByEmail(self, email: str) -> User:
        """
        Function that find a user by its email

        Parameters:
            email (str): User's email

        Returns:
            User: The user

        """

        with DB() as db:
            db.execute("SELECT * FROM usuario WHERE email = %s", [email])
            data = db.fetchone()

        user = None
        if data is not None:
            user = User(**data)

        return user

    def findUserById(self, id: int) -> User:
        with DB() as db:
            db.execute("SELECT * FROM usuario WHERE idUsuario = %s", [id])
            data = db.fetchone()

        user = None
        if data is not None:
            user = User(**data)

        return user

    def getAllAdmins(self):
        query = "SELECT *, u.nome AS name FROM usuario u JOIN administrador a ON a.idUsuario = u.idUsuario"
        data = None
        with DB() as db:

            db.execute(query)
            data = db.fetchall()

        if data is not None:
            return list([x for x in data])
        return []

    def getAllAuthors(self):
        query = "SELECT *, u.nome AS name FROM usuario u JOIN autor a ON a.idUsuario = u.idUsuario"
        data = None
        with DB() as db:

            db.execute(query)
            data = db.fetchall()

        if data is not None:
            return list([x for x in data])
        return []

    def getAllCustomers(self):

        query = "SELECT *, u.nome AS name FROM usuario u JOIN cliente c ON c.idUsuario = u.idUsuario"
        data = None
        with DB() as db:

            db.execute(query)
            data = db.fetchall()

        if data is not None:
            return list([x for x in data])
        return []

    def getUsersByType(self, t: UserType) -> list[UserDAO]:
        data = []

        with DB() as db:
            db.execute("SELECT * FROM usuario WHERE tipo = %s", [t.value])
            data = db.fetchall()

        data = map(self._convertDAO, data)
        return list(data)
