import {Injectable} from '@nestjs/common';
import {Product} from "./product.entity";
import {AddProductResponse, DeleteProductResponse, UpdateProductResponse} from "../interfaces/product/product";
import {CreateProductDto} from "./dto/create-product";

@Injectable()
export class ProductService {
    async getProducts(): Promise<Product[]> {
        return await Product.find();
    }

    async getProduct(id): Promise<Product> {
        try {
            return await Product.findOneOrFail({where: {id}});
        }catch (e) {
            return
        }
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
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.category = category;

        await newProduct.save();
        return {
            id: newProduct.id,
            isSuccess: true
        };
    }

    async deleteProduct(id: string): Promise<DeleteProductResponse> {
        const item = await this.getProduct(id);
        if (item) {
            await item.remove();
            return {
                isSuccess: true,
            };
        } else return {
            isSuccess: false,
        };
    }

    async updateProduct(id: string, updateProduct): Promise<UpdateProductResponse> {
        const {category, name} = updateProduct;
        const isProductName = await this.hasProducts(name);
        const product = await this.getProduct(id);
        if ((!isProductName || name === product.name) && id === updateProduct.id){
            const {affected} = await Product.update(id, {
                name,
                category,
            });
            if (affected) {
                return {isSuccess: true};
            }
        }
       return {
            isSuccess: false,
        };
    }
}
