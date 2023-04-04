import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Entity()
@Unique(['myNumber'])
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    companyName: string;

    @Column()
    myNumber: string;

    @Column()
    parentNumber: string;

    @ManyToOne(type => User, user => user.students, { eager: false })
    user: User;
}