from typing import Union
from database.database import DB
from models.ebook import EbookModel
from models.order import OrderPaymentType, OrderStatus


class OrderService:

    def createOrder(self, customerId, type: OrderPaymentType) -> Union[int | bool]:

        with DB() as db:

            try:

                db.execute(
                    "INSERT INTO pedido (meioPagamento, status, idCliente) VALUES (%s, %s, %s)",
                    [type.value, OrderStatus.PENDING.value, customerId],
                )
                return db.lastrowid
            except:
                return False

    def addEbookToOrder(
        self, orderId: int, ebook: EbookModel, idCoupon: Union[int | None]
    ):

        with DB() as db:

            try:
                db.execute(
                    "INSERT INTO itempedido(idCupom, idEbook, idPedido, valorUnitario, valorTotal) VALUES(%s, %s, %s, %s, %s)",
                    [idCoupon, ebook.id, orderId, ebook.price, ebook.price],
                )
            except:
                pass

    def updateOrderStatus(self, orderId, status: OrderStatus):

        with DB() as db:

            db.execute(
                "UPDATE pedido SET status = %s WHERE idPedido = %s",
                [status.value, orderId],
            )

    def addTxidToOrder(self, orderId: int, txid: str):

        with DB() as db:
            db.execute(
                "UPDATE pedido SET txid = %s WHERE idPedido = %s", [txid, orderId]
            )
