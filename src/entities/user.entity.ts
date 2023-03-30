import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('User')
@Unique(['companyName'])
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
}