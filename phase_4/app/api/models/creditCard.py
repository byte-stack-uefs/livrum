from enum import Enum

class CreditCard:

    def __init__(self, **kwargs):
        
        self.card_number = kwargs.get("card_number")
        self.card_holder_name = kwargs.get("card_holder_name")
        self.expiry_date = kwargs.get("expiry_date")
        self.cvv = kwargs.get("cvv")
        self.card_type: CardType = self._classify_card_type()

    def _classify_card_type(self) -> CardType:

        if self.card_number and self.card_number[:1] == "4":
            return CardType.VISA
        elif self.card_number and self.card_number[:2] in ["51", "52", "53", "54", "55"]:
            return CardType.MASTERCARD
        elif self.card_number and self.card_number[:2] in ["50", "56", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69"]:
            return CardType.ELO
        elif self.card_number and self.card_number[:6] == "606282":
            return CardType.NUBANK
        else:
            return CardType.UNKNOWN

class CardType(Enum):
    
    VISA = "Visa"
    MASTERCARD = "Mastercard"
    AMEX = "American Express"
    DISCOVER = "Discover"
    UNKNOWN = "Unknown"
