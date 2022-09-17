import { ItemInListInterface } from "../list";
import { CreateRecipeDto } from "../../recipe/dto/create-recipe";
import { EditRecipeDto } from "../../recipe/dto/edit-name-recipe";

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

export type AddRecipeRequest = CreateRecipeDto;
export type EditRecipeRequest = EditRecipeDto;

export type AddItemToRecipe = CreateRecipeResponse;
export type DeleteRecipeResponse = EditNameRecipeResponse;
export type GetRecipesResponse = Omit<RecipeInterface, "description" | "items">[];
export type GetRecipeResponse = RecipeInterface;
