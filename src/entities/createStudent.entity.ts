import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



export function createStudentEntity(tableName: string) {
    @Entity(tableName)
    class StudentEntityClass {
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
    }
    return StudentEntityClass;
}