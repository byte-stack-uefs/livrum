from models.customer import CreateCustomerForm
from models.author import CreateAuthorForm
from models.user import CreateUserForm
from pydantic import BaseModel
from typing import Optional

class CreateAccount(BaseModel):

    userForm: CreateUserForm
    customerForm: Optional[CreateCustomerForm] = None
    authorForm: Optional[CreateAuthorForm] = None

