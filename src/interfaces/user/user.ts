export interface UserInterface {
    id: string;
    email: string;
}


export type RegisterUserResponse = UserInterface | {isSuccess:false, message:string};