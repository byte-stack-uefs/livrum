from fastapi import APIRouter, File, UploadFile
from typing import Annotated
from dependencies import security
from models.user import User, UserType
from fastapi import APIRouter, Depends, HTTPException
from models.ebook import EbookCreate, EbookDTO
from models.ebook import ReproveEbookDTO
from services.EbookService import EbookService

router = APIRouter(prefix="/ebook", tags=["Ebook"])

access = security.UserHasAccess([UserType.AUTHOR])

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

@router.get("/userLibrary")
def getUserLibrary(idUsuario):
    return EbookService.getUserLibrary(idUsuario)

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
def get(id: int):
    ebook = EbookService.getEbookById(id)
    return ebook

@router.post("/", description="Create an ebook")
def add(
    newEbook: EbookDTO,
    user: Annotated[User, Depends(access)],
):
    pass

@router.put("/approve/{id}", description="approve an ebook")
def approve(id: str):
    return EbookService.approveEbook(id)

@router.put("/repprove", description="repprove an ebook")
def approve(reproveEbook: ReproveEbookDTO):
    return EbookService.repproveEbook(reproveEbook)

@router.put("/disable/{id}", description="approve an ebook")
def approve(id: str):
    return EbookService.disableEbook(id)

@router.patch("/{id}", description="Update an ebook's field")
def patch(id: int):
    return {"message": "Update ebook", "id": id}

@router.get("/download/{id}", description="download an ebook")
def download(id: str):
    result = EbookService.downloadEbook(id)
    if result is None:
        raise HTTPException(
            404,
            "O PDF do Ebook não está disponível, por favor, tente novamente mais tarde",
        )
    return result

@router.post("/submit")
def submit(
    user: Annotated[User, Depends(access)], 
    ebook: EbookCreate, 
    capa: UploadFile = File(...),
    pdf: UploadFile = File(...)):

    ebook.idAutor = user.idUsuario
    EbookService.submit(ebook, capa, pdf)
