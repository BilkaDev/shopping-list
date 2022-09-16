import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ListService } from "./list.service";
import {
  AddRecipeToListResponse,
  AddToBasketResponse,
  ClearBasketResponse,
  CreateListResponse,
  DeleteListResponse,
  DeleteRecipeFromListResponse,
  EditListResponse,
  GetListResponse,
  GetListsResponse,
  RemoveFromBasketResponse,
} from "../interfaces";
import { CreateListDto } from "./dto/create-list";
import { CreateItemInListDto } from "./dto/create-item-in-list";
import { AddItemtoListResponse, GetListOfItemsResponse, UpdateItemInListResponse } from "../interfaces";
import { UpdateItemsListDto } from "./dto/update-item-in-list";

@Controller("list")
export class ListController {
  constructor(@Inject(ListService) private listService: ListService) {}

  @Get("/:userId")
  getUserLists(@Param("userId") userId: string): Promise<GetListsResponse> {
    return this.listService.getUserLists(userId);
  }

  @Get("/item/:userId")
  getListOfItems(@Param("userId") userId: string): Promise<GetListOfItemsResponse> {
    return this.listService.getListOfItems(userId);
  }

  @Get("/user/:id")
  getList(@Param("id") id: string): Promise<GetListResponse> {
    return this.listService.getList(id);
  }

  @Post("/")
  createList(@Body() list: CreateListDto): Promise<CreateListResponse> {
    return this.listService.createList(list);
  }

  @Post("/add-recipe/:listId/:recipeId")
  addRecipeToList(@Param("listId") listId: string, @Param("recipeId") recipeId: string): Promise<DeleteRecipeFromListResponse> {
    return this.listService.addRecipeToList(listId, recipeId);
  }

  @Delete("/delete-recipe/:listId/:recipeId")
  deleteRecipeFromList(@Param("listId") listId: string, @Param("recipeId") recipeId: string): Promise<AddRecipeToListResponse> {
    return this.listService.deleteRecipeFromList(listId, recipeId);
  }

  @Post("/item") //auth userId
  addProductToList(@Body() newProduct: CreateItemInListDto): Promise<AddItemtoListResponse> {
    return this.listService.addItemToList(newProduct);
  }

  @Patch("/:id")
  editList(@Param("id") id: string, @Body() list: CreateListDto): Promise<EditListResponse> {
    return this.listService.editList(id, list);
  }

  @Patch("/item/:id")
  updateItemInList(@Param("id") id: string, @Body() items: UpdateItemsListDto): Promise<UpdateItemInListResponse> {
    return this.listService.updateItemInList(id, items);
  }

  @Patch("/item/ad-to-basket/:id")
  addToBasket(@Param("id") id: string): Promise<AddToBasketResponse> {
    return this.listService.addToBasket(id);
  }

  @Patch("/item/remove-from-basket/:id")
  removeFromBasket(@Param("id") id: string): Promise<RemoveFromBasketResponse> {
    return this.listService.removeFromBasket(id);
  }

  @Patch("/clear-basket/:listId")
  clearBasket(@Param("id") id: string): Promise<ClearBasketResponse> {
    return this.listService.clearBasket(id);
  }

  @Delete("/:id")
  deleteList(@Param("id") id: string): Promise<DeleteListResponse> {
    return this.listService.deleteList(id);
  }

  @Delete("/item/:id")
  deleteItemInList(@Param("id") id: string): Promise<DeleteListResponse> {
    return this.listService.deleteItemInList(id);
  }

  @Delete("/item/clear/:id")
  clearList(@Param("id") id: string): Promise<DeleteListResponse> {
    return this.listService.clearList(id);
  }
}
