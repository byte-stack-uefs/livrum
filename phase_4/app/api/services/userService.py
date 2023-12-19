from models.user import User
from database.database import DB


class UserService:
    def findUserByEmail(self, email: str) -> User:
        """
        Function that find a user by its email

        Parameters:
            email (str): User's email

        Returns:
            User: The user

        """

        with DB() as db:
            db.execute("SELECT * FROM Usuario WHERE email = %s", [email])
            data = db.fetchone()

        user = None
        if data is not None:
            user = User(**data)

        return user

    def findUserById(self, id: int) -> User:
        with DB() as db:
            db.execute("SELECT * FROM Usuario WHERE idUsuario = %s", [id])
            data = db.fetchone()

        user = None
        if data is not None:
            user = User(**data)

        return user
