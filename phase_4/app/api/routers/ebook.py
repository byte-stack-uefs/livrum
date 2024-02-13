import ujson
from fastapi import APIRouter
from models.ebook import ReproveEbookDTO
from services.ebookService import EbookService

router = APIRouter(prefix="/ebook", tags=["Ebook"])


@router.get("/search", description="Get ebooks by optional filters")
def searchWithOptionalFilters(id = None, name = None, author = None, title = None, release_year = None, price_min = None, price_max = None, id_client = None):
    ebooks = EbookService.findEbookByOptionalFilters(id, name, author, title, release_year, price_min, price_max, id_client);
    return ebooks

@router.get("/", description="Get ebooks")
def get():
    return EbookService.findAll()

@router.get("/{id}", description="Get an ebook by its ID")
def get(id: int):
    return {"message": "Get ebook", "id": id}


@router.post("/", description="Create an ebook")
def add():
    return {"message": "Creating ebook"}

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