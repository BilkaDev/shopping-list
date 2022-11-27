import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { List } from "./list.entity";
import { CreateListDto } from "./dto/create-list";
import {
  AddRecipeToListResponse,
  AddToBasketResponse,
  ClearBasketResponse,
  ClearListResponse,
  CreateListResponse,
  DeleteItemInListResponse,
  DeleteListResponse,
  DeleteRecipeFromListResponse,
  EditListResponse,
  GetListOfItemsResponse,
  GetListResponse,
  GetListsResponse,
  RemoveFromBasketResponse,
} from "../interfaces";
import { CreateItemInListDto } from "./dto/create-item-in-list";
import { AddItemToListResponse, UpdateItemInListResponse } from "../interfaces";
import { ProductService } from "../product/product.service";
import { ItemInList } from "./item-in-list.entity";
import { UpdateItemsListDto } from "./dto/update-item-in-list";
import { RecipeService } from "../recipe/recipe.service";
import { ILike } from "typeorm";
import { User } from "../user/user.entity";

@Injectable()
export class ListService {
  constructor(@Inject(ProductService) private productService: ProductService, @Inject(RecipeService) private recipeService: RecipeService) {}

  async hasList(userId: string, name: string): Promise<boolean> {
    const list = await List.find({
      where: {
        user: { id: userId },
        listName: ILike(name),
      },
    });
    return list.length > 0;
  }

  async getUserLists(userId: string): Promise<GetListsResponse> {
    const lists = await List.find({ where: { user: { id: userId } } });
    return { lists };
  }
  async getListResponse(listId: string, userId: string): Promise<GetListResponse> {
    const list = await this.getList(listId, userId);
    return { list };
  }

  async getList(listId: string, userId: string): Promise<List> {
    return await List.findOne({
      where: {
        id: listId,
        user: { id: userId },
      },
      relations: ["items", "recipes", "recipes.items"],
    });
  }

  async createList(list: CreateListDto, user: User): Promise<CreateListResponse> {
    const newList = new List();
    const checkName = await this.hasList(user.id, list.listName);
    if (!checkName) {
      newList.listName = list.listName;
      newList.user = user;
      await newList.save();
      return {
        id: newList.id,
      };
    } else throw new BadRequestException("The given list name is taken");
  }

  async deleteList(listId: string, userId: string): Promise<DeleteListResponse> {
    const list = await this.getList(listId, userId);
    if (list) {
      await list.remove();
      return { message: "List was deleted successfully!" };
    } else throw new NotFoundException("List does not exist.");
  }

  async editList(listId: string, list: CreateListDto, userId: string): Promise<EditListResponse> {
    const { listName } = list;
    const check = await this.hasList(userId, listName);
    if (!check) {
      const { affected } = await List.update(listId, {
        listName,
      });
      if (affected) return { message: "List has been updated!" };
    }
    throw new BadRequestException("The given name is already taken.");
  }

  // service Items in list
  async addItemToList(item: CreateItemInListDto, userId: string): Promise<AddItemToListResponse> {
    const newItem = await this.createItem(item);
    if (item.listId && newItem) {
      const list = await this.getList(item.listId, userId);
      list.items.push(newItem);
      await list.save();
      return {
        id: newItem.id,
      };
    } else if (item.recipeId && newItem) {
      const recipe = await this.recipeService.getOneRecipe(item.recipeId, userId);
      recipe.items.push(newItem);
      await recipe.save();
      return {
        id: newItem.id,
      };
    } else throw new Error("Sorry please try again later.");
  }

  async getItemInList(id: string, userId: string): Promise<ItemInList> {
    return await ItemInList.findOne({ where: { id, product: { user: { id: userId } } } });
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

  async getListOfItems(userId: string): Promise<GetListOfItemsResponse> {
    const itemsList = await ItemInList.find({ where: { product: { user: { id: userId } } } });
    return { items: itemsList };
  }

  async updateItemInList(itemId: string, newItem: UpdateItemsListDto, userId: string): Promise<UpdateItemInListResponse> {
    const item = await this.getItemInList(itemId, userId);
    if (item) {
      item.count = newItem.count;
      item.weight = newItem.weight;
      item.product.category = newItem.category;
      await item.product.save();
      await item.save();
      return { message: "Product has been updated!" };
    } else throw new NotFoundException("Product does not exist.");
  }

  async deleteItemInList(itemId: string, userId: string): Promise<DeleteItemInListResponse> {
    const item = await this.getItemInList(itemId, userId);
    if (item) {
      await item.remove();
      return { message: "Product has been remove!" };
    } else throw new NotFoundException("Product does not exist.");
  }

  async clearList(listId: string, userId: string): Promise<ClearListResponse> {
    const list = await this.getList(listId, userId);
    if (list) {
      for (const item of list.items) {
        await item.remove();
      }
      await list.save();
      return { message: "List has been cleared!" };
    } else throw new NotFoundException("List does not exist.");
  }

  async addRecipeToList(listId: string, recipeId: string, userId: string): Promise<AddRecipeToListResponse> {
    const list = await this.getList(listId, userId);
    if (!list) throw new NotFoundException("List does not exist.");

    const recipe = await this.recipeService.getOneRecipe(recipeId, userId);
    if (!recipe) throw new NotFoundException("Recipe does not exist.");

    list.recipes.push(recipe);
    await list.save();
    return { message: "Recipe has been added!" };
  }

  async deleteRecipeFromList(listId: string, recipeId: string, userId: string): Promise<DeleteRecipeFromListResponse> {
    const list = await this.getList(listId, userId);
    if (list) {
      list.recipes = list.recipes.filter(recipeInList => {
        return recipeInList.id !== recipeId;
      });
      await list.save();
      return { message: "Recipe has been remove!" };
    } else throw new NotFoundException("List does not exist.");
  }

  async addToBasket(itemId: string, userId: string): Promise<AddToBasketResponse> {
    const item = await this.getItemInList(itemId, userId);
    if (item) {
      item.itemInBasket = true;
      await item.save();
      return { message: "Product added to basket" };
    } else throw new NotFoundException("Product does not exist.");
  }

  async removeFromBasket(itemId: string, userId: string): Promise<RemoveFromBasketResponse> {
    const item = await this.getItemInList(itemId, userId);
    if (item) {
      item.itemInBasket = false;
      await item.save();
      return { message: "Product remove from basket" };
    } else throw new NotFoundException("Product does not exist.");
  }

  async clearBasket(listId: string, userId: string): Promise<ClearBasketResponse> {
    const list = await this.getList(listId, userId);
    if (list) {
      for (const item of list.items) {
        item.itemInBasket = false;
        await item.save();
      }
      for await (const recipe of list.recipes) {
        for await (const item of recipe.items) {
          item.itemInBasket = false;
          await item.save();
        }
      }
      return { message: "Basket is empty." };
    } else throw new NotFoundException("List does not exist.");
  }
}
