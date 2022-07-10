import { Recipe } from "../../recipe/recipe.entity";
import {ItemInList} from "../../list/item-in-list.entity";

export interface ListInterface {
    id: string;
    listName: string;
    items: ItemInList[];
    recipes: Recipe[];
}

export type CreateListResponse = {
    isSuccess: true,
    id: string,
} | {
    isSuccess: false,
}

export type DeleteListResponse = {
    isSuccess: boolean,
}
export type AddRecipeToListResponse = DeleteListResponse;
export type DeleteRecipeFromListResponse = DeleteListResponse;
export type EditListResponse = DeleteListResponse;
export type GetListsResponse = Omit<ListInterface[], 'items'>;
export type GetListResponse = ListInterface;