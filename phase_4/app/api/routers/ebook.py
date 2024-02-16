from fastapi import APIRouter
from typing import Annotated
from dependencies import security
from models.user import User, UserType
from fastapi import APIRouter, Depends, HTTPException
from services.EbookService import EbookService
from models.Ebook import EbookDTO

router = APIRouter(prefix="/ebook", tags=["Ebook"])

access = security.UserHasAccess([UserType.AUTHOR])

@router.get("/{id}", description="Get an ebook by its ID")
def get(id: int):
    return {"message": "Get ebook", "id": id}


@router.post("/", description="Create an ebook")
def add(newEbook: EbookDTO,user: Annotated[User, Depends(access)], pdf: str):
    service = EbookService()
    success = service.addEbook(newEbook, user.idUsuario,pdf)
    if not success:
        raise HTTPException(500, "Não foi possível cadastrar o ebook")


@router.patch("/{id}", description="Update an ebook's field")
def patch(id: int):
    return {"message": "Update ebook", "id": id}
