import { CreateProductDto } from "../../product/dto/create-product";
import { UpdateProductDto } from "../../product/dto/update-product";

export interface ProductInterface {
  id: string;
  name: string;
  category: ProductCategory;
}

export enum ProductCategory {
  "Other",
  "Fruits and vegetables",
  "Meat",
  "Cereal products",
  "Milk products",
  "Candy",
}

export type AddProductResponse = {
  product: { id: string };
};

export type DeleteProductResponse = {
  message: string;
};

export type ProductListResponse = {
  products: ProductInterface[];
};

export type UpdateProductResponse = DeleteProductResponse;

export type CreateProductRequest = CreateProductDto;
export type UpdateProductRequest = UpdateProductDto;
