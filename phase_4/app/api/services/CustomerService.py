from database.database import DB
from models.customer import Customer


class CustomerService:

    def getCustomerById(self, id: int):

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
