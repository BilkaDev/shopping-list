import {ItemInList} from "../../list/item-in-list.entity";
import {List} from "../../list/list.entity";

export interface RecipeInterface {
    id: string;
    name: string;
    description: string;
    items: ItemInList[];
    lists: List[];
}

export type CreateRecipeResponse = {
    isSuccess: true,
    id: string,
} | {
    isSuccess: false,
}
export type EditNameRecipeResponse = {
    isSuccess: true,
} | {
    isSuccess: false,
}

export type AddItemToRecipe = CreateRecipeResponse
export type DeleteRecipeResponse = EditNameRecipeResponse
export type GetRecipesResponse = Omit<RecipeInterface[], 'items' | 'description'>;


