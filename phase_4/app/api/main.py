import json
import uvicorn
from fastapi import FastAPI,Request
from dependencies import security, settings
from database.database import connect
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    creditCard,
    cart,
    genre,
    coupon,
    customer,
    ebook,
    account,
    user,
    payment,
    catalog
)
import logging

logging.getLogger("passlib").setLevel(logging.ERROR)

app = FastAPI()

origins = ["http://localhost", "http://localhost:80", "http://localhost:8000", "0.0.0.0"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(security.router)
app.include_router(cart.router)
app.include_router(coupon.router)
app.include_router(creditCard.router)
app.include_router(customer.router)
app.include_router(genre.router)
app.include_router(ebook.router)
app.include_router(account.router)
app.include_router(user.router)
app.include_router(payment.router)
app.include_router(catalog.router)

@app.post("/endpoint")
async def endpoint(request: Request):
    # Verificando se a requisição tem um corpo
    if request.body():
        # Lendo o corpo da requisição
        request_body = await request.body()

        # Convertendo o corpo para uma string
        request_body_str = request_body.decode('utf-8')

        # Imprimindo o corpo da requisição
        print("Corpo da requisição:", request_body_str)
    else:
        print("Requisição sem corpo.")

@app.get("/version", description="Test MySQL Connection", tags=["Test"])
async def version_api():
    versao = connect()
    print(type(versao))
    return Response(
        content=json.dumps({"versao do banco de dados": versao[0]}),
        media_type="application/json",
    )


settings = settings.Settings()


@app.get("/info")
def info():
    return settings


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)
