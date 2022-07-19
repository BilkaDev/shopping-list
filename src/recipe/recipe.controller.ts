import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from '@nestjs/common';
import {DeleteRecipeResponse, EditNameRecipeResponse, GetRecipesResponse} from "../interfaces/recipe/recipe";
import {RecipeService} from "./recipe.service";
import {CreateListResponse} from "../interfaces/list/list";
import {CreateRecipeDto} from "./dto/create-recipe";
import {AddItemToRecipeDto} from "./dto/add-item-to-recipe";

@Controller('recipe')
export class RecipeController {
    constructor(
        @Inject(RecipeService) private recipeService: RecipeService,
    ) {
    }

    @Get('/:userId')
    getUserRecipes(
        @Param('userId') userId: string,
    ): Promise<GetRecipesResponse> {
        return this.recipeService.getUserRecipes(userId);
    }


    @Post('/')
    createRecipe(
        @Body() recipe: CreateRecipeDto,
    ): Promise<CreateListResponse> {
        return this.recipeService.createRecipe(recipe);
    }

    @Post('/add-item')
    addItemToRecipt(
        @Body() recipe: AddItemToRecipeDto,
    ): Promise<CreateListResponse> {
        return this.recipeService.addItemToRecipe(recipe);
    }

    @Patch('/edit/:id/:name')
    editNamedRecipe(
        @Param('id') id: string,
        @Param('name') newName: string,
    ): Promise<EditNameRecipeResponse> {
        return this.recipeService.editNamedRecipe(id, newName);
    }

    @Delete('/:id')
    deleteRecipe(
        @Param('id') recipeId: string): Promise<DeleteRecipeResponse> {
        return this.recipeService.deleteRecipe(recipeId);
    }

}
