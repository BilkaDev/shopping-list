import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "../list/list.entity";
import { ItemInList } from "../list/item-in-list.entity";

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => List, {
    onDelete: "CASCADE",
  })
  list: List;

  @ManyToOne(() => ItemInList, entity => entity.basket, { eager: true, onDelete: "CASCADE" })
  item: ItemInList;
}
