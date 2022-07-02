import {List} from "../../list/list.entity";
import {Product} from "../../product/product.entity";

export interface ItemInListInterface {
    id: string;
    product: Product;
    count: number;
    weight: number;
    list: List;
}

export type AddItemtoListResponse = {
    isSuccess: true,
    id: string,
} | {
    isSuccess: false,
}

export type DeleteItemInListResponse = {
    isSuccess: boolean,
}
export type UpdateItemInListResponse = DeleteItemInListResponse;
export type GetListOfItemsResponse = ItemInListInterface[];