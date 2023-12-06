from enum import Enum


class User:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.name = kwargs.get("name")
        self.email = kwargs.get("email")
        self.status: UserStatus = kwargs.get("status")
        self.password = kwargs.get("password")
        self.type: UserType = kwargs.get("type")


class UserType(str, Enum):
    ADMIN = "ADM"
    AUTHOR = "AUTHOR"
    CUSTOMER = "CUSTOMER"


class UserStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"
