import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { ProductCategory } from "../interfaces";
import { ItemInList } from "../list/item-in-list.entity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    default: 0,
  })
  category: ProductCategory;

  @OneToMany(() => ItemInList, entity => entity.product)
  items: ItemInList[];

  @ManyToOne(() => User, entity => entity.products)
  @JoinColumn()
  user: User;
}
