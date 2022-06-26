import { Injectable } from '@nestjs/common';
import {Product} from "./product.entity";
import {GetProductResponse, ProductListResponse} from "../interfaces/product/product";

@Injectable()
export class ProductService {
    async getProducts(): Promise<ProductListResponse> {
        return await Product.find()
    }

    async getProduct(id): Promise<GetProductResponse> {
        return await Product.findOneOrFail({where: {id}})
    }

    async hasProducts(name: string): Promise<boolean> {
        return (await this.getProducts()).some(product => product.name === name)
    }

}
