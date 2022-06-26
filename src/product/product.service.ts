import {Injectable} from '@nestjs/common';
import {Product} from "./product.entity";
import {AddProductResponse, GetProductResponse, ProductListResponse} from "../interfaces/product/product";
import {CreateProductDto} from "./dto/create-product";

@Injectable()
export class ProductService {
    async getProducts(): Promise<ProductListResponse> {
        return await Product.find();
    }

    async getProduct(id): Promise<GetProductResponse> {
        return await Product.findOneOrFail({where: {id}});
    }

    async hasProducts(name: string): Promise<boolean> {
        return (await this.getProducts()).some(product => product.name.toLowerCase() === name.toLowerCase());
    }

    async addProduct(product: CreateProductDto): Promise<AddProductResponse> {
        const {name, category} = product;
        const productItem = await this.hasProducts(name);
        if (
            productItem
        ) {
            return {isSuccess: false};
        }
        console.log(!productItem);
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.category = category;

        await newProduct.save();
        return {
            id: newProduct.id,
            isSuccess: true
        }
    }
}
