import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create-list";
import { CreateItemInListDto } from "./dto/create-item-in-list";
import { UpdateItemsListDto } from "./dto/update-item-in-list";
import { AuthGuard } from "@nestjs/passport";

@Controller("list")
export class ListController {
  constructor(private listService: ListService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/:userId")
  getUserLists(@Param("userId") userId: string) {
    return this.listService.getUserLists(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/item/:userId")
  getListOfItems(@Param("userId") userId: string) {
    return this.listService.getListOfItems(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/user/:listId")
  getList(@Param("listId") listId: string) {
    return this.listService.getList(listId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  createList(@Body() list: CreateListDto) {
    return this.listService.createList(list);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/add-recipe/:listId/:recipeId")
  addRecipeToList(@Param("listId") listId: string, @Param("recipeId") recipeId: string) {
    return this.listService.addRecipeToList(listId, recipeId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/delete-recipe/:listId/:recipeId")
  deleteRecipeFromList(@Param("listId") listId: string, @Param("recipeId") recipeId: string) {
    return this.listService.deleteRecipeFromList(listId, recipeId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/item") //auth userId
  addProductToList(@Body() newProduct: CreateItemInListDto) {
    return this.listService.addItemToList(newProduct);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/:listId")
  editList(@Param("listId") listId: string, @Body() list: CreateListDto) {
    return this.listService.editList(listId, list);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/:itemId")
  updateItemInList(@Param("itemId") itemId: string, @Body() items: UpdateItemsListDto) {
    return this.listService.updateItemInList(itemId, items);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/ad-to-basket/:itemId")
  addToBasket(@Param("itemId") itemId: string) {
    return this.listService.addToBasket(itemId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/remove-from-basket/:itemId")
  removeFromBasket(@Param("itemId") itemId: string) {
    return this.listService.removeFromBasket(itemId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/clear-basket/:listId")
  clearBasket(@Param("listId") listId: string) {
    return this.listService.clearBasket(listId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:listId")
  deleteList(@Param("listId") listId: string) {
    return this.listService.deleteList(listId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/item/:itemId")
  deleteItemInList(@Param("itemId") itemId: string) {
    return this.listService.deleteItemInList(itemId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/item/clear/:listId")
  clearList(@Param("listId") listId: string) {
    return this.listService.clearList(listId);
  }
}
