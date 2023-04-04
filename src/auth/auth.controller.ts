import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCreadentialDto } from './dto/auth.credential.dto';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCreadentialDto): Promise<void> {
        // Make alert error message to confilct user
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signIn')
    signIn(@Body(ValidationPipe) userCredentialDto: UserCredentialDto): Promise<User> {
        return this.authService.signIn(userCredentialDto);
    }
}