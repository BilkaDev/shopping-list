import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ProductCategory, ProductInterface} from "../interfaces/product/product";

@Entity()
export class Product extends BaseEntity implements ProductInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 50,
        nullable: false,
    })
    name: string;

    @Column({
        default:0,
    })
    category: ProductCategory;
}