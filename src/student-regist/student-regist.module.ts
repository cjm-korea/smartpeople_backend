import { Module } from '@nestjs/common';
import { StudentRegistService } from './student-regist.service';
import { StudentRegistController } from './student-regist.controller';
import { StudentRepository } from './repository/student.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Student])
    ],
    exports: [TypeOrmModule],
    providers: [StudentRegistService, StudentRepository],
    controllers: [StudentRegistController]
})
export class StudentRegistModule { }
