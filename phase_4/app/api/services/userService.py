from models.user import User, UserType
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

        user = User(**data)

        return user

    def findUserById(self, id: int) -> User:
        data = {
            "id": id,
            "email": "livrum@gmail.com",
            "password": "$2b$12$/uXiY1UbHqSOLkA.g.fI3.DNYVGO98OIDmBZqLbHlsqAOVlbLbbBO",
            "status": "active",
            "name": "Almir Neto",
            "type": UserType.ADMIN,
        }

        user = User(**data)

        return user
