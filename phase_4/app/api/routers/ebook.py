from fastapi import APIRouter
from typing import Annotated
from dependencies import security
from models.user import User, UserType
from fastapi import APIRouter, Depends, HTTPException
from models.ebook import EbookDTO
from models.ebook import ReproveEbookDTO
from services.EbookService import EbookService

router = APIRouter(prefix="/ebook", tags=["Ebook"])

access = security.UserHasAccess([UserType.AUTHOR])

access2 = security.UserHasAccess([UserType.AUTHOR, UserType.ADMIN])


@router.get("/most-viewed")
def mostViewed():
    service = EbookService()

    return service.getMoreViewedEbooks()


@router.get("/newer")
def getNewer():
    service = EbookService()

    return service.getNewerEbooks()


@router.get("/most-buyed")
def getMostBuyed():
    service = EbookService()

    return service.getMostBuyed()


@router.get("/similar/{id}")
def getSimilar(id: int):
    service = EbookService()

    return service.getSimilarEbooks(id)


@router.get("/search", description="Get ebooks by optional filters")
def searchWithOptionalFilters(
    id=None,
    name=None,
    author=None,
    title=None,
    release_year=None,
    price_min=None,
    price_max=None,
    id_client=None,
):
    ebooks = EbookService.findEbookByOptionalFilters(
        id, name, author, title, release_year, price_min, price_max, id_client
    )
    return ebooks


@router.get("/", description="Get ebooks")
def get():
    return EbookService.findAll()


@router.get("/{id}", description="Get an ebook by its ID")
def get(id: int,
    user: Annotated[User, Depends(access)],):
    ebook = EbookService.getEbookById(id)
    return ebook


@router.post("/", description="Create an ebook")
def add(
    newEbook: EbookDTO,
    user: Annotated[User, Depends(access)],
):
    pass


@router.put("/approve/{id}", description="approve an ebook")
def approve(id: str,
    user: Annotated[User, Depends(access)],):
    return EbookService.approveEbook(id)


@router.put("/repprove", description="repprove an ebook")
def approve(reproveEbook: ReproveEbookDTO,
    user: Annotated[User, Depends(access)],):
    return EbookService.repproveEbook(reproveEbook)


@router.put("/disable/{id}", description="approve an ebook")
def approve(id: str,
    user: Annotated[User, Depends(access)],):
    return EbookService.disableEbook(id)


@router.patch("/{id}", description="Update an ebook's field")
def patch(id: int,
    user: Annotated[User, Depends(access)],):
    return {"message": "Update ebook", "id": id}


@router.get("/download/{id}", description="download an ebook")
def download(id: str,
    user: Annotated[User, Depends(access)],):

    result = EbookService.downloadEbook(id)
    if result is None:
        raise HTTPException(
            404,
            "O PDF do Ebook não está disponível, por favor, tente novamente mais tarde",
        )
    return result

@router.get("/private/best-sellers", description="get best sellers ebooks")
def getBestSellers(user: Annotated[User, Depends(access2)], id=None):
    print(user.idUsuario)
    idAutor = id if id is not None else user.idUsuario
    return EbookService.getBestSellers(idAutor)