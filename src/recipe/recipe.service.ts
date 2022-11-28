import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Recipe } from "./recipe.entity";
import { CreateRecipeDto } from "./dto/create-recipe";
import {
  AddItemToRecipe,
  CreateRecipeResponse,
  DeleteRecipeResponse,
  EditDescriptionRecipeResponse,
  EditNameRecipeResponse,
  GetRecipeResponse,
  GetRecipesResponse,
  RecipeFilter,
} from "../interfaces";
import { ListService } from "src/list/list.service";
import { AddItemToRecipeDto } from "./dto/add-item-to-recipe";
import { EditRecipeDto } from "./dto/edit-name-recipe";
import { EditDescriptionRecipeDto } from "./dto/edit-description-recipe";
import { ILike } from "typeorm";
import { User } from "../user/user.entity";

@Injectable()
export class RecipeService {
  constructor(@Inject(forwardRef(() => ListService)) private listService: ListService) {}

  filter = (recipes: Recipe[]): RecipeFilter[] =>
    recipes.map(recipe => ({
      name: recipe.name,
      id: recipe.id,
    }));

  async noRecipeNameOrFail(userId: string, name: string): Promise<boolean> {
    const recipe = await Recipe.findOne({
      where: {
        name: ILike(name),
        user: { id: userId },
      },
    });
    console.log(recipe);
    if (recipe) throw new BadRequestException("The given name is already taken.");
    return true;
  }

  async getOneRecipeOrFail(recipeId: string, userId: string): Promise<Recipe> {
    const recipe = await Recipe.findOne({
      where: { id: recipeId, user: { id: userId } },
      relations: ["items"],
    });
    if (!recipe) {
      throw new NotFoundException("Cannot find recipe.");
    }
    return recipe;
  }

  async getOneRecipeResponse(recipeId: string, userId: string): Promise<GetRecipeResponse> {
    const recipe = await this.getOneRecipeOrFail(recipeId, userId);
    return { recipe };
  }

  async getUserRecipes(userId: string): Promise<GetRecipesResponse> {
    const recipes = this.filter(
      await Recipe.find({
        where: { user: { id: userId } },
      }),
    );
    return { recipes };
  }

  async createRecipe(recipe: CreateRecipeDto, user: User): Promise<CreateRecipeResponse> {
    await this.noRecipeNameOrFail(recipe.userId, recipe.name);
    const newRecipe = new Recipe();
    newRecipe.items = [];
    for (const item of recipe.items) {
      const createItem = await this.listService.createItem({
        itemId: item.itemId,
        count: item.count,
        weight: item.weight,
      });
      newRecipe.items.push(createItem);
    }
    newRecipe.description = recipe.description;
    newRecipe.name = recipe.name;
    newRecipe.user = user;
    await newRecipe.save();
    return { id: newRecipe.id };
  }

  async addItemToRecipe(item: AddItemToRecipeDto, userId: string): Promise<AddItemToRecipe> {
    const recipe = await this.getOneRecipeOrFail(item.recipeId, userId);
    const createItem = await this.listService.createItem({
      itemId: item.itemId,
      count: item.count,
      weight: item.weight,
    });
    recipe.items.push(createItem);
    await recipe.save();
    return { id: createItem.id };
  }

  async editNamedRecipe({ id, name }: EditRecipeDto, userId: string): Promise<EditNameRecipeResponse> {
    const recipe = await this.getOneRecipeOrFail(id, userId);
    await this.noRecipeNameOrFail(userId, name);
    recipe.name = name;
    await recipe.save();
    return { message: "Recipe has been updated!" };
  }

  async deleteRecipe(recipeId: string, userId: string): Promise<DeleteRecipeResponse> {
    const recipe = await this.getOneRecipeOrFail(recipeId, userId);
    await recipe.remove();
    return { message: "Recipe has been remove!" };
  }

  editDescriptionRecipe = async ({ description, id }: EditDescriptionRecipeDto, userId: string): Promise<EditDescriptionRecipeResponse> => {
    const recipe = await this.getOneRecipeOrFail(id, userId);
    recipe.description = description;
    await recipe.save();
    return { message: "Recipe has been update!" };
  };
}
