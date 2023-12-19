from fastapi import APIRouter

router = APIRouter(prefix="/genre", tags=["Genre"])


@router.get("/", description="Get all genres")
def list():
    return {"message": "Get all genres"}


@router.get("/{id}", description="Get a specific genre")
def get(id: int):
    return {"message": "Genre", "id": id}
