
from fastapi import APIRouter
from services.ebookService import EbookService
from database.database import DB
from models.ebook import EbookDTO



router = APIRouter(prefix="/catalog", tags=["Ebook"])

@router.get("/search", description="Get ebooks by optional filters")
def searchWithOptionalFilters(id = None, name = None, author = None, title = None, release_year = None, price_min = None, price_max = None, id_client = None):
    ebooks = EbookService.findEbookByOptionalFilters(id, name, author, title, release_year, price_min, price_max, id_client)
    return {"ebooks": ebooks}

@router.get("/list", description="List all ebooks")
def listEbooks():
    consulta = "SELECT * FROM ebook"
    ebooks = []
    with DB() as db:
        db.execute(consulta)
        data = db.fetchall()
        for ebook in data:
            ebookDTO = EbookDTO(**ebook)
            ebooks.append(ebookDTO)
    return {"ebooks": ebooks} 