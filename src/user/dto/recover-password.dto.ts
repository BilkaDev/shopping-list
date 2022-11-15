import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RecoverPasswordDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email: string;
}
