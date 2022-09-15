import { CreateItemInListDto } from "../../list/dto/create-item-in-list";
import { ProductInterface } from "../product";

export interface ItemInListInterface {
  id: string;
  product: ProductInterface;
  count: number;
  weight: number;
  itemInBasket: boolean;
}

export type AddItemtoListResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export type DeleteItemInListResponse = {
  isSuccess: boolean;
};
export type UpdateItemInListResponse = DeleteItemInListResponse;
export type GetListOfItemsResponse = ItemInListInterface[];
export type GetItemInList = ItemInListInterface;
export type CreateItemInListRequest = CreateItemInListDto;

export type AddToBasketResponse = { isSuccess: boolean };
export type RemoveFromBasketResponse = { isSuccess: boolean };
export type ClearBasketResponse = { isSuccess: boolean };
