class Coupon:
    def __init__(self, **kwargs):
        self.idCupom = kwargs.get('idCupom')
        self.nome = kwargs.get('nome')
        self.status= kwargs.get('status')
        self.porcentagem= kwargs.get('porcentagem')
        self.dataExpiracao= kwargs.get('dataExpiracao')
        self.criadoEm= kwargs.get('criadoEm')
        self.modificadoEM= kwargs.get('modificadoEm')
        self.idUsuario= kwargs.get('idUsuario')


class CouponStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"

class CouponDAO:
    def __init__(self, **kwargs):
        self.idCupom = kwargs.get('idCupom')
        self.nome = kwargs.get('nome')
        self.status= kwargs.get('status')
        self.porcentagem= kwargs.get('porcentagem')
        self.dataExpiracao= kwargs.get('dataExpiracao')
        self.criadoEm= kwargs.get('criadoEm')
        self.modificadoEM= kwargs.get('modificadoEm')
        self.idUsuario= kwargs.get('idUsuario')


        
        