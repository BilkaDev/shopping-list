import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ListInterface} from "../interfaces/list/list";
import {ItemInList} from "./item-in-list.entity";

@Entity()
export class List extends BaseEntity implements ListInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    listName: string;

    @ManyToMany(type => ItemInList, entity => entity.id)
    @JoinTable()
    productId: ItemInList;
}