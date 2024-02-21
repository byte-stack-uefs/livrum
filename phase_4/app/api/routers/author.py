from typing import Annotated
from fastapi import APIRouter, Depends
from models.user import UserType
from dependencies.security import UserHasAccess
from services.AuthorService import AuthorService
from models.user import User

access = UserHasAccess([UserType.AUTHOR])

router = APIRouter(prefix="/author", tags=["Authors"])
service = AuthorService()
     

@router.get('/faturamento/mensal/{mes}')
def get_faturamento_mensal(mes, user: Annotated[User, Depends(access)]):
    return service.getFaturamentoMensalAutor(mes=mes, idAutor=user.idUsuario)

@router.get('/vendas/mensal/{mes}')
def get_vendas_mes(mes, user: Annotated[User, Depends(access)]):
    return service.getTotalUnidadesVendidasMes(mes=mes, idAutor=user.idUsuario)

@router.get('/obras/mensal/{mes}')
def get_obras_criadas_mes(mes, user: Annotated[User, Depends(access)]):
    return service.getTotalObrasCriadasMes(mes=mes, idAutor=user.idUsuario)

