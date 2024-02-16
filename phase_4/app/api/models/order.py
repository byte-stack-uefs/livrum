from enum import Enum


class OrderStatus(str, Enum):
    CANCELED = "canceled"
    PENDING = "pending"
    APPROVED = "approved"
    FAILED = "failed"


class OrderPaymentType(str, Enum):
    CREDIT_CARD = "credito"
    PIX = "pix"


class Order:
    def __init__():
        pass
