export enum UserLevel {
    ADMIN = "ADM",
    AUTHOR = "AUTOR",
    CUSTOMER = "CLIENTE",
}
export interface UserAttributes {
    idUsuario: any;
    nome: any;
    email: any;
    status:any;
    senha: any;
    tipo: UserLevel;
}
export interface CustomerAttributes{
    idUsuario: any;
    cpf:any;
    dataNascimento:any 
    endereco: any;
    telefone: any;
}
