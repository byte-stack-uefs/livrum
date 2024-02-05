from database.database import DB
from models.costumer import Costumer

class CostumerService

    def findCostumerById(self, id: int) -> Costumer:
        with DB() as db:
            db.execute("SELECT * FROM cliente WHERE idUsuario = %s", [id])
            data = db.fetchone()

        costumer = None
        if data is not None:
            costumer = Costumer(**data)

        return costumer

    def updateCostumerById(self, idUsuario: int, costumer: CostumerUpdateForm):
        with DB() as db:
            try:
                db.execute(
                    "UPDATE cliente SET telefone = %s, endereco = %s WHERE idUsuario = %s",
                [
                    costumer.telefone,
                    costumer.endereco,
                    idUsuario,
                ]
            )
        except Exception as e:
            print(f"Erro ao atualizar o cliente: {e}")
            return False

        return True

