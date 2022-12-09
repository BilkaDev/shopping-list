import { IsNotEmpty, IsString } from "class-validator";

export class EditDescriptionRecipeDto {
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty()
  id: string;
}
