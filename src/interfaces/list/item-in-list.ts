import { CreateItemInListDto } from "../../list/dto/create-item-in-list";
import { ProductInterface } from "../product";
import { UpdateItemsListDto } from "../../list/dto/update-item-in-list";
import { ItemInList } from "../../list/item-in-list.entity";

export interface ItemInListInterface {
  id: string;
  product: ProductInterface;
  count: number;
  weight: number;
  itemInBasket: boolean;
  listId?: string;
  recipeId?: string;
}

export type AddItemToListResponse = {
  id: string;
};

export type DeleteItemInListResponse = {
  message: string;
};
export type UpdateItemInListResponse = DeleteItemInListResponse;
export type GetListOfItemsResponse = {
  items: ItemInList[];
};

export type CreateItemInListRequest = CreateItemInListDto;
export type UpdateItemInListRequest = UpdateItemsListDto;
