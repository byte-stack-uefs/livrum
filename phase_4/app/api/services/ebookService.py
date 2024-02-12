from models.ebook import EbookDTO
from dao.ebookDAO import EbookDAO

class EbookService:
    def findEbookByOptionalFilters(id = None, name = None, author = None, title = None, release_year = None, price_min = None, price_max = None, id_client = None) -> [EbookDTO]:
        ebooks = []
        try:
            ebooks = EbookDAO.findEbookByOptionalFilters(id, name, author, title, release_year, price_min, price_max, id_client)
        except Exception as ex:
            print("Erro ao buscar Ebooks", ex)

        return ebooks