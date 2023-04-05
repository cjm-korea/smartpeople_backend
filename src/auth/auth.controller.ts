import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthCreadentialDto } from './dto/auth.credential.dto';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { User } from 'src/entities/user.entity';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCreadentialDto): Promise<void> {
        // Make alert error message to confilct user
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signIn')
    signIn(@Body(ValidationPipe) userCredentialDto: UserCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(userCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }
}
