from database.database import DB
from models.customer import CreateCustomerForm

class CustomerService:

    def addCustomer(self, customer: CreateCustomerForm, idUser):

        with DB() as db:
            try:
                db.execute(
                    "INSERT INTO cliente (idUsuario, cpf, dataNascimento, endereco, telefone) VALUES (%s, %s, %s, %s, %s)",
                    [
                        idUser,
                        customer.cpf,
                        customer.dataNascimento,
                        customer.endereco,
                        customer.telefone,
                    ],
                )
            except:
                return False

        return True


