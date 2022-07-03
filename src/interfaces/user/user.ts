export interface UserInterface {
    id: string;
    email: string;
}


export type RegisterUserResponse = {id: string,email: string} | {isSuccess:false, message:string};