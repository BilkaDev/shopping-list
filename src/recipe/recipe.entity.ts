import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ItemInList} from "../list/item-in-list.entity";
import {List} from "../list/list.entity";
import {RecipeInterface} from "../interfaces/recipe/recipe";

@Entity()
export class Recipe extends BaseEntity implements RecipeInterface{
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

    @ManyToMany(type => List, entity => entity.recips)
    lists: List[]
}
