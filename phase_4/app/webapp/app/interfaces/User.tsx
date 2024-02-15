export enum UserLevel {
    ADMIN = "ADM",
    AUTHOR = "AUTOR",
    CUSTOMER = "CLIENTE",
}
export interface UserForm {
    nome: any;
    email: any;
    senha: any;
    status:any;
    tipo: UserLevel;
}
