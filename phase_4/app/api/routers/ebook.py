from fastapi import APIRouter, File, UploadFile, Request
from typing import Annotated
from dependencies import security
from models.user import User, UserType
from fastapi import APIRouter, Depends, HTTPException
from models.ebook import EbookCreate, EbookDTO
from models.ebook import ReproveEbookDTO
from services.EbookService import EbookService
from services.AuthorService import AuthorService

router = APIRouter(prefix="/ebook", tags=["Ebook"])

allAccess = security.UserHasAccess([UserType.CUSTOMER, UserType.AUTHOR, UserType.ADMIN])

access = security.UserHasAccess([UserType.AUTHOR])
adminAccess = security.UserHasAccess([UserType.ADMIN])

accessAdminAuthor = security.UserHasAccess([UserType.AUTHOR, UserType.ADMIN])


@router.get("/author/{id}")
def getByAuthor(id, user: Annotated[User, Depends(accessAdminAuthor)]):

    service = AuthorService()
    author = service.findAuthorById(id)
    if author is None:
        raise HTTPException(404, "Autor não encontrado")

    ebookService = EbookService()
    return ebookService.findAllByAuthorId(id)


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


@router.put("/approve/{id}", description="Approve an ebook")
def approve(id: str, user: Annotated[User, Depends(adminAccess)]):
    return EbookService.approveEbook(id)


@router.put("/repprove", description="Repprove an ebook")
def approve(reproveEbook: ReproveEbookDTO, user: Annotated[User, Depends(adminAccess)]):
    return EbookService.repproveEbook(reproveEbook)


@router.put("/disable/{id}", description="Disable an ebook")
def approve(id: str, user: Annotated[User, Depends(accessAdminAuthor)]):
    return EbookService.disableEbook(id)


@router.put("/reactive/{id}", description="Reactivate an ebook")
def approve(id: str, user: Annotated[User, Depends(accessAdminAuthor)]):

    ebook = EbookService.getEbookById(id)
    if user.tipo == "AUTOR" and ebook.status == "rejected":
        raise HTTPException(409, "Um ebook depois de rejeitado não pode ser atualizado")

    return EbookService.approveEbook(id)


@router.patch("/{id}", description="Update an ebook's field")
def patch(id: int):
    return {"message": "Update ebook", "id": id}


@router.get("/download/{id}", description="Download an ebook")
def download(id: str, user: Annotated[User, Depends(allAccess)]):
    ebook = EbookService.getEbookById(id)
    if not ebook.isAvailable and user.tipo != UserType.ADMIN:
        raise HTTPException(403, "Você não tem permissão para realizar essa ação")
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
):

    ebook.idAutor = user.idUsuario
    return EbookService.submit(ebook)


@router.post("/submit-images/{id}")
def submitImages(
    user: Annotated[User, Depends(access)],
    id: int,
    capa: UploadFile,
    pdf: UploadFile,
):
    capa_path = EbookService.save_file(capa, id, "jpeg")
    pdf_path = EbookService.save_file(pdf, id, "pdf")

    service = EbookService()
    service.setEbookSize(id)
