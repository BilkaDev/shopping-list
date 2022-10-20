import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
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
import { AuthGuard } from "@nestjs/passport";

@Controller("list")
export class ListController {
  constructor(@Inject(ListService) private listService: ListService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/:userId")
  getUserLists(@Param("userId") userId: string): Promise<GetListsResponse> {
    return this.listService.getUserLists(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/item/:userId")
  getListOfItems(@Param("userId") userId: string): Promise<GetListOfItemsResponse> {
    return this.listService.getListOfItems(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/user/:id")
  getList(@Param("id") id: string): Promise<GetListResponse> {
    return this.listService.getList(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  createList(@Body() list: CreateListDto): Promise<CreateListResponse> {
    return this.listService.createList(list);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/add-recipe/:listId/:recipeId")
  addRecipeToList(@Param("listId") listId: string, @Param("recipeId") recipeId: string): Promise<DeleteRecipeFromListResponse> {
    return this.listService.addRecipeToList(listId, recipeId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/delete-recipe/:listId/:recipeId")
  deleteRecipeFromList(@Param("listId") listId: string, @Param("recipeId") recipeId: string): Promise<AddRecipeToListResponse> {
    return this.listService.deleteRecipeFromList(listId, recipeId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/item") //auth userId
  addProductToList(@Body() newProduct: CreateItemInListDto): Promise<AddItemtoListResponse> {
    return this.listService.addItemToList(newProduct);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/:id")
  editList(@Param("id") id: string, @Body() list: CreateListDto): Promise<EditListResponse> {
    return this.listService.editList(id, list);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/:id")
  updateItemInList(@Param("id") id: string, @Body() items: UpdateItemsListDto): Promise<UpdateItemInListResponse> {
    return this.listService.updateItemInList(id, items);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/ad-to-basket/:id")
  addToBasket(@Param("id") id: string): Promise<AddToBasketResponse> {
    return this.listService.addToBasket(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/remove-from-basket/:id")
  removeFromBasket(@Param("id") id: string): Promise<RemoveFromBasketResponse> {
    return this.listService.removeFromBasket(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/clear-basket/:listId")
  clearBasket(@Param("id") id: string): Promise<ClearBasketResponse> {
    return this.listService.clearBasket(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:id")
  deleteList(@Param("id") id: string): Promise<DeleteListResponse> {
    return this.listService.deleteList(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/item/:id")
  deleteItemInList(@Param("id") id: string): Promise<DeleteListResponse> {
    return this.listService.deleteItemInList(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/item/clear/:id")
  clearList(@Param("id") id: string): Promise<DeleteListResponse> {
    return this.listService.clearList(id);
  }
}
