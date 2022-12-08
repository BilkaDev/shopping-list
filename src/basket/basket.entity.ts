import { BaseEntity, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "../list/list.entity";
import { ItemInList } from "../list/item-in-list.entity";

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => List)
  @JoinColumn()
  list: List;

  @ManyToOne(() => ItemInList, entity => entity.bakset)
  @JoinTable()
  items: ItemInList[];
}
