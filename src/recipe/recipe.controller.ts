import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { CreateRecipeDto } from "./dto/create-recipe";
import { AddItemToRecipeDto } from "./dto/add-item-to-recipe";
import { EditRecipeDto } from "./dto/edit-name-recipe";
import { EditDescriptionRecipeDto } from "./dto/edit-description-recipe";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "../user/user.entity";

@Controller("recipe")
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/:userId")
  getUserRecipes(@Param("userId") userId: string) {
    return this.recipeService.getUserRecipes(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/user/:recipeId")
  getOneRecipe(@UserObj() user: User, @Param("recipeId") recipeId: string) {
    return this.recipeService.getOneRecipe(recipeId, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  createRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.createRecipe(recipe);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/add-item")
  addItemToRecipe(@UserObj() user: User, @Body() recipe: AddItemToRecipeDto) {
    return this.recipeService.addItemToRecipe(recipe, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/edit")
  editNamedRecipe(@UserObj() user: User, @Body() recipe: EditRecipeDto) {
    return this.recipeService.editNamedRecipe(recipe, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/edit-description")
  editDescriptionRecipe(@UserObj() user: User, @Body() recipe: EditDescriptionRecipeDto) {
    return this.recipeService.editDescriptionRecipe(recipe, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:recipeId")
  deleteRecipe(@UserObj() user: User, @Param("recipeId") recipeId: string) {
    return this.recipeService.deleteRecipe(recipeId, user.id);
  }
}
