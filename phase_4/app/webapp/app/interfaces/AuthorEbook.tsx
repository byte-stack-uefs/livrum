export enum EnumAuthorEbookStatus {
    ACTIVE = 'active',
    REJECTED = 'rejected',
    PENDING = 'pending',
    INACTIVE = 'inactive'
}

export enum EnumIdioma {
    PORTUGUES = 'Português',
    INGLES = 'Inglês',
    ESPANHOL = 'Espanhol'
}

export interface AuthorEbook {
    id: number;
    nome: string;
    data: string;
    link_foto: string;
    status: EnumAuthorEbookStatus;
    qtd_pag: number;
    nome_autor: string;
    genero: string;
    preco: number;
    idioma: EnumIdioma;
    ano_lancamento: number;
    sinopse: string;
    motivo_recusa: string;
}

export default function createAuthorEbook(
    id: number,
    nome: string,
    data: string,
    link_foto: string,
    status: EnumAuthorEbookStatus,
    qtd_pag: number,
    nome_autor: string,
    genero: string,
    preco: number,
    idioma: EnumIdioma,
    ano_lancamento: number,
    sinopse: string,
    motivo_recusa: string,
): AuthorEbook {
    return { id, nome, data, link_foto, status, qtd_pag, nome_autor, genero, preco, idioma, ano_lancamento, sinopse, motivo_recusa };
}
