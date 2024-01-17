from database.database import DB
from models.creditCard import CreditCard, CardType, BackToFrontEndCreditCardDTO, FrontToBackEndCreditCardDTO, _classify_card_type
from datetime import date
from typing import List

class CreditCardService:

    def _convertDTOFront(self, item: dict) -> BackToFrontEndCreditCardDTO:
        return BackToFrontEndCreditCardDTO(**item)

    def getAllCreditCardsByuserId(self, idClient: int) -> List[BackToFrontEndCreditCardDTO]:
        credit_cards = []

        with DB() as db:

            db.execute("SELECT * FROM Cartao WHERE idCliente = %s", [userId])
            data_list = db.fetchall()

        credit_cards = map(self._convertDTOFront, data_list)
        return list(credit_cards)

    def deleteCreditCardById(self, idCard: int, idClient: int):

        with DB() as db:
            db.execute("DELETE FROM Cartao WHERE idCartao = %s AND idCliente = %s", (idCard, idClient))
            return f"Cartão de crédito com ID {cardId} excluído com sucesso."

    def addCreditCard(self, creditCardDTO:FrontToBackEndCreditCardDTO, idClient):

        if(_classify_card_type(creditCardDTO.cardNumber) != CardType.UNKNOWN):

            with DB() as db:
                db.execute("INSERT INTO Cartao (nomeImpresso, numero, cvv, dataVencimento, idCliente) VALUES (%s, %s, %s, %s, %s)",
                        [creditCardDTO.namePrinted,creditCardDTO.cardNumber,creditCardDTO.cvv,creditCardDTO.expiryDate,idClient]
                )

            return "Cartão adicionado"
        
        else:

            return "Número inválido de cartão de crédito"

        
