import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCreadentialDto {
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    userName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @Matches(/^[a-zA-Z0-9]*$/,{
        message: '비밀번호는 영어와 숫자만 입력 가능합니다.'
    })
    password: string;

    @IsString()
    @MaxLength(20)
    companyName: string;

    @IsString()
    @MinLength(12)
    @MaxLength(15)
    companyNumber: string;

    @IsString()
    @MinLength(5)
    companyAddress: string;
}