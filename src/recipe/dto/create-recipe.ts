import { CreateItemInListDto } from "../../list/dto/create-item-in-list";

export class CreateRecipeDto {
  name: string;
  userId: string;
  description: string;
  items: CreateItemInListDto[];
}
