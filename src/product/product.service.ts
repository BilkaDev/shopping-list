import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";
import { AddProductResponse, DeleteProductResponse, ProductListResponse, UpdateProductResponse } from "../interfaces";
import { CreateProductDto } from "./dto/create-product";
import { User } from "../user/user.entity";
import { UpdateProductDto } from "./dto/update-product";
import { ILike } from "typeorm";

@Injectable()
export class ProductService {
  async noProductNameOrFail(userId: string, name: string): Promise<boolean> {
    const product = await Product.findOne({
      where: {
        user: { id: userId },
        name: ILike(name),
      },
    });
    if (product) throw new BadRequestException("The given product name is taken");
    return true;
  }

  async getUserProducts(userId: string): Promise<ProductListResponse> {
    const products = await Product.find({
      where: {
        user: { id: userId },
      },
    });
    return { products };
  }

  async getProductOrFail(productId: string): Promise<Product> {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException("Product does not exist.");
    return product;
  }

  async addProduct({ name, category }: CreateProductDto, user: User): Promise<AddProductResponse> {
    await this.noProductNameOrFail(user.id, name);

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.category = category;
    newProduct.user = user;

    await newProduct.save();
    return { product: { id: newProduct.id } };
  }

  async deleteProduct(productId: string): Promise<DeleteProductResponse> {
    const item = await this.getProductOrFail(productId);
    await item.remove();
    return { message: "Product was deleted successfully!" };
  }

  async updateProduct(productId: string, userId: string, { category, name }: UpdateProductDto): Promise<UpdateProductResponse> {
    const product = await this.getProductOrFail(productId);

    if (name === product.name || (await this.noProductNameOrFail(userId, name))) {
      const { affected } = await Product.update(productId, {
        name,
        category,
      });
      if (affected) return { message: "Product has been updated!" };
    }
  }
}
