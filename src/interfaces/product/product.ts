export interface ProductInterface {
    id:string;
    name: string;
    category: productCategory
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

export type ProductListResponse = ProductInterface[]
export type GetProductResponse = ProductInterface
export type ProductCategory = productCategory;