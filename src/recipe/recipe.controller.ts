import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from '@nestjs/common';
import {DeleteRecipeResponse, EditNameRecipeResponse, GetRecipsResponse} from "../interfaces/recipe/recipe";
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

    @Get('/')
    getLists(): Promise<GetRecipsResponse> {
        return this.recipeService.getRecips();
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
        return this.recipeService.addItemToRecipt(recipe);
    }

    @Patch('/edit/:id/:name')
    editNamedRecipe(
        @Param('id') id: string,
        @Param('name') newName: string,
    ): Promise<EditNameRecipeResponse> {
        return this.recipeService.editNamedRecipe(id, newName);
    }

    @Delete()
    deleteRecipe(recipeId: string): Promise<DeleteRecipeResponse> {
        return this.recipeService.deleteRecipe(recipeId);
    }

}
