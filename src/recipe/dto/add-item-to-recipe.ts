import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class AddItemToRecipeDto {
  @IsString()
  @IsNotEmpty()
  recipeId: string;
  @IsString()
  @IsNotEmpty()
  itemId: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000)
  count: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  weight: number;
}
