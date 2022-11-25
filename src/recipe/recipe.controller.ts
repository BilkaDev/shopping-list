import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { DeleteRecipeResponse, EditDescriptionRecipeResponse, EditNameRecipeResponse, GetRecipeResponse, GetRecipesResponse } from "../interfaces";
import { RecipeService } from "./recipe.service";
import { CreateListResponse } from "../interfaces";
import { CreateRecipeDto } from "./dto/create-recipe";
import { AddItemToRecipeDto } from "./dto/add-item-to-recipe";
import { EditRecipeDto } from "./dto/edit-name-recipe";
import { EditDescriptionRecipeDto } from "./dto/edit-description-recipe";
import { AuthGuard } from "@nestjs/passport";

@Controller("recipe")
export class RecipeController {
  constructor(@Inject(RecipeService) private recipeService: RecipeService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/:userId")
  getUserRecipes(@Param("userId") userId: string): Promise<GetRecipesResponse> {
    return this.recipeService.getUserRecipes(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/user/:recipeId")
  getOneRecipe(@Param("recipeId") recipeId: string): Promise<GetRecipeResponse> {
    return this.recipeService.getOneRecipe(recipeId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  createRecipe(@Body() recipe: CreateRecipeDto): Promise<CreateListResponse> {
    return this.recipeService.createRecipe(recipe);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/add-item")
  addItemToRecipe(@Body() recipe: AddItemToRecipeDto): Promise<CreateListResponse> {
    return this.recipeService.addItemToRecipe(recipe);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/edit")
  editNamedRecipe(@Body() recipe: EditRecipeDto): Promise<EditNameRecipeResponse> {
    return this.recipeService.editNamedRecipe(recipe);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/edit-description")
  editDescriptionRecipe(@Body() recipe: EditDescriptionRecipeDto): Promise<EditDescriptionRecipeResponse> {
    return this.recipeService.editDescriptionRecipe(recipe);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:recipeId")
  deleteRecipe(@Param("recipeId") recipeId: string): Promise<DeleteRecipeResponse> {
    return this.recipeService.deleteRecipe(recipeId);
  }
}
