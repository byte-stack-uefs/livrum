from models.customer import CreateCustomerForm
from models.author import CreateAuthorForm
from models.user import CreateUserForm
from pydantic import BaseModel
from typing import Optional

class CreateAccount(BaseModel):

    formUser: CreateUserForm
    formCustomer: Optional[CreateCustomerForm] = None
    formAuthor: Optional[CreateAuthorForm] = None

