import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateItemInListDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  listId?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  recipeId?: string;
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsInt()
  @Min(0)
  @Max(1000)
  count: number;

  @IsInt()
  @Min(0)
  @Max(1000000)
  weight: number;
}
