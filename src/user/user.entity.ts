import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserInterface} from "../interfaces/user/user";
import {Product} from "../product/product.entity";
import {ItemInList} from "../list/item-in-list.entity";

@Entity()
export class User extends BaseEntity implements UserInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    email: string;

    @OneToMany(type => Product, entity => entity.user)
    products: Product[];
}