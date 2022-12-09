import { Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "../user/user.entity";
import { BasketService } from "./basket.service";

@Controller("basket")
export class BasketController {
  constructor(private basketService: BasketService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("/:itemId/:listId")
  addToBasket(@UserObj() user: User, @Param("itemId") itemId: string, @Param("listId") listId: string) {
    return this.basketService.addToBasket(itemId, listId, user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/clear-basket/:listId")
  clearBasket(@UserObj() user: User, @Param("listId") listId: string) {
    return this.basketService.clearBasket(listId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:itemId/:listId")
  removeFromBasket(@Param("itemId") itemId: string, @Param("listId") listId: string) {
    return this.basketService.removeFromBasket(itemId, listId);
  }
}
