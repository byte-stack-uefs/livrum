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
export interface AutorAttributes extends UserAttributes{
    agencyNumber: any;
    accountNumber: any;
    operationNumber: any;
}