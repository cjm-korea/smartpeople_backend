import { IsString, MinLength } from "class-validator";

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
}