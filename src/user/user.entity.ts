import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserInterface} from "../interfaces/user/user";

@Entity()
export class User extends BaseEntity implements UserInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    email: string;
    
}