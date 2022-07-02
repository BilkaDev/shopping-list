import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ItemInList} from "../list/item-in-list.entity";
import {List} from "../list/list.entity";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    name: string

    @Column({
        type: 'text',
    })
    description: string;

    @OneToMany(type => ItemInList, entity => entity.recipe)
    items: ItemInList[]

    @ManyToMany(type => List, entity => entity.recipes)
    lists: List[]
}
