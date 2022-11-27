import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
      products,
    };
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException("Product does not exist.");
    }
    return product;
  }

  async addProduct(product: CreateProductDto, user: User): Promise<AddProductResponse> {
    const { name, category } = product;
    const productItem = await this.hasProducts(user.id, name);
    if (productItem) {
      throw new BadRequestException("The given product name is taken");
    }
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.category = category;
    newProduct.user = user;

    await newProduct.save();
    return {
      id: newProduct.id,
    };
  }

  async deleteProduct(productId: string): Promise<DeleteProductResponse> {
    const item = await this.getProduct(productId);
    if (item) {
      await item.remove();
      return {
        isSuccess: true,
      };
    } else {
      throw new NotFoundException("Product does not exist.");
    }
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
    throw new BadRequestException("The given name is already taken.");
  }
}
