// import { Injectable } from "@nestjs/common";
// import { StudentEntity } from "src/entities/student.entity";
// import { BaseEntity, Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
// import { AuthCreadentialDto } from "../dto/auth.credential.dto";

// @Injectable()
// export class CreateStudentRepository extends Repository<StudentEntity> {
//     constructor(private dataSource: DataSource) {
//         super(StudentEntity, dataSource.createEntityManager());
//     }

//     async createNewEntity(authCredentialDto: AuthCreadentialDto): Promise<void> {
//         const { userName, password, companyName, companyNumber, companyAddress } = authCredentialDto;
//         this.create(StudentEntity);
//         const repo = this.dataSource.getRepository(StudentEntity).metadata.tableName = companyName;
//         // this.dataSource.createEntityManager().create<StudentEntity>(createStudentEntity(companyName));
//         // this.create(newEntity)
//     }
// }