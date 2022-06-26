import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from '@nestjs/common';
import {ProductService} from "./product.service";
import {
    AddProductResponse, DeleteProductResponse,
    GetProductResponse,
    ProductListResponse, UpdateProductResponse
} from "../interfaces/product/product";
import {CreateProductDto} from "./dto/create-product";
import { UpdateProductDto } from './dto/update-product';

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
    @Delete('/:id')
    removeProduct(
        @Param('id') id: string,
    ):Promise<DeleteProductResponse> {
        return this.productService.deleteProduct(id);
    }
    @Patch('/:id')
    updateProduct(
        @Param('id') id: string,
        @Body() product: UpdateProductDto,
    ):Promise<UpdateProductResponse> {
        return this.productService.updateProduct(id,product);
    }
}
