import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {Product} from "./product.entity";
import {AddProductResponse, DeleteProductResponse, UpdateProductResponse} from "../interfaces/product/product";
import {CreateProductDto} from "./dto/create-product";
import {UserService} from "../user/user.service";

@Injectable()
export class ProductService {
    constructor(
        @Inject(forwardRef(() =>UserService)) private user:UserService,
    ) {
    }
    async getUserProducts(userId:string): Promise<Product[]> {
        return await Product.find({
            where: {
                user: {id:userId}}});
    }

    async getProduct(id): Promise<Product> {
        try {
            return await Product.findOneOrFail({where: {id}});
        }catch (e) {
            return
        }
    }

    async hasProducts(userId:string ,name: string): Promise<boolean> {
        return (await this.getUserProducts(userId)).some(product => product.name.toLowerCase() === name.toLowerCase());
    }

    async addProduct(product: CreateProductDto): Promise<AddProductResponse> {
        const {name, category,userId} = product;
        const user = await this.user.getOneUser(product.userId);
        const productItem = await this.hasProducts(userId,name);
        console.log(user);
        if (
            productItem ||
            !user
        ) {
            return {isSuccess: false};
        }
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.category = category;
        newProduct.user = user;

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

    async updateProduct(productId: string, userId:string ,updateProduct): Promise<UpdateProductResponse> {
        const {category, name} = updateProduct;
        const isProductName = await this.hasProducts(userId,name);
        const product = await this.getProduct(productId);
        if ((!isProductName || name === product.name) && productId === updateProduct.id){
            const {affected} = await Product.update(productId, {
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
