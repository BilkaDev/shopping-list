import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { AddProductResponse, DeleteProductResponse, ProductListResponse, UpdateProductResponse } from "../interfaces";
import { CreateProductDto } from "./dto/create-product";
import { User } from "../user/user.entity";
import { UpdateProductDto } from "./dto/update-product";
import { ILike } from "typeorm";

@Injectable()
export class ProductService {
  async hasProducts(userId: string, name: string): Promise<boolean> {
    const products = await Product.find({
      where: {
        user: { id: userId },
        name: ILike(name),
      },
    });
    return products.length > 0;
  }

  async getUserProducts(userId: string): Promise<ProductListResponse> {
    const products = await Product.find({
      where: {
        user: { id: userId },
      },
    });
    return {
      isSuccess: true,
      products,
    };
  }

  async getProduct(productId: string): Promise<Product> {
    return await Product.findOne({ where: { id: productId } });
  }

  async addProduct(product: CreateProductDto, user: User): Promise<AddProductResponse> {
    const { name, category } = product;
    const productItem = await this.hasProducts(user.id, name);
    if (productItem) {
      return { isSuccess: false };
    }
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.category = category;
    newProduct.user = user;

    await newProduct.save();
    return {
      id: newProduct.id,
      isSuccess: true,
    };
  }

  async deleteProduct(productId: string): Promise<DeleteProductResponse> {
    const item = await this.getProduct(productId);
    if (item) {
      await item.remove();
      return {
        isSuccess: true,
      };
    } else
      return {
        isSuccess: false,
      };
  }

  async updateProduct(productId: string, userId: string, updateProduct: UpdateProductDto): Promise<UpdateProductResponse> {
    const { category, name } = updateProduct;
    const isProductName = await this.hasProducts(userId, name);
    const product = await this.getProduct(productId);

    if (name === product.name || (!isProductName && product && name !== product.name)) {
      const { affected } = await Product.update(productId, {
        name,
        category,
      });
      if (affected) {
        return { isSuccess: true };
      }
    }
    return {
      isSuccess: false,
    };
  }
}
