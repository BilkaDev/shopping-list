import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ListService } from "../list/list.service";
import { Basket } from "./basket.entity";

@Injectable()
export class BasketService {
  constructor(@Inject(forwardRef(() => ListService)) private listService: ListService) {}

  async getBasket(listId: string): Promise<Basket> {
    const basket = await Basket.findOne({ where: { list: { id: listId } } });
    if (!basket) throw new NotFoundException("Basket does not exist.");
    return basket;
  }
  async addToBasket(itemId: string, listId: string, userId: string) {
    const item = await this.listService.getItemInListOrFail(itemId, userId);
    const basket = await this.getBasket(listId);
    basket.items.push(item);
    await basket.save();
  }
}
