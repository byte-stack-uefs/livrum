import json
import uvicorn
from fastapi import FastAPI
from dependencies import security
from database.database import connect
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from routers import creditCard, cart, genre, coupon, customer, account
import logging

logging.getLogger("passlib").setLevel(logging.ERROR)

app = FastAPI()

origins = ["http://localhost", 'http://localhost:80', '0.0.0.0', '10.0.0.171']

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
app.include_router(account.router)


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
