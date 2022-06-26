import {Controller, Get, Inject, Param} from '@nestjs/common';
import {ProductService} from "./product.service";
import {GetProductResponse, ProductListResponse} from "../interfaces/product/product";

@Controller('product')
export class ProductController {
    constructor(
        @Inject(ProductService) private productService: ProductService,
    ) {}

    @Get('/')
    getProductsList():Promise<ProductListResponse> {
        return this.productService.getProducts()
    }
    @Get('/:id')
    getProduct(
        @Param('id') id: string,
    ):Promise<GetProductResponse> {
        return this.productService.getProduct(id)
    }
}
