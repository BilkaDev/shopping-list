import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./list.entity";
import { Product } from "../product/product.entity";
import { Recipe } from "../recipe/recipe.entity";

@Entity()
export class ItemInList extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product, entity => entity.items, { eager: true, onDelete: "CASCADE" })
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

  @Column({
    default: false,
  })
  itemInBasket: boolean;

  @ManyToOne(() => List, entity => entity.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  list: List;

  @ManyToOne(() => Recipe, entity => entity.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  recipe: Recipe;
}
