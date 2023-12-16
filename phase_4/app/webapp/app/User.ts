export enum EnumUserStatus{
    CREATED = 'Cadastrado',
    BLOCKED = 'Bloqueado',
    PENDING = 'Pendente'
}

export interface User {
    id: string;
    nome: string;
    status: EnumUserStatus
    acao: any;
}

export default function  createUser(
    nome: string,
    id: string,
    status: EnumUserStatus,
    acao: any
): User {
    return {id, nome, status, acao};
}
