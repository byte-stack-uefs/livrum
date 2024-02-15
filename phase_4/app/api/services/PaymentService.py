from efipay import EfiPay
from dependencies.settings import Settings
from forms.PaymentForm import PaymentForm
from models.creditCard import CreditCardPaymentForm, CreditCard


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
            "valor": {"original": "8.90"},
            "chave": "bcd6e1ad-4b84-4ab9-adb1-6b16094de84f",
            "solicitacaoPagador": "Pix referente ao pagamento da compra de Ebooks na Livrum",
        }

        response = None

        try:
            response = efi.pix_create_immediate_charge(body=body)
        except Exception as err:
            raise Exception("Failed to create Pix")

        qrcode = efi.pix_generate_qrcode(params={"id": response["loc"]["id"]})

        return {"txid": response["txid"], "qrcode": qrcode["imagemQrcode"]}

    def checkPixPaid(self, txid):

        efi = EfiPay(self._getCredentials())

        try:
            response = efi.pix_detail_charge(params={"txid": txid})
        except Exception as err:
            raise Exception("Failed to retrieve Pix Details")

        if response.get("erros", None) is not None:
            raise Exception("Failed to get Pix details.")

        return (
            response["status"] == "CONCLUIDA"
            and response.get("pix", None) is not None
            and len(response["pix"][0].get("devolucoes", [])) == 0
        )

    def payByCreditCard(
        self, creditCard: CreditCard, ebooks: list, data: CreditCardPaymentForm
    ):

        efi = EfiPay(self._getCredentials())

        try:
            response = efi.create_one_step_charge(
                {
                    "items": [{}],
                    "payment": {
                        "credit_card": {
                            "customer": {
                                "name": "",
                                "cpf": "",
                                "email": "",
                                "birth": "",
                                "phone_number": "",
                            },
                            "installments": data.installments,
                            "payment_token": creditCard.token,
                            "billing_address": {
                                "street": "",
                                "number": "",
                                "city": "",
                                "zipcode": "",
                                "complement": "",
                                "state": "",
                                "neighborhood": "",
                            },
                        }
                    },
                }
            )
            print(response)
        except Exception as e:
            print(e)
            return False
