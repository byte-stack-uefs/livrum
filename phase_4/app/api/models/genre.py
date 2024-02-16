class Genre:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idGenero")
        self.name = kwargs.get("nome")
