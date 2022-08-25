import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProductDto {
  @MinLength(2)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  category: number;
}
