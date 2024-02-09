export enum UserLevel {
    ADMIN = "ADM",
    AUTHOR = "AUTOR",
    CUSTOMER = "CLIENTE",
}
export interface UserAttributes {
    cpf: any;
    name: any;
    email: any;
    address: any;
    birthday: any;
    password: any;
    telephone: any;
    type: UserLevel;
    status:any
}
export interface customerAttributes{
     cpf:any;
     dataNascimento:any 
     endereco: any;
     telefone: any;
}
export interface PartialUserForm{
    nome: any;
    email: any;
    status: any;
    senha: any; 
    tipo: UserLevel;
}
export interface AutorAttributes extends UserAttributes{
    agencyNumber: any;
    accountNumber: any;
    operationNumber: any;
} 