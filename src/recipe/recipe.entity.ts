import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemInList } from "../list/item-in-list.entity";
import { List } from "../list/list.entity";
import { User } from "../user/user.entity";

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    type: "text",
  })
  description: string;

  @OneToMany(() => ItemInList, entity => entity.recipe)
  items: ItemInList[];

  @ManyToMany(() => List, entity => entity.recipes)
  lists: List[];

  @ManyToOne(() => User, entity => entity.recipes)
  @JoinColumn()
  user: User;
}
