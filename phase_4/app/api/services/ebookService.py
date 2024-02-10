from models.ebook import AuthorEbookDTO, EbookDTO
from dao.ebookDAO import EbookDAO

class EbookService:
    def findEbookByOptionalFilters(id = None, name = None, author = None, title = None, release_year = None, price_min = None, price_max = None, id_client = None) -> [EbookDTO]:
        ebooks = []
        try:
            ebooks = EbookDAO.findEbookByOptionalFilters(id, name, author, title, release_year, price_min, price_max, id_client)
        except Exception as ex:
            print("Erro ao buscar Ebooks", ex)

        return ebooks
    
    def findAll() -> [AuthorEbookDTO]:
        ebooks = []
        try:
            ebooks = EbookDAO.findAll()
        except Exception as ex:
            print("Erro ao buscar Ebooks", ex)

        return ebooks
    
    def approveEbook(id):
        try:
            EbookDAO.approveEbook(id)
        except Exception as ex:
            print("Erro ao aprovar Ebook com id:", id, ex)
            
    def repproveEbook(id):
        try:
            EbookDAO.repproveEbook(id)
        except Exception as ex:
            print("Erro ao reprovar Ebook com id:", id, ex)

    def disableEbook(id):
        try:
            EbookDAO.disableEbook(id)
        except Exception as ex:
            print("Erro ao inativar Ebook com id:", id, ex)