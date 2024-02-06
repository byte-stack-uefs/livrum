from efipay import EfiPay
from dependencies.settings import Settings


class PaymentService:
    sts: Settings = None

    def __init__(self):
        self.sts = Settings()

    def _getCredentials(self):
        return {
            "client_id": self.sts.efi_client_id,
            "client_secret": self.sts.efi_client_secret,
            "sandbox": True,
            "certificate": "/usr/app/data/certificado.pem",
        }

    def createPix(self):
        efi = EfiPay(self._getCredentials())

        body = {
            "calendario": {"expiracao": 3600},
            "valor": {"original": "19.90"},
            "chave": "bcd6e1ad-4b84-4ab9-adb1-6b16094de84f",
            "solicitacaoPagador": "Pix referente ao pagamento da compra de Ebooks na Livrum",
        }

        response = None

        try:
            response = efi.pix_create_immediate_charge(body=body)
        except Exception as err:
            print(err)

        qrcode = efi.pix_generate_qrcode(params={"id": response["loc"]["id"]})

        return qrcode["imagemQrcode"]

    def checkPixPaid(self):
        pass

    def payByCreditCard(self):
        pass
