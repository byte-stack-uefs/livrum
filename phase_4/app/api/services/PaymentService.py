from dependencies.settings import Settings


class PaymentService:
    sts: Settings = None

    def __init__(self):
        self.sts = Settings()

    def createPix(self):
        pass

    def checkPixPaid(self):
        pass

    def payByCreditCard(self):
        pass
