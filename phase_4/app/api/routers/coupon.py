from fastapi import APIRouter

router = APIRouter(prefix="/coupon", tags=["Coupon"])


@router.get("/{name}", description="Get a coupon by its name")
def getByName(name: str):
    return {"message": "Getting a coupon by name", "name": name}


@router.get("/", description="Get all coupons")
def list():
    return {"message": "Getting all coupons"}


@router.get("/{id}", description="Get a specific coupon")
def get(id: int):
    return {"message": "Coupon", "id": id}


@router.post("/", description="Create a coupon")
def add():
    return {"message": "Adding a coupon"}


@router.delete("/{id}", description="Delete a coupon by its ID")
def delete(id: int):
    return {"message": "Coupon deleted", "id": id}


@router.patch("/{id}", description="Update a coupon")
def update(id: int):
    return {"message": "Coupon updated", "id": id}


@router.get("/author/{id}", description="Get all author's coupons")
def getByAuthor(id: int):
    return {"message": "Get all author's coupons", "author": id}
