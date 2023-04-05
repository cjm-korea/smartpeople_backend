import { Module } from '@nestjs/common';
import { StudentRegistService } from './student-regist.service';
import { StudentRegistController } from './student-regist.controller';
import { StudentRepository } from './repository/student.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Student]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
    ],
    exports: [TypeOrmModule, PassportModule],
    providers: [StudentRegistService, StudentRepository],
    controllers: [StudentRegistController]
})
export class StudentRegistModule { }
