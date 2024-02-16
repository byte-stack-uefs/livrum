export enum EnumUserStatus {
    INACTIVE = "inactive",
    ACTIVE = "active",
    BLOCKED = "blocked",
    PENDING = "pending",
}

export interface User {
    id: string;
    nome: string;
    status: EnumUserStatus;
    acao: any;
}

export default function createUser(nome: string, id: string, status: EnumUserStatus, acao: any): User {
    return { id, nome, status, acao };
}
