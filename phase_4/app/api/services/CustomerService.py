from database.database import DB
from models.customer import Customer

class CustomerService:

    def findCustomerById(self, id: int) -> Customer:
        with DB() as db:
            db.execute("SELECT * FROM cliente WHERE idUsuario = %s", [id])
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
                ]
            )
            except Exception as e:
                print(f"Erro ao atualizar o cliente: {e}")

