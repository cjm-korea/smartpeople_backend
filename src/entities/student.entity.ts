import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['myNumber'])
export class StudentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    myNumber: string;
    
    @Column()
    parentNumber: string;
    
    // Make one to many
    @Column()
    companyName: string;
}