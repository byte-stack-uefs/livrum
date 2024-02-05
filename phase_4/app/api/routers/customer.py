from typing import Annotated
from dependencies import security
from models.user import User, UserType
from models.customer import CustomerUpdateForm, Customer
from fastapi import APIRouter, Depends, HTTPException
from services.CustomerService import CustomerService
from services.UserService import UserService

router = APIRouter(prefix="/customer", tags=["Customer"])

access = security.UserHasAccess([UserType.CUSTOMER])

@router.post("/", description="Register a customer")
def add():
    return {"message", "Add a customer"}


@router.get("/{id}", description="Get a customer by ID")
def get(id: int):
    return {"message": "Get a customer by ID", "id": id}


@router.get("/library", description="Get all books bought by a client")
def getLibrary():
    return {"message": "Get all books"}


@router.get("/history", description="Get customer history")
def getHistory():
    return {"message": "Get transaction history made by a client"}

@router.patch("/{id}")
def update(id:int, customerForm:CustomerUpdateForm, user: Annotated[User, Depends(security.get_current_active_user)]):
    serviceCustomer = CustomerService()
    serviceUser = UserService()

    user = serviceUser.findUserById(id)
    customer = serviceCustomer.findCustomerById(id)

    if (customer or user) is None:
        raise HTTPException(404, "Cliente não encontrado")

    user.updateAttributes(customerForm.email,costumerForm.senha)
    customer.updateAttributes(customerForm.endereco,costumerForm.telefone)

    sucess_user = service.updateUserById(id,user)
    success_customer = service.updateCustomerById(id,Customer)

