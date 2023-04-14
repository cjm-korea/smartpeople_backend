import { Controller, Post, Body, ValidationPipe, UseGuards, Logger, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthCreadentialDto } from './dto/auth.credential.dto';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { User } from 'src/entities/user.entity';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    private logger = new Logger();

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCreadentialDto): Promise<void> {
        // Make alert error message to confilct user
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signIn')
    async signIn(@Body(ValidationPipe) userCredentialDto: UserCredentialDto, @Res({ passthrough: true }) res: Response) {
        this.logger.debug(`${userCredentialDto.userName} is signIn`, 'auth');
        const jwt = await this.authService.signIn(userCredentialDto);

        res.setHeader('Authorization', jwt.accessToken)
            .status(200)
            .json({ success: true })
    }

    @Get('/isLogin')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User, @Res() res: Response) {
        res.status(200).sendStatus(200);
    }

    @Get('/getUser')
    @UseGuards(AuthGuard())
    next(@GetUser() user: User, @Res() res: Response) {
        this.logger.debug('getUser', 'auth');
        console.log(user);
        res.status(200).json(user);
    }
}
