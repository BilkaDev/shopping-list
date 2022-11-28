import { RecoverPasswordDto } from "../../user/dto/recover-password.dto";

export interface UserInterface {
  id: string;
  email: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export type RegisterUserResponse = { id: string; email: string };

export type RecoverPasswordResponse = ChangePasswordResponse;
export type AddAvatarResponse = ChangePasswordResponse;

export type RecoverPasswordRequest = RecoverPasswordDto;
