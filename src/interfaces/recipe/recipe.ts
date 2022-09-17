import { ItemInListInterface } from "../list";

export interface RecipeInterface {
  id: string;
  name: string;
  description: string;
  items: ItemInListInterface[];
}

export type CreateRecipeResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };
export type EditNameRecipeResponse =
  | {
      isSuccess: true;
    }
  | {
      isSuccess: false;
    };

export type AddItemToRecipe = CreateRecipeResponse;
export type DeleteRecipeResponse = EditNameRecipeResponse;
export type GetRecipesResponse = Omit<RecipeInterface, "description" | "items">[];
