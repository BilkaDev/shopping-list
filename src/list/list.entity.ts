import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemInList } from "./item-in-list.entity";
import { Recipe } from "../recipe/recipe.entity";
import { User } from "../user/user.entity";
import { Basket } from "../basket/basket.entity";

@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
  })
  listName: string;

  @OneToMany(() => ItemInList, entity => entity.list)
  items: ItemInList[];

  @ManyToMany(() => Recipe, entity => entity.lists)
  @JoinTable()
  recipes: Recipe[];

  @ManyToOne(() => User, entity => entity.lists)
  @JoinColumn()
  user: User;

  @OneToMany(() => Basket, entity => entity.list)
  basket: Basket[];
}
