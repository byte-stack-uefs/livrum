from fastapi import APIRouter
from services.GenreService import GenreService

router = APIRouter(prefix="/genre", tags=["Genre"])


@router.get("/", description="Get all genres")
def list():
    service = GenreService()
    return service.getAllGenres()


@router.get("/{id}", description="Get a specific genre")
def get(id: int):
    return {"message": "Genre", "id": id}
