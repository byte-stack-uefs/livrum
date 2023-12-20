from fastapi import APIRouter

router = APIRouter(prefix="/ebook", tags=["Ebook"])


@router.get("/{id}", description="Get an ebook by its ID")
def get(id: int):
    return {"message": "Get ebook", "id": id}


@router.post("/", description="Create an ebook")
def add():
    return {"message": "Creating ebook"}


@router.patch("/{id}", description="Update an ebook's field")
def patch(id: int):
    return {"message": "Update ebook", "id": id}
