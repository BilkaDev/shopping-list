import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ItemInListInterface} from "../interfaces/list/item-in-list";
import {List} from "./list.entity";

@Entity()
export class ItemInList extends BaseEntity implements ItemInListInterface {

    @PrimaryGeneratedColumn('uuid')
    @ManyToMany(type => List, entity => entity.id)
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
}