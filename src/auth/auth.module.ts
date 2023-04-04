import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { Student } from 'src/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student]),
  ],
  exports: [TypeOrmModule],
  providers: [AuthService, UserRepository],
  controllers: [AuthController]
})
export class AuthModule {}
