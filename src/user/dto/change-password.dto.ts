import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @IsNotEmpty()
  pwd: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @IsNotEmpty()
  newPwd: string;
}
