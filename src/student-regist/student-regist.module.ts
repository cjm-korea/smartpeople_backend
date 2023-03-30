import { Module } from '@nestjs/common';
import { StudentRegistService } from './student-regist.service';
import { StudentRegistController } from './student-regist.controller';

@Module({
  providers: [StudentRegistService],
  controllers: [StudentRegistController]
})
export class StudentRegistModule {}
