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

    def getUsersByType(self, t: UserType) -> list[UserDAO]:
        data = []

        with DB() as db:
            db.execute("SELECT * FROM usuario WHERE tipo = %s", [t.value])
            data = db.fetchall()

        data = map(self._convertDAO, data)
        return list(data)
    def recoverPass(email: str, newPass: str):
        with DB() as db:
            try:
               db.execute("UPDATE usuario SET senha = %s WHERE email = %s",(newPass, email))
            except:
                return False

            return True
            
        