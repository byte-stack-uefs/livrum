from typing import Annotated
from fastapi import APIRouter, Depends
from models.user import UserType
from dependencies.security import UserHasAccess
from services.AuthorService import AuthorService
from models.user import User

access = UserHasAccess([UserType.AUTHOR])

router = APIRouter(prefix="/author", tags=["Authors"])
service = AuthorService()


@router.get("/faturamento/mensal/{mes}/{ano}")
def get_faturamento_mensal(mes, ano, user: Annotated[User, Depends(access)]):
    return service.getFaturamentoMensalAutor(mes=mes, idAutor=user.idUsuario, ano=ano)


@router.get("/vendas/mensal/{mes}/{ano}")
def get_vendas_mes(mes, ano, user: Annotated[User, Depends(access)]):
    return service.getTotalUnidadesVendidasMes(mes=mes, idAutor=user.idUsuario, ano=ano)


@router.get("/obras/mensal/{mes}/{ano}")
def get_obras_criadas_mes(mes, ano, user: Annotated[User, Depends(access)]):
    return service.getTotalObrasCriadasMes(mes=mes, idAutor=user.idUsuario, ano=ano)
