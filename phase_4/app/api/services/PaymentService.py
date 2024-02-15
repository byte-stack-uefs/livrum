from efipay import EfiPay
from dependencies.settings import Settings
from forms.PaymentForm import PaymentForm
from models.creditCard import CreditCardPaymentForm, CreditCard
from models.customer import Customer


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
        self,
        customer: Customer,
        creditCard: CreditCard,
        ebooks: list,
        data: CreditCardPaymentForm,
    ):

        efi = EfiPay(self._getCredentials())
        # {"name": "Ebook", "value": 1990, "amount": 1}
        try:
            body = {
                "items": [
                    {"name": x.title, "value": int(x.price * 100), "amount": 1}
                    for x in ebooks
                ],
                "payment": {
                    "credit_card": {
                        "customer": {
                            "name": customer.nome,
                            "cpf": customer.cpf,
                            "email": customer.email,
                            "birth": str(customer.dataNascimento),
                            "phone_number": customer.telefone,
                        },
                        "installments": data.installments,
                        "payment_token": creditCard.token,
                        "billing_address": {
                            "street": "SOME STREET",
                            "number": "99",
                            "city": "FEIRA DE SANTANA",
                            "zipcode": "44036900",
                            "complement": "",
                            "state": "BA",
                            "neighborhood": "Novo Horizonte",
                        },
                    }
                },
            }
            print(body)
            response = efi.create_one_step_charge(body=body)

            if response.get("error_description", None) is not None:
                ex = Exception()
                ex.message = response["error_description"]
                raise ex
        except Exception as e:
            raise e
