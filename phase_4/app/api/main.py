from fastapi import FastAPI

from routers import creditCard, cart, genre, coupon, customer
from dependencies import security

app = FastAPI()

app.include_router(security.router)
app.include_router(cart.router)
app.include_router(coupon.router)
app.include_router(creditCard.router)
app.include_router(customer.router)
app.include_router(genre.router)
