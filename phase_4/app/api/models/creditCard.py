from enum import Enum
from pydantic import BaseModel
from datetime import datetime, date
from fastapi import Query
from typing_extensions import Annotated
import re


class CardType(Enum):
    VISA = "Visa"
    MASTERCARD = "Mastercard"
    ELO = "Elo"
    UNKNOWN = "Unknown"


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
        self.card_type = _classify_card_type(kwargs.get("numero"))

    def _mask_card_number(self, card_number):
        if card_number:
            return f"**** **** **** {card_number[-4:]}"

        return None

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
    cvv: Annotated[str, Query(pattern=r"^\d{3}$")]
    cardNumber: Annotated[str, Query(pattern=r"^\d{4}$")]
    expiryDate: Annotated[str, Query(pattern=r"^\d{4}-\d{2}$", example="2040-11")]
    namePrinted: str


def _classify_card_type(card_number):
    if re.match(r"^4\d{12}(\d{3})?$", card_number):
        return CardType.VISA

    elif re.match(r"^(5[1-5]\d{4}|677189)\d{10}$", card_number):
        return CardType.MASTERCARD

    elif re.match(
        r"^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$",
        card_number,
    ):
        return CardType.ELO

    else:
        return CardType.UNKNOWN
