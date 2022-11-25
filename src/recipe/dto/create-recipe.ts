import { CreateItemInListDto } from "../../list/dto/create-item-in-list";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  description: string;
  @Type(() => Array<CreateItemInListDto>)
  @IsOptional()
  items?: CreateItemInListDto[];
}
