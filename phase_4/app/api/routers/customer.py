from typing import Annotated
from dependencies import security
from models.customer import Customer
from models.partialForms import PartialCustomerForm
from models.user import User, UserType
from fastapi import APIRouter, Depends, HTTPException
from services.CustomerService import CustomerService

router = APIRouter(prefix="/customer", tags=["Customer"])

access = security.UserHasAccess([UserType.CUSTOMER])

@router.post("/", description="Register a customer")
def add():
    return {"message", "Add a customer"}

@router.get("/", description="Get a customer by ID")
def get(user: Annotated[User, Depends(access)]):

    service = CustomerService()
   
    customer = service.findCustomerById(user.idUsuario)

    if customer is None:
        raise HTTPException(404, "Cliente não encontrado")
                      
    return customer

@router.get("/library", description="Get all books bought by a client")
def getLibrary():
    return {"message": "Get all books"}


@router.get("/history", description="Get customer history")
def getHistory():
    return {"message": "Get transaction history made by a client"}

@router.patch("/")
def update(customerPartial:PartialCustomerForm, user: Annotated[User, Depends(access)]):
    
    service = CustomerService()
    customer = service.findCustomerById(user.idUsuario)

    if customer is None:
        raise HTTPException(404, "Cliente não encontrado")

    customerPartial.updateOriginalByPartial(customer,customerPartial)
    success = service.updateCustomerById(user.idUsuario,customer)


    

