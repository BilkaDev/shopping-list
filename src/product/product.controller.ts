import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AddProductResponse, DeleteProductResponse, GetProductResponse, ProductListResponse, UpdateProductResponse } from "../interfaces";
import { CreateProductDto } from "./dto/create-product";
import { UpdateProductDto } from "./dto/update-product";

@Controller("product")
export class ProductController {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Get("/:userId")
  getUserProductsList(@Param("userId") userId: string): Promise<ProductListResponse> {
    return this.productService.getUserProducts(userId);
  }

  @Get("/item/:id")
  getProduct(@Param("id") id: string): Promise<GetProductResponse> {
    return this.productService.getProduct(id);
  }

  @Post("/")
  addProduct(@Body() product: CreateProductDto): Promise<AddProductResponse> {
    return this.productService.addProduct(product);
  }

  @Delete("/:id")
  removeProduct(@Param("id") id: string): Promise<DeleteProductResponse> {
    return this.productService.deleteProduct(id);
  }

  @Patch("/:productId/:userId")
  updateProduct(@Param("productId") productId: string, @Param("userId") userId: string, @Body() product: UpdateProductDto): Promise<UpdateProductResponse> {
    return this.productService.updateProduct(productId, userId, product);
  }
}
