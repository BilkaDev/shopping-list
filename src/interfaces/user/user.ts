export interface UserInterface {
  id: string;
  email: string;
}

export interface ChangePasswordResponse {
  isSuccess: boolean;
}

export type RegisterUserResponse = { id: string; email: string } | { isSuccess: false; message: string };
