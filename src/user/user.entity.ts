import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserInterface } from "../interfaces";
import { Product } from "../product/product.entity";
import { List } from "../list/list.entity";
import { Recipe } from "../recipe/recipe.entity";

@Entity()
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
  })
  email: string;

  @OneToMany(type => Product, entity => entity.user)
  products: Product[];

  @OneToMany(type => List, entity => entity.user)
  lists: List[];

  @OneToMany(type => Recipe, entity => entity.user)
  recipes: Recipe[];
}
