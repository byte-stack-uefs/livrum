from fastapi import Query
from pydantic import BaseModel
from datetime import datetime, date
from typing_extensions import Annotated


class CreditCard:
    def __init__(self, **kwargs):
        self.idCard = kwargs.get("idCartao")
        self.namePrinted = kwargs.get("namePrinted")
        self.cardNumber = kwargs.get("cardNumber")
        self.cvv = kwargs.get("cvv")
        self.expiryDate = kwargs.get("expiryDate")
        self.idClient = kwargs.get("idClient")


class BackToFrontEndCreditCardDTO:
    def __init__(self, **kwargs):
        self.idCard = kwargs.get("idCartao")
        self.namePrinted = kwargs.get("nomeImpresso")
        self.ultimosDigitos = self._mask_card_number(kwargs.get("numero"))
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

    def _mask_card_number(self, card_number):
        if card_number:
            return f"**** **** **** {card_number[-4:]}"

        return None


class FrontToBackEndCreditCardDTO(BaseModel):
    token: str
    namePrinted: str
    cvv: Annotated[str, Query(pattern=r"^\d{3}$", examples=["591"])]
    cardNumber: Annotated[str, Query(pattern=r"^\d{4}$", examples=["4817"])]
    expiryDate: Annotated[str, Query(pattern=r"^\d{4}-\d{2}$", examples=["2040-11"])]
