from database.database import DB
from models.customer import CreateCustomerForm, Customer

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

                return True
            except:
               return False

    def findCustomerByCpf(self, cpf: int) -> Customer:

        with DB() as db:
            db.execute("SELECT * FROM cliente WHERE cpf = %s", [cpf])
            data = db.fetchone()
        customer = None
        if data is not None:
            customer = Customer(**data)

        return customer



