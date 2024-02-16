export enum EnumUserStatus{
    CREATED = "active",
    BLOCKED = "blocked",
    PENDING = "pending",
    INACTIVE = "inactive"
}

export interface User {
    id: string;
    nome: string;
    status: EnumUserStatus
    acao: any;
    tipo: string;
}

export default function  createUser(
    nome: string,
    id: string,
    status: EnumUserStatus,
    acao: any
): User {
    return {id, nome, status, acao};
}
