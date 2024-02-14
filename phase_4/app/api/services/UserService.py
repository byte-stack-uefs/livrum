from typing import Union
from database.database import DB
from models.user import User, CreateUserForm, UserStatus, UserType, UserDAO


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
   
   
    def changeStatus(id, t: UserStatus):
        try:
            with DB() as db:
                db.execute("UPDATE usuario SET status = %s WHERE idUsuario = %s "[t, id])
                return "Status Change"
        except:
            return 

            

    def addUser(user: CreateUserForm):
        try:
            with DB() as db:

                db.execute("INSERT INTO usuario (nome, email, senha, status, tipo) VALUES (%s, %s, %s, %s, %s)", 
                        [user.name, user.email, user.password, user.status, user.type])
                
                last_insert_id = db.lastrowid
                return last_inser_id

        except Exception as e:      
            print("Erro durante a criação do usuário:", e)
            db.rollback()
            return False