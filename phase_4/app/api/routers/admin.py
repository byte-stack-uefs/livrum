from typing import Annotated
from dependencies import security
from fastapi import APIRouter, Depends, HTTPException
from models.user import User, UserType
from services.AdminService import AdminService
from models.admin import FrontToBackEndAdminDTO

router = APIRouter(prefix="/admin", tags=["Admin dash"])

access = security.UserHasAccess([UserType.ADMIN])

@router.get('/', description='Admin GET')
def test():
    print("\nTESTE\n")
    return {"response.data": "a"}


@router.get('/clients', description='Get all clients')
def allClients():
    return AdminService.getAllCustomers()

@router.get('/admins', description='Get all admins')
def allAdmins():
    return AdminService.getAllAdmins()

@router.get('/authors', description='Get all authors')
def allAuthors():
    return AdminService.getAllAuthors()

@router.post('/', description='Create a admin')
def add():
    print("\nPOST\n")
    return {'a':1}


@router.put('/refuse/{id}', description='Refuse an author')
def refuse():
   return AdminService.refuseAuthorCadastre(author=id)

@router.put('/approve', description='Aprove an author')
def approve(authorID):
    return AdminService.approveAuthorCadastre(authorID=authorID)

@router.put('/block/{id}', description='Block an author')
def block(id):
    return AdminService.blockAuthorCadastre(id)
