from database.database import DB
from models.creditCard import CreditCard, CardType, BackToFrontEndCreditCardDTO, FrontToBackEndCreditCardDTO, _classify_card_type
from datetime import date
from typing import List

class CreditCardService:

    def getAllCreditCardsByClientId(self, clientId: int) -> List[BackToFrontEndCreditCardDTO]:
        credit_cards = []

        with DB() as db:

            db.execute("SELECT * FROM Cartao WHERE idCliente = %s", [clientId])
            data_list = db.fetchall()

        for data in data_list:

            credit_card = BackToFrontEndCreditCardDTO(**data)
            credit_cards.append(credit_card)

        return credit_cards

    def deleteCreditCardById(self, card_id: int):

        with DB() as db:
            db.execute("DELETE FROM Cartao WHERE idCartao = %s", [card_id])
            return f"Cartão de crédito com ID {card_id} excluído com sucesso."

    def addCreditCard(self, creditCardDTO:FrontToBackEndCreditCardDTO):

        if(_classify_card_type(creditCardDTO.cardNumber) != CardType.UNKNOWN):

            with DB() as db:
                db.execute("INSERT INTO Cartao (nomeImpresso, numero, cvv, dataVencimento, idCliente) VALUES (%s, %s, %s, %s, %s)",
                        [creditCardDTO.namePrinted,creditCardDTO.cardNumber,creditCardDTO.cvv,creditCardDTO.expiryDate,creditCardDTO.idClient]
                )

            return "Cartão deletado com sucesso"
        
        else:

            return "Número inválido de cartão de crédito"

        
