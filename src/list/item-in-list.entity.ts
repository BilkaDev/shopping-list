import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ItemInListInterface} from "../interfaces/list/item-in-list";
import {List} from "./list.entity";
import {Product} from "../product/product.entity";

@Entity()
export class ItemInList extends BaseEntity implements ItemInListInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Product, entity => entity.items,{eager:true,
        onDelete: 'CASCADE'})
    @JoinColumn()
    product: Product;

    @Column({
        default: 0,
    })
    count: number;

    @Column({
        default: 0,
    })
    weight: number;

    @ManyToMany(type => List, entity => entity.items)
    @JoinTable()
    lists: List[];
}