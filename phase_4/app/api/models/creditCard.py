from fastapi import Query
from pydantic import BaseModel
from datetime import datetime, date
from typing_extensions import Annotated


class CreditCard:
    def __init__(self, **kwargs):
        self.cvv = kwargs.get("cvv")
        self.idCard = kwargs.get("idCartao")
        self.idClient = kwargs.get("idClient")
        self.cardNumber = kwargs.get("cardNumber")
        self.expiryDate = kwargs.get("expiryDate")
        self.namePrinted = kwargs.get("namePrinted")


class BackToFrontEndCreditCardDTO:
    def __init__(self, **kwargs):
        self.idCard = kwargs.get("idCartao")
        self.cardNumber = kwargs.get("numero")
        self.namePrinted = kwargs.get("nomeImpresso")
        self.expiryDate = self._parse_date(kwargs.get("dataVencimento"))

    def _parse_date(self, date_str):
        if isinstance(date_str, date):
            return date_str.strftime("%m/%Y")

        elif date_str:
            try:
                parsed_date = datetime.strptime(date_str, "%Y-%m-%d").date()
                return parsed_date.strftime("%m/%Y")

            except ValueError:
                return None

        return None


class FrontToBackEndCreditCardDTO(BaseModel):
    token: str
    namePrinted: str
    cvv: Annotated[str, Query(pattern=r"^\d{3}$", examples=["591"])]
    cardNumber: Annotated[str, Query(pattern=r"^\d{4}$", examples=["4817"])]
    expiryDate: Annotated[str, Query(pattern=r"^\d{4}-\d{2}$", examples=["2040-11"])]
