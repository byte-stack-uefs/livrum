export enum UserLevel {
    ADMIN = "ADM",
    AUTHOR = "AUTOR",
    CUSTOMER = "CLIENTE",
}
export interface UserForm {
    name: any;
    email: any;
    password: any;
    status:any;
    type: UserLevel;
}
