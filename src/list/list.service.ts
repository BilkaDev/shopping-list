import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { List } from "./list.entity";
import { CreateListDto } from "./dto/create-list";
import { AddRecipeToListResponse, CreateListResponse, DeleteListResponse, EditListResponse } from "../interfaces";
import { CreateItemInListDto } from "./dto/create-item-in-list";
import { AddItemtoListResponse, UpdateItemInListResponse } from "../interfaces";
import { ProductService } from "../product/product.service";
import { ItemInList } from "./item-in-list.entity";
import { UpdateItemsListDto } from "./dto/update-item-in-list";
import { RecipeService } from "../recipe/recipe.service";
import { UserService } from "../user/user.service";

@Injectable()
export class ListService {
  constructor(
    @Inject(forwardRef(() => ProductService)) private productService: ProductService,
    @Inject(forwardRef(() => RecipeService)) private recipeService: RecipeService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async getUserLists(userId: string): Promise<List[]> {
    return await List.find({ where: { user: { id: userId } } });
  }

  async getList(id: string): Promise<List> {
    return await List.findOne({
      where: { id },
      relations: ["items", "recipes", "recipes.items"],
    });
  }

  async hasList(userId, name: string): Promise<boolean> {
    return (await this.getUserLists(userId)).some(list => list.listName.toLowerCase() === name.toLowerCase());
  }

  async createList(list: CreateListDto): Promise<CreateListResponse> {
    const newList = new List();
    const user = await this.userService.getOneUser(list.userId);
    if (!user) return { isSuccess: false };
    const checkName = await this.hasList(user.id, list.listName);
    if (!checkName) {
      newList.listName = list.listName;
      newList.user = user;
      await newList.save();
      return {
        isSuccess: true,
        id: newList.id,
      };
    } else return { isSuccess: false };
  }

  async deleteList(id: string): Promise<DeleteListResponse> {
    const list = await this.getList(id);
    if (list) {
      // for (const item of list.items) {
      //     await item.remove();
      // }
      await list.remove();
      return {
        isSuccess: true,
      };
    } else
      return {
        isSuccess: false,
      };
  }

  async editList(id: string, list: CreateListDto): Promise<EditListResponse> {
    const { listName } = list;
    const check = await this.hasList(list.userId, listName);
    if (!check) {
      const { affected } = await List.update(id, {
        listName,
      });
      if (affected) {
        return { isSuccess: true };
      }
    }
    return {
      isSuccess: false,
    };
  }

  async addItemToList(item: CreateItemInListDto): Promise<AddItemtoListResponse> {
    const newItem = await this.createItem(item);
    if (item.listId && newItem) {
      const list = await this.getList(item.listId);
      list.items.push(newItem);
      await list.save();
      return {
        isSuccess: true,
        id: newItem.id,
      };
    } else if (item.recipeId && newItem) {
      const recipe = await this.recipeService.getOneRecipe(item.recipeId);
      recipe.items.push(newItem);
      await recipe.save();
      return {
        isSuccess: true,
        id: newItem.id,
      };
    } else
      return {
        isSuccess: false,
      };
  }

  // service Items in list
  async getListOfItems(userId): Promise<ItemInList[]> {
    return await ItemInList.find({ where: { product: { user: { id: userId } } } });
  }

  async getItemInList(id: string): Promise<ItemInList> {
    return await ItemInList.findOne({ where: { id } });
  }

  async createItem(item: CreateItemInListDto): Promise<ItemInList> {
    try {
      const product = await this.productService.getProduct(item.itemId);
      const newItem = new ItemInList();
      newItem.product = product;
      newItem.count = item.count;
      newItem.weight = item.weight;
      await newItem.save();
      return newItem;
    } catch (e) {
      return;
    }
  }

  async updateItemInList(id: string, newItem: UpdateItemsListDto): Promise<UpdateItemInListResponse> {
    const item = await this.getItemInList(id);
    if (item) {
      item.count = newItem.count;
      item.weight = newItem.weight;
      item.product.category = newItem.category;
      await item.product.save();
      await item.save();
      return {
        isSuccess: true,
      };
    } else {
      return { isSuccess: false };
    }
  }

  async deleteItemInList(id: string) {
    const item = await this.getItemInList(id);
    if (item) {
      await item.remove();
      return { isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  }

  async clearList(id: string) {
    const list = await this.getList(id);
    if (list) {
      for (const item of list.items) {
        await item.remove();
      }
      await list.save();
      return { isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  }

  async addRecipeToList(listId: string, recipeId: string): Promise<AddRecipeToListResponse> {
    const list = await this.getList(listId);
    const recipe = await this.recipeService.getOneRecipe(recipeId);
    if (list && recipe) {
      list.recipes.push(recipe);
      await list.save();
      return { isSuccess: true };
    } else return { isSuccess: false };
  }

  async deleteRecipeFromList(listId: string, recipeId: string) {
    const list = await this.getList(listId);
    if (list) {
      list.recipes = list.recipes.filter(recipeInList => {
        return recipeInList.id !== recipeId;
      });
      await list.save();
      return { isSuccess: true };
    } else return { isSuccess: false };
  }

  async addToBasket(id: string) {
    const item = await this.getItemInList(id);
    if (item) {
      item.itemInBasket = true;
      await item.save();
      return { isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  }

  async removeFromBasket(id: string) {
    const item = await this.getItemInList(id);
    if (item) {
      item.itemInBasket = false;
      await item.save();
      return { isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  }

  async clearBasket(id: string) {
    const list = await this.getList(id);
    if (list) {
      for await (const item of list.items) {
        item.itemInBasket = false;
        await item.save();
      }
      for await (const recipe of list.recipes) {
        for await (const item of recipe.items) {
          item.itemInBasket = false;
          await item.save();
        }
      }
      console.log(list.recipes[0].items);
      return { isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  }
}
