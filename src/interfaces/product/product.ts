import {ItemInList} from "../../list/item-in-list.entity";
import {CreateProductDto} from "../../product/dto/create-product";
import {UpdateProductDto} from "../../product/dto/update-product";

export interface ProductInterface {
    id: string;
    name: string;
    category: ProductCategory;
    items: ItemInList[];
}

export enum ProductCategory {
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
export type UpdateProductResponse = DeleteProductResponse;


export type CreateProductRequest = CreateProductDto;
export type UpdateProductRequest = UpdateProductDto;