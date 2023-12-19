import json
import uvicorn
from fastapi import FastAPI
from dependencies import security
from database.database import connect
from fastapi.responses import Response
from routers import creditCard, cart, genre, coupon, customer, ebook

app = FastAPI()

app.include_router(security.router)
app.include_router(cart.router)
app.include_router(coupon.router)
app.include_router(creditCard.router)
app.include_router(customer.router)
app.include_router(genre.router)
app.include_router(ebook.router)


@app.get("/version", description="Test MySQL Connection", tags=["Test"])
async def version_api():
    versao = connect()
    print(type(versao))
    return Response(
        content=json.dumps({"versao do banco de dados": versao[0]}),
        media_type="application/json",
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8010)
