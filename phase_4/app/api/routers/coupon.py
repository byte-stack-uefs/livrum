from fastapi import APIRouter, Depends, HTTPException
from dependencies import security
from models.user import User, UserType
from models.coupon import CouponDTO,Coupon
from typing import Annotated
from services.CouponService import CouponService




router = APIRouter(prefix="/coupon", tags=["Coupon"])

access = security.UserHasAccess([UserType.AUTHOR,UserType.ADMIN])


@router.get("/{name}", description="Get a coupon by its name")
def getByName(name:str):
    service = CouponService()
    success = service.buscarPorNome(name)
    if not success:
        raise HTTPException(404, "Cupom não encontrado")
    return success

@router.get("/", description="Get all coupons")
def list():
    service = CouponService()
    response = service.ListarTodosCupons()
    return response

@router.get("/{id}", description="Get a specific coupon")
def get( id: int):
    service = CouponService()
    success = service.buscarPorId(id)
    if not success:
        raise HTTPException(404, "Cupom não encontrado")
    return success



@router.post("/", description="Create a coupon")
def add(CouponData: CouponDTO,user: Annotated[User, Depends(access)]):
    service = CouponService()
    success= service.adicionarCupom(CouponData,user.idUsuario)
    if not success:
        raise HTTPException(500, "Não foi possível cadastrar o cupom")
    


@router.delete("/{id}", description="Delete a coupon by its ID")
def delete(id: int,user: Annotated[User, Depends(access)]):
    service = CouponService()
    coupon = service.buscarPorId(id)
    if coupon is None:
        raise HTTPException(404, "Cupom não encontrado")
    if coupon.idUsuario != user.idUsuario:
        raise HTTPException(403, "O cupom não pertence ao usuário logado")
    
    success = service.deleteCreditCardById(id, user.idUsuario)
    if not success:
        raise HTTPException(500, "Não foi possível remover o cupom")


@router.patch("/{id}", description="Update a coupon")
def update(id: int, CouponData: CouponDTO):
    service = CouponService()
    coupon = service.buscarPorId(id)
    if coupon is None:
        raise HTTPException(404, "Cupom não encontrado")
    if coupon.idUsuario != user.idUsuario:
        raise HTTPException(403, "O cupom não pertence ao usuário logado")
     
    success = service.atualizarCupom(id,CouponData)
    if not success:
        raise HTTPException(1452, "Não foi possível atualizar o cupom")
    return coupon

@router.get("/author/{id}", description="Get all author's coupons")
def getByAuthor(id: int):
    service = CouponService()
    success = service.buscarPorIdAutor(id)
    if not success:
        raise HTTPException(404, "Nenhum cupom desse autor")
    return success

