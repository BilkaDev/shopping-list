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

export type AddProductResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export type DeleteProductResponse = {
  isSuccess: boolean;
};

export type ProductListResponse = {
  isSuccess: true;
  products: ProductInterface[];
};

export type GetProductResponse = ProductInterface;
export type UpdateProductResponse = DeleteProductResponse;

export type CreateProductRequest = CreateProductDto;
export type UpdateProductRequest = UpdateProductDto;
