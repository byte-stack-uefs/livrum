from database.database import DB
from models.coupon import Coupon, CouponDAO

class CouponService:
    def _convertDAO(self, item: dict) -> CouponDAO:
            return CouponDAO(**item)
    
    def buscarPorId(self,idCupom: str) -> Coupon:
        with DB() as db:
            db.execute("SELECT * FROM Cupom WHERE idCupom = %s", [idCupom])
            data = db.fetchone()

        Coupon = None
        if data is not None:
            Coupon = Coupon(**data)

        return Coupon
    
    def buscarPorNome(self,nome: str) -> Coupon:
        with DB() as db:
            db.execute("SELECT * FROM Cupom WHERE nome = %s", [nome])
            data = db.fetchone()

        Coupon = None
        if data is not None:
            Coupon = Coupon(**data)

        return Coupon
    
    def deletarCupom(self,idCupom: str):
        try:
            db.execute("DELETE FROM Cupom WHERE idCupom = %s", [idCupom])
            db.commit()
            return True
        except Exception as e:
            print(f"Erro ao deletar cupom: {e}")
            return False
        
    def ListarTodosCupons(self):                      
        with DB() as db:
            db.execute("SELECT * FROM Cupom")
            data = db.fetchall()

        cupons = []
        for item in data:
            cupom = self._convertDAO(item)
            cupons.append(cupom)
        return cupons
        