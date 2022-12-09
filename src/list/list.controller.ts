import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create-list";
import { CreateItemInListDto } from "./dto/create-item-in-list";
import { UpdateItemsListDto } from "./dto/update-item-in-list";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "../user/user.entity";

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
  getList(@UserObj() user: User, @Param("listId") listId: string) {
    return this.listService.getListResponse(listId, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  createList(@UserObj() user: User, @Body() list: CreateListDto) {
    return this.listService.createList(list, user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/add-recipe/:listId/:recipeId")
  addRecipeToList(@UserObj() user: User, @Param("listId") listId: string, @Param("recipeId") recipeId: string) {
    return this.listService.addRecipeToList(listId, recipeId, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/delete-recipe/:listId/:recipeId")
  deleteRecipeFromList(@UserObj() user: User, @Param("listId") listId: string, @Param("recipeId") recipeId: string) {
    return this.listService.deleteRecipeFromList(listId, recipeId, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/item")
  addProductToList(@UserObj() user: User, @Body() newProduct: CreateItemInListDto) {
    return this.listService.addItemToList(newProduct, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/:listId")
  editList(@UserObj() user: User, @Param("listId") listId: string, @Body() list: CreateListDto) {
    return this.listService.editList(listId, list, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/:itemId")
  updateItemInList(@UserObj() user: User, @Param("itemId") itemId: string, @Body() items: UpdateItemsListDto) {
    return this.listService.updateItemInList(itemId, items, user.id);
  }
  @UseGuards(AuthGuard("jwt"))
  @Delete("/:listId")
  deleteList(@UserObj() user: User, @Param("listId") listId: string) {
    return this.listService.deleteList(listId, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/item/:itemId")
  deleteItemInList(@UserObj() user: User, @Param("itemId") itemId: string) {
    return this.listService.deleteItemInList(itemId, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/item/clear/:listId")
  clearList(@UserObj() user: User, @Param("listId") listId: string) {
    return this.listService.clearList(listId, user.id);
  }
}
