import { Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "../user/user.entity";
import { BasketService } from "./basket.service";

@Controller("basket")
export class BasketController {
  constructor(private basketService: BasketService) {}

  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/ad-to-basket/:itemId/:listId")
  addToBasket(@UserObj() user: User, @Param("itemId") itemId: string, @Param("listId") listId: string) {
    return this.basketService.addToBasket(itemId, listId, user.id);
  }

  // @UseGuards(AuthGuard("jwt"))
  // @Patch("/item/remove-from-basket/:itemId")
  // removeFromBasket(@UserObj() user: User, @Param("itemId") itemId: string) {
  //   return this.listService.removeFromBasket(itemId, user.id);
  // }
  //
  // @UseGuards(AuthGuard("jwt"))
  // @Patch("/clear-basket/:listId")
  // clearBasket(@UserObj() user: User, @Param("listId") listId: string) {
  //   return this.listService.clearBasket(listId, user.id);
  // }
}
