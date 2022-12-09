import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ListService } from "../list/list.service";
import { Basket } from "./basket.entity";
import { AddToBasketResponse, ClearBasketResponse, RemoveFromBasketResponse } from "../interfaces/basket";

@Injectable()
export class BasketService {
  constructor(@Inject(forwardRef(() => ListService)) private listService: ListService) {}

  async addToBasket(itemId: string, listId: string, userId: string): Promise<AddToBasketResponse> {
    const basket = new Basket();
    const list = await this.listService.getListOrFail(listId, userId);
    const item = await this.listService.getItemInListOrFail(itemId, userId);
    basket.list = list;
    basket.item = item;
    await basket.save();
    return { message: "Product added to basket" };
  }

  async removeFromBasket(itemId: string, listId: string): Promise<RemoveFromBasketResponse> {
    await Basket.delete({ list: { id: listId }, item: { id: itemId } });
    return { message: "Product remove from basket" };
  }

  async clearBasket(listId: string): Promise<ClearBasketResponse> {
    await Basket.delete({ list: { id: listId } });
    return { message: "Basket is empty." };
  }
}
