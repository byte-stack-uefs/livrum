from typing import Union
from pydantic import BaseModel


class PaymentForm(BaseModel):
    idCoupom: Union[int | None] = None
