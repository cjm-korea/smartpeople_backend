import { Module } from '@nestjs/common';
import { StudentRegistService } from './student-regist.service';
import { StudentRegistController } from './student-regist.controller';
import { StudentRepository } from './repository/student.repository';

@Module({
  providers: [StudentRegistService, StudentRepository],
  controllers: [StudentRegistController]
})
export class StudentRegistModule {}
