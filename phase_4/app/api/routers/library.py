from fastapi import APIRouter
from database.database import DB
from models.user import User

'''
    Test file.
'''

router = APIRouter(prefix="/library", tags=["none"])

@router.post("/userLibrary", description="Teste")
def getClientLibrary(clientID=None):
    with DB() as db:
        db.execute("SELECT * FROM usuario WHERE idUsuario = %s", [clientID])
        data = db.fetchone()
    if data is not None:
        user = User(**data)
    return {"user": str(user.nome), "e-mail": str(user.email)}

@router.get("/carlos", description="Teste")
def getUserLibrary():
    return {"message": "carlos"}

@router.post("/nome", description="Teste")
def getUserLibrary(id = None, carlos= None):
    return {"params": [{"id": id}, {"carlos" : carlos}]}

@router.post("/cadastrarEbook", description="Teste")
def cadastrar(id = None, nome= None, data = None):
    return {"params": [{"id": id}, {"nome" : nome}, {"Data" : data}]}


