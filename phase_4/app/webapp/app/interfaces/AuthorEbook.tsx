export enum EnumAuthorEbookStatus {
    APPROVED = 'Aprovado',
    BLOCKED = 'Bloqueado',
    PENDING = 'Pendente'
}

export interface AuthorEbook {
    id: number;
    nome: string;
    data: string;
    link_foto: string;
    status: EnumAuthorEbookStatus
}

export default function createAuthorEbook(
    id: number,
    nome: string,
    data: string,
    link_foto: string,
    status: EnumAuthorEbookStatus,
): AuthorEbook {
    return { id, nome, data, link_foto, status };
}
