import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { StudentEntity } from 'src/entities/student.entity';
import { CreateStudentRepository } from './repository/createStudent.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, StudentEntity]),
  ],
  exports: [TypeOrmModule],
  providers: [AuthService, UserRepository, CreateStudentRepository, StudentEntity],
  controllers: [AuthController]
})
export class AuthModule {}
