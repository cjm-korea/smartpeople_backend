import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Student } from "./student.entity";

@Entity('User')
// @Unique(['companyName'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    companyName: string;

    @Column()
    companyNumber: string;

    @Column()
    companyAddress: string;

    @OneToMany(type => Student, student => student.user, { eager: true })
    students: Student[];
}