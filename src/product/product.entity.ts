import {ItemInList} from "src/list/item-in-list.entity";
import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {ProductCategory, ProductInterface} from "../interfaces";

@Entity()
export class Product extends BaseEntity implements ProductInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 50,
        nullable: false,
    })
    name: string;

    @Column({
        default: 0,
    })
    category: ProductCategory;

    @OneToMany(type => ItemInList, entity => entity.product)
    items: ItemInList[];

    @ManyToOne(type => User,entity => entity.products)
    @JoinColumn()
    user: User;
}