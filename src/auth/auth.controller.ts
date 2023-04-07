import { Controller, Post, Body, ValidationPipe, UseGuards, Logger, Get, Res } from '@nestjs/common';
import { AuthCreadentialDto } from './dto/auth.credential.dto';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { User } from 'src/entities/user.entity';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    private logger = new Logger();

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCreadentialDto): Promise<void> {
        // Make alert error message to confilct user
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signIn')
    async signIn(@Body(ValidationPipe) userCredentialDto: UserCredentialDto, @Res({passthrough: true}) response): Promise<any> {
        this.logger.debug(`${userCredentialDto.userName} is signIn`, 'auth');
        const token = await this.authService.signIn(userCredentialDto);
        console.log(token);
        response.cookie('accessToken', token.accessToken, {httpOnly: true});
        return token;
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }

    @Get()
    next(@Body() body: object){
        this.logger.debug('some message is arrived');
        this.logger.debug(`${body}`);
        console.log(body);
    }
}
