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

  async noListNameOrFail(userId: string, name: string): Promise<boolean> {
    const list = await List.findOne({
      where: {
        user: { id: userId },
        listName: ILike(name),
      },
    });
    if (list) throw new BadRequestException("The given name is already taken.");
    return true;
  }

  async getListOrFail(listId: string, userId: string): Promise<List> {
    const list = await List.findOne({
      where: {
        id: listId,
        user: { id: userId },
      },
      relations: ["items", "recipes", "recipes.items"],
    });
    if (!list) {
      throw new NotFoundException("List does not exist.");
    }
    return list;
  }

  async getItemInListOrFail(id: string, userId: string): Promise<ItemInList> {
    const item = await ItemInList.findOne({ where: { id, product: { user: { id: userId } } } });
    if (!item) throw new NotFoundException("Product item does not exist.");
    return item;
  }

  async getUserLists(userId: string): Promise<GetListsResponse> {
    const lists = await List.find({ where: { user: { id: userId } } });
    return { lists };
  }

  async getListResponse(listId: string, userId: string): Promise<GetListResponse> {
    const list = await this.getListOrFail(listId, userId);
    return { list };
  }

  async createList({ listName }: CreateListDto, user: User): Promise<CreateListResponse> {
    const newList = new List();
    await this.noListNameOrFail(user.id, listName);
    newList.listName = listName;
    newList.user = user;
    await newList.save();
    return {
      id: newList.id,
    };
  }

  async deleteList(listId: string, userId: string): Promise<DeleteListResponse> {
    const list = await this.getListOrFail(listId, userId);
    await list.remove();
    return { message: "List was deleted successfully!" };
  }

  async editList(listId: string, { listName }: CreateListDto, userId: string): Promise<EditListResponse> {
    await this.noListNameOrFail(userId, listName);
    const { affected } = await List.update(listId, {
      listName,
    });
    if (affected) return { message: "List has been updated!" };
    else {
      throw new NotFoundException("List does not exist.");
    }
  }

  async addItemToList(item: CreateItemInListDto, userId: string): Promise<AddItemToListResponse> {
    const newItem = await this.createItem(item);
    if (item.listId) {
      const list = await this.getListOrFail(item.listId, userId);
      list.items.push(newItem);
      await list.save();
      return {
        id: newItem.id,
      };
    } else if (item.recipeId) {
      const recipe = await this.recipeService.getOneRecipeOrFail(item.recipeId, userId);
      recipe.items.push(newItem);
      await recipe.save();
      return {
        id: newItem.id,
      };
    }
  }

  async createItem({ itemId, count, weight }: CreateItemInListDto): Promise<ItemInList> {
    const product = await this.productService.getProductOrFail(itemId);
    const newItem = new ItemInList();
    newItem.product = product;
    newItem.count = count;
    newItem.weight = weight;
    await newItem.save();
    return newItem;
  }

  async getListOfItems(userId: string): Promise<GetListOfItemsResponse> {
    const itemsList = await ItemInList.find({ where: { product: { user: { id: userId } } } });
    return { items: itemsList };
  }

  async updateItemInList(itemId: string, { count, weight, category }: UpdateItemsListDto, userId: string): Promise<UpdateItemInListResponse> {
    const item = await this.getItemInListOrFail(itemId, userId);
    item.count = count;
    item.weight = weight;
    item.product.category = category;
    await item.product.save();
    await item.save();
    return { message: "Product has been updated!" };
  }

  async deleteItemInList(itemId: string, userId: string): Promise<DeleteItemInListResponse> {
    const item = await this.getItemInListOrFail(itemId, userId);
    await item.remove();
    return { message: "Product has been remove!" };
  }

  async clearList(listId: string, userId: string): Promise<ClearListResponse> {
    const list = await this.getListOrFail(listId, userId);
    for (const item of list.items) {
      await item.remove();
    }
    await list.save();
    return { message: "List has been cleared!" };
  }

  async addRecipeToList(listId: string, recipeId: string, userId: string): Promise<AddRecipeToListResponse> {
    const list = await this.getListOrFail(listId, userId);
    const recipe = await this.recipeService.getOneRecipeOrFail(recipeId, userId);
    list.recipes.push(recipe);
    await list.save();
    return { message: "Recipe has been added!" };
  }

  async deleteRecipeFromList(listId: string, recipeId: string, userId: string): Promise<DeleteRecipeFromListResponse> {
    const list = await this.getListOrFail(listId, userId);
    list.recipes = list.recipes.filter(recipeInList => {
      return recipeInList.id !== recipeId;
    });
    await list.save();
    return { message: "Recipe has been remove!" };
  }

  async addToBasket(itemId: string, userId: string): Promise<AddToBasketResponse> {
    const item = await this.getItemInListOrFail(itemId, userId);
    item.itemInBasket = true;
    await item.save();
    return { message: "Product added to basket" };
  }

  async removeFromBasket(itemId: string, userId: string): Promise<RemoveFromBasketResponse> {
    const item = await this.getItemInListOrFail(itemId, userId);
    item.itemInBasket = false;
    await item.save();
    return { message: "Product remove from basket" };
  }

  async clearBasket(listId: string, userId: string): Promise<ClearBasketResponse> {
    const list = await this.getListOrFail(listId, userId);
    for (const item of list.items) {
      item.itemInBasket = false;
      await item.save();
    }
    for (const recipe of list.recipes) {
      for (const item of recipe.items) {
        item.itemInBasket = false;
        await item.save();
      }
    }
    return { message: "Basket is empty." };
  }
}
