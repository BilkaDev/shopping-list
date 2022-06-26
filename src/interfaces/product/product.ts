import {ItemInList} from "../../list/item-in-list.entity";

export interface ProductInterface {
    id: string;
    name: string;
    category: productCategory;
    items: ItemInList[];
}

export enum productCategory {
    "róźne",
    "warzywa i owoce",
    "mięso",
    "Produkty zbożowe",
    "Produkty mleczne",
    "Słodycze",
}

export type AddProductResponse = {
    isSuccess: true;
    id: string;
} | {
    isSuccess: false;
}

export type DeleteProductResponse = {
    isSuccess: boolean;
}

export type ProductListResponse = ProductInterface[];
export type GetProductResponse = ProductInterface;
export type ProductCategory = productCategory;
export type UpdateProductResponse = DeleteProductResponse;