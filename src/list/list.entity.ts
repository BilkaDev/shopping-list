import {
    BaseEntity,
    Column,
    Entity, ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {ListInterface} from "../interfaces/list/list";
import {ItemInList} from "./item-in-list.entity";
import {Recipe} from "../recipe/recipe.entity";

@Entity()
export class List extends BaseEntity implements ListInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    listName: string;

    @OneToMany(type => ItemInList, entity => entity.list)
    items: ItemInList[];

    @ManyToMany(type => Recipe, entity => entity.lists)
    recips: Recipe[]

}