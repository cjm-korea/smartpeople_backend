import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { Student } from 'src/entities/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
// import * as AWS from 'aws-sdk'

// AWS.config.update({
//   region: 'DOKYO',
//   accessKeyId: 'ACCESS_KEY',
//   secretAccessKey: 'SECRET_KEY'
// })

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: {
        // 60 minutes
        expiresIn: 60 * 60
      }
    })
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
    // {
    //   provide: 'SNS_CLIENT',
    //   useValue: new SNS({
    //     region: 'DOKYO',
    //     accessKeyId
    //   })
    // }
  ],
  controllers: [AuthController]
})
export class AuthModule { }
