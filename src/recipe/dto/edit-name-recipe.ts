import { IsNotEmpty, IsString } from "class-validator";

export class EditRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  id: string;
}
