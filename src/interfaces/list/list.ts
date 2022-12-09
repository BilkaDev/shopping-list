import { CreateListDto } from "../../list/dto/create-list";
import { ItemInListInterface } from "./item-in-list";
import { RecipeInterface } from "../recipe";

export interface ListInterface {
  id: string;
  listName: string;
  items: ItemInListInterface[];
  recipes: RecipeInterface[];
}

export type ListFilter = Omit<ListInterface, "items" | "recipes">;

export type CreateListResponse = {
  id: string;
};

export type DeleteListResponse = {
  message: string;
};

export type AddRecipeToListResponse = DeleteListResponse;
export type DeleteRecipeFromListResponse = DeleteListResponse;
export type EditListResponse = DeleteListResponse;
export type ClearListResponse = DeleteListResponse;
export type GetListsResponse = {
  lists: ListFilter[];
};

export type GetListResponse = {
  list: ListInterface;
};

export type CreateListRequest = CreateListDto;
