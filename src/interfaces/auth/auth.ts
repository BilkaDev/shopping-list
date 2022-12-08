import { AuthLoginDto } from "../../auth/dto/auth-login";

export type LoginRequest = AuthLoginDto;

export type AuthLogin = {
  user: {
    userId: string;
    email: string;
  };
};
