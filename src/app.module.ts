import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { StudentRegistModule } from './student-regist/student-regist.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    StudentRegistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
