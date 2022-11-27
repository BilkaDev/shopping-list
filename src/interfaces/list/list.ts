import { CreateListDto } from "../../list/dto/create-list";
import { ItemInListInterface } from "./item-in-list";
import { RecipeInterface } from "../recipe";

export interface ListInterface {
  id: string;
  listName: string;
  items: ItemInListInterface[];
  recipes: RecipeInterface[];
}

export type Lists = Omit<ListInterface, "items" | "recipes">[];

export type CreateListResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export type DeleteListResponse = {
  isSuccess: boolean;
};
export type AddRecipeToListResponse = DeleteListResponse;
export type DeleteRecipeFromListResponse = DeleteListResponse;
export type EditListResponse = DeleteListResponse;
export type GetListsResponse = {
  lists: Lists;
};
export type GetListResponse = ListInterface;

export type CreateListRequest = CreateListDto;
