from typing import Union
from database.database import DB
from passlib.context import CryptContext
from models.user import User, CreateUserForm, UserStatus, UserType, UserDAO

passwordContext = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
                db.execute("UPDATE usuario SET status = %s WHERE idUsuario = %s ", [t, id])
        except:
            return 


    def addUser(self, user: CreateUserForm):
        try:
            with DB() as db:

                db.execute("INSERT INTO usuario (nome, email, senha, status, tipo) VALUES (%s, %s, %s, %s, %s)", 
                        [user.nome, user.email, get_password_hash(user.senha), str(user.status.value), str(user.tipo.value)])
                
                last_insert_id = db.lastrowid
                return last_insert_id

        except:    
            
            return False

def get_password_hash(plain: str) -> str:
    return passwordContext.hash(plain)