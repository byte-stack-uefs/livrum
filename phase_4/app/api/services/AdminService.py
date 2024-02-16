from database.database import DB
from typing import List
from models.admin import (
    Admin,
    BackToFrontEndAdminDTO,
    FrontToBackEndAdminDTO
)
from models.user import UserStatus

class AdminService:
    def _convertDTOFront(self, item: dict) -> BackToFrontEndAdminDTO:
        return BackToFrontEndAdminDTO(**item)

    # Parte de gerenciamento de clientes aqui

    # Pega os dados dos usuarios de cada admin, cliente ou autor
    # na forma de lista de dicionários
    # Devolve um array de dicionarios contendo as informacoes completas
    # do autor, cliente ou admin
    def _getUsersData(childrens_data):
        allData = []
        with DB() as db:
            for child in childrens_data:
                db.execute("SELECT * FROM usuario WHERE idUsuario = %s", [child['idUsuario']])
                user_child_data = db.fetchall()
                all_user_data = {**child, **user_child_data[0]}
                allData.append(all_user_data)
        return allData

    def getAllCustomers():
        allClients = []
        with DB() as db:
            db.execute("SELECT * FROM cliente")
            client_data_list = db.fetchall()
        with DB() as db:
            for client in client_data_list:
                db.execute("SELECT * FROM usuario WHERE idUsuario = %s", [client["idUsuario"]])
                user_client_data = db.fetchall()
                del user_client_data[0]['senha']
                all_user_data = {**client, **user_client_data[0]}
                allClients.append(all_user_data)
        return allClients

    def getAllAdmins() -> list[BackToFrontEndAdminDTO]:
        allAdmins = []
        with DB() as db:
            db.execute("SELECT * FROM administrador")
            admin_data_list = db.fetchall()
        with DB() as db:
            for admin in admin_data_list:
                db.execute("SELECT * FROM usuario WHERE idUsuario = %s", [admin["idUsuario"]])
                user_client_data = db.fetchall()
                del user_client_data[0]['senha']
                all_user_data = {**admin, **user_client_data[0]}
                allAdmins.append(all_user_data)
        return allAdmins

    def getAllAuthors():
        allAuthors = []
        with DB() as db:
            db.execute("SELECT * FROM autor")
            author_data_list = db.fetchall()
        with DB() as db:
            for author in author_data_list:
                db.execute("SELECT * FROM usuario WHERE idUsuario = %s", [author["idUsuario"]])
                user_client_data = db.fetchall()
                del user_client_data[0]['senha']
                all_user_data = {**author, **user_client_data[0]}
                allAuthors.append(all_user_data)
        return allAuthors

    def deleteAdminById(self, idAdmin: int) -> bool:
        with DB() as db:
            try:
                db.execute("DELETE FROM WHERE idUsuario = %s AND super = 0", [idAdmin,])
            except:
                return False
        return True
    
    def addAdmin(self, adminDTO: FrontToBackEndAdminDTO) -> bool:
        with DB() as db:
            try:
                db.execute("INSERT INTO administrador (super, idUsuario) VALUES (%s, %s)",
                        [
                            adminDTO.super,
                            adminDTO.idUsuario
                        ]
                )
            except:
                return False
        return True
    
    def refuseAuthorCadastre(authorID: int) -> bool:
        with DB() as db:
            try:
                db.execute("UPDATE usuario SET status = %s WHERE idUsuario = %s", [UserStatus.BLOCKED.value, authorID])
            except Exception as e:
                print(e)

    def approveAuthorCadastre(authorID: int) -> bool:
        with DB() as db:
            try:
                db.execute("UPDATE usuario SET status = %s WHERE idUsuario = %s", [UserStatus.ACTIVE.value, authorID])
            except Exception as e:
                print(e)

    def blockAuthorCadastre(authorID: int) -> bool:
        with DB() as db:
            try:
                db.execute("UPDATE usuario SET status = %s WHERE idUsuario = %s", [UserStatus.BLOCKED.value, authorID])
            except Exception as e:
                print(e)
