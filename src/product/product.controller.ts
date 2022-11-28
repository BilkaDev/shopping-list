import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product";
import { UpdateProductDto } from "./dto/update-product";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "../user/user.entity";

@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/")
  getUserProductsList(@UserObj() user: User) {
    return this.productService.getUserProducts(user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/item/:productId")
  getProduct(@Param("productId") productId: string) {
    return this.productService.getProductOrFail(productId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  addProduct(@UserObj() user: User, @Body() product: CreateProductDto) {
    return this.productService.addProduct(product, user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:productId")
  removeProduct(@Param("productId") productId: string) {
    return this.productService.deleteProduct(productId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/:productId")
  updateProduct(@UserObj() user: User, @Param("productId") productId: string, @Body() product: UpdateProductDto) {
    return this.productService.updateProduct(productId, user.id, product);
  }
}
