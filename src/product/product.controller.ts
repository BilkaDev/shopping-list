import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {ProductService} from "./product.service";
import {AddProductResponse, GetProductResponse, ProductListResponse} from "../interfaces/product/product";
import {CreateProductDto} from "./dto/create-product";

@Controller('product')
export class ProductController {
    constructor(
        @Inject(ProductService) private productService: ProductService,
    ) {
    }

    @Get('/')
    getProductsList(): Promise<ProductListResponse> {
        return this.productService.getProducts();
    }

    @Get('/:id')
    getProduct(
        @Param('id') id: string,
    ): Promise<GetProductResponse> {
        return this.productService.getProduct(id);
    }

    @Post('/')
    addProduct(
        @Body() product: CreateProductDto,
    ): Promise<AddProductResponse> {
        return this.productService.addProduct(product);
    }
}
