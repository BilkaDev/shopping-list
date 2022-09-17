import { CreateItemInListDto } from "../../list/dto/create-item-in-list";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsOptional()
  items: CreateItemInListDto[];
}
