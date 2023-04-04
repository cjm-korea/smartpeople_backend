import { IsString, MinLength } from "class-validator";
import { User } from "src/entities/user.entity";

export class StudentDto {
    @IsString()
    @MinLength(2)
    userName: string;

    @IsString()
    @MinLength(10)
    myNumber: string;
    
    @IsString()
    @MinLength(10)
    parentNumber: string;
    
    @IsString()
    @MinLength(2)
    companyName: string;

    user: User;
}