import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AddProductResponse, DeleteProductResponse, GetProductResponse, ProductListResponse, UpdateProductResponse } from "../interfaces";
import { CreateProductDto } from "./dto/create-product";
import { UpdateProductDto } from "./dto/update-product";
import { AuthGuard } from "@nestjs/passport";

@Controller("product")
export class ProductController {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/:userId")
  getUserProductsList(@Param("userId") userId: string): Promise<ProductListResponse> {
    return this.productService.getUserProducts(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/item/:productId")
  getProduct(@Param("productId") productId: string): Promise<GetProductResponse> {
    return this.productService.getProduct(productId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  addProduct(@Body() product: CreateProductDto): Promise<AddProductResponse> {
    return this.productService.addProduct(product);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:productId")
  removeProduct(@Param("productId") productId: string): Promise<DeleteProductResponse> {
    return this.productService.deleteProduct(productId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/:productId/:userId")
  updateProduct(@Param("productId") productId: string, @Param("userId") userId: string, @Body() product: UpdateProductDto): Promise<UpdateProductResponse> {
    return this.productService.updateProduct(productId, userId, product);
  }
}
