from database.database import DB
from models.customer import CreateCustomerForm, Customer


class CustomerService:

    def findCustomerById(self, id: int) -> Customer:
        with DB() as db:
            db.execute("SELECT * FROM cliente WHERE idUsuario = %s", [id])
            data = db.fetchone()

        customer = None
        if data is not None:
            customer = Customer(**data)

        return customer

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

    def updateCustomerById(self, id: int, customer: Customer):
        with DB() as db:
            try:
                db.execute(
                    "UPDATE cliente SET cpf = %s, dataNascimento = %s, telefone = %s, endereco = %s WHERE idUsuario = %s",
                    [
                        customer.cpf,
                        customer.dataNascimento,
                        customer.telefone,
                        customer.endereco,
                        id,
                    ],
                )
            except Exception as e:
                print(f"Erro ao atualizar o cliente: {e}")

    def getCustomerUserById(self, id: int):

        data = None
        with DB() as db:

            db.execute(
                "SELECT * FROM cliente c JOIN usuario u ON u.idUsuario = c.idUsuario WHERE u.idUsuario = %s",
                [id],
            )

            data = db.fetchone()

        customer = None
        if data is not None:
            customer = Customer(**data)

        return customer
