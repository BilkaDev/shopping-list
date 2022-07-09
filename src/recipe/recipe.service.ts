import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {Recipe} from "./recipe.entity";
import {CreateRecipeDto} from "./dto/create-recipe";
import {
    AddItemToRecipe,
    CreateRecipeResponse,
    DeleteRecipeResponse,
    EditNameRecipeResponse
} from "../interfaces/recipe/recipe";
import {ListService} from 'src/list/list.service';
import {AddItemToRecipeDto} from "./dto/add-item-to-recipe";
import {UserService} from "../user/user.service";

@Injectable()
export class RecipeService {
    constructor(
        @Inject(forwardRef(() => ListService)) private listService: ListService,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
    ) {
    }

    async createRecipe(recipe: CreateRecipeDto): Promise<CreateRecipeResponse> {
        const user = await this.userService.getOneUser(recipe.userId);
        if (!user) return {isSuccess: false};
        console.log(user);
        const checkName = await this.hasRecipe(recipe.userId, recipe.name);
        if (!checkName) {
            const newRecipe = new Recipe();
            newRecipe.items = [];
            for (const item of recipe.items) {
                const createItem = await this.listService.createItem({
                    itemId: item.itemId,
                    count: item.count,
                    weight: item.weight,
                });
                console.log(newRecipe);
                newRecipe.items.push(createItem);
            }
            newRecipe.description = recipe.description;
            newRecipe.name = recipe.name;
            newRecipe.user = user;
            await newRecipe.save();
            return {
                isSuccess: true,
                id: newRecipe.id,
            };
        } else return {isSuccess: false};
    }

    private async hasRecipe(userId: string, name: string) {
        return (await this.getUserRecipes(userId)).some(recipe => recipe.name.toLowerCase() === name.toLowerCase());
    }

    async getUserRecipes(userId: string) {
        return await Recipe.find({
            where: {user: {id: userId}},
            relations: ['items']
        });
    }

    async addItemToRecipe(item: AddItemToRecipeDto): Promise<AddItemToRecipe> {
        const recipe = await this.getOneRecipe(item.recipeId);
        if (recipe) {
            const createItem = await this.listService.createItem({
                itemId: item.itemId,
                count: item.count,
                weight: item.weight,
            });
            recipe.items.push(createItem);
            await recipe.save();
            return {
                id: createItem.id,
                isSuccess: true,
            };
        } else return {isSuccess: false};
    }

    async getOneRecipe(id: string) {
        try {
            return await Recipe.findOneOrFail({
                where: {id},
                relations: ['items']
            });
        } catch (e) {
            return false;
        }
    }

    async editNamedRecipe(id: string, newName: string): Promise<EditNameRecipeResponse> {
        const recipe = await this.getOneRecipe(id);
        if (recipe) {
            recipe.name = newName;
            await recipe.save();
            return {isSuccess: true,};
        } else return {isSuccess: false};
    }

    async deleteRecipe(recipeId: string): Promise<DeleteRecipeResponse> {
        const recipe = await this.getOneRecipe(recipeId);
        if (recipe) {
            await recipe.remove();
            return {isSuccess: true};
        } else return {isSuccess: false};
    }
}
