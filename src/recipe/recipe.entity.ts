import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {ItemInList} from "../list/item-in-list.entity";
import {List} from "../list/list.entity";
import {RecipeInterface} from "../interfaces/recipe/recipe";
import {User} from "../user/user.entity";

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

    @ManyToMany(type => List, entity => entity.recipes)
    lists: List[]

    @ManyToOne(type => User,entity => entity.recipes)
    @JoinColumn()
    user: User;
}
