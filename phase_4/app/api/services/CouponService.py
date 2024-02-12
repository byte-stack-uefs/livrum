from database.database import DB
from models.coupon import Coupon, CouponDAO, CouponDTO

class CouponService:
    def _convertDAO(self, item: dict) -> CouponDAO:
            return CouponDAO(**item)
    
    def buscarPorId(self,idCupom: str) -> Coupon:
        with DB() as db:
            db.execute("SELECT * FROM cupom WHERE idCupom = %s", [idCupom])
            data = db.fetchone()

        Coupon = None
        if data is not None:
            Coupon = Coupon(**data)

        return Coupon
    
    def buscarPorNome(self,nome: str) -> Coupon:
        with DB() as db:
            db.execute("SELECT * FROM cupom WHERE nome = %s", [nome])
            data = db.fetchone()

        Coupon = None
        if data is not None:
            Coupon = Coupon(**data)

        return Coupon
    
    def deletarCupom(self,idCupom: str,idUsuario: str):
        try:
            db.execute("DELETE FROM cupom WHERE idCupom AND idUsuario = %s",  (idCupom, idUsuario))
            db.commit()
            return True
        except Exception as e:
            print(f"Erro ao deletar cupom: {e}")
            return False
        
    def ListarTodosCupons(self):                      
        with DB() as db:
            db.execute("SELECT * FROM cupom")
            data = db.fetchall()

        cupons = []
        for item in data:
            cupom = self._convertDAO(item)
            cupons.append(cupom)
        return cupons
    
    def buscarPorIdAutor(self,idUsuario: str)-> Coupon:
        with DB() as db:
            db.execute("SELECT * FROM cupom WHERE idUsuario = %s", [idUsuario])
            data = db.fetchall()

        cupons = []
        for item in data:
            cupom = self._convertDAO(item)
            cupons.append(cupom)
        return cupons
    
    def adicionarCupom(self,novoCoupon:CouponDTO,idUsuario: str) -> Coupon:
        with DB() as db:
            try:
                db.execute("INSERT INTO cupom (idCupom, nome, idUsuario, porcentagem, dataExpiracao,status,criadoEm,modificadoEM,) VALUES (%s, %s, %s, %s, %s,%s,%s,%s)",
                        (novoCoupon.idCupom, novoCoupon.nome, idUsuario, novoCoupon.porcentagem, novoCoupon.dataExpiracao, novoCoupon.status, novoCoupon.criadoEm, novoCoupon.modificadoEM))
                db.commit()
            except:
                return False
        return True

    def atualizarCupom(self, idCupom: str , atualizacaoCoupon:CouponDTO) -> Coupon:
        with DB() as db:
            try:
                db.execute("""UPDATE cupom SET nome=%s, porcentagem=%s, dataExpiracao=%s, status=%s, modificadoEM=%s WHERE idCupom=%s""", 
                        (atualizacaoCoupon.nome, atualizacaoCoupon.porcentagem, atualizacaoCoupon.dataExpiracao, atualizacaoCoupon.status, atualizacaoCoupon.criadoEm, atualizacaoCoupon.modificadoEM, idCupom))
                db.commit()
            except:
                    return False
        return True
    