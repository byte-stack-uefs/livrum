from typing import List
from database.database import DB
from models.creditCard import (
    CreditCard,
    BackToFrontEndCreditCardDTO,
    FrontToBackEndCreditCardDTO,
)


class CreditCardService:
    def _convertDTOFront(self, item: dict) -> BackToFrontEndCreditCardDTO:
        return BackToFrontEndCreditCardDTO(**item)

    def getAllCreditCardsByClientId(
        self, idClient: int
    ) -> List[BackToFrontEndCreditCardDTO]:
        credit_cards = []

        with DB() as db:
            db.execute("SELECT * FROM cartao WHERE idCliente = %s", [idClient])
            data_list = db.fetchall()

        credit_cards = map(self._convertDTOFront, data_list)
        return list(credit_cards)

    def getCreditCardByCardId(self, idCard: int) -> CreditCard:
        with DB() as db:
            db.execute("SELECT * FROM cartao WHERE idCartao = %s", [idCard])
            data = db.fetchone()

        credit_card = None
        if data is not None:
            credit_card = CreditCard(**data)

        return credit_card

    def deleteCreditCardById(self, idCard: int, idClient: int):
        with DB() as db:
            result = db.execute(
                "DELETE FROM cartao WHERE idCartao = %s AND idCliente = %s",
                (idCard, idClient),
            )

        credit_card_deleted = self.getCreditCardByCardId(idCard)
        if credit_card_deleted is not None:
            return f"Cartão de crédito não foi excluido"
        else:
            return f"Cartão de crédito excluído com sucesso."

    def addCreditCard(self, creditCardDTO: FrontToBackEndCreditCardDTO, idClient):
        creditCardDTO.expiryDate = creditCardDTO.expiryDate + "-01"

        with DB() as db:
            try:
                db.execute(
                    "INSERT INTO cartao (token, nomeImpresso, numero, cvv, dataVencimento, idCliente) VALUES (%s, %s, %s, %s, %s, %s)",
                    [
                        creditCardDTO.token,
                        creditCardDTO.namePrinted,
                        creditCardDTO.cardNumber,
                        creditCardDTO.cvv,
                        creditCardDTO.expiryDate,
                        idClient,
                    ],
                )
            except:
                return False

        return True
