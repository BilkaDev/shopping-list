import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ItemInListInterface} from "../interfaces/list/item-in-list";
import {List} from "./list.entity";

@Entity()
export class ItemInList extends BaseEntity implements ItemInListInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 36,
        nullable: false
    })
    itemId: string;

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