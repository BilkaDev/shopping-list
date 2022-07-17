import { Recipe } from "../../recipe/recipe.entity";
import {CreateListDto} from "../../list/dto/create-list";
import {ItemInListInterface} from "./item-in-list";

export interface ListInterface {
    id: string;
    listName: string;
    items: ItemInListInterface[];
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

export type CreateListRequest = CreateListDto;
