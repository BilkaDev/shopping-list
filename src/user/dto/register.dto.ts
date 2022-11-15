import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @IsNotEmpty()
  pwd: string;
}
