import { RecoverPasswordDto } from "../../user/dto/recover-password.dto";

export interface UserInterface {
  id: string;
  email: string;
}

export interface ChangePasswordResponse {
  isSuccess: boolean;
}

export type RegisterUserResponse = { id: string; email: string } | { isSuccess: false; message: string };

export type RecoverPasswordResponse = ChangePasswordResponse;
export type AddAvatarResponse = ChangePasswordResponse;

export type RecoverPasswordRequest = RecoverPasswordDto;
